import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import type { NextRequest } from "next/server"

// This endpoint automatically publishes scheduled blog posts
// Can be called via Vercel Cron or manually
export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Vercel Cron or has valid auth
    const authHeader = request.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const sql = neon(process.env.DATABASE_URL!)

    // Find all scheduled posts where published_at <= NOW() and is_published = false
    const postsToPublish = await sql`
      SELECT id, title, slug, published_at
      FROM blog_posts
      WHERE is_published = false 
        AND published_at <= NOW()
      ORDER BY published_at ASC
    `

    if (postsToPublish.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No posts to publish",
        published: [],
      })
    }

    // Update all scheduled posts to published
    const updateResult = await sql`
      UPDATE blog_posts
      SET is_published = true, updated_at = NOW()
      WHERE is_published = false 
        AND published_at <= NOW()
      RETURNING id, title, slug, published_at
    `

    console.log(`[Blog Auto-Publish] Published ${updateResult.length} posts`)

    return NextResponse.json({
      success: true,
      message: `Published ${updateResult.length} scheduled post(s)`,
      published: updateResult.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        publishedAt: post.published_at,
      })),
    })
  } catch (error) {
    console.error("Failed to auto-publish posts:", error)
    return NextResponse.json(
      { error: "Failed to auto-publish posts" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify the request is from Vercel Cron or has valid auth
    const authHeader = request.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const sql = neon(process.env.DATABASE_URL!)

    // Check scheduled posts status
    const scheduledPosts = await sql`
      SELECT id, title, slug, published_at, is_published
      FROM blog_posts
      WHERE published_at IS NOT NULL
        AND published_at > NOW()
      ORDER BY published_at ASC
      LIMIT 10
    `

    const readyToPublish = await sql`
      SELECT id, title, slug, published_at
      FROM blog_posts
      WHERE is_published = false 
        AND published_at <= NOW()
    `

    return NextResponse.json({
      scheduledCount: scheduledPosts.length,
      readyToPublishCount: readyToPublish.length,
      scheduled: scheduledPosts,
      readyToPublish: readyToPublish,
    })
  } catch (error) {
    console.error("Failed to check scheduled posts:", error)
    return NextResponse.json(
      { error: "Failed to check scheduled posts" },
      { status: 500 }
    )
  }
}
