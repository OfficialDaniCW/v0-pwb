import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home, Shield } from 'lucide-react'
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { ServiceFaqSection } from "@/components/service-faq-section"
import Script from "next/script"
import { createServiceBreadcrumbs } from "@/lib/schema-utils"

export const metadata: Metadata = {
  title: 'Soffit & Fascia Cleaning Swanage & Purbeck | PowerWash Bros',
  description: 'Professional soffit, fascia and bargeboard cleaning in Swanage & Purbeck. Remove black stains and restore your roofline. Expert service.',
  alternates: {
    canonical: "https://powerwashbros.co.uk/services/soffit-cleaning",
  },
}

export default function SoffitCleaningPage() {
  const breadcrumbSchema = createServiceBreadcrumbs("Soffit & Fascia Cleaning", "soffit-cleaning")
  
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Soffit & Fascia Cleaning",
    "description": "Professional soffit, fascia and bargeboard cleaning in Swanage & Purbeck. Remove black stains and restore your roofline.",
    "serviceType": "Soffit Cleaning, Fascia Cleaning, Roofline Cleaning",
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
      "priceRange": "£150-£500"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "150"
    }
  }

  return (
    <>
      <Script id="breadcrumb-schema-soffit" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="service-schema-soffit" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
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
              <span className="text-white">Soffit & Fascia Cleaning</span>
            </nav>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Professional Soffit & Fascia Cleaning in Swanage & Purbeck
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Remove unsightly black stains and organic growth from your roofline. Specialist cleaning for soffits, fascias and bargeboards across Dorset.
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
            <div className="text-sm text-white/60 mb-4">
              <Link href="/" className="hover:text-[#1E90FF]">Home</Link>
              {" > "}
              <Link href="/services" className="hover:text-[#1E90FF]">Services</Link>
              {" > "}
              <span className="text-white">Soffit & Fascia Cleaning</span>
            </div>
            <h2 className="text-3xl font-bold mb-8 text-white">
              Why Soffit & Fascia Cleaning Matters in Purbeck
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg mb-4 text-white/80">
                  Those black streaks on your white soffits and fascias aren't just unsightly - they're artillery fungus and algae that degrade uPVC over time. In Swanage's coastal climate, your roofline faces:
                </p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                    <span><strong>Artillery fungus</strong> creating permanent black spots that resist normal cleaning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                    <span><strong>Algae growth</strong> from coastal moisture degrading uPVC surfaces</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                    <span><strong>Moss buildup</strong> in soffit vents blocking ventilation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                    <span><strong>Reduced property value</strong> from neglected appearance</span>
                  </li>
                </ul>
              </div>
              <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-semibold mb-4 text-white">
                    The Hidden Damage
                  </h3>
                  <p className="mb-4 text-white/80">
                    Black stains aren't just cosmetic. They indicate:
                  </p>
                  <ul className="space-y-2 text-sm text-white/80 text-left">
                    <li>• uPVC surface degradation and brittleness</li>
                    <li>• Blocked ventilation causing damp issues</li>
                    <li>• Potential rot behind fascia boards</li>
                    <li>• Reduced roofline lifespan</li>
                  </ul>
                  <p className="mt-4 font-semibold text-[#1E90FF]">
                    Regular cleaning prevents expensive replacements.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-white">
              Complete Roofline Care for Purbeck Properties
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                <CardContent className="p-6">
                  <Home className="h-8 w-8 text-[#1E90FF] mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Complete Roofline Care
                  </h3>
                  <p className="text-white/80">
                    We clean all roofline components: soffits, fascias, bargeboards, and guttering, ensuring comprehensive protection for your Swanage property.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                <CardContent className="p-6">
                  <Shield className="h-8 w-8 text-[#1E90FF] mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    PASMA Safe Access
                  </h3>
                  <p className="text-white/80">
                    Our PASMA-trained technicians safely access all heights, protecting both your property and our team during specialist roofline cleaning.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Soffit & Fascia Cleaning Pricing
            </h2>
            <p className="text-lg mb-6 text-white/80">
              Pricing depends on roofline length and access requirements:
            </p>
            <Card className="bg-[#1E90FF] text-white">
              <CardContent className="p-8 text-center">
                <p className="text-xl mb-4">
                  <strong>Typical Purbeck property:</strong> £150-350
                </p>
                <p className="mb-6 text-white/80">
                  Get a free quote based on YOUR property
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-8 text-xl
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
              Restore Your Roofline Today
            </h2>
            <p className="text-xl mb-8 opacity-90 text-white/80">
              Professional soffit and fascia cleaning across Swanage and Purbeck
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-8 text-xl
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
        heading="Soffit & Fascia Cleaning FAQs"
        subheading="Common questions about our soffit and fascia cleaning services across Purbeck and Dorset."
        faqs={[
          { q: "What are soffits and fascias?", a: "Fascias are the boards fixed directly behind your gutters. Soffits are the boards fitted underneath the fascias on the underside of your roof overhang. Both protect the roof structure from weather and pests and are highly visible from street level." },
          { q: "Why do soffits go green or black?", a: "Algae, lichen, and atmospheric pollution cause green and black discolouration on UPVC, timber, and painted soffits. Coastal properties in Swanage and Purbeck are particularly susceptible due to salt-laden air increasing moisture retention." },
          { q: "Can you clean painted timber soffits without causing damage?", a: "Yes. We use soft washing techniques at low pressure with appropriate biocide treatments that clean without stripping paint or damaging timber grain. This is far safer than pressure washing painted surfaces." },
          { q: "How often should soffits and fascias be cleaned?", a: "Annual cleaning is recommended for most Dorset properties. Properties in shaded or coastal positions may benefit from cleaning every 6-12 months to prevent heavy build-up." },
          { q: "Do you clean gutters at the same time?", a: "Yes. We commonly combine soffit and fascia cleaning with a full gutter clearance visit. This is more cost-effective and ensures your entire roofline is maintained in one appointment." },
        ]}
      />

      <PWBFooter />
    </>
  )
}
