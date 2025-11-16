import { NextResponse } from 'next/server'

// GET pricing data
export async function GET() {
  try {
    // In production, fetch from database
    const pricingData = {
      driveway: { baseRate: 2.5, easyAccess: 1, hardAccess: 1.3, noWater: 1.2 },
      patio: { baseRate: 2.3, easyAccess: 1, hardAccess: 1.25, noWater: 1.15 },
      roof: { baseRate: 3.5, easyAccess: 1, hardAccess: 1.4, noWater: 1.1 },
      walls: { baseRate: 2.0, easyAccess: 1, hardAccess: 1.3, noWater: 1.2 },
    }

    return NextResponse.json(pricingData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pricing' }, { status: 500 })
  }
}

// POST update pricing
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // In production, save to database
    console.log('Updating pricing:', data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update pricing' }, { status: 500 })
  }
}
