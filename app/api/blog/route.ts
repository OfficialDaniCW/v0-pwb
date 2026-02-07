import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

// Mark this route as dynamic since it uses request.url
export const dynamic = "force-dynamic"

// Transform blog posts from database to match API schema
function transformBlogPost(post: any) {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    category: post.category,
    published_at: post.published_at,
    read_time_minutes: post.read_time_minutes || 5,
    featured_image_url: post.featured_image_url || undefined,
    is_published: post.is_published,
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const limit = url.searchParams.get("limit")
    const slug = url.searchParams.get("slug")
    const includeScheduled = url.searchParams.get("includeScheduled") === "true"

    // If slug provided, fetch single post
    if (slug) {
      const result = await pool.query(
        "SELECT * FROM blog_posts WHERE slug = $1",
        [slug]
      )
      
      if (result.rows.length === 0) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
      }

      const post = result.rows[0]
      
      // Check if post is published or should be shown
      const publishDate = new Date(post.published_at)
      const now = new Date()
      
      if (publishDate > now && !includeScheduled) {
        return NextResponse.json({ error: "Post not published yet" }, { status: 404 })
      }
      
      return NextResponse.json(transformBlogPost(post))
    }

    // Query published posts from database
    let query = "SELECT * FROM blog_posts WHERE is_published = true"
    const params: any[] = []

    // For admin view, include scheduled posts
    if (includeScheduled) {
      query = "SELECT * FROM blog_posts"
    } else {
      // For public view, only show posts published on or before today
      query += " AND published_at <= NOW()"
    }

    // Sort by published date (newest first)
    query += " ORDER BY published_at DESC"

    // Apply limit if provided
    if (limit) {
      query += " LIMIT $1"
      params.push(Number.parseInt(limit))
    }

    const result = await pool.query(query, params)
    return NextResponse.json(result.rows.map(transformBlogPost))
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
