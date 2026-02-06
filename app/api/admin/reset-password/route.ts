import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"

const sql = neon(process.env.DATABASE_URL!, { disableWarningInBrowsers: true })

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json()

    if (!token || !newPassword) {
      return NextResponse.json({ error: "Token and new password are required" }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Find valid reset token
    const tokenResult = await sql`
      SELECT id, admin_id, expires_at, used_at
      FROM password_reset_tokens
      WHERE token = ${token}
      LIMIT 1
    `

    if (tokenResult.length === 0) {
      return NextResponse.json({ error: "Invalid or expired reset link" }, { status: 401 })
    }

    const resetToken = tokenResult[0]

    // Check if token has expired
    if (new Date(resetToken.expires_at) < new Date()) {
      return NextResponse.json({ error: "Reset link has expired" }, { status: 401 })
    }

    // Check if token has already been used
    if (resetToken.used_at) {
      return NextResponse.json({ error: "Reset link has already been used" }, { status: 401 })
    }

    // Hash the new password with bcrypt
    const passwordHash = await bcrypt.hash(newPassword, 10)

    // Update admin user password
    await sql`
      UPDATE admin_users
      SET password_hash = ${passwordHash},
          reset_requested_at = NULL
      WHERE id = ${resetToken.admin_id}
    `

    // Mark token as used
    await sql`
      UPDATE password_reset_tokens
      SET used_at = NOW()
      WHERE id = ${resetToken.id}
    `

    return NextResponse.json({ success: true, message: "Password has been reset successfully" })
  } catch (error) {
    console.error("[v0] Password reset error:", error)
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 })
  }
}
