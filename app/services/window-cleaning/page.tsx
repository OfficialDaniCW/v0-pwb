import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Shield, Sparkles, Clock } from 'lucide-react'
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Window Cleaning Swanage & Purbeck | Residential & Commercial | PowerWash Bros",
  description: "Professional window cleaning in Swanage and Purbeck. Interior and exterior. PASMA trained team. Streak-free results. Free quotes.",
}

export default function WindowCleaningPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Window Cleaning",
    "description": "Professional window cleaning in Swanage and Purbeck. Interior and exterior. PASMA trained team. Streak-free results.",
    "serviceType": "Window Cleaning, Residential Cleaning, Commercial Cleaning",
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
      "priceRange": "£80-£300"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "150"
    }
  }

  return (
    <>
      <Script id="service-schema-window" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
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
                <span className="text-white">Window Cleaning</span>
              </nav>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Professional Window Cleaning in Swanage & Purbeck
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Crystal-clear, streak-free windows for residential and commercial properties across Dorset. PASMA trained team delivering exceptional results.
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
                <span className="text-white">Window Cleaning</span>
              </div>
              <h2 className="text-3xl font-bold mb-8 text-white">
                Why Regular Window Cleaning Matters in Purbeck
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg mb-4 text-white/80">
                    In Swanage and across Purbeck, windows face constant assault from sea salt, coastal winds, and the region's unique climate. Living or working in Purbeck means dealing with:
                  </p>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Salt deposits</strong> from coastal spray causing permanent glass etching</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Hard water staining</strong> from Dorset's mineral-rich water</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Reduced natural light</strong> costing energy and wellbeing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Glass degradation</strong> requiring expensive replacement</span>
                    </li>
                  </ul>
                </div>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-2xl font-semibold mb-4 text-white">
                      The Light & Value Connection
                    </h3>
                    <p className="mb-4 text-white/80">
                      Clean windows provide measurable benefits:
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Up to 40% more natural light</li>
                      <li>• Reduced heating and lighting costs</li>
                      <li>• Extended window lifespan</li>
                      <li>• Enhanced property value</li>
                      <li>• Professional appearance</li>
                    </ul>
                    <p className="mt-4 font-semibold text-[#1E90FF]">
                      Regular cleaning protects your investment.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-white">
                Comprehensive Window Cleaning Services
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Residential Windows
                    </h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li>• Interior and exterior cleaning</li>
                      <li>• PVC frames and sills</li>
                      <li>• Skylights and roof windows</li>
                      <li>• Ground to high-level access</li>
                      <li>• One-off or regular service</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Commercial Windows
                    </h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li>• Shop fronts and displays</li>
                      <li>• Office buildings</li>
                      <li>• Hotels and B&Bs</li>
                      <li>• Restaurants and cafes</li>
                      <li>• Flexible scheduling</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Specialist Cleaning
                    </h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li>• Hard water stain removal</li>
                      <li>• Paint splatter removal</li>
                      <li>• Post-construction cleaning</li>
                      <li>• Mirror and glass surfaces</li>
                      <li>• Heritage property care</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-white">
                Why Professional Window Cleaning Matters
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <Shield className="h-8 w-8 text-[#1E90FF] mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Prevents Glass Degradation
                    </h3>
                    <p className="text-white/80">
                      Salt deposits and mineral buildup permanently etch glass. Regular cleaning protects your investment and extends window lifespan.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <Sparkles className="h-8 w-8 text-[#1E90FF] mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Maximises Natural Light
                    </h3>
                    <p className="text-white/80">
                      Clean windows allow up to 40% more light, reducing energy costs and creating brighter, healthier living spaces.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <Clock className="h-8 w-8 text-[#1E90FF] mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Property Value Protection
                    </h3>
                    <p className="text-white/80">
                      Regular maintenance prevents costly replacements. Clean windows enhance kerb appeal and maintain property value.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <CheckCircle className="h-8 w-8 text-[#1E90FF] mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Professional Standards
                    </h3>
                    <p className="text-white/80">
                      PASMA trained technicians ensure safe access to all windows. Fully insured for complete peace of mind.
                    </p>
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
                Transparent Pricing for Window Cleaning
              </h2>
              <p className="text-lg mb-8 text-white/80">
                Pricing varies based on property size, window quantity, and access requirements:
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-[#1E90FF] mb-2">£45-65</div>
                    <p className="text-white mb-2">2-3 Bedroom House</p>
                    <p className="text-sm text-white/80">Exterior cleaning, standard access</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-[#1E90FF] mb-2">£65-95</div>
                    <p className="text-white mb-2">4-5 Bedroom House</p>
                    <p className="text-sm text-white/80">Interior & exterior available</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-[#1E90FF] mb-2">Custom</div>
                    <p className="text-white mb-2">Commercial Properties</p>
                    <p className="text-sm text-white/80">Contact for tailored quote</p>
                  </CardContent>
                </Card>
              </div>
              <Card className="bg-[#1E90FF] text-white">
                <CardContent className="p-8 text-center">
                  <p className="text-xl mb-4">
                    Regular maintenance packages available with discounted rates
                  </p>
                  <p className="mb-6 text-white/80">
                    Get a free quote specific to your Purbeck property
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

        {/* FAQ */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-white">
                Window Cleaning FAQs
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "How often should I clean windows in Purbeck?",
                    a: "Residential properties typically benefit from quarterly cleaning. Coastal properties in Swanage or commercial premises may need monthly service due to increased salt spray and footfall."
                  },
                  {
                    q: "Do you clean inside and outside?",
                    a: "Yes. We offer both interior and exterior window cleaning. Most residential clients choose exterior-only for regular maintenance, with interior cleaning added annually or bi-annually."
                  },
                  {
                    q: "What about hard-to-reach windows?",
                    a: "Our PASMA-trained team safely accesses windows up to 3 storeys. We use professional ladders and reach-and-wash systems for challenging Purbeck properties."
                  },
                  {
                    q: "Will you damage window frames?",
                    a: "No. We use appropriate cleaning solutions for each frame type - PVC, wood, or aluminium. Our methods protect seals and fixtures."
                  },
                  {
                    q: "Can you remove hard water stains?",
                    a: "Yes. Dorset's hard water causes stubborn mineral deposits. We use specialist treatments to restore clarity without damaging glass."
                  },
                ].map((faq, i) => (
                  <Card key={i} className="bg-white/10 border-2 border-[#1E90FF]/20">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2 text-white">{faq.q}</h3>
                      <p className="text-white/80">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 text-white">
                Ready for Crystal-Clear Windows?
              </h2>
              <p className="text-xl mb-8 opacity-90 text-white/80">
                Professional window cleaning across Swanage and Purbeck
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

        <PWBFooter />
      </main>
    </>
  )
}
