"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  network: z.string({
    required_error: "Please select a network",
  }),
  recipient: z.string().min(10, {
    message: "Recipient address must be at least 10 characters",
  }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  memo: z.string().optional(),
  saveAddress: z.boolean().default(false),
  addressName: z.string().optional(),
})

export function TransferForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      network: "",
      recipient: "",
      amount: "",
      memo: "",
      saveAddress: false,
      addressName: "",
    },
  })

  const saveAddress = form.watch("saveAddress")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log(values)

      toast({
        title: "Transfer initiated",
        description: `${values.amount} USDT sent to ${values.recipient.substring(0, 6)}...${values.recipient.substring(values.recipient.length - 4)}`,
      })

      form.reset()
    } catch (error) {
      console.error("Transfer failed:", error)
      toast({
        title: "Transfer failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Send USDT</CardTitle>
        <CardDescription>Transfer USDT to any wallet address across multiple networks</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="network"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select network" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="trc20">TRC20 (TRON)</SelectItem>
                      <SelectItem value="erc20">ERC20 (Ethereum)</SelectItem>
                      <SelectItem value="bep20">BEP20 (BSC)</SelectItem>
                      <SelectItem value="bep2">BEP2 (Binance Chain)</SelectItem>
                      <SelectItem value="solana">SOLANA</SelectItem>
                      <SelectItem value="polygon">POLYGON</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the blockchain network for this transfer</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter wallet address" {...field} />
                  </FormControl>
                  <FormDescription>Enter the wallet address of the recipient</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (USDT)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormDescription>Enter the amount of USDT to send</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="memo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Memo (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Add a note to this transfer" {...field} />
                  </FormControl>
                  <FormDescription>Add an optional memo or reference for this transfer</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saveAddress"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Save this address</FormLabel>
                    <FormDescription>Add this address to your saved addresses for future use</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {saveAddress && (
              <FormField
                control={form.control}
                name="addressName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., John's Wallet" {...field} />
                    </FormControl>
                    <FormDescription>Give this address a name for easy identification</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Send USDT"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

