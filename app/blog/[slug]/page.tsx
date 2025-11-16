import { SiteHeader } from "@/components/site-header"
import { PWBFooter } from "@/components/pwb-footer"
import { Clock, Calendar, Share2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In production, this would fetch from database based on slug
  const post = {
    title: "What is Moss? Understanding This Common Property Problem",
    excerpt: "Learn why moss damages your property and how to prevent it with professional biocide treatments.",
    content: `Moss might look harmless, almost charming in that cottage-garden way. But here's the reality: every day moss remains on your roof, it's holding moisture against your tiles, pushing its roots under tiles and into joints, blocking your gutters and drainage, adding weight to your roof structure, and shortening your roof's lifespan by years.

We've seen it hundreds of times across Dorset properties. A £200 moss treatment today, or a £3000+ roof repair in two years. Let's talk about why this matters and what you can do about it.

## What is Moss?

Moss is a non-vascular plant that thrives in damp, shaded conditions. Unlike flowering plants, moss doesn't have true roots - instead it has rhizoids that attach to surfaces and absorb moisture directly.

In Dorset's climate - with our coastal moisture, frequent rain, and tree-covered areas - moss finds perfect growing conditions on roofs, walls, and hard surfaces.

## Why Moss Damages Properties

The damage moss causes to properties is both immediate and long-term:

### Moisture Retention

Moss acts like a sponge, holding water against your property surfaces. This constant moisture:
- Accelerates weathering of tiles and stone
- Promotes rot in wooden structures
- Creates ideal conditions for further organic growth
- Penetrates through joints and under materials

### Physical Damage

While moss doesn't have true roots, its rhizoids still penetrate surfaces:
- They work their way under roof tiles
- They expand joints in paving
- They break down mortar between bricks
- They create pathways for water ingress

### Weight

Saturated moss adds significant weight to roofs. A heavily moss-covered roof can add hundreds of kilograms, putting stress on the structure.

### Drainage Blocking

Moss growth blocks gutters, channels, and drainage systems, causing water to overflow and damage walls, foundations, and interiors.

## Our PowerUps Solution

At PowerWash Bros, we use our PowerUps Bio-Clean treatment to eliminate moss at the source. Unlike simple pressure washing, which only removes surface growth, our biocide treatment:

1. **Penetrates Surface Pores** - Getting to the root of the problem
2. **Eliminates Spores** - Preventing regrowth
3. **Continues Working** - Active for months after application
4. **Naturally Biodegrades** - Environmental responsibility

This is why our biocide-trained approach delivers results that last - not just surfaces that look clean temporarily.

## Prevention is Key

Regular maintenance is far more cost-effective than emergency repairs:
- Annual roof inspections
- Professional moss treatment every 2-3 years
- Gutter clearing twice yearly
- Tree trimming to reduce shade

## Get Expert Help

If you're concerned about moss on your property, we offer free assessments across Dorset. We'll evaluate the extent of moss growth, check for any existing damage, and recommend the most appropriate treatment.`,
    category: "Property Maintenance",
    publishedAt: "2025-01-08",
    readTime: 8,
    author: "PowerWash Bros",
    tags: ["moss", "roof care", "biocide", "property damage"]
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": "https://powerwashbros.co.uk/moss-removal-purbeck.jpg",
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "PowerWash Bros",
      "url": "https://powerwashbros.co.uk"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PowerWash Bros",
      "logo": {
        "@type": "ImageObject",
        "url": "https://powerwashbros.co.uk/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://powerwashbros.co.uk/blog/${params.slug}`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        
        {/* Article Header */}
        <article className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Link */}
              <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-[#1E90FF] transition-colors mb-8">
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/60 mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
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
                  {post.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-2xl font-bold text-white mt-12 mb-4">
                          {paragraph.replace('## ', '')}
                        </h2>
                      )
                    } else if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-xl font-bold text-white mt-8 mb-3">
                          {paragraph.replace('### ', '')}
                        </h3>
                      )
                    } else if (paragraph.startsWith('- ')) {
                      return (
                        <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                          {paragraph.split('\n').map((item, i) => (
                            <li key={i}>{item.replace('- ', '')}</li>
                          ))}
                        </ul>
                      )
                    } else if (paragraph.match(/^\d+\./)) {
                      return (
                        <ol key={index} className="list-decimal list-inside space-y-2 ml-4">
                          {paragraph.split('\n').map((item, i) => (
                            <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
                          ))}
                        </ol>
                      )
                    } else {
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
                <h3 className="text-2xl font-bold text-white mb-4">
                  Need Help with Your Property?
                </h3>
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
