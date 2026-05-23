"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Handshake, Star, TrendingUp, ShieldCheck, Zap, Globe, Award, CheckCircle2, ArrowRight } from "lucide-react";

const tiers = [
  { name: "Silver", requirements: "1-5 Clients", benefits: "10% Commission, Basic Support, Marketing Assets" },
  { name: "Gold", requirements: "6-20 Clients", benefits: "20% Commission, Priority Support, Co-Marketing" },
  { name: "Platinum", requirements: "21+ Clients", benefits: "30% Commission, Dedicated Manager, Custom SDKs" },
];

export default function PartnersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-8">
        <section className="py-20 text-center lg:py-32">
          <div className="container px-3">
            <div className="mx-auto max-w-3xl space-y-6">
              <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
                Partner Program
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                Grow with <span className="text-accent">MKX Technologies</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Join our elite partner ecosystem and deliver enterprise-grade SaaS solutions to your clients while building a sustainable revenue stream.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90">Apply to Partner Program</Button>
                <Button size="lg" variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Partner Tiers</h2>
              <p className="mt-4 text-muted-foreground">Tailored programs for every stage of your growth.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {tiers.map((tier, i) => (
                <div key={i} className="p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all text-center group">
                  <Award className="h-10 w-10 text-accent mx-auto mb-6 opacity-50" />
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-accent font-bold text-sm mb-4">{tier.requirements}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{tier.benefits}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-3">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Why Partner with Us?</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { icon: Star, title: "Generous Commissions", desc: "Earn competitive recurring revenue for every client you bring to the platform." },
                { icon: TrendingUp, title: "Co-Marketing Support", desc: "Access marketing resources, webinars, and sales support to grow your business." },
                { icon: ShieldCheck, title: "Technical Training", desc: "Get certified training and priority support from our engineering team." }
              ].map((benefit, i) => (
                <div key={i} className="p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                    <benefit.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-3">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight">Partner Resource Center</h2>
                <p className="text-muted-foreground">
                  Once you join the program, you gain access to a dedicated portal with all the tools you need to succeed.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "White-labeled marketing kits",
                    "Dedicated partner Slack channel",
                    "Sales enablement playbooks",
                    "Beta access to new features",
                    "Joint webinar opportunities",
                    "Priority technical support"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 rounded-3xl border border-border bg-card shadow-2xl relative overflow-hidden">
                <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded">
                  Success Story
                </div>
                <p className="text-lg italic text-foreground mb-6">
                  "Partnering with MKX Technologies allowed our agency to offer high-end HR solutions that were previously out of reach. Our revenue increased by 40% in just 6 months."
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-accent/20">
                    <Image
                      src="/team/rajesh.png"
                      alt="Rajesh Kumar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Rajesh Kumar</p>
                    <p className="text-xs text-muted-foreground">Director, RK Consulting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="py-24 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-3xl font-bold mb-6">Start Your Partnership Today</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10">Whether you are a consultant, agency, or technology provider, there is a place for you in the MKX ecosystem.</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 px-12">
              Submit Application
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
