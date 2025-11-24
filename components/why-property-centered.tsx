import { Search, Wrench, Award } from 'lucide-react'

export function WhyPropertyCentered() {
  const features = [
    {
      number: "01",
      icon: Search,
      title: "Understand Your Property",
      description: "From Victorian terraces to modern builds, heritage structures to commercial spaces - we take time to understand your property's unique needs, materials, and challenges. Our biocide-trained team assesses surface types, access, and specific issues before recommending solutions."
    },
    {
      number: "02",
      icon: Wrench,
      title: "Bespoke Solutions",
      description: "No cookie-cutter quotes. We assess drainage, location, surface materials, organic growth levels, and structural considerations to deliver exactly what YOUR property needs. Our PowerUps chemical range ensures we have the right solution for every situation."
    },
    {
      number: "03",
      icon: Award,
      title: "Restore Pride & Prevent Damage",
      description: "Whether it's your family home, business frontage, or historic building - we make it something you're proud of again. More importantly, we prevent costly damage through regular maintenance and expert care."
    }
  ]

  return (
    <section 
      className="py-24 relative"
      style={{
        backgroundImage: 'url(/backgrounds/pwb-dark-white.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-[#0B1E3F]/80 z-0" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Property-Centred Matters
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We don't believe in one-size-fits-all cleaning. Every property has its own character, challenges, and story.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.number} className="glass-border rounded-xl p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-6xl font-bold text-[#1E90FF]/20 mb-4">
                  {feature.number}
                </div>
                <feature.icon className="h-12 w-12 text-[#1E90FF] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
