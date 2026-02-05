import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!, { disableWarningInBrowsers: true })

export async function GET() {
  try {
    const images = await sql`
      SELECT * FROM transformations 
      ORDER BY display_order ASC, created_at DESC
    `
    return NextResponse.json(images)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, location, service_type, before_image_url, after_image_url, description, featured } = body

    const result = await sql`
      INSERT INTO transformations (title, location, service_type, before_image_url, after_image_url, description, featured)
      VALUES (${title}, ${location}, ${service_type}, ${before_image_url}, ${after_image_url}, ${description}, ${featured})
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, title, location, service_type, before_image_url, after_image_url, description, featured } = body

    const result = await sql`
      UPDATE transformations 
      SET title = ${title}, location = ${location}, service_type = ${service_type}, 
          before_image_url = ${before_image_url}, after_image_url = ${after_image_url}, 
          description = ${description}, featured = ${featured}
      WHERE id = ${id}
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 })
  }
}
