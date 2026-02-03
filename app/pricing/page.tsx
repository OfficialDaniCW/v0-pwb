"use client"

import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"
import { Calculator, CheckCircle2, Info, Droplets, Zap, MapPin, AlertCircle, Package, Car, Home, Book as Roof, Pipette, Waves, Wind } from "lucide-react"

const SERVICES = [
  { id: "driveway", name: "Driveway Cleaning", icon: Car },
  { id: "patio", name: "Patio/Decking", icon: Home },
  { id: "roof", name: "Roof Cleaning", icon: Roof },
  { id: "gutter", name: "Gutter Cleaning", icon: Droplets },
  { id: "walls", name: "Exterior Walls", icon: Wind },
  { id: "softwash", name: "Softwash Treatment", icon: Pipette },
]

const HOUSE_SIZES = {
  small: { label: "Small", description: "Terraced / End of terrace / 2 bed bungalow", gutterLength: 25 },
  medium: { label: "Medium", description: "Semi-detached / 3 bed bungalow / Mid-terrace", gutterLength: 45 },
  large: { label: "Large", description: "3 bed detached / Large bungalow", gutterLength: 65 },
  xlarge: { label: "Extra Large", description: "4+ bed detached / Large family home", gutterLength: 85 },
}

const SERVICE_SIZES = {
  driveway: [
    { size: 10, description: "Small single driveway (compact parking)" },
    { size: 40, description: "Standard driveway (1-2 car spaces)" },
    { size: 80, description: "Large driveway (2-3 car spaces / small turning circle)" },
    { size: 150, description: "Extra large driveway (multiple spaces / large turning area)" },
  ],
  patio: [
    { size: 15, description: "Small patio (2-4 person seating)" },
    { size: 40, description: "Medium patio (4-6 person seating)" },
    { size: 80, description: "Large patio (6-8 person seating / entertaining)" },
    { size: 150, description: "Extra large patio (8+ person / garden room area)" },
  ],
  roof: [
    { size: 50, description: "Small/compact roof (terraced or bungalow)" },
    { size: 100, description: "Medium roof (semi-detached property)" },
    { size: 180, description: "Large roof (detached 3-4 bed home)" },
    { size: 250, description: "Extra large roof (large detached / complex roof)" },
  ],
  walls: [
    { size: 100, description: "Small property (terraced / compact bungalow)" },
    { size: 200, description: "Medium property (semi-detached / larger bungalow)" },
    { size: 350, description: "Large property (detached 3-4 bed)" },
    { size: 500, description: "Extra large property (large detached / multiple storeys)" },
  ],
  softwash: [
    { size: 100, description: "Small property (terraced / compact bungalow)" },
    { size: 200, description: "Medium property (semi-detached / larger bungalow)" },
    { size: 350, description: "Large property (detached 3-4 bed)" },
    { size: 500, description: "Extra large property (large detached / multiple storeys)" },
  ],
}

const ACCESS_EXAMPLES = {
  easy: {
    title: "Easy Access",
    examples: [
      "Driveway front of property with parking nearby",
      "Ground floor patio with side gate access",
      "Flat roof with safe ladder access",
      "Gutters easily reachable from ground/low ladder",
    ],
  },
  difficult: {
    title: "Difficult Access",
    examples: [
      "Driveway on steep slope or requires multiple trips",
      "Elevated patio requiring extensive equipment setup",
      "Steep roof pitch or complex angles",
      "Gutters requiring high scaffolding or crane access",
    ],
  },
}

export default function PricingPage() {
  const [quoteType, setQuoteType] = useState<"residential" | "commercial">("residential")
  const [selectedServices, setSelectedServices] = useState<string[]>(["driveway"])
  const [houseSize, setHouseSize] = useState<"small" | "medium" | "large" | "xlarge">("medium")
  const [sizes, setSizes] = useState<{ [key: string]: number }>({
    driveway: 50,
    patio: 50,
    roof: 50,
    gutter: 45,
    walls: 50,
    softwash: 50,
  })
  const [access, setAccess] = useState("easy")
  const [surfaceTypes, setSurfaceTypes] = useState<{ [key: string]: string }>({
    driveway: "standard",
  })
  const [needsResanding, setNeedsResanding] = useState(false)
  const [postcode, setPostcode] = useState("")
  const [distanceFromSwanage, setDistanceFromSwanage] = useState(0)
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [postcodeError, setPostcodeError] = useState("")
  const [isLoadingPostcode, setIsLoadingPostcode] = useState(false)
  const [showAccessHelp, setShowAccessHelp] = useState(false)
  const [hasExternalWaterTap, setHasExternalWaterTap] = useState(true)
  const [hasAccessibleElectricity, setHasAccessibleElectricity] = useState(true)

  const [pricingData] = useState({
    driveway: {
      baseRate: 3,
      blockPavingResanding: 2,
      easyAccess: 1,
      hardAccess: 1.3,
    },
    patio: { baseRate: 5, easyAccess: 1, hardAccess: 1.25 },
    roof: { baseRate: 11.5, easyAccess: 1, hardAccess: 1.4 },
    gutter: { baseRate: 6, perMetre: true },
    walls: { baseRate: 3, easyAccess: 1, hardAccess: 1.3 },
    softwash: { baseRate: 5, easyAccess: 1, hardAccess: 1.35 },
  })

  const DISTANCE_RATE_PER_MILE = 0.5
  const FUEL_SURCHARGE = 15
  const BIOCIDE_TREATMENT = 25
  const NO_ELECTRICITY_SURCHARGE = 20

  // Calculate distance from postcode using UK postcode geocoding API
  const handlePostcodeChange = async (value: string) => {
    setPostcode(value.toUpperCase())
    setPostcodeError("")

    if (!value || value.length < 2) return

    // Only search on valid-looking postcodes
    if (!/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(value.trim())) {
      return
    }

    setIsLoadingPostcode(true)
    try {
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${encodeURIComponent(value.trim())}`
      )

      if (!response.ok) {
        setPostcodeError("Postcode not found. Please check and try again.")
        setIsLoadingPostcode(false)
        return
      }

      const data = await response.json()
      const { latitude, longitude } = data.result

      const swanageLatitude = 50.6154
      const swanageLongitude = -1.9410

      const R = 3959
      const lat1 = (swanageLatitude * Math.PI) / 180
      const lat2 = (latitude * Math.PI) / 180
      const deltaLat = ((latitude - swanageLatitude) * Math.PI) / 180
      const deltaLon = ((longitude - swanageLongitude) * Math.PI) / 180

      const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + 
                Math.cos(lat1) * Math.cos(lat2) * 
                Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distance = R * c

      setDistanceFromSwanage(Math.round(distance))
      setPostcodeError("")
    } catch (error) {
      setPostcodeError("Unable to calculate distance.")
      console.error("[v0] Postcode lookup error:", error)
    } finally {
      setIsLoadingPostcode(false)
    }
  }

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((s) => s !== serviceId)
        : [...prev, serviceId]
    )
  }

  useEffect(() => {
    calculatePrice()
  }, [selectedServices, sizes, access, surfaceTypes, needsResanding, distanceFromSwanage, hasAccessibleElectricity])

  const calculatePrice = () => {
    let basePrice = 0

    // Calculate service costs
    selectedServices.forEach((serviceId) => {
      const service = pricingData[serviceId as keyof typeof pricingData]
      if (!service) return

      let servicePrice = 0
      if (serviceId === "gutter") {
        servicePrice = sizes[serviceId] * service.baseRate
      } else {
        servicePrice = sizes[serviceId] * service.baseRate
        
        // Apply access multiplier
        if ("easyAccess" in service && "hardAccess" in service) {
          servicePrice *= access === "hard" ? service.hardAccess : service.easyAccess
        }

        // Add resanding for block paving driveways
        if (serviceId === "driveway" && surfaceTypes[serviceId] === "block" && needsResanding) {
          servicePrice += sizes[serviceId] * service.blockPavingResanding
        }
      }

      basePrice += servicePrice
    })

    // Add distance surcharge and fuel
    const distanceSurcharge = (distanceFromSwanage * 2) * DISTANCE_RATE_PER_MILE + FUEL_SURCHARGE
    const biocideCost = BIOCIDE_TREATMENT * selectedServices.length // Biocide for each service
    const electricitySurcharge = !hasAccessibleElectricity ? NO_ELECTRICITY_SURCHARGE : 0

    const totalPrice = basePrice + distanceSurcharge + biocideCost + electricitySurcharge

    setEstimatedPrice(Math.round(totalPrice))
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-6 mx-auto">
                <Calculator className="h-10 w-10 text-[#1E90FF]" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Instant Pricing Calculator</h1>
              <p className="text-xl text-white/70">Select services, enter your postcode, and get your total price instantly</p>
              
              {/* Quote Type Toggle */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={() => setQuoteType("residential")}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    quoteType === "residential"
                      ? "bg-[#1E90FF] text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  Residential Quote
                </button>
                <button
                  onClick={() => setQuoteType("commercial")}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    quoteType === "commercial"
                      ? "bg-red-600 text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  Commercial / Industrial
                </button>
              </div>
            </div>

            {quoteType === "residential" ? (
              <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Left Column: Services & Calculator */}
              <div className="lg:col-span-2 space-y-8">
                  {/* Bundle/Multiple Services Selection */}
                <div className="space-y-4 bg-gradient-to-r from-[#1E90FF]/20 to-[#1E90FF]/10 rounded-lg p-6 border-2 border-[#1E90FF]/30">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-[#1E90FF]" />
                    <Label className="text-white text-lg font-semibold">Select Services (Bundle & Save)</Label>
                  </div>
                  <p className="text-white/60 text-sm">Select multiple services to bundle them together and save money</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {SERVICES.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedServices.includes(service.id)
                            ? "border-[#1E90FF] bg-[#1E90FF]/20"
                            : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-start gap-3 justify-between">
                          <div className="flex items-center gap-3">
                            <service.icon className="h-6 w-6 text-[#1E90FF]" />
                            <span className="font-semibold text-white">{service.name}</span>
                          </div>
                          {selectedServices.includes(service.id) && (
                            <CheckCircle2 className="h-6 w-6 text-[#1E90FF]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Postcode Input */}
                <div className="glass-border rounded-lg p-6 space-y-3">
                  <Label className="text-white text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#1E90FF]" />
                    Your Location
                  </Label>
                  <div className="space-y-2">
                    <Input
                      placeholder="Enter postcode (e.g., BH19 2JJ)"
                      value={postcode}
                      onChange={(e) => handlePostcodeChange(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                    {isLoadingPostcode && (
                      <p className="text-sm text-[#1E90FF]">Calculating distance...</p>
                    )}
                    {postcodeError && (
                      <p className="text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {postcodeError}
                      </p>
                    )}
                    {postcode && !postcodeError && !isLoadingPostcode && distanceFromSwanage > 0 && (
                      <p className="text-sm text-green-400">✓ {distanceFromSwanage} miles from Swanage</p>
                    )}
                  </div>
                </div>

                {/* Service-Specific Options */}
                <div className="glass-border rounded-lg p-6 space-y-6">
                  {selectedServices.map((serviceId) => (
                    <div key={serviceId} className="space-y-4 pb-4 border-b border-white/20 last:border-0 last:pb-0">
                      <h3 className="text-white font-semibold">{SERVICES.find(s => s.id === serviceId)?.name}</h3>
                      
                      <div>
                        <Label className="text-white/80 text-sm mb-2 block">
                          {serviceId === "gutter" ? "House Size" : "Area Size"}
                        </Label>
                        {serviceId === "gutter" ? (
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(HOUSE_SIZES).map(([key, data]) => (
                              <button
                                key={key}
                                onClick={() => {
                                  setHouseSize(key as "small" | "medium" | "large" | "xlarge")
                                  setSizes({ ...sizes, gutter: data.gutterLength })
                                }}
                                className={`p-3 rounded border-2 transition-all text-sm font-medium text-left ${
                                  houseSize === key
                                    ? "border-[#1E90FF] bg-[#1E90FF]/20 text-white"
                                    : "border-white/20 bg-white/5 text-white/70 hover:border-white/40"
                                }`}
                              >
                                <div className="font-semibold">{data.label}</div>
                                <div className="text-xs text-white/60 mt-1">{data.description}</div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-center gap-4">
                              <Slider
                                value={[sizes[serviceId]]}
                                onValueChange={(val) =>
                                  setSizes({ ...sizes, [serviceId]: val[0] })
                                }
                                min={10}
                                max={500}
                                step={10}
                                className="flex-1"
                              />
                              <span className="text-white font-semibold w-20 text-right">
                                {sizes[serviceId]}m²
                              </span>
                            </div>
                            {SERVICE_SIZES[serviceId as keyof typeof SERVICE_SIZES] && (
                              <div className="bg-white/5 rounded-lg p-3 border border-white/20">
                                <p className="text-white/60 text-xs font-medium mb-2">Quick size guide:</p>
                                <div className="space-y-1">
                                  {SERVICE_SIZES[serviceId as keyof typeof SERVICE_SIZES].map((guide) => (
                                    <div key={guide.size} className="text-xs text-white/70">
                                      <span className="font-medium">{guide.size}m²:</span> {guide.description}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Driveway Surface Type */}
                      {serviceId === "driveway" && (
                        <div className="space-y-3 pt-2">
                          <Label className="text-white/80 text-sm">Surface Type</Label>
                          <div className="grid grid-cols-3 gap-2">
                            {["standard", "block", "natural"].map((type) => (
                              <button
                                key={type}
                                onClick={() =>
                                  setSurfaceTypes({ ...surfaceTypes, driveway: type })
                                }
                                className={`p-2 rounded border-2 transition-all text-xs font-medium ${
                                  surfaceTypes[serviceId] === type
                                    ? "border-[#1E90FF] bg-[#1E90FF]/20 text-white"
                                    : "border-white/20 bg-white/5 text-white/70 hover:border-white/40"
                                }`}
                              >
                                {type === "standard" && "Concrete"}
                                {type === "block" && "Block"}
                                {type === "natural" && "Stone"}
                              </button>
                            ))}
                          </div>

                          {surfaceTypes[serviceId] === "block" && (
                            <div className="bg-[#1E90FF]/10 rounded-lg p-3 border border-[#1E90FF]/30 mt-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-start gap-2">
                                  <Info className="h-4 w-4 text-[#1E90FF] mt-0.5 flex-shrink-0" />
                                  <div className="text-sm">
                                    <p className="text-white font-medium">Re-Sand Joints?</p>
                                    <p className="text-white/60 text-xs">+£2/m²</p>
                                  </div>
                                </div>
                                <Switch
                                  checked={needsResanding}
                                  onCheckedChange={setNeedsResanding}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Access Level with Examples */}
                <div className="glass-border rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-white text-lg font-semibold">Property Access</Label>
                    <button
                      onClick={() => setShowAccessHelp(!showAccessHelp)}
                      className="text-[#1E90FF] hover:text-[#1E90FF]/80 text-sm font-medium"
                    >
                      {showAccessHelp ? "Hide Examples" : "See Examples"}
                    </button>
                  </div>

                  {showAccessHelp && (
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {Object.entries(ACCESS_EXAMPLES).map(([key, data]) => (
                        <div key={key} className="bg-white/5 rounded-lg p-3 border border-white/20">
                          <h4 className="text-white font-semibold text-sm mb-2">{data.title}</h4>
                          <ul className="space-y-1">
                            {data.examples.map((example, idx) => (
                              <li key={idx} className="text-white/70 text-xs">• {example}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    {["easy", "difficult"].map((accessType) => (
                      <button
                        key={accessType}
                        onClick={() => setAccess(accessType)}
                        className={`p-3 rounded border-2 transition-all font-medium ${
                          access === accessType
                            ? "border-[#1E90FF] bg-[#1E90FF]/20 text-white"
                            : "border-white/20 bg-white/5 text-white/70 hover:border-white/40"
                        }`}
                      >
                        {accessType === "easy" ? "Easy Access" : "Difficult Access"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Water & Power Options */}
                <div className="glass-border rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-[#1E90FF]" />
                    <Label className="text-white text-lg font-semibold">Water Access</Label>
                  </div>
                  <p className="text-white/60 text-sm">Do you have an external water tap available?</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => setHasExternalWaterTap(true)}
                      className={`w-full p-3 rounded border-2 transition-all text-left flex items-center gap-3 ${
                        hasExternalWaterTap
                          ? "border-green-500 bg-green-500/20"
                          : "border-white/20 bg-white/5 hover:border-white/40"
                      }`}
                    >
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-medium">Yes, external water tap</p>
                        <p className="text-white/60 text-xs">Available outside property</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setHasExternalWaterTap(false)}
                      className={`w-full p-3 rounded border-2 transition-all text-left flex items-center gap-3 ${
                        !hasExternalWaterTap
                          ? "border-amber-500 bg-amber-500/20"
                          : "border-white/20 bg-white/5 hover:border-white/40"
                      }`}
                    >
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-medium">No external tap</p>
                        <p className="text-white/60 text-xs">We can connect to internal kitchen/bathroom taps</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Electricity Options */}
                <div className="glass-border rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-[#1E90FF]" />
                    <Label className="text-white text-lg font-semibold">Power Supply</Label>
                  </div>
                  <p className="text-white/60 text-sm">Do you have accessible external electricity available?</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => setHasAccessibleElectricity(true)}
                      className={`w-full p-3 rounded border-2 transition-all text-left flex items-center gap-3 ${
                        hasAccessibleElectricity
                          ? "border-green-500 bg-green-500/20"
                          : "border-white/20 bg-white/5 hover:border-white/40"
                      }`}
                    >
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-medium">Yes, external power available</p>
                        <p className="text-white/60 text-xs">Outdoor socket or easily accessible supply</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setHasAccessibleElectricity(false)}
                      className={`w-full p-3 rounded border-2 transition-all text-left flex items-center gap-3 ${
                        !hasAccessibleElectricity
                          ? "border-red-500 bg-red-500/20"
                          : "border-white/20 bg-white/5 hover:border-white/40"
                      }`}
                    >
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-medium">No accessible power (£{NO_ELECTRICITY_SURCHARGE} surcharge)</p>
                        <p className="text-white/60 text-xs">We'll use our generator</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Price Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                  {/* Price Display */}
                  <div className="bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80 rounded-2xl p-8 text-center">
                    <p className="text-white/80 mb-2 text-sm font-medium">Total Estimated Price</p>
                    <p className="text-6xl font-bold text-white mb-4">£{estimatedPrice}</p>
                    <p className="text-white/70 text-xs">
                      {selectedServices.length} {selectedServices.length === 1 ? "service" : "services"}
                      {postcode && ` • ${distanceFromSwanage} mi away`}
                    </p>
                  </div>

                  {/* What's Included */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/20 space-y-2">
                    <p className="text-white font-semibold text-sm mb-3">Every Quote Includes</p>
                    {[
                      "Free assessment",
                      "Biocide treatment",
                      "Professional team",
                      "Waste disposal",
                      "Before/after photos",
                      "Satisfaction guarantee",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#00C853] mt-0.5 flex-shrink-0" />
                        <span className="text-white/80 text-xs">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-[#00C853] text-white font-semibold py-6 hover:bg-[#00A843] transition-all"
                  >
                    <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                      Get Exact Quote
                    </a>
                  </Button>
                  
                  <p className="text-white/60 text-xs text-center">
                    * Estimates are indicative. Final quote after site assessment.
                  </p>
                </div>
              </div>
            </div>
            ) : (
              /* Commercial Mode */
              <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/10 rounded-2xl p-12 border-2 border-red-500/30 text-center space-y-6">
                  <h2 className="text-3xl font-bold text-white">Commercial & Industrial Cleaning</h2>
                  <p className="text-white/70 text-lg">
                    For large-scale commercial, industrial, or specialized projects, our dedicated contracts team provides custom solutions tailored to your specific requirements.
                  </p>
                  <div className="space-y-2 py-6">
                    <p className="text-white/60">We handle:</p>
                    <ul className="inline-flex flex-col gap-2 text-white/80 text-sm">
                      <li>• Large building facades</li>
                      <li>• Multi-property portfolios</li>
                      <li>• Industrial site cleaning</li>
                      <li>• Ongoing maintenance contracts</li>
                      <li>• Specialized access requirements</li>
                      <li>• Custom scheduling</li>
                    </ul>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-red-600 text-white font-semibold py-6 hover:bg-red-700 transition-all"
                  >
                    <a href="/contracts">Get In Contact</a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
