import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!, { disableWarningInBrowsers: true })

export async function GET() {
  try {
    const quotes = await sql`
      SELECT * FROM quote_requests 
      ORDER BY created_at DESC
    `
    return NextResponse.json(quotes)
  } catch (error) {
    console.error("Failed to fetch quotes:", error)
    return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json()

    await sql`
      UPDATE quote_requests 
      SET status = ${status}
      WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to update quote:", error)
    return NextResponse.json({ error: "Failed to update quote" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    await sql`
      DELETE FROM quote_requests 
      WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete quote:", error)
    return NextResponse.json({ error: "Failed to delete quote" }, { status: 500 })
  }
}
