import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, CheckCircle2, Shield } from "lucide-react"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Roof Clean & Biocide Treatment | PowerWash Bros Portfolio",
  description:
    "Professional roof cleaning with biocide treatment in Dorset. Complete removal of moss, lichen, and algae with long-lasting protection.",
}

export default function RoofCleanBiocidePage() {
  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />

        {/* Hero */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link href="/our-work" className="inline-flex items-center text-[#1E90FF] hover:underline mb-6 text-sm">
                ← Back to Our Work
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Professional Roof Clean & Biocide Treatment
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/70">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Dorset</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>November 2024</span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/services/roof-cleaning"
                    className="text-xs bg-[#1E90FF] text-white px-3 py-1 rounded-full hover:bg-[#1E90FF]/90 transition-colors"
                  >
                    Roof Cleaning
                  </Link>
                  <Link
                    href="/services/powerup"
                    className="text-xs bg-[#1E90FF] text-white px-3 py-1 rounded-full hover:bg-[#1E90FF]/90 transition-colors"
                  >
                    PowerUp Treatment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Before/After Sliders */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-8">
              {/* First Slider */}
              <div className="glass-border rounded-2xl p-6">
                <BeforeAfterSlider
                  beforeImage="/images/before2.jpeg"
                  afterImage="/images/after3.png"
                  alt="Roof cleaning transformation - moss removal and biocide treatment"
                />
                <p className="text-center text-sm text-white/60 mt-4">← Drag the slider to see the transformation →</p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="glass-border rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    This Dorset property's roof was severely affected by moss, lichen, and algae growth, creating an
                    unsightly appearance and potentially compromising the roof's longevity. Years of organic buildup had
                    discoloured the tiles and created ideal conditions for further deterioration.
                  </p>
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    Our team performed a comprehensive{" "}
                    <Link href="/services/roof-cleaning" className="text-[#1E90FF] hover:underline">
                      roof cleaning
                    </Link>{" "}
                    service, carefully removing all biological growth without damaging the tiles. Following the clean,
                    we applied our specialist{" "}
                    <Link href="/services/powerup" className="text-[#1E90FF] hover:underline">
                      PowerUp biocide treatment
                    </Link>
                    , which provides long-lasting protection against regrowth and helps maintain the roof's pristine
                    condition for years to come.
                  </p>
                  <p className="text-white/80 text-lg leading-relaxed">
                    The transformation speaks for itself – from a heavily stained, moss-covered roof to a clean,
                    protected surface that enhances the property's kerb appeal and structural integrity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Used */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Services Used</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link
                  href="/services/roof-cleaning"
                  className="glass-border rounded-xl p-6 hover:border-[#1E90FF] transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1E90FF]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1E90FF]/30 transition-colors">
                      <Shield className="w-6 h-6 text-[#1E90FF]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Professional Roof Cleaning</h3>
                      <p className="text-white/70 text-sm">
                        Specialist moss, lichen, and algae removal using safe, effective techniques that protect your
                        roof tiles whilst achieving exceptional results.
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/services/powerup"
                  className="glass-border rounded-xl p-6 hover:border-[#1E90FF] transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1E90FF]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1E90FF]/30 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-[#1E90FF]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">PowerUp Biocide Treatment</h3>
                      <p className="text-white/70 text-sm">
                        Long-lasting biocide application that prevents moss and algae regrowth, keeping your roof
                        cleaner for longer and reducing future maintenance needs.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Before/After Gallery */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Detailed Progress</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    before: "/images/before5.jpeg",
                    caption: "Before - Heavy moss coverage",
                  },
                  {
                    before: "/images/before6.jpeg",
                    caption: "Before - Yellow lichen and moss detail",
                  },
                  {
                    before: "/images/before3.jpeg",
                    caption: "Before - Gutter and roof edge detail",
                  },
                  {
                    before: "/images/before4.jpeg",
                    caption: "Before - Treatment in progress",
                  },
                  {
                    before: "/images/before2.jpeg",
                    caption: "Before - Close-up of moss and organic growth",
                  },
                ].map((image, index) => (
                  <div key={index} className="glass-border rounded-xl overflow-hidden">
                    <div className="relative aspect-video">
                      <Image
                        src={image.before || "/placeholder.svg"}
                        alt={image.caption}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-white/70 text-sm">{image.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="glass-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Project Specifications</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Surface & Treatment</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#1E90FF] flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">Surface: Clay roof tiles</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#1E90FF] flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">Condition: Heavy moss, lichen, and algae coverage</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#1E90FF] flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">
                          Method: Professional hand removal and specialist cleaning
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#1E90FF] flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">Protection: PowerUp biocide treatment applied</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Results & Benefits</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#1E90FF] flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">Complete removal of organic growth</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#1E90FF] flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">Enhanced property appearance and kerb appeal</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#1E90FF] flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">Extended roof lifespan and protection</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#1E90FF] flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">Long-lasting biocide treatment prevents regrowth</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Need Professional Roof Cleaning?</h2>
              <p className="text-xl text-white/90 mb-8">
                Get a free assessment for your property's roof cleaning and biocide treatment needs
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
