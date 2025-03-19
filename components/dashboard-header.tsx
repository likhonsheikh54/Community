import { WalletConnect } from "@/components/wallet-connect"
import { NetworkSelector } from "@/components/network-selector"

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">USDT Transfer Dashboard</h1>
        <p className="text-muted-foreground">Securely send USDT to any wallet address</p>
      </div>
      <div className="flex items-center gap-4">
        <NetworkSelector />
        <WalletConnect />
      </div>
    </div>
  )
}

