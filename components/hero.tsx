"use client"

import { Button } from "@/components/ui/button"
import { Star, Shield, CheckCircle2, Award } from "lucide-react"
import { ScrollingTransformations } from "@/components/scrolling-transformations"
import { useState, useEffect } from "react"

const rotatingWords = ["Cleaning", "Washing", "Restoring", "Protecting"]

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % rotatingWords.length)
        setIsAnimating(false)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative isolate overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-20 sm:py-28">
          {/* Headline */}
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl leading-tight">
            <span className="block">Dorset's Leading</span>
            <span className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 text-accent drop-shadow-[0_0_30px_rgba(30,144,255,0.4)] mt-2">
              <span className="inline-block">Property</span>
              <span className="inline-block relative min-w-[180px] sm:min-w-[220px] md:min-w-[260px] lg:min-w-[300px] overflow-hidden text-left">
                <span
                  className={`block transition-all duration-300 ${
                    isAnimating ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
                  }`}
                >
                  {rotatingWords[currentIndex]}
                </span>
              </span>
            </span>
            <span className="block mt-2">Experts</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-center text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed px-4">
            Biocide-trained specialists in exterior cleaning for residential, commercial, and heritage properties across
            Dorset
          </p>

          {/* Trust Signals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="font-medium text-foreground">4.9 Google Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <span>500+ Properties Transformed</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" />
              <span>Biocide Trained & Registered</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              <span>Fully Insured</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-success text-success-foreground font-semibold rounded-lg px-8 py-6 text-lg
                         hover:opacity-90 hover:shadow-lg hover:scale-105
                         transition-all duration-300"
              aria-label="Chat with PowerWash Bros on WhatsApp"
            >
              <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-accent bg-transparent text-accent rounded-lg px-8 py-6 text-lg
                         hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              aria-label="View our work transformations gallery"
            >
              <a href="/our-work">View Transformations</a>
            </Button>
          </div>
        </div>
      </div>

      <ScrollingTransformations />
    </section>
  )
}
