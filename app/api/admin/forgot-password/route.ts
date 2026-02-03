import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import crypto from "crypto"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if admin user exists with this email
    const result = await sql`
      SELECT id, email FROM admin_users WHERE email = ${email} LIMIT 1
    `

    if (result.length === 0) {
      // Don't reveal if email exists for security - return success anyway
      return NextResponse.json(
        { success: true, message: "If an account exists with this email, a reset link has been sent" },
        { status: 200 }
      )
    }

    const admin = result[0]

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Store reset token in database
    await sql`
      INSERT INTO password_reset_tokens (admin_id, token, expires_at)
      VALUES (${admin.id}, ${resetToken}, ${expiresAt})
    `

    // Update admin user with reset request time
    await sql`
      UPDATE admin_users
      SET reset_requested_at = NOW()
      WHERE id = ${admin.id}
    `

    // In production, you would send an email here with the reset link
    // For now, log it for development
    console.log(`[Password Reset] Reset link for ${email}: /admin/reset-password?token=${resetToken}`)

    return NextResponse.json({
      success: true,
      message: "If an account exists with this email, a reset link has been sent",
      // Only in development - remove in production
      resetLink: process.env.NODE_ENV === "development" ? `/admin/reset-password?token=${resetToken}` : undefined,
    })
  } catch (error) {
    console.error("Password reset request error:", error)
    return NextResponse.json({ error: "Failed to process password reset request" }, { status: 500 })
  }
}
