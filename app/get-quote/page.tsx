"use client"

import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"
import { Calculator, CheckCircle2, Info, Droplets, Zap, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function GetQuotePage() {
  const [serviceType, setServiceType] = useState("driveway")
  const [size, setSize] = useState([50])
  const [gutterLength, setGutterLength] = useState([15])
  const [access, setAccess] = useState("easy")
  const [surfaceType, setSurfaceType] = useState("standard")
  const [needsResanding, setNeedsResanding] = useState(false)
  const [distanceFromSwanage, setDistanceFromSwanage] = useState([0])
  const [estimatedPrice, setEstimatedPrice] = useState(0)

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
                Use our pricing calculator for an estimated quote. This helps us understand your project scope.
              </p>
              <div className="bg-accent/20 border border-accent/50 rounded-lg p-4 mb-8">
                <p className="text-sm text-foreground flex items-start gap-2">
                  <Info className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>
                    This calculator provides estimates based on size, location, and property conditions. We'll provide accurate quotes after assessing your property in person.
                  </span>
                </p>
              </div>
            </div>

            {/* Calculator Section */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Input Section */}
              <div className="lg:col-span-2 space-y-8">
                {/* Service Type */}
                <div className="glass-border rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">What service do you need?</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-foreground text-lg">Service Type</Label>
                      <Select value={serviceType} onValueChange={setServiceType}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="driveway">Driveway Cleaning (Block Paving)</SelectItem>
                          <SelectItem value="patio">Patio Cleaning</SelectItem>
                          <SelectItem value="roof">Roof Cleaning & Moss Removal</SelectItem>
                          <SelectItem value="gutter">Gutter Clearing & Cleaning</SelectItem>
                          <SelectItem value="walls">Wall & Facade Cleaning</SelectItem>
                          <SelectItem value="softwash">Softwash Cleaning (Render, K-Rend)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Size Input - Hide for Gutter */}
                    {serviceType !== "gutter" && (
                      <div className="space-y-3">
                        <Label className="text-foreground text-lg">Area Size: {size[0]} m²</Label>
                        <Slider
                          value={size}
                          onValueChange={setSize}
                          min={10}
                          max={500}
                          step={5}
                          className="w-full"
                        />
                        <p className="text-muted-foreground text-sm">Approximate area to be cleaned</p>
                      </div>
                    )}

                    {/* Gutter Length */}
                    {serviceType === "gutter" && (
                      <div className="space-y-3">
                        <Label className="text-foreground text-lg">Gutter Length: {gutterLength[0]} metres</Label>
                        <Slider
                          value={gutterLength}
                          onValueChange={setGutterLength}
                          min={5}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                        <p className="text-muted-foreground text-sm">Approximate linear metres of gutter</p>
                      </div>
                    )}

                    {/* Surface Type - Only for Driveway - Button Group */}
                    {serviceType === "driveway" && (
                      <div>
                        <Label className="text-foreground text-lg">Surface Type</Label>
                        <div className="flex gap-3 mt-3 flex-wrap">
                          <button
                            onClick={() => setSurfaceType("standard")}
                            className={`flex-1 min-w-[120px] py-3 px-4 rounded-lg font-semibold transition-all border-2 ${
                              surfaceType === "standard"
                                ? "bg-[#00C853] border-[#00C853] text-white shadow-lg"
                                : "border-white/20 text-foreground hover:border-[#00C853] hover:bg-white/5"
                            }`}
                          >
                            Concrete
                          </button>
                          <button
                            onClick={() => setSurfaceType("block")}
                            className={`flex-1 min-w-[120px] py-3 px-4 rounded-lg font-semibold transition-all border-2 ${
                              surfaceType === "block"
                                ? "bg-[#00C853] border-[#00C853] text-white shadow-lg"
                                : "border-white/20 text-foreground hover:border-[#00C853] hover:bg-white/5"
                            }`}
                          >
                            Block
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Re-sanding Option - WhatsApp Green Button */}
                    {serviceType === "driveway" && surfaceType === "block" && (
                      <div className="p-4 rounded-lg border-2 border-white/10 hover:border-[#00C853] transition-colors">
                        <button
                          onClick={() => setNeedsResanding(!needsResanding)}
                          className={`w-full text-left p-4 rounded-lg font-semibold transition-all border-2 ${
                            needsResanding
                              ? "bg-[#00C853] border-[#00C853] text-white shadow-lg"
                              : "border-white/20 text-foreground hover:border-[#00C853] hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">Re-Sand Joints?</p>
                              <p className="text-xs mt-1 opacity-80">+£2/m²</p>
                            </div>
                            <div className="text-xl">{needsResanding ? "✓" : "○"}</div>
                          </div>
                        </button>
                      </div>
                    )}

                    {/* Distance from Swanage */}
                    <div className="space-y-3">
                      <Label className="text-foreground text-lg">Distance from Swanage: {distanceFromSwanage[0]} miles</Label>
                      <Slider
                        value={distanceFromSwanage}
                        onValueChange={setDistanceFromSwanage}
                        min={0}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-muted-foreground text-sm">Approximate distance from Swanage town centre</p>
                    </div>

                    {/* Access - Not shown for gutter - Button Group */}
                    {serviceType !== "gutter" && (
                      <div>
                        <Label className="text-foreground text-lg">Access Type</Label>
                        <div className="flex gap-3 mt-3 flex-wrap">
                          <button
                            onClick={() => setAccess("easy")}
                            className={`flex-1 min-w-[120px] py-3 px-4 rounded-lg font-semibold transition-all border-2 ${
                              access === "easy"
                                ? "bg-[#00C853] border-[#00C853] text-white shadow-lg"
                                : "border-white/20 text-foreground hover:border-[#00C853] hover:bg-white/5"
                            }`}
                          >
                            Easy Access
                          </button>
                          <button
                            onClick={() => setAccess("hard")}
                            className={`flex-1 min-w-[120px] py-3 px-4 rounded-lg font-semibold transition-all border-2 ${
                              access === "hard"
                                ? "bg-[#00C853] border-[#00C853] text-white shadow-lg"
                                : "border-white/20 text-foreground hover:border-[#00C853] hover:bg-white/5"
                            }`}
                          >
                            Difficult Access
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Service Info */}
                <div className="glass-border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Why This Matters</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90">Accurate estimates help us schedule efficiently and serve you better</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90">We'll verify all measurements during our in-person assessment</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90">Professional quotes are completely free with no obligation</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Price Summary Section */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Price Display */}
                  <div className="bg-gradient-to-br from-accent to-accent/80 rounded-xl p-8 text-center">
                    <p className="text-accent-foreground/80 mb-2">Estimated Price</p>
                    <div className="text-5xl font-bold text-accent-foreground mb-4">£{estimatedPrice}</div>
                    <p className="text-sm text-accent-foreground/70 mb-6">
                      Based on size, location & conditions
                    </p>
                    <Link
                      href="https://wa.me/447418610731?text=Hi%20PowerWash%20Bros%2C%20I%20calculated%20an%20estimate%20of%20%C2%A3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full bg-accent-foreground text-accent hover:bg-accent-foreground/90 font-bold py-6 text-lg">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Chat on WhatsApp
                      </Button>
                    </Link>
                  </div>

                  {/* Next Steps */}
                  <div className="glass-border rounded-xl p-6">
                    <h3 className="font-bold text-foreground mb-4">Next Steps</h3>
                    <ol className="space-y-3 text-sm text-foreground/90">
                      <li className="flex gap-3">
                        <span className="font-bold text-accent flex-shrink-0">1</span>
                        <span>Contact us via WhatsApp or phone</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-accent flex-shrink-0">2</span>
                        <span>We'll arrange a convenient time to visit</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-accent flex-shrink-0">3</span>
                        <span>Receive an accurate, detailed quote</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-accent flex-shrink-0">4</span>
                        <span>Schedule your service at your convenience</span>
                      </li>
                    </ol>
                  </div>

                  {/* Contact Info */}
                  <div className="glass-border rounded-xl p-6 space-y-3">
                    <p className="text-sm font-semibold text-foreground">Prefer to contact us directly?</p>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">WhatsApp: </span>
                        <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer" className="text-success hover:underline font-semibold">
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
                        <a href="mailto:info@powerwashbros.co.uk" className="text-accent hover:underline font-semibold">
                          info@powerwashbros.co.uk
                        </a>
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
