import { NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if subscriber exists
    const existing = await sql`
      SELECT id FROM newsletter_subscribers WHERE email = ${email}
    `

    if (existing.length === 0) {
      return NextResponse.json({ error: "Email address not found in our system" }, { status: 404 })
    }

    // Update subscriber to inactive
    await sql`
      UPDATE newsletter_subscribers 
      SET is_active = false
      WHERE email = ${email}
    `

    return NextResponse.json({ 
      message: "You've been successfully unsubscribed from our newsletter." 
    })
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error)
    return NextResponse.json({ error: "Failed to unsubscribe. Please try again." }, { status: 500 })
  }
}
