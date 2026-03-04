import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { requireAdminSession } from "@/lib/admin-auth"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const auth = await requireAdminSession(request)
  if (auth instanceof NextResponse) return auth

  try {
    const sql = neon(process.env.DATABASE_URL!)
    const images = await sql`SELECT * FROM transformations ORDER BY display_order ASC, created_at DESC`
    return NextResponse.json(images)
  } catch {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminSession(request)
  if (auth instanceof NextResponse) return auth

  try {
    const sql = neon(process.env.DATABASE_URL!)
    const body = await request.json()
    const { title, location, service_type, before_image_url, after_image_url, description, featured } = body
    const result = await sql`
      INSERT INTO transformations (title, location, service_type, before_image_url, after_image_url, description, featured)
      VALUES (${title}, ${location}, ${service_type}, ${before_image_url}, ${after_image_url}, ${description}, ${featured})
      RETURNING *
    `
    return NextResponse.json(result[0])
  } catch {
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdminSession(request)
  if (auth instanceof NextResponse) return auth

  try {
    const sql = neon(process.env.DATABASE_URL!)
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
  } catch {
    return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdminSession(request)
  if (auth instanceof NextResponse) return auth

  try {
    const sql = neon(process.env.DATABASE_URL!)
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 })
    await sql`DELETE FROM transformations WHERE id = ${Number.parseInt(id)}`
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 })
  }
}
