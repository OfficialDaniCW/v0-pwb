import { Button } from "@/components/ui/button"
import { Award, Shield, Star, Home } from 'lucide-react'

export function FinalCTA() {
  const trustElements = [
    { icon: Award, text: "Biocide Trained & Registered" },
    { icon: Shield, text: "Fully Insured" },
    { icon: Star, text: "4.9★ Google Rating" },
    { icon: Home, text: "Dorset Based & Owned" }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-[#1E90FF] to-[#1E90FF]/80">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Property?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Chat with us on WhatsApp • Free assessments • No obligation quotes • Usually respond within 2 hours
          </p>

          <Button
            asChild
            size="lg"
            className="bg-white text-[#1E90FF] font-bold rounded-lg px-12 py-8 text-xl
                       hover:bg-white/90 hover:shadow-2xl hover:scale-105
                       transition-all duration-300"
          >
            <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
              Start WhatsApp Conversation
            </a>
          </Button>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {trustElements.map((element) => (
              <div key={element.text} className="flex flex-col items-center gap-2">
                <element.icon className="h-8 w-8 text-white" />
                <span className="text-sm text-white/90 text-center">{element.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
