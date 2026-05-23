import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Calendar, User, Clock, MonitorPlay, ArrowRight, CheckCircle2, Video, Users, Zap } from "lucide-react";

const upcomingWebinars = [
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
  },
  {
    title: "HRMS Compliance Masterclass",
    date: "June 15, 2024 • 2:00 PM IST",
    speaker: "Dr. Priya Sharma, HR Compliance Expert",
    desc: "Deep dive into labor laws, tax compliance, and data protection requirements for modern HR management."
  },
  {
    title: "Building Custom Integrations",
    date: "June 22, 2024 • 3:00 PM IST",
    speaker: "Alex Rodriguez, Lead Developer",
    desc: "Technical workshop on building custom integrations with MKX APIs, including best practices and security considerations."
  }
];

const onDemandRecordings = [
  { title: "Introduction to POS System", duration: "45 mins", category: "POS" },
  { title: "Advanced API Integrations", duration: "60 mins", category: "Strategy" },
  { title: "Securing your Business Data", duration: "30 mins", category: "Security" },
  { title: "Customizing your CRMS Workflow", duration: "50 mins", category: "CRMS" },
  { title: "Automating Payroll with MKX", duration: "40 mins", category: "HRMS" },
  { title: "MKX 2024 Product Keynote", duration: "90 mins", category: "All" }
];

const benefits = [
  { title: "Expert-Led Sessions", desc: "Learn directly from product experts and industry leaders" },
  { title: "Interactive Q&A", desc: "Get your specific questions answered in real-time" },
  { title: "Recorded Access", desc: "All sessions recorded and available on-demand" },
  { title: "Free Certification", desc: "Earn certificates for completed webinar series" }
];

export default function WebinarsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-8">
        <section className="py-20 text-center lg:py-32">
          <div className="container px-3">
            <div className="mx-auto max-w-3xl space-y-6">
              <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
                Learning Hub
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                Webinars & <span className="text-accent">Events</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Learn from industry experts and get deep dives into MKX products. Join live sessions for interactive learning or access our extensive on-demand library at your convenience.
              </p>
              <div className="flex justify-center gap-2 pt-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90">Browse Upcoming</Button>
                <Button size="lg" variant="outline">Watch Recordings</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Why Attend Our Webinars?</h2>
              <p className="mt-4 text-muted-foreground">Get more value from MKX products through expert-led learning.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="p-6 rounded-xl border border-border bg-card/50 hover:border-accent/30 transition-all">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
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
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Upcoming Webinars</h2>
              <p className="mt-4 text-muted-foreground">Reserve your spot for our upcoming live sessions.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingWebinars.map((webinar, i) => (
                <div key={i} className="p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Video className="h-6 w-6 text-accent" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold">{webinar.title}</h3>
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
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{webinar.desc}</p>
                  <Button size="sm" className="w-full sm:w-auto">Register Now</Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <h2 className="text-3xl font-bold">On-Demand Archive</h2>
              <div className="flex flex-wrap gap-2">
                {["All", "HRMS", "CRMS", "POS", "Strategy"].map((cat) => (
                  <button key={cat} className="px-4 py-1.5 rounded-full border border-border text-xs font-bold hover:border-accent hover:text-accent transition-colors">
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {onDemandRecordings.map((recording, i) => (
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

        <section className="py-24 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-3xl font-bold mb-6">Want to speak at our webinars?</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">We're always looking for industry experts and product champions to share their knowledge with our community.</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 px-12">
              Become a Speaker
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
