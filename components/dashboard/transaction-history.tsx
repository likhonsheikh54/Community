"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

interface Transaction {
  id: string
  hash: string
  to: string
  amount: string
  network: string
  status: "pending" | "confirmed" | "failed"
  timestamp: number
}

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchTransactions = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data
        const mockTransactions: Transaction[] = [
          {
            id: "1",
            hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
            to: "0xabcdef1234567890abcdef1234567890abcdef12",
            amount: "100",
            network: "TRC20",
            status: "confirmed",
            timestamp: Date.now() - 86400000, // 1 day ago
          },
          {
            id: "2",
            hash: "0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321",
            to: "0x1234567890abcdef1234567890abcdef12345678",
            amount: "50",
            network: "ERC20",
            status: "confirmed",
            timestamp: Date.now() - 43200000, // 12 hours ago
          },
          {
            id: "3",
            hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
            to: "0x9876543210abcdef9876543210abcdef98765432",
            amount: "75.5",
            network: "BEP20",
            status: "pending",
            timestamp: Date.now() - 3600000, // 1 hour ago
          },
        ]

        setTransactions(mockTransactions)
      } catch (error) {
        console.error("Failed to fetch transactions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Your recent USDT transfers</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p className="text-center text-muted-foreground">No transactions found</p>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">To: {formatAddress(tx.to)}</p>
                      <Badge variant="outline">{tx.network}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{formatDate(tx.timestamp)}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <span>{formatAddress(tx.hash)}</span>
                      <ExternalLink className="h-3 w-3" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{tx.amount} USDT</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(tx.status)}`} />
                      <p className="text-sm text-muted-foreground">
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

