// Server component — fetches from Neon, passes to client animation strip
import { neon } from "@neondatabase/serverless"
import { portfolioProjects } from "@/lib/portfolio-data"
import { ScrollingStrip } from "@/components/scrolling-strip"

interface TransformationItem {
  id: number
  title: string
  after_image_url: string
  service_type: string
  location: string
  link: string
}

async function getTransformations(): Promise<TransformationItem[]> {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const rows = await Promise.race([
      sql`
        SELECT id, title, after_image_url, service_type, location
        FROM transformations
        WHERE after_image_url IS NOT NULL AND after_image_url != ''
        ORDER BY display_order ASC, created_at DESC
        LIMIT 6
      `,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 4000)
      ),
    ])
    return rows.map((r: any) => ({
      id: r.id,
      title: r.title,
      after_image_url: r.after_image_url,
      service_type: r.service_type,
      location: r.location,
      link: "/our-work",
    })) as TransformationItem[]
  } catch {
    return []
  }
}

export async function ScrollingTransformations() {
  const dbItems = await getTransformations()

  // Fall back to static portfolio data if Neon returns nothing
  const items: TransformationItem[] =
    dbItems.length > 0
      ? dbItems
      : portfolioProjects.slice(0, 6).map((p) => ({
          id: p.id,
          title: p.title,
          after_image_url: p.afterImage,
          service_type: p.service,
          location: p.location,
          link: p.link,
        }))

  return <ScrollingStrip items={items} />
}
