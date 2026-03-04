"use client"

import Image from "next/image"
import Link from "next/link"
import { portfolioProjects } from "@/lib/portfolio-data"

export function ScrollingTransformations() {
  // Cap at 6 items per pass — enough for seamless loop, limits DOM nodes
  const items = portfolioProjects.slice(0, 6)
  const displayItems = [...items, ...items]

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
                alt={`${item.title} - Professional ${item.service}`}
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
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          will-change: transform;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
