"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { portfolioProjects, type PortfolioProject } from "@/lib/portfolio-data"

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
  const [projects, setProjects] = useState<PortfolioProject[]>(portfolioProjects)

  useEffect(() => {
    // Fetch from database if available, fall back to static data
    async function fetchProjects() {
      try {
        const res = await fetch("/api/portfolio")
        if (res.ok) {
          const data = await res.json()
          if (data.length > 0) {
            setProjects(data)
          }
        }
      } catch (error) {
        // Use shared portfolio data if fetch fails
        console.log("Using static portfolio data")
      }
    }
    fetchProjects()
  }, [])

  // Duplicate for infinite scroll effect
  const displayItems = [...projects, ...projects]

  return (
    <div className="relative w-full overflow-hidden py-8 bg-[#0B1E3F]/50 backdrop-blur-sm">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0B1E3F] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0B1E3F] to-transparent z-10" />

      <div className="flex animate-scroll gap-6">
        {displayItems.map((item, index) => (
          <Link
            key={`${item.id}-${index}`}
            href={item.link}
            className="flex-shrink-0 w-[300px] rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#1E90FF]/50 transition-colors group"
          >
            <div className="relative h-[220px] overflow-hidden">
              <Image
                src={item.afterImage || "/placeholder.svg"}
                alt={`${item.title} - Professional ${item.serviceType}`}
                fill
                sizes="300px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute top-3 right-3 text-xs font-semibold bg-[#00C853] text-white px-3 py-1.5 rounded-full shadow-lg">
                Transformed
              </span>
            </div>
            <div className="p-4 text-center">
              <p className="text-white font-semibold text-base group-hover:text-[#1E90FF] transition-colors">
                {item.title}
              </p>
              <p className="text-white/60 text-sm mt-1">{item.location}</p>
              <p className="text-white/40 text-xs mt-1">{item.serviceType}</p>
            </div>
          </Link>
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
