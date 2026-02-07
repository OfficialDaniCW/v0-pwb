import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"

const sql = neon(process.env.DATABASE_URL!, { disableWarningInBrowsers: true })

/**
 * ADMIN ONLY - One-time endpoint to hash and update a password
 * Usage: POST /api/admin/setup with { email, plainPassword }
 * This should be deleted after use for security
 */
export async function POST(request: Request) {
  try {
    const { email, plainPassword } = await request.json()

    if (!email || !plainPassword) {
      return NextResponse.json(
        { error: "Email and plainPassword are required" },
        { status: 400 },
      )
    }

    console.log(`[v0] Hashing password for ${email}...`)

    // Hash the password using bcrypt with 10 salt rounds
    const hashedPassword = await bcrypt.hash(plainPassword, 10)

    console.log(`[v0] Generated hash: ${hashedPassword}`)

    // Update the admin user
    const result = await sql`
      UPDATE admin_users
      SET password_hash = ${hashedPassword}
      WHERE email = ${email}
      RETURNING id, email, is_active
    `

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Admin user not found" },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: `Password updated for ${email}`,
      hash: hashedPassword,
      admin: result[0],
    })
  } catch (error) {
    console.error("[v0] Setup error:", error)
    return NextResponse.json(
      { error: "Setup failed" },
      { status: 500 },
    )
  }
}
