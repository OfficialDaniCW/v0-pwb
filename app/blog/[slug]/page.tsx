import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Clock, Calendar, Share2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/lib/blog-posts"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: "https://powerwashbros.co.uk/moss-removal-purbeck.jpg",
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "PowerWash Bros",
      url: "https://powerwashbros.co.uk",
    },
    publisher: {
      "@type": "Organization",
      name: "PowerWash Bros",
      logo: {
        "@type": "ImageObject",
        url: "https://powerwashbros.co.uk/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://powerwashbros.co.uk/blog/${params.slug}`,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />

        {/* Article Header */}
        <article className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white/60 hover:text-[#1E90FF] transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Blog</span>
              </Link>

              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block text-sm bg-[#1E90FF]/20 text-[#1E90FF] px-4 py-2 rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{post.title}</h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/60 mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>By {post.author}</span>
                </div>
                <button className="flex items-center gap-2 ml-auto hover:text-[#1E90FF] transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>

              {/* Featured Image */}
              <div className="mb-12 glass-border rounded-2xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-[#0B1E3F] to-[#1E90FF]/20 flex items-center justify-center">
                  <p className="text-white/60">Featured Image</p>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-invert prose-lg max-w-none">
                <div className="text-white/80 leading-relaxed space-y-6">
                  {post.content.split("\n\n").map((paragraph, index) => {
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h2 key={index} className="text-2xl font-bold text-white mt-12 mb-4">
                          {paragraph.replace("## ", "")}
                        </h2>
                      )
                    } else if (paragraph.startsWith("### ")) {
                      return (
                        <h3 key={index} className="text-xl font-bold text-white mt-8 mb-3">
                          {paragraph.replace("### ", "")}
                        </h3>
                      )
                    } else if (paragraph.startsWith("- ")) {
                      return (
                        <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                          {paragraph.split("\n").map((item, i) => (
                            <li key={i}>{item.replace(/^- /, "")}</li>
                          ))}
                        </ul>
                      )
                    } else if (paragraph.match(/^\d+\./)) {
                      return (
                        <ol key={index} className="list-decimal list-inside space-y-2 ml-4">
                          {paragraph.split("\n").map((item, i) => (
                            <li key={i}>{item.replace(/^\d+\.\s*/, "")}</li>
                          ))}
                        </ol>
                      )
                    } else {
                      // Basic link parser for markdown-style links [text](url)
                      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
                      if (paragraph.match(linkRegex)) {
                        const parts = []
                        let lastIndex = 0
                        let match
                        while ((match = linkRegex.exec(paragraph)) !== null) {
                          if (match.index > lastIndex) {
                            parts.push(paragraph.substring(lastIndex, match.index))
                          }
                          parts.push(
                            <a
                              key={match.index}
                              href={match[2]}
                              className="text-[#1E90FF] hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {match[1]}
                            </a>,
                          )
                          lastIndex = match.index + match[0].length
                        }
                        if (lastIndex < paragraph.length) {
                          parts.push(paragraph.substring(lastIndex))
                        }
                        return <p key={index}>{parts}</p>
                      }

                      // Bold text parser **text**
                      const boldRegex = /\*\*([^*]+)\*\*/g
                      if (paragraph.match(boldRegex)) {
                        const parts = []
                        let lastIndex = 0
                        let match
                        while ((match = boldRegex.exec(paragraph)) !== null) {
                          if (match.index > lastIndex) {
                            parts.push(paragraph.substring(lastIndex, match.index))
                          }
                          parts.push(
                            <strong key={match.index} className="font-bold text-white">
                              {match[1]}
                            </strong>,
                          )
                          lastIndex = match.index + match[0].length
                        }
                        if (lastIndex < paragraph.length) {
                          parts.push(paragraph.substring(lastIndex))
                        }
                        return <p key={index}>{parts}</p>
                      }

                      return <p key={index}>{paragraph}</p>
                    }
                  })}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-white/60">Tags:</span>
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-sm bg-white/5 text-white/70 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-16 glass-border-enhanced rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Need Help with Your Property?</h3>
                <p className="text-white/70 mb-6">
                  Get expert advice and a free assessment from our biocide-trained team
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-[#00C853] text-white font-semibold rounded-lg px-8
                             hover:bg-[#00A843] transition-all"
                >
                  <a href="https://wa.me/447418610731" target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </article>

        <PWBFooter />
      </main>
    </>
  )
}
