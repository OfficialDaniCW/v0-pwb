import { blogPosts } from "@/lib/blog-posts"

const BASE_URL = "https://powerwashbros.co.uk"

// All service pages
const SERVICES = [
  "pressure-washing",
  "softwash",
  "window-cleaning",
  "driveway-cleaning",
  "patio-decking",
  "roof-cleaning",
  "gutter-cleaning",
  "soffit-cleaning",
  "render-cleaning",
  "exterior-walls",
  "glass-cleaning",
  "solar-panel-cleaning",
  "demossing",
  "graffiti-removal",
  "heritage-buildings",
  "external-property-maintenance",
  "commercial",
  "residential",
]

// Location-based service pages (for local SEO)
const LOCATIONS = [
  { slug: "swanage", name: "Swanage", postcode: "BH19" },
  { slug: "wareham", name: "Wareham", postcode: "BH20" },
  { slug: "corfe-castle", name: "Corfe Castle", postcode: "BH20" },
  { slug: "purbeck", name: "Purbeck", postcode: "BH19-BH20" },
  { slug: "studland", name: "Studland", postcode: "BH19" },
  { slug: "wool", name: "Wool", postcode: "BH20" },
  { slug: "lulworth", name: "Lulworth", postcode: "BH20" },
  { slug: "langton-matravers", name: "Langton Matravers", postcode: "BH19" },
  { slug: "worth-matravers", name: "Worth Matravers", postcode: "BH19" },
  { slug: "kimmeridge", name: "Kimmeridge", postcode: "BH20" },
  { slug: "bournemouth", name: "Bournemouth", postcode: "BH1-BH11" },
  { slug: "poole", name: "Poole", postcode: "BH12-BH17" },
  { slug: "christchurch", name: "Christchurch", postcode: "BH23" },
  { slug: "wimborne", name: "Wimborne", postcode: "BH21" },
  { slug: "ferndown", name: "Ferndown", postcode: "BH22" },
  { slug: "dorchester", name: "Dorchester", postcode: "DT1" },
  { slug: "weymouth", name: "Weymouth", postcode: "DT3-DT4" },
  { slug: "portland", name: "Portland", postcode: "DT5" },
  { slug: "winfrith", name: "Winfrith", postcode: "DT2" },
  { slug: "bere-regis", name: "Bere Regis", postcode: "BH20" },
  { slug: "stoborough", name: "Stoborough", postcode: "BH20" },
  { slug: "bovington", name: "Bovington", postcode: "BH20" },
  { slug: "warmwell", name: "Warmwell", postcode: "DT2" },
  { slug: "lychett-matravers", name: "Lychett Matravers", postcode: "BH16" },
  { slug: "blandford-forum", name: "Blandford Forum", postcode: "DT11" },
  { slug: "ringwood", name: "Ringwood", postcode: "BH24" },
  { slug: "kingston-maurward", name: "Kingston Maurward", postcode: "DT2" },
  { slug: "isle-of-purbeck", name: "Isle of Purbeck", postcode: "BH19-BH20" },
  { slug: "dorset", name: "Dorset", postcode: "All Areas" },
]

// Key services for location pages (most searched)
const LOCATION_SERVICES = [
  "gutter-cleaning",
  "roof-cleaning",
  "driveway-cleaning",
  "pressure-washing",
  "softwash",
  "patio-cleaning",
  "render-cleaning",
  "window-cleaning",
]

// Portfolio/case study pages
const PORTFOLIO_PAGES = [
  "commercial-patio",
  "garden-patio",
  "patio-cleaning",
  "render-clean",
  "roof-clean-biocide-treatment",
  "swanage-patio-wall-refresh",
]

export async function GET(request: Request) {
  const { origin } = new URL(request.url)
  const baseUrl = process.env.NODE_ENV === "production" ? BASE_URL : origin
  const lastmod = new Date().toISOString()

  const urls: { url: string; priority: string; changefreq: string }[] = []

  // Core pages
  urls.push(
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/about", priority: "0.8", changefreq: "monthly" },
    { url: "/contact", priority: "0.9", changefreq: "monthly" },
    { url: "/quote", priority: "0.9", changefreq: "monthly" },
    { url: "/services", priority: "0.9", changefreq: "weekly" },
    { url: "/pricing", priority: "0.8", changefreq: "monthly" },
    { url: "/our-work", priority: "0.8", changefreq: "weekly" },
    { url: "/blog", priority: "0.8", changefreq: "weekly" },
    { url: "/faq", priority: "0.7", changefreq: "monthly" },
    { url: "/service-areas", priority: "0.8", changefreq: "monthly" },
    { url: "/powerups", priority: "0.7", changefreq: "monthly" },
  )

  // All service pages
  SERVICES.forEach((service) => {
    urls.push({ url: `/services/${service}`, priority: "0.8", changefreq: "monthly" })
  })

  // Location + Service combination pages (critical for local SEO)
  LOCATIONS.forEach((location) => {
    LOCATION_SERVICES.forEach((service) => {
      urls.push({
        url: `/services/${service}/${location.slug}`,
        priority: "0.8",
        changefreq: "monthly",
      })
    })
  })

  // Location landing pages
  LOCATIONS.forEach((location) => {
    urls.push({
      url: `/service-areas/${location.slug}`,
      priority: "0.7",
      changefreq: "monthly",
    })
  })

  // Portfolio/case study pages
  PORTFOLIO_PAGES.forEach((page) => {
    urls.push({ url: `/portfolio/${page}`, priority: "0.7", changefreq: "monthly" })
  })

  // Blog posts
  blogPosts.forEach((post) => {
    urls.push({ url: `/blog/${post.slug}`, priority: "0.6", changefreq: "monthly" })
  })

  // Legal pages (lower priority)
  urls.push(
    { url: "/privacy", priority: "0.3", changefreq: "yearly" },
    { url: "/terms", priority: "0.3", changefreq: "yearly" },
    { url: "/cookies", priority: "0.3", changefreq: "yearly" },
  )

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls
  .map(
    ({ url, priority, changefreq }) => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
