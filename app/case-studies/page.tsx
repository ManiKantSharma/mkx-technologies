"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { slideUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Quote, TrendingUp as TrendingIcon } from "lucide-react";

const caseStudies = [
  {
    company: "Global Retail Solutions",
    sector: "Retail & E-commerce",
    challenge: "Managing inventory and payroll across 500+ locations was slow and error-prone, leading to significant financial leakage.",
    result: "By implementing MKX POS and HRMS, they centralized their operations, automated tax compliance, and reduced manual entry by 85%.",
    impact: "30% Cost Reduction",
    quote: "MKX Technologies transformed our complex multi-location operations into a single, high-efficiency machine.",
    author: "David Miller, Global Operations Director"
  },
  {
    company: "TechNexus Corp",
    sector: "Enterprise Software",
    challenge: "Disjointed customer data across multiple legacy tools led to a 15% churn rate and poor sales pipeline visibility.",
    result: "They consolidated all customer interactions into MKX CRMS, enabling AI-driven insights that improved retention and accelerated deal closures.",
    impact: "25% Higher Retention",
    quote: "The visibility we gained through MKX CRMS allowed our sales team to prioritize the right leads and close 40% faster.",
    author: "Sarah Jenkins, VP of Sales"
  }
];

export default function CaseStudiesPage() {
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
                Customer <span className="text-accent">Success Stories</span>
              </motion.h1>
              <motion.p variants={slideUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover how leading enterprises are transforming their operations and scaling faster with MKX Technologies.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <h2 className="text-3xl font-bold">Success Stories</h2>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {["All", "Retail", "Technology", "Manufacturing", "Finance"].map((ind) => (
                  <button key={ind} className="px-3 py-2 rounded-full border border-border bg-card text-sm font-bold whitespace-nowrap hover:border-accent hover:text-accent transition-all">
                    {ind}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-12 lg:grid-cols-2">
              {caseStudies.map((study, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col p-8 rounded-3xl border border-border bg-card/50 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{study.company}</h3>
                      <p className="text-sm text-accent font-medium uppercase tracking-wider">{study.sector}</p>
                    </div>
                  </div>
                  <div className="space-y-6 flex-1">
                    <div>
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-2">The Challenge</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed italic">"{study.challenge}"</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-2">The Solution</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{study.result}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 italic text-sm text-muted-foreground">
                      <Quote className="h-4 w-4 text-accent mb-2 opacity-50" />
                      "{study.quote}"
                      <p className="mt-2 font-bold text-foreground not-italic">— {study.author}</p>
                    </div>

                    <div className="pt-6 border-t border-border mt-auto">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingIcon className="h-5 w-5 text-green-500" />
                          <span className="font-bold text-lg text-accent">{study.impact}</span>
                        </div>
                        <Button variant="ghost" className="group-hover:translate-x-2 transition-transform text-accent">
                          Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        <section className="py-24 border-t border-border/40">
          <div className="container px-3">
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { label: "Satisfied Customers", value: "2,500+" },
                { label: "Countries Served", value: "45+" },
                { label: "Uptime SLA", value: "99.99%" },
                { label: "Customer Support", value: "24/7" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to scale your business?</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">Join hundreds of companies that have transformed their operations with MKX.</p>
            <Button size="lg" className="bg-accent px-12">Get Started Today</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
