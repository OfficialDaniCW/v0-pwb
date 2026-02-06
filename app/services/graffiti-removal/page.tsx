import { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { PWBFooter } from '@/components/pwb-footer'
import { Button } from '@/components/ui/button'
import { MessageCircle, Shield, Zap } from 'lucide-react'
import Script from 'next/script'
import { createServiceBreadcrumbs } from '@/lib/schema-utils'

export const metadata: Metadata = {
  title: 'Graffiti Removal Swanage & Purbeck | Professional Graffiti Cleaning',
  description: 'Professional graffiti removal in Swanage, Purbeck & Dorset. Fast, effective graffiti cleaning for commercial and residential properties.',
  keywords: 'graffiti removal swanage, graffiti removal purbeck, graffiti cleaning dorset, graffiti removal service swanage',
}

export default function GraffitiRemovalPage() {
  const breadcrumbSchema = createServiceBreadcrumbs("Graffiti Removal", "graffiti-removal")
  
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Graffiti Removal & Cleaning",
    "description": "Professional graffiti removal in Swanage, Purbeck & Dorset. Fast, effective graffiti cleaning for commercial and residential properties.",
    "serviceType": "Graffiti Removal, Graffiti Cleaning",
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
      <Script id="breadcrumb-schema-graffiti" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="service-schema-graffiti" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SiteHeader />
      <main className="min-h-screen bg-[#0B1E3F] text-white">
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0B1E3F]">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-[#1E90FF]">Home</Link>
              {' > '}
              <Link href="/services" className="hover:text-[#1E90FF]">Services</Link>
              {' > '}
              <span className="text-white">Graffiti Removal</span>
            </nav>
            
            <div className="inline-block px-4 py-2 bg-[#1E90FF]/20 rounded-full mb-6">
              <span className="text-[#1E90FF] font-semibold">Graffiti Removal</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-white">
              Professional Graffiti Removal in Swanage & Purbeck
            </h1>
            <p className="text-xl text-white/80 mb-8 text-balance max-w-3xl mx-auto">
              Fast, effective graffiti cleaning for commercial and residential properties across Dorset. Restore your property's appearance quickly.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#00C853] hover:bg-[#00A844] text-white" asChild>
                <a
                  href="https://wa.me/447418610731?text=Hi, I need graffiti removal in Swanage"
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
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              Graffiti Removal Services
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-[#1E90FF]/20 rounded-2xl p-6 bg-[#0B1E3F]/50">
                <Zap className="h-10 w-10 text-[#1E90FF] mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Rapid Response</h3>
                <p className="text-white/70">
                  Quick graffiti removal prevents copycat vandalism. We offer fast response times across Purbeck for commercial properties.
                </p>
              </div>
              <div className="border-2 border-[#1E90FF]/20 rounded-2xl p-6 bg-[#0B1E3F]/50">
                <Shield className="h-10 w-10 text-[#1E90FF] mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Surface Safe Methods</h3>
                <p className="text-white/70">
                  Specialist chemicals and techniques remove graffiti without damaging brickwork, render, or painted surfaces in Swanage.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0B1E3F]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80 rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Need Graffiti Removed?</h2>
              <p className="text-xl text-white/90 mb-8">
                Professional graffiti removal across Swanage, Purbeck and Dorset. Contact us for rapid response.
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
