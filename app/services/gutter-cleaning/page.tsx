import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Droplets, Shield, AlertTriangle } from 'lucide-react'
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { ServiceFaqSection } from "@/components/service-faq-section"
import Script from "next/script"
import { createServiceBreadcrumbs } from "@/lib/schema-utils"

export const metadata: Metadata = {
  title: "Gutter Cleaning Swanage & Purbeck | Prevent Water Damage | PowerWash Bros",
  description: "Professional gutter clearing and downpipe maintenance in Swanage, Purbeck, and across Dorset. Prevent costly water damage to your property. PASMA trained. Free quotes.",
  alternates: {
    canonical: "https://powerwashbros.co.uk/services/gutter-cleaning",
  },
}

export default function GutterCleaningPage() {
  const breadcrumbSchema = createServiceBreadcrumbs("Gutter Cleaning", "gutter-cleaning")

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Gutter Cleaning",
    "description": "Professional gutter clearing and downpipe maintenance in Swanage, Purbeck, and Dorset. Prevent costly water damage to your property.",
    "serviceType": "Gutter Cleaning, Gutter Maintenance, Downpipe Clearing",
    "provider": {
      "@type": "LocalBusiness",
      "name": "PowerWash Bros",
      "telephone": "+447418610731",
      "email": "info@powerwashbros.co.uk",
      "url": "https://powerwashbros.co.uk",
      "areaServed": [
        { "@type": "City", "name": "Swanage" },
        { "@type": "City", "name": "Purbeck" },
        { "@type": "AdministrativeArea", "name": "Dorset" }
      ]
    },
    "offers": {
      "@type": "Offer",
      "url": "https://powerwashbros.co.uk/quote",
      "priceCurrency": "GBP",
      "priceRange": "£100-£400"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "150"
    }
  }

  return (
    <>
      <Script id="breadcrumb-schema-gutter" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="service-schema-gutter" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />

        {/* Hero Section */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <nav className="text-sm text-white/60 mb-6">
                <Link href="/" className="hover:text-[#1E90FF]">Home</Link>
                {' > '}
                <Link href="/services" className="hover:text-[#1E90FF]">Services</Link>
                {' > '}
                <span className="text-white">Gutter Cleaning</span>
              </nav>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Professional Gutter Cleaning in Swanage & Purbeck
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Blocked gutters are the most common cause of preventable water damage on Purbeck properties. We clear, flush, and inspect every gutter and downpipe - leaving your roofline draining correctly and your property protected.
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
                  <a href="/quote">Get Free Quote</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Gutters Matter */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-white">
                Why Gutter Maintenance Matters in Purbeck
              </h2>
              <p className="text-lg mb-6 text-white/80">
                Gutters exist to move rainwater away from your roof, walls, and foundations. When they block, that water has nowhere to go - and in Purbeck's high-rainfall coastal climate, the consequences escalate quickly.
              </p>
              <p className="text-lg mb-8 text-white/80">
                Purbeck properties face a particularly demanding combination: heavy leaf fall from surrounding woodland, moss shedding from roofs, salt-laden coastal air accelerating corrosion, and strong winds depositing debris from nearby trees and fields year-round.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <Droplets className="h-8 w-8 text-[#1E90FF] mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-white">Full Clearance</h3>
                    <p className="text-white/80">
                      All leaves, moss, silt, and compacted debris removed by hand and vacuum - not just flushed further along the system.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <Shield className="h-8 w-8 text-[#1E90FF] mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-white">Downpipe Flushing</h3>
                    <p className="text-white/80">
                      Every downpipe is flushed to confirm it flows freely. Blockages are cleared using professional gutter vacuum equipment.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <AlertTriangle className="h-8 w-8 text-[#1E90FF] mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-white">Condition Report</h3>
                    <p className="text-white/80">
                      Before and after photos provided. Any cracked joints, failing brackets, or damage flagged so you can act before problems worsen.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Purbeck Gutters Block Faster */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-white">
                Why Purbeck Gutters Block Faster Than Most
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg mb-4 text-white/80">
                    Most roofline professionals recommend annual gutter clearing. In Purbeck, many properties need this twice a year. The reasons are specific to this area:
                  </p>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Woodland debris</strong> - leaf fall from surrounding trees continues year-round, not just in autumn</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Roof moss</strong> - heavy growth on Purbeck roofs breaks off during rain and washes directly into gutters</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Coastal salt air</strong> - accelerates corrosion of brackets and joints, causing sagging that prevents proper drainage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>High rainfall</strong> - Dorset's wet climate means blocked gutters overflow frequently, increasing the damage rate</span>
                    </li>
                  </ul>
                </div>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-2xl font-semibold mb-4 text-white">
                      The Cost of Neglected Gutters
                    </h3>
                    <p className="mb-4 text-white/80">
                      A £100-£150 gutter clean prevents far costlier problems:
                    </p>
                    <ul className="space-y-2 text-sm text-white/80 text-left">
                      <li>• Damp penetration repairs: £500–£2,000</li>
                      <li>• Wall rendering replacement: £1,500–£3,000</li>
                      <li>• Foundation drainage works: £3,000–£10,000+</li>
                      <li>• Internal replastering: £2,000–£5,000</li>
                      <li>• Fascia and soffit replacement: £800–£2,500</li>
                    </ul>
                    <p className="mt-4 font-semibold text-[#1E90FF]">
                      Prevention costs a fraction of the repair.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Warning Signs */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-white">
                Warning Signs Your Purbeck Gutters Need Clearing
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Visible Overflow & Staining
                    </h3>
                    <p className="text-white/80 mb-3">
                      Signs you can see from ground level that indicate immediate attention is needed.
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Water pouring over gutter edges during rain</li>
                      <li>• Green algae streaks on exterior walls below gutters</li>
                      <li>• Dark water marks on fascia boards</li>
                      <li>• Plant or moss growth visible inside gutters</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Structural & Internal Signs
                    </h3>
                    <p className="text-white/80 mb-3">
                      Indicators that water damage has already begun and immediate clearing is critical.
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Sagging gutters pulling away from the fascia</li>
                      <li>• Damp patches on internal walls near roofline</li>
                      <li>• Mould or mildew appearing in upstairs rooms</li>
                      <li>• Bird activity or nesting material in gutters</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12 text-white">
                Our Gutter Cleaning Process
              </h2>
              <div className="grid md:grid-cols-5 gap-6">
                {[
                  { step: 1, title: "Free Inspection", desc: "We assess gutter condition, blockages, and bracket integrity at your Purbeck property." },
                  { step: 2, title: "Full Clearance", desc: "All leaves, moss, and debris removed by hand and vacuum. No mess left behind on site." },
                  { step: 3, title: "Downpipe Flush", desc: "Every downpipe flushed and confirmed clear. Blockages cleared with professional equipment." },
                  { step: 4, title: "Water Flow Test", desc: "Full water flush test confirms proper drainage and identifies any leaks or low spots." },
                  { step: 5, title: "Photo Report", desc: "Before and after photos sent to you with honest advice on any repairs needed." },
                ].map((item) => (
                  <Card key={item.step} className="bg-white/10 border-2 border-[#1E90FF]/20">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-[#1E90FF] text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                        {item.step}
                      </div>
                      <h3 className="font-semibold mb-2 text-white">{item.title}</h3>
                      <p className="text-sm text-white/80">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Gutter Types We Service */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-white">
                All Gutter Types Serviced Across Purbeck
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Residential Guttering
                    </h3>
                    <p className="text-white/80 mb-3">
                      Standard half-round, square-line, and ogee profile UPVC and cast iron guttering on houses across Swanage, Wareham, and Purbeck.
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• UPVC half-round and square gutters</li>
                      <li>• Cast iron heritage guttering</li>
                      <li>• Fascia-mounted and rafter-foot systems</li>
                      <li>• Single and two-storey properties</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Commercial & Larger Properties
                    </h3>
                    <p className="text-white/80 mb-3">
                      Industrial box gutters, valley gutters, and complex commercial roofline systems requiring professional vacuum and access equipment.
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Box gutters and parapet systems</li>
                      <li>• Valley gutters and flat roof drainage</li>
                      <li>• Commercial and industrial premises</li>
                      <li>• Holiday lets and rental properties</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Heritage & Stone Properties
                    </h3>
                    <p className="text-white/80 mb-3">
                      Purbeck's listed buildings and stone cottages often have original cast iron or lead guttering that requires careful handling.
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Cast iron ogee and moulded profiles</li>
                      <li>• Lead valley gutters</li>
                      <li>• Listed and heritage properties</li>
                      <li>• Church and public buildings</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Gutter Repairs & Maintenance
                    </h3>
                    <p className="text-white/80 mb-3">
                      Minor repairs carried out during or after cleaning, keeping your roofline in full working order without the need for a separate contractor visit.
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Bracket replacement and re-fixing</li>
                      <li>• Joint resealing to stop leaks</li>
                      <li>• Downpipe reconnection and re-routing</li>
                      <li>• Gutter guard installation</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Gutter Cleaning Pricing for Purbeck Properties
              </h2>
              <p className="text-lg mb-6 text-white/80">
                Pricing is based on property size, number of storeys, gutter run length, and level of blockage. All quotes are free and fixed-price with no hidden extras.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                    <span>Property size and gutter run length</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                    <span>Number of storeys and access difficulty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                    <span>Level of blockage and debris buildup</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                    <span>Number of downpipes and complexity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                    <span>Minor repairs required during visit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                    <span>Combination with roof or soffit cleaning</span>
                  </li>
                </ul>
              </div>
              <Card className="bg-[#1E90FF] text-white">
                <CardContent className="p-8 text-center">
                  <p className="text-xl mb-4">
                    <strong>Typical range:</strong> £100–£400 for Purbeck residential properties
                  </p>
                  <p className="mb-6 text-white/90">
                    Get a free, accurate quote based on your specific property
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-6 text-lg
                               hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                      Get Free Quote via WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#1E90FF]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 text-white">
                Don't Wait for Water Damage
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Free assessments across Purbeck &bull; Same-week service available &bull; No obligation quotes
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-6 text-lg
                           hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
              >
                <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                  Start WhatsApp Conversation
                </a>
              </Button>
            </div>
          </div>
        </section>

        <ServiceFaqSection
          heading="Gutter Cleaning FAQs"
          subheading="Common questions about our gutter clearing and downpipe maintenance services across Purbeck and Dorset."
          faqs={[
            { q: "How often should gutters be cleaned?", a: "We recommend at least once a year, ideally in late autumn after leaves have fallen. Properties surrounded by trees or in coastal areas like Swanage may benefit from twice-yearly clearing to prevent blockages." },
            { q: "What happens if I don't clean my gutters?", a: "Blocked gutters overflow, causing water damage to fascias, soffits, foundations, and interior walls. They also become heavy with debris, leading to bracket failure and gutter collapse. Regular cleaning prevents costly repairs." },
            { q: "How do you clean gutters safely?", a: "We use professional-grade gutter vacuum systems and ladders with stabilisers rated for the working height. Our team is PASMA trained for safe working at height on all residential and commercial properties." },
            { q: "Can you fix damaged gutters during cleaning?", a: "We assess gutters during cleaning and report any damage found. We can replace brackets, reseal joints, and carry out minor repairs as part of our external property maintenance service." },
            { q: "Do you remove and dispose of the debris?", a: "Yes. All debris is bagged and removed from your property as standard. We leave your gutters clear and your property clean after every visit." },
          ]}
        />

        <PWBFooter />
      </main>
    </>
  )
}
