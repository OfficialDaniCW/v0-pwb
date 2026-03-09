"use client"

import Image from "next/image"
import Link from "next/link"

interface TransformationItem {
  id: number
  title: string
  after_image_url: string
  service_type: string
  location: string
  link: string
}

export function ScrollingStrip({ items }: { items: TransformationItem[] }) {
  // Duplicate for seamless infinite loop
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
                src={item.after_image_url}
                alt={`${item.title} - Professional ${item.service_type}`}
                fill
                sizes="300px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                quality={70}
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
              <p className="text-white/40 text-xs mt-1">{item.service_type}</p>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0%   { transform: translate3d(0, 0, 0); }
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
