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
      <main className="flex-1 pt-8">
        <section className="py-20 lg:text-start text-center lg:py-32">
          <div className="container px-3">
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
                <div className="flex flex-wrap lg:justify-start justify-center gap-4 pt-4">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-500/90">Start Free Trial</Button>
                  <Button size="lg" variant="outline">Book a Demo</Button>
                </div>
              </div>
              <div className="relative aspect-4/3 rounded overflow-hidden border border-border/50 bg-linear-to-br from-blue-500/10 to-transparent">
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
          <div className="container px-3">
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
          <div className="container px-3">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="order-2 lg:order-1">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "Technology", desc: "Manage B2B sales cycles and enterprise deals." },
                    { title: "Real Estate", desc: "Track property listings and client relationships." },
                    { title: "E-commerce", desc: "Customer segmentation and retention campaigns." },
                    { title: "Financial Services", desc: "Lead management for banking and insurance." }
                  ].map((industry, i) => (
                    <div key={i} className="p-6 rounded-xl border border-border bg-card/30">
                      <h4 className="font-bold mb-2 text-blue-500">{industry.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{industry.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Built for Every Industry</h2>
                <p className="text-muted-foreground">
                  MKX CRMS adapts to your business model with customizable pipelines, automation rules, and industry-specific templates to accelerate your sales process.
                </p>
                <ul className="space-y-4">
                  {[
                    "Custom sales pipelines for your unique process",
                    "Industry-specific lead scoring models",
                    "Automated follow-up sequences",
                    "Multi-touch attribution tracking"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
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
              <h2 className="text-3xl font-bold tracking-tight">Seamless Onboarding</h2>
              <p className="mt-4 text-muted-foreground">Get your team up and running with our proven 4-step implementation process.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { step: "01", title: "Analysis", desc: "We assess your current sales process and identify growth opportunities." },
                { step: "02", title: "Setup", desc: "Configure your custom pipelines, automation rules, and integrations." },
                { step: "03", title: "Import", desc: "Migrate your existing contacts, deals, and customer data securely." },
                { step: "04", title: "Launch", desc: "Team training and go-live with dedicated ongoing support." }
              ].map((step, i) => (
                <div key={i} className="relative p-8 rounded-2xl border border-border bg-card hover:border-blue-500/30 transition-all">
                  <span className="absolute -top-4 left-6 text-4xl font-black text-blue-500/10">{step.step}</span>
                  <h3 className="text-lg font-bold mb-2 mt-4">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to accelerate your sales?</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">Join 500+ enterprises using MKX Technologies to scale their business operations securely.</p>
            <Button size="lg" className="bg-blue-500 hover:bg-blue-500/90 px-12">Contact Sales</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
