import { blogPosts } from "@/lib/blog-posts"

const BASE_URL = "https://powerwashbros.co.uk"

// Portfolio images with alt text for SEO
const PORTFOLIO_IMAGES = [
  { slug: "commercial-patio", title: "Commercial Patio Cleaning Dorset", images: 3 },
  { slug: "garden-patio", title: "Garden Patio Cleaning Purbeck", images: 3 },
  { slug: "patio-cleaning", title: "Professional Patio Cleaning Services", images: 2 },
  { slug: "render-clean", title: "Render Cleaning & Exterior Walls Dorset", images: 2 },
  { slug: "roof-clean-biocide-treatment", title: "Roof Cleaning with Biocide Treatment", images: 3 },
  { slug: "swanage-patio-wall-refresh", title: "Patio & Wall Cleaning Swanage", images: 2 },
]

// Blog featured images
const BLOG_IMAGES = blogPosts.map((post) => ({
  url: post.featuredImage || `${BASE_URL}/og-image.jpg`,
  title: post.title,
  caption: post.excerpt,
}))

// Service page images
const SERVICE_IMAGES = [
  { title: "Pressure Washing Services", path: "/pressure-washing-banner.jpg" },
  { title: "Roof Cleaning Specialists", path: "/roof-cleaning-banner.jpg" },
  { title: "Gutter Cleaning Equipment", path: "/gutter-cleaning-banner.jpg" },
  { title: "Driveway Pressure Washing", path: "/driveway-washing-banner.jpg" },
  { title: "Softwash Cleaning Method", path: "/softwash-banner.jpg" },
  { title: "Window Cleaning Professional", path: "/window-cleaning-banner.jpg" },
]

export async function GET(request: Request) {
  const { origin } = new URL(request.url)
  const baseUrl = process.env.NODE_ENV === "production" ? BASE_URL : origin

  const imageUrls: { url: string; title: string; caption: string }[] = []

  // Add portfolio images
  PORTFOLIO_IMAGES.forEach((portfolio) => {
    for (let i = 1; i <= portfolio.images; i++) {
      imageUrls.push({
        url: `${baseUrl}/portfolio/${portfolio.slug}/image-${i}.jpg`,
        title: portfolio.title,
        caption: `${portfolio.title} - Image ${i}`,
      })
    }
  })

  // Add blog featured images
  imageUrls.push(...BLOG_IMAGES)

  // Add service banner images
  SERVICE_IMAGES.forEach((image) => {
    imageUrls.push({
      url: `${baseUrl}${image.path}`,
      title: image.title,
      caption: image.title,
    })
  })

  // Add OG image for social sharing
  imageUrls.push({
    url: `${baseUrl}/og-image.jpg`,
    title: "PowerWash Bros - Professional Cleaning Dorset",
    caption: "PowerWash Bros Professional Exterior Cleaning Services",
  })

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${imageUrls
    .map(
      (image) => `
  <url>
    <loc>${image.url}</loc>
    <image:image>
      <image:loc>${image.url}</image:loc>
      <image:title>${image.title}</image:title>
      <image:caption>${image.caption}</image:caption>
    </image:image>
  </url>
  `
    )
    .join("")}
</urlset>`

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
