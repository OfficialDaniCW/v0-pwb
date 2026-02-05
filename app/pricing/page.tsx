"use client"

import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Calculator, MapPin, AlertCircle, Package, Car, Home, Book as Roof, Droplets, Wind, Pipette, MessageCircle } from "lucide-react"
import Link from "next/link"

const SERVICES = [
  { id: "driveway", name: "Driveway Cleaning", icon: Car },
  { id: "patio", name: "Patio/Decking", icon: Home },
  { id: "roof", name: "Roof Cleaning", icon: Roof },
  { id: "gutter", name: "Gutter Cleaning", icon: Droplets },
  { id: "walls", name: "Exterior Walls", icon: Wind },
  { id: "softwash", name: "Softwash Treatment", icon: Pipette },
]

const SIZE_TIERS = {
  driveway: {
    small: { label: "Small", price: 120, description: "Compact parking / small single driveway" },
    medium: { label: "Medium", price: 180, description: "Standard driveway (1-2 car spaces)" },
    large: { label: "Large", price: 280, description: "Large driveway (2-3 car spaces)" },
    xlarge: { label: "Extra Large", price: 420, description: "Multiple spaces / large turning area" },
  },
  patio: {
    small: { label: "Small", price: 100, description: "Small patio (2-4 person seating)" },
    medium: { label: "Medium", price: 220, description: "Medium patio (4-6 person seating)" },
    large: { label: "Large", price: 380, description: "Large patio (6-8 person seating)" },
    xlarge: { label: "Extra Large", price: 580, description: "8+ person / garden room area" },
  },
  roof: {
    small: { label: "Small", price: 280, description: "Small/compact roof (terraced)" },
    medium: { label: "Medium", price: 520, description: "Medium roof (semi-detached)" },
    large: { label: "Large", price: 980, description: "Large roof (3-4 bed detached)" },
    xlarge: { label: "Extra Large", price: 1280, description: "Large detached / complex roof" },
  },
  gutter: {
    small: { label: "Small", price: 120, description: "Terraced / small bungalow" },
    medium: { label: "Medium", price: 200, description: "Semi-detached / larger bungalow" },
    large: { label: "Large", price: 340, description: "3-4 bed detached" },
    xlarge: { label: "Extra Large", price: 480, description: "Large detached property" },
  },
  walls: {
    small: { label: "Small", price: 250, description: "Small property (terraced)" },
    medium: { label: "Medium", price: 480, description: "Medium property (semi-detached)" },
    large: { label: "Large", price: 780, description: "Large property (detached)" },
    xlarge: { label: "Extra Large", price: 1180, description: "Large detached / multiple storeys" },
  },
  softwash: {
    small: { label: "Small", price: 280, description: "Small property (terraced)" },
    medium: { label: "Medium", price: 520, description: "Medium property (semi-detached)" },
    large: { label: "Large", price: 880, description: "Large property (detached)" },
    xlarge: { label: "Extra Large", price: 1280, description: "Large detached property" },
  },
}

export default function PricingPage() {
  const [selectedServices, setSelectedServices] = useState<{ [key: string]: string }>({})
  const [postcode, setPostcode] = useState("")
  const [distanceFromSwanage, setDistanceFromSwanage] = useState(0)
  const [postcodeError, setPostcodeError] = useState("")
  const [isLoadingPostcode, setIsLoadingPostcode] = useState(false)
  const [estimatedPrice, setEstimatedPrice] = useState(0)

  const handlePostcodeChange = async (value: string) => {
    setPostcode(value.toUpperCase())
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

  const toggleService = (serviceId: string, sizeId: string) => {
    setSelectedServices((prev) => {
      const updated = { ...prev }
      if (updated[serviceId] === sizeId) {
        delete updated[serviceId]
      } else {
        updated[serviceId] = sizeId
      }
      return updated
    })
  }

  useEffect(() => {
    calculatePrice()
  }, [selectedServices])

  const calculatePrice = () => {
    let total = 0
    Object.entries(selectedServices).forEach(([serviceId, sizeId]) => {
      const sizes = SIZE_TIERS[serviceId as keyof typeof SIZE_TIERS]
      if (sizes) {
        const size = sizes[sizeId as keyof typeof sizes] as any
        total += size.price
      }
    })
    setEstimatedPrice(total)
  }

  const handleGetQuote = () => {
    if (Object.keys(selectedServices).length === 0) {
      alert("Please select at least one service")
      return
    }

    if (!postcode) {
      alert("Please enter your postcode")
      return
    }

    // Build WhatsApp message with selections
    let message = "Hi! I'd like a quote for:\n\n"
    
    Object.entries(selectedServices).forEach(([serviceId, sizeId]) => {
      const service = SERVICES.find(s => s.id === serviceId)
      const sizes = SIZE_TIERS[serviceId as keyof typeof SIZE_TIERS]
      const size = sizes?.[sizeId as keyof typeof sizes] as any
      message += `${service?.name}: ${size?.label}\n`
    })

    message += `\nPostcode: ${postcode}`
    message += `\nEstimated Price: £${estimatedPrice}`

    // WhatsApp Business number (UK format)
    const phoneNumber = "447418610731" // Your WhatsApp number
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-6 mx-auto">
                <Calculator className="h-10 w-10 text-[#1E90FF]" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Quick Pricing</h1>
              <p className="text-xl text-white/70">Select your services, enter your postcode, and get a quick estimate</p>
            </div>

            <div className="max-w-6xl mx-auto">
              {/* Postcode Input */}
              <div className="mb-12 bg-white/5 rounded-lg p-6 border border-white/10">
                <Label className="text-white text-lg font-semibold flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-[#1E90FF]" />
                  Your Location
                </Label>
                <div className="space-y-2 max-w-md">
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

              {/* Services Grid with Size Tiers */}
              <div className="space-y-8">
                {SERVICES.map((service) => (
                  <div key={service.id}>
                    <div className="flex items-center gap-3 mb-4">
                      <service.icon className="h-6 w-6 text-[#1E90FF]" />
                      <h2 className="text-2xl font-bold text-white">{service.name}</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {Object.entries(SIZE_TIERS[service.id as keyof typeof SIZE_TIERS]).map(([sizeId, sizeData]) => (
                        <button
                          key={sizeId}
                          onClick={() => toggleService(service.id, sizeId)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            selectedServices[service.id] === sizeId
                              ? "border-[#00C853] bg-[#00C853]/20 shadow-lg"
                              : "border-white/20 bg-white/5 hover:border-[#1E90FF] hover:bg-white/10"
                          }`}
                        >
                          <div className="mb-3">
                            <p className="text-lg font-bold text-white">{sizeData.label}</p>
                            <p className="text-xs text-white/60 mt-1">{sizeData.description}</p>
                          </div>
                          <div className="text-[#00C853] font-semibold text-xl">£{sizeData.price}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary & CTA */}
              <div className="mt-16 bg-gradient-to-r from-[#1E90FF]/20 to-[#00C853]/20 rounded-lg p-8 border-2 border-white/10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-white/70 text-sm mb-1">Estimated Total</p>
                    <p className="text-5xl font-bold text-white">£{estimatedPrice}</p>
                    <p className="text-white/60 text-sm mt-2">
                      {Object.keys(selectedServices).length} service{Object.keys(selectedServices).length !== 1 ? "s" : ""} selected
                    </p>
                  </div>
                  <Button
                    onClick={handleGetQuote}
                    disabled={Object.keys(selectedServices).length === 0}
                    className="w-full sm:w-auto h-14 px-8 bg-[#00C853] hover:bg-[#00C853]/90 text-white font-semibold text-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Get Exact Quote via WhatsApp
                  </Button>
                </div>
                <p className="text-white/60 text-xs mt-4">
                  This is an estimate based on standard assumptions. Your final quote may vary based on site conditions, access, and specific requirements. We'll confirm exact pricing via WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
