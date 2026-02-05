import { NextResponse } from "next/server"
import { portfolioProjects } from "@/lib/portfolio-data"

export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  try {
    return NextResponse.json(portfolioProjects)
  } catch (error) {
    console.error("Error fetching portfolio:", error)
    return NextResponse.json(
      { error: "Failed to fetch portfolio items" },
      { status: 500 }
    )
  }
}
