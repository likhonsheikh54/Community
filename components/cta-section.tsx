import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Start Sending USDT?</h2>
          <p className="mt-4 text-xl text-primary-foreground/80 md:text-2xl">
            Join thousands of users who trust our platform for secure, fast USDT transfers across multiple networks.
          </p>
          <div className="mt-8">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/dashboard">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70">
            No registration fees. Enterprise-grade security. 24/7 support.
          </p>
        </div>
      </div>
    </section>
  )
}

