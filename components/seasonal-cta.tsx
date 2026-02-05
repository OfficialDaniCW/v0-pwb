"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Droplets, Wind, Sun, Snowflake, ArrowRight, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

interface SeasonConfig {
  season: string
  title: string
  subtitle: string
  description: string
  services: Array<{
    name: string
    icon: React.ReactNode
    reason: string
    link: string
  }>
  urgency: string
  color: string
  bgGradient: string
}

function getSeason(): SeasonConfig {
  const now = new Date()
  const month = now.getMonth() + 1 // 1-12

  // Winter: November - February (Gutter + Patio focus)
  if (month >= 11 || month <= 2) {
    return {
      season: "Winter",
      title: "Winter is Here - Protect Your Property",
      subtitle: "Don't let blocked gutters and slippery surfaces cause costly damage",
      description:
        "Heavy rainfall and moss growth make winter the critical season for gutter clearing and patio cleaning. Act now to prevent water damage and dangerous slip hazards.",
      services: [
        {
          name: "Gutter Clearing",
          icon: <Droplets className="h-6 w-6" />,
          reason: "Prevent water overflow and foundation damage during heavy winter rain",
          link: "/services/gutter-cleaning",
        },
        {
          name: "Patio Cleaning",
          icon: <AlertCircle className="h-6 w-6" />,
          reason: "Remove dangerous moss and algae that become treacherous when wet",
          link: "/services/patio-cleaning",
        },
      ],
      urgency: "Book now before the next storm",
      color: "#60A5FA",
      bgGradient: "from-blue-600/10 to-cyan-600/10",
    }
  }

  // Spring: March - May (Roof preparation)
  if (month >= 3 && month <= 5) {
    return {
      season: "Spring",
      title: "Spring Clean Your Roof",
      subtitle: "Prepare your property for summer and next winter",
      description:
        "Spring is the perfect time to remove winter's moss buildup and apply biocide treatments. Protect your roof before the heat sets in and prepare for next winter's rain.",
      services: [
        {
          name: "Roof Cleaning",
          icon: <Sun className="h-6 w-6" />,
          reason: "Remove moss, algae, and debris accumulated over winter months",
          link: "/services/roof-cleaning",
        },
        {
          name: "Biocide Treatment",
          icon: <Shield className="h-6 w-6" />,
          reason: "Long-lasting protection that prevents regrowth throughout the year",
          link: "/services/roof-cleaning",
        },
      ],
      urgency: "Book your spring treatment",
      color: "#34D399",
      bgGradient: "from-green-600/10 to-emerald-600/10",
    }
  }

  // Summer: June - August (Roof maintenance)
  if (month >= 6 && month <= 8) {
    return {
      season: "Summer",
      title: "Summer Roof Maintenance",
      subtitle: "Get ahead of winter with professional roof care",
      description:
        "Don't wait for winter to arrive. Summer's ideal conditions make it the perfect time for thorough roof cleaning and treatments that will protect your property year-round.",
      services: [
        {
          name: "Roof Cleaning",
          icon: <Sun className="h-6 w-6" />,
          reason: "Dry conditions ensure the best results and fastest drying times",
          link: "/services/roof-cleaning",
        },
        {
          name: "Preventive Treatment",
          icon: <Shield className="h-6 w-6" />,
          reason: "Prepare your roof now, stay protected through autumn and winter",
          link: "/services/roof-cleaning",
        },
      ],
      urgency: "Prepare before autumn arrives",
      color: "#F59E0B",
      bgGradient: "from-orange-600/10 to-yellow-600/10",
    }
  }

  // Autumn: September - October (Pre-winter roof prep)
  return {
    season: "Autumn",
    title: "Last Chance Before Winter",
    subtitle: "Prepare your roof for the harsh months ahead",
    description:
      "Autumn is your final opportunity to protect your property before winter storms arrive. Clean and treat your roof now to prevent costly damage from ice, rain, and wind.",
    services: [
      {
        name: "Roof Cleaning",
        icon: <Wind className="h-6 w-6" />,
        reason: "Remove debris before winter weather makes it impossible to access",
        link: "/services/roof-cleaning",
      },
      {
        name: "Gutter Preparation",
        icon: <Droplets className="h-6 w-6" />,
        reason: "Clear gutters now, ready for falling leaves and winter rainfall",
        link: "/services/gutter-cleaning",
      },
    ],
    urgency: "Don't wait - winter is coming",
    color: "#F97316",
    bgGradient: "from-orange-600/10 to-red-600/10",
  }
}

function Shield({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

export function SeasonalCTA() {
  const [seasonConfig, setSeasonConfig] = useState<SeasonConfig | null>(null)

  useEffect(() => {
    setSeasonConfig(getSeason())
  }, [])

  if (!seasonConfig) {
    return null // Server-side render placeholder
  }

  const SeasonIcon = {
    Winter: Snowflake,
    Spring: Sun,
    Summer: Sun,
    Autumn: Wind,
  }[seasonConfig.season]

  return (
    <section className={`relative py-16 sm:py-20 bg-gradient-to-br ${seasonConfig.bgGradient}`}>
      <div className="absolute inset-0 bg-primary opacity-95" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Season Badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 animate-pulse"
              style={{ borderColor: seasonConfig.color, backgroundColor: `${seasonConfig.color}20` }}
            >
              <SeasonIcon className="h-5 w-5" style={{ color: seasonConfig.color }} />
              <span className="font-semibold text-white text-sm">{seasonConfig.season} Priority Services</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">{seasonConfig.title}</h2>
            <p className="text-xl text-white/80 mb-3">{seasonConfig.subtitle}</p>
            <p className="text-base text-white/60 max-w-3xl mx-auto leading-relaxed">{seasonConfig.description}</p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {seasonConfig.services.map((service, index) => (
              <Link
                key={service.name}
                href={service.link}
                className="group relative bg-[#0F2851]/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 
                         hover:border-white/30 hover:bg-[#0F2851]/80 transition-all duration-300
                         hover:scale-105 hover:shadow-xl"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-lg shrink-0"
                    style={{ backgroundColor: `${seasonConfig.color}20`, color: seasonConfig.color }}
                  >
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">{service.reason}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#00C853] text-white font-semibold rounded-lg px-8 py-6 text-base
                       hover:bg-[#00A843] hover:shadow-lg hover:scale-105 transition-all duration-300
                       shadow-[0_0_20px_rgba(0,200,83,0.3)]"
            >
              <a
                href="https://wa.me/447418610731?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20seasonal%20property%20maintenance"
                target="_blank"
                rel="noopener noreferrer"
              >
                {seasonConfig.urgency}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 text-white rounded-lg px-8 py-6 text-base
                       hover:bg-white/10 transition-all duration-300 bg-transparent"
              style={{ borderColor: seasonConfig.color }}
            >
              <Link href="/services">View All Services</Link>
            </Button>
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
