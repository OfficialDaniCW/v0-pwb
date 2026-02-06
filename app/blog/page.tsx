import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { BlogPostsGrid } from "@/components/blog-posts-grid"
import { BlogSearchFilterClient } from "@/components/blog-search-filter-client"
import { NewsletterForm } from "@/components/newsletter-form"
import Script from "next/script"

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
      }
    ]
  }

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Expert Property Care Advice Blog",
    "description": "Learn from Dorset's biocide-trained specialists",
    "url": "https://powerwashbros.co.uk/blog",
    "publisher": {
      "@type": "Organization",
      "name": "PowerWash Bros",
      "url": "https://powerwashbros.co.uk",
      "logo": {
        "@type": "ImageObject",
        "url": "https://powerwashbros.co.uk/logo.png"
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": (posts || []).slice(0, 10).map((post: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://powerwashbros.co.uk/blog/${post.slug}`,
        "name": post.title,
        "description": post.excerpt,
        "image": post.featured_image_url || "https://powerwashbros.co.uk/og-image.jpg",
        "datePublished": post.published_at
      }))
    }
  }

  return (
    <>
      <Script id="breadcrumb-schema-blog-list" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="collection-schema-blog" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
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

        {/* Search & Filters */}
        <section className="py-12 border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <BlogSearchFilterClient posts={posts} />
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Never Miss Property Care Tips</h2>
              <p className="text-white/70 mb-8">Subscribe to get expert advice, seasonal tips, and exclusive offers</p>
              <NewsletterForm variant="compact" className="justify-center" />
            </div>
          </div>
        </section>

        <PWBFooter />
      </main>
    </>
  )
}
