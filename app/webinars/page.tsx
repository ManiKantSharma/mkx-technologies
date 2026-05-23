import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Play, Calendar, User, Clock, MonitorPlay } from "lucide-react";

export default function WebinarsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-24 pb-12 lg:pt-32 lg:pb-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(167,4,0,0.08)_0%,transparent_100%)]" />
          <div className="container px-3">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                Webinars & <span className="text-accent">Events</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Learn from industry experts and get deep dives into MKX products.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-3">
            <h2 className="text-3xl font-bold mb-12">Upcoming Webinars</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {[
                {
                  title: "Modernizing Retail with MKX POS",
                  date: "May 25, 2024 • 10:00 AM IST",
                  speaker: "Sarah Jenkins, Head of Retail @ MKX",
                  desc: "Learn how to transform your brick-and-mortar operations using MKX's cloud-based POS and real-time inventory syncing."
                },
                {
                  title: "CRM Automation Best Practices",
                  date: "June 02, 2024 • 11:00 AM IST",
                  speaker: "Michael Chen, CRM Strategist",
                  desc: "Discover how to automate your sales pipeline and improve customer retention using MKX CRMS's advanced automation tools."
                }
              ].map((webinar, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-border bg-card/50 hover:border-accent/30 transition-all group">
                  <div className="md:w-1/3 aspect-video rounded-xl bg-accent/20 flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors" />
                    <MonitorPlay className="h-12 w-12 text-accent/40 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="md:w-2/3 space-y-3">
                    <h3 className="text-xl font-bold">{webinar.title}</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {webinar.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        {webinar.speaker}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{webinar.desc}</p>
                    <Button size="sm" className="mt-2">Register Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <h2 className="text-3xl font-bold">On-Demand Archive</h2>
              <div className="flex gap-2">
                {["All", "HRMS", "CRMS", "POS", "Strategy"].map((cat) => (
                  <button key={cat} className="px-4 py-1.5 rounded-full border border-border text-xs font-bold hover:border-accent hover:text-accent transition-colors">
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { title: "Introduction to POS System", duration: "45 mins", category: "POS" },
                { title: "Advanced API Integrations", duration: "60 mins", category: "Strategy" },
                { title: "Securing your Business Data", duration: "30 mins", category: "Security" },
                { title: "Customizing your CRMS Workflow", duration: "50 mins", category: "CRMS" },
                { title: "Automating Payroll with MKX", duration: "40 mins", category: "HRMS" },
                { title: "MKX 2024 Product Keynote", duration: "90 mins", category: "All" }
              ].map((recording, i) => (
                <div key={i} className="p-6 rounded-xl border border-border bg-card hover:bg-accent/5 transition-colors group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                      <Play className="h-4 w-4 text-accent fill-accent group-hover:text-white group-hover:fill-white" />
                    </div>
                    <span className="text-xs font-bold text-accent bg-accent/5 px-2 py-1 rounded">
                      {recording.category}
                    </span>
                  </div>
                  <h4 className="font-bold group-hover:text-accent transition-colors mb-2">{recording.title}</h4>
                  <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1 uppercase tracking-widest">
                    <Clock className="h-3 w-3" />
                    {recording.duration}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button variant="outline" className="border-accent/20 text-accent hover:bg-accent/5">Load More Recordings</Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
