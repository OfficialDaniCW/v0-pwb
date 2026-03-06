import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifySessionToken } from "@/lib/admin-auth"

const COOKIE_NAME = "pwb_admin"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only guard admin routes (except the login page itself)
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/")
  const isLoginPage = pathname.startsWith("/admin/login")

  if (isAdminRoute && !isLoginPage) {
    const token = request.cookies.get(COOKIE_NAME)?.value

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    const adminId = await verifySessionToken(token)
    if (!adminId) {
      // Token is invalid or expired — clear cookie and redirect
      const response = NextResponse.redirect(new URL("/admin/login", request.url))
      response.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" })
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
