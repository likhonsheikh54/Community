import type { Metadata } from "next"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminStats } from "@/components/admin/admin-stats"
import { UserManagement } from "@/components/admin/user-management"
import { TransactionMonitoring } from "@/components/admin/transaction-monitoring"
import { SecuritySettings } from "@/components/admin/security-settings"

export const metadata: Metadata = {
  title: "Admin Panel | USDT Sender",
  description: "Manage users, transactions, and security settings",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminPage() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <AdminHeader />
      <div className="grid gap-6 mt-6">
        <AdminStats />
        <div className="grid gap-6 md:grid-cols-2">
          <UserManagement />
          <TransactionMonitoring />
        </div>
        <SecuritySettings />
      </div>
    </main>
  )
}

