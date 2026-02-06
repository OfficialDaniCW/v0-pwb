import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Phone, AlertTriangle } from 'lucide-react'
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import Script from "next/script"
import { createServiceBreadcrumbs } from "@/lib/schema-utils"

export const metadata: Metadata = {
  title: "Gutter Cleaning Swanage & Purbeck | Prevent Water Damage | PowerWash Bros",
  description: "Professional gutter cleaning in Swanage and Purbeck. Prevent costly water damage to your property. Free quotes. Serving all of Purbeck.",
}

export default function GutterCleaningPage() {
  const breadcrumbSchema = createServiceBreadcrumbs("Gutter Cleaning", "gutter-cleaning")
  
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Gutter Cleaning",
    "description": "Professional gutter cleaning in Swanage and Purbeck. Prevent costly water damage to your property.",
    "serviceType": "Gutter Cleaning, Gutter Maintenance",
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
      "priceRange": "£150-£400"
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
      <main className="min-h-[100dvh] bg-[#0B1E3F] text-white">
        <SiteHeader />
        
        {/* Hero */}
        <section className="py-20 sm:py-28 bg-[#0B1E3F]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="text-sm text-white/60 mb-4">
                <Link href="/" className="hover:text-[#1E90FF] transition-colors">Home</Link>
                {" > "}
                <Link href="/services" className="hover:text-[#1E90FF] transition-colors">Services</Link>
                {" > "}
                <span className="text-white">Gutter Cleaning</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Professional Gutter Cleaning in Swanage & Purbeck
              </h1>
              <p className="text-xl text-white/80 mb-8">
                The £200 service that saves £3000+ in water damage repairs. Protect your Purbeck property from blocked gutters, damp walls, and foundation issues.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-[#00C853] hover:bg-[#00C853]/90 text-white font-semibold"
                >
                  <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                    <Phone className="mr-2 h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-[#1E90FF] text-white hover:bg-[#1E90FF]/10 bg-transparent">
                  <Link href="/quote">Get Free Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Warning Section */}
        <section className="py-16 bg-[#0A1A35]">
          <div className="max-w-7xl mx-auto px-6">
            <Card className="border-2 border-red-500/50 bg-red-500/10 backdrop-blur">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-white">The Hidden Danger in Your Gutters</h2>
                    <p className="text-lg mb-4 text-white/90">
                      Blocked gutters in Purbeck's climate don't just cause minor issues - they cascade into expensive disasters:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold mb-2 text-white">What starts as £200 prevention becomes:</p>
                        <ul className="space-y-2 text-sm text-white/80">
                          <li>• Damp penetration: £500-2,000</li>
                          <li>• Wall rendering repairs: £1,500-3,000</li>
                          <li>• Foundation damage: £3,000-10,000+</li>
                          <li>• Internal replastering: £2,000-5,000</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-2 text-white">Plus the hidden costs:</p>
                        <ul className="space-y-2 text-sm text-white/80">
                          <li>• Furniture and carpet replacement</li>
                          <li>• Temporary accommodation during repairs</li>
                          <li>• Insurance excess and premium increases</li>
                          <li>• Property value reduction</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Purbeck Properties Need Regular Cleaning */}
        <section className="py-16 bg-[#0B1E3F]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-white">Why Purbeck Gutters Block Faster</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-[#0A1A35] border-[#1E90FF]/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">Tree Coverage</h3>
                  <p className="text-white/70">
                    Purbeck's beautiful wooded areas mean constant leaf fall. Properties near Wareham Forest or tree-lined Swanage streets collect debris year-round, not just autumn.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#0A1A35] border-[#1E90FF]/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">Moss from Roofs</h3>
                  <p className="text-white/70">
                    Heavy moss growth on Purbeck roofs breaks off during rain, washing into gutters. This organic matter rots and blocks downpipes completely.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#0A1A35] border-[#1E90FF]/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">Coastal Weather</h3>
                  <p className="text-white/70">
                    Swanage and coastal Purbeck face strong winds that deposit extra debris. Salt air also corrodes fixings, causing sagging gutters that don't drain properly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-16 bg-[#0A1A35]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center text-white">How We Clean Purbeck Gutters</h2>
            <div className="grid md:grid-cols-5 gap-6">
              {[
                { step: 1, title: "Free Inspection", desc: "We assess gutter condition, blockages, and potential issues at your Purbeck property." },
                { step: 2, title: "Complete Clearance", desc: "All leaves, moss, and debris removed by hand. No mess left behind." },
                { step: 3, title: "Downpipe Flushing", desc: "We ensure downpipes flow freely. Blockages cleared using professional equipment." },
                { step: 4, title: "Gutter Flush", desc: "Full water flush test to confirm proper drainage and identify any leaks." },
                { step: 5, title: "Photo Evidence", desc: "Before/after photos and advice on maintenance schedule for your property." },
              ].map((item) => (
                <Card key={item.step} className="bg-[#0B1E3F] border-[#1E90FF]/30">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#1E90FF] text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold mb-2 text-white">{item.title}</h3>
                    <p className="text-sm text-white/70">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Signs You Need Cleaning */}
        <section className="py-16 bg-[#0B1E3F]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-white">Warning Signs Your Purbeck Property Needs Gutter Cleaning</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { sign: "Water Overflow", desc: "Water pouring over gutter edges during rain instead of flowing through downpipes" },
                { sign: "Sagging Gutters", desc: "Gutters pulling away from fascia due to weight of trapped water and debris" },
                { sign: "Damp Patches", desc: "Internal or external wall staining near gutter level - water is escaping somewhere" },
                { sign: "Plant Growth", desc: "Grass, weeds, or moss growing in your gutters - organic matter has built up" },
                { sign: "Bird Activity", desc: "Birds nesting in gutters - debris has created suitable nesting material" },
                { sign: "Staining on Walls", desc: "Green algae or dark streaks on exterior walls below gutters" },
              ].map((item, i) => (
                <Card key={i} className="border-l-4 border-l-red-500 bg-[#0A1A35] border-[#1E90FF]/30">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-white">{item.sign}</h3>
                    <p className="text-sm text-white/70">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg font-semibold mb-4 text-white">
                Spotted any of these? Your gutters need attention now.
              </p>
              <Button asChild size="lg" className="bg-[#00C853] hover:bg-[#00C853]/90 text-white font-semibold">
                <Link href="/quote">Get Emergency Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-[#0A1A35]">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-white">Gutter Cleaning Pricing</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-[#0B1E3F] border-[#1E90FF]/30">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-white/60 mb-2">Small Property</p>
                  <p className="text-3xl font-bold mb-2 text-white">£100-150</p>
                  <p className="text-sm text-white/70">2-3 bed terrace or semi</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-[#1E90FF] bg-[#0B1E3F]">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-white/60 mb-2">Standard Property</p>
                  <p className="text-3xl font-bold mb-2 text-white">£150-250</p>
                  <p className="text-sm text-white/70">3-4 bed detached</p>
                  <div className="mt-2 text-xs bg-[#1E90FF]/20 text-[#1E90FF] px-2 py-1 rounded">MOST COMMON</div>
                </CardContent>
              </Card>
              <Card className="bg-[#0B1E3F] border-[#1E90FF]/30">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-white/60 mb-2">Large Property</p>
                  <p className="text-3xl font-bold mb-2 text-white">£250-400</p>
                  <p className="text-sm text-white/70">Large house or commercial</p>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-[#1E90FF] border-[#1E90FF]">
              <CardContent className="p-6 text-center">
                <p className="mb-4 text-white">
                  <strong>Bundle & Save:</strong> Gutter cleaning + Roof moss removal from £300
                </p>
                <Button size="lg" variant="secondary" className="bg-white text-[#1E90FF] hover:bg-white/90">
                  Get Exact Quote for Your Property
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[#0B1E3F]">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-white">Gutter Cleaning FAQs</h2>
            <div className="space-y-6">
              {[
                {
                  q: "How often should I clean gutters in Purbeck?",
                  a: "Most Purbeck properties need gutter cleaning twice a year - spring and autumn. Properties near trees or with heavy roof moss may need quarterly cleaning. Coastal Swanage properties should check after winter storms."
                },
                {
                  q: "Can blocked gutters really cause that much damage?",
                  a: "Absolutely. We've seen Purbeck properties with £5,000-15,000 of water damage from neglected gutters. Water overflow soaks into walls, damages foundations, and causes internal damp. Prevention costs a fraction of repair."
                },
                {
                  q: "Do you repair gutters too?",
                  a: "We can advise on minor repairs and resealing. For major gutter replacement, we work with trusted Purbeck contractors and can coordinate the work."
                },
                {
                  q: "What if my gutters are too high?",
                  a: "We have professional access equipment suitable for properties up to 3 storeys. Many Purbeck properties require ladder work, which we're fully insured and trained for."
                },
                {
                  q: "Can you prevent future blockages?",
                  a: "We offer gutter guard installation to reduce debris buildup. However, even with guards, annual inspection is recommended for Purbeck properties due to fine debris and moss."
                },
              ].map((faq, i) => (
                <Card key={i} className="bg-[#0A1A35] border-[#1E90FF]/30">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-white">{faq.q}</h3>
                    <p className="text-white/70">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Don't Wait for Water Damage
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Free assessments across Purbeck • Same-week service available • No obligation quotes
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-8 text-xl
                         hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
            >
              <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                WhatsApp Us Now
              </a>
            </Button>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
