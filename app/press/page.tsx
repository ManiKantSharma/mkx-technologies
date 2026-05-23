"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Newspaper, Mail, Phone, MapPin } from "lucide-react";

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
      <main className="flex-1 pt-8">
        <section className="py-20 text-center lg:py-32">
          <div className="container px-3">
            <div className="mx-auto max-w-3xl space-y-6">
              <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
                News & Media
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                Press <span className="text-accent">Center</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                The latest news, updates, and resources from MKX Technologies.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Recent Press Releases</h2>
              <p className="mt-4 text-muted-foreground">Latest news and updates from MKX Technologies.</p>
            </div>
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                {pressReleases.map((release, i) => (
                  <div key={i} className="p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all group">
                    <p className="text-sm text-accent font-medium mb-2">{release.date}</p>
                    <h3 className="text-xl font-bold mb-3">{release.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{release.excerpt}</p>
                    <Button variant="ghost" className="group-hover:text-accent p-0">
                      Read Full Release
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ))}
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

        <section className="py-24 bg-accent/5 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-3xl font-bold mb-6">Stay in the loop</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">Subscribe to our newsletter to receive the latest press releases and product updates directly in your inbox.</p>
            <div className="flex max-w-md mx-auto gap-4">
              <input type="email" placeholder="Enter your email" className="flex-1 bg-card border border-border rounded-lg px-4 focus:outline-accent" />
              <Button className="bg-accent hover:bg-accent/90">Subscribe</Button>
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-3xl font-bold mb-6">Media Inquiries?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">Our PR team is available to assist with media requests, interviews, and story opportunities.</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 px-12">
              Contact PR Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
