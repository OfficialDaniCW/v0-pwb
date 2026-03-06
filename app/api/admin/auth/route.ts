import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import { headers } from "next/headers"
import { createSessionToken, setSessionCookie, clearSessionCookie } from "@/lib/admin-auth"

const MAX_ATTEMPTS = 5
const RATE_LIMIT_WINDOW = 15 * 60 * 1000

async function checkRateLimit(sql: any, email: string, ip: string) {
  const fifteenMinutesAgo = new Date(Date.now() - RATE_LIMIT_WINDOW)
  const recentAttempts = await sql`
    SELECT COUNT(*) as count FROM login_attempts
    WHERE email = ${email} AND attempt_time > ${fifteenMinutesAgo.toISOString()} AND success = false
  `
  const failedAttempts = Number(recentAttempts[0]?.count || 0)
  if (failedAttempts >= MAX_ATTEMPTS) return false
  return true
}

async function recordLoginAttempt(sql: any, email: string, ip: string, success: boolean) {
  await sql`INSERT INTO login_attempts (email, ip_address, success) VALUES (${email}, ${ip}, ${success})`
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL!)
    const headersList = headers()
    const ip = (headersList.get("x-forwarded-for")?.split(",")[0].trim() || headersList.get("x-real-ip") || "unknown") as string

    const rateLimitOk = await checkRateLimit(sql, email, ip)
    if (!rateLimitOk) {
      await recordLoginAttempt(sql, email, ip, false)
      return NextResponse.json({ error: "Too many failed login attempts. Please try again in 15 minutes." }, { status: 429 })
    }

    const result = await sql`
      SELECT id, email, password_hash, is_active FROM admin_users WHERE email = ${email} LIMIT 1
    `

    if (result.length === 0) {
      await recordLoginAttempt(sql, email, ip, false)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const admin = result[0]

    if (!admin.is_active) {
      await recordLoginAttempt(sql, email, ip, false)
      return NextResponse.json({ error: "Account is disabled. Please contact support." }, { status: 401 })
    }

    const passwordMatch = await bcrypt.compare(password, admin.password_hash)
    if (!passwordMatch) {
      await recordLoginAttempt(sql, email, ip, false)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    await recordLoginAttempt(sql, email, ip, true)
    await sql`UPDATE admin_users SET last_login = NOW() WHERE id = ${admin.id}`

    // Create a signed HTTP-only cookie — never readable from JS
    const token = await createSessionToken(admin.id)
    const response = NextResponse.json({ success: true, email: admin.email })
    setSessionCookie(response, token)
    return response
  } catch (error) {
    console.error("Admin auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

export async function DELETE() {
  // Logout — clear the session cookie
  const response = NextResponse.json({ success: true })
  clearSessionCookie(response)
  return response
}
