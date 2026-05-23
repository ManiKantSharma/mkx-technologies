"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import {
  Handshake,
  Terminal,
  CreditCard,
  Copyright,
  AlertTriangle,
  RefreshCw,
  HelpCircle,
  ChevronRight,
  Scale,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const sections = [
  {
    id: "introduction",
    title: "1. Acceptance of Terms",
    icon: Handshake,
    content: "Welcome to MKX Technologies. These Terms of Service (\"Terms\") govern your access to and use of our HRMS, CRMS, and POS systems (collectively, the \"Services\"). By creating an account or using our Services, you agree to be bound by these Terms and our Privacy Policy."
  },
  {
    id: "usage",
    title: "2. Use of Services",
    icon: Terminal,
    content: "You are granted a non-exclusive, non-transferable, revocable license to use our Services strictly in accordance with these Terms.",
    list: [
      "You must be at least 18 years of age",
      "Accounts must be registered with accurate information",
      "You are responsible for all activity under your account",
      "Reverse engineering of our software is strictly prohibited",
      "You must not use services for any illegal activities"
    ]
  },
  {
    id: "billing",
    title: "3. Billing and Subscriptions",
    icon: CreditCard,
    content: "Most features of our platform are provided on a subscription basis with recurring billing cycles.",
    list: [
      "Subscriptions are billed in advance (Monthly/Annually)",
      "Automatic renewal occurs unless canceled 24h prior",
      "Prices are subject to change with 30-day notice",
      "Refunds are processed according to our Refund Policy",
      "Late payments may result in service suspension"
    ]
  },
  {
    id: "ip",
    title: "4. Intellectual Property",
    icon: Copyright,
    content: "The Services, including all software, designs, text, and graphics, are the exclusive property of MKX Technologies. You may not copy, modify, or distribute any part of our intellectual property without express written consent."
  },
  {
    id: "liability",
    title: "5. Limitation of Liability",
    icon: AlertTriangle,
    content: "To the maximum extent permitted by law, MKX Technologies shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the Services or any data loss incurred during operation."
  },
  {
    id: "modifications",
    title: "6. Changes to Terms",
    icon: RefreshCw,
    content: "We reserve the right to update these Terms at any time. Significant changes will be communicated via email or through the platform dashboard at least 14 days before taking effect."
  },
  {
    id: "contact",
    title: "7. Support and Contact",
    icon: HelpCircle,
    content: "For questions regarding these Terms or for technical support, please contact our legal and support departments."
  }
];

export default function TermsPage() {
  const lastUpdated = "May 16, 2026";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-8">
        {/* Hero Section */}
        <section className="py-20 text-center lg:py-32 bg-accent/5">
          <div className="container px-3">
            <div className="mx-auto max-w-3xl space-y-6">
              <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
                Service Agreement
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                Terms of <span className="text-accent">Service</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Please read these terms carefully before using the MKX Technologies platform.
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24">
          <div className="container px-3">
            <div className="grid gap-16 lg:grid-cols-[280px_1fr]">
              {/* Sidebar Navigation */}
              <aside className="hidden lg:block">
                <div className="sticky top-32 space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Sections</p>
                  <nav className="flex flex-col gap-2">
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="text-sm text-muted-foreground hover:text-accent hover:translate-x-1 transition-all flex items-center gap-2 group"
                      >
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {section.title.split('. ')[1]}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Main Policy Content */}
              <div className="space-y-20 max-w-4xl">
                {sections.map((section) => (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-32"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <section.icon className="h-6 w-6 text-accent" />
                      </div>
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                    </div>

                    <div className="space-y-6 text-muted-foreground leading-relaxed text-sm md:text-base">
                      <p>{section.content}</p>

                      {section.list && (
                        <div className="grid gap-4 sm:grid-cols-2 mt-4">
                          {section.list.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card/50">
                              <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                <ChevronRight className="h-3 w-3 text-accent" />
                              </div>
                              <span className="text-sm leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.id === "contact" && (
                        <div className="mt-8 p-8 rounded-2xl border border-border bg-card shadow-sm">
                          <p className="font-bold text-foreground mb-4">MKX Technologies Support</p>
                          <div className="space-y-4">
                            <p className="text-sm">For legal inquiries: <span className="text-accent font-medium">legal@mkxtechnologies.com</span></p>
                            <p className="text-sm">For technical support: <span className="text-accent font-medium">support@mkxtechnologies.com</span></p>
                            <Button className="mt-4 bg-accent hover:bg-accent/90">Contact Support Center</Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.section>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-3xl font-bold mb-6">Questions about our terms?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">If you have any questions about these Terms of Service, please contact our legal team.</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 px-12">Contact Legal Team</Button>
          </div>
        </section>

        {/* Bottom Bar */}
        <section className="py-12 bg-accent/5 border-t border-border">
          <div className="container px-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-accent" />
                <p className="text-sm font-medium">Governing Law: Haryana, India</p>
              </div>
              <div className="flex gap-8">
                <a href="/privacy" className="text-sm text-muted-foreground hover:text-accent transition-colors">Privacy Policy</a>
                <a href="/security" className="text-sm text-muted-foreground hover:text-accent transition-colors">Security Overview</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
