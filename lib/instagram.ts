export interface InstagramPost {
  id: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url: string
  permalink: string
  caption?: string
  thumbnail_url?: string
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN

  // If no token is configured, return empty array to use static fallback images
  if (!token) {
    return []
  }

  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${token}&limit=6`

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      console.error(`Failed to fetch Instagram posts: ${response.statusText}`)
      return []
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error("Error fetching Instagram posts:", error)
    return []
  }
}
