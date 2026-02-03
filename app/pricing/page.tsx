"use client"

import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"
import { Calculator, CheckCircle2, Info, Droplets, Zap, MapPin, AlertCircle } from "lucide-react"

const SERVICES = [
  { id: "driveway", name: "Driveway Cleaning", icon: "🚗", color: "from-blue-500 to-blue-600" },
  { id: "patio", name: "Patio/Decking", icon: "🏡", color: "from-green-500 to-green-600" },
  { id: "roof", name: "Roof Cleaning", icon: "🏠", color: "from-orange-500 to-orange-600" },
  { id: "gutter", name: "Gutter Cleaning", icon: "💧", color: "from-cyan-500 to-cyan-600" },
  { id: "walls", name: "Exterior Walls", icon: "🧱", color: "from-purple-500 to-purple-600" },
  { id: "softwash", name: "Softwash Treatment", icon: "✨", color: "from-pink-500 to-pink-600" },
]

export default function PricingPage() {
  const [serviceType, setServiceType] = useState("driveway")
  const [size, setSize] = useState([50])
  const [gutterLength, setGutterLength] = useState([15])
  const [access, setAccess] = useState("easy")
  const [surfaceType, setSurfaceType] = useState("standard")
  const [needsResanding, setNeedsResanding] = useState(false)
  const [postcode, setPostcode] = useState("")
  const [distanceFromSwanage, setDistanceFromSwanage] = useState([0])
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [postcodeError, setPostcodeError] = useState("")
  const [isLoadingPostcode, setIsLoadingPostcode] = useState(false)

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
      // Using UK Postcode API (free tier available)
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

      // Swanage coordinates (approximate centre)
      const swanageLatitude = 50.6154
      const swanageLongitude = -1.9410

      // Calculate distance using Haversine formula
      const R = 3959 // Earth's radius in miles
      const lat1 = (swanageLatitude * Math.PI) / 180
      const lat2 = (latitude * Math.PI) / 180
      const deltaLat = ((latitude - swanageLatitude) * Math.PI) / 180
      const deltaLon = ((longitude - swanageLongitude) * Math.PI) / 180

      const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + 
                Math.cos(lat1) * Math.cos(lat2) * 
                Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distance = R * c

      setDistanceFromSwanage([Math.round(distance)])
      setPostcodeError("")
    } catch (error) {
      setPostcodeError("Unable to calculate distance. Please enter manually.")
      console.error("[v0] Postcode lookup error:", error)
    } finally {
      setIsLoadingPostcode(false)
    }
  }

  useEffect(() => {
    calculatePrice()
  }, [serviceType, size, gutterLength, access, surfaceType, needsResanding, distanceFromSwanage])

  const calculatePrice = () => {
    let price = 0

    if (serviceType === "gutter") {
      price = gutterLength[0] * pricingData.gutter.baseRate
    } else {
      const service = pricingData[serviceType as keyof typeof pricingData]
      if (!service || !("baseRate" in service)) return

      price = size[0] * service.baseRate

      if ("easyAccess" in service && "hardAccess" in service) {
        price *= access === "hard" ? service.hardAccess : service.easyAccess
      }

      if (serviceType === "driveway" && surfaceType === "block" && needsResanding) {
        price += size[0] * pricingData.driveway.blockPavingResanding
      }
    }

    const distanceSurcharge = (distanceFromSwanage[0] * 2) * DISTANCE_RATE_PER_MILE + FUEL_SURCHARGE
    price += distanceSurcharge

    setEstimatedPrice(Math.round(price))
  }

  const selectedService = SERVICES.find(s => s.id === serviceType)

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
              <p className="text-xl text-white/70">Select a service, enter your location, and get an estimate instantly</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Left Column: Services & Calculator */}
              <div className="lg:col-span-2 space-y-8">
                {/* Service Cards */}
                <div className="space-y-4">
                  <Label className="text-white text-lg font-semibold">Choose Your Service</Label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {SERVICES.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => {
                          setServiceType(service.id)
                          setSurfaceType("standard")
                          setNeedsResanding(false)
                        }}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          serviceType === service.id
                            ? "border-[#1E90FF] bg-[#1E90FF]/20"
                            : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-3xl">{service.icon}</span>
                          <span className="font-semibold text-white">{service.name}</span>
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
                    {postcode && !postcodeError && !isLoadingPostcode && (
                      <p className="text-sm text-green-400">✓ Distance calculated</p>
                    )}
                  </div>
                  
                  {/* Manual Distance Slider */}
                  <div className="pt-2 border-t border-white/20">
                    <p className="text-white/60 text-sm mb-2">Or adjust distance manually:</p>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={distanceFromSwanage}
                        onValueChange={setDistanceFromSwanage}
                        min={0}
                        max={50}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-white font-semibold w-16 text-right">{distanceFromSwanage[0]} mi</span>
                    </div>
                  </div>
                </div>

                {/* Service-Specific Options */}
                <div className="glass-border rounded-lg p-6 space-y-6">
                  <div>
                    <Label className="text-white text-lg font-semibold mb-3 block">
                      {serviceType === "gutter" ? "Gutter Length" : "Area Size"}
                    </Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={serviceType === "gutter" ? gutterLength : size}
                        onValueChange={serviceType === "gutter" ? setGutterLength : setSize}
                        min={serviceType === "gutter" ? 5 : 10}
                        max={serviceType === "gutter" ? 100 : 500}
                        step={serviceType === "gutter" ? 5 : 10}
                        className="flex-1"
                      />
                      <span className="text-white font-semibold w-20 text-right">
                        {serviceType === "gutter" ? `${gutterLength[0]}m` : `${size[0]}m²`}
                      </span>
                    </div>
                  </div>

                  {/* Driveway-Specific Options */}
                  {serviceType === "driveway" && (
                    <div className="space-y-4 pt-4 border-t border-white/20">
                      <div>
                        <Label className="text-white text-lg font-semibold mb-3 block">Surface Type</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {["standard", "block", "natural"].map((type) => (
                            <button
                              key={type}
                              onClick={() => setSurfaceType(type)}
                              className={`p-3 rounded border-2 transition-all text-sm font-medium ${
                                surfaceType === type
                                  ? "border-[#1E90FF] bg-[#1E90FF]/20 text-white"
                                  : "border-white/20 bg-white/5 text-white/70 hover:border-white/40"
                              }`}
                            >
                              {type === "standard" && "Concrete/Tarmac"}
                              {type === "block" && "Block Paving"}
                              {type === "natural" && "Natural Stone"}
                            </button>
                          ))}
                        </div>
                      </div>

                      {surfaceType === "block" && (
                        <div className="bg-[#1E90FF]/10 rounded-lg p-4 border border-[#1E90FF]/30">
                          <div className="flex items-center justify-between">
                            <div className="flex items-start gap-3">
                              <Info className="h-5 w-5 text-[#1E90FF] mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-white font-medium">Re-Sand Joints?</p>
                                <p className="text-white/60 text-sm">+£{pricingData.driveway.blockPavingResanding.toFixed(2)}/m²</p>
                              </div>
                            </div>
                            <Switch checked={needsResanding} onCheckedChange={setNeedsResanding} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Access Level */}
                  {serviceType !== "gutter" && (
                    <div className="space-y-3 pt-4 border-t border-white/20">
                      <Label className="text-white text-lg font-semibold">Property Access</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {["easy", "hard"].map((accessType) => (
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
                  )}
                </div>

                {/* Important Note */}
                <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
                  <div className="flex items-start gap-3">
                    <div className="flex gap-2 mt-0.5">
                      <Droplets className="h-5 w-5 text-amber-400 flex-shrink-0" />
                      <Zap className="h-5 w-5 text-amber-400 flex-shrink-0" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Water & Power Required</p>
                      <p className="text-white/60 text-sm">
                        We will need access to an external water tap and power supply on the day of service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Price Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                  {/* Price Display */}
                  <div className="bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80 rounded-2xl p-8 text-center">
                    <p className="text-white/80 mb-2 text-sm font-medium">Estimated Price</p>
                    <p className="text-5xl font-bold text-white mb-1">£{estimatedPrice}</p>
                    <p className="text-white/70 text-xs mb-4">
                      {serviceType === "gutter"
                        ? `${gutterLength[0]} linear metres`
                        : `${size[0]}m² area`}
                      {distanceFromSwanage[0] > 0 && ` • ${distanceFromSwanage[0]} mi away`}
                    </p>
                    <div className="w-full h-px bg-white/20 my-4" />
                    <div className="space-y-2 text-left text-sm">
                      <div className="flex justify-between text-white/90">
                        <span>Service cost:</span>
                        <span>£{Math.round(serviceType === "gutter" 
                          ? gutterLength[0] * pricingData.gutter.baseRate 
                          : size[0] * pricingData[serviceType as keyof typeof pricingData].baseRate * (access === "hard" && "hardAccess" in pricingData[serviceType as keyof typeof pricingData] ? pricingData[serviceType as keyof typeof pricingData].hardAccess : 1))}</span>
                      </div>
                      <div className="flex justify-between text-white/90">
                        <span>Distance surcharge:</span>
                        <span>£{Math.round((distanceFromSwanage[0] * 2) * DISTANCE_RATE_PER_MILE + FUEL_SURCHARGE)}</span>
                      </div>
                    </div>
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
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
