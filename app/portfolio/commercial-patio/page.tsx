import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { ArrowLeft, MapPin, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Commercial Patio Clean | PowerWash Bros | Professional Results",
  description:
    "Professional commercial patio cleaning for high-traffic public spaces. See how we restored this train station patio area to pristine condition.",
}

export default function CommercialPatioPage() {
  const beforeAfterPairs = [
    {
      before: "/images/portfolio/commercial-patio-before.jpg",
      after: "/images/portfolio/commercial-patio-after.jpg",
      title: "Commercial Patio Transformation",
    },
  ]

  const galleryImages = [
    {
      url: "/images/portfolio/commercial-patio-after.jpg",
      alt: "Clean commercial patio with glass railings",
      caption: "Professional finish for high-traffic public space",
    },
  ]

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />

        {/* Hero Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <Link
              href="/our-work"
              className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Our Work
            </Link>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white">Commercial Patio Clean</h1>
                <span className="bg-[#1E90FF] text-white text-sm px-4 py-2 rounded-full font-semibold">Commercial</span>
              </div>

              <div className="flex flex-wrap gap-6 text-white/70 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>Public Transport Hub, Dorset</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>November 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>2 days</span>
                </div>
              </div>

              <p className="text-xl text-white/80 leading-relaxed">
                High-traffic commercial patio area at a busy train station completely transformed. Removed years of
                heavy foot traffic staining, grime, and weather damage to restore the professional appearance required
                for public spaces.
              </p>
            </div>
          </div>
        </section>

        {/* Before/After Sliders */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-12">
              {beforeAfterPairs.map((pair, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-bold text-white mb-4 text-center">{pair.title}</h2>
                  <BeforeAfterSlider beforeImage={pair.before} afterImage={pair.after} alt={pair.title} />
                  <p className="text-center text-sm text-white/60 mt-4">
                    ← Drag the slider to see the transformation →
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">The Challenge</h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    This high-traffic commercial patio at a busy train station had accumulated years of heavy staining
                    from foot traffic, weather exposure, and urban pollution. The surface had become unsightly and
                    didn't reflect the professional standards required for a public transport facility.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    The work needed to be completed with minimal disruption to public access, requiring careful planning
                    and efficient execution. Safety was paramount, ensuring the area was safe for pedestrians throughout
                    and after the cleaning process.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Our Solution</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-[#00C853] mr-3 text-xl">✓</span>
                      <span className="text-white/80">
                        Professional pressure washing with commercial-grade equipment
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00C853] mr-3 text-xl">✓</span>
                      <span className="text-white/80">Specialised cleaning solutions for heavy traffic staining</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00C853] mr-3 text-xl">✓</span>
                      <span className="text-white/80">Work scheduled to minimize disruption to public access</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00C853] mr-3 text-xl">✓</span>
                      <span className="text-white/80">Complete safety management including slip prevention</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00C853] mr-3 text-xl">✓</span>
                      <span className="text-white/80">Thorough cleaning of glass panels and metal fixtures</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Project Specifications</h2>
              <div className="glass-border rounded-2xl p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Surface Details</h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li>• Type: Commercial paving</li>
                      <li>• Area: 80m² patio space</li>
                      <li>• Condition: Heavy staining</li>
                      <li>• Traffic: High footfall area</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Treatment Applied</h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li>• Commercial pressure washing</li>
                      <li>• Degreasing treatment</li>
                      <li>• Glass panel cleaning</li>
                      <li>• Metal fixture restoration</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Project Timeline</h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li>• Duration: 2 days</li>
                      <li>• Site protection: Full coverage</li>
                      <li>• Disruption: Minimal</li>
                      <li>• Result: Professional finish</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Commercial Cleaning Services</h2>
              <p className="text-xl text-white/90 mb-8">
                Professional results for businesses and public spaces across Dorset
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#1E90FF] font-bold rounded-lg px-8 py-6
                             hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                    Discuss Your Project
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white bg-transparent text-white rounded-lg px-8 py-6
                             hover:bg-white hover:text-[#1E90FF] transition-all"
                >
                  <Link href="/services/pressure-washing">View Services</Link>
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
