"use client"

import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import {
  Calculator,
  MapPin,
  AlertCircle,
  Zap,
  Droplets,
  DoorOpen,
  Grid3X3,
  MessageCircle,
  Check,
  Info,
  Phone,
  User,
  Home,
} from "lucide-react"

// ─── Tooltip helper ────────────────────────────────────────────────────────────
function InfoNote({ text }: { text: string }) {
  return (
    <p className="text-xs text-white/50 mt-2 flex items-start gap-1">
      <Info className="h-3 w-3 shrink-0 mt-0.5 text-[#1E90FF]/60" />
      {text}
    </p>
  )
}

// ─── Service definitions ───────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "driveway",
    name: "Driveway Cleaning",
    description: "Tarmac, concrete, block paving or resin-bound surfaces. Block paving may need re-sanding after a deep clean.",
  },
  {
    id: "patio",
    name: "Patio / Decking",
    description: "Indian sandstone, porcelain, concrete slabs, timber or composite decking.",
  },
  {
    id: "roof",
    name: "Roof Cleaning",
    description: "Moss and lichen removal via softwash. Biocide treatment highly recommended to prevent regrowth.",
  },
  {
    id: "gutter",
    name: "Gutter Cleaning",
    description: "Full debris removal, downpipe clearing and flow testing. Priced per linear metre.",
  },
  {
    id: "walls",
    name: "Exterior Walls",
    description: "Brick, rendered or painted surfaces. Includes graffiti and algae treatment.",
  },
  {
    id: "softwash",
    name: "Softwash Treatment",
    description: "Low-pressure chemical clean for render, K-Rend and cladding. Gentle on surfaces, highly effective.",
  },
]

const PROPERTY_SIZES = [
  { id: "small", label: "Small", sqmRange: "Up to 50 m²", example: "Single garage or small patio" },
  { id: "medium", label: "Medium", sqmRange: "50–150 m²", example: "Average driveway or standard patio" },
  { id: "large", label: "Large", sqmRange: "150–300 m²", example: "Large driveway or semi-detached roof" },
  { id: "xlarge", label: "Extra Large", sqmRange: "300 m²+", example: "Detached house roof or commercial" },
]

// Access features – purely informational, NOT used to adjust price
const ACCESS_FEATURES = [
  {
    key: "hasElectricity",
    label: "Electricity Available",
    description: "Outdoor socket or accessible power supply on site",
    icon: Zap,
  },
  {
    key: "hasWaterAccess",
    label: "Water Access",
    description: "External tap or hose connection available",
    icon: Droplets,
  },
  {
    key: "hasGateAccess",
    label: "Easy Gate / Entry Access",
    description: "No locked gates, narrow passages or steps blocking access",
    icon: DoorOpen,
  },
  {
    key: "isPaved",
    label: "Paved / Hard Surface",
    description: "Surface is solid (not gravel, loose stones or soil)",
    icon: Grid3X3,
  },
]

export default function PricingPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    postcode: "",
    serviceType: "",
    propertySize: "medium",
  })

  const [accessFeatures, setAccessFeatures] = useState<Record<string, boolean>>({
    hasElectricity: false,
    hasWaterAccess: false,
    hasGateAccess: false,
    isPaved: false,
  })

  const [pricingData, setPricingData] = useState<Record<string, any> | null>(null)
  const [postcodeError, setPostcodeError] = useState("")
  const [isLoadingPostcode, setIsLoadingPostcode] = useState(false)
  const [distanceFromSwanage, setDistanceFromSwanage] = useState<number | null>(null)
  const [estimatedPrice, setEstimatedPrice] = useState(0)

  // Load pricing rates from DB
  useEffect(() => {
    fetch("/api/admin/pricing")
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setPricingData(data)
      })
      .catch(() => {})
  }, [])

  const handlePostcodeChange = async (value: string) => {
    const upperValue = value.toUpperCase()
    setFormData((prev) => ({ ...prev, postcode: upperValue }))
    setPostcodeError("")

    if (!value || value.length < 5) return
    if (!/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(value.trim())) return

    setIsLoadingPostcode(true)
    try {
      const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(value.trim())}`)
      if (!response.ok) {
        setPostcodeError("Postcode not found. Please check and try again.")
        return
      }
      const data = await response.json()
      const { latitude, longitude } = data.result
      const lat1 = (50.6154 * Math.PI) / 180
      const lat2 = (latitude * Math.PI) / 180
      const dLat = ((latitude - 50.6154) * Math.PI) / 180
      const dLon = ((longitude - -1.941) * Math.PI) / 180
      const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
      const dist = 3959 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      setDistanceFromSwanage(Math.round(dist))
      setPostcodeError("")
    } catch {
      setPostcodeError("Unable to verify postcode.")
    } finally {
      setIsLoadingPostcode(false)
    }
  }

  const toggleAccess = (key: string) =>
    setAccessFeatures((prev) => ({ ...prev, [key]: !prev[key] }))

  // ─── Price calculation (access features do NOT affect price) ────────────────
  useEffect(() => {
    if (!formData.serviceType || !pricingData) {
      setEstimatedPrice(0)
      return
    }

    const rates = pricingData[formData.serviceType]
    if (!rates) {
      setEstimatedPrice(0)
      return
    }

    // Map property sizes to approximate m² midpoints
    const sizeMap: Record<string, number> = {
      small: 30,
      medium: 100,
      large: 225,
      xlarge: 400,
    }

    const sqm = sizeMap[formData.propertySize] ?? 100
    let price = 0

    if (formData.serviceType === "gutter") {
      // Treat "sqm" as metres of gutter here (approximate)
      const gutterMetres: Record<string, number> = { small: 15, medium: 25, large: 40, xlarge: 60 }
      price = (gutterMetres[formData.propertySize] ?? 25) * (rates.baseRate ?? 6)
    } else {
      price = sqm * (rates.baseRate ?? 3)
    }

    // Travel surcharge (over 20 miles from Swanage)
    if (distanceFromSwanage && distanceFromSwanage > 20) {
      price += (distanceFromSwanage - 20) * 2
    }

    setEstimatedPrice(Math.round(price))
  }, [formData.serviceType, formData.propertySize, distanceFromSwanage, pricingData])

  const handleGetQuote = () => {
    if (!formData.name || !formData.phone || !formData.postcode || !formData.serviceType) {
      alert("Please fill in your name, phone number, postcode, and choose a service.")
      return
    }

    const serviceName = SERVICES.find((s) => s.id === formData.serviceType)?.name ?? formData.serviceType
    const sizeName = PROPERTY_SIZES.find((s) => s.id === formData.propertySize)?.label ?? formData.propertySize

    let message = `Hi! I'd like a quote:\n\n`
    message += `Name: ${formData.name}\n`
    message += `Phone: ${formData.phone}\n`
    message += `Address: ${formData.addressLine1}${formData.addressLine2 ? `, ${formData.addressLine2}` : ""}, ${formData.postcode}\n`
    message += `Service: ${serviceName}\n`
    message += `Property Size: ${sizeName}\n`
    if (distanceFromSwanage !== null) message += `Distance from Swanage: ~${distanceFromSwanage} miles\n`
    message += `\nProperty Access:\n`
    message += `Electricity Available: ${accessFeatures.hasElectricity ? "Yes" : "No"}\n`
    message += `Water Access: ${accessFeatures.hasWaterAccess ? "Yes" : "No"}\n`
    message += `Gate Access: ${accessFeatures.hasGateAccess ? "Yes" : "No"}\n`
    message += `Paved Surface: ${accessFeatures.isPaved ? "Yes" : "No"}\n`
    message += `\nEstimated Price: £${estimatedPrice}\n`
    message += `\nPlease confirm my quote after your inspection.`

    window.open(`https://wa.me/447418610731?text=${encodeURIComponent(message)}`, "_blank")
  }

  const isReadyForQuote =
    formData.name.trim() &&
    formData.phone.trim() &&
    formData.postcode.trim() &&
    formData.serviceType &&
    !postcodeError

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-6 mx-auto">
                <Calculator className="h-10 w-10 text-[#1E90FF]" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-balance">
                Instant Pricing Estimate
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Fill in your details to get a ballpark figure. We always carry out a free in-person inspection before
                confirming your final price.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {/* ── Left column – form ── */}
                <div className="md:col-span-2 space-y-8">

                  {/* 1 – Your Details */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#1E90FF]/30 flex items-center justify-center text-sm font-bold">1</span>
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
                          value={formData.name}
                          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
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
                          value={formData.phone}
                          onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10"
                        />
                      </div>

                      <div>
                        <Label className="text-white/80 text-sm font-semibold mb-1.5 flex items-center gap-1.5">
                          <Home className="h-3.5 w-3.5 text-[#1E90FF]" />
                          Address Line 1
                        </Label>
                        <Input
                          placeholder="House name / number & street"
                          value={formData.addressLine1}
                          onChange={(e) => setFormData((p) => ({ ...p, addressLine1: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10"
                        />
                      </div>

                      <div>
                        <Label className="text-white/80 text-sm font-semibold mb-1.5">Address Line 2</Label>
                        <Input
                          placeholder="Town / village (optional)"
                          value={formData.addressLine2}
                          onChange={(e) => setFormData((p) => ({ ...p, addressLine2: e.target.value }))}
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
                          value={formData.postcode}
                          onChange={(e) => handlePostcodeChange(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10 max-w-xs"
                        />
                        {isLoadingPostcode && (
                          <p className="text-xs text-[#1E90FF] mt-1.5">Checking postcode…</p>
                        )}
                        {postcodeError && (
                          <p className="text-xs text-red-400 flex items-center gap-1 mt-1.5">
                            <AlertCircle className="h-3 w-3" />
                            {postcodeError}
                          </p>
                        )}
                        {distanceFromSwanage !== null && !postcodeError && !isLoadingPostcode && (
                          <p className="text-xs text-green-400 mt-1.5">
                            Approx. {distanceFromSwanage} miles from Swanage
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 2 – Service */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#1E90FF]/30 flex items-center justify-center text-sm font-bold">2</span>
                      Service Type <span className="text-red-400 text-base">*</span>
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {SERVICES.map((svc) => (
                        <button
                          key={svc.id}
                          onClick={() => setFormData((p) => ({ ...p, serviceType: svc.id }))}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            formData.serviceType === svc.id
                              ? "border-[#1E90FF] bg-[#1E90FF]/15 shadow-lg"
                              : "border-white/15 bg-white/5 hover:border-[#1E90FF]/40 hover:bg-white/10"
                          }`}
                        >
                          <p className="font-semibold text-white text-sm">{svc.name}</p>
                          <p className="text-xs text-white/50 mt-1 leading-relaxed">{svc.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3 – Property Size */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#1E90FF]/30 flex items-center justify-center text-sm font-bold">3</span>
                      Approximate Size
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {PROPERTY_SIZES.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setFormData((p) => ({ ...p, propertySize: size.id }))}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            formData.propertySize === size.id
                              ? "border-[#00C853] bg-[#00C853]/15 shadow-lg"
                              : "border-white/15 bg-white/5 hover:border-[#00C853]/40 hover:bg-white/10"
                          }`}
                        >
                          <p className="font-semibold text-white">{size.label}</p>
                          <p className="text-xs text-[#1E90FF] font-medium mt-0.5">{size.sqmRange}</p>
                          <p className="text-xs text-white/50 mt-1">{size.example}</p>
                        </button>
                      ))}
                    </div>
                    <InfoNote text="Don't worry if you're not sure — we'll measure everything during our free inspection." />
                  </div>

                  {/* 4 – Property Access (info gathering only) */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#1E90FF]/30 flex items-center justify-center text-sm font-bold">4</span>
                      Property Access
                    </h2>
                    <p className="text-sm text-white/55 mb-5">
                      This helps us prepare the right equipment for your visit — it does{" "}
                      <strong className="text-white/80">not</strong> affect your estimate. We bring our own generator
                      and water tank where needed.
                    </p>

                    <div className="space-y-2">
                      {ACCESS_FEATURES.map(({ key, label, description, icon: Icon }) => (
                        <button
                          key={key}
                          onClick={() => toggleAccess(key)}
                          className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                            accessFeatures[key]
                              ? "border-[#00C853] bg-[#00C853]/10"
                              : "border-white/15 bg-white/5 hover:border-white/30"
                          }`}
                        >
                          <div className="flex items-center gap-3 text-left">
                            <Icon className="h-5 w-5 text-[#1E90FF] shrink-0" />
                            <div>
                              <p className="text-white font-medium text-sm">{label}</p>
                              <p className="text-white/50 text-xs mt-0.5">{description}</p>
                            </div>
                          </div>
                          {accessFeatures[key] && <Check className="h-5 w-5 text-[#00C853] shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Right column – sticky summary ── */}
                <div className="md:col-span-1">
                  <div className="sticky top-24 bg-gradient-to-br from-[#1E90FF]/20 to-[#00C853]/20 rounded-xl p-7 border-2 border-white/10">
                    <p className="text-white/70 text-sm font-medium mb-1">Estimated Price</p>
                    <div className="mb-5">
                      {estimatedPrice > 0 ? (
                        <p className="text-5xl font-bold text-white">£{estimatedPrice}</p>
                      ) : (
                        <p className="text-2xl font-semibold text-white/40">Select a service</p>
                      )}
                      <p className="text-xs text-white/50 mt-2">
                        {formData.serviceType
                          ? "Based on your selections — final price confirmed after inspection"
                          : "Fill in your details above to see an estimate"}
                      </p>
                    </div>

                    <div className="space-y-2.5 mb-5 pb-5 border-b border-white/10 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Service</span>
                        <span className="text-white font-medium text-right max-w-[60%]">
                          {formData.serviceType
                            ? SERVICES.find((s) => s.id === formData.serviceType)?.name
                            : "—"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Size</span>
                        <span className="text-white font-medium">
                          {PROPERTY_SIZES.find((s) => s.id === formData.propertySize)?.label ?? "—"}
                        </span>
                      </div>
                      {distanceFromSwanage !== null && (
                        <div className="flex justify-between">
                          <span className="text-white/60">Distance</span>
                          <span className="text-white font-medium">{distanceFromSwanage} miles</span>
                        </div>
                      )}
                    </div>

                    {/* In-person inspection note */}
                    <div className="bg-[#1E90FF]/10 border border-[#1E90FF]/20 rounded-lg p-3 mb-5">
                      <p className="text-xs text-white/70 leading-relaxed">
                        <strong className="text-[#1E90FF]">Free in-person inspection included.</strong> Every job gets
                        a site visit before we confirm your final price — no surprises.
                      </p>
                    </div>

                    <Button
                      onClick={handleGetQuote}
                      disabled={!isReadyForQuote}
                      className="w-full h-12 bg-[#00C853] hover:bg-[#00C853]/90 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Send Quote Request via WhatsApp
                    </Button>

                    <p className="text-xs text-white/40 mt-3 text-center">
                      Your details are only used to prepare your quote.
                    </p>
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
