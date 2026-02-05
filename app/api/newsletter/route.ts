import { NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!, { disableWarningInBrowsers: true })

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const email = formData.get("email")?.toString()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Check if email already exists
    const existing = await sql`
      SELECT id, is_active FROM newsletter_subscribers WHERE email = ${email}
    `

    if (existing.length > 0) {
      // If they exist but are inactive, reactivate them
      if (!existing[0].is_active) {
        await sql`
          UPDATE newsletter_subscribers 
          SET is_active = true, subscribed_at = NOW()
          WHERE email = ${email}
        `
        return NextResponse.json({ message: "Welcome back! You're resubscribed to our newsletter." })
      }
      return NextResponse.json({ message: "You're already subscribed to our newsletter!" })
    }

    // Insert new subscriber
    await sql`
      INSERT INTO newsletter_subscribers (email, is_active, subscribed_at)
      VALUES (${email}, true, NOW())
    `

    return NextResponse.json({ message: "Thanks for subscribing! Check your inbox soon." })
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 })
  }
}
