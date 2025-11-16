import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Phone, AlertTriangle } from 'lucide-react'
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"

export const metadata: Metadata = {
  title: "Patio & Decking Cleaning Swanage & Purbeck | Slip Prevention | PowerWash Bros",
  description: "Professional patio and decking cleaning in Swanage and Purbeck. Remove dangerous algae. Safe for Purbeck stone, sandstone, and all surfaces.",
}

export default function PatioDecking() {
  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <nav className="text-sm text-white/60 mb-6">
                <Link href="/" className="hover:text-[#1E90FF]">Home</Link>
                {' > '}
                <Link href="/services" className="hover:text-[#1E90FF]">Services</Link>
                {' > '}
                <span className="text-white">Patio & Decking</span>
              </nav>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Patio & Decking Cleaning in Swanage & Purbeck
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Remove dangerous algae and restore your outdoor space. Specialist care for Purbeck stone, sandstone, and all patio materials. Make your garden safe and beautiful again.
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

        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-destructive/50 bg-destructive/5">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-white">Slippery Patios Are Dangerous</h2>
                      <p className="text-lg mb-4 text-white/80">
                        Green algae on Purbeck patios isn't just ugly - it's a serious slip hazard, especially when wet. We've seen:
                      </p>
                      <ul className="grid md:grid-cols-2 gap-3 text-sm text-white/80">
                        <li>• Elderly relatives falling on slippery patios</li>
                        <li>• Children injured on green decking</li>
                        <li>• Property viewings impacted by neglected outdoor spaces</li>
                        <li>• Insurance claims from visitor accidents</li>
                      </ul>
                      <p className="mt-4 font-semibold text-white">
                        Don't wait for an accident. Get your Purbeck patio or decking cleaned now.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-white">Purbeck Stone Patio Specialists</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg mb-4 text-white/80">
                    Purbeck is famous for its beautiful limestone. Many local properties feature Purbeck stone patios, paths, and features. This precious stone needs specialist care.
                  </p>
                  <h3 className="text-xl font-semibold mb-3 text-white">Why Purbeck Stone Is Different</h3>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                      <span>Porous limestone absorbs dirt and organic growth</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                      <span>Contains fossils that can be damaged by harsh cleaning</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                      <span>Develops natural patina that shouldn't be stripped</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                      <span>Requires pH-balanced cleaning products</span>
                    </li>
                  </ul>
                </div>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">Our Purbeck Stone Process</h3>
                    <ol className="space-y-3 text-white/80">
                      <li className="flex gap-3">
                        <span className="font-bold text-[#1E90FF]">1.</span>
                        <span>Assessment of stone condition and type</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-[#1E90FF]">2.</span>
                        <span>Gentle low-pressure cleaning</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-[#1E90FF]">3.</span>
                        <span>PowerUps Patio Restore (pH-balanced)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-[#1E90FF]">4.</span>
                        <span>Biocide treatment to prevent regrowth</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-[#1E90FF]">5.</span>
                        <span>Optional: Sealing for extra protection</span>
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12 text-white">All Patio & Decking Materials</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { type: "Purbeck Stone", desc: "Local limestone requiring specialist gentle care" },
                  { type: "Sandstone & Limestone", desc: "Natural stone from across Dorset and beyond" },
                  { type: "Block Paving", desc: "Concrete and clay pavers popular in Swanage and Purbeck" },
                  { type: "Concrete", desc: "Smooth, textured, or stamped concrete patios" },
                  { type: "Wood Decking", desc: "Softwood and hardwood decking without damage" },
                  { type: "Composite Decking", desc: "Modern materials needing careful cleaning" },
                ].map((item, i) => (
                  <Card key={i} className="bg-white/10 border-2 border-[#1E90FF]/20">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-lg font-semibold mb-2 text-white">{item.type}</h3>
                      <p className="text-sm text-white/80">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">Enjoy Your Purbeck Outdoor Space Again</h2>
            <p className="text-xl mb-8 text-white/90">
              Free quotes • Purbeck stone specialists • Safe, non-slip surfaces
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-8 text-xl
                         hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
            >
              <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                Get Your Free Quote
              </a>
            </Button>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
