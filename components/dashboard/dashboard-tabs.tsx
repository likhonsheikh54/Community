"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransferForm } from "@/components/dashboard/transfer-form"
import { TransactionHistory } from "@/components/dashboard/transaction-history"
import { SavedAddresses } from "@/components/dashboard/saved-addresses"
import { ScheduledTransfers } from "@/components/dashboard/scheduled-transfers"

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("transfer")

  return (
    <Tabs defaultValue="transfer" className="mt-6" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-4 w-full md:w-auto">
        <TabsTrigger value="transfer">Transfer</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger value="addresses">Addresses</TabsTrigger>
        <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
      </TabsList>
      <TabsContent value="transfer" className="mt-6">
        <TransferForm />
      </TabsContent>
      <TabsContent value="history" className="mt-6">
        <TransactionHistory />
      </TabsContent>
      <TabsContent value="addresses" className="mt-6">
        <SavedAddresses />
      </TabsContent>
      <TabsContent value="scheduled" className="mt-6">
        <ScheduledTransfers />
      </TabsContent>
    </Tabs>
  )
}

