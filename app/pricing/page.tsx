"use client"

import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"
import { Calculator, CheckCircle2, Info, Droplets, Zap } from "lucide-react"

export default function PricingPage() {
  const [serviceType, setServiceType] = useState("driveway")
  const [size, setSize] = useState([50])
  const [gutterLength, setGutterLength] = useState([15])
  const [access, setAccess] = useState("easy")
  const [surfaceType, setSurfaceType] = useState("standard")
  const [needsResanding, setNeedsResanding] = useState(false)
  const [estimatedPrice, setEstimatedPrice] = useState(0)

  const [pricingData] = useState({
    driveway: {
      baseRate: 3,
      blockPavingResanding: 2,
      easyAccess: 1,
      hardAccess: 1.3,
    },
    patio: { baseRate: 3, easyAccess: 1, hardAccess: 1.25 },
    roof: { baseRate: 9, easyAccess: 1, hardAccess: 1.4 },
    gutter: { baseRate: 6, perMetre: true },
    walls: { baseRate: 3, easyAccess: 1, hardAccess: 1.3 },
    softwash: { baseRate: 5, easyAccess: 1, hardAccess: 1.35 },
  })

  useEffect(() => {
    calculatePrice()
  }, [serviceType, size, gutterLength, access, surfaceType, needsResanding])

  const calculatePrice = () => {
    let price = 0

    if (serviceType === "gutter") {
      // Gutter is priced per linear metre
      price = gutterLength[0] * pricingData.gutter.baseRate
    } else {
      const service = pricingData[serviceType as keyof typeof pricingData]
      if (!service || !("baseRate" in service)) return

      price = size[0] * service.baseRate

      // Apply access multiplier
      if ("easyAccess" in service && "hardAccess" in service) {
        price *= access === "hard" ? service.hardAccess : service.easyAccess
      }

      // Add block paving resanding for driveways
      if (serviceType === "driveway" && surfaceType === "block" && needsResanding) {
        price += size[0] * pricingData.driveway.blockPavingResanding
      }
    }

    setEstimatedPrice(Math.round(price))
  }

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
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Instant Pricing Calculator</h1>
                <p className="text-xl text-white/70">Get a rough estimate for your property cleaning project</p>
              </div>

              <div className="glass-border-enhanced rounded-2xl p-8 space-y-8">
                {/* Service Type */}
                <div className="space-y-3">
                  <Label className="text-white text-lg">Service Type</Label>
                  <Select
                    value={serviceType}
                    onValueChange={(val) => {
                      setServiceType(val)
                      // Reset surface type when changing service
                      setSurfaceType("standard")
                      setNeedsResanding(false)
                    }}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="driveway">Driveway Cleaning</SelectItem>
                      <SelectItem value="patio">Patio/Decking</SelectItem>
                      <SelectItem value="roof">Roof Cleaning</SelectItem>
                      <SelectItem value="gutter">Gutter Cleaning</SelectItem>
                      <SelectItem value="walls">Exterior Walls</SelectItem>
                      <SelectItem value="softwash">Softwash Treatment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Conditional: Driveway Surface Type */}
                {serviceType === "driveway" && (
                  <div className="space-y-3">
                    <Label className="text-white text-lg">Driveway Surface Type</Label>
                    <Select value={surfaceType} onValueChange={setSurfaceType}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Concrete / Tarmac / Resin</SelectItem>
                        <SelectItem value="block">Block Paving</SelectItem>
                        <SelectItem value="natural">Natural Stone</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Block Paving Resanding Option */}
                    {surfaceType === "block" && (
                      <div className="bg-[#1E90FF]/10 rounded-lg p-4 border border-[#1E90FF]/30 mt-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-3">
                            <Info className="h-5 w-5 text-[#1E90FF] mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-white font-medium">Kiln-Dried Sand Re-Application</p>
                              <p className="text-white/60 text-sm">
                                Block paving benefits from re-sanding after cleaning (+£
                                {pricingData.driveway.blockPavingResanding.toFixed(2)}/sqm)
                              </p>
                            </div>
                          </div>
                          <Switch checked={needsResanding} onCheckedChange={setNeedsResanding} />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Size - for non-gutter services */}
                {serviceType !== "gutter" ? (
                  <div className="space-y-3">
                    <Label className="text-white text-lg">Approximate Size: {size[0]}m²</Label>
                    <Slider value={size} onValueChange={setSize} min={10} max={500} step={10} className="w-full" />
                    <p className="text-white/60 text-sm">Adjust slider to match your property size</p>
                  </div>
                ) : (
                  /* Gutter Length */
                  <div className="space-y-3">
                    <Label className="text-white text-lg">Gutter Length: {gutterLength[0]} linear metres</Label>
                    <Slider
                      value={gutterLength}
                      onValueChange={setGutterLength}
                      min={5}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-white/60 text-sm">Estimate the total length of guttering around your property</p>
                  </div>
                )}

                {/* Access - not shown for gutter */}
                {serviceType !== "gutter" && (
                  <div className="space-y-3">
                    <Label className="text-white text-lg">Property Access</Label>
                    <Select value={access} onValueChange={setAccess}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy (parking nearby, no obstructions)</SelectItem>
                        <SelectItem value="hard">Difficult (limited access, stairs, slopes)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Water & Power Notice */}
                <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
                  <div className="flex items-start gap-3">
                    <div className="flex gap-2">
                      <Droplets className="h-5 w-5 text-amber-400" />
                      <Zap className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Water & Power Required</p>
                      <p className="text-white/60 text-sm">
                        We will need access to an external water tap and power supply on the day of service. Please
                        ensure these are accessible.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Estimated Price */}
                <div className="bg-[#1E90FF]/20 rounded-xl p-8 text-center border-2 border-[#1E90FF]">
                  <p className="text-white/80 mb-2">Estimated Price</p>
                  <p className="text-5xl font-bold text-[#1E90FF]">£{estimatedPrice}</p>
                  <p className="text-white/60 text-sm mt-2">
                    {serviceType === "gutter"
                      ? `Based on ${gutterLength[0]} linear metres`
                      : `Based on ${size[0]}m² area`}
                    {serviceType === "driveway" && surfaceType === "block" && needsResanding && " (includes resanding)"}
                  </p>
                  <p className="text-amber-400 text-xs mt-3">
                    * Online estimates are indicative. Final quote provided after site assessment.
                  </p>
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
                    "Satisfaction guarantee",
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
