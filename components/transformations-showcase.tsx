"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

interface Transformation {
  id: string
  title: string
  location: string
  beforeImage: string
  afterImage: string
  link: string
}

const TRANSFORMATIONS: Transformation[] = [
  {
    id: "roof-clean-biocide",
    title: "Roof Clean & Biocide Treatment",
    location: "Dorset",
    beforeImage: "/images/before2.jpeg",
    afterImage: "/images/after3.png",
    link: "/portfolio/roof-clean-biocide-treatment",
  },
  {
    id: "vicarage",
    title: "The Vicarage",
    location: "Swanage",
    beforeImage: "/images/before4.jpg",
    afterImage: "/images/after.jpg",
    link: "/portfolio/swanage-vicarage",
  },
  {
    id: "commercial-patio",
    title: "Commercial Patio Clean",
    location: "Dorset",
    beforeImage: "/images/portfolio/commercial-patio-before.jpg",
    afterImage: "/images/portfolio/commercial-patio-after.jpg",
    link: "/portfolio/commercial-patio",
  },
  {
    id: "swanage-patio",
    title: "Patio & Wall Refresh",
    location: "Swanage",
    beforeImage: "/images/portfolio/swanage-patio-before.jpg",
    afterImage: "/images/portfolio/swanage-patio-after.jpg",
    link: "/portfolio/swanage-patio-wall-refresh",
  },
  {
    id: "patio-cleaning",
    title: "Patio Entrance Restoration",
    location: "Dorset",
    beforeImage: "/images/portfolio/patio-cleaning-before.jpg",
    afterImage: "/images/portfolio/patio-cleaning-after.jpg",
    link: "/portfolio/patio-cleaning",
  },
  {
    id: "render-clean",
    title: "Render Cleaning",
    location: "Dorset",
    beforeImage: "/images/portfolio/render-clean-before.jpg",
    afterImage: "/images/portfolio/render-clean-after.jpg",
    link: "/portfolio/roof-clean-biocide-treatment",
  },
]

export function TransformationsShowcase() {
  const [scrollPosition, setScrollPosition] = React.useState(0)

  React.useEffect(() => {
    const scrollSpeed = 0.5 // pixels per frame
    let animationFrameId: number

    const animate = () => {
      setScrollPosition((prev) => {
        // Reset to 0 when we've scrolled through all items
        const maxScroll = TRANSFORMATIONS.length * 400 // 400px per card
        return prev >= maxScroll ? 0 : prev + scrollSpeed
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Double the array for seamless infinite scroll
  const doubledTransformations = [...TRANSFORMATIONS, ...TRANSFORMATIONS]

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-[#0A1628] to-[#0F1F38]">
      <div className="container px-4 mx-auto mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl text-balance">
            Stunning Transformations
          </h2>
          <p className="text-lg text-white/70 text-balance">
            See the remarkable results we deliver across Dorset. Professional cleaning that brings properties back to
            life.
          </p>
        </div>
      </div>

      {/* Scrolling Container */}
      <div className="relative">
        <div
          className="flex gap-6 transition-transform duration-100 ease-linear"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
          }}
        >
          {doubledTransformations.map((transformation, index) => (
            <Link
              key={`${transformation.id}-${index}`}
              href={transformation.link}
              className="relative flex-shrink-0 w-[380px] h-[500px] group overflow-hidden rounded-xl"
            >
              <Image
                src={transformation.afterImage || "/placeholder.svg"}
                alt={transformation.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="380px"
              />

              {/* Gradient overlay from bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Text content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide text-white uppercase rounded-full bg-[#1E90FF]">
                  After
                </div>
                <h3 className="mb-1 text-2xl font-bold text-white text-balance">{transformation.title}</h3>
                <p className="text-sm text-white/80">{transformation.location}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom fade effect across entire section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-[#0F1F38] to-transparent" />
      </div>

      {/* CTA */}
      <div className="container px-4 mx-auto mt-16 text-center">
        <Link
          href="/our-work"
          className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-colors rounded-lg bg-[#1E90FF] hover:bg-[#1E90FF]/90"
        >
          View All Projects
        </Link>
      </div>
    </section>
  )
}
