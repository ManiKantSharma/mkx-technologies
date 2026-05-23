"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Mail, Phone, Rocket, Shield, Zap, Book, ArrowRight, FileQuestion } from "lucide-react";
import { motion } from "framer-motion";
import { slideUp, staggerContainer, fadeIn } from "@/lib/animations";

const categories = [
  { icon: Rocket, title: "Getting Started", count: 12 },
  { icon: Shield, title: "Security & Access", count: 8 },
  { icon: Zap, title: "Integrations", count: 15 },
  { icon: Book, title: "User Guides", count: 24 },
];

const faqs = [
  {
    q: "How do I automate payroll in MKX HRMS?",
    a: "You can set up automated payroll cycles in the 'Payroll Settings' tab. Simply define your pay period, tax components, and employee bank details, and the system will handle the rest."
  },
  {
    q: "How do I sync MKX POS with my online store?",
    a: "MKX POS offers built-in integrations for popular e-commerce platforms. Go to 'Integrations' > 'Ecommerce' in your POS dashboard to start the sync process."
  },
  {
    q: "Can I manage multiple sales pipelines in MKX CRMS?",
    a: "Yes, our CRMS allows you to create and manage multiple pipelines for different products or sales teams, each with its own custom stages."
  },
  {
    q: "What are your support response times?",
    a: "Our standard response time is within 24 hours. Enterprise clients enjoy priority support with guaranteed responses within 2 hours."
  }
];

export default function HelpPage() {
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
                How can we <span className="text-accent">help?</span>
              </motion.h1>
              <motion.div variants={slideUp} className="relative mx-auto max-w-xl">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-12 pl-10 pr-4 focus:ring-accent"
                  placeholder="Search for articles, guides, or tutorials..."
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 border-y border-border/40">
          <div className="container px-3">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {categories.map((cat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-accent/30 transition-all cursor-pointer group"
                >
                  <div className="h-12 w-12 rounded-xl bg-accent-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <cat.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-bold mb-1">{cat.title}</h3>
                  <p className="text-xs text-muted-foreground">{cat.count} Articles</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="mb-8 text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {faqs.map((faq, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="p-6 rounded-xl border border-border bg-card/30"
                    >
                      <h4 className="text-lg font-semibold mb-2 flex gap-3">
                        <FileQuestion className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        {faq.q}
                      </h4>
                      <p className="text-muted-foreground text-sm pl-8">{faq.a}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-8 rounded-2xl border border-border/50 bg-card shadow-sm">
                  <h3 className="mb-6 text-xl font-bold">Contact Support</h3>
                  <div className="space-y-6">
                    {[
                      { icon: MessageSquare, title: "Live Chat", desc: "Available 24/7 for Enterprise" },
                      { icon: Mail, title: "Email", desc: "support@mkxtechnologies.com" },
                      { icon: Phone, title: "Phone", desc: "+91-129-XXXXXXX" }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="h-10 w-10 rounded-lg bg-accent-muted flex items-center justify-center shrink-0">
                          <item.icon className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="mt-8 w-full bg-accent">Open a Ticket</Button>
                </div>

                <div className="p-8 rounded-2xl bg-accent text-white shadow-xl">
                  <h3 className="mb-4 text-xl font-bold">Enterprise Support</h3>
                  <p className="mb-6 text-sm text-white/80 leading-relaxed">
                    Get priority support, a dedicated success manager, and 24/7 critical issue response.
                  </p>
                  <Button variant="secondary" className="w-full text-accent font-bold">Upgrade Now</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
