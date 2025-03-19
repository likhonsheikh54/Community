import { NextResponse } from "next/server"

// Mock transaction data - in a real app, this would come from a database
const mockTransactions = [
  {
    id: "1",
    hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    from: "0x1234567890abcdef1234567890abcdef12345678",
    to: "0xabcdef1234567890abcdef1234567890abcdef12",
    amount: "100",
    network: "TRC20",
    status: "confirmed",
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "2",
    hash: "0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321",
    from: "0x1234567890abcdef1234567890abcdef12345678",
    to: "0x9876543210abcdef9876543210abcdef98765432",
    amount: "50",
    network: "ERC20",
    status: "confirmed",
    timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
  },
  {
    id: "3",
    hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    from: "0x1234567890abcdef1234567890abcdef12345678",
    to: "0x5678901234abcdef5678901234abcdef56789012",
    amount: "75.5",
    network: "BEP20",
    status: "pending",
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
]

export async function GET() {
  // In a real app, you would check authentication here
  // const session = await getServerSession()
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }

  return NextResponse.json({ transactions: mockTransactions })
}

export async function POST(request: Request) {
  try {
    // In a real app, you would check authentication here
    // const session = await getServerSession()
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    const body = await request.json()

    // Validate the request
    if (!body.to || !body.amount || !body.network) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you would process the transaction here
    // For demo purposes, we'll just return a mock transaction hash
    const txHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`

    return NextResponse.json({
      success: true,
      transaction: {
        hash: txHash,
        status: "pending",
      },
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to process transaction" }, { status: 500 })
  }
}

