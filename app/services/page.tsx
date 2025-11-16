import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { ArrowRight, Droplets, Wind, Home, Fence, SparklesIcon, Building2, TreesIcon, Trash2, Sparkle, PaintBucket, Sun, Sprout, Brush, Landmark, Wrench, Store, Users } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: "Our Services | PowerWash Bros | Dorset Property Maintenance",
  description: "Complete property care services across Dorset. From driveway cleaning to heritage building maintenance, we deliver expert biocide-trained care.",
}

export default function ServicesPage() {
  const serviceCategories = [
    {
      category: "Core Cleaning Services",
      services: [
        {
          title: "Pressure Washing",
          description: "High-pressure cleaning for driveways, patios, and hard surfaces across Swanage and Purbeck",
          href: "/services/pressure-washing",
          icon: Droplets,
        },
        {
          title: "Soft Washing",
          description: "Gentle, effective cleaning for delicate surfaces like render, painted walls, and heritage properties",
          href: "/services/softwash",
          icon: Wind,
        },
        {
          title: "Window Cleaning",
          description: "Crystal clear interior and exterior window cleaning for residential and commercial properties",
          href: "/services/window-cleaning",
          icon: SparklesIcon,
        },
        {
          title: "Glass & Mirror Cleaning",
          description: "Professional commercial glass cleaning including shop fronts and office buildings",
          href: "/services/glass-cleaning",
          icon: Sparkle,
        },
      ]
    },
    {
      category: "Roof & Gutter Services",
      services: [
        {
          title: "Roof Cleaning",
          description: "Expert moss removal and biocide treatment to protect your roof and extend its lifespan",
          href: "/services/roof-cleaning",
          icon: Home,
        },
        {
          title: "Gutter Cleaning",
          description: "Prevent water damage with professional gutter clearing and downpipe maintenance",
          href: "/services/gutter-cleaning",
          icon: Home,
        },
        {
          title: "Soffit & Fascia Cleaning",
          description: "Protect and clean eaves and rooflines to prevent water damage and maintain kerb appeal",
          href: "/services/soffit-cleaning",
          icon: Home,
        },
      ]
    },
    {
      category: "Walls & Render",
      services: [
        {
          title: "Render Cleaning",
          description: "Restore rendered walls with gentle soft washing techniques for Dorset properties",
          href: "/services/render-cleaning",
          icon: PaintBucket,
        },
        {
          title: "Exterior Walls",
          description: "Complete wall cleaning and restoration for all types of exterior cladding",
          href: "/services/exterior-walls",
          icon: Building2,
        },
      ]
    },
    {
      category: "Driveways & Outdoor Surfaces",
      services: [
        {
          title: "Driveway Cleaning",
          description: "Transform tired driveways back to pristine condition with biocide treatments",
          href: "/services/driveway-cleaning",
          icon: ArrowRight,
        },
        {
          title: "Patio & Decking",
          description: "Make outdoor spaces safe, beautiful, and inviting with professional cleaning",
          href: "/services/patio-decking",
          icon: Fence,
        },
      ]
    },
    {
      category: "Specialist Services",
      services: [
        {
          title: "Solar Panel Cleaning",
          description: "Maximise efficiency with regular professional solar panel cleaning across Purbeck",
          href: "/services/solar-panel-cleaning",
          icon: Sun,
        },
        {
          title: "De-Mossing Services",
          description: "Remove moss from all exterior surfaces including roofs, driveways, and paths",
          href: "/services/demossing",
          icon: Sprout,
        },
        {
          title: "Graffiti Removal",
          description: "Professional graffiti cleaning services for commercial and residential properties",
          href: "/services/graffiti-removal",
          icon: Brush,
        },
        {
          title: "Heritage Building Cleaning",
          description: "Specialist care for listed and historic Purbeck stone properties with heritage compliance",
          href: "/services/heritage-buildings",
          icon: Landmark,
        },
      ]
    },
    {
      category: "Property Maintenance",
      services: [
        {
          title: "External Property Maintenance",
          description: "Complete external maintenance packages for residential and commercial properties",
          href: "/services/external-property-maintenance",
          icon: Wrench,
        },
        {
          title: "Commercial Services",
          description: "Keep your business looking professional year-round with scheduled maintenance",
          href: "/services/commercial",
          icon: Store,
        },
        {
          title: "Residential Services",
          description: "Complete home exterior care for properties across Swanage, Purbeck and Dorset",
          href: "/services/residential",
          icon: Users,
        },
      ]
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
                Our Services
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Complete property care across Swanage, Purbeck and Dorset, delivered by biocide-trained 
                specialists who understand your property's unique needs
              </p>
            </div>
          </div>
        </section>

        {/* Services by Category */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-16">
              {serviceCategories.map((category) => (
                <div key={category.category}>
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    {category.category}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.services.map((service) => {
                      const IconComponent = service.icon
                      return (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="group glass-border rounded-xl p-6 hover:border-[#1E90FF] transition-all duration-300"
                        >
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-4">
                            <IconComponent className="h-7 w-7 text-[#1E90FF]" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#1E90FF] transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-white/70 mb-4 leading-relaxed text-sm">
                            {service.description}
                          </p>
                          <div className="flex items-center text-[#1E90FF] font-medium group-hover:gap-2 transition-all">
                            <span className="text-sm">Learn More</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Not Sure Which Service You Need?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Chat with us on WhatsApp and we'll help you find the right solution for your Dorset property
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/447418610731"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white text-[#1E90FF] font-bold rounded-lg px-8 py-4 text-lg
                             hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Chat on WhatsApp
                </a>
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center border-2 border-white bg-transparent text-white font-bold rounded-lg px-8 py-4 text-lg
                             hover:bg-white hover:text-[#1E90FF] transition-all"
                >
                  Request Free Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
