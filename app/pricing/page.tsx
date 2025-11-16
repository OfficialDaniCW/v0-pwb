"use client"

import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useState, useEffect } from "react"
import { Calculator, CheckCircle2 } from 'lucide-react'

export default function PricingPage() {
  const [serviceType, setServiceType] = useState("driveway")
  const [size, setSize] = useState([50])
  const [access, setAccess] = useState("easy")
  const [water, setWater] = useState("yes")
  const [estimatedPrice, setEstimatedPrice] = useState(0)

  // Pricing data fetched from backend (simplified for now)
  const [pricingData, setPricingData] = useState({
    driveway: { baseRate: 2.5, easyAccess: 1, hardAccess: 1.3, noWater: 1.2 },
    patio: { baseRate: 2.3, easyAccess: 1, hardAccess: 1.25, noWater: 1.15 },
    roof: { baseRate: 3.5, easyAccess: 1, hardAccess: 1.4, noWater: 1.1 },
    walls: { baseRate: 2.0, easyAccess: 1, hardAccess: 1.3, noWater: 1.2 },
  })

  useEffect(() => {
    // Calculate price
    const service = pricingData[serviceType as keyof typeof pricingData]
    if (!service) return

    let price = size[0] * service.baseRate
    price *= access === "hard" ? service.hardAccess : service.easyAccess
    price *= water === "no" ? service.noWater : 1

    setEstimatedPrice(Math.round(price))
  }, [serviceType, size, access, water, pricingData])

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-6 mx-auto">
                  <Calculator className="h-10 w-10 text-[#1E90FF]" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  Instant Pricing Calculator
                </h1>
                <p className="text-xl text-white/70">
                  Get a rough estimate for your property cleaning project
                </p>
              </div>

              <div className="glass-border-enhanced rounded-2xl p-8 space-y-8">
                {/* Service Type */}
                <div className="space-y-3">
                  <Label className="text-white text-lg">Service Type</Label>
                  <Select value={serviceType} onValueChange={setServiceType}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="driveway">Driveway Cleaning</SelectItem>
                      <SelectItem value="patio">Patio/Decking</SelectItem>
                      <SelectItem value="roof">Roof & Gutters</SelectItem>
                      <SelectItem value="walls">Exterior Walls</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Size */}
                <div className="space-y-3">
                  <Label className="text-white text-lg">Approximate Size (m²): {size[0]}m²</Label>
                  <Slider
                    value={size}
                    onValueChange={setSize}
                    min={10}
                    max={500}
                    step={10}
                    className="w-full"
                  />
                  <p className="text-white/60 text-sm">Adjust slider to match your property size</p>
                </div>

                {/* Access */}
                <div className="space-y-3">
                  <Label className="text-white text-lg">Property Access</Label>
                  <Select value={access} onValueChange={setAccess}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy (parking nearby, no obstructions)</SelectItem>
                      <SelectItem value="hard">Difficult (limited access, stairs, etc.)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Water */}
                <div className="space-y-3">
                  <Label className="text-white text-lg">Water Supply Available?</Label>
                  <Select value={water} onValueChange={setWater}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes (water tap on property)</SelectItem>
                      <SelectItem value="no">No (we'll need to bring water)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Estimated Price */}
                <div className="bg-[#1E90FF]/20 rounded-xl p-8 text-center border-2 border-[#1E90FF]">
                  <p className="text-white/80 mb-2">Estimated Price</p>
                  <p className="text-5xl font-bold text-[#1E90FF]">£{estimatedPrice}</p>
                  <p className="text-white/60 text-sm mt-2">(This is a rough estimate)</p>
                </div>

                {/* CTA */}
                <div className="space-y-4">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-[#00C853] text-white font-semibold text-lg py-6
                               hover:bg-[#00A843] transition-all"
                  >
                    <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                      Get Accurate Quote via WhatsApp
                    </a>
                  </Button>
                  <p className="text-white/60 text-sm text-center">
                    Send us photos for a precise quote tailored to your property
                  </p>
                </div>
              </div>

              {/* What's Included */}
              <div className="mt-12 glass-border rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Every Quote Includes</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Free property assessment",
                    "PowerUps biocide treatment",
                    "Professional equipment",
                    "Waste disposal",
                    "Before/after photos",
                    "Satisfaction guarantee"
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-[#00C853] flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
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
