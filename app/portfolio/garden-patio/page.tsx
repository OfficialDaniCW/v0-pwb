import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, ArrowLeft } from "lucide-react"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import Link from "next/link"

export const metadata = {
  title: "Garden Patio Cleaning | PowerWash Bros Portfolio",
  description:
    "See the transformation of a garden patio in Dorset. We removed years of grime and algae to reveal the beautiful natural stone underneath.",
}

export default function GardenPatioProject() {
  const project = {
    title: "Garden Patio Restoration",
    service: "Patio Cleaning",
    serviceLink: "/services/patio-decking",
    location: "Dorset",
    date: "February 2024",
    description:
      "This garden patio had accumulated significant organic growth and grime over time, obscuring the natural beauty of the paving stones. Our team used our specialised power washing techniques to gently but effectively remove the buildup. The result is a bright, clean, and safe outdoor space that looks brand new.",
    details: [
      "Surface: Paving stones",
      "Treatment: Professional pressure washing",
      "Result: Removal of black spots, algae, and general grime",
      "Protection: Surface left clean and safe for use",
    ],
    beforeImage: "/images/portfolio/garden-patio-before.jpg",
    afterImage: "/images/portfolio/garden-patio-after.jpg",
  }

  return (
    <main className="min-h-[100dvh] text-white">
      <SiteHeader />

      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/our-work"
              className="inline-flex items-center text-[#1E90FF] hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Our Work
            </Link>

            <div className="glass-border rounded-2xl p-8 md:p-12">
              {/* Project Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h1>
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
                <p className="text-center text-sm text-white/60 mt-4">← Drag the slider to see the transformation →</p>
              </div>

              {/* Project Description */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Project Overview</h3>
                  <p className="text-white/80 leading-relaxed mb-6">{project.description}</p>
                  <Link href={project.serviceLink}>
                    <Button className="bg-[#1E90FF] text-white hover:bg-[#1E90FF]/90">Learn About This Service</Button>
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
  )
}
