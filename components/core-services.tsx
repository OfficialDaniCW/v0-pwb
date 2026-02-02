import { ArrowRight, Car, Home, Building2, Trees, Store, Landmark } from 'lucide-react'
import Link from 'next/link'

export function CoreServices() {
  const services = [
    {
      title: "Driveway Restoration",
      description: "Transform tired driveways back to pristine condition",
      href: "/services/driveway-cleaning",
      icon: Car
    },
    {
      title: "Roof & Gutter Care",
      description: "Prevent water damage with expert moss removal and gutter cleaning",
      href: "/services/roof-cleaning",
      icon: Home
    },
    {
      title: "Exterior Walls & Render",
      description: "Restore your property's facade using soft wash techniques",
      href: "/services/exterior-walls",
      icon: Building2
    },
    {
      title: "Patios & Decking",
      description: "Make outdoor spaces safe, beautiful, and inviting",
      href: "/services/patio-decking",
      icon: Trees
    },
    {
      title: "Commercial Property",
      description: "Keep your business looking professional year-round",
      href: "/services/commercial",
      icon: Store
    },
    {
      title: "Heritage Buildings",
      description: "Specialist care for listed and historic properties",
      href: "/services/heritage-buildings",
      icon: Landmark
    }
  ]

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Complete Property Care Across Purbeck & Dorset
            </h2>
            <p className="text-xl text-muted-foreground">
              Expert exterior cleaning backed by biocide training and PASMA certification
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group glass-border rounded-xl p-6 hover:border-accent transition-all duration-300"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 mb-4">
                    <IconComponent className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center text-accent font-medium group-hover:gap-2 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-accent font-semibold text-lg hover:gap-3 transition-all"
            >
              <span>View All Services</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
