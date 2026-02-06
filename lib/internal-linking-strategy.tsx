import Link from "next/link"
import { blogPosts } from "@/lib/blog-posts"
import { ChevronRight } from "lucide-react"

interface RelatedLink {
  title: string
  url: string
  type: "blog" | "service" | "location"
}

/**
 * Internal Linking Strategy for PowerWash Bros
 * Improves SEO by creating semantic connections between related content
 */

// Blog post related content mapping
export const BLOG_RELATED_CONTENT: Record<string, RelatedLink[]> = {
  "best-time-pressure-wash-driveway-dorset-2026": [
    { title: "Driveway Cleaning Services", url: "/services/driveway-cleaning", type: "service" },
    { title: "Spring Roof Maintenance Checklist", url: "/blog/spring-roof-maintenance", type: "blog" },
    { title: "DIY vs Professional Pressure Washing", url: "/blog/diy-vs-professional-pressure-washing", type: "blog" },
  ],
  "biocide-treatment-roof-cleaning-moss-removal-dorset-2026": [
    { title: "Roof Cleaning Services", url: "/services/roof-cleaning", type: "service" },
    { title: "Why Biocide Treatment is Essential", url: "/blog/biocide-treatment-roof-cleaning", type: "blog" },
    { title: "De-Mossing Services", url: "/services/demossing", type: "service" },
    { title: "Professional Gutter Cleaning Equipment", url: "/blog/professional-gutter-cleaning-equipment", type: "blog" },
  ],
  "how-often-clean-roof-dorset-seasonal-maintenance-guide": [
    { title: "Roof Cleaning Specialists", url: "/services/roof-cleaning", type: "service" },
    { title: "Winter Roof Care Guide", url: "/blog/winter-roof-care", type: "blog" },
    { title: "Roof Maintenance in Swanage", url: "/service-areas/swanage", type: "location" },
  ],
  "commercial-pressure-washing-services-dorset-industrial-cleaning": [
    { title: "Commercial Cleaning Services", url: "/services/commercial", type: "service" },
    { title: "Pressure Washing Solutions", url: "/services/pressure-washing", type: "service" },
    { title: "Before & After Case Studies", url: "/our-work", type: "service" },
  ],
}

// Service page related content mapping
export const SERVICE_RELATED_CONTENT: Record<string, RelatedLink[]> = {
  "roof-cleaning": [
    { title: "De-Mossing Services", url: "/services/demossing", type: "service" },
    { title: "Soffit Cleaning Specialists", url: "/services/soffit-cleaning", type: "service" },
    { title: "Why Biocide Treatment is Essential", url: "/blog/biocide-treatment-roof-cleaning", type: "blog" },
    { title: "Winter Roof Care Guide", url: "/blog/winter-roof-care", type: "blog" },
    { title: "Roof Cleaning in Purbeck", url: "/service-areas/purbeck", type: "location" },
  ],
  "gutter-cleaning": [
    { title: "Soffit & Fascia Cleaning", url: "/services/soffit-cleaning", type: "service" },
    { title: "Roof Cleaning", url: "/services/roof-cleaning", type: "service" },
    { title: "Professional Gutter Cleaning Equipment", url: "/blog/professional-gutter-cleaning-equipment", type: "blog" },
    { title: "Summer Storm Preparation Guide", url: "/blog/summer-storms-gutter-maintenance", type: "blog" },
  ],
  "driveway-cleaning": [
    { title: "Pressure Washing Services", url: "/services/pressure-washing", type: "service" },
    { title: "Patio & Decking Cleaning", url: "/services/patio-decking", type: "service" },
    { title: "Best Time to Pressure Wash Driveway", url: "/blog/best-time-pressure-wash-driveway", type: "blog" },
    { title: "Driveway Sealing Protection Guide", url: "/blog/driveway-sealing-after-pressure-washing", type: "blog" },
  ],
  "pressure-washing": [
    { title: "Softwash Method", url: "/services/softwash", type: "service" },
    { title: "Jet Washing vs Pressure Washing", url: "/blog/jet-washing-vs-pressure-washing", type: "blog" },
    { title: "DIY vs Professional Pressure Washing", url: "/blog/diy-vs-professional-pressure-washing", type: "blog" },
  ],
}

/**
 * Related Content Component for Blog Posts
 * Displays contextually relevant internal links
 */
export function RelatedBlogPosts({ currentSlug }: { currentSlug: string }) {
  const related = BLOG_RELATED_CONTENT[currentSlug] || []

  if (related.length === 0) return null

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <h3 className="text-xl font-semibold mb-6 text-white">Read Next</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {related.slice(0, 4).map((link, idx) => (
          <Link
            key={idx}
            href={link.url}
            className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm uppercase tracking-wider text-[#1E90FF] mb-1">
                  {link.type === "blog" ? "Blog" : link.type === "service" ? "Service" : "Location"}
                </p>
                <h4 className="font-semibold text-white group-hover:text-[#1E90FF] transition-colors">
                  {link.title}
                </h4>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-[#1E90FF] mt-1 ml-2 flex-shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

/**
 * Related Services Component for Service Pages
 * Displays complementary services and relevant blog content
 */
export function RelatedServices({ serviceSlug }: { serviceSlug: string }) {
  const related = SERVICE_RELATED_CONTENT[serviceSlug] || []

  if (related.length === 0) return null

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <h3 className="text-xl font-semibold mb-6 text-white">Complementary Services & Resources</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((link, idx) => (
          <Link
            key={idx}
            href={link.url}
            className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-[#1E90FF] mb-1">
                  {link.type === "blog" ? "Learn More" : link.type === "service" ? "Service" : "Service Area"}
                </p>
                <h4 className="font-semibold text-white group-hover:text-[#1E90FF] transition-colors line-clamp-2">
                  {link.title}
                </h4>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-[#1E90FF] mt-1 ml-2 flex-shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

/**
 * Breadcrumb Navigation for Internal Linking & SEO
 * Improves user experience and page structure
 */
export function BreadcrumbNavigation({
  items,
}: {
  items: Array<{ label: string; url: string }>
}) {
  return (
    <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <Link href={item.url} className="hover:text-white/90 transition-colors">
            {item.label}
          </Link>
          {idx < items.length - 1 && <ChevronRight className="w-4 h-4" />}
        </div>
      ))}
    </nav>
  )
}
