import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Droplets, Zap, Home, Shield } from 'lucide-react'
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"

export const metadata: Metadata = {
  title: "Pressure Washing Swanage & Purbeck | Driveway & Patio Cleaning | PowerWash Bros",
  description: "Professional pressure washing in Swanage and Purbeck. Driveways, patios, walls, and decking restored. Expert power washing. Free quotes.",
}

export default function PressureWashingPage() {
  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        
        {/* Hero Section */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <nav className="text-sm text-white/60 mb-6">
                <Link href="/" className="hover:text-[#1E90FF]">Home</Link>
                {' > '}
                <Link href="/services" className="hover:text-[#1E90FF]">Services</Link>
                {' > '}
                <span className="text-white">Pressure Washing</span>
              </nav>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Expert Pressure Washing in Swanage & Purbeck
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Transform your property with professional pressure washing services across Dorset. Driveways, patios, walls, decking and more restored to pristine condition.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#00C853] text-white font-semibold rounded-lg px-8 py-6
                             hover:bg-[#00A843] transition-all"
                >
                  <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#1E90FF] bg-transparent text-[#1E90FF] rounded-lg px-8 py-6
                             hover:bg-[#1E90FF] hover:text-white transition-all"
                >
                  <a href="/quote">Get Free Quote</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-sm text-white/60 mb-4">
                <Link href="/" className="hover:text-[#1E90FF]">Home</Link>
                {" > "}
                <Link href="/services" className="hover:text-[#1E90FF]">Services</Link>
                {" > "}
                <span className="text-white">Pressure Washing</span>
              </div>
              <h2 className="text-3xl font-bold mb-8 text-white">
                Why Pressure Washing Matters in Purbeck
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg mb-4 text-white/80">
                    Purbeck's coastal climate creates perfect conditions for organic growth on hard surfaces. Living in Swanage, Wareham, or anywhere across Purbeck means dealing with:
                  </p>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Slippery surfaces</strong> from algae and moss creating safety hazards</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Oil stains</strong> and tyre marks degrading driveway appearance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Surface degradation</strong> from organic matter breaking down materials</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Reduced property value</strong> from neglected external appearance</span>
                    </li>
                  </ul>
                </div>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-2xl font-semibold mb-4 text-white">
                      The Cost of Neglect
                    </h3>
                    <p className="mb-4 text-white/80">
                      Regular pressure washing (£200-400) prevents expensive problems:
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Driveway replacement: £3,000-10,000</li>
                      <li>• Patio re-laying: £2,000-6,000</li>
                      <li>• Wall repointing: £1,500-4,000</li>
                      <li>• Slip and fall liability: Unlimited</li>
                    </ul>
                    <p className="mt-4 font-semibold text-[#1E90FF]">
                      Prevention is always cheaper than repair.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-white">
                Pressure Washing Services in Dorset
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <Droplets className="h-8 w-8 text-[#1E90FF] mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Driveway Pressure Washing
                    </h3>
                    <p className="text-white/80 mb-3">
                      Remove oil stains, tyre marks, moss and algae from block paving, concrete, tarmac and gravel driveways across Purbeck.
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Block paving restoration</li>
                      <li>• Concrete cleaning</li>
                      <li>• Tarmac surface cleaning</li>
                      <li>• Gravel stabilization</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <Home className="h-8 w-8 text-[#1E90FF] mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Patio & Decking Cleaning
                    </h3>
                    <p className="text-white/80 mb-3">
                      Restore slippery, discoloured patios and decking to safe, beautiful outdoor spaces. Suitable for all materials.
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Natural stone patios</li>
                      <li>• Porcelain and ceramic tiles</li>
                      <li>• Wooden decking</li>
                      <li>• Composite decking</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <Shield className="h-8 w-8 text-[#1E90FF] mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Wall & Render Cleaning
                    </h3>
                    <p className="text-white/80 mb-3">
                      Remove green algae, black spots and atmospheric pollution from external walls, render and brickwork in Swanage.
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Brick wall cleaning</li>
                      <li>• Rendered surfaces</li>
                      <li>• Purbeck stone walls</li>
                      <li>• Garden walls</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <Zap className="h-8 w-8 text-[#1E90FF] mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Commercial Pressure Washing
                    </h3>
                    <p className="text-white/80 mb-3">
                      Car parks, forecourts, shop fronts and commercial premises. Maintain professional appearance and safety standards.
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Car parks and forecourts</li>
                      <li>• Shop fronts</li>
                      <li>• Loading bays</li>
                      <li>• Business premises</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12 text-white">
                Our Pressure Washing Process
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: 1, title: "Surface Assessment", desc: "Evaluate materials and contamination types to select optimal cleaning approach." },
                  { step: 2, title: "Pre-Treatment", desc: "PowerUps biocides target organic growth at the root for lasting results." },
                  { step: 3, title: "Pressure Washing", desc: "Professional equipment with pressure adjusted for surface type protection." },
                  { step: 4, title: "Optional Sealing", desc: "Protective sealants prevent rapid re-contamination and extend results." },
                ].map((item) => (
                  <Card key={item.step} className="bg-white/10 border-2 border-[#1E90FF]/20">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-[#1E90FF] text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                        {item.step}
                      </div>
                      <h3 className="font-semibold mb-2 text-white">{item.title}</h3>
                      <p className="text-sm text-white/80">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-white">
                Why Pressure Washing is Essential for Purbeck Properties
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Prevents Surface Degradation
                    </h3>
                    <p className="text-white/80">
                      Organic growth breaks down surfaces over time. Regular pressure washing prevents thousands in repair costs for Purbeck properties.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Eliminates Safety Hazards
                    </h3>
                    <p className="text-white/80">
                      Slippery algae and moss create dangerous surfaces. Pressure washing restores grip and safety for your family and visitors.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Boosts Kerb Appeal
                    </h3>
                    <p className="text-white/80">
                      First impressions matter. Clean driveways and patios significantly enhance property appeal and value in Swanage.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Extends Surface Lifespan
                    </h3>
                    <p className="text-white/80">
                      Regular maintenance prevents premature replacement, protecting your investment in Dorset property for years to come.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Guidance */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Pressure Washing Pricing for Purbeck Properties
              </h2>
              <p className="text-lg mb-6 text-white/80">
                Pricing depends on several factors:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                    <span>Surface area to be cleaned</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                    <span>Contamination level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                    <span>Surface type and material</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                    <span>Access difficulty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                    <span>Sealing requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                    <span>Property location in Purbeck</span>
                  </li>
                </ul>
              </div>
              <Card className="bg-[#1E90FF] text-white">
                <CardContent className="p-8 text-center">
                  <p className="text-xl mb-4">
                    <strong>Typical Purbeck property:</strong> £150-600
                  </p>
                  <p className="mb-6 text-white/80">
                    Get a free, accurate quote based on YOUR property
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-8 text-xl
                               hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                      Get Free Quote via WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-white">
                Pressure Washing FAQs
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "How often should I pressure wash my driveway in Purbeck?",
                    a: "Most Purbeck properties benefit from pressure washing every 12-18 months. Coastal properties in Swanage or shaded driveways may need more frequent cleaning due to accelerated growth."
                  },
                  {
                    q: "Will pressure washing damage my surfaces?",
                    a: "No. We adjust pressure levels for each surface type. Block paving, concrete, and stone are safely cleaned with professional equipment and techniques."
                  },
                  {
                    q: "How long does pressure washing take?",
                    a: "A typical driveway takes 2-4 hours. Larger properties or heavily contaminated surfaces may require additional time for optimal results."
                  },
                  {
                    q: "Do you use chemicals?",
                    a: "Yes. We use PowerUps biocides to kill organic growth at the root. This provides longer-lasting results than pressure washing alone and prevents rapid regrowth."
                  },
                  {
                    q: "Can you clean in winter?",
                    a: "Yes. We work year-round across Purbeck. We avoid freezing conditions but can clean effectively in cold, dry weather throughout winter months."
                  },
                ].map((faq, i) => (
                  <Card key={i} className="bg-white/10 border-2 border-[#1E90FF]/20">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2 text-white">{faq.q}</h3>
                      <p className="text-white/80">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 text-white">
                Transform Your Purbeck Property Today
              </h2>
              <p className="text-xl mb-8 opacity-90 text-white/80">
                Professional pressure washing that protects and enhances your investment
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-8 text-xl
                           hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
              >
                <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                  Start WhatsApp Conversation
                </a>
              </Button>
            </div>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
