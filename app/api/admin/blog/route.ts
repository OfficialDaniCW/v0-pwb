import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const posts = await sql`
      SELECT * FROM blog_posts 
      ORDER BY created_at DESC
    `
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, slug, excerpt, content, category, is_published } = body

    const result = await sql`
      INSERT INTO blog_posts (title, slug, excerpt, content, category, is_published, published_at)
      VALUES (${title}, ${slug}, ${excerpt}, ${content}, ${category}, ${is_published}, ${is_published ? new Date().toISOString() : null})
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, title, slug, excerpt, content, category, is_published } = body

    const result = await sql`
      UPDATE blog_posts 
      SET title = ${title}, slug = ${slug}, excerpt = ${excerpt}, content = ${content}, 
          category = ${category}, is_published = ${is_published}, updated_at = NOW(),
          published_at = ${is_published && !body.published_at ? new Date().toISOString() : body.published_at}
      WHERE id = ${id}
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}
