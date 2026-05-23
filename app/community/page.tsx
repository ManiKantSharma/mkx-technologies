"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { slideUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight, Github, Heart, Slack, Star, Twitter } from "lucide-react";

const initiatives = [
  {
    icon: Github,
    title: "MKX Open Source",
    desc: "Contribute to our core SDKs and UI components. Join 200+ active contributors.",
  },
  {
    icon: Star,
    title: "Early Adopter Program",
    desc: "Get exclusive access to pre-release features and help shape our roadmap.",
  },
  {
    icon: Heart,
    title: "Non-Profit Program",
    desc: "We provide free access to our tools for eligible non-profits and social enterprises.",
  },
];

const contributors = [
  { name: "Rahul S.", role: "Lead SDK Contributor", avatar: "RS" },
  { name: "Sarah J.", role: "Community Moderator", avatar: "SJ" },
  { name: "Anita K.", role: "Beta Tester", avatar: "AK" },
];

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(167,4,0,0.08)_0%,transparent_100%)]" />
          <div className="container px-3 text-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="mx-auto max-w-3xl"
            >
              <motion.h1 variants={slideUp} className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground mb-6">
                Join the <span className="text-accent">MKX Community</span>
              </motion.h1>
              <motion.p variants={slideUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Connect with thousands of developers and business leaders building the future with MKX.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 border-y border-border/40">
          <div className="container px-3">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">Community Initiatives</h2>
              <p className="mt-4 text-muted-foreground">Ways to get involved and grow with us.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {initiatives.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/50 hover:border-accent/30 transition-all group"
                >
                  <div className="h-12 w-12 rounded-xl bg-accent-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{item.desc}</p>
                  <Button variant="ghost" className="group-hover:text-accent p-0">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Featured Contributors</h2>
                <p className="text-muted-foreground mb-8">Recognizing the individuals who go above and beyond to help our community thrive.</p>
                <div className="space-y-4">
                  {contributors.map((c, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
                      <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm">
                        {c.avatar}
                      </div>
                      <div>
                        <p className="font-bold">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 rounded-3xl border border-border/50 bg-card shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Community Stats</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center p-6 rounded-2xl bg-accent-muted">
                    <p className="text-3xl font-bold text-accent">5k+</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Members</p>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-accent-muted">
                    <p className="text-3xl font-bold text-accent">200+</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Open Source PRs</p>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-accent-muted">
                    <p className="text-3xl font-bold text-accent">12+</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Annual Events</p>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-accent-muted">
                    <p className="text-3xl font-bold text-accent">50+</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Countries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to join the conversation?</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">Our community is waiting for you. Join our Discord or follow us on Twitter to stay updated.</p>
            <div className="flex justify-center gap-4">
              <Button className="bg-accent gap-2"><Slack className="h-4 w-4" /> Join Slack</Button>
              <Button variant="outline" className="gap-2"><Twitter className="h-4 w-4" /> Follow Us</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
