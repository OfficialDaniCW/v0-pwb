"use client"

import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import {
  Calculator,
  CheckCircle2,
  Info,
  Zap,
  MessageCircle,
  User,
  Phone,
  Home,
  MapPin,
  AlertCircle,
  Plus,
  Trash2,
  ClipboardList,
} from "lucide-react"
import Link from "next/link"
import { InfoTooltip } from "@/components/info-tooltip"

// ── Helpers ─────────────────────────────────────────────────────────────────
function FieldNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-muted-foreground mt-1.5 flex items-start gap-1">
      <Info className="h-3 w-3 shrink-0 mt-0.5 text-accent/60" />
      <span>{children}</span>
    </p>
  )
}

// ── Constants ────────────────────────────────────────────────────────────────
const DEFAULT_PRICING: Record<string, any> = {
  driveway:  { baseRate: 3,    blockPavingResanding: 2,  easyAccess: 1, hardAccess: 1.3  },
  patio:     { baseRate: 5,    easyAccess: 1,             hardAccess: 1.25               },
  roof:      { baseRate: 11.5, easyAccess: 1,             hardAccess: 1.4                },
  gutter:    { baseRate: 6                                                                },
  walls:     { baseRate: 3,    easyAccess: 1,             hardAccess: 1.3                },
  softwash:  { baseRate: 5,    easyAccess: 1,             hardAccess: 1.35               },
}

const BIOCIDE_RATE_PER_SQM  = 1.5
const GENERATOR_SURCHARGE    = 20
const DISTANCE_RATE          = 0.5
const FUEL_BASE              = 15

const SERVICE_META: Record<string, { label: string; note: string; unit: "sqm" | "lm" }> = {
  driveway: {
    label: "Driveway Cleaning",
    note:  "Tarmac, concrete, block paving or resin-bound. Block paving may need re-sanding after a deep clean.",
    unit:  "sqm",
  },
  patio: {
    label: "Patio / Decking",
    note:  "Indian sandstone, porcelain, concrete slabs, or similar. We remove moss, algae, stains and soiling.",
    unit:  "sqm",
  },
  roof: {
    label: "Roof Cleaning & Moss Removal",
    note:  "Softwash method — safe for all tile types. Biocide treatment available as an add-on.",
    unit:  "sqm",
  },
  gutter: {
    label: "Gutter Clearing & Cleaning",
    note:  "Full debris clearance, downpipe flush and flow test. Priced per linear metre of guttering.",
    unit:  "lm",
  },
  walls: {
    label: "Wall & Facade Cleaning",
    note:  "Brick, render, painted surfaces. Removes algae, mould and staining.",
    unit:  "sqm",
  },
  softwash: {
    label: "Softwash (Render / K-Rend)",
    note:  "Low-pressure chemical clean — ideal for K-Rend, monocouche and cladding.",
    unit:  "sqm",
  },
}

// ── Service job state ────────────────────────────────────────────────────────
type Job = {
  id: string
  serviceType:    string
  size:           number   // sqm or lm depending on service
  access:         "easy" | "hard"
  surfaceType:    "standard" | "block" | "resin" | "tarmac"
  needsResanding: boolean
  growthLevel:    "light" | "moderate" | "heavy"
  mouldLevel:     "none" | "light" | "heavy"
  biocide:        boolean
}

function newJob(): Job {
  return {
    id:            crypto.randomUUID(),
    serviceType:   "driveway",
    size:          50,
    access:        "easy",
    surfaceType:   "standard",
    needsResanding:false,
    growthLevel:   "moderate",
    mouldLevel:    "none",
    biocide:       false,
  }
}

function calcJobPrice(job: Job, pricingData: Record<string, any>): number {
  const rates = pricingData[job.serviceType]
  if (!rates) return 0

  let price = 0
  const isGutter = job.serviceType === "gutter"

  price = job.size * (rates.baseRate ?? 3)

  if (!isGutter && rates.easyAccess != null && rates.hardAccess != null) {
    price *= job.access === "hard" ? rates.hardAccess : rates.easyAccess
  }

  // Growth level
  if (!isGutter) {
    if (job.growthLevel === "heavy")  price *= 1.35
    if (job.growthLevel === "light")  price *= 0.9
  }

  // Mould surcharge (heavy = +20%, light = +10%)
  if (!isGutter) {
    if (job.mouldLevel === "heavy")   price *= 1.2
    if (job.mouldLevel === "light")   price *= 1.1
  }

  // Block paving re-sanding
  if (job.serviceType === "driveway" && job.surfaceType === "block" && job.needsResanding) {
    price += job.size * (rates.blockPavingResanding ?? 2)
  }

  // Biocide
  if (job.biocide) price += job.size * BIOCIDE_RATE_PER_SQM

  return Math.round(price)
}

// ── Option button ─────────────────────────────────────────────────────────────
function OptionBtn({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
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
}

// ── Single job panel ──────────────────────────────────────────────────────────
function JobPanel({
  job,
  index,
  total,
  pricingData,
  onChange,
  onRemove,
}: {
  job: Job
  index: number
  total: number
  pricingData: Record<string, any>
  onChange: (updated: Job) => void
  onRemove: () => void
}) {
  const isGutter = job.serviceType === "gutter"
  const showGrowth = !["gutter"].includes(job.serviceType)
  const price = calcJobPrice(job, pricingData)

  function set<K extends keyof Job>(key: K, value: Job[K]) {
    onChange({ ...job, [key]: value })
  }

  return (
    <div className="glass-border rounded-xl overflow-hidden">
      {/* Job header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
            {index + 1}
          </span>
          <span className="font-bold text-foreground">
            {SERVICE_META[job.serviceType]?.label ?? job.serviceType}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-accent">£{price}</span>
          {total > 1 && (
            <button
              onClick={onRemove}
              className="text-red-400 hover:text-red-300 transition-colors p-1 rounded"
              aria-label="Remove job"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* Service type selector */}
        <div>
          <Label className="text-foreground font-semibold mb-3 block">Service Type</Label>
          <div className="space-y-2">
            {Object.entries(SERVICE_META).map(([id, meta]) => (
              <button
                key={id}
                onClick={() => set("serviceType", id)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  job.serviceType === id
                    ? "border-accent bg-accent/10"
                    : "border-white/20 hover:border-accent/40 hover:bg-white/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                      job.serviceType === id ? "border-accent bg-accent" : "border-white/30"
                    }`}
                  >
                    {job.serviceType === id && <div className="h-1.5 w-1.5 bg-white rounded-full" />}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{meta.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{meta.note}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Size slider */}
        <div>
          <Label className="text-foreground text-base font-semibold mb-3 block">
            {isGutter ? (
              <>Gutter Length: <span className="text-accent">{job.size} m</span></>
            ) : (
              <>Area Size: <span className="text-accent">{job.size} m²</span></>
            )}
          </Label>
          <Slider
            value={[job.size]}
            onValueChange={([v]) => set("size", v)}
            min={isGutter ? 5 : 10}
            max={isGutter ? 100 : 500}
            step={isGutter ? 1 : 5}
            className="w-full"
          />
          <FieldNote>
            {job.serviceType === "driveway" && "A typical single-car driveway is 20–30 m²; double is 40–60 m²."}
            {job.serviceType === "patio" && "An average rear patio is 15–25 m²; larger garden patios can be 40–60 m²."}
            {job.serviceType === "roof" && "A 3-bed semi roof is typically 80–120 m²; detached house 150–250 m²."}
            {job.serviceType === "walls" && "Measure total wall area — height × width of each face to be cleaned."}
            {job.serviceType === "softwash" && "Measure total facade area — front, side and rear walls as required."}
            {job.serviceType === "gutter" && "One side of a terraced house is typically 10–15 m; semi-detached 20–30 m."}
          </FieldNote>
        </div>

        {/* Surface type (driveway only) */}
        {job.serviceType === "driveway" && (
          <div>
            <Label className="text-foreground font-semibold flex items-center gap-2 mb-3">
              Surface Type
              <InfoTooltip
                title="Why does surface type matter?"
                description="Different surfaces need different cleaning methods. Block paving has sand-filled joints that can be displaced during cleaning and may need replacing. Resin-bound surfaces are sensitive to high pressure."
                benefits={[
                  "Block paving: joints may need re-sanding (adds +£2/m²)",
                  "Resin bound: low-pressure softwash approach used",
                  "Tarmac: controlled pressure to avoid softening",
                  "Concrete: standard high-pressure clean",
                ]}
              />
            </Label>
            <div className="flex gap-2 flex-wrap">
              {[
                { id: "standard", label: "Concrete" },
                { id: "block",    label: "Block Paving" },
                { id: "resin",    label: "Resin Bound" },
                { id: "tarmac",   label: "Tarmac" },
              ].map((s) => (
                <OptionBtn
                  key={s.id}
                  active={job.surfaceType === s.id}
                  onClick={() => set("surfaceType", s.id as Job["surfaceType"])}
                >
                  {s.label}
                </OptionBtn>
              ))}
            </div>

            {job.surfaceType === "block" && (
              <button
                onClick={() => set("needsResanding", !job.needsResanding)}
                className={`mt-3 w-full text-left p-3 rounded-lg font-semibold transition-all border-2 ${
                  job.needsResanding
                    ? "bg-[#00C853] border-[#00C853] text-white shadow-lg"
                    : "border-white/20 text-foreground hover:border-[#00C853] hover:bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Re-Sand Joints? +£2/m²</p>
                    <p className="text-xs mt-0.5 opacity-75">Restores kiln-dried sand between blocks after cleaning</p>
                  </div>
                  <span className="text-lg ml-4">{job.needsResanding ? "✓" : "○"}</span>
                </div>
              </button>
            )}
          </div>
        )}

        {/* Growth / soiling level */}
        {showGrowth && (
          <div>
            <Label className="text-foreground font-semibold flex items-center gap-2 mb-3">
              Moss / Algae Growth Level
              <InfoTooltip
                title="Why does soiling level matter?"
                description="The amount of moss, algae or lichen directly affects the time and chemical treatments required. Heavy soiling needs more passes, stronger treatment and longer dwell time."
                benefits={[
                  "Light: mostly surface dirt, minimal biological growth (-10%)",
                  "Moderate: visible moss / algae patches across the surface",
                  "Heavy: thick established moss, lichen or deep staining (+35%)",
                ]}
              />
            </Label>
            <div className="flex gap-2 flex-wrap">
              {[
                { id: "light",    label: "Light",    desc: "Surface dirt, minimal growth" },
                { id: "moderate", label: "Moderate", desc: "Visible moss / algae patches" },
                { id: "heavy",    label: "Heavy",    desc: "Thick established moss / lichen" },
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => set("growthLevel", g.id as Job["growthLevel"])}
                  className={`flex-1 min-w-[100px] p-3 rounded-lg font-semibold transition-all border-2 text-left ${
                    job.growthLevel === g.id
                      ? "bg-[#00C853] border-[#00C853] text-white shadow-lg"
                      : "border-white/20 text-foreground hover:border-[#00C853] hover:bg-white/5"
                  }`}
                >
                  <p className="text-sm font-semibold">{g.label}</p>
                  <p className="text-xs opacity-75 mt-0.5">{g.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mould & mildew condition */}
        {showGrowth && (
          <div>
            <Label className="text-foreground font-semibold flex items-center gap-2 mb-3">
              Mould &amp; Mildew Condition
              <InfoTooltip
                title="Why report mould and mildew?"
                description="Mould and mildew are different to surface moss — they penetrate deeper into porous materials and require specialist chemical treatments to fully eradicate. Knowing the extent upfront lets us bring the right products."
                benefits={[
                  "Mould grows in damp shaded spots — often under overhangs and north-facing surfaces",
                  "Mildew appears as a white/grey powdery coating on walls, patios and render",
                  "Deep mould penetration needs stronger biocide dwell times",
                  "Early treatment prevents long-term structural staining",
                ]}
              />
            </Label>
            <div className="flex gap-2 flex-wrap">
              {[
                {
                  id:   "none",
                  label:"None / Minimal",
                  desc: "No visible mould or mildew",
                },
                {
                  id:   "light",
                  label:"Light Patches",
                  desc: "Small isolated patches, mainly shaded areas",
                },
                {
                  id:   "heavy",
                  label:"Heavy / Widespread",
                  desc: "Large areas of dark mould or mildew staining",
                },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => set("mouldLevel", m.id as Job["mouldLevel"])}
                  className={`flex-1 min-w-[100px] p-3 rounded-lg font-semibold transition-all border-2 text-left ${
                    job.mouldLevel === m.id
                      ? "bg-[#00C853] border-[#00C853] text-white shadow-lg"
                      : "border-white/20 text-foreground hover:border-[#00C853] hover:bg-white/5"
                  }`}
                >
                  <p className="text-sm font-semibold">{m.label}</p>
                  <p className="text-xs opacity-75 mt-0.5">{m.desc}</p>
                </button>
              ))}
            </div>
            {job.mouldLevel !== "none" && (
              <FieldNote>
                {job.mouldLevel === "light"
                  ? "Light mould patches treated with targeted biocide application (+10%)."
                  : "Heavy/widespread mould requires extended dwell times and repeat application (+20%)."}
              </FieldNote>
            )}
          </div>
        )}

        {/* Biocide add-on */}
        <div>
          <Label className="text-foreground font-semibold flex items-center gap-2 mb-3">
            Biocide Treatment Add-on
            <InfoTooltip
              title="What is Biocide Treatment?"
              description="Biocide is a chemical treatment applied after cleaning that kills remaining spores and creates a protective barrier against regrowth. Without it, moss and algae typically return within 1–2 years. With biocide, surfaces stay clean for 3–5 years."
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
            onClick={() => set("biocide", !job.biocide)}
            className={`w-full text-left p-3 rounded-lg font-semibold transition-all border-2 ${
              job.biocide
                ? "bg-[#00C853] border-[#00C853] text-white shadow-lg"
                : "border-white/20 text-foreground hover:border-[#00C853] hover:bg-white/5"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">
                  Add Biocide Treatment{" "}
                  <span className="opacity-75">+£{BIOCIDE_RATE_PER_SQM}/m²</span>
                </p>
                <p className="text-xs mt-0.5 opacity-75">Kills spores &amp; prevents regrowth for 3–5 years</p>
              </div>
              <span className="text-xl ml-4">{job.biocide ? "✓" : "○"}</span>
            </div>
          </button>
        </div>

        {/* Access type */}
        {!isGutter && (
          <div>
            <Label className="text-foreground font-semibold flex items-center gap-2 mb-3">
              Access Difficulty
              <InfoTooltip
                title="What is Access Type?"
                description="We classify access based on how easily we can position equipment and work safely. Difficult access (steep roofs, narrow driveways, enclosed spaces) requires additional safety equipment, time and planning."
                benefits={[
                  "Easy access means faster, more efficient work",
                  "Difficult access requires specialised equipment and extra care",
                  "Safety is our top priority regardless of access level",
                ]}
              />
            </Label>
            <div className="flex gap-2 flex-wrap">
              <OptionBtn active={job.access === "easy"} onClick={() => set("access", "easy")}>
                Easy Access
              </OptionBtn>
              <OptionBtn active={job.access === "hard"} onClick={() => set("access", "hard")}>
                Difficult Access
              </OptionBtn>
            </div>
            <FieldNote>
              Difficult access includes steep roofs, narrow passages, high walls or areas requiring specialist equipment.
            </FieldNote>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function GetQuotePage() {
  const [name,         setName]         = useState("")
  const [phone,        setPhone]        = useState("")
  const [addressLine1, setAddressLine1] = useState("")
  const [addressLine2, setAddressLine2] = useState("")
  const [postcode,     setPostcode]     = useState("")
  const [notes,        setNotes]        = useState("")
  const [postcodeError, setPostcodeError] = useState("")
  const [loadingPostcode, setLoadingPostcode] = useState(false)
  const [distanceMiles, setDistanceMiles] = useState(0)
  const [hasExternalPower, setHasExternalPower] = useState(true)
  const [pricingData,  setPricingData]  = useState<Record<string, any>>(DEFAULT_PRICING)
  const [jobs,         setJobs]         = useState<Job[]>([newJob()])

  // Load live rates from DB
  useEffect(() => {
    fetch("/api/admin/pricing")
      .then((r) => r.json())
      .then((data) => { if (!data.error) setPricingData(data) })
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

  const jobsSubtotal = jobs.reduce((sum, j) => sum + calcJobPrice(j, pricingData), 0)
  const travelSurcharge = Math.round(distanceMiles * 2 * DISTANCE_RATE + FUEL_BASE)
  const generatorSurcharge = hasExternalPower ? 0 : GENERATOR_SURCHARGE
  const totalPrice = jobsSubtotal + travelSurcharge + generatorSurcharge

  const addJob = () => setJobs((prev) => [...prev, newJob()])
  const removeJob = (id: string) => setJobs((prev) => prev.filter((j) => j.id !== id))
  const updateJob = (id: string, updated: Job) =>
    setJobs((prev) => prev.map((j) => (j.id === id ? updated : j)))

  const growthLabel: Record<string, string> = {
    light:    "Light (early growth / mainly dust)",
    moderate: "Moderate (visible moss / algae patches)",
    heavy:    "Heavy (thick moss / established lichen)",
  }
  const mouldLabel: Record<string, string> = {
    none:  "None / Minimal",
    light: "Light patches (shaded areas)",
    heavy: "Heavy / Widespread",
  }

  const handleSendQuote = () => {
    if (!name || !phone || !postcode) {
      alert("Please fill in your name, phone number and postcode.")
      return
    }

    let msg = `Hi! I'd like a quote:\n\n`
    msg += `Name: ${name}\n`
    msg += `Phone: ${phone}\n`
    msg += `Address: ${[addressLine1, addressLine2, postcode].filter(Boolean).join(", ")}\n`
    msg += `Distance from Swanage: ~${distanceMiles} miles\n\n`

    jobs.forEach((job, i) => {
      const meta = SERVICE_META[job.serviceType]
      const isGutter = job.serviceType === "gutter"
      msg += `--- Job ${i + 1}: ${meta?.label ?? job.serviceType} ---\n`
      msg += isGutter
        ? `Gutter Length: ${job.size} m\n`
        : `Area: ${job.size} m²\n`
      if (job.serviceType === "driveway") {
        const surfaceLabels: Record<string, string> = {
          standard: "Concrete", block: "Block Paving", resin: "Resin Bound", tarmac: "Tarmac",
        }
        msg += `Surface Type: ${surfaceLabels[job.surfaceType] ?? job.surfaceType}\n`
        if (job.surfaceType === "block") {
          msg += `Re-sand joints: ${job.needsResanding ? "Yes (+£2/m²)" : "No"}\n`
        }
      }
      if (!isGutter) {
        msg += `Moss/Algae Growth: ${growthLabel[job.growthLevel] ?? job.growthLevel}\n`
        msg += `Mould & Mildew: ${mouldLabel[job.mouldLevel] ?? job.mouldLevel}\n`
      }
      msg += `Access: ${job.access === "easy" ? "Easy" : "Difficult"}\n`
      msg += `Biocide Treatment: ${job.biocide ? "Yes" : "No"}\n`
      msg += `Sub-total: £${calcJobPrice(job, pricingData)}\n\n`
    })

    msg += `External Power: ${hasExternalPower ? "Yes" : "No (generator needed, +£20)"}\n`
    msg += `Travel (${distanceMiles} miles): £${travelSurcharge}\n`
    msg += `\nEstimated Total: £${totalPrice}\n`
    if (notes.trim()) msg += `\nNotes: ${notes.trim()}\n`
    msg += `\nPlease confirm my final quote after your free inspection. Thank you!`

    window.open(`https://wa.me/447418610731?text=${encodeURIComponent(msg)}`, "_blank")
  }

  const isReady = name.trim() && phone.trim() && postcode.trim() && !postcodeError

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
                Add as many services as you need — we&apos;ll price them together and come to you for a free inspection before confirming.
              </p>
              <div className="bg-accent/20 border border-accent/50 rounded-lg p-4 mb-8">
                <p className="text-sm text-foreground flex items-start gap-2">
                  <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  Prices are calculated from our current rates, your area size and chosen options. Everything is verified during our free site visit.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* ── Left / inputs ── */}
              <div className="lg:col-span-2 space-y-8">

                {/* Step 1 — Contact */}
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
                            <span className="text-white/50 ml-1">(travel surcharge applies beyond 20 miles)</span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 2 — Jobs */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">2</span>
                      Services Required
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Need more than one area cleaned? Add multiple jobs below — we&apos;ll bundle them together and give you the best combined price.
                  </p>

                  <div className="space-y-6">
                    {jobs.map((job, index) => (
                      <JobPanel
                        key={job.id}
                        job={job}
                        index={index}
                        total={jobs.length}
                        pricingData={pricingData}
                        onChange={(updated) => updateJob(job.id, updated)}
                        onRemove={() => removeJob(job.id)}
                      />
                    ))}
                  </div>

                  <button
                    onClick={addJob}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-2 border-dashed border-accent/40 text-accent font-semibold hover:border-accent hover:bg-accent/5 transition-all"
                  >
                    <Plus className="h-4 w-4" />
                    Add Another Service
                  </button>
                </div>

                {/* Step 3 — Site info */}
                <div className="glass-border rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">3</span>
                    Site Information
                  </h2>
                  <div>
                    <Label className="text-foreground text-base font-semibold flex items-center gap-2 mb-3">
                      <Zap className="h-5 w-5 text-accent" />
                      Power Supply
                      <InfoTooltip
                        title="Power Supply Requirements"
                        description="Professional cleaning equipment requires reliable electrical power. If external power isn't available, we bring our generator."
                        benefits={[
                          "Generator ensures consistent, quality cleaning results",
                          "We handle all generator setup and safety protocols",
                          "Safe, professional operation on any property",
                        ]}
                      />
                    </Label>
                    <div className="flex gap-3 flex-col">
                      {[
                        { val: true,  label: "Yes — external power available", sub: "Outdoor socket or accessible supply on site" },
                        { val: false, label: `No — bring generator (+£${GENERATOR_SURCHARGE})`, sub: "We handle all setup and safety" },
                      ].map(({ val, label, sub }) => (
                        <button
                          key={String(val)}
                          onClick={() => setHasExternalPower(val)}
                          className={`text-left p-4 rounded-lg font-semibold transition-all border-2 ${
                            hasExternalPower === val
                              ? "bg-[#00C853] border-[#00C853] text-white shadow-lg"
                              : "border-white/20 text-foreground hover:border-[#00C853] hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                hasExternalPower === val ? "bg-white border-white" : "border-white/30"
                              }`}
                            >
                              {hasExternalPower === val && <div className="h-2 w-2 bg-[#00C853] rounded-full" />}
                            </div>
                            <div>
                              <p className="font-semibold">{label}</p>
                              <p className="text-xs opacity-75 mt-0.5">{sub}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 4 — Notes */}
                <div className="glass-border rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">4</span>
                    Additional Notes
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Anything else we should know? Parking, access codes, specific problem areas, or any other details that will help us prepare.
                  </p>
                  <Textarea
                    placeholder="e.g. Gate code is 1234. There's a stubborn oil stain near the garage. Best time to visit is mornings."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  <div className="flex items-start gap-2 mt-3">
                    <ClipboardList className="h-4 w-4 text-accent/60 shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      Your notes will be included in the WhatsApp message so we have everything in one place.
                    </p>
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

              {/* ── Right — sticky price summary ── */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">

                  {/* Price display */}
                  <div className="bg-gradient-to-br from-accent to-accent/80 rounded-xl p-6 text-center">
                    <p className="text-accent-foreground/80 mb-2 text-sm">Estimated Total</p>
                    <div className="text-5xl font-bold text-accent-foreground mb-1">£{totalPrice}</div>
                    <p className="text-xs text-accent-foreground/70 mb-5">
                      Based on current rates, area sizes &amp; options
                    </p>

                    {/* Per-job breakdown */}
                    <div className="space-y-1.5 mb-4 text-left">
                      {jobs.map((job, i) => (
                        <div key={job.id} className="flex justify-between text-xs bg-white/20 rounded px-2 py-1 text-accent-foreground">
                          <span>{SERVICE_META[job.serviceType]?.label ?? job.serviceType}</span>
                          <span className="font-semibold">£{calcJobPrice(job, pricingData)}</span>
                        </div>
                      ))}
                      {travelSurcharge > 0 && (
                        <div className="flex justify-between text-xs bg-white/20 rounded px-2 py-1 text-accent-foreground">
                          <span>Travel ({distanceMiles} mi)</span>
                          <span className="font-semibold">£{travelSurcharge}</span>
                        </div>
                      )}
                      {!hasExternalPower && (
                        <div className="flex justify-between text-xs bg-white/20 rounded px-2 py-1 text-accent-foreground">
                          <span>Generator</span>
                          <span className="font-semibold">+£{GENERATOR_SURCHARGE}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleSendQuote}
                      disabled={!isReady}
                      className="w-full bg-accent-foreground text-accent font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-accent-foreground/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" />
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
