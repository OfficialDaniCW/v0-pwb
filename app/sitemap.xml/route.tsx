const URLS = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/about", priority: "0.8", changefreq: "monthly" },
  { url: "/contact", priority: "0.8", changefreq: "monthly" },
  { url: "/services", priority: "0.9", changefreq: "weekly" },
  
  // Core Cleaning Services
  { url: "/services/pressure-washing", priority: "0.8", changefreq: "monthly" },
  { url: "/services/softwash", priority: "0.8", changefreq: "monthly" },
  { url: "/services/window-cleaning", priority: "0.8", changefreq: "monthly" },
  { url: "/services/driveway-cleaning", priority: "0.8", changefreq: "monthly" },
  { url: "/services/patio-decking", priority: "0.8", changefreq: "monthly" },
  
  // Roof & Gutter Services
  { url: "/services/roof-cleaning", priority: "0.8", changefreq: "monthly" },
  { url: "/services/gutter-cleaning", priority: "0.8", changefreq: "monthly" },
  { url: "/services/soffit-cleaning", priority: "0.8", changefreq: "monthly" },
  
  // Wall & Render Services
  { url: "/services/render-cleaning", priority: "0.8", changefreq: "monthly" },
  { url: "/services/exterior-walls", priority: "0.8", changefreq: "monthly" },
  
  // Specialist Services
  { url: "/services/glass-cleaning", priority: "0.8", changefreq: "monthly" },
  { url: "/services/solar-panel-cleaning", priority: "0.8", changefreq: "monthly" },
  { url: "/services/demossing", priority: "0.8", changefreq: "monthly" },
  { url: "/services/graffiti-removal", priority: "0.8", changefreq: "monthly" },
  { url: "/services/heritage-buildings", priority: "0.8", changefreq: "monthly" },
  
  // Property Maintenance
  { url: "/services/external-property-maintenance", priority: "0.8", changefreq: "monthly" },
  
  // Property Type Services
  { url: "/services/commercial", priority: "0.8", changefreq: "monthly" },
  { url: "/services/residential", priority: "0.8", changefreq: "monthly" },
  
  // Other Pages
  { url: "/powerups", priority: "0.7", changefreq: "monthly" },
  { url: "/our-work", priority: "0.7", changefreq: "weekly" },
  { url: "/blog", priority: "0.7", changefreq: "weekly" },
  { url: "/quote", priority: "0.9", changefreq: "monthly" },
  { url: "/pricing", priority: "0.8", changefreq: "monthly" },
  { url: "/service-areas", priority: "0.7", changefreq: "monthly" },
  { url: "/faq", priority: "0.7", changefreq: "monthly" },
  { url: "/privacy", priority: "0.3", changefreq: "yearly" },
  { url: "/terms", priority: "0.3", changefreq: "yearly" },
  { url: "/cookies", priority: "0.3", changefreq: "yearly" },
]

export async function GET(request: Request) {
  const { origin } = new URL(request.url)
  const lastmod = new Date().toISOString()

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${URLS.map(
  ({ url, priority, changefreq }) => `  <url>
    <loc>${origin}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
).join("\n")}
</urlset>`

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
