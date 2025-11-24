"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

interface Transformation {
  id: string
  title: string
  location: string
  afterImage: string
  link: string
}

const TRANSFORMATIONS: Transformation[] = [
  {
    id: "roof-clean-biocide",
    title: "Roof Clean & Biocide Treatment",
    location: "Dorset",
    afterImage: "/images/after3.png",
    link: "/portfolio/roof-clean-biocide-treatment",
  },
  {
    id: "vicarage",
    title: "The Vicarage",
    location: "Swanage",
    afterImage: "/images/after.jpg",
    link: "/portfolio/swanage-vicarage",
  },
  {
    id: "commercial-patio",
    title: "Commercial Patio Clean",
    location: "Dorset",
    afterImage: "/images/portfolio/commercial-patio-after.jpg",
    link: "/portfolio/commercial-patio",
  },
  {
    id: "swanage-patio",
    title: "Patio & Wall Refresh",
    location: "Swanage",
    afterImage: "/images/portfolio/swanage-patio-after.jpg",
    link: "/portfolio/swanage-patio-wall-refresh",
  },
  {
    id: "patio-cleaning",
    title: "Patio Entrance Restoration",
    location: "Dorset",
    afterImage: "/images/portfolio/patio-cleaning-after.jpg",
    link: "/portfolio/patio-cleaning",
  },
  {
    id: "render-clean",
    title: "Render Cleaning",
    location: "Dorset",
    afterImage: "/images/portfolio/render-clean-after.jpg",
    link: "/portfolio/roof-clean-biocide-treatment",
  },
]

export function ScrollingTransformations() {
  const [scrollPosition, setScrollPosition] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)

  React.useEffect(() => {
    const scrollSpeed = 0.5
    const itemWidth = 404
    const singleSetWidth = TRANSFORMATIONS.length * itemWidth
    let animationFrameId: number

    const animate = () => {
      if (!isPaused) {
        setScrollPosition((prev) => {
          if (prev >= singleSetWidth) {
            return prev - singleSetWidth
          }
          return prev + scrollSpeed
        })
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isPaused])

  const tripleTransformations = [...TRANSFORMATIONS, ...TRANSFORMATIONS, ...TRANSFORMATIONS]

  return (
    <div
      className="relative mt-16 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex gap-6 transition-transform duration-100 ease-linear"
        style={{
          transform: `translateX(-${scrollPosition}px)`,
        }}
      >
        {tripleTransformations.map((transformation, index) => (
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

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

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

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-[#0A1628] to-transparent" />
    </div>
  )
}
