import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { BlogPostsGrid } from "@/components/blog-posts-grid"

export const metadata = {
  title: "Blog | PowerWash Bros | Expert Property Care Advice",
  description:
    "Learn from Dorset's biocide-trained specialists. Expert advice on property maintenance, cleaning techniques, and prevention tips.",
}

async function getBlogPosts() {
  try {
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/blog`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })

    if (!response.ok) {
      return []
    }

    return response.json()
  } catch (error) {
    console.error("Failed to fetch blog posts:", error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

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
        <BlogPostsGrid posts={posts} />

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
