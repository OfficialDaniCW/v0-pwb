import { NextResponse } from "next/server"
import { portfolioProjects } from "@/lib/portfolio-data"

export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  try {
    console.log("[v0] Portfolio API called, returning", portfolioProjects.length, "projects")
    return NextResponse.json(portfolioProjects)
  } catch (error) {
    console.error("[v0] Error fetching portfolio:", error)
    return NextResponse.json(
      { error: "Failed to fetch portfolio items" },
      { status: 500 }
    )
  }
}
