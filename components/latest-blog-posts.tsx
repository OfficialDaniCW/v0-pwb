import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, Calendar, ImageIcon } from "lucide-react"
import { neon } from "@neondatabase/serverless"

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

async function getLatestPosts(): Promise<BlogPost[]> {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    // Race against a 5s timeout so a slow DB never hangs the page render
    const rows = await Promise.race([
      sql`
        SELECT id, title, slug, excerpt, category, published_at, read_time_minutes, featured_image_url
        FROM blog_posts
        WHERE is_published = true AND published_at <= NOW()
        ORDER BY published_at DESC
        LIMIT 3
      `,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("DB timeout")), 5000)
      ),
    ])
    return rows as BlogPost[]
  } catch {
    return []
  }
}

export async function LatestBlogPosts() {
  const latestPosts = await getLatestPosts()

  if (latestPosts.length === 0) return null

  return (
    <section className="relative py-20 bg-gradient-to-b from-secondary to-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Latest Insights</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert advice, industry updates, and property care tips from our team
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative">
              <article className="relative h-full bg-card rounded-2xl overflow-hidden border border-accent/20 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(30,144,255,0.3)]">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  {post.featured_image_url ? (
                    <Image
                      src={post.featured_image_url}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-accent/20 flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-accent/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
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

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-300 mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center gap-2 text-blue-400 font-medium">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "var(--accent)" }}
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
