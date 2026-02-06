import { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { PWBFooter } from '@/components/pwb-footer'
import { Button } from '@/components/ui/button'
import { MessageCircle, Leaf, Shield, AlertTriangle } from 'lucide-react'
import Script from 'next/script'
import { createServiceBreadcrumbs } from '@/lib/schema-utils'

export const metadata: Metadata = {
  title: 'De-Mossing Services Swanage & Purbeck | Roof & Surface De-Mossing',
  description: 'Professional de-mossing services in Swanage, Purbeck & Dorset. Remove moss, algae, lichen from roofs, driveways, patios. Expert moss removal.',
  keywords: 'demossing swanage, demossing purbeck, moss removal swanage, moss removal dorset, roof demossing purbeck, driveway demossing',
}

export default function DemossingPage() {
  const breadcrumbSchema = createServiceBreadcrumbs("De-Mossing", "demossing")
  
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "De-Mossing Services",
    "description": "Professional de-mossing services for roofs, driveways, and all surfaces in Swanage, Purbeck, and Dorset",
    "serviceType": "De-Mossing, Moss Removal, Algae Removal",
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
      "priceRange": "£100-£500"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "150"
    }
  }

  return (
    <>
      <Script id="breadcrumb-schema-demossing" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="service-schema-demossing" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SiteHeader />
      <main className="min-h-screen bg-[#0B1E3F] text-white">
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0B1E3F]">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-[#1E90FF]">Home</Link>
              {' > '}
              <Link href="/services" className="hover:text-[#1E90FF]">Services</Link>
              {' > '}
              <span className="text-white">De-Mossing</span>
            </nav>
            
            <div className="inline-block px-4 py-2 bg-[#1E90FF]/20 rounded-full mb-6">
              <span className="text-[#1E90FF] font-semibold">De-Mossing Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-white">
              Expert De-Mossing Services in Swanage & Purbeck
            </h1>
            <p className="text-xl text-white/80 mb-8 text-balance max-w-3xl mx-auto">
              Professional moss, algae and lichen removal from roofs, driveways, patios and walls across Dorset. Long-lasting results with biocide treatment.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#00C853] hover:bg-[#00A844] text-white" asChild>
                <a
                  href="https://wa.me/447418610731?text=Hi, I'd like a quote for demossing services"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-[#1E90FF] bg-transparent text-[#1E90FF] hover:bg-[#1E90FF] hover:text-white" asChild>
                <Link href="/quote">Get Free Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A1628]">
          <div className="max-w-4xl mx-auto">
            <div className="border-2 border-red-500/30 bg-red-950/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                <AlertTriangle className="h-8 w-8 text-red-400" />
                Why Moss is Dangerous for Purbeck Properties
              </h2>
              <div className="space-y-4 text-white/80">
                <div>
                  <h3 className="font-semibold text-white mb-2">Roof Damage</h3>
                  <p>
                    Moss roots penetrate tiles, lifting them and allowing water ingress. In Swanage's wet climate, this causes £1000s in repair costs and internal damp damage.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Slip Hazards</h3>
                  <p>
                    Moss on driveways and patios creates treacherous surfaces, especially when wet. Professional removal eliminates this safety risk for your family.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Surface Degradation</h3>
                  <p>
                    Moss and lichen break down concrete, block paving, and render. De-mossing prevents premature surface replacement across your Purbeck property.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Property Value Impact</h3>
                  <p>
                    Moss-covered surfaces signal neglected maintenance to potential buyers. Professional de-mossing enhances kerb appeal and protects property value in Dorset.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0B1E3F]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              Our De-Mossing Process
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-2 border-[#1E90FF]/20 rounded-2xl p-6 bg-[#0B1E3F]/50">
                <Leaf className="h-10 w-10 text-[#1E90FF] mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Biocide Pre-Treatment</h3>
                <p className="text-white/70">
                  Our PowerUps range targets moss, algae and lichen at the root. This prevents rapid regrowth and ensures long-lasting results.
                </p>
              </div>
              <div className="border-2 border-[#1E90FF]/20 rounded-2xl p-6 bg-[#0B1E3F]/50">
                <Shield className="h-10 w-10 text-[#1E90FF] mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Gentle Removal</h3>
                <p className="text-white/70">
                  Soft washing techniques remove organic growth without high-pressure damage to delicate Purbeck stone or tiles.
                </p>
              </div>
              <div className="border-2 border-[#1E90FF]/20 rounded-2xl p-6 bg-[#0B1E3F]/50">
                <MessageCircle className="h-10 w-10 text-[#1E90FF] mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Prevention Advice</h3>
                <p className="text-white/70">
                  We provide maintenance guidance to slow regrowth and keep your Swanage property moss-free for longer.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A1628]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80 rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Protect Your Property from Moss Damage</h2>
              <p className="text-xl text-white/90 mb-8">
                Professional de-mossing services across Swanage, Purbeck and Dorset. Free quotes and guaranteed results.
              </p>
              <Button size="lg" className="bg-white text-[#1E90FF] hover:bg-white/90 font-bold" asChild>
                <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Get Quote via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <PWBFooter />
    </>
  )
}
