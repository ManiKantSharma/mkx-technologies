"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Clock, MapPin, Heart, Zap, Globe, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { slideUp, staggerContainer, fadeIn } from "@/lib/animations";

const jobs = [
  { title: "Senior Full Stack Engineer", dept: "Engineering", type: "Full-time", location: "Remote / Faridabad" },
  { title: "Product Designer", dept: "Design", type: "Full-time", location: "Remote" },
  { title: "Customer Success Manager", dept: "Sales", type: "Full-time", location: "Faridabad" },
  { title: "DevOps Architect", dept: "Infrastructure", type: "Full-time", location: "Remote" },
];

const perks = [
  { icon: Globe, title: "Remote-First", desc: "Work from anywhere in the world, or join our hub in Faridabad." },
  { icon: Heart, title: "Health & Wellness", desc: "Comprehensive health insurance and mental health support." },
  { icon: Zap, title: "Learning Stipend", desc: "Annual budget for courses, books, and conferences." },
  { icon: Shield, title: "Equity Options", desc: "Own a part of the future we're building together." },
];

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(167,4,0,0.08)_0%,transparent_100%)]" />
          <div className="container px-6 text-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="mx-auto max-w-3xl"
            >
              <motion.h1 variants={slideUp} className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 text-foreground">
                Build the Future of <span className="text-accent">SaaS</span>
              </motion.h1>
              <motion.p variants={slideUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join a team of innovators and builders. We're on a mission to empower businesses with intelligent technology.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 border-y border-border/40">
          <div className="container px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">Perks & Benefits</h2>
              <p className="mt-4 text-muted-foreground">Why you'll love working at MKX Technologies.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {perks.map((perk, i) => (
                <div key={i} className="p-8 rounded-2xl border border-border/50 bg-card/50 hover:border-accent/30 transition-all text-center group">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <perk.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{perk.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{perk.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
           <div className="container px-6">
              <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold tracking-tight">The Interview Process</h2>
                 <p className="mt-4 text-muted-foreground">Clear and fast. We respect your time.</p>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                 {[
                   { step: "01", title: "Intro Call", desc: "A 30-min chat with our talent team to discuss the role and your aspirations." },
                   { step: "02", title: "Technical Review", desc: "A deep dive into your skills with the team you'll be joining." },
                   { step: "03", title: "Founder / Leadership", desc: "Final alignment on mission, culture, and long-term vision." }
                 ].map((step, i) => (
                   <div key={i} className="p-8 rounded-2xl border border-border bg-card relative">
                      <span className="text-xs font-bold text-accent tracking-widest uppercase mb-4 block">Step {step.step}</span>
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        <section className="py-24 bg-accent/5">
           <div className="container px-6">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                 <div className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">Our Culture</h2>
                    <p className="text-muted-foreground leading-relaxed">
                       We're builders, thinkers, and problem solvers. At MKX Technologies, we foster an environment where curiosity is rewarded and ownership is expected.
                    </p>
                    <div className="space-y-6">
                       {[
                         { title: "Radical Transparency", desc: "We share numbers, plans, and challenges openly across the company." },
                         { title: "Ship Early, Ship Often", desc: "We value progress over perfection and learn from real-world usage." },
                         { title: "User Obsession", desc: "Every line of code we write must solve a real problem for our users." }
                       ].map((val, i) => (
                         <div key={i}>
                            <h4 className="font-bold mb-1">{val.title}</h4>
                            <p className="text-sm text-muted-foreground">{val.desc}</p>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="aspect-[4/3] rounded-3xl bg-card border border-border flex items-center justify-center">
                    <Zap className="h-24 w-24 text-accent/10" />
                 </div>
              </div>
           </div>
        </section>


        <section className="py-24 bg-accent/5">
          <div className="container px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold tracking-tight">Open Positions</h2>
               <p className="mt-4 text-muted-foreground">Find your next challenge.</p>
            </div>
            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
              {jobs.map((job, i) => (
                <div key={i} className="p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-accent/30 transition-all flex items-center justify-between group">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4" />
                        {job.dept}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" className="group-hover:text-accent">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-border/40">
          <div className="container px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Don't see a fit?</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">We're always looking for talented individuals. Send us your CV and we'll keep you in mind for future openings.</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 px-12">General Application</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
