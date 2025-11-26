import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const transformations = await sql`
      SELECT id, title, before_image_url, after_image_url, service_type, location, description, featured, display_order
      FROM transformations
      WHERE featured = true
      ORDER BY display_order ASC, created_at DESC
      LIMIT 10
    `
    return NextResponse.json(transformations)
  } catch (error) {
    console.error("Error fetching transformations:", error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, before_image_url, after_image_url, service_type, location, description, featured, display_order } =
      body

    const result = await sql`
      INSERT INTO transformations (title, before_image_url, after_image_url, service_type, location, description, featured, display_order, created_at)
      VALUES (${title}, ${before_image_url}, ${after_image_url}, ${service_type}, ${location || ""}, ${description || ""}, ${featured || false}, ${display_order || 0}, NOW())
      RETURNING *
    `
    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating transformation:", error)
    return NextResponse.json({ error: "Failed to create transformation" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const {
      id,
      title,
      before_image_url,
      after_image_url,
      service_type,
      location,
      description,
      featured,
      display_order,
    } = body

    const result = await sql`
      UPDATE transformations
      SET title = ${title},
          before_image_url = ${before_image_url},
          after_image_url = ${after_image_url},
          service_type = ${service_type},
          location = ${location || ""},
          description = ${description || ""},
          featured = ${featured || false},
          display_order = ${display_order || 0}
      WHERE id = ${id}
      RETURNING *
    `
    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating transformation:", error)
    return NextResponse.json({ error: "Failed to update transformation" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }

    await sql`DELETE FROM transformations WHERE id = ${Number.parseInt(id)}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting transformation:", error)
    return NextResponse.json({ error: "Failed to delete transformation" }, { status: 500 })
  }
}
