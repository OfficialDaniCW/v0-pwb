"use client"

import { Instagram } from 'lucide-react'
import { Card } from "@/components/ui/card"

export function InstagramFeed() {
  // Static Instagram posts - in production, you'd fetch these from Instagram API
  const posts = [
    {
      id: 1,
      image: "/driveway-transformation-before-after.jpg",
      caption: "Another stunning driveway transformation in Swanage",
      link: "https://www.instagram.com/powerwashbrosltd/"
    },
    {
      id: 2,
      image: "/roof-cleaning-moss-removal.jpg",
      caption: "Roof cleaning perfection in Purbeck",
      link: "https://www.instagram.com/powerwashbrosltd/"
    },
    {
      id: 3,
      image: "/patio-cleaning-purbeck-stone.jpg",
      caption: "Purbeck stone patio restored to its former glory",
      link: "https://www.instagram.com/powerwashbrosltd/"
    },
    {
      id: 4,
      image: "/commercial-property-cleaning.jpg",
      caption: "Commercial property maintenance in Bournemouth",
      link: "https://www.instagram.com/powerwashbrosltd/"
    },
    {
      id: 5,
      image: "/render-cleaning-soft-wash.jpg",
      caption: "Render soft washing brings properties back to life",
      link: "https://www.instagram.com/powerwashbrosltd/"
    },
    {
      id: 6,
      image: "/gutter-cleaning-before-after.jpg",
      caption: "Gutter cleaning keeping Dorset properties protected",
      link: "https://www.instagram.com/powerwashbrosltd/"
    }
  ]

  return (
    <section className="py-20 bg-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="h-8 w-8 text-[#1E90FF]" />
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Follow Our Work
            </h2>
          </div>
          <p className="text-xl text-white/70 mb-6">
            See our latest transformations on Instagram
          </p>
          <a
            href="https://www.instagram.com/powerwashbrosltd/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#1E90FF] hover:text-[#1E90FF]/80 font-semibold transition-colors"
          >
            @powerwashbrosltd
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.caption}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm line-clamp-2">{post.caption}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Instagram className="h-6 w-6 text-white" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/powerwashbrosltd/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
          >
            <Instagram className="h-5 w-5" />
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
