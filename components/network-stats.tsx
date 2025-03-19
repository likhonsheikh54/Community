"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getNetworkStats } from "@/lib/network-service"

interface NetworkStat {
  network: string
  avgTime: string
  fee: string
  status: "operational" | "degraded" | "outage"
}

export function NetworkStats() {
  const [stats, setStats] = useState<NetworkStat[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const networkStats = await getNetworkStats()
        setStats(networkStats)
      } catch (error) {
        console.error("Failed to load network stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Status</CardTitle>
        <CardDescription>Current status and performance of supported networks</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="erc20">ERC20</TabsTrigger>
            <TabsTrigger value="trc20">TRC20</TabsTrigger>
            <TabsTrigger value="bep20">BEP20</TabsTrigger>
            <TabsTrigger value="solana">Solana</TabsTrigger>
            <TabsTrigger value="polygon">Polygon</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {isLoading ? (
              <p className="text-center text-muted-foreground py-4">Loading network stats...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div key={stat.network} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{stat.network}</h3>
                        <p className="text-sm text-muted-foreground">Avg Time: {stat.avgTime}</p>
                        <p className="text-sm text-muted-foreground">Fee: {stat.fee}</p>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${
                          stat.status === "operational"
                            ? "bg-green-100 text-green-800"
                            : stat.status === "degraded"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {stat.status.charAt(0).toUpperCase() + stat.status.slice(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Similar content for other tabs, filtered by network type */}
          {["erc20", "trc20", "bep20", "solana", "polygon"].map((network) => (
            <TabsContent key={network} value={network}>
              {isLoading ? (
                <p className="text-center text-muted-foreground py-4">Loading network stats...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stats
                    .filter((stat) => stat.network.toLowerCase().includes(network))
                    .map((stat) => (
                      <div key={stat.network} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{stat.network}</h3>
                            <p className="text-sm text-muted-foreground">Avg Time: {stat.avgTime}</p>
                            <p className="text-sm text-muted-foreground">Fee: {stat.fee}</p>
                          </div>
                          <div
                            className={`px-2 py-1 rounded-full text-xs ${
                              stat.status === "operational"
                                ? "bg-green-100 text-green-800"
                                : stat.status === "degraded"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {stat.status.charAt(0).toUpperCase() + stat.status.slice(1)}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

