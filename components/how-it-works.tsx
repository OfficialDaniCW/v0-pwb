import { MessageCircle, ClipboardCheck, FileText, Sparkles, BookOpen } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: MessageCircle,
      title: "WhatsApp Conversation",
      description: "Message us with your property details and photos. We'll ask the right questions to understand your needs."
    },
    {
      number: "02",
      icon: ClipboardCheck,
      title: "Free Property Assessment",
      description: "We visit to evaluate surfaces, drainage, access, and specific challenges. No obligation, just honest advice."
    },
    {
      number: "03",
      icon: FileText,
      title: "Transparent Quote",
      description: "Clear pricing based on your property's unique requirements. What you see is what you pay."
    },
    {
      number: "04",
      icon: Sparkles,
      title: "Professional Clean",
      description: "Our biocide-trained team uses the right techniques and PowerUps products for your specific surfaces."
    },
    {
      number: "05",
      icon: BookOpen,
      title: "Results & Maintenance Advice",
      description: "Before/after documentation plus expert guidance on keeping your property looking its best."
    }
  ]

  return (
    <section 
      className="py-24 relative"
      style={{
        backgroundImage: 'url(/backgrounds/pwb-white-subtle.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'soft-light'
      }}
    >
      <div className="absolute inset-0 bg-[#0B1E3F]/90 z-0" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-white/70">
              Simple, transparent, professional
            </p>
          </div>

          <div className="relative">
            {/* Steps */}
            <div className="grid md:grid-cols-5 gap-8 relative">
              {steps.map((step, index) => (
                <div key={step.number} className="flex flex-col items-center text-center">
                  <div className="glass-border rounded-full w-20 h-20 flex items-center justify-center mb-4 bg-[#0B1E3F]/50 relative z-10">
                    <step.icon className="h-10 w-10 text-[#1E90FF]" />
                  </div>
                  <div className="text-4xl font-bold text-[#1E90FF]/20 mb-2">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
