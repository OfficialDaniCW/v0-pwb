export async function GET() {
  const appId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID
  const appSecret = process.env.INSTAGRAM_APP_SECRET

  if (!appId || !appSecret) {
    return Response.json(
      { error: "Instagram credentials not configured" },
      { status: 400 }
    )
  }

  try {
    // Exchange short-lived token for long-lived token
    // First, we need to get a user access token - this is typically done via OAuth flow
    // For now, we'll return the credentials needed for manual setup
    
    const tokenUrl = `https://graph.instagram.com/oauth/access_token?client_id=${appId}&client_secret=${appSecret}&grant_type=client_credentials`

    const response = await fetch(tokenUrl, {
      method: "POST",
    })

    if (!response.ok) {
      throw new Error(`Failed to get token: ${response.statusText}`)
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error("Error generating Instagram token:", error)
    return Response.json(
      { error: "Failed to generate token" },
      { status: 500 }
    )
  }
}
