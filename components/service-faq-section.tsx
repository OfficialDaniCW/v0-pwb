import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export interface ServiceFaq {
  q: string
  a: string
}

interface ServiceFaqSectionProps {
  faqs: ServiceFaq[]
  /** Heading shown above the accordion. Defaults to "Frequently Asked Questions" */
  heading?: string
  /** Optional subheading shown below the main heading */
  subheading?: string
}

/**
 * Shared FAQ section used across all service pages.
 * Matches the glass-bubble accordion style of the dedicated /faq page
 * so the theme is fully consistent site-wide.
 */
export function ServiceFaqSection({
  faqs,
  heading = "Frequently Asked Questions",
  subheading,
}: ServiceFaqSectionProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">{heading}</h2>
            {subheading && (
              <p className="text-lg text-white/70">{subheading}</p>
            )}
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-border rounded-xl px-6 border-white/10"
              >
                <AccordionTrigger className="text-left text-white hover:text-[#1E90FF] hover:no-underline py-6">
                  <span className="text-lg font-semibold pr-4">{faq.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-white/80 pb-6 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 glass-border-enhanced rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
            <p className="text-white/70 mb-6">
              We're here to help. Get in touch and we'll answer any questions about your specific property.
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
              <Link
                href="/faq"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-[#1E90FF] text-[#1E90FF] font-semibold rounded-lg hover:bg-[#1E90FF] hover:text-white transition-all"
              >
                View All FAQs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
