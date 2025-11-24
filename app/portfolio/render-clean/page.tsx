import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { MapPin, Calendar, Tag, User } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Render Clean | PowerWash Bros | Softwash Render Cleaning in Dorset",
  description:
    "See how PowerWash Bros transformed a dirty render facade using specialist softwash techniques and the Spinaclean Chemical Pump Box & Lance.",
}

export default function RenderCleanPage() {
  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />

        {/* Hero */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Front of House Render Cleaning</h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Specialist softwash render cleaning in Dorset using the Spinaclean Chemical Pump Box and Lance
              </p>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="glass-border rounded-2xl p-8 md:p-12">
                {/* Project Header */}
                <div className="mb-8">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Render Clean</h2>
                    <span className="text-sm bg-[#1E90FF] text-white px-4 py-2 rounded-full">Softwash</span>
                    <span className="text-sm bg-[#1E90FF]/70 text-white px-4 py-2 rounded-full">Window Cleaning</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-white/70 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>F Calvo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>12 March 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Dorset</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      <span>Value: £285</span>
                    </div>
                  </div>
                </div>

                {/* Before/After Slider */}
                <div className="mb-8">
                  <BeforeAfterSlider
                    beforeImage="/images/portfolio/render-clean-before.jpg"
                    afterImage="/images/portfolio/render-clean-after.jpg"
                    alt="Render Clean Transformation"
                  />
                  <p className="text-center text-sm text-white/60 mt-4">
                    ← Drag the slider to see the transformation →
                  </p>
                </div>

                {/* Project Description */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Project Overview</h3>
                    <p className="text-white/80 leading-relaxed">
                      At <strong>PowerWash Bros</strong>, we recently transformed the exterior of a home in Dorset with
                      our specialist <strong>softwash render cleaning service</strong>. Using industry-leading
                      equipment, including the{" "}
                      <a
                        href="https://www.spinaclean.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1E90FF] hover:underline"
                      >
                        Spinaclean Chemical Pump Box and Lance
                      </a>
                      , we safely and effectively removed years of dirt, algae, and staining—restoring the render to its
                      original, fresh appearance.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-3">The Challenge</h4>
                      <p className="text-white/80 leading-relaxed">
                        The property's front render had accumulated unsightly staining from dirt, algae, and
                        environmental build-up. Not only did this affect the property's appearance, but it also posed a
                        long-term risk to the integrity of the render.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-3">The Result</h4>
                      <p className="text-white/80 leading-relaxed">
                        The render went from dull and stained to clean, vibrant, and protected—instantly improving the
                        property's curb appeal. Our specialist softwashing approach ensured no damage to the delicate
                        render surface.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">Our Process</h4>
                    <ul className="space-y-3">
                      <li className="text-white/80 leading-relaxed">
                        <strong>1. Specialist Softwashing:</strong> We used the{" "}
                        <a
                          href="https://www.spinaclean.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1E90FF] hover:underline"
                        >
                          Spinaclean Chemical Pump Box and Lance
                        </a>{" "}
                        for a precise, low-pressure application of cleaning solutions. This ensured a deep, effective
                        clean without causing any damage to the render.
                      </li>
                      <li className="text-white/80 leading-relaxed">
                        <strong>2. Biocide Treatment:</strong> A powerful biocide was applied to kill algae and prevent
                        regrowth, ensuring a longer-lasting finish.
                      </li>
                      <li className="text-white/80 leading-relaxed">
                        <strong>3. Final Rinse:</strong> The surface was carefully rinsed, leaving it smooth, fresh, and
                        looking like new.
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#1E90FF]/10 border border-[#1E90FF]/20 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-white mb-3">Why PowerWash Bros?</h4>
                    <ul className="space-y-2">
                      <li className="text-white/80">
                        ✓ <strong>Precision Cleaning:</strong> Advanced equipment like the Spinaclean Pump Box and Lance
                        for render-safe cleaning
                      </li>
                      <li className="text-white/80">
                        ✓ <strong>Long-Lasting Results:</strong> Biocide treatment ensures surfaces stay cleaner for
                        longer
                      </li>
                      <li className="text-white/80">
                        ✓ <strong>Dorset Specialists:</strong> Experts in external cleaning for local homes and
                        businesses
                      </li>
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href="/services/render-cleaning">
                    <Button className="bg-[#1E90FF] text-white hover:bg-[#1E90FF]/90 w-full sm:w-auto">
                      Learn About Render Cleaning
                    </Button>
                  </Link>
                  <Link href="/quote">
                    <Button
                      variant="outline"
                      className="border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF] hover:text-white w-full sm:w-auto bg-transparent"
                    >
                      Get a Free Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Related Services</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { name: "Driveway Cleaning", link: "/services/driveway-cleaning" },
                  { name: "Patio Cleaning", link: "/services/patio-decking" },
                  { name: "Roof Cleaning", link: "/services/roof-cleaning" },
                  { name: "Gutter Cleaning", link: "/services/gutter-cleaning" },
                  { name: "Window Cleaning", link: "/services/window-cleaning" },
                  { name: "Solar Panel Cleaning", link: "/services/solar-panel-cleaning" },
                ].map((service) => (
                  <Link
                    key={service.name}
                    href={service.link}
                    className="glass-border rounded-lg p-4 text-center hover:bg-[#1E90FF]/10 transition-colors"
                  >
                    <span className="text-white font-semibold">{service.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Is Your Render Looking Tired?</h2>
              <p className="text-xl text-white/90 mb-8">
                Get a free quote and let PowerWash Bros restore your home's exterior
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
