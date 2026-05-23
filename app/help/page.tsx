"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Mail, Phone, Rocket, Shield, Zap, Book, ArrowRight, FileQuestion, CheckCircle2, Clock, Users } from "lucide-react";

const categories = [
  { icon: Rocket, title: "Getting Started", count: 12, desc: "Quick setup guides and onboarding tutorials" },
  { icon: Shield, title: "Security & Access", count: 8, desc: "User permissions, authentication, and data protection" },
  { icon: Zap, title: "Integrations", count: 15, desc: "Connect with third-party apps and services" },
  { icon: Book, title: "User Guides", count: 24, desc: "Detailed documentation for all features" },
  { icon: Users, title: "Account Management", count: 10, desc: "Billing, plans, and subscription management" },
  { icon: Clock, title: "Troubleshooting", count: 18, desc: "Common issues and their solutions" }
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
  },
  {
    q: "How do I reset my password?",
    a: "Click 'Forgot Password' on the login page and follow the instructions sent to your registered email address. For security reasons, the link expires in 24 hours."
  },
  {
    q: "Can I export my data?",
    a: "Yes, you can export all your data in CSV or JSON format from the Settings > Data Export section. Enterprise users can schedule automated exports."
  }
];

const supportChannels = [
  { icon: MessageSquare, title: "Live Chat", desc: "Available 24/7 for Enterprise clients" },
  { icon: Mail, title: "Email", desc: "support@mkxtechnologies.com" },
  { icon: Phone, title: "Phone", desc: "+91-129-400-XXXX (Enterprise only)" }
];

const supportBenefits = [
  { title: "24/7 Availability", desc: "Round-the-clock support for critical issues" },
  { title: "Dedicated Manager", desc: "Personal account manager for enterprise clients" },
  { title: "Priority Response", desc: "Guaranteed 2-hour response time" },
  { title: "Training Sessions", desc: "Custom onboarding and training programs" }
];

export default function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-8">
        <section className="py-20 text-center lg:py-32">
          <div className="container px-3">
            <div className="mx-auto max-w-3xl space-y-6">
              <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
                Help Center
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                How can we <span className="text-accent">help?</span>
              </h1>
              <p className="lg:text-lg text-base text-muted-foreground">
                Find answers, guides, and support for all MKX Technologies products. Our comprehensive knowledge base covers everything from quick setup to advanced configurations.
              </p>
              <div className="relative mx-auto max-w-xl pt-4">
                <Search className="absolute left-3 top-10 h-5 w-5 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none" />
                <Input
                  className="h-12 pl-10 pr-4 focus:ring-accent"
                  placeholder="Search for articles, guides, or tutorials..."
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Browse by Category</h2>
              <p className="mt-4 text-muted-foreground">Find the help you need based on your specific area of interest.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat, i) => (
                <div key={i} className="p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all group cursor-pointer">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                    <cat.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{cat.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{cat.desc}</p>
                  <p className="text-xs text-accent font-semibold">{cat.count} Articles</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-3">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-8 text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="p-6 rounded-xl border border-border bg-card/30 hover:border-accent/30 transition-all">
                      <h4 className="text-lg font-semibold mb-2 flex gap-3">
                        <FileQuestion className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        {faq.q}
                      </h4>
                      <p className="text-muted-foreground text-sm pl-8">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-8 rounded-2xl border border-border/50 bg-card shadow-sm">
                  <h3 className="mb-6 text-xl font-bold">Contact Support</h3>
                  <div className="space-y-6">
                    {supportChannels.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                          <item.icon className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="mt-8 w-full bg-accent hover:bg-accent/90">Open a Ticket</Button>
                </div>

                <div className="p-8 rounded-2xl bg-accent text-white shadow-xl">
                  <h3 className="mb-4 text-xl font-bold">Enterprise Support</h3>
                  <p className="mb-6 text-sm text-white/80 leading-relaxed">
                    Get priority support, a dedicated success manager, and 24/7 critical issue response.
                  </p>
                  <Button variant="secondary" className="w-full text-accent font-bold hover:bg-background">Upgrade Now</Button>
                </div>

                <div className="p-6 rounded-2xl border border-border/50 bg-card/30">
                  <h3 className="text-lg font-bold mb-4">Support Benefits</h3>
                  <ul className="space-y-3">
                    {supportBenefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{benefit.title}</p>
                          <p className="text-muted-foreground text-xs">{benefit.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-3xl font-bold mb-6">Still need help?</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">Our support team is ready to assist you with any questions or issues you might have.</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 px-12">
              Contact Support
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
