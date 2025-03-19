import { Shield, Lock, Eye, FileCheck, AlertTriangle, RefreshCw } from "lucide-react"

export function SecuritySection() {
  const securityFeatures = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit and at rest using industry-standard protocols.",
    },
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "Two-Factor Authentication",
      description: "Additional security layer requiring verification beyond password.",
    },
    {
      icon: <Eye className="h-8 w-8 text-primary" />,
      title: "Transaction Monitoring",
      description: "Real-time monitoring of all transactions for suspicious activity.",
    },
    {
      icon: <FileCheck className="h-8 w-8 text-primary" />,
      title: "Compliance Checks",
      description: "Automated compliance checks to ensure regulatory adherence.",
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-primary" />,
      title: "Fraud Detection",
      description: "Advanced algorithms to detect and prevent fraudulent transactions.",
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-primary" />,
      title: "Regular Security Audits",
      description: "Periodic security audits and penetration testing by third-party experts.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Enterprise-Grade Security</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Your security is our top priority. Our platform implements multiple layers of protection.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="p-2 h-fit w-fit rounded-full bg-primary/10">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

