import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BarChart3, Box, CreditCard, Shield, ShoppingBag, Zap } from "lucide-react";

export default function POSPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-8">
        <section className="py-20 lg:text-start text-center lg:py-32">
          <div className="container px-3">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="text-amber-500 border-amber-500/20 bg-amber-500/5">
                  Retail & Commerce
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                  The Next-Gen <span className="text-amber-500">MKX POS</span> System
                </h1>
                <p className="text-lg text-muted-foreground">
                  Empower your retail business with a cloud-based point-of-sale system that handles inventory, payments, and multi-store management effortlessly.
                </p>
                <div className="flex flex-wrap lg:justify-start justify-center gap-4 pt-4">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-500/90">Get Started</Button>
                  <Button size="lg" variant="outline">View Features</Button>
                </div>
              </div>
              <div className="relative aspect-4/3 rounded overflow-hidden border border-border/50 bg-linear-to-br from-amber-500/10 to-transparent">
                <Image
                  src="/illustrations/pos.png"
                  alt="POS Illustration"
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
              <h2 className="text-3xl font-bold tracking-tight">Built for Performance</h2>
              <p className="mt-4 text-muted-foreground">Manage everything from your front counter to your back office in real-time.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Zap, title: "Fast Checkout", desc: "Process transactions in seconds with our optimized interface." },
                { icon: Box, title: "Inventory Sync", desc: "Automated stock tracking across all locations and online stores." },
                { icon: CreditCard, title: "Multi-Payment", desc: "Accept all forms of payment securely, from cards to digital wallets." },
                { icon: BarChart3, title: "Real-time Reports", desc: "Get instant insights into your sales, staff performance, and profit margins." },
                { icon: Shield, title: "Offline Mode", desc: "Keep selling even when your internet connection goes down." },
                { icon: ShoppingBag, title: "Multi-Store Support", desc: "Manage 1 to 100+ stores from a single centralized dashboard." }
              ].map((feat, i) => (
                <div key={i} className="p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all group">
                  <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-6">
                    <feat.icon className="h-5 w-5 text-amber-500" />
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
                    { title: "Restaurants", desc: "Table management, kitchen orders, and split billing." },
                    { title: "Fashion Retail", desc: "Size tracking, seasonal inventory, and returns processing." },
                    { title: "Grocery Stores", desc: "Perishable stock management and weighted items." },
                    { title: "Automotive", desc: "Parts cataloging and service counter transactions." }
                  ].map((industry, i) => (
                    <div key={i} className="p-6 rounded-xl border border-border bg-card/30">
                      <h4 className="font-bold mb-2 text-amber-500">{industry.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{industry.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Designed for Your Business</h2>
                <p className="text-muted-foreground">
                  MKX POS adapts to your specific retail environment with industry-specific workflows, hardware integration, and inventory management features.
                </p>
                <ul className="space-y-4">
                  {[
                    "Industry-specific tax and compliance handling",
                    "Customizable receipt templates",
                    "Multi-location inventory synchronization",
                    "Integrated supplier management"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
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
              <h2 className="text-3xl font-bold tracking-tight">Quick Setup Process</h2>
              <p className="mt-4 text-muted-foreground">Get your store up and running with our streamlined 4-step implementation.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { step: "01", title: "Assessment", desc: "We evaluate your current setup and recommend the right hardware." },
                { step: "02", title: "Configuration", desc: "Set up your products, tax rules, and employee permissions." },
                { step: "03", title: "Hardware Setup", desc: "Install and configure your devices with our certified equipment." },
                { step: "04", title: "Training", desc: "Train your staff and go live with dedicated support." }
              ].map((step, i) => (
                <div key={i} className="relative p-8 rounded-2xl border border-border bg-card hover:border-amber-500/30 transition-all">
                  <span className="absolute -top-4 left-6 text-4xl font-black text-amber-500/10">{step.step}</span>
                  <h3 className="text-lg font-bold mb-2 mt-4">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to modernize your store?</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">Join 500+ enterprises using MKX Technologies to scale their business operations securely.</p>
            <Button size="lg" className="bg-amber-500 hover:bg-amber-500/90 px-12">Contact Sales</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
