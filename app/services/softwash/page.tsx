import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Droplets, Shield, Leaf } from 'lucide-react'
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"

export const metadata: Metadata = {
  title: "Soft Washing Dorset | Render & Stone Cleaning | Biocide Treatment | PowerWash Bros",
  description: "Professional soft washing in Swanage, Purbeck, and across Dorset. Gentle biocide treatment for render, stone, and delicate surfaces. No pressure damage. Best soft washing Dorset.",
}

export default function SoftwashPage() {
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
                <span className="text-white">Soft Washing</span>
              </nav>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Professional Soft Washing in Swanage & Purbeck
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Gentle, eco-friendly cleaning for delicate surfaces across Dorset. Remove algae, mould and organic growth without pressure washing damage.
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

        {/* What is Soft Washing */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-sm text-white/60 mb-4">
                <Link href="/" className="hover:text-[#1E90FF]">Home</Link>
                {" > "}
                <Link href="/services" className="hover:text-[#1E90FF]">Services</Link>
                {" > "}
                <span className="text-white">Soft Washing</span>
              </div>
              <h2 className="text-3xl font-bold mb-8 text-white">
                What is Soft Washing?
              </h2>
              <p className="text-lg mb-6 text-white/80">
                Soft washing is a gentle alternative to high-pressure cleaning, perfect for delicate Purbeck stone, render, and heritage buildings in Swanage. Instead of blasting surfaces with high-pressure water, we apply specialist biocide treatments that kill organic growth at the root.
              </p>
              <p className="text-lg mb-8 text-white/80">
                This method is safer for fragile materials, prevents water damage, and provides longer-lasting results than pressure washing alone. It's the professional choice for external property maintenance across Dorset.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <Droplets className="h-8 w-8 text-[#1E90FF] mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-white">Low Pressure</h3>
                    <p className="text-white/80">
                      Garden hose pressure prevents damage to render, pointing, and delicate surfaces common in Purbeck properties.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <Shield className="h-8 w-8 text-[#1E90FF] mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-white">Biocide Treatment</h3>
                    <p className="text-white/80">
                      Our PowerUps chemicals kill algae, moss and lichens, preventing regrowth for 12-24 months.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <Leaf className="h-8 w-8 text-[#1E90FF] mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-white">Eco-Friendly</h3>
                    <p className="text-white/80">
                      Biodegradable treatments safe for plants, pets and the environment when used correctly.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-white">
                Why Soft Washing Matters in Purbeck
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg mb-4 text-white/80">
                    Purbeck's coastal climate creates perfect conditions for algae, moss, and organic growth on external surfaces. Living in Swanage, Wareham, or anywhere across Purbeck means dealing with:
                  </p>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Green algae growth</strong> from damp coastal air damaging render and stonework</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Black spots</strong> on render from atmospheric pollution and organic matter</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Pressure washing damage</strong> removing render finishes and damaging pointing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Recurring growth</strong> when surfaces aren't properly treated</span>
                    </li>
                  </ul>
                </div>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-2xl font-semibold mb-4 text-white">
                      Soft Washing vs Pressure Washing
                    </h3>
                    <p className="mb-4 text-white/80">
                      High-pressure washing can cause serious damage to Purbeck properties:
                    </p>
                    <ul className="space-y-2 text-sm text-white/80 text-left">
                      <li>• Strips render finishes and paint</li>
                      <li>• Damages pointing between bricks and stone</li>
                      <li>• Forces water behind cladding</li>
                      <li>• Only removes surface growth, not roots</li>
                      <li>• Regrowth within 3-6 months</li>
                    </ul>
                    <p className="mt-4 font-semibold text-[#1E90FF]">
                      Soft washing is gentle yet more effective.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Ideal Surfaces */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-white">
                Ideal Surfaces for Soft Washing in Swanage
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Render & External Walls
                    </h3>
                    <p className="text-white/80 mb-3">
                      K-rend, monocouche, and painted render all benefit from soft washing. Removes green algae and black spots without damaging the finish.
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Coloured render restoration</li>
                      <li>• Painted external walls</li>
                      <li>• Textured render surfaces</li>
                      <li>• Pebbledash cleaning</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Heritage & Natural Stone
                    </h3>
                    <p className="text-white/80 mb-3">
                      Purbeck stone, Portland stone, and historic brickwork require gentle cleaning to preserve their character and integrity.
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Listed buildings</li>
                      <li>• Purbeck stone cottages</li>
                      <li>• Church and monument cleaning</li>
                      <li>• Natural stone walls</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Roofs & Tiles
                    </h3>
                    <p className="text-white/80 mb-3">
                      Soft washing safely removes moss and algae from roof tiles without the risk of breakage from high-pressure washing.
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Clay and concrete tiles</li>
                      <li>• Slate roofs</li>
                      <li>• Flat roof membranes</li>
                      <li>• Fibreglass roofing</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Wooden Surfaces
                    </h3>
                    <p className="text-white/80 mb-3">
                      Decking, fences, cladding and garden furniture all benefit from gentle soft washing rather than aggressive pressure.
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Timber decking</li>
                      <li>• Wooden fencing</li>
                      <li>• Cedar cladding</li>
                      <li>• Garden structures</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12 text-white">
                Our Soft Washing Process
              </h2>
              <div className="grid md:grid-cols-5 gap-6">
                {[
                  { step: 1, title: "Surface Assessment", desc: "We inspect your property to identify surface type and organic growth level." },
                  { step: 2, title: "Pre-Treatment", desc: "Apply PowerUps biocide at correct dilution for maximum effectiveness." },
                  { step: 3, title: "Dwell Time", desc: "Allow treatment to penetrate and kill organic growth at the root (10-20 mins)." },
                  { step: 4, title: "Gentle Rinse", desc: "Low-pressure rinse removes dead growth without surface damage." },
                  { step: 5, title: "Final Protection", desc: "Optional sealant application for extended protection and easier maintenance." },
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

        {/* PowerUps Products */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-white">
                PowerUps Bio-Clean: Professional Strength Treatment
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-4 text-white/80">
                    We use PowerUps Bio-Clean - a professional-grade biocide specifically designed for external property cleaning in UK coastal climates.
                  </p>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                      <span>Kills algae, moss, lichen and mould at the root</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                      <span>Prevents regrowth for 12-24 months</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                      <span>Applied by biocide-trained professionals</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                      <span>Biodegradable and environmentally responsible</span>
                    </li>
                  </ul>
                </div>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-4 text-white">
                      Why Professional Application Matters
                    </h3>
                    <p className="mb-4 text-white/80">
                      Biocides require proper training to use safely and effectively. Our team understands:
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Correct dilution for different surfaces</li>
                      <li>• Application methods and dwell times</li>
                      <li>• Protection for plants and drainage</li>
                      <li>• Legal compliance and safety protocols</li>
                    </ul>
                    <Button
                      asChild
                      className="mt-4 bg-[#1E90FF] text-white font-bold rounded-lg px-8 py-6
                                hover:bg-[#1E90FF]/90 hover:shadow-2xl hover:scale-105 transition-all"
                    >
                      <a href="/powerups">Learn About PowerUps</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Guidance */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Soft Washing Pricing for Purbeck Properties
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
                    <span>Organic growth severity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                    <span>Surface type and condition</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                    <span>Access difficulty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                    <span>Protection sealant requirements</span>
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
                    <strong>Starting from:</strong> £150-500 for typical Purbeck properties
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
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-white">
                Soft Washing FAQs
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "How long does soft washing take?",
                    a: "Most Purbeck properties take 2-4 hours depending on size and complexity. The biocide needs 10-20 minutes dwell time to work effectively."
                  },
                  {
                    q: "Is soft washing safe for all surfaces?",
                    a: "Yes. Soft washing is safe for render, stone, brick, timber, and most external surfaces. We adjust our treatment strength for each surface type."
                  },
                  {
                    q: "How long until I see results?",
                    a: "You'll see immediate improvement, but full results develop over 1-2 weeks as the biocide continues working and dead growth weathers away naturally."
                  },
                  {
                    q: "Will it damage my plants?",
                    a: "No. We protect all plants and landscaping before treatment. Our biocides are biodegradable and safe when applied correctly by trained professionals."
                  },
                  {
                    q: "How often should I soft wash my property?",
                    a: "Typically every 2-3 years for coastal Purbeck properties. Results last 12-24 months depending on exposure and environmental conditions."
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
                Transform Your Purbeck Property with Soft Washing
              </h2>
              <p className="text-xl mb-8 opacity-90 text-white/80">
                Gentle, effective cleaning that protects your surfaces
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
