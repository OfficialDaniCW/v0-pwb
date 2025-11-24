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

  if (!token) {
    console.warn("INSTAGRAM_ACCESS_TOKEN is not set. Using static fallback data.")
    return []
  }

  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${token}&limit=6`

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch Instagram posts: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error("Error fetching Instagram posts:", error)
    return []
  }
}
