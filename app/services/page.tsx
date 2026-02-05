import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { ArrowRight, Droplets, Wind, Home, Fence, SparklesIcon, Building2, TreesIcon, Trash2, Sparkle, PaintBucket, Sun, Sprout, Brush, Landmark, Wrench, Store, Users } from 'lucide-react'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata = {
  title: "Our Services | PowerWash Bros | Dorset Property Maintenance",
  description: "Complete property care services across Dorset. From driveway cleaning to heritage building maintenance, we deliver expert biocide-trained care.",
}

export default function ServicesPage() {
  const serviceCategories = [
    {
      category: "Core Cleaning Services",
      services: [
        {
          title: "Pressure Washing",
          description: "High-pressure cleaning for driveways, patios, and hard surfaces across Swanage and Purbeck",
          href: "/services/pressure-washing",
          icon: Droplets,
        },
        {
          title: "Soft Washing",
          description: "Gentle, effective cleaning for delicate surfaces like render, painted walls, and heritage properties",
          href: "/services/softwash",
          icon: Wind,
        },
        {
          title: "Window Cleaning",
          description: "Crystal clear interior and exterior window cleaning for residential and commercial properties",
          href: "/services/window-cleaning",
          icon: SparklesIcon,
        },
        {
          title: "Glass & Mirror Cleaning",
          description: "Professional commercial glass cleaning including shop fronts and office buildings",
          href: "/services/glass-cleaning",
          icon: Sparkle,
        },
      ]
    },
    {
      category: "Roof & Gutter Services",
      services: [
        {
          title: "Roof Cleaning",
          description: "Expert moss removal and biocide treatment to protect your roof and extend its lifespan",
          href: "/services/roof-cleaning",
          icon: Home,
        },
        {
          title: "Gutter Cleaning",
          description: "Prevent water damage with professional gutter clearing and downpipe maintenance",
          href: "/services/gutter-cleaning",
          icon: Home,
        },
        {
          title: "Soffit & Fascia Cleaning",
          description: "Protect and clean eaves and rooflines to prevent water damage and maintain kerb appeal",
          href: "/services/soffit-cleaning",
          icon: Home,
        },
      ]
    },
    {
      category: "Walls & Render",
      services: [
        {
          title: "Render Cleaning",
          description: "Restore rendered walls with gentle soft washing techniques for Dorset properties",
          href: "/services/render-cleaning",
          icon: PaintBucket,
        },
        {
          title: "Exterior Walls",
          description: "Complete wall cleaning and restoration for all types of exterior cladding",
          href: "/services/exterior-walls",
          icon: Building2,
        },
      ]
    },
    {
      category: "Driveways & Outdoor Surfaces",
      services: [
        {
          title: "Driveway Cleaning",
          description: "Transform tired driveways back to pristine condition with biocide treatments",
          href: "/services/driveway-cleaning",
          icon: ArrowRight,
        },
        {
          title: "Patio & Decking",
          description: "Make outdoor spaces safe, beautiful, and inviting with professional cleaning",
          href: "/services/patio-decking",
          icon: Fence,
        },
      ]
    },
    {
      category: "Specialist Services",
      services: [
        {
          title: "Solar Panel Cleaning",
          description: "Maximise efficiency with regular professional solar panel cleaning across Purbeck",
          href: "/services/solar-panel-cleaning",
          icon: Sun,
        },
        {
          title: "De-Mossing Services",
          description: "Remove moss from all exterior surfaces including roofs, driveways, and paths",
          href: "/services/demossing",
          icon: Sprout,
        },
        {
          title: "Graffiti Removal",
          description: "Professional graffiti cleaning services for commercial and residential properties",
          href: "/services/graffiti-removal",
          icon: Brush,
        },
        {
          title: "Heritage Building Cleaning",
          description: "Specialist care for listed and historic Purbeck stone properties with heritage compliance",
          href: "/services/heritage-buildings",
          icon: Landmark,
        },
      ]
    },
    {
      category: "Property Maintenance",
      services: [
        {
          title: "External Property Maintenance",
          description: "Complete external maintenance packages for residential and commercial properties",
          href: "/services/external-property-maintenance",
          icon: Wrench,
        },
        {
          title: "Commercial Services",
          description: "Keep your business looking professional year-round with scheduled maintenance",
          href: "/services/commercial",
          icon: Store,
        },
        {
          title: "Residential Services",
          description: "Complete home exterior care for properties across Swanage, Purbeck and Dorset",
          href: "/services/residential",
          icon: Users,
        },
      ]
    }
  ]

  const serviceFaqs = [
    {
      question: "What's the difference between pressure washing and soft washing?",
      answer: "Pressure washing uses high-pressure water to clean hard surfaces like driveways and patios. Soft washing uses low pressure with specialised biocide treatments to clean delicate surfaces like roofs, render, and Purbeck stone without damage. We use the right method for each surface."
    },
    {
      question: "Will you damage my Purbeck stone patio or driveway?",
      answer: "No. We're specialists in cleaning Purbeck stone and understand its unique properties. We use pH-balanced, low-pressure techniques specifically designed for this precious local limestone. We preserve the natural patina whilst removing harmful organic growth."
    },
    {
      question: "What is PowerUps and why do you use it?",
      answer: "PowerUps is a professional-grade range of biocide treatments we're trained and registered to use. Unlike DIY products, PowerUps kills organic growth at the root, prevents regrowth for longer, and is applied safely following strict environmental and safety protocols."
    },
    {
      question: "How long do the results last?",
      answer: "With our PowerUps biocide treatments, most surfaces stay clean for 12-18 months. Shaded or damp areas may need re-treatment sooner. We also offer maintenance plans to keep your property looking its best year-round."
    },
    {
      question: "Can you clean my roof without damaging the tiles?",
      answer: "Yes. We use soft washing specifically for roofs - low pressure combined with biocide treatment that kills moss and lichen without damaging tiles, pointing, or forcing water under the roof covering. We never use high-pressure washing on roofs."
    },
    {
      question: "Do you offer regular maintenance services?",
      answer: "Yes, we provide regular cleaning and maintenance packages tailored to your needs, whether for residential properties or large-scale commercial and industrial facilities. Many customers start with a deep clean to restore their property, then opt for annual or bi-annual maintenance."
    }
  ]

  return (
    <main className="min-h-[100dvh] text-white">
      <SiteHeader />
      
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Complete property care across Swanage, Purbeck and Dorset, delivered by biocide-trained 
              specialists who understand your property's unique needs
            </p>
          </div>
        </div>
      </section>

      {/* Services by Category */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            {serviceCategories.map((category) => (
              <div key={category.category}>
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  {category.category}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service) => {
                    const IconComponent = service.icon
                    return (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="group glass-border rounded-xl p-6 hover:border-[#1E90FF] transition-all duration-300"
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1E90FF]/20 mb-4">
                          <IconComponent className="h-7 w-7 text-[#1E90FF]" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#1E90FF] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-white/70 mb-4 leading-relaxed text-sm">
                          {service.description}
                        </p>
                        <div className="flex items-center text-[#1E90FF] font-medium group-hover:gap-2 transition-all">
                          <span className="text-sm">Learn More</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Chat with us on WhatsApp and we'll help you find the right solution for your Dorset property
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/447418610731"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-[#1E90FF] font-bold rounded-lg px-8 py-4 text-lg
                           hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center border-2 border-white bg-transparent text-white font-bold rounded-lg px-8 py-4 text-lg
                           hover:bg-white hover:text-[#1E90FF] transition-all"
              >
                Request Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-primary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Common Questions About Our Services
              </h2>
              <p className="text-white/70 text-lg">
                Have questions about pressure washing, soft washing, or our specialist services? We've got answers.
              </p>
            </div>

            <div className="space-y-3">
              {serviceFaqs.map((faq, index) => (
                <Accordion key={index} type="single" collapsible>
                  <AccordionItem value={`faq-${index}`} className="border-border/50">
                    <AccordionTrigger className="text-lg font-medium text-white hover:text-[#1E90FF] transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-white/70 mb-4">
                Need more information?
              </p>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center bg-[#1E90FF] text-white font-bold rounded-lg px-8 py-3
                           hover:bg-[#1E90FF]/90 hover:shadow-lg transition-all"
              >
                View All FAQs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PWBFooter />
    </main>
  )
}
