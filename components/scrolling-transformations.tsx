"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Transformation {
  id: number
  title: string
  before_image_url: string
  after_image_url: string
  service_type: string
}

const fallbackTransformations: Transformation[] = [
  {
    id: 1,
    before_image_url: "/images/portfolio/commercial-patio-before.jpg",
    after_image_url: "/images/portfolio/commercial-patio-after.jpg",
    title: "Commercial Patio",
    service_type: "Patio Cleaning",
  },
  {
    id: 2,
    before_image_url: "/images/portfolio/garden-patio-before.jpg",
    after_image_url: "/images/portfolio/garden-patio-after.jpg",
    title: "Garden Patio",
    service_type: "Patio Cleaning",
  },
  {
    id: 3,
    before_image_url: "/images/portfolio/render-clean-before.jpg",
    after_image_url: "/images/portfolio/render-clean-after.jpg",
    title: "Render Cleaning",
    service_type: "Render Cleaning",
  },
  {
    id: 4,
    before_image_url: "/images/portfolio/swanage-patio-before.jpg",
    after_image_url: "/images/portfolio/swanage-patio-after.jpg",
    title: "Swanage Patio",
    service_type: "Patio Cleaning",
  },
  {
    id: 5,
    before_image_url: "/images/portfolio/patio-cleaning-before.jpg",
    after_image_url: "/images/portfolio/patio-cleaning-after.jpg",
    title: "Patio Restoration",
    service_type: "Patio Cleaning",
  },
]

export function ScrollingTransformations() {
  const [transformations, setTransformations] = useState<Transformation[]>(fallbackTransformations)

  useEffect(() => {
    // Fetch transformations from database
    async function fetchTransformations() {
      try {
        const res = await fetch("/api/transformations")
        if (res.ok) {
          const data = await res.json()
          if (data.length > 0) {
            setTransformations(data)
          }
        }
      } catch (error) {
        // Use fallback images if fetch fails
        console.log("Using fallback transformations")
      }
    }
    fetchTransformations()
  }, [])

  const displayItems = [...transformations, ...transformations]

  return (
    <div className="relative w-full overflow-hidden py-8 bg-[#0B1E3F]/50 backdrop-blur-sm">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0B1E3F] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0B1E3F] to-transparent z-10" />

      <div className="flex animate-scroll gap-6">
        {displayItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex-shrink-0 w-[300px] rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <div className="relative h-[180px] overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="w-1/2 relative">
                  <Image
                    src={item.before_image_url || "/placeholder.svg"}
                    alt={`${item.title} before`}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 left-2 text-xs font-semibold bg-red-500/80 text-white px-2 py-1 rounded">
                    Before
                  </span>
                </div>
                <div className="w-1/2 relative">
                  <Image
                    src={item.after_image_url || "/placeholder.svg"}
                    alt={`${item.title} after`}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 right-2 text-xs font-semibold bg-[#00C853]/80 text-white px-2 py-1 rounded">
                    After
                  </span>
                </div>
              </div>
            </div>
            <div className="p-3 text-center">
              <p className="text-white font-medium text-sm">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
