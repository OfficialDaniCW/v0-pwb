export interface InstagramPost {
  id: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url: string
  permalink: string
  caption?: string
  thumbnail_url?: string
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const token = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN

  // If no token is configured, return empty array to use static fallback images
  if (!token) {
    console.log("[v0] Instagram token not configured, using static fallback posts")
    return []
  }

  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${token}&limit=6`

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      // Silently fail and use static fallback images
      // This handles 400, 401, 403, 404, etc. without logging
      return []
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    // Silently fail and use static fallback images instead of logging error
    // This prevents network errors, JSON parse errors, etc. from being logged
    return []
  }
}
