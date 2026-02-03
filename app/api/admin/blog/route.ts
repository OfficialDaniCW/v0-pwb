import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!, { disableWarningInBrowsers: true })

export async function GET() {
  try {
    const posts = await sql`
      SELECT * FROM blog_posts 
      ORDER BY published_at DESC NULLS LAST, updated_at DESC
    `
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      is_published,
      featured_image_url,
      read_time_minutes,
      author,
      tags,
    } = body

    const result = await sql`
      INSERT INTO blog_posts (
        title, 
        slug, 
        excerpt, 
        content, 
        category, 
        is_published, 
        published_at,
        featured_image_url,
        read_time_minutes,
        author,
        tags
      )
      VALUES (
        ${title}, 
        ${slug}, 
        ${excerpt}, 
        ${content}, 
        ${category}, 
        ${is_published}, 
        ${is_published ? new Date().toISOString() : null},
        ${featured_image_url || null},
        ${read_time_minutes || 5},
        ${author || "PowerWash Bros"},
        ${tags || []}
      )
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Failed to create post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const {
      id,
      title,
      slug,
      excerpt,
      content,
      category,
      is_published,
      featured_image_url,
      read_time_minutes,
      author,
      tags,
    } = body

    const result = await sql`
      UPDATE blog_posts 
      SET 
        title = ${title}, 
        slug = ${slug}, 
        excerpt = ${excerpt}, 
        content = ${content}, 
        category = ${category}, 
        is_published = ${is_published}, 
        updated_at = NOW(),
        published_at = ${is_published && !body.published_at ? new Date().toISOString() : body.published_at},
        featured_image_url = ${featured_image_url || null},
        read_time_minutes = ${read_time_minutes || 5},
        author = ${author || "PowerWash Bros"},
        tags = ${tags || []}
      WHERE id = ${id}
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Failed to update post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }

    await sql`DELETE FROM blog_posts WHERE id = ${Number.parseInt(id)}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete post:", error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
