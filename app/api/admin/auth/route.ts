import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import { headers } from "next/headers"

const sql = neon(process.env.DATABASE_URL!, { disableWarningInBrowsers: true })

// Rate limiting: 5 attempts per 15 minutes
const MAX_ATTEMPTS = 5
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes in ms

async function checkRateLimit(email: string, ip: string) {
  const fifteenMinutesAgo = new Date(Date.now() - RATE_LIMIT_WINDOW)

  const recentAttempts = await sql`
    SELECT COUNT(*) as count
    FROM login_attempts
    WHERE email = ${email}
      AND attempt_time > ${fifteenMinutesAgo.toISOString()}
      AND success = false
  `

  const failedAttempts = Number(recentAttempts[0]?.count || 0)

  if (failedAttempts >= MAX_ATTEMPTS) {
    console.warn(`[v0] Rate limit exceeded for ${email} from ${ip}`)
    return false
  }

  return true
}

async function recordLoginAttempt(
  email: string,
  ip: string,
  success: boolean,
) {
  await sql`
    INSERT INTO login_attempts (email, ip_address, success)
    VALUES (${email}, ${ip}, ${success})
  `
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      )
    }

    // Get client IP for rate limiting
    const headersList = headers()
    const ip =
      (headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
        headersList.get("x-real-ip") ||
        "unknown") as string

    // Check rate limit
    const rateLimitOk = await checkRateLimit(email, ip)
    if (!rateLimitOk) {
      await recordLoginAttempt(email, ip, false)
      return NextResponse.json(
        {
          error: "Too many failed login attempts. Please try again in 15 minutes.",
        },
        { status: 429 },
      )
    }

    // Query admin user from database
    const result = await sql`
      SELECT id, email, password_hash, is_active
      FROM admin_users
      WHERE email = ${email}
      LIMIT 1
    `

    if (result.length === 0) {
      await recordLoginAttempt(email, ip, false)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const admin = result[0]

    // Check if account is active
    if (!admin.is_active) {
      await recordLoginAttempt(email, ip, false)
      return NextResponse.json(
        { error: "Account is disabled. Please contact support." },
        { status: 401 },
      )
    }

    // Compare password using bcrypt
    const passwordMatch = await bcrypt.compare(password, admin.password_hash)
    if (!passwordMatch) {
      await recordLoginAttempt(email, ip, false)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Successful login - record attempt
    await recordLoginAttempt(email, ip, true)

    // Update last login
    await sql`
      UPDATE admin_users
      SET last_login = NOW()
      WHERE id = ${admin.id}
    `

    return NextResponse.json({
      success: true,
      email: admin.email,
      id: admin.id,
    })
  } catch (error) {
    console.error("[v0] Admin auth error:", error)
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    )
  }
}
