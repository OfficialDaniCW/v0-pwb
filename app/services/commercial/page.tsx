import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Building2, Shield, FileText, Clock, AlertTriangle, Camera } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: "Commercial Property Cleaning | PowerWash Bros | Swanage, Purbeck",
  description: "Professional commercial property cleaning with RAMS provided, health & safety focused, working around your business across Purbeck.",
}

export default function CommercialServicesPage() {
  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        
        {/* Hero */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-6 mx-auto">
                <Building2 className="h-10 w-10 text-[#1E90FF]" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Commercial Property Cleaning
              </h1>
              <p className="text-xl text-white/80 mb-4">
                Your Business Matters to Us
              </p>
              <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
                Professional, health & safety focused property cleaning across Purbeck with RAMS provided, detailed reporting, and flexible scheduling to work around your business
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#00C853] text-white font-semibold rounded-lg px-8 py-6
                             hover:bg-[#00A843] transition-all"
                >
                  <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                    Discuss Your Requirements
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#1E90FF] bg-transparent text-[#1E90FF] rounded-lg px-8 py-6
                             hover:bg-[#1E90FF] hover:text-white transition-all"
                >
                  <a href="/quote">Request Commercial Quote</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Businesses Choose PowerWash Bros</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="glass-border rounded-xl p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-4">
                    <FileText className="h-8 w-8 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">RAMS Provided</h3>
                  <p className="text-white/70">
                    Risk Assessment and Method Statements (RAMS) supplied for all commercial work, ensuring compliance with your H&S requirements.
                  </p>
                </div>

                <div className="glass-border rounded-xl p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-4">
                    <Shield className="h-8 w-8 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Health & Safety Focused</h3>
                  <p className="text-white/70">
                    PASMA certified for working at height, fully insured, and trained in safe biocide handling. Your site safety is our priority.
                  </p>
                </div>

                <div className="glass-border rounded-xl p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-4">
                    <Clock className="h-8 w-8 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Work Around Your Business</h3>
                  <p className="text-white/70">
                    Flexible scheduling including evenings, weekends, and out-of-hours to minimize disruption to your operations.
                  </p>
                </div>

                <div className="glass-border rounded-xl p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-4">
                    <Camera className="h-8 w-8 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Detailed Reports & Images</h3>
                  <p className="text-white/70">
                    Comprehensive before/after documentation and detailed reports where requested for your records and compliance.
                  </p>
                </div>

                <div className="glass-border rounded-xl p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-4">
                    <AlertTriangle className="h-8 w-8 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Result Driven</h3>
                  <p className="text-white/70">
                    We understand commercial properties need to look professional. We deliver results that reflect well on your business.
                  </p>
                </div>

                <div className="glass-border rounded-xl p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-4">
                    <Building2 className="h-8 w-8 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Your Business Matters</h3>
                  <p className="text-white/70">
                    We treat every commercial property with the care and professionalism it deserves. Your reputation is our priority.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Commercial Property Services</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                {[
                  {
                    title: "Retail & Hospitality",
                    description: "Storefronts, car parks, outdoor seating areas - keep your business looking inviting and professional",
                    includes: ["Shop fronts & entrances", "Car park cleaning", "Outdoor seating areas", "Signage cleaning"]
                  },
                  {
                    title: "Office Buildings",
                    description: "Exterior cleaning, car parks, and communal areas to maintain a professional appearance",
                    includes: ["Building facades", "Car parks & access roads", "Communal walkways", "Roof & gutter maintenance"]
                  },
                  {
                    title: "Industrial & Warehouses",
                    description: "Large-scale cleaning for loading bays, yards, and exterior surfaces",
                    includes: ["Loading bays", "Yard areas", "External walls", "Health & safety compliance"]
                  },
                  {
                    title: "Leisure & Tourism",
                    description: "Hotels, B&Bs, caravan parks - first impressions matter in hospitality",
                    includes: ["Hotel exteriors", "Guest pathways", "Car parks", "Pool surrounds"]
                  },
                  {
                    title: "Healthcare & Education",
                    description: "Schools, care homes, medical facilities requiring sensitive cleaning approaches",
                    includes: ["Entrance areas", "Play areas", "Car parks", "Sensitive site protocols"]
                  },
                  {
                    title: "Property Management",
                    description: "Multiple-site contracts for property managers and letting agents",
                    includes: ["Multi-property contracts", "Regular maintenance schedules", "Tenant changeover cleans", "Detailed reporting"]
                  }
                ].map((service) => (
                  <div key={service.title} className="glass-border-enhanced rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-white/80 mb-4">{service.description}</p>
                    <div className="space-y-2">
                      {service.includes.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
                          <span className="text-white/70 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">What's Included in Commercial Services</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Full RAMS documentation",
                  "£5M public liability insurance",
                  "PASMA working at height certification",
                  "Biocide training certificates",
                  "Flexible scheduling (including out-of-hours)",
                  "Detailed before/after reports",
                  "Professional imagery where requested",
                  "Regular contract options",
                  "Emergency response services",
                  "Waste disposal compliance",
                  "Health & safety briefings",
                  "Account management for multi-site contracts"
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

        {/* Contract Options */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Contract Options</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-border rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-3">One-Off Deep Clean</h3>
                  <p className="text-white/70 text-sm">
                    Perfect for property sales, tenant changeovers, or special events
                  </p>
                </div>
                <div className="glass-border rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-3">Regular Maintenance</h3>
                  <p className="text-white/70 text-sm">
                    Quarterly, bi-annual, or annual contracts to keep your property pristine year-round
                  </p>
                </div>
                <div className="glass-border rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-3">Multi-Site Contracts</h3>
                  <p className="text-white/70 text-sm">
                    Bespoke contracts for property managers with multiple locations across Purbeck
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Discuss Your Commercial Requirements?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Get in touch for a site visit and detailed commercial quote
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-8 text-xl
                             hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                    Discuss Requirements
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-transparent text-white rounded-lg px-12 py-8 text-xl
                             hover:bg-white/10 transition-all"
                >
                  <a href="/quote">Request Quote</a>
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
