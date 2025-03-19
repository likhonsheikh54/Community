import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { TransactionForm } from "@/components/dashboard/transaction-form"
import { TransactionHistory } from "@/components/dashboard/transaction-history"
import { NetworkStats } from "@/components/dashboard/network-stats"
import { AccountSummary } from "@/components/dashboard/account-summary"

export const metadata: Metadata = {
  title: "Dashboard | USDT Sender",
  description: "Manage your USDT transfers across multiple networks",
  robots: {
    index: false,
    follow: false,
  },
}

export default function DashboardPage() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <DashboardHeader />
      <div className="grid gap-6 md:grid-cols-3 mt-6">
        <div className="md:col-span-2 space-y-6">
          <TransactionForm />
          <TransactionHistory />
        </div>
        <div className="space-y-6">
          <AccountSummary />
          <NetworkStats />
        </div>
      </div>
    </main>
  )
}

