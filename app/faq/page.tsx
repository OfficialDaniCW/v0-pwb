import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { ChevronDown } from 'lucide-react'
import Script from "next/script"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata = {
  title: "Frequently Asked Questions | PowerWash Bros - Dorset Property Cleaning",
  description: "Common questions about our pressure washing, soft washing, and property maintenance services in Swanage, Purbeck, and across Dorset.",
}

export default function FAQPage() {
  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We provide a wide range of professional cleaning services, including residential cleaning (houses, driveways, patios, fences, and gutters), commercial cleaning (shopfronts, car parks, pavements, and graffiti removal), industrial cleaning (equipment, concrete, and tanks), and government property care (public spaces, monuments, and pavements). We specialise in pressure washing, soft washing, roof cleaning, window cleaning, render cleaning, and complete external property maintenance."
    },
    {
      question: "What areas do you cover in Dorset?",
      answer: "We proudly serve all of Purbeck including Swanage, Wareham, Corfe Castle, and surrounding villages. We also cover Bournemouth, Poole, Wimborne, Christchurch, Ferndown, and most of Dorset. If you're unsure whether we cover your location, feel free to contact us at info@powerwashbros.co.uk."
    },
    {
      question: "How much do your services cost?",
      answer: "Pricing depends on the size of your property, the service required, and site conditions. Use our pricing calculator for a rough estimate, or send us photos via WhatsApp for an accurate quote. Most driveways range from £100-£400, and we're always transparent about costs upfront."
    },
    {
      question: "What's the difference between pressure washing and soft washing?",
      answer: "Pressure washing uses high-pressure water to clean hard surfaces like driveways and patios. Soft washing uses low pressure with specialised biocide treatments (PowerUps) to clean delicate surfaces like roofs, render, and Purbeck stone without damage. We use the right method for each surface."
    },
    {
      question: "Will you damage my Purbeck stone patio or driveway?",
      answer: "No. We're specialists in cleaning Purbeck stone and understand its unique properties. We use pH-balanced, low-pressure techniques specifically designed for this precious local limestone. We preserve the natural patina whilst removing harmful organic growth."
    },
    {
      question: "How long do the results last?",
      answer: "With our PowerUps biocide treatments, most surfaces stay clean for 12-18 months. Shaded or damp areas may need re-treatment sooner. We also offer maintenance plans to keep your property looking its best year-round."
    },
    {
      question: "Do I need to be home during the cleaning?",
      answer: "Not necessarily. As long as we can access the areas to be cleaned and you've provided water supply access (if needed), we can work whilst you're out. We'll send before and after photos when we're done."
    },
    {
      question: "What is PowerUps and why do you use it?",
      answer: "PowerUps is a professional-grade range of biocide treatments we're trained and registered to use. Unlike DIY products, PowerUps kills organic growth at the root, prevents regrowth for longer, and is applied safely following strict environmental and safety protocols. See our PowerUps page for more details."
    },
    {
      question: "Can you clean my roof without damaging the tiles?",
      answer: "Yes. We use soft washing specifically for roofs - low pressure combined with biocide treatment that kills moss and lichen without damaging tiles, pointing, or forcing water under the roof covering. We never use high-pressure washing on roofs."
    },
    {
      question: "What if it rains after you've cleaned?",
      answer: "Rain actually helps! Once we've applied the biocide treatment, rain helps it penetrate deeper into the surface and continue working. The cleaning results won't wash away - in fact, you'll often see continued improvement over the following weeks."
    },
    {
      question: "Do you offer regular maintenance services?",
      answer: "Yes, we provide regular cleaning and maintenance packages tailored to your needs, whether for residential properties or large-scale commercial and industrial facilities. Many customers start with a deep clean to restore their property, then opt for annual or bi-annual maintenance to keep it looking great."
    },
    {
      question: "Do you offer commercial and industrial cleaning services?",
      answer: "We specialise in commercial and industrial cleaning, including shopfronts, car parks, heavy equipment, and large-scale surfaces like concrete or tanks. We work with businesses, letting agents, property managers, and commercial property owners across Dorset, and can schedule work outside business hours."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept a variety of payment methods, including bank transfers, credit/debit cards, and online payments. Details will be provided in your invoice to make payment as convenient as possible for you."
    },
    {
      question: "Are your cleaning methods environmentally friendly?",
      answer: "Yes! We use eco-friendly cleaning solutions and advanced equipment to minimise environmental impact while delivering exceptional results. Our PowerUps biocide treatments are professionally registered and applied following strict environmental and safety protocols."
    },
    {
      question: "How long does the cleaning process take?",
      answer: "The duration depends on the size and complexity of the project. For smaller residential jobs like a driveway or patio, it may take a few hours. Larger projects such as full house exteriors or commercial properties could take a full day or more. We'll give you a timeline when we provide the quote."
    },
    {
      question: "How do I get a quote?",
      answer: "You can request a quote by filling out our online quote form on our website, sending us photos via WhatsApp (07418 610731), or emailing us directly at info@powerwashbros.co.uk. Provide details about your property, the area size, and the services you need, and we'll get back to you with an estimate. Most driveways range from £100-£400, and we're always transparent about costs upfront."
    },
    {
      question: "Are you insured?",
      answer: "Yes, we carry full public liability insurance. We're also PASMA trained for working at height and registered biocide users, so you can trust us with your property."
    },
  ]

  return (
    <>
      <Script 
        id="faq-structured-data" 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  Frequently Asked Questions
                </h1>
                <p className="text-xl text-white/70">
                  Everything you need to know about our property cleaning services in Dorset
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="glass-border rounded-xl px-6 border-white/10"
                  >
                    <AccordionTrigger className="text-left text-white hover:text-[#1E90FF] hover:no-underline py-6">
                      <span className="text-lg font-semibold pr-4">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80 pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-12 glass-border-enhanced rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
                <p className="text-white/70 mb-6">
                  We're here to help. Get in touch and we'll answer any questions you have about your specific property.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/447418610731"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3 bg-[#00C853] text-white font-semibold rounded-lg hover:bg-[#00A843] transition-all"
                  >
                    Chat on WhatsApp
                  </a>
                  <a
                    href="tel:07418610731"
                    className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#1E90FF] text-[#1E90FF] font-semibold rounded-lg hover:bg-[#1E90FF] hover:text-white transition-all"
                  >
                    Call 07418 610731
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
