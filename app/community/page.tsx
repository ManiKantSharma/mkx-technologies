"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Github, Globe, Heart, MessageSquare, Slack, Star, Trophy, Twitter } from "lucide-react";
import Image from "next/image";

const initiatives = [
  {
    icon: Github,
    title: "MKX Open Source",
    desc: "Contribute to our core SDKs and UI components. Join 200+ active contributors shaping the future of our platform."
  },
  {
    icon: Star,
    title: "Early Adopter Program",
    desc: "Get exclusive access to pre-release features and help shape our roadmap with direct feedback to our product team."
  },
  {
    icon: Heart,
    title: "Non-Profit Program",
    desc: "We provide free access to our tools for eligible non-profits and social enterprises making a positive impact."
  },
  {
    icon: Trophy,
    title: "Hackathons & Events",
    desc: "Participate in our annual hackathons and community events to showcase your skills and win exciting prizes."
  },
  {
    icon: MessageSquare,
    title: "Community Forums",
    desc: "Join discussions, share knowledge, and get help from fellow developers and MKX team members."
  },
  {
    icon: Globe,
    title: "Global Meetups",
    desc: "Connect with local MKX communities through meetups and workshops in cities around the world."
  }
];

const benefits = [
  { title: "Direct Access to Product Team", desc: "Share feedback directly with our engineers and product managers" },
  { title: "Exclusive Content & Resources", desc: "Access early documentation, tutorials, and best practices" },
  { title: "Networking Opportunities", desc: "Connect with industry leaders and potential employers" },
  { title: "Career Growth", desc: "Get recognized for contributions and advance your career" }
];

const communitySteps = [
  { step: "01", title: "Join Platform", desc: "Sign up for our community platform and create your profile." },
  { step: "02", title: "Choose Your Path", desc: "Select initiatives that match your interests and skills." },
  { step: "03", title: "Start Contributing", desc: "Begin with small contributions and grow your impact." },
  { step: "04", title: "Build Recognition", desc: "Earn badges, build reputation, and unlock exclusive perks." }
];

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-8">
        <section className="py-20 lg:text-start text-center lg:py-32">
          <div className="container px-3">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
                  Join Our Community
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                  Join the <span className="text-accent">MKX Community</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Connect with thousands of developers and business leaders building the future with MKX. Share ideas, contribute to open source, and grow together.
                </p>
                <div className="flex flex-wrap lg:justify-start justify-center gap-4 pt-4">
                  <Button size="lg" className="bg-accent hover:bg-accent/90">Join Community</Button>
                  <Button size="lg" variant="outline">Explore Initiatives</Button>
                </div>
              </div>
              <div className="relative aspect-4.5/3 rounded overflow-hidden border border-border/50 bg-linear-to-br from-accent/10 to-transparent">
                <Image
                  src="/illustrations/mkx-community.png"
                  alt="MKX Community"
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
              <h2 className="text-3xl font-bold tracking-tight">Community Initiatives</h2>
              <p className="mt-4 text-muted-foreground">Ways to get involved and grow with us.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {initiatives.map((item, i) => (
                <div key={i} className="p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all group">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
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
                  {benefits.map((benefit, i) => (
                    <div key={i} className="p-6 rounded-xl border border-border bg-card/30">
                      <h4 className="font-bold mb-2 text-accent">{benefit.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Why Join Our Community?</h2>
                <p className="text-muted-foreground">
                  Being part of the MKX community gives you unprecedented access to resources, networking, and growth opportunities that accelerate your development journey.
                </p>
                <ul className="space-y-4">
                  {[
                    "5,000+ active members worldwide",
                    "200+ open source contributors",
                    "12+ annual community events",
                    "50+ countries represented"
                  ].map((stat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      {stat}
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
              <h2 className="text-3xl font-bold tracking-tight">Get Started in 4 Steps</h2>
              <p className="mt-4 text-muted-foreground">Your journey to becoming an active community member starts here.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {communitySteps.map((step, i) => (
                <div key={i} className="relative p-8 rounded-2xl border border-border bg-card hover:border-accent/30 transition-all">
                  <span className="absolute -top-4 left-6 text-4xl font-black text-accent/10">{step.step}</span>
                  <h3 className="text-lg font-bold mb-2 mt-4">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to join the conversation?</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">Our community is waiting for you. Join our Slack workspace or follow us on Twitter to stay updated on the latest discussions and events.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 gap-2">
                <Slack className="h-4 w-4" /> Join Slack
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Twitter className="h-4 w-4" /> Follow Us
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Github className="h-4 w-4" /> GitHub
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
