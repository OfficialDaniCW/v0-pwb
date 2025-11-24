import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Clock, Calendar } from "lucide-react"
import Link from "next/link"
import { blogPosts } from "@/lib/blog-posts"

export const metadata = {
  title: "Blog | PowerWash Bros | Expert Property Care Advice",
  description:
    "Learn from Dorset's biocide-trained specialists. Expert advice on property maintenance, cleaning techniques, and prevention tips.",
}

export default function BlogPage() {
  const posts = blogPosts

  const categories = [
    "All Posts",
    "Property Maintenance",
    "Prevention Tips",
    "Dorset Properties",
    "Industry Insights",
    "Product Guides",
    "Company News",
    "Expert Advice",
  ]

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />

        {/* Hero */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Expert Property Care Advice</h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">Learn from Dorset's biocide-trained specialists</p>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      category === "All Posts"
                        ? "bg-[#1E90FF] text-white"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <div
                    key={post.slug}
                    className="group glass-border rounded-2xl overflow-hidden hover:border-[#1E90FF] transition-all flex flex-col"
                  >
                    {/* Featured Image */}
                    <div className="relative">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block aspect-video bg-gradient-to-br from-[#0B1E3F] to-[#1E90FF]/20 flex items-center justify-center relative overflow-hidden"
                      >
                        <p className="text-white/60 z-10">Featured Image</p>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs bg-[#1E90FF]/20 text-[#1E90FF] px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#1E90FF] transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                      </Link>

                      <p className="text-white/70 text-sm mb-4 line-clamp-2 flex-grow">{post.excerpt}</p>

                      <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>

                      {post.relatedService && (
                        <div className="pt-4 border-t border-white/10 mt-auto">
                          <Link
                            href={post.relatedService}
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
              <div className="text-center mt-12">
                <button className="px-8 py-3 border-2 border-[#1E90FF] bg-transparent text-[#1E90FF] rounded-lg font-medium hover:bg-[#1E90FF] hover:text-white transition-all">
                  Load More Articles
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Never Miss Property Care Tips</h2>
              <p className="text-white/70 mb-8">Subscribe to get expert advice, seasonal tips, and exclusive offers</p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-white/40 rounded-lg px-4 py-3"
                />
                <button className="bg-[#1E90FF] text-white font-medium rounded-lg px-6 hover:bg-[#1E90FF]/90 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
