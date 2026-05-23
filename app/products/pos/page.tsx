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
      <main className="flex-1 pt-24">
        <section className="py-20 lg:py-32">
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
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-500/90">Get Started</Button>
                  <Button size="lg" variant="outline">View Features</Button>
                </div>
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-border/50 bg-gradient-to-br from-accent/10 to-transparent">
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
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Certified Hardware Support</h2>
                <p className="text-muted-foreground">
                  MKX POS works with the hardware you already own or choose from our curated list of certified devices for a plug-and-play experience.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  {[
                    { title: "Tablets", desc: "iPad & Android Tablet support for mobile selling." },
                    { title: "Terminals", desc: "Integrated card readers from Verifone & Ingenico." },
                    { title: "Printers", desc: "Bluetooth & Network thermal receipt printers." },
                    { title: "Scanners", desc: "1D/2D barcode scanners for fast SKU entry." }
                  ].map((hw, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-card/30">
                      <div className="h-2 w-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                      <div>
                        <p className="font-bold text-sm">{hw.title}</p>
                        <p className="text-xs text-muted-foreground">{hw.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative p-8 rounded-3xl border border-border bg-card shadow-2xl">
                <h3 className="text-xl font-bold mb-6">Offline-First Architecture</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Don't let a patchy internet connection stop your sales. MKX POS uses a local-first synchronization engine that caches all data securely on your device.
                </p>
                <ul className="space-y-4">
                  {[
                    "Process payments offline",
                    "Automatic sync when back online",
                    "Encrypted local database",
                    "Zero-latency interface"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="h-5 w-5 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <Zap className="h-3 w-3 text-amber-500" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
