"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Calendar, Pause, Play, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ScheduledTransfer {
  id: string
  recipient: {
    name: string
    address: string
  }
  amount: string
  network: string
  frequency: "one-time" | "daily" | "weekly" | "monthly"
  nextDate: string
  status: "active" | "paused"
}

export function ScheduledTransfers() {
  const [transfers, setTransfers] = useState<ScheduledTransfer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call to fetch scheduled transfers
    const fetchTransfers = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockTransfers: ScheduledTransfer[] = [
          {
            id: "sched1",
            recipient: {
              name: "Monthly Savings",
              address: "TNVrLBRdcKjgGKcXPTr3nMTiMnS8moKpBR",
            },
            amount: "100.00",
            network: "TRC20",
            frequency: "monthly",
            nextDate: "2023-04-01",
            status: "active",
          },
          {
            id: "sched2",
            recipient: {
              name: "Weekly Investment",
              address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            },
            amount: "50.00",
            network: "ERC20",
            frequency: "weekly",
            nextDate: "2023-03-22",
            status: "active",
          },
          {
            id: "sched3",
            recipient: {
              name: "Rent Payment",
              address: "0x8901234567abcdef8901234567abcdef89012345",
            },
            amount: "500.00",
            network: "BEP20",
            frequency: "monthly",
            nextDate: "2023-04-05",
            status: "paused",
          },
          {
            id: "sched4",
            recipient: {
              name: "One-time Transfer",
              address: "8ZUgCKnxjYNgTAXQQUtz9UNsReaW4nwqXfYQKH9uQjgH",
            },
            amount: "1000.00",
            network: "SOLANA",
            frequency: "one-time",
            nextDate: "2023-03-30",
            status: "active",
          },
        ]

        setTransfers(mockTransfers)
      } catch (error) {
        console.error("Failed to fetch scheduled transfers:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransfers()
  }, [])

  // Format address for display
  const formatAddress = (address: string) => {
    if (address.length <= 12) return address
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Handle toggling transfer status
  const toggleTransferStatus = (id: string) => {
    setTransfers(
      transfers.map((transfer) => {
        if (transfer.id === id) {
          const newStatus = transfer.status === "active" ? "paused" : "active"

          toast({
            title: `Transfer ${newStatus}`,
            description: `The scheduled transfer has been ${newStatus}`,
          })

          return {
            ...transfer,
            status: newStatus,
          }
        }
        return transfer
      }),
    )
  }

  // Handle deleting a transfer
  const deleteTransfer = (id: string) => {
    setTransfers(transfers.filter((transfer) => transfer.id !== id))

    toast({
      title: "Transfer deleted",
      description: "The scheduled transfer has been deleted",
    })
  }

  // Format frequency for display
  const formatFrequency = (frequency: string) => {
    switch (frequency) {
      case "one-time":
        return "One-time"
      case "daily":
        return "Daily"
      case "weekly":
        return "Weekly"
      case "monthly":
        return "Monthly"
      default:
        return frequency
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Scheduled Transfers</CardTitle>
            <CardDescription>Manage your recurring and scheduled USDT transfers</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Schedule
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Scheduled Transfer</DialogTitle>
                <DialogDescription>Set up a new recurring or one-time scheduled USDT transfer.</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-center text-muted-foreground">Scheduled transfer form would go here</p>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-muted-foreground">Loading scheduled transfers...</p>
          </div>
        ) : transfers.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-muted-foreground">No scheduled transfers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Network</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Next Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.map((transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transfer.recipient.name}</p>
                        <p className="text-sm text-muted-foreground">{formatAddress(transfer.recipient.address)}</p>
                      </div>
                    </TableCell>
                    <TableCell>{transfer.network}</TableCell>
                    <TableCell>{transfer.amount} USDT</TableCell>
                    <TableCell>{formatFrequency(transfer.frequency)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {transfer.nextDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      {transfer.status === "active" ? (
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                          Paused
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => toggleTransferStatus(transfer.id)}>
                          {transfer.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          <span className="sr-only">{transfer.status === "active" ? "Pause" : "Resume"}</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteTransfer(transfer.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

