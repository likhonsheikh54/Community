import Image from "next/image"

export function NetworksSection() {
  const networks = [
    {
      name: "TRC20",
      logo: "/placeholder.svg?height=80&width=80",
      description: "TRON-based USDT with low fees and fast transactions",
      benefits: ["Low transaction fees", "Fast confirmation times", "High throughput"],
    },
    {
      name: "ERC20",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Ethereum-based USDT with wide adoption and compatibility",
      benefits: ["Wide adoption", "Strong security", "Smart contract support"],
    },
    {
      name: "BEP20",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Binance Smart Chain USDT with low fees and fast transactions",
      benefits: ["Low gas fees", "Fast block times", "Binance ecosystem"],
    },
    {
      name: "BEP2",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Binance Chain USDT with high performance and low latency",
      benefits: ["High performance", "Low latency", "Binance DEX support"],
    },
    {
      name: "SOLANA",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Solana-based USDT with high throughput and low fees",
      benefits: ["Ultra-low fees", "High throughput", "Fast finality"],
    },
    {
      name: "POLYGON",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Polygon-based USDT with Ethereum security and low fees",
      benefits: ["Ethereum security", "Low transaction costs", "Fast transactions"],
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Supported Networks</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Send USDT across all major blockchain networks with optimized fees and transaction times
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {networks.map((network, index) => (
            <div
              key={index}
              className="bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6 flex items-center gap-4 border-b border-border">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={network.logo || "/placeholder.svg"}
                    alt={`${network.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{network.name}</h3>
                  <p className="text-sm text-muted-foreground">{network.description}</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-2">
                  {network.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

