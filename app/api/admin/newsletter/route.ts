import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!, { disableWarningInBrowsers: true })

export async function GET() {
  try {
    const subscribers = await sql`
      SELECT id, email, subscribed_at, is_active 
      FROM newsletter_subscribers 
      ORDER BY subscribed_at DESC
    `

    return NextResponse.json({ subscribers })
  } catch (error) {
    console.error("Failed to fetch newsletter subscribers:", error)
    return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 })
  }
}
