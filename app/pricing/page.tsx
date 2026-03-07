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
  Info,
  Zap,
  Droplets,
  DoorOpen,
  Grid3X3,
  MessageCircle,
  Check,
  Plus,
  Trash2,
  ClipboardList,
  MapPin,
  AlertCircle,
  User,
  Phone,
  Home,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

// ─── Helpers ─────────────────────────────────────────────────────────────────
function FieldNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-white/50 mt-1.5 flex items-start gap-1">
      <Info className="h-3 w-3 shrink-0 mt-0.5 text-[#1E90FF]/60" />
      <span>{children}</span>
    </p>
  )
}

function SectionLabel({
  children,
  tooltip,
}: {
  children: React.ReactNode
  tooltip?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2">
        <Label className="text-white font-semibold text-sm">{children}</Label>
        {tooltip && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-[#1E90FF]/70 hover:text-[#1E90FF] transition-colors"
            aria-label="More info"
          >
            <Info className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {tooltip && open && (
        <p className="mt-1.5 text-xs text-white/55 bg-white/5 border border-white/10 rounded-lg px-3 py-2 leading-relaxed">
          {tooltip}
        </p>
      )}
    </div>
  )
}

// ─── Constants ───────────────────────────────────────────────────────────────
const DEFAULT_PRICING: Record<string, any> = {
  driveway:  { baseRate: 3,    blockPavingResanding: 2  },
  patio:     { baseRate: 5                              },
  roof:      { baseRate: 11.5                           },
  gutter:    { baseRate: 6                              },
  walls:     { baseRate: 3                              },
  softwash:  { baseRate: 5                              },
}

const BIOCIDE_RATE = 1.5
const GENERATOR_SURCHARGE = 20
const DISTANCE_RATE = 0.5
const FUEL_BASE = 15

const SERVICE_META: Record<string, { label: string; note: string; unit: "sqm" | "lm" }> = {
  driveway: {
    label: "Driveway Cleaning",
    note: "Tarmac, concrete, block paving or resin-bound. Block paving may need re-sanding after a deep clean.",
    unit: "sqm",
  },
  patio: {
    label: "Patio / Decking",
    note: "Indian sandstone, porcelain, concrete slabs or timber/composite decking. Removes moss, algae and staining.",
    unit: "sqm",
  },
  roof: {
    label: "Roof Cleaning & Moss Removal",
    note: "Softwash method — safe for all tile types. Biocide treatment recommended to prevent regrowth.",
    unit: "sqm",
  },
  gutter: {
    label: "Gutter Clearing & Cleaning",
    note: "Full debris clearance, downpipe flush and flow test. Priced per linear metre of guttering.",
    unit: "lm",
  },
  walls: {
    label: "Wall & Facade Cleaning",
    note: "Brick, render, painted or cladded surfaces. Removes algae, mould and environmental staining.",
    unit: "sqm",
  },
  softwash: {
    label: "Softwash (Render / K-Rend)",
    note: "Low-pressure chemical clean — ideal for K-Rend, monocouche and cladding. Gentle but highly effective.",
    unit: "sqm",
  },
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Job = {
  id: string
  serviceType: string
  size: number
  access: "easy" | "hard"
  surfaceType: "standard" | "block" | "resin" | "tarmac"
  needsResanding: boolean
  growthLevel: "light" | "moderate" | "heavy"
  mouldLevel: "none" | "light" | "heavy"
  biocide: boolean
  collapsed: boolean
}

function newJob(): Job {
  return {
    id: crypto.randomUUID(),
    serviceType: "driveway",
    size: 50,
    access: "easy",
    surfaceType: "standard",
    needsResanding: false,
    growthLevel: "moderate",
    mouldLevel: "none",
    biocide: false,
    collapsed: false,
  }
}

function calcJobPrice(job: Job, pricing: Record<string, any>): number {
  const rates = pricing[job.serviceType]
  if (!rates) return 0
  const isGutter = job.serviceType === "gutter"
  let price = job.size * (rates.baseRate ?? 3)
  if (!isGutter) {
    if (job.growthLevel === "heavy") price *= 1.35
    if (job.growthLevel === "light") price *= 0.9
    if (job.mouldLevel === "heavy") price *= 1.2
    if (job.mouldLevel === "light") price *= 1.1
    if (job.access === "hard") price *= 1.3
  }
  if (job.serviceType === "driveway" && job.surfaceType === "block" && job.needsResanding) {
    price += job.size * (rates.blockPavingResanding ?? 2)
  }
  if (job.biocide) price += job.size * BIOCIDE_RATE
  return Math.round(price)
}

// ─── Option button ────────────────────────────────────────────────────────────
function Opt({
  active,
  onClick,
  children,
  className = "",
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 min-w-[90px] py-2.5 px-3 rounded-lg font-semibold transition-all border-2 text-sm text-left ${
        active
          ? "bg-[#00C853] border-[#00C853] text-white shadow"
          : "border-white/20 text-white hover:border-[#00C853]/60 hover:bg-white/5"
      } ${className}`}
    >
      {children}
    </button>
  )
}

// ─── Single job card ──────────────────────────────────────────────────────────
function JobCard({
  job,
  index,
  total,
  pricing,
  onChange,
  onRemove,
}: {
  job: Job
  index: number
  total: number
  pricing: Record<string, any>
  onChange: (j: Job) => void
  onRemove: () => void
}) {
  const isGutter = job.serviceType === "gutter"
  const price = calcJobPrice(job, pricing)

  function set<K extends keyof Job>(k: K, v: Job[K]) {
    onChange({ ...job, [k]: v })
  }

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      {/* Card header */}
      <div
        className="flex items-center justify-between px-5 py-4 bg-white/5 border-b border-white/10 cursor-pointer select-none"
        onClick={() => set("collapsed", !job.collapsed)}
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-[#1E90FF]/25 flex items-center justify-center text-xs font-bold text-[#1E90FF]">
            {index + 1}
          </span>
          <div>
            <p className="font-bold text-white text-sm">
              {SERVICE_META[job.serviceType]?.label ?? job.serviceType}
            </p>
            <p className="text-xs text-white/50">
              {isGutter ? `${job.size} m` : `${job.size} m²`}
              {job.biocide ? " · Biocide" : ""}
              {job.mouldLevel !== "none" ? ` · Mould: ${job.mouldLevel}` : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-[#00C853]">£{price}</span>
          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRemove()
              }}
              className="text-red-400 hover:text-red-300 transition-colors p-1 rounded"
              aria-label="Remove job"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
          {job.collapsed ? (
            <ChevronDown className="h-4 w-4 text-white/40" />
          ) : (
            <ChevronUp className="h-4 w-4 text-white/40" />
          )}
        </div>
      </div>

      {!job.collapsed && (
        <div className="p-5 space-y-6">
          {/* Service selector */}
          <div>
            <SectionLabel>Service Type</SectionLabel>
            <div className="space-y-1.5">
              {Object.entries(SERVICE_META).map(([id, meta]) => (
                <button
                  key={id}
                  onClick={() => set("serviceType", id)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    job.serviceType === id
                      ? "border-[#1E90FF] bg-[#1E90FF]/15"
                      : "border-white/15 hover:border-[#1E90FF]/40 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-3.5 w-3.5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                        job.serviceType === id ? "border-[#1E90FF] bg-[#1E90FF]" : "border-white/30"
                      }`}
                    >
                      {job.serviceType === id && <div className="h-1.5 w-1.5 bg-white rounded-full" />}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{meta.label}</p>
                      <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{meta.note}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <SectionLabel>
              {isGutter
                ? <>Gutter Length: <span className="text-[#00C853]">{job.size} m</span></>
                : <>Area Size: <span className="text-[#00C853]">{job.size} m²</span></>}
            </SectionLabel>
            <Slider
              value={[job.size]}
              onValueChange={([v]) => set("size", v)}
              min={isGutter ? 5 : 10}
              max={isGutter ? 100 : 500}
              step={isGutter ? 1 : 5}
              className="w-full"
            />
            <FieldNote>
              {job.serviceType === "driveway" && "Single-car driveway ≈ 20–30 m²; double ≈ 40–60 m²."}
              {job.serviceType === "patio"    && "Average rear patio ≈ 15–25 m²; larger gardens can be 40–60 m²."}
              {job.serviceType === "roof"     && "3-bed semi roof ≈ 80–120 m²; detached house ≈ 150–250 m²."}
              {job.serviceType === "walls"    && "Measure height × width of each wall face to be cleaned."}
              {job.serviceType === "softwash" && "Measure total facade — front, side and rear walls as needed."}
              {job.serviceType === "gutter"   && "Terraced house one side ≈ 10–15 m; semi-detached ≈ 20–30 m."}
            </FieldNote>
          </div>

          {/* Surface type (driveway only) */}
          {job.serviceType === "driveway" && (
            <div>
              <SectionLabel tooltip="Different surfaces need different methods. Block paving has sand-filled joints that can be displaced and may need replacing (+£2/m²). Resin-bound needs low-pressure softwash. Tarmac uses controlled pressure to avoid softening.">
                Surface Type
              </SectionLabel>
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: "standard", label: "Concrete" },
                  { id: "block",    label: "Block Paving" },
                  { id: "resin",    label: "Resin Bound" },
                  { id: "tarmac",   label: "Tarmac" },
                ].map((s) => (
                  <Opt
                    key={s.id}
                    active={job.surfaceType === s.id}
                    onClick={() => set("surfaceType", s.id as Job["surfaceType"])}
                  >
                    {s.label}
                  </Opt>
                ))}
              </div>

              {job.surfaceType === "block" && (
                <button
                  onClick={() => set("needsResanding", !job.needsResanding)}
                  className={`mt-3 w-full text-left p-3 rounded-lg transition-all border-2 ${
                    job.needsResanding
                      ? "bg-[#00C853] border-[#00C853] text-white"
                      : "border-white/20 text-white hover:border-[#00C853]/50 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Re-Sand Joints? +£2/m²</p>
                      <p className="text-xs opacity-70 mt-0.5">
                        Restores kiln-dried sand between blocks after cleaning
                      </p>
                    </div>
                    {job.needsResanding && <Check className="h-5 w-5 shrink-0" />}
                  </div>
                </button>
              )}
            </div>
          )}

          {/* Moss / Algae growth level */}
          {!isGutter && (
            <div>
              <SectionLabel tooltip="The amount of moss, algae or lichen directly affects time and chemical treatments required. Heavy soiling needs more passes, stronger treatment and longer dwell time. Light growth gets a small discount as the job takes less time.">
                Moss / Algae Growth Level
              </SectionLabel>
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: "light",    label: "Light",    desc: "Surface dirt, minimal growth" },
                  { id: "moderate", label: "Moderate", desc: "Visible moss / algae patches" },
                  { id: "heavy",    label: "Heavy",    desc: "Thick established moss / lichen (+35%)" },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => set("growthLevel", g.id as Job["growthLevel"])}
                    className={`flex-1 min-w-[90px] p-3 rounded-lg font-semibold transition-all border-2 text-left text-sm ${
                      job.growthLevel === g.id
                        ? "bg-[#00C853] border-[#00C853] text-white shadow"
                        : "border-white/20 text-white hover:border-[#00C853]/50 hover:bg-white/5"
                    }`}
                  >
                    <p className="font-semibold">{g.label}</p>
                    <p className="text-xs opacity-70 mt-0.5 leading-snug">{g.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mould & mildew */}
          {!isGutter && (
            <div>
              <SectionLabel tooltip="Mould and mildew penetrate deeper into porous materials than surface moss and require specialist chemical treatments. Knowing the extent upfront lets us bring the right products. Mould often grows in damp shaded spots — north-facing surfaces, under overhangs.">
                Mould &amp; Mildew Condition
              </SectionLabel>
              <div className="flex gap-2 flex-wrap">
                {[
                  {
                    id:    "none",
                    label: "None",
                    desc:  "No visible mould or mildew",
                  },
                  {
                    id:    "light",
                    label: "Light Patches",
                    desc:  "Small isolated patches, mainly shaded areas (+10%)",
                  },
                  {
                    id:    "heavy",
                    label: "Heavy / Widespread",
                    desc:  "Large dark mould / mildew staining (+20%)",
                  },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => set("mouldLevel", m.id as Job["mouldLevel"])}
                    className={`flex-1 min-w-[90px] p-3 rounded-lg font-semibold transition-all border-2 text-left text-sm ${
                      job.mouldLevel === m.id
                        ? "bg-[#00C853] border-[#00C853] text-white shadow"
                        : "border-white/20 text-white hover:border-[#00C853]/50 hover:bg-white/5"
                    }`}
                  >
                    <p className="font-semibold">{m.label}</p>
                    <p className="text-xs opacity-70 mt-0.5 leading-snug">{m.desc}</p>
                  </button>
                ))}
              </div>
              {job.mouldLevel !== "none" && (
                <FieldNote>
                  {job.mouldLevel === "light"
                    ? "Light mould treated with targeted biocide. We recommend adding biocide treatment below."
                    : "Heavy mould needs extended dwell times and repeat application. Biocide treatment strongly advised."}
                </FieldNote>
              )}
            </div>
          )}

          {/* Biocide add-on */}
          <div>
            <SectionLabel tooltip="Biocide is applied after cleaning to kill remaining spores and create a protective barrier against regrowth. Without it, moss and algae typically return within 1–2 years. With biocide, surfaces stay clean for 3–5 years.">
              Biocide Treatment Add-on
            </SectionLabel>
            <button
              onClick={() => set("biocide", !job.biocide)}
              className={`w-full text-left p-3 rounded-lg transition-all border-2 ${
                job.biocide
                  ? "bg-[#00C853] border-[#00C853] text-white"
                  : "border-white/20 text-white hover:border-[#00C853]/50 hover:bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    Add Biocide Treatment{" "}
                    <span className="opacity-70">+£{BIOCIDE_RATE}/m²</span>
                  </p>
                  <p className="text-xs opacity-70 mt-0.5">
                    Kills spores &amp; prevents regrowth for 3–5 years
                  </p>
                </div>
                {job.biocide && <Check className="h-5 w-5 shrink-0" />}
              </div>
            </button>
          </div>

          {/* Access */}
          {!isGutter && (
            <div>
              <SectionLabel tooltip="Access affects the time and equipment we need. Difficult access includes steep roof pitches, narrow driveways, tall walls or areas requiring specialist scaffold/equipment.">
                Access Difficulty
              </SectionLabel>
              <div className="flex gap-2">
                <Opt active={job.access === "easy"} onClick={() => set("access", "easy")}>Easy access</Opt>
                <Opt active={job.access === "hard"} onClick={() => set("access", "hard")}>Difficult access (+30%)</Opt>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Access info toggles ──────────────────────────────────────────────────────
const ACCESS_ITEMS = [
  { key: "electricity", label: "Electricity Available",     desc: "Outdoor socket or accessible power supply on site",     icon: Zap },
  { key: "water",       label: "Water Access",              desc: "External tap or hose connection available",              icon: Droplets },
  { key: "gate",        label: "Easy Gate / Entry Access",  desc: "No locked gates, narrow passages or steps blocking access", icon: DoorOpen },
  { key: "paved",       label: "Paved / Hard Surface",      desc: "Solid surface (not gravel, loose stones or soil)",       icon: Grid3X3 },
]

// ─── Main page ────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [name,         setName]         = useState("")
  const [phone,        setPhone]        = useState("")
  const [addressLine1, setAddressLine1] = useState("")
  const [addressLine2, setAddressLine2] = useState("")
  const [postcode,     setPostcode]     = useState("")
  const [notes,        setNotes]        = useState("")
  const [postcodeError, setPostcodeError] = useState("")
  const [loadingPostcode, setLoadingPostcode] = useState(false)
  const [distanceMiles, setDistanceMiles] = useState(0)
  const [access, setAccess] = useState<Record<string, boolean>>({
    electricity: false, water: false, gate: false, paved: false,
  })
  const [hasExternalPower, setHasExternalPower] = useState(true)
  const [jobs, setJobs] = useState<Job[]>([newJob()])
  const [pricing, setPricing] = useState<Record<string, any>>(DEFAULT_PRICING)

  useEffect(() => {
    fetch("/api/admin/pricing")
      .then((r) => r.json())
      .then((d) => { if (!d.error) setPricing(d) })
      .catch(() => {})
  }, [])

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
    } catch {
      setPostcodeError("Unable to verify postcode.")
    } finally {
      setLoadingPostcode(false)
    }
  }

  const jobsSubtotal = jobs.reduce((sum, j) => sum + calcJobPrice(j, pricing), 0)
  const travelSurcharge = distanceMiles > 0 ? Math.round(distanceMiles * 2 * DISTANCE_RATE + FUEL_BASE) : 0
  const generatorSurcharge = hasExternalPower ? 0 : GENERATOR_SURCHARGE
  const totalPrice = jobsSubtotal + travelSurcharge + generatorSurcharge

  const addJob = () => setJobs((prev) => [...prev, newJob()])
  const removeJob = (id: string) => setJobs((prev) => prev.filter((j) => j.id !== id))
  const updateJob = (id: string, updated: Job) =>
    setJobs((prev) => prev.map((j) => (j.id === id ? updated : j)))

  const mouldLabel: Record<string, string> = {
    none: "None / Minimal",
    light: "Light patches (shaded areas)",
    heavy: "Heavy / Widespread",
  }
  const growthLabel: Record<string, string> = {
    light: "Light (early growth / mainly dust)",
    moderate: "Moderate (visible moss / algae patches)",
    heavy: "Heavy (thick moss / established lichen)",
  }

  const handleSend = () => {
    if (!name || !phone || !postcode) {
      alert("Please fill in your name, phone number and postcode.")
      return
    }

    let msg = `Hi! I'd like a quote:\n\n`
    msg += `Name: ${name}\n`
    msg += `Phone: ${phone}\n`
    msg += `Address: ${[addressLine1, addressLine2, postcode].filter(Boolean).join(", ")}\n`
    if (distanceMiles > 0) msg += `Distance from Swanage: ~${distanceMiles} miles\n`

    msg += `\nProperty Access:\n`
    msg += `Electricity Available: ${access.electricity ? "Yes" : "No"}\n`
    msg += `Water Access: ${access.water ? "Yes" : "No"}\n`
    msg += `Easy Gate Access: ${access.gate ? "Yes" : "No"}\n`
    msg += `Paved Surface: ${access.paved ? "Yes" : "No"}\n`
    msg += `External Power: ${hasExternalPower ? "Yes" : "No (generator needed)"}\n`

    msg += `\n--- Services Requested ---\n`
    jobs.forEach((job, i) => {
      const meta = SERVICE_META[job.serviceType]
      const isGutter = job.serviceType === "gutter"
      msg += `\nJob ${i + 1}: ${meta?.label ?? job.serviceType}\n`
      msg += isGutter ? `Length: ${job.size} m\n` : `Area: ${job.size} m²\n`
      if (job.serviceType === "driveway") {
        const sl: Record<string, string> = { standard: "Concrete", block: "Block Paving", resin: "Resin Bound", tarmac: "Tarmac" }
        msg += `Surface: ${sl[job.surfaceType]}\n`
        if (job.surfaceType === "block") msg += `Re-sand joints: ${job.needsResanding ? "Yes" : "No"}\n`
      }
      if (!isGutter) {
        msg += `Moss/Algae Growth: ${growthLabel[job.growthLevel] ?? job.growthLevel}\n`
        msg += `Mould & Mildew: ${mouldLabel[job.mouldLevel] ?? job.mouldLevel}\n`
        msg += `Access: ${job.access === "easy" ? "Easy" : "Difficult"}\n`
      }
      msg += `Biocide Treatment: ${job.biocide ? "Yes" : "No"}\n`
      msg += `Sub-total: £${calcJobPrice(job, pricing)}\n`
    })

    msg += `\nEstimated Total: £${totalPrice}`
    if (travelSurcharge > 0) msg += ` (inc. travel £${travelSurcharge})`
    if (!hasExternalPower) msg += ` (inc. generator £${GENERATOR_SURCHARGE})`
    if (notes.trim()) msg += `\n\nNotes: ${notes.trim()}`
    msg += `\n\nPlease confirm my final quote after your free inspection. Thanks!`

    window.open(`https://wa.me/447418610731?text=${encodeURIComponent(msg)}`, "_blank")
  }

  const isReady = name.trim() && phone.trim() && postcode.trim() && !postcodeError

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">

            {/* Header */}
            <div className="text-center mb-14">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-6 mx-auto">
                <Calculator className="h-10 w-10 text-[#1E90FF]" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-balance">
                Instant Pricing Estimate
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto text-balance">
                Add every surface you need cleaned — we&apos;ll bundle them together and visit you for a free inspection before confirming your final price.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">

                {/* ── Left — form ── */}
                <div className="md:col-span-2 space-y-8">

                  {/* Step 1 — Your Details */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#1E90FF]/30 flex items-center justify-center text-sm font-bold text-[#1E90FF]">1</span>
                      Your Details
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white/80 text-sm font-semibold mb-1.5 flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-[#1E90FF]" />
                          Full Name <span className="text-red-400">*</span>
                        </Label>
                        <Input
                          placeholder="e.g. John Smith"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10"
                        />
                      </div>
                      <div>
                        <Label className="text-white/80 text-sm font-semibold mb-1.5 flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-[#1E90FF]" />
                          Phone Number <span className="text-red-400">*</span>
                        </Label>
                        <Input
                          placeholder="e.g. 07700 900000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10"
                        />
                      </div>
                      <div>
                        <Label className="text-white/80 text-sm font-semibold mb-1.5 flex items-center gap-1.5">
                          <Home className="h-3.5 w-3.5 text-[#1E90FF]" />
                          Address Line 1
                        </Label>
                        <Input
                          placeholder="House number & street"
                          value={addressLine1}
                          onChange={(e) => setAddressLine1(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10"
                        />
                      </div>
                      <div>
                        <Label className="text-white/80 text-sm font-semibold mb-1.5">Address Line 2</Label>
                        <Input
                          placeholder="Town / village (optional)"
                          value={addressLine2}
                          onChange={(e) => setAddressLine2(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="text-white/80 text-sm font-semibold mb-1.5 flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-[#1E90FF]" />
                          Postcode <span className="text-red-400">*</span>
                        </Label>
                        <Input
                          placeholder="e.g. BH19 2JJ"
                          value={postcode}
                          onChange={(e) => handlePostcodeChange(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10 max-w-xs"
                        />
                        {loadingPostcode && <p className="text-xs text-[#1E90FF] mt-1.5">Checking postcode…</p>}
                        {postcodeError && (
                          <p className="text-xs text-red-400 flex items-center gap-1 mt-1.5">
                            <AlertCircle className="h-3 w-3" /> {postcodeError}
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

                  {/* Step 2 — Services */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-[#1E90FF]/30 flex items-center justify-center text-sm font-bold text-[#1E90FF]">2</span>
                        Services Required
                      </h2>
                    </div>
                    <p className="text-sm text-white/55 mb-5">
                      Need more than one surface cleaned? Add multiple jobs below — we bundle them together for the best price.
                    </p>

                    <div className="space-y-4">
                      {jobs.map((job, index) => (
                        <JobCard
                          key={job.id}
                          job={job}
                          index={index}
                          total={jobs.length}
                          pricing={pricing}
                          onChange={(updated) => updateJob(job.id, updated)}
                          onRemove={() => removeJob(job.id)}
                        />
                      ))}
                    </div>

                    <button
                      onClick={addJob}
                      className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-2 border-dashed border-[#1E90FF]/40 text-[#1E90FF] font-semibold hover:border-[#1E90FF] hover:bg-[#1E90FF]/5 transition-all text-sm"
                    >
                      <Plus className="h-4 w-4" />
                      Add Another Service
                    </button>
                  </div>

                  {/* Step 3 — Property Access (info only) */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#1E90FF]/30 flex items-center justify-center text-sm font-bold text-[#1E90FF]">3</span>
                      Property Access
                    </h2>
                    <p className="text-sm text-white/55 mb-5">
                      Helps us bring the right equipment. This does{" "}
                      <strong className="text-white/80">not</strong> affect your estimate — we bring our own generator and water tank where needed.
                    </p>

                    <div className="space-y-2 mb-5">
                      {ACCESS_ITEMS.map(({ key, label, desc, icon: Icon }) => (
                        <button
                          key={key}
                          onClick={() => setAccess((prev) => ({ ...prev, [key]: !prev[key] }))}
                          className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                            access[key]
                              ? "border-[#00C853] bg-[#00C853]/10"
                              : "border-white/15 bg-white/5 hover:border-white/30"
                          }`}
                        >
                          <div className="flex items-center gap-3 text-left">
                            <Icon className="h-5 w-5 text-[#1E90FF] shrink-0" />
                            <div>
                              <p className="text-white font-medium text-sm">{label}</p>
                              <p className="text-white/50 text-xs mt-0.5">{desc}</p>
                            </div>
                          </div>
                          {access[key] && <Check className="h-5 w-5 text-[#00C853] shrink-0" />}
                        </button>
                      ))}
                    </div>

                    {/* External power */}
                    <div>
                      <p className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-[#1E90FF]" /> External Power Supply
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <Opt active={hasExternalPower === true}  onClick={() => setHasExternalPower(true)}>
                          Yes — socket available
                        </Opt>
                        <Opt active={hasExternalPower === false} onClick={() => setHasExternalPower(false)}>
                          No — bring generator (+£{GENERATOR_SURCHARGE})
                        </Opt>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 — Notes */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#1E90FF]/30 flex items-center justify-center text-sm font-bold text-[#1E90FF]">4</span>
                      Additional Notes
                    </h2>
                    <p className="text-sm text-white/55 mb-4">
                      Parking info, gate codes, specific problem areas, best times to visit — anything that helps us prepare.
                    </p>
                    <Textarea
                      placeholder="e.g. Gate code is 1234. Stubborn oil stain near garage. Mornings work best."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[100px] resize-none bg-white/10 border-white/20 text-white placeholder:text-white/30"
                    />
                    <div className="flex items-start gap-2 mt-3">
                      <ClipboardList className="h-4 w-4 text-[#1E90FF]/50 shrink-0 mt-0.5" />
                      <p className="text-xs text-white/45">
                        Your notes are included in the WhatsApp message so we have everything in one place.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Right — sticky summary ── */}
                <div className="md:col-span-1">
                  <div className="sticky top-24 space-y-4">
                    <div className="bg-gradient-to-br from-[#1E90FF]/25 to-[#00C853]/20 rounded-xl p-6 border-2 border-white/10">
                      <p className="text-white/70 text-sm font-medium mb-1">Estimated Total</p>
                      <p className="text-5xl font-bold text-white mb-1">
                        {totalPrice > 0 ? `£${totalPrice}` : "—"}
                      </p>
                      <p className="text-xs text-white/45 mb-5">
                        {totalPrice > 0
                          ? "Based on your selections — confirmed after inspection"
                          : "Fill in your details to see an estimate"}
                      </p>

                      {/* Job breakdown */}
                      {jobs.length > 0 && totalPrice > 0 && (
                        <div className="space-y-1.5 mb-4 pb-4 border-b border-white/10">
                          {jobs.map((job) => (
                            <div key={job.id} className="flex justify-between text-xs text-white/70">
                              <span className="truncate mr-2">{SERVICE_META[job.serviceType]?.label ?? job.serviceType}</span>
                              <span className="font-semibold text-white shrink-0">£{calcJobPrice(job, pricing)}</span>
                            </div>
                          ))}
                          {travelSurcharge > 0 && (
                            <div className="flex justify-between text-xs text-white/70">
                              <span>Travel ({distanceMiles} mi)</span>
                              <span className="font-semibold text-white">£{travelSurcharge}</span>
                            </div>
                          )}
                          {!hasExternalPower && (
                            <div className="flex justify-between text-xs text-white/70">
                              <span>Generator</span>
                              <span className="font-semibold text-white">+£{GENERATOR_SURCHARGE}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="bg-[#1E90FF]/10 border border-[#1E90FF]/20 rounded-lg p-3 mb-5">
                        <p className="text-xs text-white/70 leading-relaxed">
                          <strong className="text-[#1E90FF]">Free in-person inspection included.</strong> Every job gets a site visit before we confirm your final price — no surprises.
                        </p>
                      </div>

                      <Button
                        onClick={handleSend}
                        disabled={!isReady}
                        className="w-full h-11 bg-[#00C853] hover:bg-[#00C853]/90 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
                      >
                        <MessageCircle className="h-4 w-4 shrink-0" />
                        Send via WhatsApp
                      </Button>

                      {!isReady && (
                        <p className="text-xs text-white/40 mt-2 text-center">
                          Fill in name, phone &amp; postcode first
                        </p>
                      )}
                    </div>

                    {/* Next steps */}
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                      <h3 className="font-bold text-white mb-3 text-sm">What Happens Next</h3>
                      <ol className="space-y-2.5 text-sm text-white/70">
                        {[
                          "Send your details via WhatsApp",
                          "We arrange a free site visit",
                          "We measure up & confirm your price on site",
                          "Schedule at your convenience",
                        ].map((step, i) => (
                          <li key={step} className="flex gap-2.5">
                            <span className="font-bold text-[#1E90FF] shrink-0">{i + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
