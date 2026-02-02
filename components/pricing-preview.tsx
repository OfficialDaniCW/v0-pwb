"use client"

import { Button } from "@/components/ui/button"
import { Calculator, MessageCircle, ArrowRight, CheckCircle2, Droplets, Home, Square } from "lucide-react"
import Link from "next/link"

export function PricingPreview() {
  const services = [
    {
      name: "Gutter Cleaning",
      description: "Per linear metre",
      price: "£6",
      unit: "/metre",
      typical: "Average 3-bed semi: £90-£120",
      features: ["Full debris removal", "Downpipe clearing", "Flow testing", "Before/after photos"],
      icon: Droplets,
      color: "#60A5FA",
    },
    {
      name: "Roof Cleaning",
      description: "Per square metre",
      price: "£9",
      unit: "/m²",
      typical: "Average 3-bed semi: £900-£1,350",
      features: ["Moss & algae removal", "Soft washing method", "Ridge & valley clean", "Biocide treatment extra"],
      icon: Home,
      color: "#F59E0B",
    },
    {
      name: "Patio Cleaning",
      description: "Per square metre",
      price: "£3",
      unit: "/m²",
      typical: "Average patio 20m²: £60-£90",
      features: ["Deep pressure clean", "Weed removal", "Stain treatment", "Re-sanding available"],
      icon: Square,
      color: "#34D399",
    },
  ]

  return (
    <section className="relative py-16 sm:py-20 bg-[#0A1628]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E90FF]/10 border border-[#1E90FF]/30 mb-4">
              <Calculator className="h-5 w-5 text-[#1E90FF]" />
              <span className="text-sm font-semibold text-[#1E90FF]">Transparent Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Average Service Quotes</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Professional property maintenance with no hidden costs. Get an instant estimate below.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div
                  key={service.name}
                  className="group relative bg-[#0F2851]/50 backdrop-blur-sm border border-white/10 rounded-xl p-6
                         hover:border-white/30 hover:bg-[#0F2851]/80 transition-all duration-300
                         hover:scale-105 hover:shadow-xl"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  {/* Service Icon */}
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    <IconComponent className="h-6 w-6" style={{ color: service.color }} />
                  </div>

                  {/* Service Name */}
                  <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-sm text-white/60 mb-4">{service.description}</p>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">{service.price}</span>
                      <span className="text-lg text-white/60">{service.unit}</span>
                    </div>
                    <p className="text-sm text-white/50 mt-2">{service.typical}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-white/70">
                        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: service.color }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <Link
                    href={`/services/${service.name.toLowerCase().replace(" ", "-")}`}
                    className="flex items-center gap-2 text-sm font-semibold text-white/70 group-hover:text-white transition-colors"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-[#1E90FF]/10 to-[#00C853]/10 border border-white/10 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Need an Accurate Quote?</h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Every property is unique. Get a personalised quote in minutes via WhatsApp or use our instant pricing
              calculator.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#00C853] text-white font-semibold rounded-lg px-8 py-6 text-base
                         hover:bg-[#00A843] hover:shadow-lg hover:scale-105 transition-all duration-300
                         shadow-[0_0_20px_rgba(0,200,83,0.3)]"
              >
                <a
                  href="https://wa.me/447418610731?text=Hi%2C%20I%27d%20like%20a%20personalised%20quote"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Get WhatsApp Quote
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-[#1E90FF] bg-transparent text-[#1E90FF] rounded-lg px-8 py-6 text-base
                         hover:bg-[#1E90FF] hover:text-white transition-all duration-300"
              >
                <Link href="/pricing">
                  <Calculator className="h-5 w-5 mr-2" />
                  Use Pricing Calculator
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
