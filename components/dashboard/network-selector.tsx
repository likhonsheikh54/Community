"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const networks = [
  { value: "trc20", label: "TRC20 (TRON)" },
  { value: "erc20", label: "ERC20 (Ethereum)" },
  { value: "bep20", label: "BEP20 (BSC)" },
  { value: "bep2", label: "BEP2 (Binance Chain)" },
  { value: "solana", label: "Solana" },
  { value: "polygon", label: "Polygon" },
]

export function NetworkSelector() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("trc20")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[180px] justify-between">
          {value ? networks.find((network) => network.value === value)?.label : "Select network..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0">
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

