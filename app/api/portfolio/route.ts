import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { portfolioProjects } from "@/lib/portfolio-data"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // First, try to fetch from database
    const dbTransformations = await sql`
      SELECT id, title, before_image_url, after_image_url, service_type, location, description, featured, display_order
      FROM transformations
      ORDER BY display_order ASC, created_at DESC
      LIMIT 10
    `

    if (dbTransformations.length > 0) {
      console.log("[v0] Portfolio API: Returning", dbTransformations.length, "items from Neon database")
      
      // Map database response to match PortfolioProject interface
      const mappedProjects = dbTransformations.map((item: any) => ({
        id: item.id,
        title: item.title,
        service: item.service_type || "",
        serviceLink: "/services/pressure-washing",
        location: item.location || "",
        description: item.description || "",
        image: item.after_image_url,
        beforeImage: item.before_image_url,
        afterImage: item.after_image_url,
        link: `/portfolio/${item.title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`,
        serviceType: item.service_type || "",
      }))
      
      return NextResponse.json(mappedProjects)
    }

    // Fallback: seed database with static portfolio data if empty
    console.log("[v0] Portfolio API: Database empty, seeding with static data...")
    const seededProjects = []

    for (const project of portfolioProjects) {
      const result = await sql`
        INSERT INTO transformations (title, before_image_url, after_image_url, service_type, location, description, featured, display_order)
        VALUES (${project.title}, ${project.beforeImage}, ${project.afterImage}, ${project.service || ""}, ${project.location || ""}, ${project.description || ""}, true, ${project.id || 0})
        RETURNING id, title, before_image_url, after_image_url, service_type, location, description, featured, display_order
      `
      
      const mappedProject = {
        id: result[0].id,
        title: result[0].title,
        service: result[0].service_type || "",
        serviceLink: "/services/pressure-washing",
        location: result[0].location || "",
        description: result[0].description || "",
        image: result[0].after_image_url,
        beforeImage: result[0].before_image_url,
        afterImage: result[0].after_image_url,
        link: `/portfolio/${result[0].title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`,
        serviceType: result[0].service_type || "",
      }
      
      seededProjects.push(mappedProject)
    }

    console.log("[v0] Portfolio API: Seeded and returning", seededProjects.length, "items from Neon database")
    return NextResponse.json(seededProjects)
  } catch (error) {
    console.error("[v0] Portfolio API Error:", error)
    // Last resort: return static data if database fails
    return NextResponse.json(portfolioProjects)
  }
}
