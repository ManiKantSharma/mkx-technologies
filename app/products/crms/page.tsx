import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { TrendingUp, Target, MessageSquare, Shield, BarChart3, Zap } from "lucide-react";

export default function CRMSPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <section className="py-20 lg:py-32">
          <div className="container px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="text-blue-500 border-blue-500/20 bg-blue-500/5">
                  Growth & Sales
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                  Master Your Customer Relationships with <span className="text-blue-500">MKX CRMS</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Build deeper connections, close deals faster, and drive sustainable growth with our intelligent customer management platform.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-500/90">Start Free Trial</Button>
                  <Button size="lg" variant="outline">Book a Demo</Button>
                </div>
              </div>
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-border/50 bg-gradient-to-br from-accent/10 to-transparent">
                <Image
                  src="/illustrations/crms.png"
                  alt="CRMS Illustration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Everything You Need to Grow</h2>
              <p className="mt-4 text-muted-foreground">Automate your sales pipeline and provide exceptional customer support.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Target, title: "Lead Management", desc: "Track leads from first touch to close with automated scoring." },
                { icon: Zap, title: "Sales Automation", desc: "Automate follow-ups and reminders to keep the momentum going." },
                { icon: MessageSquare, title: "Omnichannel Support", desc: "Communicate with customers across email, chat, and social." },
                { icon: BarChart3, title: "Advanced Analytics", desc: "Predict future sales and identify growth opportunities." },
                { icon: TrendingUp, title: "Pipeline Tracking", desc: "Visual pipeline management to keep your sales team aligned." },
                { icon: Shield, title: "Secure Data", desc: "Enterprise-grade encryption for all your customer interactions." }
              ].map((feat, i) => (
                <div key={i} className="p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all group">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6">
                    <feat.icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feat.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-6">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight">The MKX Sales Funnel</h2>
                <p className="mt-4 text-muted-foreground">Visualize your entire customer journey in one place.</p>
              </div>
              <div className="space-y-4">
                {[
                  { stage: "Awareness", width: "w-full", color: "bg-blue-500/20", count: "10,000+ Leads" },
                  { stage: "Interest", width: "w-4/5", color: "bg-blue-500/40", count: "2,500 Qualified" },
                  { stage: "Decision", width: "w-3/5", color: "bg-blue-500/60", count: "800 Opportunities" },
                  { stage: "Action", width: "w-2/5", color: "bg-blue-500/80", count: "350 Closed Deals" }
                ].map((funnel, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-bold text-right">{funnel.stage}</div>
                    <div className={`h-12 ${funnel.width} ${funnel.color} rounded-r-full flex items-center px-6 text-sm font-bold text-foreground`}>
                      {funnel.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-6">
             <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight">Native Integrations</h2>
                <p className="mt-4 text-muted-foreground">Connect your sales stack effortlessly.</p>
             </div>
             <div className="grid gap-6 md:grid-cols-4">
                {[
                  "Slack", "Gmail", "Mailchimp", "QuickBooks", 
                  "LinkedIn", "Zendesk", "WhatsApp", "Zoom"
                ].map((app) => (
                  <div key={app} className="p-6 rounded-xl border border-border bg-card flex items-center justify-center font-bold text-muted-foreground hover:text-blue-500 transition-colors">
                    {app}
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
