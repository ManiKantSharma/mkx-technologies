import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Zap, Globe, Share2, Layers } from "lucide-react";

const integrations = [
  { name: "SAP", category: "ERP", icon: Layers },
  { name: "QuickBooks", category: "Accounting", icon: Zap },
  { name: "Microsoft Dynamics 365", category: "CRM/ERP", icon: Layers },
  { name: "Salesforce", category: "CRM", icon: Globe },
  { name: "Slack", category: "Communication", icon: Share2 },
  { name: "AWS", category: "Cloud", icon: Layers },
  { name: "Stripe", category: "Payments", icon: Zap },
  { name: "Zoom", category: "Meeting", icon: Globe },
];

export default function IntegrationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <section className="py-20 lg:py-32">
          <div className="container px-3 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">Seamless <span className="text-accent">Integrations</span></h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect MKX Technologies with the tools you already use. Enhance your workflow with our extensive ecosystem.
            </p>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="space-y-16">
              {[
                {
                  title: "ERP & Accounting",
                  apps: [
                    { name: "SAP", desc: "Enterprise resource planning and data sync." },
                    { name: "QuickBooks", desc: "Automated accounting and tax filing." },
                    { name: "Microsoft Dynamics", desc: "Business applications and CRM sync." },
                    { name: "Xero", desc: "Cloud-based accounting for small businesses." }
                  ]
                },
                {
                  title: "Communication & Productivity",
                  apps: [
                    { name: "Slack", desc: "Real-time notifications and team updates." },
                    { name: "Microsoft Teams", desc: "Collaborative workflows and reporting." },
                    { name: "Gmail / G-Suite", desc: "Calendar sync and email automation." },
                    { name: "Zoom", desc: "Integrated meeting scheduling and recording." }
                  ]
                },
                {
                  title: "Payments & Commerce",
                  apps: [
                    { name: "Stripe", desc: "Secure global payment processing." },
                    { name: "PayPal", desc: "Alternative payment methods for POS." },
                    { name: "Shopify", desc: "Omnichannel inventory and sales sync." },
                    { name: "Razorpay", desc: "Optimized for the Indian business ecosystem." }
                  ]
                }
              ].map((category, i) => (
                <div key={i}>
                  <h2 className="text-2xl font-bold mb-8 border-b border-border pb-4">{category.title}</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {category.apps.map((app, j) => (
                      <div key={j} className="p-6 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-lg transition-all group">
                        <div className="h-10 w-10 rounded-lg bg-accent/5 flex items-center justify-center mb-4 group-hover:bg-accent/10">
                          <Zap className="h-5 w-5 text-accent" />
                        </div>
                        <h3 className="font-bold mb-2">{app.name}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{app.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-3 text-center">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-foreground">Build Your Own Integration</h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Our robust REST API and Webhooks allow you to connect MKX Technologies with any internal tool or custom workflow.
              </p>
              <div className="grid gap-8 md:grid-cols-3 mb-12">
                {[
                  { icon: Layers, title: "RESTful API", desc: "Full CRUD access to all your business data." },
                  { icon: Share2, title: "Webhooks", desc: "Real-time event notifications for automated flows." },
                  { icon: Globe, title: "SDKs", desc: "Native libraries for Node.js, Python, and Go." }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Button size="lg" className="bg-accent hover:bg-accent/90">Explore Developer Docs</Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
