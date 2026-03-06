"use client"

import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useState, useEffect } from "react"
import {
  Calculator,
  CheckCircle2,
  Info,
  Droplets,
  Zap,
  MessageCircle,
  User,
  Phone,
  Home,
  MapPin,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"
import { InfoTooltip } from "@/components/info-tooltip"

// ── Tooltip helper ──────────────────────────────────────────────────────────────
function FieldNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-muted-foreground mt-1.5 flex items-start gap-1">
      <Info className="h-3 w-3 shrink-0 mt-0.5 text-accent/60" />
      <span>{children}</span>
    </p>
  )
}

// ── Default fallback pricing (used if DB unavailable) ───────────────────────────
const DEFAULT_PRICING: Record<string, any> = {
  driveway:  { baseRate: 3,    blockPavingResanding: 2,  easyAccess: 1, hardAccess: 1.3  },
  patio:     { baseRate: 5,    easyAccess: 1,             hardAccess: 1.25               },
  roof:      { baseRate: 11.5, easyAccess: 1,             hardAccess: 1.4                },
  gutter:    { baseRate: 6                                                                },
  walls:     { baseRate: 3,    easyAccess: 1,             hardAccess: 1.3                },
  softwash:  { baseRate: 5,    easyAccess: 1,             hardAccess: 1.35               },
}

const BIOCIDE_RATE_PER_SQM = 1.5   // £/m²  (or per linear metre for gutter)
const GENERATOR_SURCHARGE   = 20    // £ flat
const DISTANCE_RATE          = 0.5  // £/mile (x2 = return trip)
const FUEL_BASE              = 15   // £ flat

export default function GetQuotePage() {
  // Contact info
  const [name,         setName]         = useState("")
  const [phone,        setPhone]        = useState("")
  const [addressLine1, setAddressLine1] = useState("")
  const [addressLine2, setAddressLine2] = useState("")
  const [postcode,     setPostcode]     = useState("")
  const [postcodeError, setPostcodeError] = useState("")
  const [loadingPostcode, setLoadingPostcode] = useState(false)
  const [distanceMiles, setDistanceMiles] = useState(0)

  // Service
  const [serviceType,    setServiceType]    = useState("driveway")
  const [size,           setSize]           = useState([50])
  const [gutterLength,   setGutterLength]   = useState([15])
  const [access,         setAccess]         = useState("easy")
  const [surfaceType,    setSurfaceType]    = useState("standard") // standard | block | resin | tarmac
  const [needsResanding, setNeedsResanding] = useState(false)
  const [growthLevel,    setGrowthLevel]    = useState("moderate") // light | moderate | heavy
  const [biocide,        setBiocide]        = useState(false)
  const [hasExternalPower, setHasExternalPower] = useState(true)

  // Pricing
  const [pricingData,    setPricingData]    = useState<Record<string, any>>(DEFAULT_PRICING)
  const [estimatedPrice, setEstimatedPrice] = useState(0)

  // Load live rates from DB
  useEffect(() => {
    fetch("/api/admin/pricing")
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setPricingData(data)
      })
      .catch(() => {})
  }, [])

  // Postcode lookup
  const handlePostcodeChange = async (value: string) => {
    const upper = value.toUpperCase()
    setPostcode(upper)
    setPostcodeError("")
    if (value.length < 5) { setDistanceMiles(0); return }
    if (!/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(value.trim())) return
    setLoadingPostcode(true)
    try {
      const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(value.trim())}`)
      if (!res.ok) { setPostcodeError("Postcode not found."); return }
      const d = await res.json()
      const { latitude: lat, longitude: lon } = d.result
      const toRad = (v: number) => (v * Math.PI) / 180
      const dLat = toRad(lat - 50.6154)
      const dLon = toRad(lon - -1.941)
      const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(50.6154)) * Math.cos(toRad(lat)) * Math.sin(dLon / 2) ** 2
      setDistanceMiles(Math.round(3959 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))))
    } catch { setPostcodeError("Unable to verify postcode.") }
    finally { setLoadingPostcode(false) }
  }

  // ── Price calculation ────────────────────────────────────────────────────────
  useEffect(() => {
    const rates = pricingData[serviceType]
    if (!rates) { setEstimatedPrice(0); return }

    let price = 0

    if (serviceType === "gutter") {
      price = gutterLength[0] * (rates.baseRate ?? 6)
    } else {
      price = size[0] * (rates.baseRate ?? 3)
      if (rates.easyAccess != null && rates.hardAccess != null) {
        price *= access === "hard" ? rates.hardAccess : rates.easyAccess
      }
    }

    // Growth level multiplier
    if (["roof", "patio", "driveway", "walls", "softwash"].includes(serviceType)) {
      if (growthLevel === "heavy")   price *= 1.35
      if (growthLevel === "light")   price *= 0.9
    }

    // Block paving re-sanding add-on
    if (serviceType === "driveway" && surfaceType === "block" && needsResanding) {
      price += size[0] * (rates.blockPavingResanding ?? 2)
    }

    // Biocide treatment add-on
    if (biocide) {
      const sqm = serviceType === "gutter" ? gutterLength[0] : size[0]
      price += sqm * BIOCIDE_RATE_PER_SQM
    }

    // Travel surcharge
    const distanceSurcharge = distanceMiles * 2 * DISTANCE_RATE + FUEL_BASE
    price += distanceSurcharge

    // Generator surcharge
    if (!hasExternalPower) price += GENERATOR_SURCHARGE

    setEstimatedPrice(Math.round(price))
  }, [
    serviceType, size, gutterLength, access, surfaceType,
    needsResanding, growthLevel, biocide, hasExternalPower,
    distanceMiles, pricingData,
  ])

  // ── WhatsApp message ─────────────────────────────────────────────────────────
  const handleSendQuote = () => {
    if (!name || !phone || !postcode || !serviceType) {
      alert("Please fill in your name, phone number, postcode and choose a service.")
      return
    }

    const svcLabel: Record<string, string> = {
      driveway: "Driveway Cleaning",
      patio:    "Patio / Decking",
      roof:     "Roof Cleaning",
      gutter:   "Gutter Cleaning",
      walls:    "Exterior Walls",
      softwash: "Softwash Treatment",
    }

    const surfaceLabel: Record<string, string> = {
      standard: "Concrete / Tarmac",
      block:    "Block Paving",
      resin:    "Resin Bound",
      tarmac:   "Tarmac",
    }

    const growthLabel: Record<string, string> = {
      light:    "Light (early growth / mainly dust)",
      moderate: "Moderate (visible moss / algae patches)",
      heavy:    "Heavy (thick moss / established lichen)",
    }

    let msg = `Hi! I'd like a quote:\n\n`
    msg += `Name: ${name}\n`
    msg += `Phone: ${phone}\n`
    msg += `Address: ${addressLine1}${addressLine2 ? `, ${addressLine2}` : ""}, ${postcode}\n`
    msg += `Distance from Swanage: ~${distanceMiles} miles\n\n`
    msg += `Service: ${svcLabel[serviceType] ?? serviceType}\n`

    if (serviceType === "gutter") {
      msg += `Gutter Length: ${gutterLength[0]} m\n`
    } else {
      msg += `Area: ${size[0]} m²\n`
    }

    if (serviceType === "driveway") {
      msg += `Surface Type: ${surfaceLabel[surfaceType] ?? surfaceType}\n`
      if (surfaceType === "block") msg += `Re-sanding joints: ${needsResanding ? "Yes (+£2/m²)" : "No"}\n`
    }

    if (["roof", "patio", "driveway", "walls", "softwash"].includes(serviceType)) {
      msg += `Growth / Soiling Level: ${growthLabel[growthLevel]}\n`
    }

    msg += `Biocide Treatment Add-on: ${biocide ? `Yes (+£${BIOCIDE_RATE_PER_SQM}/m²)` : "No"}\n`
    msg += `Access Difficulty: ${access === "easy" ? "Easy" : "Difficult"}\n`
    msg += `External Power Available: ${hasExternalPower ? "Yes" : "No (generator needed)"}\n`
    msg += `\nEstimated Price: £${estimatedPrice}\n`
    msg += `\nPlease confirm my final quote after your free inspection. Thank you!`

    window.open(`https://wa.me/447418610731?text=${encodeURIComponent(msg)}`, "_blank")
  }

  const isReady = name.trim() && phone.trim() && postcode.trim() && serviceType && !postcodeError

  // ── Helper: option button ────────────────────────────────────────────────────
  const OptionBtn = ({
    active,
    onClick,
    children,
  }: {
    active: boolean
    onClick: () => void
    children: React.ReactNode
  }) => (
    <button
      onClick={onClick}
      className={`flex-1 min-w-[110px] py-3 px-4 rounded-lg font-semibold transition-all border-2 text-sm ${
        active
          ? "bg-[#00C853] border-[#00C853] text-white shadow-lg"
          : "border-white/20 text-foreground hover:border-[#00C853] hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  )

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-b from-primary to-secondary">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">

            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Calculator className="h-10 w-10 text-accent" />
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">Get Your Quote</h1>
              </div>
              <p className="text-xl text-muted-foreground mb-6">
                Fill in your details below for an accurate estimate. We do a free in-person inspection before
                confirming your final price.
              </p>
              <div className="bg-accent/20 border border-accent/50 rounded-lg p-4 mb-8">
                <p className="text-sm text-foreground flex items-start gap-2">
                  <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  Prices are calculated from our current rates, your area size, location and service options.
                  Everything is verified during our free site visit.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* ── Inputs ── */}
              <div className="lg:col-span-2 space-y-8">

                {/* Contact Details */}
                <div className="glass-border rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">1</span>
                    Your Details
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground font-semibold flex items-center gap-1.5 mb-1.5">
                        <User className="h-4 w-4 text-accent" />
                        Full Name <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        placeholder="e.g. John Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-0"
                      />
                    </div>

                    <div>
                      <Label className="text-foreground font-semibold flex items-center gap-1.5 mb-1.5">
                        <Phone className="h-4 w-4 text-accent" />
                        Phone Number <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        placeholder="e.g. 07700 900000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label className="text-foreground font-semibold flex items-center gap-1.5 mb-1.5">
                        <Home className="h-4 w-4 text-accent" />
                        Address Line 1
                      </Label>
                      <Input
                        placeholder="House number & street"
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label className="text-foreground font-semibold mb-1.5 block">Address Line 2</Label>
                      <Input
                        placeholder="Town / village (optional)"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Label className="text-foreground font-semibold flex items-center gap-1.5 mb-1.5">
                        <MapPin className="h-4 w-4 text-accent" />
                        Postcode <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        placeholder="e.g. BH19 2JJ"
                        value={postcode}
                        onChange={(e) => handlePostcodeChange(e.target.value)}
                        className="max-w-xs"
                      />
                      {loadingPostcode && <p className="text-xs text-accent mt-1.5">Checking postcode…</p>}
                      {postcodeError && (
                        <p className="text-xs text-red-400 flex items-center gap-1 mt-1.5">
                          <AlertCircle className="h-3 w-3" />
                          {postcodeError}
                        </p>
                      )}
                      {distanceMiles > 0 && !postcodeError && !loadingPostcode && (
                        <p className="text-xs text-green-400 mt-1.5">
                          Approx. {distanceMiles} miles from Swanage
                          {distanceMiles > 20 && (
                            <span className="text-white/50 ml-1">
                              (travel surcharge applies beyond 20 miles)
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Service Type */}
                <div className="glass-border rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">2</span>
                    What service do you need?
                  </h2>

                  <div className="space-y-3">
                    {[
                      {
                        id: "driveway",
                        label: "Driveway Cleaning",
                        note: "Tarmac, concrete, block paving or resin-bound. Block paving may need re-sanding after a deep clean — see below.",
                      },
                      {
                        id: "patio",
                        label: "Patio Cleaning",
                        note: "Indian sandstone, porcelain, concrete slabs, or similar. We remove moss, algae, stains and general soiling.",
                      },
                      {
                        id: "roof",
                        label: "Roof Cleaning & Moss Removal",
                        note: "Softwash method — safe for all tile types. Biocide treatment is available as an add-on to kill spores and prevent regrowth.",
                      },
                      {
                        id: "gutter",
                        label: "Gutter Clearing & Cleaning",
                        note: "Full debris clearance, downpipe flush and flow test. Priced per linear metre of guttering.",
                      },
                      {
                        id: "walls",
                        label: "Wall & Facade Cleaning",
                        note: "Brick, render, painted surfaces. Removes algae, mould, staining. Softwash for painted/rendered walls.",
                      },
                      {
                        id: "softwash",
                        label: "Softwash (Render / K-Rend)",
                        note: "Low-pressure chemical clean — ideal for K-Rend, monocouche and cladding. Prevents damage caused by high-pressure washing.",
                      },
                    ].map((svc) => (
                      <button
                        key={svc.id}
                        onClick={() => setServiceType(svc.id)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          serviceType === svc.id
                            ? "border-accent bg-accent/10 shadow-lg"
                            : "border-white/20 hover:border-accent/40 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                              serviceType === svc.id ? "border-accent bg-accent" : "border-white/30"
                            }`}
                          >
                            {serviceType === svc.id && <div className="h-2 w-2 bg-white rounded-full" />}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{svc.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{svc.note}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Input */}
                <div className="glass-border rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">3</span>
                    Size &amp; Area
                  </h2>

                  {serviceType === "gutter" ? (
                    <div className="space-y-3">
                      <Label className="text-foreground text-lg">
                        Gutter Length: <span className="text-accent">{gutterLength[0]} metres</span>
                      </Label>
                      <Slider value={gutterLength} onValueChange={setGutterLength} min={5} max={100} step={1} className="w-full" />
                      <FieldNote>
                        Measure the total linear metres of guttering — one side of a terraced house is typically
                        10–15 m; a semi-detached is usually 20–30 m.
                      </FieldNote>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Label className="text-foreground text-lg">
                        Area Size: <span className="text-accent">{size[0]} m²</span>
                      </Label>
                      <Slider value={size} onValueChange={setSize} min={10} max={500} step={5} className="w-full" />
                      <FieldNote>
                        {serviceType === "driveway" &&
                          "A typical single-car driveway is 20–30 m²; a double driveway is 40–60 m²."}
                        {serviceType === "patio" &&
                          "An average rear patio is 15–25 m²; a larger garden patio can be 40–60 m²."}
                        {serviceType === "roof" &&
                          "A 3-bed semi roof is typically 80–120 m²; a detached house is 150–250 m²."}
                        {serviceType === "walls" &&
                          "Measure the total wall area (height × width of each face to be cleaned)."}
                        {serviceType === "softwash" &&
                          "Measure the total facade area — front, side and rear walls as required."}
                      </FieldNote>
                    </div>
                  )}
                </div>

                {/* Service-specific Options */}
                <div className="glass-border rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">4</span>
                    Service Options
                  </h2>

                  <div className="space-y-6">
                    {/* Surface type (driveway only) */}
                    {serviceType === "driveway" && (
                      <div>
                        <Label className="text-foreground text-lg flex items-center gap-2 mb-3">
                          Surface Type
                          <InfoTooltip
                            title="Why does surface type matter?"
                            description="Different surfaces need different cleaning methods. Block paving has sand-filled joints that can be displaced during cleaning and may need replacing. Resin-bound surfaces are sensitive to high pressure. Tarmac absorbs heat and can be softened — we use lower pressure and cooler water."
                            benefits={[
                              "Block paving: joints may need re-sanding (adds +£2/m²)",
                              "Resin bound: low-pressure softwash approach used",
                              "Tarmac: controlled pressure to avoid softening",
                              "Concrete: standard high-pressure clean",
                            ]}
                          />
                        </Label>
                        <div className="flex gap-3 flex-wrap">
                          {[
                            { id: "standard", label: "Concrete" },
                            { id: "block",    label: "Block Paving" },
                            { id: "resin",    label: "Resin Bound" },
                            { id: "tarmac",   label: "Tarmac" },
                          ].map((s) => (
                            <OptionBtn key={s.id} active={surfaceType === s.id} onClick={() => setSurfaceType(s.id)}>
                              {s.label}
                            </OptionBtn>
                          ))}
                        </div>

                        {surfaceType === "block" && (
                          <div className="mt-4">
                            <button
                              onClick={() => setNeedsResanding(!needsResanding)}
                              className={`w-full text-left p-4 rounded-lg font-semibold transition-all border-2 ${
                                needsResanding
                                  ? "bg-[#00C853] border-[#00C853] text-white shadow-lg"
                                  : "border-white/20 text-foreground hover:border-[#00C853] hover:bg-white/5"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="flex-1">
                                    <p className="font-semibold">Re-Sand Joints? +£2/m²</p>
                                    <p className="text-xs mt-1 opacity-75">
                                      Restores the kiln-dried sand between blocks after cleaning
                                    </p>
                                  </div>
                                  <InfoTooltip
                                    title="Re-Sand Block Paving Joints"
                                    description="Block paving joints are the critical foundation that holds your entire surface together. Over time, sand washes away from between the blocks, causing them to shift, crack, and become uneven."
                                    benefits={[
                                      "Prevents blocks from shifting and settling unevenly",
                                      "Stops weeds and moss from growing between blocks",
                                      "Extends the life of your paving by 5+ years",
                                      "Maintains proper drainage and water run-off",
                                      "Keeps your investment looking professionally finished",
                                    ]}
                                  />
                                </div>
                                <div className="text-xl ml-4">{needsResanding ? "✓" : "○"}</div>
                              </div>
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Growth / soiling level */}
                    {["driveway", "patio", "roof", "walls", "softwash"].includes(serviceType) && (
                      <div>
                        <Label className="text-foreground text-lg flex items-center gap-2 mb-3">
                          Growth / Soiling Level
                          <InfoTooltip
                            title="Why does soiling level matter?"
                            description="The amount of moss, algae or lichen on a surface directly affects the time and chemical treatments required. Heavy soiling requires more passes, stronger treatment and longer dwell time."
                            benefits={[
                              "Light: mostly surface dirt, minimal biological growth",
                              "Moderate: visible moss/algae patches across the surface",
                              "Heavy: thick established moss, lichen or deep staining",
                            ]}
                          />
                        </Label>
                        <div className="flex gap-3 flex-wrap">
                          {[
                            { id: "light",    label: "Light",    desc: "Surface dirt, minimal growth" },
                            { id: "moderate", label: "Moderate", desc: "Visible moss / algae patches" },
                            { id: "heavy",    label: "Heavy",    desc: "Thick established moss / lichen" },
                          ].map((g) => (
                            <button
                              key={g.id}
                              onClick={() => setGrowthLevel(g.id)}
                              className={`flex-1 min-w-[120px] p-3 rounded-lg font-semibold transition-all border-2 text-left ${
                                growthLevel === g.id
                                  ? "bg-[#00C853] border-[#00C853] text-white shadow-lg"
                                  : "border-white/20 text-foreground hover:border-[#00C853] hover:bg-white/5"
                              }`}
                            >
                              <p className="text-sm font-semibold">{g.label}</p>
                              <p className="text-xs opacity-75 mt-0.5">{g.desc}</p>
                            </button>
                          ))}
                        </div>
                        {growthLevel === "heavy" && (
                          <FieldNote>
                            Heavy growth requires multiple treatment passes and a longer dwell time — this is
                            reflected in the price adjustment (+35%).
                          </FieldNote>
                        )}
                        {growthLevel === "light" && (
                          <FieldNote>Light soiling is quicker to treat — small discount applied (-10%).</FieldNote>
                        )}
                      </div>
                    )}

                    {/* Biocide treatment add-on */}
                    <div>
                      <Label className="text-foreground text-lg flex items-center gap-2 mb-3">
                        Biocide Treatment
                        <InfoTooltip
                          title="What is Biocide Treatment?"
                          description="Biocide is a chemical treatment applied after cleaning that kills any remaining spores and creates a protective barrier against regrowth. Without it, moss and algae typically return within 1–2 years. With biocide, surfaces can stay clean for 3–5 years."
                          benefits={[
                            "Kills remaining spores invisible to the naked eye",
                            "Forms a protective barrier against regrowth",
                            "Extends time between cleans to 3–5 years",
                            "Especially recommended for roofs, patios and driveways",
                            "Environmentally approved formulations used",
                          ]}
                        />
                      </Label>
                      <button
                        onClick={() => setBiocide(!biocide)}
                        className={`w-full text-left p-4 rounded-lg font-semibold transition-all border-2 ${
                          biocide
                            ? "bg-[#00C853] border-[#00C853] text-white shadow-lg"
                            : "border-white/20 text-foreground hover:border-[#00C853] hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">
                              Add Biocide Treatment
                              {" "}
                              <span className="text-sm opacity-75">
                                +£{BIOCIDE_RATE_PER_SQM}/m²
                              </span>
                            </p>
                            <p className="text-xs mt-0.5 opacity-75">
                              Kills spores &amp; prevents regrowth for 3–5 years
                            </p>
                          </div>
                          <div className="text-xl ml-4">{biocide ? "✓" : "○"}</div>
                        </div>
                      </button>
                    </div>

                    {/* Access type */}
                    {serviceType !== "gutter" && (
                      <div>
                        <Label className="text-foreground text-lg flex items-center gap-2 mb-3">
                          Access Type
                          <InfoTooltip
                            title="What is Access Type?"
                            description="We classify access based on how easily we can position equipment and work safely. Difficult access (like steep roofs, narrow driveways, or enclosed spaces) requires additional safety equipment, time, and planning."
                            benefits={[
                              "Easy access means faster, more efficient work",
                              "Difficult access requires specialised equipment and extra care",
                              "Safety is our top priority regardless of access level",
                              "Extra time needed for difficult access ensures quality results",
                            ]}
                          />
                        </Label>
                        <div className="flex gap-3 flex-wrap">
                          <OptionBtn active={access === "easy"} onClick={() => setAccess("easy")}>
                            Easy Access
                          </OptionBtn>
                          <OptionBtn active={access === "hard"} onClick={() => setAccess("hard")}>
                            Difficult Access
                          </OptionBtn>
                        </div>
                        <FieldNote>
                          Difficult access includes steep roofs, narrow passages, high walls or any area requiring
                          scaffolding or specialist equipment.
                        </FieldNote>
                      </div>
                    )}

                    {/* Power supply */}
                    <div>
                      <Label className="text-foreground text-lg flex items-center gap-2 mb-3">
                        <Zap className="h-5 w-5 text-accent" />
                        Power Supply
                        <InfoTooltip
                          title="Power Supply Requirements"
                          description="Professional cleaning equipment requires reliable electrical power. If external power isn't available, we bring our generator to power all equipment safely and efficiently."
                          benefits={[
                            "Generator ensures consistent, quality cleaning results",
                            "We handle all generator setup and safety protocols",
                            "No interruptions to your cleaning service",
                            "Safe, professional operation on any property",
                          ]}
                        />
                      </Label>
                      <div className="flex gap-3 flex-col">
                        <button
                          onClick={() => setHasExternalPower(true)}
                          className={`text-left p-4 rounded-lg font-semibold transition-all border-2 ${
                            hasExternalPower
                              ? "bg-[#00C853] border-[#00C853] text-white shadow-lg"
                              : "border-white/20 text-foreground hover:border-[#00C853] hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                                hasExternalPower ? "bg-white" : "border-white/20"
                              }`}
                            >
                              {hasExternalPower && <div className="h-2 w-2 bg-[#00C853] rounded-full" />}
                            </div>
                            <div>
                              <p className="font-semibold">Yes — external power available</p>
                              <p className="text-xs opacity-75 mt-0.5">Outdoor socket or accessible supply on site</p>
                            </div>
                          </div>
                        </button>
                        <button
                          onClick={() => setHasExternalPower(false)}
                          className={`text-left p-4 rounded-lg font-semibold transition-all border-2 ${
                            !hasExternalPower
                              ? "bg-[#00C853] border-[#00C853] text-white shadow-lg"
                              : "border-white/20 text-foreground hover:border-[#00C853] hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                                !hasExternalPower ? "bg-white" : "border-white/20"
                              }`}
                            >
                              {!hasExternalPower && <div className="h-2 w-2 bg-[#00C853] rounded-full" />}
                            </div>
                            <div>
                              <p className="font-semibold">No accessible power — we&apos;ll bring our generator</p>
                              <p className="text-xs opacity-75 mt-0.5">Small surcharge of £{GENERATOR_SURCHARGE} applies</p>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why this matters */}
                <div className="glass-border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Why This Matters</h3>
                  <ul className="space-y-3">
                    {[
                      "Accurate details help us prepare the right equipment and arrive on time",
                      "We'll verify all measurements during our free in-person assessment",
                      "Professional quotes are completely free with no obligation",
                      "Final price only confirmed after we've seen your property",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                        <span className="text-foreground/90 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ── Price Summary (sticky) ── */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">

                  {/* Price display */}
                  <div className="bg-gradient-to-br from-accent to-accent/80 rounded-xl p-8 text-center">
                    <p className="text-accent-foreground/80 mb-2 text-sm">Estimated Price</p>
                    <div className="text-5xl font-bold text-accent-foreground mb-2">£{estimatedPrice}</div>
                    <p className="text-xs text-accent-foreground/70 mb-6">
                      Based on current rates, your area size &amp; options
                    </p>

                    {/* Price breakdown badges */}
                    <div className="space-y-1.5 mb-6 text-left">
                      {growthLevel === "heavy" && (
                        <p className="text-xs bg-white/20 rounded px-2 py-1 text-accent-foreground">
                          Heavy growth surcharge (+35%)
                        </p>
                      )}
                      {growthLevel === "light" && (
                        <p className="text-xs bg-white/20 rounded px-2 py-1 text-accent-foreground">
                          Light soiling discount (-10%)
                        </p>
                      )}
                      {biocide && (
                        <p className="text-xs bg-white/20 rounded px-2 py-1 text-accent-foreground">
                          Biocide treatment (+£{BIOCIDE_RATE_PER_SQM}/m²)
                        </p>
                      )}
                      {serviceType === "driveway" && surfaceType === "block" && needsResanding && (
                        <p className="text-xs bg-white/20 rounded px-2 py-1 text-accent-foreground">
                          Re-sanding (+£2/m²)
                        </p>
                      )}
                      {!hasExternalPower && (
                        <p className="text-xs bg-white/20 rounded px-2 py-1 text-accent-foreground">
                          Generator surcharge (+£{GENERATOR_SURCHARGE})
                        </p>
                      )}
                      {distanceMiles > 0 && (
                        <p className="text-xs bg-white/20 rounded px-2 py-1 text-accent-foreground">
                          Travel: {distanceMiles} miles included
                        </p>
                      )}
                    </div>

                    <button
                      onClick={handleSendQuote}
                      disabled={!isReady}
                      className="w-full bg-accent-foreground text-accent font-bold py-3 px-6 rounded-lg text-base flex items-center justify-center gap-2 hover:bg-accent-foreground/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Send via WhatsApp
                    </button>
                    {!isReady && (
                      <p className="text-xs text-accent-foreground/60 mt-2">
                        Fill in name, phone &amp; postcode first
                      </p>
                    )}
                  </div>

                  {/* Next steps */}
                  <div className="glass-border rounded-xl p-6">
                    <h3 className="font-bold text-foreground mb-4">Next Steps</h3>
                    <ol className="space-y-3 text-sm text-foreground/90">
                      {[
                        "Send your details via WhatsApp",
                        "We arrange a convenient time to visit — free of charge",
                        "We measure up and confirm your final price on site",
                        "Schedule your service at your convenience",
                      ].map((step, i) => (
                        <li key={step} className="flex gap-3">
                          <span className="font-bold text-accent shrink-0">{i + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Contact info */}
                  <div className="glass-border rounded-xl p-6 space-y-3">
                    <p className="text-sm font-semibold text-foreground">Prefer to contact us directly?</p>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">WhatsApp: </span>
                        <a
                          href="https://wa.me/447418610731"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-success hover:underline font-semibold"
                        >
                          07418 610731
                        </a>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Phone: </span>
                        <a href="tel:07418610731" className="text-accent hover:underline font-semibold">
                          07418 610731
                        </a>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Email: </span>
                        <Link href="/contact" className="text-accent hover:underline font-semibold">
                          Send via contact form
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <PWBFooter />
    </>
  )
}
