import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BarChart3, Clock, Layout, Shield, Users } from "lucide-react";

export default function HRMSPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <section className="py-20 lg:py-32">
          <div className="container px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
                  Enterprise Solutions
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                  Streamline Your People Operations with <span className="text-accent">MKX HRMS</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  The all-in-one HR management system designed to automate payroll, tracking, and performance management for modern teams.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" className="bg-accent hover:bg-accent/90">Get Started</Button>
                  <Button size="lg" variant="outline">Watch Demo</Button>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border/50 bg-gradient-to-br from-accent/10 to-transparent">
                <Image
                  src="/illustrations/hrms.png"
                  alt="HRMS Illustration"
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
              <h2 className="text-3xl font-bold tracking-tight">Powerful Features for HR Teams</h2>
              <p className="mt-4 text-muted-foreground">Everything you need to manage your workforce efficiently and securely.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Layout, title: "Automated Payroll", desc: "Complex tax calculations and direct deposits made simple." },
                { icon: Clock, title: "Time Tracking", desc: "Advanced attendance management with geo-fencing capabilities." },
                { icon: BarChart3, title: "Performance Analytics", desc: "Data-driven insights to help grow your internal talent." },
                { icon: Shield, title: "Compliance Ready", desc: "Stay compliant with local and international labor laws automatically." },
                { icon: Users, title: "Self-Service Portal", desc: "Empower employees to manage their own data and leave requests." },
                { icon: BarChart3, title: "Reporting", desc: "Custom report builder for every metric your business needs." }
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
          <div className="container px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="order-2 lg:order-1">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "Healthcare", desc: "Shift management and compliance for medical staff." },
                    { title: "Manufacturing", desc: "Roster optimization and labor cost tracking." },
                    { title: "Technology", desc: "Global payroll and remote team engagement." },
                    { title: "Retail", desc: "Seasonal hiring and multi-store attendance." }
                  ].map((industry, i) => (
                    <div key={i} className="p-6 rounded-xl border border-border bg-card/30">
                      <h4 className="font-bold mb-2 text-accent">{industry.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{industry.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Tailored for your Industry</h2>
                <p className="text-muted-foreground">
                  MKX HRMS isn't a one-size-fits-all solution. We've built specific workflows and compliance templates for key industries to ensure you hit the ground running.
                </p>
                <ul className="space-y-4">
                  {[
                    "Custom shift patterns for 24/7 operations",
                    "Industry-specific compliance reporting",
                    "Automated certifications tracking",
                    "Union and labor contract management"
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
          <div className="container px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Smooth Implementation</h2>
              <p className="mt-4 text-muted-foreground">Our 4-step process to get your team up and running in weeks, not months.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { step: "01", title: "Discovery", desc: "We map your current processes and identify automation goals." },
                { step: "02", title: "Configuration", desc: "Setting up your custom rules, payroll cycles, and structures." },
                { step: "03", title: "Data Migration", desc: "Securely importing your existing employee data and history." },
                { step: "04", title: "Go-Live", desc: "Team training and final rollout with dedicated support." }
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
          <div className="container px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to transform your HR?</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">Join 500+ enterprises using MKX Technologies to scale their business operations securely.</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 px-12">Contact Sales</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
