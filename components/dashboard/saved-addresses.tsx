"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SavedAddress {
  id: string
  name: string
  address: string
  network: string
  dateAdded: string
}

export function SavedAddresses() {
  const [addresses, setAddresses] = useState<SavedAddress[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    network: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call to fetch saved addresses
    const fetchAddresses = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockAddresses: SavedAddress[] = [
          {
            id: "addr1",
            name: "Personal Wallet",
            address: "TNVrLBRdcKjgGKcXPTr3nMTiMnS8moKpBR",
            network: "TRC20",
            dateAdded: "2023-02-15",
          },
          {
            id: "addr2",
            name: "Business Account",
            address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            network: "ERC20",
            dateAdded: "2023-02-20",
          },
          {
            id: "addr3",
            name: "Investment Fund",
            address: "0x8901234567abcdef8901234567abcdef89012345",
            network: "BEP20",
            dateAdded: "2023-03-01",
          },
          {
            id: "addr4",
            name: "Trading Account",
            address: "8ZUgCKnxjYNgTAXQQUtz9UNsReaW4nwqXfYQKH9uQjgH",
            network: "SOLANA",
            dateAdded: "2023-03-05",
          },
        ]

        setAddresses(mockAddresses)
      } catch (error) {
        console.error("Failed to fetch addresses:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAddresses()
  }, [])

  // Filter addresses based on search term
  const filteredAddresses = addresses.filter(
    (addr) =>
      addr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      addr.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Format address for display
  const formatAddress = (address: string) => {
    if (address.length <= 12) return address
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Handle adding a new address
  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.address || !newAddress.network) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would be an API call
    const newId = `addr${addresses.length + 1}`
    const today = new Date().toISOString().split("T")[0]

    const newAddressEntry: SavedAddress = {
      id: newId,
      name: newAddress.name,
      address: newAddress.address,
      network: newAddress.network,
      dateAdded: today,
    }

    setAddresses([...addresses, newAddressEntry])
    setNewAddress({ name: "", address: "", network: "" })
    setIsAddDialogOpen(false)

    toast({
      title: "Address saved",
      description: "The address has been added to your saved addresses",
    })
  }

  // Handle deleting an address
  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))

    toast({
      title: "Address deleted",
      description: "The address has been removed from your saved addresses",
    })
  }

  // Handle copying address to clipboard
  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)

    toast({
      title: "Address copied",
      description: "The address has been copied to your clipboard",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Saved Addresses</CardTitle>
            <CardDescription>Manage your saved wallet addresses</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Address
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
                <DialogDescription>Save a new wallet address for quick access during transfers.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="E.g., Personal Wallet"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Wallet Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter wallet address"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="network">Network</Label>
                  <Select
                    value={newAddress.network}
                    onValueChange={(value) => setNewAddress({ ...newAddress, network: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TRC20">TRC20 (TRON)</SelectItem>
                      <SelectItem value="ERC20">ERC20 (Ethereum)</SelectItem>
                      <SelectItem value="BEP20">BEP20 (BSC)</SelectItem>
                      <SelectItem value="BEP2">BEP2 (Binance Chain)</SelectItem>
                      <SelectItem value="SOLANA">SOLANA</SelectItem>
                      <SelectItem value="POLYGON">POLYGON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAddress}>Save Address</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or address"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-muted-foreground">Loading addresses...</p>
          </div>
        ) : filteredAddresses.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-muted-foreground">No addresses found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Network</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAddresses.map((addr) => (
                  <TableRow key={addr.id}>
                    <TableCell className="font-medium">{addr.name}</TableCell>
                    <TableCell>{addr.network}</TableCell>
                    <TableCell>{formatAddress(addr.address)}</TableCell>
                    <TableCell>{addr.dateAdded}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleCopyAddress(addr.address)}>
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy address</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit address</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(addr.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete address</span>
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

