import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Info } from "lucide-react"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Swanage Patio & Wall Refresh | PowerWash Bros Portfolio",
  description:
    "Dramatic patio transformation in Swanage revealing beautiful natural stone colours. Professional power washing and chemical treatment bringing stunning results that exceeded customer expectations.",
}

export default function SwanagePatioProject() {
  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />

        {/* Hero */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Swanage Patio & Wall Refresh</h1>
              <p className="text-xl text-white/80">
                Uncovering the stunning natural beauty of this Swanage property's outdoor space
              </p>
            </div>
          </div>
        </section>

        {/* Main Project Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="glass-border rounded-2xl p-8 md:p-12">
                {/* Project Header */}
                <div className="mb-8">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">The Transformation</h2>
                    <Link
                      href="/services/patio-decking"
                      className="text-sm bg-[#1E90FF] text-white px-4 py-2 rounded-full hover:bg-[#1E90FF]/90 transition-colors"
                    >
                      Patio Cleaning
                    </Link>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-white/70">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Swanage, Dorset</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>November 2024</span>
                    </div>
                  </div>
                </div>

                {/* Before/After Slider */}
                <div className="mb-8">
                  <BeforeAfterSlider
                    beforeImage="/images/screenshot-202025-11-24-20at-2012-dirty.png"
                    afterImage="/images/screenshot-202025-11-24-20at-2012-clean.png"
                    alt="Swanage Patio Transformation"
                  />
                  <p className="text-center text-sm text-white/60 mt-4">
                    ← Drag the slider to see the transformation →
                  </p>
                </div>

                {/* Customer Testimonial Highlight */}
                <div className="bg-[#1E90FF]/10 border border-[#1E90FF]/20 rounded-xl p-6 mb-8">
                  <div className="flex items-start gap-3">
                    <Info className="h-6 w-6 text-[#1E90FF] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-semibold mb-2">Customer Feedback</p>
                      <p className="text-white/80 italic">
                        "I honestly didn't think it would look this good. The natural colours of the stone have come
                        back to life – it's like having a brand new patio!"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Project Overview</h3>
                    <p className="text-white/80 leading-relaxed mb-4">
                      This beautiful Swanage property's patio and wall area had been overtaken by years of stubborn
                      algae, moss, and organic growth, completely obscuring the natural beauty of the stone beneath.
                      Dark, slippery, and covered in green buildup, the space was both unsightly and potentially
                      hazardous.
                    </p>
                    <p className="text-white/80 leading-relaxed mb-4">
                      Our team employed a comprehensive two-stage approach combining professional{" "}
                      <Link href="/services/patio-decking" className="text-[#1E90FF] hover:underline">
                        power washing
                      </Link>{" "}
                      with targeted biocide chemical treatment to ensure both immediate transformation and long-lasting
                      protection against regrowth.
                    </p>
                    <p className="text-white/80 leading-relaxed mb-6">
                      The results exceeded even our customer's expectations, revealing the stunning multicoloured
                      natural stone in shades of cream, tan, pink, and beige – colours they'd forgotten existed beneath
                      the grime.
                    </p>
                    <Link href="/services/patio-decking">
                      <Button className="bg-[#1E90FF] text-white hover:bg-[#1E90FF]/90">
                        Learn About Patio Cleaning
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
                    <ul className="space-y-3">
                      <li className="text-white/80 text-sm leading-relaxed">
                        • <strong>Surface Type:</strong> Natural stone paving slabs and brick walls
                      </li>
                      <li className="text-white/80 text-sm leading-relaxed">
                        • <strong>Problem:</strong> Heavy moss, algae, and organic staining completely covering natural
                        stone colours
                      </li>
                      <li className="text-white/80 text-sm leading-relaxed">
                        • <strong>Treatment Method:</strong> Professional power washing followed by biocide chemical
                        application
                      </li>
                      <li className="text-white/80 text-sm leading-relaxed">
                        • <strong>Services Used:</strong>{" "}
                        <Link href="/services/patio-decking" className="text-[#1E90FF] hover:underline">
                          Patio & Decking Cleaning
                        </Link>
                      </li>
                      <li className="text-white/80 text-sm leading-relaxed">
                        • <strong>Duration:</strong> 1 day complete transformation
                      </li>
                      <li className="text-white/80 text-sm leading-relaxed">
                        • <strong>Result:</strong> Stunning revelation of natural stone colours, elimination of slip
                        hazards, and long-term protection against regrowth
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Images Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Additional Angles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-border rounded-xl overflow-hidden">
                  <BeforeAfterSlider
                    beforeImage="/images/screenshot-202025-11-24-20at-2012-dirty.png"
                    afterImage="/images/screenshot-202025-11-24-20at-2012-clean.png"
                    alt="Swanage Patio - Alternative View"
                  />
                  <div className="p-4">
                    <p className="text-white/70 text-sm text-center">
                      Wall and patio area showing complete transformation
                    </p>
                  </div>
                </div>
                <div className="glass-border rounded-xl overflow-hidden group">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/images/screenshot-202025-11-24-20at-2012-clean.png"
                      alt="Swanage patio after cleaning - natural stone colours revealed"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-white/70 text-sm text-center">Beautiful natural stone colours fully restored</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Works Section */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Why Power Washing & Chemical Treatment Works
              </h2>
              <div className="glass-border rounded-xl p-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-[#1E90FF] mb-3">Step 1: Professional Power Washing</h4>
                    <p className="text-white/80 leading-relaxed">
                      Our biocide-trained specialists use professional-grade equipment to safely remove surface
                      contamination, moss, algae, and organic growth. The correct pressure settings and techniques
                      ensure thorough cleaning without damaging the stone surface.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#1E90FF] mb-3">
                      Step 2: Biocide Chemical Treatment Application
                    </h4>
                    <p className="text-white/80 leading-relaxed">
                      Following the power wash, we apply professional-grade biocide treatment to kill remaining spores
                      at a cellular level. This prevents rapid regrowth and provides long-lasting protection, keeping
                      your patio cleaner for longer.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#1E90FF] mb-3">Why Both Methods Matter</h4>
                    <p className="text-white/80 leading-relaxed">
                      Power washing alone removes visible growth but leaves spores behind that quickly regrow. Chemical
                      treatment alone can take weeks to show results. Our combined approach delivers immediate visual
                      transformation with lasting protection – the best of both worlds.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Related Services</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link
                  href="/services/patio-decking"
                  className="glass-border rounded-xl p-6 hover:border-[#1E90FF]/50 transition-colors group"
                >
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#1E90FF] transition-colors">
                    Patio & Decking Cleaning
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Professional cleaning for all patio types including natural stone, concrete, and composite decking.
                    Removes moss, algae, and organic staining.
                  </p>
                </Link>
                <Link
                  href="/services/driveway-cleaning"
                  className="glass-border rounded-xl p-6 hover:border-[#1E90FF]/50 transition-colors group"
                >
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#1E90FF] transition-colors">
                    Driveway Cleaning
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Transform your driveway with professional pressure washing. Block paving, tarmac, concrete, and
                    gravel driveways all cleaned to perfection.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Want Results Like This for Your Property?</h2>
              <p className="text-xl text-white/90 mb-8">
                Get your free, no-obligation quote today and discover what's hiding beneath the grime
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#1E90FF] font-bold rounded-lg px-8 py-6
                             hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white bg-transparent text-white rounded-lg px-8 py-6
                             hover:bg-white hover:text-[#1E90FF] transition-all"
                >
                  <a href="/quote">Request Free Quote</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
