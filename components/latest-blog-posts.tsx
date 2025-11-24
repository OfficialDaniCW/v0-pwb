"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, Calendar } from "lucide-react"
import { blogPosts } from "@/lib/blog-posts"

export function LatestBlogPosts() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Get the 3 most recent blog posts
  const latestPosts = blogPosts.slice(0, 3)

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
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className={`object-cover transition-transform duration-500 ${
                      hoveredIndex === index ? "scale-110" : "scale-100"
                    }`}
                  />
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
                        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min read</span>
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
