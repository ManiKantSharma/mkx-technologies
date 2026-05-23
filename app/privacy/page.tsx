"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Database,
  Eye,
  Lock,
  UserCheck,
  Mail,
  Globe,
  Scale,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    icon: Shield,
    content: "MKX Technologies (\"we,\" \"our,\" or \"us\") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our HRMS, CRMS, and POS systems."
  },
  {
    id: "collection",
    title: "2. Information We Collect",
    icon: Database,
    content: "We collect information you provide directly to us when you create an account, use our Services, or communicate with us.",
    list: [
      "Contact information (name, email, phone number)",
      "Professional information (company name, role)",
      "Payment and billing information",
      "Technical data (IP address, browser type)",
      "Usage data (interaction patterns with our services)"
    ]
  },
  {
    id: "usage",
    title: "3. How We Use Your Information",
    icon: Eye,
    content: "We use the information we collect for various purposes, including:",
    list: [
      "Providing and maintaining our Services",
      "Processing transactions and billing",
      "Sending technical updates and support messages",
      "Personalizing user experience",
      "Analyzing platform usage and trends"
    ]
  },
  {
    id: "security",
    title: "4. Data Security",
    icon: Lock,
    content: "We use industry-standard security measures to protect your personal data from unauthorized access, disclosure, or misuse. This includes end-to-end encryption for data in transit and robust encryption for data at rest. Our systems are regularly audited for security compliance."
  },
  {
    id: "rights",
    title: "5. Your Privacy Rights",
    icon: UserCheck,
    content: "Depending on your location, you may have rights regarding your personal data under regulations like GDPR or CCPA:",
    list: [
      "Right to access your personal data",
      "Right to rectification of inaccurate data",
      "Right to erasure ('Right to be forgotten')",
      "Right to data portability",
      "Right to object to certain processing"
    ]
  },
  {
    id: "compliance",
    title: "6. Global Compliance",
    icon: Globe,
    content: "We comply with international data protection standards. Our infrastructure is designed to support regional data residency requirements and privacy laws across the globe."
  },
  {
    id: "contact",
    title: "7. Contact Us",
    icon: Mail,
    content: "If you have any questions about this Privacy Policy or our data practices, please reach out to our dedicated privacy team."
  }
];

export default function PrivacyPage() {
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
                Legal Documentation
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                Privacy <span className="text-accent">Policy</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: {lastUpdated} • Version 2.4
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
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Table of Contents</p>
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
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <section.icon className="h-6 w-6 text-accent" />
                      </div>
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                    </div>

                    <div className="space-y-6 text-muted-foreground leading-relaxed">
                      <p>{section.content}</p>

                      {section.list && (
                        <ul className="grid gap-3 sm:grid-cols-2">
                          {section.list.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm">
                              <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.id === "contact" && (
                        <div className="mt-8 p-8 rounded-2xl border border-border bg-card shadow-sm">
                          <p className="font-bold text-foreground mb-4">MKX Technologies Privacy Team</p>
                          <div className="space-y-2 text-sm">
                            <p className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-accent" />
                              privacy@mkxtechnologies.com
                            </p>
                            <p className="flex items-start gap-2">
                              <Globe className="h-4 w-4 text-accent mt-0.5" />
                              2468/8 CISF, Sector 8 Faridabad,<br />Haryana, India
                            </p>
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
        <section className="py-24 bg-accent/5 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-3xl font-bold mb-6">Have concerns about your data?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              Our data protection officer is available to answer any questions you may have regarding our privacy practices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90">Contact DPO</Button>
              <Button size="lg" variant="outline">View Security Center</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
