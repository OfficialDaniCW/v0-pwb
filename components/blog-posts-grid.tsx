"use client"

import { Clock, Calendar, ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  category: string
  published_at: string
  read_time_minutes: number
  featured_image_url?: string
  related_service?: string
}

export function BlogPostsGrid({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center py-12">
            <ImageIcon className="h-16 w-16 mx-auto mb-4 text-foreground/30" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No blog posts yet</h3>
            <p className="text-foreground/60">Check back soon for expert property care advice!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="group glass-border rounded-2xl overflow-hidden hover:border-accent transition-all flex flex-col"
              >
                {/* Featured Image */}
                <div className="relative">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block aspect-video bg-gradient-to-br from-primary to-accent/20 relative overflow-hidden"
                  >
                    {post.featured_image_url ? (
                      <Image
                        src={post.featured_image_url || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <ImageIcon className="h-12 w-12 text-white/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-white/70 text-sm mb-4 line-clamp-2 flex-grow">{post.excerpt}</p>

                  <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
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
                      <Clock className="h-3 w-3" />
                      <span>{post.read_time_minutes || 5} min read</span>
                    </div>
                  </div>

                  {post.related_service && (
                    <div className="pt-4 border-t border-white/10 mt-auto">
                      <Link
                        href={post.related_service}
                        className="text-xs text-[#1E90FF] hover:text-[#1E90FF]/80 font-medium inline-flex items-center gap-1"
                      >
                        Related Service →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {posts.length >= 6 && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 border-2 border-accent bg-transparent text-accent rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-all">
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
