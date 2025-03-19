import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { NetworksSection } from "@/components/networks-section"
import { SecuritySection } from "@/components/security-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "USDT Sender - Secure & Fast Multi-Network USDT Transfers",
  description:
    "Send USDT securely across TRC20, ERC20, BEP20, BEP2, SOLANA, and POLYGON networks with lightning-fast transfers and enterprise-grade security.",
  keywords: "USDT transfer, crypto transfer, TRC20, ERC20, BEP20, BEP2, SOLANA, POLYGON, secure crypto",
  openGraph: {
    title: "USDT Sender - Secure & Fast Multi-Network USDT Transfers",
    description:
      "Send USDT securely across TRC20, ERC20, BEP20, BEP2, SOLANA, and POLYGON networks with lightning-fast transfers and enterprise-grade security.",
    url: "https://usdt-sender.com",
    siteName: "USDT Sender",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "USDT Sender Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <NetworksSection />
      <SecuritySection />
      <FAQSection />
      <CTASection />
    </main>
  )
}

