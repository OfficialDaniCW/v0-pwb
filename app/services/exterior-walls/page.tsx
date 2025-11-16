import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Phone } from 'lucide-react'
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"

export const metadata: Metadata = {
  title: "Exterior Wall Cleaning Swanage & Purbeck | Render Soft Washing | PowerWash Bros",
  description: "Professional exterior wall and render cleaning in Swanage and Purbeck. Soft wash specialists. Safe for all surfaces including Purbeck stone.",
}

export default function ExteriorWallsPage() {
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
                <span className="text-white">Exterior Walls & Render</span>
              </nav>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Exterior Wall & Render Cleaning in Swanage & Purbeck
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Restore your property's facade with professional soft washing. Safe for render, Purbeck stone, brick, and painted surfaces. Serving all of Purbeck.
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
              <h2 className="text-3xl font-bold mb-8 text-white">Why Exterior Walls Matter in Purbeck</h2>
              <p className="text-lg mb-6 text-white/80">
                Your property's exterior is constantly battling Purbeck's coastal climate. Salt air, damp conditions, and organic growth create:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Green Algae Staining", desc: "Particularly on north-facing Swanage properties and shaded Purbeck walls" },
                  { title: "Black Lichen Spots", desc: "Stubborn growth on render and Purbeck stone that resists DIY cleaning" },
                  { title: "Dirt & Pollution", desc: "Traffic grime and coastal salt buildup making properties look tired" },
                  { title: "Moss Growth", desc: "Especially on older Purbeck properties with textured render or stonework" },
                ].map((item, i) => (
                  <Card key={i} className="bg-white/10 border-2 border-[#1E90FF]/20">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                      <p className="text-white/80">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-white">Why Soft Washing, Not Pressure Washing</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-4 text-white/80">
                    <strong>High pressure washing damages walls.</strong> It can:
                  </p>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start gap-3">
                      <span className="text-destructive">✗</span>
                      <span>Strip paint and protective coatings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-destructive">✗</span>
                      <span>Damage render and pointing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-destructive">✗</span>
                      <span>Force water into wall cavities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-destructive">✗</span>
                      <span>Erode Purbeck stone surfaces</span>
                    </li>
                  </ul>
                </div>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-4 text-white">Our Soft Wash Method</h3>
                    <p className="mb-4 text-white/80">
                      Low-pressure cleaning with PowerUps Soft Wash solution:
                    </p>
                    <ul className="space-y-3 text-white/80">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                        <span>Kills organic growth at the root</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                        <span>Safe for all surfaces including historic Purbeck stone</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                        <span>Prevents regrowth for 12+ months</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                        <span>Environmentally responsible application</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12 text-white">Surfaces We Clean in Purbeck</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { type: "Render & K-Rend", desc: "Modern and traditional render finishes common on Purbeck properties" },
                  { type: "Purbeck Stone", desc: "Historic limestone requiring gentle specialist care" },
                  { type: "Brick & Stonework", desc: "Victorian and modern brickwork across Swanage and Purbeck" },
                  { type: "Painted Surfaces", desc: "External painted walls without stripping paint" },
                  { type: "Cladding", desc: "PVC, wood, and composite cladding systems" },
                  { type: "Pebbledash", desc: "Textured finishes common on coastal Purbeck properties" },
                ].map((item, i) => (
                  <Card key={i} className="bg-white/10 border-2 border-[#1E90FF]/20">
                    <CardContent className="p-6">
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
            <h2 className="text-4xl font-bold mb-6 text-white">Transform Your Purbeck Property's Facade</h2>
            <p className="text-xl mb-8 text-white/90">
              Free quotes • Soft wash specialists • Safe for all surfaces
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-8 text-xl
                         hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
            >
              <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                Get Free Assessment
              </a>
            </Button>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
