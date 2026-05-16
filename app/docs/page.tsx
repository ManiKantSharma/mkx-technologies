import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Book, Code, FileText, Search, Terminal, Zap } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-24 pb-12 lg:pt-32 lg:pb-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(167,4,0,0.08)_0%,transparent_100%)]" />
          <div className="container px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                Documentation <span className="text-accent">Hub</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Everything you need to integrate, build, and scale with MKX Technologies.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    className="w-full rounded-full border border-border bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-6">
            <h2 className="text-2xl font-bold mb-10 text-center">Explore by Product</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
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
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-2xl border border-border/50 bg-card/50 hover:border-accent/30 transition-all group cursor-pointer">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
