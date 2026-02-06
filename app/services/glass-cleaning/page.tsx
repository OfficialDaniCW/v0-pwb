import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Building2, Carrot as Mirror, Building } from 'lucide-react'
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import Script from "next/script"
import { createServiceBreadcrumbs } from "@/lib/schema-utils"

export const metadata: Metadata = {
  title: 'Commercial Glass Cleaning Swanage & Purbeck | Shop Fronts & Offices | PowerWash Bros',
  description: 'Professional commercial glass cleaning in Swanage and Purbeck. Shop fronts, office buildings, mirrors. Streak-free results. Free quotes.',
}

export default function GlassCleaningPage() {
  const breadcrumbSchema = createServiceBreadcrumbs("Glass & Mirror Cleaning", "glass-cleaning")
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Glass and Mirror Cleaning Services',
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
    description: 'Professional glass, mirror, and commercial window cleaning services in Swanage, Purbeck, and Dorset.',
  }

  return (
    <div>
      <Script id="breadcrumb-schema-glass" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="service-schema-glass" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      {/* Hero Section - changed to solid dark navy background */}
      <section className="py-20 sm:py-28 bg-[#0B1E3F]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="text-sm text-white/60 mb-6">
              <a href="/" className="hover:text-[#1E90FF]">Home</a>
              {' > '}
              <a href="/services" className="hover:text-[#1E90FF]">Services</a>
              {' > '}
              <span className="text-white">Glass Cleaning</span>
            </nav>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Professional Glass Cleaning in Swanage & Purbeck
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Crystal-clear, streak-free results for commercial and residential properties across Dorset. Shop fronts, office buildings, mirrors, and decorative glass features cleaned to perfection.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/447418610731"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00C853] text-white font-semibold rounded-lg px-8 py-6 hover:bg-[#00A843] transition-all"
              >
                Chat on WhatsApp
              </a>
              <a
                href="/quote"
                className="bg-green-pwb hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Get Free Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters - changed from white/5 to darker navy */}
      <section className="py-16 bg-[#0A1A35]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-sm text-white/60 mb-4">
              <a href="/" className="hover:text-[#1E90FF]">Home</a>
              {" > "}
              <a href="/services" className="hover:text-[#1E90FF]">Services</a>
              {" > "}
              <span className="text-white">Glass Cleaning</span>
            </div>
            <h2 className="text-3xl font-bold mb-8 text-white">
              Why Professional Glass Cleaning Matters
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg mb-4 text-white/80">
                  In Swanage and Purbeck's coastal environment, glass surfaces face constant assault from sea salt, coastal winds, and the region's unique weather. Your business or property appearance depends on clean glass:
                </p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="text-green-pwb mt-1">✓</span>
                    <span><strong>First impressions count:</strong> Clean glass creates a professional image for your Swanage business</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-pwb mt-1">✓</span>
                    <span><strong>Maximise natural light:</strong> Clean windows allow maximum light transmission, reducing energy costs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-pwb mt-1">✓</span>
                    <span><strong>Prevent glass degradation:</strong> Regular cleaning removes corrosive salt deposits from coastal spray</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-pwb mt-1">✓</span>
                    <span><strong>Health & safety compliance:</strong> Professional cleaning identifies cracks and damage</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#0B1E3F] border-2 border-[#1E90FF]/20 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  Purbeck's Glass Challenge
                </h3>
                <p className="mb-4 text-white/80">
                  Living and working in Purbeck means your glass faces unique challenges:
                </p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>• Salt spray deposits from coastal winds</li>
                  <li>• Mineral buildup from hard water in Dorset</li>
                  <li>• Organic growth in damp conditions</li>
                  <li>• Bird droppings on commercial premises</li>
                  <li>• Tree sap and pollen in rural areas</li>
                </ul>
                <p className="mt-4 font-semibold text-white">
                  Professional equipment makes the difference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - changed to solid dark navy */}
      <section className="py-16 bg-[#0B1E3F]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-white text-center">
              Specialist Glass Cleaning Services
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 border-2 border-[#1E90FF]/20 p-6 rounded-lg">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Building2 className="h-12 w-12 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Commercial Windows
                  </h3>
                  <p className="text-white/80">
                    Shops, offices, and business premises throughout Swanage and Purbeck
                  </p>
                </div>
              </div>
              <div className="bg-white/10 border-2 border-[#1E90FF]/20 p-6 rounded-lg">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Mirror className="h-12 w-12 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Mirrors & Glass Panels
                  </h3>
                  <p className="text-white/80">
                    Large mirrors, glass partitions, and decorative glass features
                  </p>
                </div>
              </div>
              <div className="bg-white/10 border-2 border-[#1E90FF]/20 p-6 rounded-lg">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <Building className="h-12 w-12 text-[#1E90FF]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Shopfronts
                  </h3>
                  <p className="text-white/80">
                    Complete shopfront cleaning for Dorset retail businesses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - changed from white/5 to darker navy, all text to white */}
      <section className="py-16 bg-[#0A1A35]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Our Glass Cleaning Process
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Professional Equipment</h3>
                <p className="text-white/80 mb-4">
                  We use specialist equipment designed for perfect, streak-free results:
                </p>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-green-pwb mt-1">✓</span>
                    <span>Purified water systems for spot-free drying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-pwb mt-1">✓</span>
                    <span>Professional-grade squeegees and applicators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-pwb mt-1">✓</span>
                    <span>Specialist cleaning solutions for different glass types</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-pwb mt-1">✓</span>
                    <span>Reach and wash poles for high-level access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-pwb mt-1">✓</span>
                    <span>Microfibre technology for delicate surfaces</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">What We Clean</h3>
                <ul className="grid md:grid-cols-2 gap-4 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E90FF] mt-1">•</span>
                    <span>Commercial shopfronts and display windows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E90FF] mt-1">•</span>
                    <span>Office building windows and curtain walling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E90FF] mt-1">•</span>
                    <span>Interior and exterior glass partitions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E90FF] mt-1">•</span>
                    <span>Mirrors and decorative glass features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E90FF] mt-1">•</span>
                    <span>Glass balustrades and railings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E90FF] mt-1">•</span>
                    <span>Skylights and roof glazing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E90FF] mt-1">•</span>
                    <span>Conservatory glass panels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E90FF] mt-1">•</span>
                    <span>Glass doors and entrance ways</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Purbeck Coastal Challenges</h3>
                <p className="text-white/80 mb-4">
                  Swanage and Purbeck's coastal location creates unique glass cleaning challenges:
                </p>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E90FF] mt-1">•</span>
                    <span>Salt spray deposits require specialist treatments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E90FF] mt-1">•</span>
                    <span>High humidity promotes faster glass soiling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E90FF] mt-1">•</span>
                    <span>Seagull droppings cause corrosive damage if left untreated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1E90FF] mt-1">•</span>
                    <span>Coastal winds carry dust and debris onto Dorset glass surfaces</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Services - changed to dark navy background, cards to dark navy with blue borders */}
      <section className="py-16 bg-[#0B1E3F]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Commercial Cleaning Schedules</h2>
            <p className="text-white/80 mb-8">
              We offer flexible commercial glass cleaning contracts tailored to your Swanage or Purbeck business needs:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#0A1A35] border-2 border-[#1E90FF]/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Weekly Service</h3>
                <p className="text-white/80 mb-4">Perfect for high-traffic retail and hospitality businesses</p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>• Shopfronts</li>
                  <li>• Restaurants</li>
                  <li>• Hotels</li>
                  <li>• Salons</li>
                </ul>
              </div>
              <div className="bg-[#0A1A35] border-2 border-[#1E90FF]/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Fortnightly Service</h3>
                <p className="text-white/80 mb-4">Ideal for office buildings and professional services</p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>• Office buildings</li>
                  <li>• Showrooms</li>
                  <li>• Medical centres</li>
                  <li>• Estate agents</li>
                </ul>
              </div>
              <div className="bg-[#0A1A35] border-2 border-[#1E90FF]/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Monthly Service</h3>
                <p className="text-white/80 mb-4">Suitable for warehouses and light industrial units</p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>• Warehouses</li>
                  <li>• Industrial units</li>
                  <li>• Sports facilities</li>
                  <li>• Community centres</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - kept darker navy background */}
      <section className="py-16 bg-[#0A1A35]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Glass Cleaning Pricing for Purbeck
            </h2>
            <p className="text-lg mb-6 text-white/80">
              Pricing depends on several factors:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-pwb mt-1">✓</span>
                  <span>Size and number of glass panels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-pwb mt-1">✓</span>
                  <span>Height and access requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-pwb mt-1">✓</span>
                  <span>Condition and contamination level</span>
                </li>
              </ul>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-pwb mt-1">✓</span>
                  <span>Frequency of cleaning service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-pwb mt-1">✓</span>
                  <span>Location in Swanage or Purbeck</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-pwb mt-1">✓</span>
                  <span>Commercial vs residential</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#1E90FF] text-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-xl mb-4">
                <strong>Regular commercial cleans:</strong> From £50/visit
              </p>
              <p className="mb-6 text-white/90">
                Get an accurate quote for your specific glass cleaning needs
              </p>
              <a
                href="https://wa.me/447418610731"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-4 text-xl hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all inline-block"
              >
                Get Free Quote via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Crystal-Clear Glass for Your Purbeck Property
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Free quotes • Flexible scheduling • Professional results
            </p>
            <a
              href="https://wa.me/447418610731"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-4 text-xl hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all inline-block"
            >
              Start WhatsApp Conversation
            </a>
          </div>
        </div>
      </section>

      <PWBFooter />
    </div>
  )
}
