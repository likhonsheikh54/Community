"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock, ExternalLink } from "lucide-react"

interface Transaction {
  id: string
  hash: string
  from: string
  to: string
  amount: string
  network: string
  status: "completed" | "pending" | "flagged"
  timestamp: string
}

export function TransactionMonitoring() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      hash: "0x1234...abcd",
      from: "0xabcd...1234",
      to: "0x5678...efgh",
      amount: "500",
      network: "TRC20",
      status: "completed",
      timestamp: "2023-06-15 14:30",
    },
    {
      id: "2",
      hash: "0x5678...efgh",
      from: "0xefgh...5678",
      to: "0x9012...ijkl",
      amount: "1,200",
      network: "ERC20",
      status: "pending",
      timestamp: "2023-06-15 15:45",
    },
    {
      id: "3",
      hash: "0x9012...ijkl",
      from: "0xijkl...9012",
      to: "0x3456...mnop",
      amount: "750",
      network: "BEP20",
      status: "flagged",
      timestamp: "2023-06-15 16:20",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "flagged":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Monitoring</CardTitle>
        <CardDescription>Monitor and review recent transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-start justify-between p-3 border rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(tx.status)}
                  <span className="font-medium">{tx.amount} USDT</span>
                  <Badge variant="outline">{tx.network}</Badge>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  From: {tx.from} → To: {tx.to}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {tx.timestamp} • {tx.hash}
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            View All Transactions
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

