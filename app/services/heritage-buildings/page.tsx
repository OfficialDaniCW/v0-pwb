import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ShieldCheck, FileText, Landmark } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { createServiceBreadcrumbs } from '@/lib/schema-utils'

export const metadata = {
  title: "Heritage & Listed Building Cleaning | PowerWash Bros | Purbeck",
  description: "Specialist cleaning for Grade I, II and II* listed buildings across Purbeck and Dorset. Expert care for Purbeck stone, heritage properties, and historic buildings.",
  openGraph: {
    title: "Heritage & Listed Building Cleaning | PowerWash Bros",
    description: "Specialist cleaning for listed buildings and Purbeck stone properties",
    url: "https://powerwashbros.co.uk/services/heritage-buildings",
    siteName: "PowerWash Bros",
    images: [
      {
        url: "/heritage-building-cleaning-purbeck.jpg",
        width: 1200,
        height: 630,
        alt: "Heritage building cleaning in Purbeck",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heritage & Listed Building Cleaning | PowerWash Bros",
    description: "Specialist cleaning for listed buildings and Purbeck stone properties",
    images: ["/heritage-building-cleaning-purbeck.jpg"],
  },
}

export default function HeritageBuildingsPage() {
  const breadcrumbSchema = createServiceBreadcrumbs("Heritage Buildings", "heritage-buildings")
  
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Heritage and Listed Building Cleaning",
    "provider": {
      "@type": "LocalBusiness",
      "name": "PowerWash Bros",
      "image": "https://powerwashbros.co.uk/logo.png",
      "telephone": "+447418610731",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Swanage",
        "addressRegion": "Dorset",
        "postalCode": "BH19",
        "addressCountry": "GB"
      }
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Swanage"
      },
      {
        "@type": "City",
        "name": "Corfe Castle"
      },
      {
        "@type": "City",
        "name": "Worth Matravers"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Purbeck"
      }
    ],
    "description": "Specialist cleaning for Grade I, II and II* listed buildings across Purbeck and Dorset. Expert care for Purbeck stone, heritage properties, and historic buildings.",
  }

  return (
    <>
      <Script id="breadcrumb-schema-heritage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
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
                <span className="text-white">Heritage Buildings</span>
              </nav>
              
              <div className="flex justify-center mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1E90FF]/20">
                  <Landmark className="h-10 w-10 text-[#1E90FF]" />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Heritage & Listed Building Cleaning
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Specialist care for Grade I, II and II* listed properties across Purbeck
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
                  <a href="/quote">Get Free Assessment</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Specialist Care Matters */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Why Heritage Buildings Need Specialist Care</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  Purbeck is home to hundreds of listed buildings - from medieval churches in Corfe Castle to 
                  Victorian cottages in Swanage, Georgian townhouses in Wareham to historic farmhouses in Worth Matravers. 
                  These buildings are more than properties; they're part of our shared heritage.
                </p>
                <p>
                  But heritage buildings require specialist knowledge. Standard pressure washing can:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Erode soft Purbeck stone and limestone</li>
                  <li>Damage historic lime mortar</li>
                  <li>Force water into porous materials causing frost damage</li>
                  <li>Remove protective patina developed over centuries</li>
                  <li>Destroy architectural details and fossil features</li>
                </ul>
                <p>
                  At PowerWash Bros, based in Swanage, we understand Purbeck stone intimately. We've cleaned 
                  Grade I and II* listed buildings across the area, always using techniques that preserve rather than damage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Heritage Approach */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Our Heritage Building Approach</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="glass-border rounded-xl p-6">
                  <ShieldCheck className="h-12 w-12 text-[#1E90FF] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">PASMA Trained</h3>
                  <p className="text-white/70">
                    Certified for safe working at height on historic structures
                  </p>
                </div>
                <div className="glass-border rounded-xl p-6">
                  <FileText className="h-12 w-12 text-[#1E90FF] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Full Documentation</h3>
                  <p className="text-white/70">
                    Detailed reports and photography for conservation officers
                  </p>
                </div>
                <div className="glass-border rounded-xl p-6">
                  <Landmark className="h-12 w-12 text-[#1E90FF] mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Local Knowledge</h3>
                  <p className="text-white/70">
                    Deep understanding of Purbeck stone and local building traditions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Clean */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Heritage Services</h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Purbeck Stone Facades",
                    description: "Gentle cleaning of Purbeck marble and limestone exteriors"
                  },
                  {
                    title: "Historic Roofs",
                    description: "Moss removal from slate, stone and clay tiles without damage"
                  },
                  {
                    title: "Churches & Religious Buildings",
                    description: "Respectful cleaning of sacred spaces and architectural details"
                  },
                  {
                    title: "Period Property Exteriors",
                    description: "Victorian, Georgian and older buildings cleaned with appropriate methods"
                  },
                  {
                    title: "Listed Building Courtyards",
                    description: "Historic paving and cobblestones restored carefully"
                  },
                  {
                    title: "Conservation Area Properties",
                    description: "Work complying with conservation area regulations"
                  }
                ].map((item) => (
                  <div key={item.title} className="glass-border rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/70">{item.description}</p>
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
              <h2 className="text-3xl font-bold text-white mb-8">Our Heritage Cleaning Process</h2>
              <div className="space-y-6">
                {[
                  {
                    number: "01",
                    title: "Heritage Assessment",
                    description: "We evaluate the building's age, materials, listing status and condition. We review any conservation requirements and liaise with conservation officers if needed."
                  },
                  {
                    number: "02",
                    title: "Method Statement",
                    description: "We create a detailed method statement documenting our approach, including test areas, materials used, and safety measures for your records and planning requirements."
                  },
                  {
                    number: "03",
                    title: "Test Areas",
                    description: "We always conduct small test areas first, allowing you and any conservation officers to approve our methods before proceeding."
                  },
                  {
                    number: "04",
                    title: "Gentle Cleaning",
                    description: "Using low-pressure soft wash systems, appropriate biocides, and techniques that respect historic materials, we clean your building carefully."
                  },
                  {
                    number: "05",
                    title: "Documentation & Aftercare",
                    description: "Comprehensive before/after photography, detailed reports for your records, and specific maintenance advice for heritage properties."
                  }
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

        {/* Purbeck Stone Expertise */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Understanding Purbeck Stone</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  Purbeck stone (technically Purbeck marble) is a fossiliferous limestone quarried locally for over 
                  2,000 years. It's in the walls of Westminster Abbey, Salisbury Cathedral, and countless Dorset buildings.
                </p>
                <p>
                  This beautiful stone is also porous and can be damaged by inappropriate cleaning. We understand:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The stone's fossilised shell composition</li>
                  <li>How water penetration causes spalling and frost damage</li>
                  <li>Why lime mortar must be protected during cleaning</li>
                  <li>The importance of the stone's natural patina</li>
                  <li>How biocides can be used safely on historic stone</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Protect Your Heritage Building
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Expert heritage cleaning across Purbeck - Swanage, Corfe Castle, Worth Matravers and beyond
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-8 text-xl
                           hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
              >
                <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                  Discuss Your Heritage Property
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
