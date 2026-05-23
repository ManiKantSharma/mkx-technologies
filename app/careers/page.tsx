"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight, Briefcase, Clock, MapPin, Heart, Zap, Globe, Shield, Users, Building2, Target, Rocket, CheckCircle2 } from "lucide-react";

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
  { icon: Rocket, title: "Growth Opportunities", desc: "Clear career paths and rapid advancement for top performers." },
  { icon: Target, title: "Impact-Driven", desc: "Your work directly affects thousands of businesses worldwide." },
];

const cultureValues = [
  { title: "Radical Transparency", desc: "We share numbers, plans, and challenges openly across the company." },
  { title: "Ship Early, Ship Often", desc: "We value progress over perfection and learn from real-world usage." },
  { title: "User Obsession", desc: "Every line of code we write must solve a real problem for our users." },
  { title: "Ownership Mindset", desc: "We trust you to own your projects and make decisions." }
];

const interviewSteps = [
  { step: "01", title: "Discovery", desc: "We learn about your skills, aspirations, and cultural fit." },
  { step: "02", title: "Technical Review", desc: "A deep dive into your expertise with the team you'll join." },
  { step: "03", title: "Leadership Chat", desc: "Final alignment on mission, vision, and mutual expectations." },
  { step: "04", title: "Welcome Aboard", desc: "Smooth onboarding with dedicated support from day one." }
];

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-8">
        <section className="py-20 lg:text-start text-center lg:py-32">
          <div className="container px-3">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
                  We're Hiring
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                  Build the Future of <span className="text-accent">SaaS</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Join a team of innovators and builders. We're on a mission to empower businesses with intelligent technology.
                </p>
                <div className="flex flex-wrap lg:justify-start justify-center gap-4 pt-4">
                  <Button size="lg" className="bg-accent hover:bg-accent/90">View Open Positions</Button>
                  <Button size="lg" variant="outline">Learn About Us</Button>
                </div>
              </div>
              <div className="relative aspect-4/3 rounded overflow-hidden border border-border/50 bg-linear-to-br from-accent/10 to-transparent">
                <Image
                  src="/illustrations/careers_hero.png"
                  alt="Careers at MKX Technologies"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Why Join MKX Technologies?</h2>
              <p className="mt-4 text-muted-foreground">Everything you need to thrive and grow your career.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {perks.map((perk, i) => (
                <div key={i} className="p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all group">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                    <perk.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{perk.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{perk.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-3">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="order-2 lg:order-1">
                <div className="grid gap-4 sm:grid-cols-2">
                  {cultureValues.map((val, i) => (
                    <div key={i} className="p-6 rounded-xl border border-border bg-card/30">
                      <h4 className="font-bold mb-2 text-accent">{val.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{val.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Our Culture</h2>
                <p className="text-muted-foreground">
                  We're builders, thinkers, and problem solvers. At MKX Technologies, we foster an environment where curiosity is rewarded and ownership is expected.
                </p>
                <ul className="space-y-4">
                  {[
                    "Weekly team retrospectives and feedback loops",
                    "Quarterly hackathons for innovation",
                    "Mentorship programs for career growth",
                    "Regular team building and social events"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">The Interview Process</h2>
              <p className="mt-4 text-muted-foreground">Our 4-step process to find the best talent and ensure mutual fit.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {interviewSteps.map((step, i) => (
                <div key={i} className="relative p-8 rounded-2xl border border-border bg-card hover:border-accent/30 transition-all">
                  <span className="absolute -top-4 left-6 text-4xl font-black text-accent/10">{step.step}</span>
                  <h3 className="text-lg font-bold mb-2 mt-4">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-3">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Open Positions</h2>
              <p className="mt-4 text-muted-foreground">Find your next challenge and join our mission.</p>
            </div>
            <div className="flex flex-col gap-4 max-w-4xl mx-auto">
              {jobs.map((job, i) => (
                <div key={i} className="p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
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
                    <Button variant="ghost" className="w-full sm:w-auto hover:text-accent group-hover:text-accent">
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5 border-t border-border/40">
          <div className="container px-3 text-center">
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
