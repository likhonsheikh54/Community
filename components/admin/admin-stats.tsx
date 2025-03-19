import { Card, CardContent } from "@/components/ui/card"
import { Users, ArrowUpDown, ShieldAlert, Clock } from "lucide-react"

export function AdminStats() {
  const stats = [
    {
      title: "Total Users",
      value: "2,845",
      change: "+12.5%",
      changeType: "positive",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Total Transactions",
      value: "12,458",
      change: "+23.1%",
      changeType: "positive",
      icon: <ArrowUpDown className="h-5 w-5" />,
    },
    {
      title: "Security Alerts",
      value: "5",
      change: "-2",
      changeType: "positive",
      icon: <ShieldAlert className="h-5 w-5" />,
    },
    {
      title: "Avg. Processing Time",
      value: "1.2s",
      change: "-0.3s",
      changeType: "positive",
      icon: <Clock className="h-5 w-5" />,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-full bg-primary/10">{stat.icon}</div>
              <div className={`text-sm ${stat.changeType === "positive" ? "text-green-500" : "text-red-500"}`}>
                {stat.change}
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

