import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Clock, Calendar, Share2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/lib/blog-posts"
import { notFound } from "next/navigation"
import Script from "next/script"
import { createServiceBreadcrumbs } from "@/lib/schema-utils"

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  const slug = params.slug; // Declare the slug variable

  if (!post) {
    notFound()
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://powerwashbros.co.uk"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://powerwashbros.co.uk/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://powerwashbros.co.uk/blog/${params.slug}`
      }
    ]
  }

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage || "https://powerwashbros.co.uk/og-image.jpg",
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author || "PowerWash Bros",
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
    keywords: post.tags.join(", "),
    articleBody: post.content.replace(/<[^>]*>/g, "").substring(0, 500),
  }

  return (
    <>
      <Script id="breadcrumb-schema-blog" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }} />
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
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/<h1/g, '<h1 class="text-4xl font-bold text-white mt-16 mb-6 leading-tight"')
                    .replace(/<h2/g, '<h2 class="text-2xl font-bold text-white mt-12 mb-4"')
                    .replace(/<h3/g, '<h3 class="text-xl font-bold text-white mt-8 mb-3"')
                    .replace(/<h4/g, '<h4 class="text-lg font-bold text-white mt-6 mb-2"')
                    .replace(/<p/g, '<p class="text-white/80 leading-relaxed mb-4"')
                    .replace(/<ul/g, '<ul class="list-disc list-inside space-y-2 ml-4 text-white/80 mb-4"')
                    .replace(/<ol/g, '<ol class="list-decimal list-inside space-y-2 ml-4 text-white/80 mb-4"')
                    .replace(/<li/g, '<li class="text-white/80"')
                    .replace(/<strong/g, '<strong class="font-bold text-white"')
                    .replace(/<a/g, '<a class="text-[#1E90FF] hover:underline"'),
                }}
              />

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
