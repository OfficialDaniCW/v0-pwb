import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

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
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Driveway Cleaning and Restoration",
    provider: {
      "@type": "LocalBusiness",
      name: "PowerWash Bros",
      image: "https://powerwashbros.co.uk/logo.png",
      telephone: "+447418610731",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Swanage",
        addressRegion: "Dorset",
        postalCode: "BH19",
        addressCountry: "GB",
      },
    },
    areaServed: [
      {
        "@type": "City",
        name: "Swanage",
      },
      {
        "@type": "AdministrativeArea",
        name: "Purbeck",
      },
      {
        "@type": "AdministrativeArea",
        name: "Dorset",
      },
    ],
    description:
      "Professional driveway cleaning and restoration services across Purbeck and Dorset. Transform tired driveways back to pristine condition using biocide treatments and expert techniques.",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "GBP",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
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

              {/* Before/After Image Placeholder */}
              <div className="mt-12 glass-border rounded-2xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-[#0B1E3F] to-[#1E90FF]/20 flex items-center justify-center">
                  <p className="text-white/60">Before/After Driveway Transformation</p>
                </div>
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
                    <CheckCircle2 className="h-6 w-6 text-[#00C853] flex-shrink-0 mt-0.5" />
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
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Our 5-Step Process</h2>
              <div className="space-y-6">
                {[
                  {
                    number: "01",
                    title: "WhatsApp Consultation",
                    description: "Send us photos and details about your driveway",
                  },
                  {
                    number: "02",
                    title: "Property Assessment",
                    description: "We visit to evaluate surface type, drainage, and specific challenges",
                  },
                  {
                    number: "03",
                    title: "Preparation & Protection",
                    description: "We protect surrounding areas and pre-treat stubborn stains",
                  },
                  {
                    number: "04",
                    title: "Professional Cleaning with PowerUps",
                    description: "Thorough cleaning using appropriate pressure and our biocide treatments",
                  },
                  {
                    number: "05",
                    title: "Quality Check & Maintenance Advice",
                    description: "Final inspection and guidance on keeping your driveway pristine",
                  },
                ].map((step) => (
                  <div key={step.number} className="glass-border rounded-xl p-6 flex gap-6">
                    <div className="text-4xl font-bold text-[#1E90FF]/30">{step.number}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-white/70">{step.description}</p>
                    </div>
                  </div>
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
                <div className="glass-border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Oil & Tire Stains</h3>
                  <p className="text-white/70">
                    Specialised treatments to lift deep-set oil stains and rubber marks from your driveway surface.
                  </p>
                </div>
                <div className="glass-border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Moss & Algae Growth</h3>
                  <p className="text-white/70">
                    Biocide treatments that eliminate organic growth at the root and prevent regrowth for months.
                  </p>
                </div>
                <div className="glass-border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Weed Infestation</h3>
                  <p className="text-white/70">
                    Complete weed removal from joints and cracks, with preventative treatments to stop return.
                  </p>
                </div>
                <div className="glass-border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Faded Appearance</h3>
                  <p className="text-white/70">
                    Restore original colour and vibrancy to block paving and concrete surfaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Driveway?</h2>
              <p className="text-xl text-white/90 mb-8">Serving Swanage, Purbeck, and surrounding areas</p>
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
