"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getTransactionHistory } from "@/lib/transaction-service"
import { formatAddress, formatDate } from "@/lib/utils"

interface Transaction {
  id: string
  hash: string
  to: string
  amount: string
  status: "pending" | "confirmed" | "failed"
  timestamp: number
}

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadTransactions() {
      try {
        const history = await getTransactionHistory()
        setTransactions(history)
      } catch (error) {
        console.error("Failed to load transaction history:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTransactions()
  }, [])

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
                    <p className="font-medium">To: {formatAddress(tx.to)}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(tx.timestamp)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{tx.amount} USDT</p>
                    <p
                      className={`text-sm ${tx.status === "confirmed" ? "text-green-500" : tx.status === "failed" ? "text-red-500" : "text-yellow-500"}`}
                    >
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </p>
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

