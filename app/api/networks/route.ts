import { NextResponse } from "next/server"
import { getNetworkStats, getNetworkDetails } from "@/lib/network-service"

// API route to get network stats
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const network = searchParams.get("network")

    if (network) {
      const details = await getNetworkDetails(network)
      if (!details) {
        return NextResponse.json({ error: "Network not found" }, { status: 404 })
      }
      return NextResponse.json({ network: details })
    }

    const networks = await getNetworkStats()
    return NextResponse.json({ networks })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to fetch network stats" }, { status: 500 })
  }
}

