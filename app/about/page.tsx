import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Rocket, Users, Target, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-24 pb-12 lg:pt-32 lg:pb-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(167,4,0,0.08)_0%,transparent_100%)]" />
          <div className="container px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                Revolutionizing Business with <span className="text-accent">Intelligent Tech</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                MKX Technologies is committed to providing enterprise-grade SaaS solutions that empower businesses to scale faster, work smarter, and secure their future.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Founded with a vision to simplify complex business processes, MKX Technologies has evolved into a leading provider of HRMS, CRMS, and POS systems. We believe that technology should be an enabler, not a barrier.
                </p>
                <div className="space-y-4">
                  {[
                    "Client-centric innovation",
                    "Security-first architecture",
                    "Global scalability",
                    "24/7 dedicated support"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      <span className="text-sm font-medium text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-video rounded-2xl border border-border/50 bg-card/50 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex h-full items-center justify-center">
                   <Target className="h-24 w-24 text-accent/20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">Our Core Values</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: Rocket,
                  title: "Innovation",
                  desc: "We push boundaries to create solutions that define the future of business operations."
                },
                {
                  icon: Users,
                  title: "Empowerment",
                  desc: "Our tools are designed to give your team the data and freedom to excel."
                },
                {
                  icon: Shield,
                  title: "Trust",
                  desc: "Security and data privacy are at the heart of every line of code we write."
                }
              ].map((value, i) => (
                <div key={i} className="p-8 rounded-2xl border border-border/50 bg-card/50 hover:border-accent/30 transition-all group">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <value.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
           <div className="container px-6">
              <h2 className="text-3xl font-bold tracking-tight text-center mb-16">Our Journey</h2>
              <div className="space-y-12 max-w-4xl mx-auto">
                 {[
                   { year: "2018", event: "MKX Technologies founded in Faridabad with a team of 5 engineers." },
                   { year: "2020", event: "Launched MKX HRMS, reaching 100+ enterprise clients in the first year." },
                   { year: "2022", event: "Expanded product suite with CRMS and POS integrations." },
                   { year: "2024", event: "Recognized as 'SaaS Innovator of the Year' with 500+ active customers." },
                   { year: "2026", event: "Scaling globally with AI-driven business intelligence modules." }
                 ].map((milestone, i) => (
                   <div key={i} className="flex gap-8 items-start">
                      <div className="text-2xl font-black text-accent w-20 shrink-0">{milestone.year}</div>
                      <div className="pt-1.5 border-l-2 border-accent/20 pl-8 pb-8 flex-1">
                         <p className="text-muted-foreground leading-relaxed">{milestone.event}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        <section className="py-24">
           <div className="container px-6">
              <h2 className="text-3xl font-bold tracking-tight text-center mb-16">Leadership Team</h2>
              <div className="grid gap-12 md:grid-cols-4">
                 {[
                   { name: "Mani Kant Sharma", role: "CEO & Founder", initial: "MS" },
                   { name: "Anita Rao", role: "Chief Product Officer", initial: "AR" },
                   { name: "David Miller", role: "VP of Engineering", initial: "DM" },
                   { name: "Sarah Jenkins", role: "Head of Customer Success", initial: "SJ" }
                 ].map((member, i) => (
                   <div key={i} className="text-center group">
                      <div className="h-40 w-40 rounded-full bg-accent mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-accent/20 group-hover:bg-accent/10 group-hover:text-accent transition-all">
                         {member.initial}
                      </div>
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
