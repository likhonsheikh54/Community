import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Which USDT networks are supported?",
      answer:
        "We support USDT transfers across TRC20, ERC20, BEP20, BEP2, SOLANA, and POLYGON networks. This allows you to choose the most cost-effective and efficient network for your specific needs.",
    },
    {
      question: "How long do transfers typically take?",
      answer:
        "Transfer times vary by network, but our platform is optimized for speed. TRC20 transfers typically complete in seconds, while ERC20 may take a few minutes depending on network congestion. Our system prioritizes your transactions for the fastest possible confirmation.",
    },
    {
      question: "What are the fees for sending USDT?",
      answer:
        "Fees vary by network and transaction size. TRC20 typically has the lowest fees, while ERC20 may have higher fees during network congestion. Our platform displays the exact fee before you confirm any transaction, with no hidden charges.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Absolutely. We implement enterprise-grade encryption for all data, both in transit and at rest. We also use strict access controls, regular security audits, and follow industry best practices for data protection and privacy.",
    },
    {
      question: "Can I send USDT to any wallet address?",
      answer:
        "Yes, you can send USDT to any valid wallet address on the supported networks. However, it's crucial to ensure you're sending to the correct network type (e.g., don't send ERC20 USDT to a TRC20 address), as cross-network transfers are not supported and may result in lost funds.",
    },
    {
      question: "What should I do if my transaction is stuck or delayed?",
      answer:
        "Our platform includes a transaction monitoring system that automatically tracks the status of all transfers. If a transaction is delayed, you can view its status in your dashboard. For assistance with stuck transactions, our support team is available 24/7.",
    },
  ]

  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Find answers to common questions about our USDT transfer platform
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

