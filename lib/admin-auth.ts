/**
 * Admin session helpers
 *
 * Sessions are signed HMAC-SHA256 tokens stored in an HTTP-only cookie.
 * The cookie is never readable by JS on the client, eliminating XSS theft.
 * The signature prevents forgery without knowing ADMIN_SESSION_SECRET.
 *
 * Token format:  base64(adminId:timestamp):base64(hmacSignature)
 */

import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const COOKIE_NAME = "pwb_admin"
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000 // 24 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error("ADMIN_SESSION_SECRET env var is not set")
  return secret
}

async function hmac(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data))
  return Buffer.from(sig).toString("base64url")
}

/** Create a signed session token string for the given adminId */
export async function createSessionToken(adminId: number): Promise<string> {
  const payload = `${adminId}:${Date.now()}`
  const signature = await hmac(getSecret(), payload)
  return `${Buffer.from(payload).toString("base64url")}.${signature}`
}

/** Verify a token — returns the adminId or null if invalid/expired */
export async function verifySessionToken(token: string): Promise<number | null> {
  try {
    const [encodedPayload, signature] = token.split(".")
    if (!encodedPayload || !signature) return null

    const payload = Buffer.from(encodedPayload, "base64url").toString()
    const expected = await hmac(getSecret(), payload)

    // Constant-time comparison to prevent timing attacks
    if (expected.length !== signature.length) return null
    let diff = 0
    for (let i = 0; i < expected.length; i++) {
      diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i)
    }
    if (diff !== 0) return null

    const [adminId, timestamp] = payload.split(":")
    if (Date.now() - Number(timestamp) > SESSION_DURATION_MS) return null

    return Number(adminId)
  } catch {
    return null
  }
}

/** Set the HTTP-only session cookie on a NextResponse */
export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,       // not accessible from JS
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours in seconds
  })
}

/** Clear the session cookie */
export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  })
}

/**
 * Server-side guard for API route handlers.
 * Returns the adminId if valid session, otherwise returns a 401 NextResponse.
 *
 * Usage:
 *   const auth = await requireAdminSession(request)
 *   if (auth instanceof NextResponse) return auth
 *   // auth is now the numeric adminId
 */
export async function requireAdminSession(
  request: NextRequest | Request,
): Promise<number | NextResponse> {
  let token: string | undefined

  // Works for both NextRequest (middleware) and plain Request (route handlers)
  if (request instanceof Request && !(request as NextRequest).cookies) {
    const cookieHeader = request.headers.get("cookie") || ""
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`))
    token = match?.[1]
  } else {
    token = (request as NextRequest).cookies.get(COOKIE_NAME)?.value
  }

  if (!token) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
  }

  const adminId = await verifySessionToken(token)
  if (!adminId) {
    return NextResponse.json({ error: "Session expired" }, { status: 401 })
  }

  return adminId
}

/**
 * Server Component helper — reads the cookie store directly.
 * Returns true if the current request has a valid admin session.
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value
    if (!token) return false
    const id = await verifySessionToken(token)
    return id !== null
  } catch {
    return false
  }
}
