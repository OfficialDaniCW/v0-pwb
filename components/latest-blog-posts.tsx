"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, Calendar, ImageIcon } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  category: string
  published_at: string
  read_time_minutes: number
  featured_image_url?: string
}

export function LatestBlogPosts() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog?limit=3")
        if (response.ok) {
          const posts = await response.json()
          setLatestPosts(posts)
        }
      } catch (error) {
        console.error("Failed to fetch blog posts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) {
    return (
      <section className="relative py-20 bg-gradient-to-b from-[#0A1525] to-[#0F1F35]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Latest Insights</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Expert advice, industry updates, and property care tips from our team
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-[#0F1F35] rounded-2xl overflow-hidden border border-blue-500/20">
                  <div className="h-56 bg-white/10" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-6 bg-white/10 rounded" />
                    <div className="h-4 bg-white/10 rounded w-5/6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (latestPosts.length === 0) {
    return null // Don't show section if no posts
  }

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#0A1525] to-[#0F1F35]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Latest Insights</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Expert advice, industry updates, and property care tips from our team
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <article className="relative h-full bg-[#0F1F35] rounded-2xl overflow-hidden border border-blue-500/20 transition-all duration-300 hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  {post.featured_image_url ? (
                    <Image
                      src={post.featured_image_url || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={`object-cover transition-transform duration-500 ${
                        hoveredIndex === index ? "scale-110" : "scale-100"
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0B1E3F] to-[#1E90FF]/20 flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-white/20" />
                    </div>
                  )}
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F35] via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 mb-3 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "Draft"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.read_time_minutes || 5} min read</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-300 mb-4 line-clamp-2">{post.excerpt}</p>

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-blue-400 font-medium">
                    <span>Read Article</span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        hoveredIndex === index ? "translate-x-2" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Animated Border Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)",
                    animation: hoveredIndex === index ? "shimmer 2s infinite" : "none",
                  }}
                />
              </article>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  )
}
