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
      return NextResponse.json(dbTransformations)
    }

    // Fallback: seed database with static portfolio data if empty
    console.log("[v0] Portfolio API: Database empty, seeding with static data...")
    const seededProjects = []

    for (const project of portfolioProjects) {
      const result = await sql`
        INSERT INTO transformations (title, before_image_url, after_image_url, service_type, location, description, featured, display_order)
        VALUES (${project.title}, ${project.beforeImage}, ${project.afterImage}, ${project.serviceType}, ${project.location || ""}, ${project.description || ""}, true, ${project.displayOrder || 0})
        RETURNING id, title, before_image_url, after_image_url, service_type, location, description, featured, display_order
      `
      seededProjects.push(result[0])
    }

    console.log("[v0] Portfolio API: Seeded and returning", seededProjects.length, "items from Neon database")
    return NextResponse.json(seededProjects)
  } catch (error) {
    console.error("[v0] Portfolio API Error:", error)
    // Last resort: return static data if database fails
    return NextResponse.json(portfolioProjects)
  }
}
