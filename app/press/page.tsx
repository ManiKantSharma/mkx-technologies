"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Newspaper, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { slideUp, staggerContainer, fadeIn } from "@/lib/animations";

const pressReleases = [
  {
    date: "May 10, 2026",
    title: "MKX Technologies Announces New Enterprise HRMS Features",
    excerpt: "New AI-driven features to help enterprises automate payroll and compliance.",
  },
  {
    date: "April 22, 2026",
    title: "MKX Technologies Reaches 500+ Enterprise Clients Milestone",
    excerpt: "Scaling business solutions for companies across India and beyond.",
  },
  {
    date: "March 15, 2026",
    title: "MKX Technologies Named 'SaaS Innovator of the Year'",
    excerpt: "Recognition for our commitment to intelligent business tech.",
  },
];

export default function PressPage() {
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
              <motion.h1 variants={slideUp} className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                Press <span className="text-accent">Center</span>
              </motion.h1>
              <motion.p variants={slideUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The latest news, updates, and resources from MKX Technologies.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-8">
                <h2 className="text-3xl font-bold tracking-tight">Recent Press Releases</h2>
                <div className="space-y-6">
                  {pressReleases.map((release, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="p-8 rounded-2xl border border-border/50 bg-card/50 hover:border-accent/30 transition-all group"
                    >
                      <p className="text-sm text-accent font-medium mb-2">{release.date}</p>
                      <h3 className="text-xl font-bold mb-3">{release.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">{release.excerpt}</p>
                      <Button variant="ghost" className="group-hover:text-accent p-0">
                        Read Full Release
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-8 rounded-2xl border border-border/50 bg-card/50">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Download className="h-5 w-5 text-accent" />
                    Media Kit
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Download our official logos, accent guidelines, and executive photos.
                  </p>
                  <Button className="w-full bg-accent hover:bg-accent/90">
                    Download Kit (.zip)
                  </Button>
                </div>

                <div className="p-8 rounded-2xl border border-border/50 bg-card shadow-lg">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-accent" />
                    Media Inquiries
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    For press and media related questions, please contact our team:
                  </p>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-accent" />
                      <span>press@mkxtechnologies.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-accent" />
                      <span>+91-129-XXXXXXX</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-accent" />
                      <span>Faridabad, Haryana, India</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-3xl font-bold mb-6">Stay in the loop</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">Subscribe to our newsletter to receive the latest press releases and product updates directly in your inbox.</p>
            <div className="flex max-w-md mx-auto gap-4">
              <input type="email" placeholder="Enter your email" className="flex-1 bg-card border border-border rounded-lg px-4 focus:outline-accent" />
              <Button className="bg-accent">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
