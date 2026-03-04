import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { requireAdminSession } from "@/lib/admin-auth"
import type { NextRequest } from "next/server"

export async function GET() {
  // Pricing is publicly readable for the quote calculator
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`SELECT service_key, base_rate, easy_access_multiplier, hard_access_multiplier, no_water_multiplier FROM pricing`

    // Shape into the format the frontend expects
    const pricing: Record<string, any> = {}
    for (const row of rows) {
      pricing[row.service_key] = {
        baseRate: parseFloat(row.base_rate),
        easyAccess: parseFloat(row.easy_access_multiplier),
        hardAccess: parseFloat(row.hard_access_multiplier),
        noWater: parseFloat(row.no_water_multiplier),
      }
    }

    return NextResponse.json(pricing)
  } catch {
    return NextResponse.json({ error: "Failed to fetch pricing" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminSession(request)
  if (auth instanceof NextResponse) return auth

  try {
    const sql = neon(process.env.DATABASE_URL!)
    const data = await request.json()

    // data shape: { driveway: { baseRate, easyAccess, hardAccess, noWater }, ... }
    for (const [serviceKey, values] of Object.entries(data) as [string, any][]) {
      await sql`
        INSERT INTO pricing (service_key, base_rate, easy_access_multiplier, hard_access_multiplier, no_water_multiplier, updated_at)
        VALUES (${serviceKey}, ${values.baseRate}, ${values.easyAccess}, ${values.hardAccess}, ${values.noWater}, NOW())
        ON CONFLICT (service_key) DO UPDATE
          SET base_rate = EXCLUDED.base_rate,
              easy_access_multiplier = EXCLUDED.easy_access_multiplier,
              hard_access_multiplier = EXCLUDED.hard_access_multiplier,
              no_water_multiplier = EXCLUDED.no_water_multiplier,
              updated_at = NOW()
      `
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to update pricing" }, { status: 500 })
  }
}
