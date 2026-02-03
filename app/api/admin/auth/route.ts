import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!, { disableWarningInBrowsers: true })

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Query admin user from database
    const result = await sql`
      SELECT id, email, password_hash, is_active
      FROM admin_users
      WHERE email = ${email}
      LIMIT 1
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const admin = result[0]

    // Check if account is active
    if (!admin.is_active) {
      return NextResponse.json({ error: "Account is disabled" }, { status: 401 })
    }

    // Simple password comparison (in production, use bcrypt)
    // For now, comparing plain text as stored in database
    if (password !== admin.password_hash) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Update last login
    await sql`
      UPDATE admin_users
      SET last_login = NOW()
      WHERE id = ${admin.id}
    `

    return NextResponse.json({ success: true, email: admin.email })
  } catch (error) {
    console.error("Admin auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
