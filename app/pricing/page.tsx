"use client"

import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Calculator, MapPin, AlertCircle, Zap, Droplets, ParkingMeterIcon as ParkinglotIcon, MessageCircle, Check } from "lucide-react"
import Link from "next/link"

const SERVICES = [
  { id: "driveway", name: "Driveway Cleaning", baseMultiplier: 1.0 },
  { id: "patio", name: "Patio/Decking", baseMultiplier: 0.95 },
  { id: "roof", name: "Roof Cleaning", baseMultiplier: 1.8 },
  { id: "gutter", name: "Gutter Cleaning", baseMultiplier: 0.9 },
  { id: "walls", name: "Exterior Walls", baseMultiplier: 1.5 },
  { id: "softwash", name: "Softwash Treatment", baseMultiplier: 1.6 },
]

const PROPERTY_SIZES = [
  { id: "small", label: "Small", sqmRange: "Up to 50m²", basePrice: 120 },
  { id: "medium", label: "Medium", sqmRange: "50-150m²", basePrice: 200 },
  { id: "large", label: "Large", sqmRange: "150-300m²", basePrice: 400 },
  { id: "xlarge", label: "Extra Large", sqmRange: "300m²+", basePrice: 650 },
]

export default function PricingPage() {
  const [formData, setFormData] = useState({
    name: "",
    postcode: "",
    serviceType: "",
    propertySize: "medium",
  })
  
  const [accessFeatures, setAccessFeatures] = useState({
    hasElectricity: false,
    hasWaterAccess: false,
    hasGateAccess: false,
    isPaved: false,
  })

  const [postcodeError, setPostcodeError] = useState("")
  const [isLoadingPostcode, setIsLoadingPostcode] = useState(false)
  const [distanceFromSwanage, setDistanceFromSwanage] = useState<number | null>(null)
  const [estimatedPrice, setEstimatedPrice] = useState(0)

  const handlePostcodeChange = async (value: string) => {
    const upperValue = value.toUpperCase()
    setFormData(prev => ({ ...prev, postcode: upperValue }))
    setPostcodeError("")

    if (!value || value.length < 2) return

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

  const toggleAccessFeature = (feature: keyof typeof accessFeatures) => {
    setAccessFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }))
  }

  useEffect(() => {
    calculatePrice()
  }, [formData, accessFeatures])

  const calculatePrice = () => {
    if (!formData.serviceType) {
      setEstimatedPrice(0)
      return
    }

    const service = SERVICES.find(s => s.id === formData.serviceType)
    const propertySize = PROPERTY_SIZES.find(s => s.id === formData.propertySize)

    if (!service || !propertySize) {
      setEstimatedPrice(0)
      return
    }

    let total = propertySize.basePrice * service.baseMultiplier

    // Add surcharges for missing access features
    if (!accessFeatures.hasElectricity) total += 80
    if (!accessFeatures.hasWaterAccess) total += 120
    if (!accessFeatures.hasGateAccess) total += 50

    // Discount for paved surfaces
    if (accessFeatures.isPaved) total *= 0.9

    // Distance surcharge (if over 20 miles from Swanage)
    if (distanceFromSwanage && distanceFromSwanage > 20) {
      const extraMiles = distanceFromSwanage - 20
      total += extraMiles * 2
    }

    setEstimatedPrice(Math.round(total))
  }

  const handleGetQuote = () => {
    if (!formData.name || !formData.postcode || !formData.serviceType) {
      alert("Please fill in all required fields")
      return
    }

    let message = `Hi! I'd like a quote:\n\n`
    message += `Name: ${formData.name}\n`
    message += `Service: ${SERVICES.find(s => s.id === formData.serviceType)?.name}\n`
    message += `Property Size: ${PROPERTY_SIZES.find(s => s.id === formData.propertySize)?.label}\n`
    message += `Postcode: ${formData.postcode}\n`
    message += `\nProperty Access:\n`
    message += `Electricity Available: ${accessFeatures.hasElectricity ? "Yes" : "No"}\n`
    message += `Water Access: ${accessFeatures.hasWaterAccess ? "Yes" : "No"}\n`
    message += `Gate Access: ${accessFeatures.hasGateAccess ? "Yes" : "No"}\n`
    message += `Paved Surface: ${accessFeatures.isPaved ? "Yes" : "No"}\n`
    message += `\nEstimated Price: £${estimatedPrice}\n`

    const phoneNumber = "447418610731"
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, "_blank")
  }

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
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Instant Pricing Quote</h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">Fill in your details and property information to get an accurate estimate</p>
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                
                {/* Left Column - Form */}
                <div className="md:col-span-2 space-y-8">
                  
                  {/* Basic Information */}
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10 backdrop-blur">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#1E90FF]/30 flex items-center justify-center text-sm">1</span>
                      Your Details
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-white text-sm font-semibold mb-2 block">Full Name</Label>
                        <Input
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10"
                        />
                      </div>

                      <div>
                        <Label className="text-white text-sm font-semibold mb-2 flex items-center gap-2 block">
                          <MapPin className="h-4 w-4 text-[#1E90FF]" />
                          Postcode
                        </Label>
                        <Input
                          placeholder="e.g., BH19 2JJ"
                          value={formData.postcode}
                          onChange={(e) => handlePostcodeChange(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10"
                        />
                        {isLoadingPostcode && (
                          <p className="text-xs text-[#1E90FF] mt-2">Calculating distance...</p>
                        )}
                        {postcodeError && (
                          <p className="text-xs text-red-400 flex items-center gap-1 mt-2">
                            <AlertCircle className="h-3 w-3" />
                            {postcodeError}
                          </p>
                        )}
                        {formData.postcode && !postcodeError && !isLoadingPostcode && distanceFromSwanage !== null && (
                          <p className="text-xs text-green-400 mt-2">✓ {distanceFromSwanage} miles from Swanage</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10 backdrop-blur">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#1E90FF]/30 flex items-center justify-center text-sm">2</span>
                      Service Type
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {SERVICES.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setFormData(prev => ({ ...prev, serviceType: service.id }))}
                          className={`p-3 rounded-lg border-2 transition-all text-left text-sm font-medium ${
                            formData.serviceType === service.id
                              ? "border-[#1E90FF] bg-[#1E90FF]/20 shadow-lg"
                              : "border-white/20 bg-white/5 hover:border-[#1E90FF]/50 hover:bg-white/10"
                          }`}
                        >
                          {service.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Property Size */}
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10 backdrop-blur">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#1E90FF]/30 flex items-center justify-center text-sm">3</span>
                      Property Size
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {PROPERTY_SIZES.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setFormData(prev => ({ ...prev, propertySize: size.id }))}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            formData.propertySize === size.id
                              ? "border-[#00C853] bg-[#00C853]/20 shadow-lg"
                              : "border-white/20 bg-white/5 hover:border-[#1E90FF]/50 hover:bg-white/10"
                          }`}
                        >
                          <p className="font-semibold text-white">{size.label}</p>
                          <p className="text-xs text-white/60 mt-1">{size.sqmRange}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Property Access */}
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10 backdrop-blur">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#1E90FF]/30 flex items-center justify-center text-sm">4</span>
                      Property Access
                    </h2>
                    
                    <div className="space-y-3">
                      <button
                        onClick={() => toggleAccessFeature("hasElectricity")}
                        className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                          accessFeatures.hasElectricity
                            ? "border-[#00C853] bg-[#00C853]/10"
                            : "border-white/20 bg-white/5 hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Zap className="h-5 w-5 text-[#1E90FF]" />
                          <span className="text-white font-medium">Electricity Available</span>
                        </div>
                        {accessFeatures.hasElectricity && <Check className="h-5 w-5 text-[#00C853]" />}
                      </button>

                      <button
                        onClick={() => toggleAccessFeature("hasWaterAccess")}
                        className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                          accessFeatures.hasWaterAccess
                            ? "border-[#00C853] bg-[#00C853]/10"
                            : "border-white/20 bg-white/5 hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Droplets className="h-5 w-5 text-[#1E90FF]" />
                          <span className="text-white font-medium">Water Access Available</span>
                        </div>
                        {accessFeatures.hasWaterAccess && <Check className="h-5 w-5 text-[#00C853]" />}
                      </button>

                      <button
                        onClick={() => toggleAccessFeature("hasGateAccess")}
                        className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                          accessFeatures.hasGateAccess
                            ? "border-[#00C853] bg-[#00C853]/10"
                            : "border-white/20 bg-white/5 hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <ParkinglotIcon className="h-5 w-5 text-[#1E90FF]" />
                          <span className="text-white font-medium">Easy Gate/Entry Access</span>
                        </div>
                        {accessFeatures.hasGateAccess && <Check className="h-5 w-5 text-[#00C853]" />}
                      </button>

                      <button
                        onClick={() => toggleAccessFeature("isPaved")}
                        className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                          accessFeatures.isPaved
                            ? "border-[#00C853] bg-[#00C853]/10"
                            : "border-white/20 bg-white/5 hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <ParkinglotIcon className="h-5 w-5 text-[#1E90FF]" />
                          <span className="text-white font-medium">Paved/Hard Surface</span>
                        </div>
                        {accessFeatures.isPaved && <Check className="h-5 w-5 text-[#00C853]" />}
                      </button>
                    </div>

                    <p className="text-xs text-white/50 mt-4">Missing features may add surcharges to your quote</p>
                  </div>
                </div>

                {/* Right Column - Price Summary (Sticky) */}
                <div className="md:col-span-1">
                  <div className="sticky top-24 bg-gradient-to-br from-[#1E90FF]/20 to-[#00C853]/20 rounded-lg p-8 border-2 border-white/10 backdrop-blur">
                    <p className="text-white/70 text-sm font-medium mb-2">Estimated Price</p>
                    <div className="mb-6">
                      <p className="text-5xl font-bold text-white">£{estimatedPrice}</p>
                      <p className="text-sm text-white/60 mt-2">
                        {formData.serviceType ? "Based on your selections" : "Fill in details above"}
                      </p>
                    </div>

                    <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Service</span>
                        <span className="text-white font-medium">{formData.serviceType ? SERVICES.find(s => s.id === formData.serviceType)?.name : "—"}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Property Size</span>
                        <span className="text-white font-medium">{PROPERTY_SIZES.find(s => s.id === formData.propertySize)?.label}</span>
                      </div>
                      {distanceFromSwanage && (
                        <div className="flex justify-between text-sm">
                          <span className="text-white/70">Distance</span>
                          <span className="text-white font-medium">{distanceFromSwanage} miles</span>
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={handleGetQuote}
                      disabled={!formData.name || !formData.postcode || !formData.serviceType}
                      className="w-full h-12 bg-[#00C853] hover:bg-[#00C853]/90 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Get Quote via WhatsApp
                    </Button>

                    <p className="text-xs text-white/50 mt-4 text-center">
                      This is an estimate. Final pricing confirmed via WhatsApp.
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
