import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!, { disableWarningInBrowsers: true })

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")
    const slug = searchParams.get("slug")

    // If slug provided, fetch single post
    if (slug) {
      const posts = await sql`
        SELECT * FROM blog_posts 
        WHERE slug = ${slug} AND is_published = true
        LIMIT 1
      `
      if (posts.length === 0) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
      }
      return NextResponse.json(posts[0])
    }

    // Otherwise fetch all published posts
    if (limit) {
      const posts = await sql`
        SELECT * FROM blog_posts 
        WHERE is_published = true
        ORDER BY published_at DESC NULLS LAST
        LIMIT ${Number.parseInt(limit)}
      `
      return NextResponse.json(posts)
    }

    const posts = await sql`
      SELECT * FROM blog_posts 
      WHERE is_published = true
      ORDER BY published_at DESC NULLS LAST
    `
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
