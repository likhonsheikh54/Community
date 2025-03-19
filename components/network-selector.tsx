"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const networks = [
  { value: "ethereum", label: "Ethereum Mainnet" },
  { value: "polygon", label: "Polygon" },
  { value: "bsc", label: "Binance Smart Chain" },
  { value: "arbitrum", label: "Arbitrum" },
  { value: "optimism", label: "Optimism" },
]

export function NetworkSelector() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("ethereum")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? networks.find((network) => network.value === value)?.label : "Select network..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search network..." />
          <CommandList>
            <CommandEmpty>No network found.</CommandEmpty>
            <CommandGroup>
              {networks.map((network) => (
                <CommandItem
                  key={network.value}
                  value={network.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === network.value ? "opacity-100" : "opacity-0")} />
                  {network.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

