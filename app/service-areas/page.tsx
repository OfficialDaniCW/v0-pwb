import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { InteractiveServiceMap } from "@/components/interactive-service-map"
import { Button } from "@/components/ui/button"
import { MapPin, CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: "Service Areas | PowerWash Bros | Covering Dorset",
  description: "We serve properties across Dorset including Bournemouth, Poole, Swanage, Wimborne, Christchurch, Wareham, and Ferndown.",
}

export default function ServiceAreasPage() {
  const areas = [
    {
      name: "Bournemouth",
      postcode: "BH1-BH11",
      features: ["Residential properties", "Commercial buildings", "Coastal properties"]
    },
    {
      name: "Poole",
      postcode: "BH12-BH17",
      features: ["Harbour properties", "Residential areas", "Business districts"]
    },
    {
      name: "Swanage",
      postcode: "BH19",
      features: ["Coastal maintenance", "Heritage properties", "Residential care"]
    },
    {
      name: "Wimborne",
      postcode: "BH21",
      features: ["Historic buildings", "Residential properties", "Commercial areas"]
    },
    {
      name: "Christchurch",
      postcode: "BH23",
      features: ["Coastal properties", "Residential areas", "Heritage buildings"]
    },
    {
      name: "Wareham",
      postcode: "BH20",
      features: ["Listed buildings", "Rural properties", "Historic town centre"]
    },
    {
      name: "Ferndown",
      postcode: "BH22",
      features: ["Residential properties", "Commercial areas", "Modern developments"]
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
              <MapPin className="h-16 w-16 text-[#1E90FF] mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Serving Properties Across Dorset
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Local experts providing property-centred care throughout the county
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <InteractiveServiceMap />
            </div>
          </div>
        </section>

        {/* Areas Grid */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Coverage Areas</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {areas.map((area) => (
                  <div key={area.name} className="glass-border rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{area.name}</h3>
                    <p className="text-sm text-[#1E90FF] mb-4">{area.postcode}</p>
                    <ul className="space-y-2">
                      {area.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-white/70">
                          <CheckCircle2 className="h-4 w-4 text-[#00C853] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-white/70 mb-4">Plus surrounding areas across Dorset</p>
                <p className="text-sm text-white/60">
                  Not sure if we cover your area? Get in touch and we'll let you know!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Local Matters */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Being Local Matters</h2>
              
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#1E90FF] mb-3">Local Knowledge</div>
                  <p className="text-white/70">
                    We understand Dorset's coastal climate and its impact on properties
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#1E90FF] mb-3">Quick Response</div>
                  <p className="text-white/70">
                    Based locally means faster assessments and flexible scheduling
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#1E90FF] mb-3">Community Focus</div>
                  <p className="text-white/70">
                    We live here too - your property matters to us
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
                Ready to Book Your Property Assessment?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Contact us today to discuss your property needs
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-8 text-xl
                           hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
              >
                <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
