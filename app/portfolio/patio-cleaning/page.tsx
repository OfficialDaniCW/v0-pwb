import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { Instagram, MapPin, Calendar } from "lucide-react"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import Link from "next/link"

export const metadata = {
  title: "Patio Entrance Cleaning | PowerWash Bros Portfolio",
  description:
    "See the dramatic transformation of a moss-covered patio entrance in Dorset. Professional cleaning by biocide-trained specialists.",
}

export default function PatioCleaningPage() {
  const project = {
    title: "Patio Entrance Restoration",
    service: "Patio & Decking Cleaning",
    serviceLink: "/services/patio-decking",
    location: "Dorset",
    date: "February 2025",
    description:
      "Complete transformation of a heavily moss and algae-covered patio entrance. The gray paving slabs were dangerously slippery and stained with years of organic growth. Our team used specialized pressure washing techniques combined with biocide treatment to safely remove all contaminants while protecting the surrounding plants and stonework. The result is a pristine, safe surface that enhances the property's entrance.",
    details: [
      "Surface: Gray concrete paving slabs",
      "Size: 45m² entrance patio",
      "Treatment: Pressure washing with moss removal and biocide application",
      "Challenges: Heavy moss growth, algae staining, plant pot proximity",
      "Duration: Half day",
      "Result: Complete restoration with safe, non-slip surface and enhanced curb appeal",
    ],
    beforeImage: "/images/portfolio/patio-cleaning-before.jpg",
    afterImage: "/images/portfolio/patio-cleaning-after.jpg",
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />

        {/* Hero */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{project.title}</h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">From dangerously slippery to pristine and safe</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="glass-border rounded-2xl p-8 md:p-12">
                {/* Project Header */}
                <div className="mb-8">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h2>
                    <Link
                      href={project.serviceLink}
                      className="text-sm bg-[#1E90FF] text-white px-4 py-2 rounded-full hover:bg-[#1E90FF]/90 transition-colors"
                    >
                      {project.service}
                    </Link>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-white/70">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{project.date}</span>
                    </div>
                  </div>
                </div>

                {/* Before/After Slider */}
                <div className="mb-8">
                  <BeforeAfterSlider
                    beforeImage={project.beforeImage}
                    afterImage={project.afterImage}
                    alt={project.title}
                  />
                  <p className="text-center text-sm text-white/60 mt-4">
                    ← Drag the slider to see the transformation →
                  </p>
                </div>

                {/* Project Description */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Project Overview</h3>
                    <p className="text-white/80 leading-relaxed mb-6">{project.description}</p>
                    <Link href={project.serviceLink}>
                      <Button className="bg-[#1E90FF] text-white hover:bg-[#1E90FF]/90">
                        Learn About This Service
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
                    <ul className="space-y-3">
                      {project.details.map((detail, index) => (
                        <li key={index} className="text-white/80 text-sm leading-relaxed">
                          • {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social CTA */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Instagram className="h-16 w-16 text-[#1E90FF] mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Follow Our Transformations</h2>
              <p className="text-lg text-white/70 mb-8">See our latest projects and daily updates on Instagram</p>
              <Button
                asChild
                size="lg"
                className="bg-[#1E90FF] text-white font-semibold rounded-lg px-8
                           hover:bg-[#1E90FF]/90 transition-all"
              >
                <a href="https://www.instagram.com/powerwashbrosltd/" target="_blank" rel="noopener noreferrer">
                  @powerwashbrosltd
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Ready for Your Own Transformation?</h2>
              <p className="text-xl text-white/90 mb-8">Get your free property assessment today</p>
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
