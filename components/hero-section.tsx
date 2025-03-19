import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Globe } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Secure Multi-Network USDT Transfers
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Fast & Secure USDT Transfers Across Networks
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Send USDT securely across TRC20, ERC20, BEP20, BEP2, SOLANA, and POLYGON networks with lightning-fast
              transfers and enterprise-grade security.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Start Sending <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative lg:ml-auto">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="aspect-[16/9] bg-gradient-to-br from-primary to-primary-foreground/80 rounded-xl flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 p-6 text-white">
                  <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Shield className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium text-center">Secure Encryption</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Zap className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium text-center">Lightning Fast</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Globe className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium text-center">Multi-Network</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 h-24 w-24 bg-primary/20 rounded-full blur-xl" />
            <div className="absolute -top-4 -right-4 h-24 w-24 bg-primary/20 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

