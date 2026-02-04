import { NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!, { disableWarningInBrowsers: true })

// GET - Fetch campaigns
// POST - Create new campaign
// PUT - Update campaign
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")

    let query = "SELECT * FROM newsletter_campaigns ORDER BY created_at DESC"
    if (status) {
      query = `SELECT * FROM newsletter_campaigns WHERE status = '${status}' ORDER BY created_at DESC`
    }

    const campaigns = await sql(query)
    return NextResponse.json({ campaigns })
  } catch (error) {
    console.error("[v0] Failed to fetch campaigns:", error)
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      title,
      description,
      content,
      header_image_url,
      cta_text,
      cta_url,
      subject_line,
      target_group,
      scheduled_for,
    } = body

    // Validate required fields
    if (!title || !content || !subject_line) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const campaign = await sql`
      INSERT INTO newsletter_campaigns (
        title, description, content, header_image_url, cta_text, cta_url,
        subject_line, target_group, status, scheduled_for
      )
      VALUES (
        ${title}, ${description || null}, ${content}, ${header_image_url || null},
        ${cta_text || null}, ${cta_url || null}, ${subject_line}, ${target_group || "all"},
        ${scheduled_for ? "scheduled" : "draft"}, ${scheduled_for || null}
      )
      RETURNING *
    `

    return NextResponse.json({ campaign: campaign[0] })
  } catch (error) {
    console.error("[v0] Failed to create campaign:", error)
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, title, description, content, header_image_url, cta_text, cta_url, subject_line, target_group, scheduled_for } = body

    if (!id) {
      return NextResponse.json({ error: "Campaign ID required" }, { status: 400 })
    }

    const campaign = await sql`
      UPDATE newsletter_campaigns
      SET
        title = ${title},
        description = ${description || null},
        content = ${content},
        header_image_url = ${header_image_url || null},
        cta_text = ${cta_text || null},
        cta_url = ${cta_url || null},
        subject_line = ${subject_line},
        target_group = ${target_group || "all"},
        scheduled_for = ${scheduled_for || null},
        status = ${scheduled_for ? "scheduled" : "draft"},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `

    if (campaign.length === 0) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    return NextResponse.json({ campaign: campaign[0] })
  } catch (error) {
    console.error("[v0] Failed to update campaign:", error)
    return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 })
  }
}
