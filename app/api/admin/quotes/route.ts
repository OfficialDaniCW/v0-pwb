import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { requireAdminSession } from "@/lib/admin-auth"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const auth = await requireAdminSession(request)
  if (auth instanceof NextResponse) return auth

  try {
    const sql = neon(process.env.DATABASE_URL!)
    const quotes = await sql`SELECT * FROM quote_requests ORDER BY created_at DESC`
    return NextResponse.json(quotes)
  } catch {
    return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdminSession(request)
  if (auth instanceof NextResponse) return auth

  try {
    const sql = neon(process.env.DATABASE_URL!)
    const { id, status } = await request.json()
    await sql`UPDATE quote_requests SET status = ${status} WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to update quote" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdminSession(request)
  if (auth instanceof NextResponse) return auth

  try {
    const sql = neon(process.env.DATABASE_URL!)
    const { id } = await request.json()
    await sql`DELETE FROM quote_requests WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete quote" }, { status: 500 })
  }
}
