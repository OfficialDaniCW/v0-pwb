import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { ArrowLeft, MapPin, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Commercial Patio Clean | Santos&Co | PowerWash Bros",
  description:
    "Professional commercial patio cleaning for Santos&Co restaurant in Dorset. See how we restored this premium dining space to pristine condition for Evoca Group's new venue.",
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
              <h1 className="text-4xl md:text-5xl font-bold text-white">Premium Restaurant Patio Clean - Santos&Co</h1>
              <span className="bg-[#1E90FF] text-white text-sm px-4 py-2 rounded-full font-semibold">Commercial</span>
            </div>

            <div className="flex flex-wrap gap-6 text-white/70 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Santos&Co Restaurant, Dorset</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>December 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>2 days</span>
              </div>
            </div>

            <p className="text-xl text-white/80 leading-relaxed">
              Premium outdoor dining patio for Santos&Co restaurant transformed to perfection. Removed accumulated grime, weather staining, and year-round wear to restore the immaculate appearance required for high-end dining establishments. Completed as part of our partnership with Evoca Group.
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
                    Santos&Co's premium outdoor dining patio had accumulated weather staining, algae growth, and general wear from regular customer use. As a high-end restaurant venue operated by Evoca Group, first impressions are crucial - the outdoor space needed to look immaculate for discerning diners.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    The project required precision cleaning without disrupting restaurant operations, protecting plant life and furniture, and achieving restaurant-grade cleanliness standards for a venue that values excellence.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Our Solution</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-[#00C853] mr-3 text-xl">✓</span>
                      <span className="text-white/80">
                        Commercial soft-wash cleaning to protect dining furniture and decor
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00C853] mr-3 text-xl">✓</span>
                      <span className="text-white/80">Specialist algae and moss removal treatments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00C853] mr-3 text-xl">✓</span>
                      <span className="text-white/80">Careful work scheduling to avoid peak service times</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00C853] mr-3 text-xl">✓</span>
                      <span className="text-white/80">Complete protection of plants, furniture, and outdoor decor</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00C853] mr-3 text-xl">✓</span>
                      <span className="text-white/80">Restaurant-grade professional finish</span>
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
                      <li>• Type: Restaurant patio paving</li>
                      <li>• Area: 60m² dining space</li>
                      <li>• Condition: Weather-stained, algae growth</li>
                      <li>• Use: High-end restaurant dining</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Treatment Applied</h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li>• Soft-wash cleaning system</li>
                      <li>• Algae & moss treatment</li>
                      <li>• Furniture & decor protection</li>
                      <li>• Plant-safe cleaning solutions</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Project Timeline</h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li>• Duration: 2 days</li>
                      <li>• Scheduled off-peak hours</li>
                      <li>• Disruption: None to service</li>
                      <li>• Result: Premium finish</li>
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
  )
}
