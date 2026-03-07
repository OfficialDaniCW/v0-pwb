import { MetadataRoute } from "next"
import { neon } from "@neondatabase/serverless"

const baseUrl = "https://powerwashbros.co.uk"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch live blog posts from Neon so every published post is indexed by Google
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const posts = await sql`
      SELECT slug, published_at FROM blog_posts
      WHERE is_published = true AND published_at <= NOW()
      ORDER BY published_at DESC
    `
    blogPages = posts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.published_at),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }))
  } catch {
    // Fallback: blog posts simply won't appear in sitemap if DB is unavailable
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,                          lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${baseUrl}/services`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.95 },
    { url: `${baseUrl}/about`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/our-work`,            lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/pricing`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/service-areas`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`,                lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${baseUrl}/powerups`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/faq`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`,             lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
    { url: `${baseUrl}/privacy`,             lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${baseUrl}/terms`,               lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${baseUrl}/cookies`,             lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ]

  // All individual service pages
  const individualServices = [
    "pressure-washing",
    "softwash",
    "roof-cleaning",
    "gutter-cleaning",
    "driveway-cleaning",
    "patio-decking",
    "render-cleaning",
    "exterior-walls",
    "window-cleaning",
    "solar-panel-cleaning",
    "heritage-buildings",
    "graffiti-removal",
    "commercial",
    "residential",
    "glass-cleaning",
    "soffit-cleaning",
    "demossing",
    "external-property-maintenance",
  ]

  const individualServicePages: MetadataRoute.Sitemap = individualServices.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }))

  const portfolioPages: MetadataRoute.Sitemap = [
    "commercial-patio",
    "garden-patio",
    "patio-cleaning",
    "render-clean",
    "roof-clean-biocide-treatment",
    "swanage-patio-wall-refresh",
  ].map((slug) => ({
    url: `${baseUrl}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // All service area location pages
  const serviceAreas = [
    "swanage",
    "purbeck",
    "poole",
    "bournemouth",
    "weymouth",
    "corfe-castle",
    "langton-matravers",
    "studland",
    "worth-matravers",
    "wareham",
    "wimborne",
    "christchurch",
    "ferndown",
    "dorchester",
    "portland",
    "lulworth",
    "isle-of-purbeck",
    "wool",
    "blandford-forum",
    "swanage-and-purbeck",
  ]

  const serviceAreaPages: MetadataRoute.Sitemap = serviceAreas.map((area) => ({
    url: `${baseUrl}/service-areas/${area}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    ...staticPages,
    ...individualServicePages,
    ...portfolioPages,
    ...blogPages,
    ...serviceAreaPages,
  ]
}
