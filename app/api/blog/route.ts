import { NextResponse } from "next/server"
import { blogPosts } from "@/lib/blog-posts"

// Transform blog posts to match API schema expected by components
function transformBlogPost(post: (typeof blogPosts)[0]) {
  return {
    id: Math.random(), // Generate a simple ID
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    category: post.category,
    published_at: post.publishedAt,
    read_time_minutes: post.readTime,
    featured_image_url: post.featuredImage || undefined,
    related_service: post.relatedService,
    status: post.status || "published",
  }
}

// Filter posts based on publish date and status
function filterPublishedPosts(posts: (typeof blogPosts), includeScheduled: boolean = false) {
  const now = new Date()
  
  return posts.filter((post) => {
    const publishDate = new Date(post.publishedAt)
    
    // If including scheduled (admin view), return all
    if (includeScheduled) {
      return true
    }
    
    // For public view, only show posts published on or before today
    return publishDate <= now
  })
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const limit = url.searchParams.get("limit")
    const slug = url.searchParams.get("slug")
    const includeScheduled = url.searchParams.get("includeScheduled") === "true"

    // If slug provided, fetch single post
    if (slug) {
      const post = blogPosts.find((p) => p.slug === slug)
      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
      }
      
      // Check if post is published or should be shown
      const publishDate = new Date(post.publishedAt)
      const now = new Date()
      
      if (publishDate > now && !includeScheduled) {
        return NextResponse.json({ error: "Post not published yet" }, { status: 404 })
      }
      
      return NextResponse.json(transformBlogPost(post))
    }

    // Filter to published posts only (unless admin view)
    const publishedPosts = filterPublishedPosts(blogPosts, includeScheduled)

    // Sort posts by published date (newest first)
    const sortedPosts = [...publishedPosts].sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })

    // Apply limit if provided
    if (limit) {
      const limitedPosts = sortedPosts.slice(0, Number.parseInt(limit))
      return NextResponse.json(limitedPosts.map(transformBlogPost))
    }

    return NextResponse.json(sortedPosts.map(transformBlogPost))
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
