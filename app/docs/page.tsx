import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book, Code, FileText, Search, Terminal, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const docSections = [
  {
    icon: Book,
    title: "HRMS Suite",
    desc: "Learn how to configure payroll cycles, attendance rules, and employee performance metrics within our HRMS."
  },
  {
    icon: Code,
    title: "CRMS API",
    desc: "Documentation for syncing leads, automating sales pipelines, and managing customer lifecycle through our REST APIs."
  },
  {
    icon: Terminal,
    title: "POS Integration",
    desc: "Technical guides for hardware setup, inventory syncing, and offline-first transaction processing."
  },
  {
    icon: Zap,
    title: "Third-Party Connect",
    desc: "Step-by-step guides for connecting MKX with SAP, QuickBooks, and Microsoft Dynamics 365."
  },
  {
    icon: FileText,
    title: "Developer SDKs",
    desc: "Official libraries for Node.js, Python, and Go to accelerate your custom development projects."
  },
  {
    icon: Search,
    title: "Security & Auth",
    desc: "Learn about OAuth 2.0 flows, API key management, and our RBAC implementation."
  }
];

const gettingStartedSteps = [
  { step: "01", title: "API Keys", desc: "Generate and manage your API credentials securely." },
  { step: "02", title: "Authentication", desc: "Implement OAuth 2.0 flows for secure access." },
  { step: "03", title: "First Integration", desc: "Make your first API call and test connectivity." },
  { step: "04", title: "Go Live", desc: "Deploy to production with monitoring and support." }
];

const supportOptions = [
  { title: "24/7 Technical Support", desc: "Round-the-clock assistance for critical issues" },
  { title: "Dedicated Account Manager", desc: "Personal guidance for enterprise implementations" },
  { title: "Community Forum", desc: "Connect with other developers and share solutions" },
  { title: "Video Tutorials", desc: "Step-by-step visual guides for common tasks" }
];

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-8">
        <section className="py-20 lg:text-start text-center lg:py-32">
          <div className="container px-3">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
                  Developer Resources
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                  Documentation <span className="text-accent">Hub</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Everything you need to integrate, build, and scale with MKX Technologies. From quick start guides to comprehensive API references, our documentation helps developers of all levels create powerful integrations.
                </p>
                <div className="flex flex-wrap lg:justify-start justify-center gap-4 pt-4">
                  <Button size="lg" className="bg-accent hover:bg-accent/90">Quick Start Guide</Button>
                  <Button size="lg" variant="outline">API Reference</Button>
                </div>
              </div>
              <div className="relative aspect-5/3 rounded overflow-hidden border border-border/50 bg-linear-to-br from-accent/10 to-transparent">
                <Image
                  src="/illustrations/integrations.png"
                  alt="Documentation and Integration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Explore by Product</h2>
              <p className="mt-4 text-muted-foreground">Comprehensive documentation for all MKX Technologies products.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {docSections.map((item, i) => (
                <div key={i} className="p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all group cursor-pointer">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-3">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Getting Started</h2>
              <p className="mt-4 text-muted-foreground">Get up and running with MKX APIs in 4 simple steps.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {gettingStartedSteps.map((step, i) => (
                <div key={i} className="relative p-8 rounded-2xl border border-border bg-card hover:border-accent/30 transition-all">
                  <span className="absolute -top-4 left-6 text-4xl font-black text-accent/10">{step.step}</span>
                  <h3 className="text-lg font-bold mb-2 mt-4">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="order-2 lg:order-1 space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Developer Support</h2>
                <p className="text-muted-foreground">
                  We're committed to helping developers succeed. From comprehensive documentation to dedicated support, we've got you covered.
                </p>
                <ul className="space-y-4">
                  {supportOptions.map((option, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      {option.title}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" className="bg-accent hover:bg-accent/90">Contact Support</Button>
                  <Button size="lg" variant="outline">Join Community</Button>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "REST API", desc: "Complete API reference with examples" },
                    { title: "Webhooks", desc: "Real-time event notifications" },
                    { title: "SDK Libraries", desc: "Official packages for major languages" },
                    { title: "Testing Tools", desc: "Sandbox environment for development" }
                  ].map((feature, i) => (
                    <div key={i} className="p-6 rounded-xl border border-border bg-card/30">
                      <h4 className="font-bold mb-2 text-accent">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to integrate?</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">Start building with MKX Technologies today and join thousands of developers creating innovative solutions.</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 px-12">
              Get API Keys
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
