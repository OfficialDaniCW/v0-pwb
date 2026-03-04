import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { ServiceFaqSection } from "@/components/service-faq-section"
import Script from "next/script"
import { createServiceBreadcrumbs } from "@/lib/schema-utils"

export const metadata = {
  title: "Driveway Cleaning Dorset | Jet Washing & Biocide Treatment | PowerWash Bros | Swanage, Purbeck",
  description:
    "Professional driveway cleaning across Purbeck and Dorset. Expert jet washing and biocide treatments. Transform tired driveways back to pristine condition. Best driveway cleaning Dorset. Free quotes.",
  openGraph: {
    title: "Driveway Cleaning & Restoration | PowerWash Bros",
    description: "Transform tired driveways with professional jet washing and biocide treatments in Swanage and Purbeck",
    url: "https://powerwashbros.co.uk/services/driveway-cleaning",
    siteName: "PowerWash Bros",
    images: [
      {
        url: "https://kjtbsmcgxocczcoajdhs.supabase.co/storage/v1/object/public/pwb/the-vicarage/after-3.jpeg",
        width: 1200,
        height: 630,
        alt: "Driveway cleaning and jet washing transformation in Purbeck",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Driveway Cleaning & Restoration | PowerWash Bros",
    description: "Transform tired driveways with professional jet washing in Swanage and Purbeck",
    images: ["https://kjtbsmcgxocczcoajdhs.supabase.co/storage/v1/object/public/pwb/the-vicarage/after-3.jpeg"],
  },
}

export default function DrivewayCleaningPage() {
  const breadcrumbSchema = createServiceBreadcrumbs("Driveway Cleaning", "driveway-cleaning")
  
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Driveway Cleaning",
    "description": "Professional driveway cleaning across Purbeck and Dorset with expert jet washing and biocide treatments.",
    "serviceType": "Driveway Cleaning, Jet Washing, Pressure Washing",
    "provider": {
      "@type": "LocalBusiness",
      "name": "PowerWash Bros",
      "image": "https://powerwashbros.co.uk/logo.png",
      "telephone": "+447418610731",
      "email": "info@powerwashbros.co.uk",
      "url": "https://powerwashbros.co.uk",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Swanage",
        "addressRegion": "Dorset",
        "postalCode": "BH19",
        "addressCountry": "GB"
      },
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
      "priceRange": "£150-£600"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "150"
    }
  }

  return (
    <>
      <Script id="breadcrumb-schema-driveway" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="service-schema-driveway" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />

        {/* Hero Section */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <nav className="text-sm text-white/60 mb-6">
                <Link href="/" className="hover:text-[#1E90FF]">
                  Home
                </Link>
                {" > "}
                <Link href="/services" className="hover:text-[#1E90FF]">
                  Services
                </Link>
                {" > "}
                <span className="text-white">Driveway Cleaning</span>
              </nav>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Driveway Restoration</h1>
              <p className="text-xl text-white/80 mb-8">
                Transform tired driveways back to pristine condition with professional biocide treatments
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

        {/* Why This Matters */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Why Driveway Maintenance Matters</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  Your driveway is the first thing people see. Over time, dirt, algae, tire marks, and moss transform
                  that pristine surface into something you'd rather hide. But it's not just about appearance - that
                  organic growth is actively damaging your driveway.
                </p>
                <p>
                  At PowerWash Bros, we don't just blast water at your driveway and hope for the best. Our
                  biocide-trained team understands different surface materials, drainage patterns, and the most
                  effective cleaning methods for YOUR specific situation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Property-Centered Approach */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto glass-border rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Property-Centered Driveway Care</h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Every driveway has different materials, drainage, and conditions. We assess YOUR driveway and deliver
                bespoke solutions using our PowerUps range for results that last.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="font-semibold text-white mb-2">Block Paving</div>
                  <p className="text-white/70">Specialist treatment for porous surfaces</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="font-semibold text-white mb-2">Concrete</div>
                  <p className="text-white/70">Deep cleaning for sealed surfaces</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="font-semibold text-white mb-2">Tarmac</div>
                  <p className="text-white/70">Gentle care to preserve surface integrity</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">What's Included</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Pre-treatment assessment",
                  "PowerUps Bio-Clean application",
                  "Professional pressure washing",
                  "Weed & moss removal",
                  "Joint re-sanding (block paving)",
                  "Post-clean biocide protection",
                  "Before/after documentation",
                  "Maintenance advice",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] flex-shrink-0 mt-1" />
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12 text-white">Our Driveway Cleaning Process</h2>
              <div className="grid md:grid-cols-5 gap-6">
                {[
                  { step: 1, title: "WhatsApp Consultation", desc: "Send us photos and details about your driveway for a fast, accurate assessment." },
                  { step: 2, title: "Property Visit", desc: "We inspect surface type, drainage, oil stains, and specific challenges on-site." },
                  { step: 3, title: "Preparation", desc: "Surrounding areas protected. Stubborn stains and oil spots pre-treated." },
                  { step: 4, title: "PowerUps Clean", desc: "Thorough cleaning at the right pressure with our biocide and degreaser treatments." },
                  { step: 5, title: "Quality Check", desc: "Final inspection, before/after photos, and maintenance advice to keep results lasting." },
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

        {/* Common Issues */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Common Issues We Solve</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Oil & Tyre Stains</h3>
                    <p className="text-white/80">Specialist degreasers lift deep-set oil and rubber marks from all driveway surfaces before pressure washing.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Moss & Algae Growth</h3>
                    <p className="text-white/80">PowerUps biocide treatments eliminate organic growth at the root and prevent regrowth for 12-18 months.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Weed Infestation</h3>
                    <p className="text-white/80">Complete weed removal from joints and cracks, with re-sanding of block paving to restore structural integrity.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">Faded Appearance</h3>
                    <p className="text-white/80">Restore original colour and surface vibrancy to block paving, concrete, tarmac, and resin driveways.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#1E90FF]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Driveway?</h2>
              <p className="text-xl text-white/90 mb-8">Serving Swanage, Purbeck, and surrounding areas in Dorset</p>
              <Button
                asChild
                size="lg"
                className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-6 text-lg
                           hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
              >
                <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        <ServiceFaqSection
          heading="Driveway Cleaning FAQs"
          subheading="Common questions about our driveway cleaning services across Purbeck and Dorset."
          faqs={[
            { q: "Can you remove oil stains from my driveway?", a: "Yes. We use specialist pre-treatment degreasers on oil and fuel stains before pressure washing. Most oil stains are significantly reduced or fully removed. Heavily ingrained stains may require multiple treatments." },
            { q: "Will pressure washing damage block paving?", a: "No, when done correctly. We use the right nozzle type and pressure setting for your specific paving material. After cleaning we can re-sand the joints to restore the surface to full structural integrity." },
            { q: "How long will my driveway stay clean?", a: "With our biocide treatment applied after cleaning, most driveways remain clean for 12-18 months. Shaded driveways or those under trees may see re-growth sooner. Annual maintenance keeps costs low and results consistent." },
            { q: "How long does driveway cleaning take?", a: "A standard residential driveway takes 2-4 hours. Larger driveways or those with heavy contamination, oil stains, or requiring joint re-sanding take longer. We give you an accurate timeframe after assessing your property." },
            { q: "Do I need to clear my driveway before you arrive?", a: "We ask that vehicles are moved from the area to be cleaned. We handle everything else, including moving any small obstacles. Heavy items like large plant pots should be moved beforehand if possible." },
          ]}
        />

        <PWBFooter />
      </main>
    </>
  )
}
