import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { Instagram, MapPin, Calendar } from 'lucide-react'
import { BeforeAfterSlider } from "@/components/before-after-slider"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Our Work | PowerWash Bros | Before & After Transformations",
  description: "See the dramatic transformations we've achieved across Dorset. Real properties, real results from biocide-trained specialists.",
}

export default function OurWorkPage() {
  const featuredProject = {
    title: "The Vicarage",
    service: "Garden Patio Pressure Washing",
    serviceLink: "/services/patio-decking",
    location: "Swanage, Purbeck",
    date: "November 2024",
    description: "Complete garden patio transformation removing years of moss, algae, and organic growth from Purbeck stone paving. This project required a chemical-free approach to protect the surrounding landscape and wildlife. Our team carefully removed debris and used precision pressure washing techniques to ensure the area was safe for visitors whilst achieving stunning results.",
    details: [
      "Surface: Purbeck stone paving",
      "Size: 120m² garden patio",
      "Treatment: Chemical-free pressure washing with careful debris removal",
      "Duration: 1 day",
      "Result: Pristine restoration whilst protecting the surrounding landscape and wildlife"
    ],
    beforeImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Before4-mE5NSwG3prpxBIEqKmfTJ2zBHY8EjI.jpg",
    afterImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/After-gGJkYcmrQIvgC17khw3UZNBI0sPUHn.jpg"
  }

  const additionalImages = [
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vicarage-scaled-bcjYq95TUQSK04RSgJ3ZzYZeaTDXRq.jpg",
      alt: "The Vicarage - Complete property view after cleaning",
      caption: "Beautiful Purbeck stone property restored to its former glory"
    }
  ]

  const otherProjects = [
    {
      title: "Historic Building, Wimborne",
      service: "Roof Cleaning",
      serviceLink: "/services/roof-cleaning",
      location: "Wimborne",
      description: "Gentle moss removal with biocide treatment on listed building"
    },
    {
      title: "Office Building, Poole",
      service: "Commercial Cleaning",
      serviceLink: "/services/commercial",
      location: "Poole",
      description: "Office building exterior and patio restoration"
    },
    {
      title: "Family Home, Bournemouth",
      service: "Patio Cleaning",
      serviceLink: "/services/patio-decking",
      location: "Bournemouth",
      description: "Sandstone patio cleaned and protected"
    },
    {
      title: "Retail Unit, Christchurch",
      service: "Gutter Cleaning",
      serviceLink: "/services/gutter-cleaning",
      location: "Christchurch",
      description: "Blocked gutters cleared preventing water damage"
    },
    {
      title: "Listed Property, Wareham",
      service: "Heritage Care",
      serviceLink: "/services/heritage-buildings",
      location: "Wareham",
      description: "Careful cleaning of Grade II listed property"
    }
  ]

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        
        {/* Hero */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Properties We've Brought Back to Life
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                See what biocide-trained property care looks like across Swanage, Purbeck, and Dorset
              </p>
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
                    <h2 className="text-3xl md:text-4xl font-bold text-white">{featuredProject.title}</h2>
                    <Link 
                      href={featuredProject.serviceLink}
                      className="text-sm bg-[#1E90FF] text-white px-4 py-2 rounded-full hover:bg-[#1E90FF]/90 transition-colors"
                    >
                      {featuredProject.service}
                    </Link>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-white/70">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{featuredProject.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredProject.date}</span>
                    </div>
                  </div>
                </div>

                {/* Before/After Slider */}
                <div className="mb-8">
                  <BeforeAfterSlider
                    beforeImage={featuredProject.beforeImage}
                    afterImage={featuredProject.afterImage}
                    alt={featuredProject.title}
                  />
                  <p className="text-center text-sm text-white/60 mt-4">
                    ← Drag the slider to see the transformation →
                  </p>
                </div>

                {/* Project Description */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Project Overview</h3>
                    <p className="text-white/80 leading-relaxed mb-6">
                      {featuredProject.description}
                    </p>
                    <Link href={featuredProject.serviceLink}>
                      <Button className="bg-[#1E90FF] text-white hover:bg-[#1E90FF]/90">
                        Learn About This Service
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
                    <ul className="space-y-3">
                      {featuredProject.details.map((detail, index) => (
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

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">More from This Project</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {additionalImages.map((image, index) => (
                  <div key={index} className="glass-border rounded-xl overflow-hidden group">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
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

        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">More Transformations</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherProjects.map((project, index) => (
                  <div key={index} className="glass-border rounded-2xl overflow-hidden group">
                    {/* Before/After Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-[#0B1E3F] to-[#1E90FF]/20 flex items-center justify-center relative overflow-hidden">
                      <p className="text-white/60 z-10">Before/After Coming Soon</p>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    {/* Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                          <p className="text-sm text-white/60">{project.location}</p>
                        </div>
                        <Link 
                          href={project.serviceLink}
                          className="text-xs bg-[#1E90FF]/20 text-[#1E90FF] px-3 py-1 rounded-full hover:bg-[#1E90FF] hover:text-white transition-colors"
                        >
                          {project.service}
                        </Link>
                      </div>
                      <p className="text-white/70 text-sm mb-4">{project.description}</p>
                      <Link 
                        href={project.serviceLink}
                        className="text-[#1E90FF] hover:underline text-sm font-semibold"
                      >
                        View This Service →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Social CTA */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Instagram className="h-16 w-16 text-[#1E90FF] mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Follow Our Transformations
              </h2>
              <p className="text-lg text-white/70 mb-8">
                See our latest projects and daily updates on Instagram
              </p>
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
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready for Your Own Transformation?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Get your free property assessment today
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
