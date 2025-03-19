import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react"

export function AccountSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Summary</CardTitle>
        <CardDescription>Your USDT balance and activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Total Balance</span>
            </div>
            <span className="text-xl font-bold">1,250.00 USDT</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                <ArrowUpRight className="h-4 w-4 text-red-500" />
                <span>Sent (30d)</span>
              </div>
              <span className="font-medium">450.00 USDT</span>
            </div>
            <div className="flex flex-col p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                <ArrowDownRight className="h-4 w-4 text-green-500" />
                <span>Received (30d)</span>
              </div>
              <span className="font-medium">750.00 USDT</span>
            </div>
          </div>
          <div className="pt-2 border-t">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Last activity</span>
              <span>2 hours ago</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

