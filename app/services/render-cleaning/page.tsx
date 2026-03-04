import { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { PWBFooter } from '@/components/pwb-footer'
import { Button } from '@/components/ui/button'
import { MessageCircle, Home, Shield } from 'lucide-react'
import Script from 'next/script'
import { createServiceBreadcrumbs } from '@/lib/schema-utils'

export const metadata: Metadata = {
  title: 'Render Cleaning Swanage & Purbeck | K-Rend & Monocouche Cleaning',
  description: 'Professional render cleaning in Swanage, Purbeck & Dorset. Remove green algae, black spots from K-rend, monocouche, painted render. Expert render softwash.',
  keywords: 'render cleaning swanage, render cleaning purbeck, k-rend cleaning dorset, monocouche cleaning swanage, painted render cleaning',
}

export default function RenderCleaningPage() {
  const breadcrumbSchema = createServiceBreadcrumbs("Render Cleaning", "render-cleaning")
  
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Render Cleaning",
    "description": "Professional render cleaning in Swanage, Purbeck & Dorset. Remove green algae and black spots from K-rend and monocouche.",
    "serviceType": "Render Cleaning, K-Rend Cleaning, Softwash",
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
      "priceRange": "£200-£800"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "150"
    }
  }

  return (
    <>
      <Script id="service-schema-render" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SiteHeader />
      <main className="min-h-screen bg-[#0B1E3F] text-white">
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0B1E3F]">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-[#1E90FF]">Home</Link>
              {' > '}
              <Link href="/services" className="hover:text-[#1E90FF]">Services</Link>
              {' > '}
              <span className="text-white">Render Cleaning</span>
            </nav>
            
            <div className="inline-block px-4 py-2 bg-[#1E90FF]/20 rounded-full mb-6">
              <span className="text-[#1E90FF] font-semibold">Render Cleaning & Softwash</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-white">
              Professional Render Cleaning in Swanage & Purbeck
            </h1>
            <p className="text-xl text-white/80 mb-8 text-balance max-w-3xl mx-auto">
              Restore your render to pristine condition. Remove green algae, black spots and organic growth from K-rend, monocouche and painted render across Dorset.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#00C853] hover:bg-[#00A844] text-white" asChild>
                <a
                  href="https://wa.me/447418610731?text=Hi, I'd like a quote for render cleaning"
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
            <div className="border-2 border-[#1E90FF]/20 rounded-2xl p-8 md:p-12 bg-[#0B1E3F]/50">
              <h2 className="text-3xl font-bold mb-6 text-white">Why Render Gets Dirty in Purbeck</h2>
              <p className="text-lg text-white/80 mb-6">
                Swanage's coastal climate creates perfect conditions for algae and lichen growth on rendered walls. That green discolouration and black spotting isn't just unsightly – it's actively degrading your render's protective coating.
              </p>
              <p className="text-lg text-white/80 mb-6">
                Modern K-rend and monocouche systems are designed to repel water, but organic growth compromises this protection. Professional cleaning restores both appearance and weather resistance for your Purbeck property.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="border-2 border-[#1E90FF]/20 rounded-xl p-6 bg-[#0B1E3F]/30">
                  <Home className="h-8 w-8 text-[#1E90FF] mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-white">Kerb Appeal Restoration</h3>
                  <p className="text-white/70">
                    Clean render dramatically improves property appearance. Essential for maintaining value in Dorset's property market.
                  </p>
                </div>
                <div className="border-2 border-[#1E90FF]/20 rounded-xl p-6 bg-[#0B1E3F]/30">
                  <Shield className="h-8 w-8 text-[#1E90FF] mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-white">Soft Wash Protection</h3>
                  <p className="text-white/70">
                    Low-pressure biocide treatment kills organic growth without damaging delicate render finishes or colour coatings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0B1E3F]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-[#1E90FF] rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Restore Your Render Today</h2>
              <p className="text-xl text-white/90 mb-8">
                Professional render cleaning across Swanage, Purbeck and Dorset. Safe for all render types with guaranteed results.
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
      <ServiceFaqSection
        heading="Render Cleaning FAQs"
        subheading="Common questions about our render cleaning services across Purbeck and Dorset."
        faqs={[
          { q: "Why does render go green and black?", a: "Green staining is algae growth encouraged by moisture, shade, and Dorset's coastal humidity. Black spotting is lichen or atmospheric carbon. Both are effectively removed by soft washing with biocide treatment and will not damage your render." },
          { q: "Is soft washing safe for K-rend and monocouche?", a: "Yes. Soft washing is the only professionally recommended method for modern through-coloured renders like K-rend and monocouche. High-pressure washing risks stripping the surface layer and is not appropriate for these materials." },
          { q: "Will cleaning change the colour of my render?", a: "No. Cleaning removes contamination and restores the original colour. We do not bleach or chemically alter the substrate. The result is your original render colour, not a lighter or different tone." },
          { q: "How long does render cleaning last?", a: "With our biocide treatment, render typically stays clean for 12-18 months. North-facing and heavily shaded walls may see regrowth sooner due to persistent moisture. We offer maintenance plans to keep results consistent." },
          { q: "Can you clean pebbledash and painted render?", a: "Yes. We adjust our treatment and pressure settings for pebbledash, painted, and roughcast render surfaces. We use products compatible with all common render types found on Dorset properties." },
        ]}
      />
              </main>
      <PWBFooter />
    </>
  )
}
