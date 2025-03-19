import { Shield, Zap, Globe, Clock, Lock, Smartphone } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Secure Transactions",
      description: "Enterprise-grade encryption and security protocols to protect your assets and data.",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Multi-Network Support",
      description: "Send USDT across TRC20, ERC20, BEP20, BEP2, SOLANA, and POLYGON networks.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Lightning Fast Transfers",
      description: "Near-instant execution with optimized transaction processing.",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "24/7 Availability",
      description: "Always online & reliable service with continuous monitoring.",
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Admin Panel",
      description: "Comprehensive user, transaction & security management tools.",
    },
    {
      icon: <Smartphone className="h-10 w-10 text-primary" />,
      title: "Mobile Optimization",
      description: "Responsive UI/UX designed for all devices and screen sizes.",
    },
  ]

  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Our platform offers everything you need for secure and efficient USDT transfers
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col p-6 bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="p-2 w-fit rounded-full bg-primary/10 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground flex-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

