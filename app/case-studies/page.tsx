"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Quote, TrendingUp as TrendingIcon, CheckCircle2, Star } from "lucide-react";

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

const benefits = [
  { title: "Proven Results", desc: "Real measurable outcomes from businesses like yours" },
  { title: "Industry Expertise", desc: "Deep experience across retail, tech, and manufacturing" },
  { title: "Scalable Solutions", desc: "Products that grow with your business needs" },
  { title: "Dedicated Support", desc: "Personal guidance throughout your implementation" }
];

const industries = [
  { title: "Retail & E-commerce", desc: "Multi-location inventory and workforce management" },
  { title: "Enterprise Software", desc: "Customer retention and sales pipeline optimization" },
  { title: "Manufacturing", desc: "Production scheduling and resource allocation" },
  { title: "Financial Services", desc: "Compliance and client relationship management" }
];

export default function CaseStudiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-8">
        <section className="py-20 lg:text-start text-center lg:py-32">
          <div className="container px-3">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
                  Success Stories
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                  Customer <span className="text-accent">Success Stories</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Discover how leading enterprises are transforming their operations and scaling faster with MKX Technologies. Real results from real businesses.
                </p>
                <div className="flex flex-wrap lg:justify-start justify-center gap-4 pt-4">
                  <Button size="lg" className="bg-accent hover:bg-accent/90">Browse All Stories</Button>
                  <Button size="lg" variant="outline">Book a Demo</Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { label: "Satisfied Customers", value: "2,500+" },
                  { label: "Countries Served", value: "45+" },
                  { label: "Uptime SLA", value: "99.99%" },
                  { label: "Customer Support", value: "24/7" }
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-xl border border-border bg-card/30 text-center">
                    <div className="text-2xl font-bold text-accent mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Why Choose MKX?</h2>
              <p className="mt-4 text-muted-foreground">Businesses trust us to deliver measurable results.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-accent/30 transition-all">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Star className="h-5 w-5 text-accent" />
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
            <div className="grid gap-8 lg:grid-cols-2">
              {caseStudies.map((study, i) => (
                <div key={i} className="flex flex-col p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{study.company}</h3>
                      <p className="text-sm text-accent font-medium uppercase tracking-wider">{study.sector}</p>
                    </div>
                  </div>
                  <div className="space-y-4 flex-1">
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
                  </div>
                  <div className="pt-6 border-t border-border mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingIcon className="h-5 w-5 text-green-500" />
                        <span className="font-bold text-lg text-accent">{study.impact}</span>
                      </div>
                      <Button variant="ghost" className="group-hover:text-accent">
                        Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Industries We Serve</h2>
              <p className="mt-4 text-muted-foreground">Tailored solutions for every sector.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {industries.map((industry, i) => (
                <div key={i} className="p-6 rounded-xl border border-border bg-card/30 hover:border-accent/30 transition-all">
                  <h4 className="font-bold mb-2 text-accent">{industry.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{industry.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to be our next success story?</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">Join hundreds of companies that have transformed their operations with MKX.</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 px-12">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
