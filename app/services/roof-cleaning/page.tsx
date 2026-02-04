import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Phone, Droplets, Shield, Sparkles } from 'lucide-react'
import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import Script from "next/script"

// Declare breadcrumbSchema variable here
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://powerwashbros.co.uk/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://powerwashbros.co.uk/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Roof Cleaning",
      "item": "https://powerwashbros.co.uk/services/roof-cleaning"
    }
  ]
}

export const metadata: Metadata = {
  title: "Roof Cleaning & Moss Removal Swanage & Purbeck | Dorset Roof Cleaning | PowerWash Bros",
  description: "Professional roof cleaning, moss removal, and biocide treatment in Swanage, Purbeck, and Dorset. Expert roof specialists with biocide training. Protect your property. Free quotes.",
}

export default function RoofCleaningPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Roof Cleaning & Moss Removal",
    "description": "Professional roof cleaning, moss removal, and biocide treatment in Swanage, Purbeck, and Dorset",
    "serviceType": "Roof Cleaning, Moss Removal, Biocide Treatment",
    "provider": {
      "@type": "LocalBusiness",
      "name": "PowerWash Bros",
      "image": "https://powerwashbros.co.uk/logo.png",
      "telephone": "+447418610731",
      "email": "info@powerwashbros.co.uk",
      "url": "https://powerwashbros.co.uk",
      "areaServed": [
        { "@type": "City", "name": "Swanage" },
        { "@type": "City", "name": "Purbeck" },
        { "@type": "City", "name": "Corfe Castle" },
        { "@type": "City", "name": "Worth Matravers" },
        { "@type": "AdministrativeArea", "name": "Dorset" }
      ]
    },
    "offers": {
      "@type": "Offer",
      "url": "https://powerwashbros.co.uk/quote",
      "priceCurrency": "GBP",
      "priceRange": "£200-£800+"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "150"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How often should I clean my roof?",
        "acceptedAnswer": { "@type": "Answer", "text": "We recommend roof cleaning every 12-18 months in Dorset's climate to prevent moss and algae growth. Regular cleaning extends roof life and maintains property value." }
      },
      {
        "@type": "Question",
        "name": "Is biocide treatment safe for my roof?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, our biocide treatments are environmentally safe and specifically designed for roof cleaning. Our team is fully trained in biocide application and follows all safety protocols." }
      },
      {
        "@type": "Question",
        "name": "Will pressure washing damage my roof tiles?",
        "acceptedAnswer": { "@type": "Answer", "text": "Professional pressure washing is safe when done correctly. We use appropriate pressure settings for different tile types. Soft wash methods are used for delicate tiles. DIY pressure washing can cause damage." }
      },
      {
        "@type": "Question",
        "name": "How long does roof cleaning take?",
        "acceptedAnswer": { "@type": "Answer", "text": "Most residential roofs take 2-4 hours depending on size and moss coverage. We complete the job safely from the ground using professional equipment." }
      }
    ]
  }

  const schemaList = [breadcrumbSchema, serviceSchema, faqSchema]

  return (
    <>
      {schemaList.map((schema, idx) => (
        <Script key={idx} id={`roof-schema-${idx}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
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
                <span className="text-white">Roof Cleaning</span>
              </nav>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Professional Roof Cleaning in Swanage & Purbeck
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Protect your Purbeck property from costly water damage with expert roof cleaning and biocide moss treatment. Serving Swanage, Corfe Castle, Worth Matravers, and all of Purbeck.
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
                <span className="text-white">Roof Cleaning</span>
              </div>
              <h2 className="text-3xl font-bold mb-8 text-white">
                Why Roof Cleaning Matters in Purbeck
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg mb-4 text-white/80">
                    Purbeck's coastal climate creates perfect conditions for moss, algae, and lichen growth on roofs. Living in Swanage, Wareham, or anywhere across Purbeck means dealing with:
                  </p>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Heavy moss growth</strong> from damp coastal air and tree coverage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Blocked gutters</strong> causing water overflow and wall damage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Tile damage</strong> from moss roots penetrating joints</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1 flex-shrink-0" />
                      <span><strong>Water ingress</strong> leading to expensive interior repairs</span>
                    </li>
                  </ul>
                </div>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-2xl font-semibold mb-4 text-white">
                      The £200 vs £3000 Decision
                    </h3>
                    <p className="mb-4 text-white/80">
                      Regular roof maintenance typically costs £200-400 for a Purbeck property. Skip it, and you could face:
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Tile replacement: £1,500-3,000</li>
                      <li>• Rafter repairs: £2,000-5,000</li>
                      <li>• Interior water damage: £1,000-10,000+</li>
                      <li>• Emergency repairs: Premium rates</li>
                    </ul>
                    <p className="mt-4 font-semibold text-[#1E90FF]">
                      Prevention is always cheaper than repair.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Property-Centered Approach */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto glass-border rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-8 text-white">
                Property-Centered Roof Care for Purbeck
              </h2>
              <p className="text-lg mb-6 text-white/80">
                Every Purbeck property is different. A Victorian terrace in Swanage needs different care than a Purbeck stone cottage in Corfe Castle or a modern build in Wareham. We assess YOUR roof's specific needs.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Heritage Properties
                    </h3>
                    <p className="text-white/80">
                      Gentle cleaning techniques for historic Purbeck stone roofs and listed buildings. No high pressure that could damage original tiles.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Coastal Properties
                    </h3>
                    <p className="text-white/80">
                      Special attention to salt buildup and accelerated moss growth common in Swanage and coastal Purbeck locations.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Wooded Areas
                    </h3>
                    <p className="text-white/80">
                      Extra moss treatment for properties near Purbeck's wooded areas where organic debris and shade increase growth.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12 text-white">
                Our Roof Cleaning Process
              </h2>
              <div className="grid md:grid-cols-5 gap-6">
                {[
                  { step: 1, title: "WhatsApp Consultation", desc: "Share photos of your Purbeck property roof. We ask the right questions." },
                  { step: 2, title: "Free Assessment", desc: "We visit your property to inspect roof condition, moss levels, and access." },
                  { step: 3, title: "Gentle Cleaning", desc: "Hand scraping removes moss without damaging tiles. No risky pressure washing." },
                  { step: 4, title: "Biocide Treatment", desc: "PowerUps Bio-Clean prevents regrowth for 12-24 months. Professional strength." },
                  { step: 5, title: "Gutter Clear", desc: "All moss and debris cleared from gutters and downpipes. Photos provided." },
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

        {/* PowerUps Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-white">
                PowerUps Bio-Clean: Long-Term Protection
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-4 text-white/80">
                    Simple pressure washing removes surface moss but doesn't prevent regrowth. Within months, your Purbeck roof looks green again.
                  </p>
                  <p className="text-lg mb-4 text-white/80">
                    <strong>PowerUps Bio-Clean is different.</strong> Our biocide treatment:
                  </p>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                      <span>Kills moss, algae, and lichen at the root</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                      <span>Prevents regrowth for 12-24 months</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                      <span>Applied by biocide-trained professionals</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                      <span>Safe for your property when correctly applied</span>
                    </li>
                  </ul>
                </div>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-4 text-white">
                      Why Biocide Training Matters
                    </h3>
                    <p className="mb-4 text-white/80">
                      Biocides are powerful chemicals that require professional handling. Our team is fully trained and registered in their safe use.
                    </p>
                    <p className="mb-4 text-white/80">
                      This means we understand:
                    </p>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Correct dilution ratios for Purbeck climate</li>
                      <li>• Application timing and weather conditions</li>
                      <li>• Protection for plants and drainage</li>
                      <li>• Legal compliance and safety protocols</li>
                    </ul>
                    <Button
                      asChild
                      className="mt-4 bg-[#1E90FF] text-white font-bold rounded-lg px-8 py-6
                                hover:bg-[#1E90FF]/90 hover:shadow-2xl hover:scale-105 transition-all"
                    >
                      <a href="/about-powerups">Learn About PowerUps</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common Issues */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-white">
                Common Purbeck Roof Problems We Solve
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Heavy Moss Coverage
                    </h3>
                    <p className="text-white/80 mb-3">
                      Thick moss carpets holding moisture against tiles, particularly on north-facing roofs in Swanage and shaded Purbeck properties.
                    </p>
                    <p className="font-semibold text-[#1E90FF]">Our Solution:</p>
                    <p className="text-sm text-white/80">Gentle hand scraping + PowerUps Bio-Clean treatment for lasting results.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Blocked Gutters
                    </h3>
                    <p className="text-white/80 mb-3">
                      Moss and organic debris blocking water flow, causing overflow damage to Purbeck stone walls and foundations.
                    </p>
                    <p className="font-semibold text-[#1E90FF]">Our Solution:</p>
                    <p className="text-sm text-white/80">Complete gutter clearance included with every roof clean. Photos provided.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Tile Damage from Roots
                    </h3>
                    <p className="text-white/80 mb-3">
                      Moss roots penetrating under tiles and into mortar joints, lifting tiles and allowing water ingress.
                    </p>
                    <p className="font-semibold text-[#1E90FF]">Our Solution:</p>
                    <p className="text-sm text-white/80">Careful removal without further damage. Biocide prevents new root growth.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-2 border-[#1E90FF]/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Recurring Growth
                    </h3>
                    <p className="text-white/80 mb-3">
                      Purbeck's damp climate means moss returns quickly after standard cleaning, wasting your money.
                    </p>
                    <p className="font-semibold text-[#1E90FF]">Our Solution:</p>
                    <p className="text-sm text-white/80">PowerUps Bio-Clean treatment provides 12-24 month protection. Value that lasts.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Guidance */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Roof Cleaning Pricing for Purbeck Properties
              </h2>
              <p className="text-lg mb-6 text-white/80">
                Every roof is different. Pricing depends on:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                    <span>Property size and roof area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                    <span>Moss coverage level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                    <span>Roof type (tiles, slate, Purbeck stone)</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                    <span>Access difficulty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                    <span>Gutter condition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1E90FF] mt-1" />
                    <span>Property location in Purbeck</span>
                  </li>
                </ul>
              </div>
              <Card className="bg-[#1E90FF] text-white">
                <CardContent className="p-8 text-center">
                  <p className="text-xl mb-4">
                    <strong>Typical Purbeck property:</strong> £200-600
                  </p>
                  <p className="mb-6 text-white/80">
                    But don't guess - get a free, accurate quote based on YOUR roof
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
                Roof Cleaning FAQs
              </h2>
              <div className="space-y-6">
                {faqSchema.mainEntity.map((faq, i) => (
                  <Card key={i} className="bg-white/10 border-2 border-[#1E90FF]/20">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2 text-white">{faq.name}</h3>
                      <p className="text-white/80">{faq.acceptedAnswer.text}</p>
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
                Protect Your Purbeck Property Today
              </h2>
              <p className="text-xl mb-8 opacity-90 text-white/80">
                Free assessments • No obligation quotes • Usually respond within 2 hours
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
