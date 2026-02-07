export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!token) {
    return Response.json(
      { data: [], error: "Instagram token not configured" },
      { status: 200 }
    )
  }

  try {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${token}&limit=6`

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      // Silently fail and return empty array to use static fallback images
      return Response.json({ data: [] })
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error("[Instagram API] Error:", error)
    // Return empty data array instead of error to gracefully fallback to static posts
    return Response.json({ data: [] })
  }
}
