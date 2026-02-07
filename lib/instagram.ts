export interface InstagramPost {
  id: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url: string
  permalink: string
  caption?: string
  thumbnail_url?: string
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    // Call server API route instead of directly accessing token
    const response = await fetch("/api/instagram/token", {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      // Silently fail and use static fallback images
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
