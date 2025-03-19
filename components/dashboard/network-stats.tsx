import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function NetworkStats() {
  const networks = [
    { name: "TRC20", percentage: 65, color: "bg-green-500" },
    { name: "ERC20", percentage: 20, color: "bg-blue-500" },
    { name: "BEP20", percentage: 10, color: "bg-yellow-500" },
    { name: "Other", percentage: 5, color: "bg-purple-500" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Usage</CardTitle>
        <CardDescription>Your transaction distribution by network</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {networks.map((network) => (
            <div key={network.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{network.name}</span>
                <span className="font-medium">{network.percentage}%</span>
              </div>
              <Progress value={network.percentage} className={network.color} />
            </div>
          ))}
          <div className="pt-2 text-xs text-muted-foreground">Based on your last 100 transactions</div>
        </div>
      </CardContent>
    </Card>
  )
}

