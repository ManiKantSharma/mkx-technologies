import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Zap, Globe, Share2, Layers, Cloud, Database } from "lucide-react";

export default function IntegrationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-8">
        <section className="py-20 lg:text-start text-center lg:py-32">
          <div className="container px-3">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
                  Ecosystem
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                  Seamless <span className="text-accent">Integrations</span> Ecosystem
                </h1>
                <p className="text-lg text-muted-foreground">
                  Connect MKX Technologies with the tools you already use. Enhance your workflow with our extensive ecosystem of 200+ native integrations.
                </p>
                <div className="flex flex-wrap lg:justify-start justify-center gap-4 pt-4">
                  <Button size="lg" className="bg-accent hover:bg-accent/90">View All Integrations</Button>
                  <Button size="lg" variant="outline">API Documentation</Button>
                </div>
              </div>
              <div className="relative aspect-4.5/3 rounded overflow-hidden border border-border/50 bg-linear-to-br from-accent/10 to-transparent">
                <Image
                  src="/illustrations/integrations.png"
                  alt="Integrations Illustration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-border/40">
          <div className="container px-3">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Trusted by Industry Leaders</h2>
              <p className="mt-4 text-muted-foreground">See how businesses transform their operations with MKX integrations.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  quote: "The SAP integration reduced our data entry time by 70%. Our finance team now focuses on analysis instead of manual work.",
                  author: "Sarah Chen",
                  role: "CFO, TechCorp Inc.",
                  company: "Enterprise"
                },
                {
                  quote: "Connecting Slack with our HRMS transformed internal communication. Employee satisfaction scores increased by 40%.",
                  author: "Michael Roberts",
                  role: "HR Director, GlobalRetail",
                  company: "Retail"
                },
                {
                  quote: "The Stripe integration eliminated payment reconciliation errors. Our month-end close is now 3 days faster.",
                  author: "Emily Watson",
                  role: "Head of Operations, SaaSStartup",
                  company: "Startup"
                }
              ].map((testimonial, i) => (
                <div key={i} className="p-8 rounded-2xl border border-border bg-card/50 hover:bg-card transition-all">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="h-5 w-5 text-accent fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-bold text-foreground">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    <div className="text-[10px] text-accent font-medium mt-1">{testimonial.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Connect Your Entire Stack</h2>
              <p className="mt-4 text-muted-foreground">Powerful integrations across ERP, accounting, communication, and commerce platforms.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Layers, title: "ERP & Accounting", desc: "Sync with SAP, QuickBooks, and Microsoft Dynamics for unified operations." },
                { icon: Share2, title: "Communication", desc: "Real-time notifications via Slack, Teams, and Gmail integrations." },
                { icon: Zap, title: "Payments", desc: "Seamless transactions with Stripe, PayPal, and Razorpay connectivity." },
                { icon: Cloud, title: "Cloud Services", desc: "Native AWS and Azure integration for scalable infrastructure." },
                { icon: Globe, title: "E-commerce", desc: "Connect with Shopify, WooCommerce, and custom shopping platforms." },
                { icon: Database, title: "Data Analytics", desc: "Export to Tableau, Power BI, and custom dashboards." }
              ].map((feat, i) => (
                <div key={i} className="p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all group">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                    <feat.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feat.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-3">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="order-2 lg:order-1">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "Enterprise", desc: "SAP, Oracle, Microsoft Dynamics integration." },
                    { title: "SMB", desc: "QuickBooks, Xero, FreshBooks connectivity." },
                    { title: "Startups", desc: "Stripe, Slack, Google Workspace sync." },
                    { title: "Custom", desc: "Build your own with our developer tools." }
                  ].map((segment, i) => (
                    <div key={i} className="p-6 rounded-xl border border-border bg-card/30">
                      <h4 className="font-bold mb-2 text-accent">{segment.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{segment.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Built for Every Business Size</h2>
                <p className="text-muted-foreground">
                  From startups to enterprise corporations, our integration ecosystem scales with your business needs with pre-built connectors and custom development options.
                </p>
                <ul className="space-y-4">
                  {[
                    "Pre-configured templates for popular platforms",
                    "Custom API development for unique requirements",
                    "Real-time data synchronization",
                    "Enterprise-grade security and compliance"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Developer-First Platform</h2>
              <p className="mt-4 text-muted-foreground">Build custom integrations with our comprehensive developer tools.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { step: "01", title: "API Access", desc: "Full RESTful API with comprehensive documentation." },
                { step: "02", title: "Webhooks", desc: "Real-time event notifications for automation." },
                { step: "03", title: "SDKs", desc: "Native libraries for Node.js, Python, and Go." },
                { step: "04", title: "Support", desc: "Dedicated developer support and SLAs." }
              ].map((step, i) => (
                <div key={i} className="relative p-8 rounded-2xl border border-border bg-card hover:border-accent/30 transition-all">
                  <span className="absolute -top-4 left-6 text-4xl font-black text-accent/10">{step.step}</span>
                  <h3 className="text-lg font-bold mb-2 mt-4">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to integrate?</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">Join 500+ enterprises using MKX Technologies to scale their business operations securely.</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 px-12">Contact Sales</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
