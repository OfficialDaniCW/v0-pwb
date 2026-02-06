import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { CheckCircle, ChevronRight } from 'lucide-react'
import Script from 'next/script'
import { createServiceBreadcrumbs } from "@/lib/schema-utils"

export const metadata = {
  title: 'External Property Maintenance Swanage | Building Cleaning Purbeck Dorset',
  description: 'Complete external property maintenance and building cleaning services in Swanage, Purbeck, and Dorset. Protect and maintain your property with PowerWash Bros.',
  openGraph: {
    title: 'External Property Maintenance Swanage | Building Cleaning Purbeck',
    description: 'Complete external property maintenance and building cleaning services in Swanage, Purbeck, and Dorset. Protect and maintain your property.',
    images: ['/property-maintenance-service.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'External Property Maintenance Swanage | Building Cleaning Purbeck',
    description: 'Complete external property maintenance and building cleaning services in Swanage, Purbeck, and Dorset.',
  },
}

export default function ExternalPropertyMaintenancePage() {
  const breadcrumbSchema = createServiceBreadcrumbs("External Property Maintenance", "external-property-maintenance")
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'External Property Maintenance Services',
    provider: {
      '@type': 'LocalBusiness',
      name: 'PowerWash Bros',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Swanage',
        addressRegion: 'Dorset',
        postalCode: 'BH19',
        addressCountry: 'GB',
      },
    },
    areaServed: [
      { '@type': 'City', name: 'Swanage' },
      { '@type': 'Place', name: 'Purbeck' },
      { '@type': 'Place', name: 'Dorset' },
    ],
    description: 'Comprehensive external property maintenance and building cleaning services in Swanage, Purbeck, and Dorset.',
  }

  return (
    <>
      <Script id="breadcrumb-schema-external" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <div className="min-h-screen bg-[#0B1E3F]">
        <section className="relative py-20 bg-[#0B1E3F]">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm mb-8 justify-center" aria-label="Breadcrumb">
              <a href="/" className="text-white/60 hover:text-white transition-colors">
                Home
              </a>
              <ChevronRight className="h-4 w-4 text-white/40" />
              <a href="/services" className="text-white/60 hover:text-white transition-colors">
                Services
              </a>
              <ChevronRight className="h-4 w-4 text-white/40" />
              <span className="text-white font-medium">External Property Maintenance</span>
            </nav>

            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
                Complete External Property Maintenance in Swanage & Purbeck
              </h1>
              <p className="text-xl text-white/80 mb-8 text-pretty">
                Comprehensive building cleaning and maintenance services to protect your Dorset property investment
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/quote"
                  className="bg-[#1E90FF] hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
                >
                  Get Free Quote
                </a>
                <a
                  href="https://wa.me/447885344385"
                  className="bg-[#00C853] hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#0A1A35]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                All-Inclusive Property Maintenance
              </h2>
              <p className="text-white/70 text-center mb-12 text-lg">
                One company for all your external property cleaning and maintenance needs across Swanage, Purbeck, and Dorset
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[#0B1E3F] border border-[#1E90FF]/30 p-6 rounded-lg hover:border-[#1E90FF] transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-3">Roof Maintenance</h3>
                  <ul className="space-y-1 text-sm text-white/70">
                    <li>• Moss and lichen removal</li>
                    <li>• Soft washing treatment</li>
                    <li>• Gutter clearing</li>
                    <li>• Ridge tile inspection</li>
                  </ul>
                </div>
                <div className="bg-[#0B1E3F] border border-[#1E90FF]/30 p-6 rounded-lg hover:border-[#1E90FF] transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-3">Wall Cleaning</h3>
                  <ul className="space-y-1 text-sm text-white/70">
                    <li>• Render soft washing</li>
                    <li>• Brick pressure washing</li>
                    <li>• Stone cleaning</li>
                    <li>• Algae removal</li>
                  </ul>
                </div>
                <div className="bg-[#0B1E3F] border border-[#1E90FF]/30 p-6 rounded-lg hover:border-[#1E90FF] transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-3">Window Services</h3>
                  <ul className="space-y-1 text-sm text-white/70">
                    <li>• Interior and exterior cleaning</li>
                    <li>• Frame and sill washing</li>
                    <li>• Glass restoration</li>
                    <li>• Regular maintenance</li>
                  </ul>
                </div>
                <div className="bg-[#0B1E3F] border border-[#1E90FF]/30 p-6 rounded-lg hover:border-[#1E90FF] transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-3">Driveway & Patio</h3>
                  <ul className="space-y-1 text-sm text-white/70">
                    <li>• Pressure washing</li>
                    <li>• De-mossing treatment</li>
                    <li>• Weed removal</li>
                    <li>• Sealing services</li>
                  </ul>
                </div>
                <div className="bg-[#0B1E3F] border border-[#1E90FF]/30 p-6 rounded-lg hover:border-[#1E90FF] transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-3">Conservatory Care</h3>
                  <ul className="space-y-1 text-sm text-white/70">
                    <li>• Roof panel cleaning</li>
                    <li>• Frame washing</li>
                    <li>• Gutter clearing</li>
                    <li>• Full maintenance</li>
                  </ul>
                </div>
                <div className="bg-[#0B1E3F] border border-[#1E90FF]/30 p-6 rounded-lg hover:border-[#1E90FF] transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-3">Specialist Services</h3>
                  <ul className="space-y-1 text-sm text-white/70">
                    <li>• Solar panel cleaning</li>
                    <li>• Cladding maintenance</li>
                    <li>• Fascia and soffit cleaning</li>
                    <li>• Graffiti removal</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#0B1E3F]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">
                The Importance of Regular Property Maintenance in Purbeck
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Protect Your Investment</h3>
                  <p className="text-white/70">
                    Regular external maintenance prevents costly repairs down the line. In Swanage and Purbeck's coastal climate, neglect leads to accelerated deterioration of building materials. A proactive maintenance schedule protects your property value and extends the life of exterior surfaces.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Prevent Water Damage</h3>
                  <p className="text-white/70">
                    Blocked gutters, damaged roofs, and compromised render allow water ingress, causing damp, mould, and structural issues. Our comprehensive maintenance service identifies and resolves problems before they escalate into expensive repairs for your Dorset property.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Maintain Kerb Appeal</h3>
                  <p className="text-white/70">
                    A well-maintained property makes a strong first impression. Whether selling, letting, or simply taking pride in your Purbeck home, clean external surfaces significantly enhance appearance and property value.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Comply with Regulations</h3>
                  <p className="text-white/70">
                    Commercial property owners in Swanage have legal obligations to maintain safe, clean premises. Regular maintenance ensures compliance with health and safety regulations, protecting your business from liability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#0A1A35]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Flexible Maintenance Plans for Dorset Properties
              </h2>
              <p className="text-white/70 text-center mb-12">
                Choose a maintenance plan tailored to your Swanage or Purbeck property needs
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="border-2 border-[#1E90FF]/30 bg-[#0B1E3F] rounded-lg p-6 hover:border-[#1E90FF] transition-colors">
                  <h3 className="text-2xl font-bold text-white mb-4">Essential Plan</h3>
                  <p className="text-white/60 mb-6">Annual comprehensive maintenance</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#00C853] mt-1 flex-shrink-0" />
                      <span className="text-sm text-white/70">Annual roof cleaning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#00C853] mt-1 flex-shrink-0" />
                      <span className="text-sm text-white/70">Twice-yearly gutter clearing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#00C853] mt-1 flex-shrink-0" />
                      <span className="text-sm text-white/70">Annual driveway clean</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#00C853] mt-1 flex-shrink-0" />
                      <span className="text-sm text-white/70">Priority booking</span>
                    </li>
                  </ul>
                  <a
                    href="/quote"
                    className="block text-center bg-[#1E90FF]/20 hover:bg-[#1E90FF]/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors border border-[#1E90FF]/50"
                  >
                    Get Quote
                  </a>
                </div>
                <div className="border-2 border-[#1E90FF] bg-[#0B1E3F] rounded-lg p-6 relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1E90FF] text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Complete Plan</h3>
                  <p className="text-white/60 mb-6">Bi-annual full property care</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#00C853] mt-1 flex-shrink-0" />
                      <span className="text-sm text-white/70">Everything in Essential</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#00C853] mt-1 flex-shrink-0" />
                      <span className="text-sm text-white/70">Bi-annual wall cleaning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#00C853] mt-1 flex-shrink-0" />
                      <span className="text-sm text-white/70">Quarterly window cleaning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#00C853] mt-1 flex-shrink-0" />
                      <span className="text-sm text-white/70">10% discount on extras</span>
                    </li>
                  </ul>
                  <a
                    href="/quote"
                    className="block text-center bg-[#1E90FF] hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Get Quote
                  </a>
                </div>
                <div className="border-2 border-[#1E90FF]/30 bg-[#0B1E3F] rounded-lg p-6 hover:border-[#1E90FF] transition-colors">
                  <h3 className="text-2xl font-bold text-white mb-4">Premium Plan</h3>
                  <p className="text-white/60 mb-6">Quarterly full-service maintenance</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#00C853] mt-1 flex-shrink-0" />
                      <span className="text-sm text-white/70">Everything in Complete</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#00C853] mt-1 flex-shrink-0" />
                      <span className="text-sm text-white/70">Quarterly full property inspection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#00C853] mt-1 flex-shrink-0" />
                      <span className="text-sm text-white/70">Monthly window cleaning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#00C853] mt-1 flex-shrink-0" />
                      <span className="text-sm text-white/70">20% discount on all services</span>
                    </li>
                  </ul>
                  <a
                    href="/quote"
                    className="block text-center bg-[#1E90FF]/20 hover:bg-[#1E90FF]/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors border border-[#1E90FF]/50"
                  >
                    Get Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#0B1E3F]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">
                Swanage & Purbeck: Unique Property Maintenance Challenges
              </h2>
              <p className="text-white/70 mb-6">
                Properties in Swanage and across Purbeck face specific maintenance challenges that require local expertise:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#0A1A35] border border-[#1E90FF]/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Coastal Salt Exposure</h3>
                  <p className="text-white/70 text-sm">
                    Salt spray accelerates corrosion of gutters, windows, and render. Regular cleaning prevents long-term damage to Swanage properties near the coast.
                  </p>
                </div>
                <div className="bg-[#0A1A35] border border-[#1E90FF]/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">High Humidity & Rainfall</h3>
                  <p className="text-white/70 text-sm">
                    Dorset's maritime climate promotes rapid growth of moss, algae, and lichen on all external surfaces, requiring frequent attention.
                  </p>
                </div>
                <div className="bg-[#0A1A35] border border-[#1E90FF]/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Heritage Building Materials</h3>
                  <p className="text-white/70 text-sm">
                    Many Purbeck properties feature Purbeck stone and traditional materials requiring specialist, gentle cleaning techniques.
                  </p>
                </div>
                <div className="bg-[#0A1A35] border border-[#1E90FF]/30 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Seasonal Weather Extremes</h3>
                  <p className="text-white/70 text-sm">
                    Strong coastal winds, heavy winter rain, and summer sun exposure all take their toll on external surfaces across Swanage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-[#0A1A35] to-[#0B1E3F] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Protect Your Purbeck Property with Professional Maintenance
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Comprehensive external maintenance services across Swanage and Dorset
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/quote"
                className="bg-[#1E90FF] hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Get Free Quote
              </a>
              <a
                href="/contact"
                className="bg-[#00C853] hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
      <PWBFooter />
    </>
  )
}
