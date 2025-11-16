import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Home, Sparkles, Shield, Calendar } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: "Residential Property Cleaning | PowerWash Bros | Swanage, Purbeck",
  description: "Professional residential property cleaning focused on kerb appeal and maintenance packages across Purbeck. Transform your home's exterior.",
}

export default function ResidentialServicesPage() {
  const maintenancePackages = [
    {
      name: "Kerb Appeal Boost",
      price: "From £299",
      frequency: "One-time",
      includes: ["Driveway deep clean", "Front path cleaning", "Porch & entrance area", "Before/after photos"],
      ideal: "Perfect for property sales or special occasions"
    },
    {
      name: "Seasonal Refresh",
      price: "From £450",
      frequency: "Twice yearly",
      includes: ["Full driveway clean", "Patio/decking treatment", "Gutter clearance", "Biocide protection"],
      ideal: "Spring & autumn maintenance to keep properties pristine"
    },
    {
      name: "Complete Care",
      price: "From £750",
      frequency: "Quarterly",
      includes: ["All exterior surfaces", "Roof moss treatment", "Gutters & downpipes", "Maintenance advice"],
      ideal: "Year-round protection for Purbeck's coastal climate"
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
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-6 mx-auto">
                <Home className="h-10 w-10 text-[#1E90FF]" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Residential Property Cleaning
              </h1>
              <p className="text-xl text-white/80 mb-4">
                Focused on Kerb Appeal & Long-Term Maintenance
              </p>
              <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
                Serving homeowners across Swanage, Purbeck, and surrounding areas with property-centered care that enhances and protects your most valuable asset
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#00C853] text-white font-semibold rounded-lg px-8 py-6
                             hover:bg-[#00A843] transition-all"
                >
                  <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#1E90FF] bg-transparent text-[#1E90FF] rounded-lg px-8 py-6
                             hover:bg-[#1E90FF] hover:text-white transition-all"
                >
                  <a href="/pricing">Get Instant Quote</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Kerb Appeal Matters */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Kerb Appeal Matters</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="glass-border rounded-xl p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-4 mx-auto">
                    <Home className="h-8 w-8 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Property Value</h3>
                  <p className="text-white/70">
                    A clean, well-maintained exterior can add thousands to your property's value and make it stand out to potential buyers.
                  </p>
                </div>
                <div className="glass-border rounded-xl p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-4 mx-auto">
                    <Shield className="h-8 w-8 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Protection</h3>
                  <p className="text-white/70">
                    Regular maintenance prevents costly damage from moss, algae, and organic growth that eats away at surfaces.
                  </p>
                </div>
                <div className="glass-border rounded-xl p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-4 mx-auto">
                    <Sparkles className="h-8 w-8 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Pride of Ownership</h3>
                  <p className="text-white/70">
                    There's something special about pulling up to a pristine driveway and beautifully maintained exterior.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance Packages */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Maintenance Packages</h2>
                <p className="text-xl text-white/70">Tailored for Purbeck's coastal climate</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {maintenancePackages.map((pkg) => (
                  <div key={pkg.name} className="glass-border-enhanced rounded-2xl p-8 flex flex-col">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                      <div className="text-3xl font-bold text-[#1E90FF] mb-1">{pkg.price}</div>
                      <div className="text-sm text-white/60 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {pkg.frequency}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 flex-grow">
                      {pkg.includes.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
                          <span className="text-white/90 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <p className="text-white/70 text-sm italic">{pkg.ideal}</p>
                    </div>

                    <Button
                      asChild
                      className="w-full mt-6 bg-[#1E90FF] text-white hover:bg-[#1E90FF]/90"
                    >
                      <a href="/pricing">Get Quote</a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">What We Do For Residential Properties</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Driveways & Paths",
                    description: "Block paving, concrete, tarmac - restored to original condition with biocide protection"
                  },
                  {
                    title: "Patios & Decking",
                    description: "Safe, slip-free outdoor spaces perfect for entertaining and family time"
                  },
                  {
                    title: "Roofs & Gutters",
                    description: "Moss removal and gutter clearing to prevent water damage and extend roof life"
                  },
                  {
                    title: "Exterior Walls",
                    description: "Render, brick, and stone cleaning using soft wash techniques for lasting results"
                  },
                  {
                    title: "Conservatories",
                    description: "Glass and frame cleaning to bring back that showroom shine"
                  },
                  {
                    title: "Garden Features",
                    description: "Walls, steps, ornamental features - complete property transformation"
                  }
                ].map((service) => (
                  <div key={service.title} className="glass-border rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-white/70 text-sm">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer Homeowners</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Free property assessments",
                  "Transparent, fixed pricing",
                  "Flexible scheduling (including weekends)",
                  "Fully insured and PASMA certified",
                  "Biocide-trained team",
                  "Before/after documentation",
                  "Maintenance advice and tips",
                  "Satisfaction guarantee"
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-[#00C853] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Transform Your Home's Exterior
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Get your free quote and see how affordable professional property care can be
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-8 text-xl
                             hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <a href="/pricing">Get Instant Quote</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-transparent text-white rounded-lg px-12 py-8 text-xl
                             hover:bg-white/10 transition-all"
                >
                  <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
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
