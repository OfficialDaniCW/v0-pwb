import { NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!, { disableWarningInBrowsers: true })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { campaign_id, send_now } = body

    if (!campaign_id) {
      return NextResponse.json({ error: "Campaign ID required" }, { status: 400 })
    }

    // Fetch campaign
    const campaigns = await sql`
      SELECT * FROM newsletter_campaigns WHERE id = ${campaign_id}
    `

    if (campaigns.length === 0) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    const campaign = campaigns[0]

    // Get subscribers based on target group
    let subscribers: any[] = []
    if (campaign.target_group === "all") {
      subscribers = await sql`
        SELECT id, email FROM newsletter_subscribers WHERE is_active = true
      `
    } else {
      subscribers = await sql`
        SELECT DISTINCT ns.id, ns.email
        FROM newsletter_subscribers ns
        JOIN newsletter_subscriber_groups nsg ON ns.id = nsg.subscriber_id
        WHERE ns.is_active = true AND nsg.group_name = ${campaign.target_group}
      `
    }

    // Create records for each recipient
    for (const subscriber of subscribers) {
      await sql`
        INSERT INTO newsletter_campaign_recipients (campaign_id, subscriber_id, status)
        VALUES (${campaign_id}, ${subscriber.id}, 'pending')
      `
    }

    // Update campaign status
    if (send_now) {
      await sql`
        UPDATE newsletter_campaigns
        SET status = 'sent', sent_at = CURRENT_TIMESTAMP, recipient_count = ${subscribers.length}
        WHERE id = ${campaign_id}
      `

      // TODO: Send actual emails using email service (Resend, SendGrid, etc)
      console.log(`[v0] Newsletter sending to ${subscribers.length} subscribers`)
    } else {
      await sql`
        UPDATE newsletter_campaigns
        SET recipient_count = ${subscribers.length}
        WHERE id = ${campaign_id}
      `
    }

    return NextResponse.json({
      success: true,
      message: `Newsletter queued for ${subscribers.length} recipients`,
      recipients_count: subscribers.length,
    })
  } catch (error) {
    console.error("[v0] Failed to send campaign:", error)
    return NextResponse.json({ error: "Failed to send campaign" }, { status: 500 })
  }
}
