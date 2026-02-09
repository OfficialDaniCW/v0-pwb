import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

// Mark this route as dynamic since it uses request.url
export const dynamic = "force-dynamic"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const limit = url.searchParams.get("limit")
    const slug = url.searchParams.get("slug")
    const includeScheduled = url.searchParams.get("includeScheduled") === "true"

    // If slug provided, fetch single post
    if (slug) {
      const rows = await sql`
        SELECT id, title, slug, excerpt, category, published_at, read_time_minutes, featured_image_url, is_published, content, author, tags
        FROM blog_posts
        WHERE slug = ${slug}
        LIMIT 1
      `

      if (rows.length === 0) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
      }

      const post = rows[0]

      // Check if post is published or should be shown
      if (!includeScheduled && post.published_at) {
        const publishDate = new Date(post.published_at)
        const now = new Date()
        if (publishDate > now) {
          return NextResponse.json({ error: "Post not published yet" }, { status: 404 })
        }
      }

      return NextResponse.json(post)
    }

    // Build query based on whether we include scheduled posts
    let rows
    if (includeScheduled) {
      if (limit) {
        rows = await sql`
          SELECT id, title, slug, excerpt, category, published_at, read_time_minutes, featured_image_url, is_published
          FROM blog_posts
          ORDER BY published_at DESC
          LIMIT ${Number.parseInt(limit)}
        `
      } else {
        rows = await sql`
          SELECT id, title, slug, excerpt, category, published_at, read_time_minutes, featured_image_url, is_published
          FROM blog_posts
          ORDER BY published_at DESC
        `
      }
    } else {
      if (limit) {
        rows = await sql`
          SELECT id, title, slug, excerpt, category, published_at, read_time_minutes, featured_image_url, is_published
          FROM blog_posts
          WHERE is_published = true AND published_at <= NOW()
          ORDER BY published_at DESC
          LIMIT ${Number.parseInt(limit)}
        `
      } else {
        rows = await sql`
          SELECT id, title, slug, excerpt, category, published_at, read_time_minutes, featured_image_url, is_published
          FROM blog_posts
          WHERE is_published = true AND published_at <= NOW()
          ORDER BY published_at DESC
        `
      }
    }

    return NextResponse.json(rows)
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
