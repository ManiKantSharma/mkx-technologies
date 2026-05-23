import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, CheckCircle2, Info, Scale, Fingerprint, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GDPRPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-8">
        <section className="py-20 text-center lg:py-32">
          <div className="container px-3">
            <div className="mx-auto max-w-3xl space-y-6">
              <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
                Data Protection
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                GDPR <span className="text-accent">Compliance</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Commitment to data privacy and protection for our global users. We apply GDPR high standards to all users worldwide.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90">Data Processing Agreement</Button>
                <Button size="lg" variant="outline">Contact DPO</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">GDPR Principles</h2>
              <p className="mt-4 text-muted-foreground">How we protect your data rights globally.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  icon: Scale,
                  title: "Your Rights",
                  desc: "Right to access, rectify, erase, and restrict processing of your personal data."
                },
                {
                  icon: Fingerprint,
                  title: "Data Minimization",
                  desc: "We only collect data that is strictly necessary for the purposes of providing our services."
                },
                {
                  icon: ShieldCheck,
                  title: "Data Security",
                  desc: "Implementation of technical and organizational measures to ensure a high level of security."
                },
                {
                  icon: Globe,
                  title: "Global Standards",
                  desc: "While GDPR is an EU regulation, we apply its high standards to all our users globally."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all">
                  <div className="shrink-0 h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-3">
            <div className="max-w-4xl mx-auto p-8 rounded-2xl border border-border bg-card">
              <h2 className="text-2xl font-bold mb-6">Data Subject Rights (DSR)</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We've made it easy for you to exercise your rights. Use our automated tools within your account settings or contact our privacy team to:
              </p>
              <div className="grid gap-6 sm:grid-cols-2 mb-10">
                {[
                  { title: "Right to Access", desc: "Download a copy of all your personal data." },
                  { title: "Right to be Forgotten", desc: "Request permanent deletion of your account and data." },
                  { title: "Right to Portability", desc: "Export your data in a machine-readable format." },
                  { title: "Right to Rectification", desc: "Update any inaccurate personal information." }
                ].map((dsr, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-8 w-8 rounded bg-accent/5 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{dsr.title}</p>
                      <p className="text-xs text-muted-foreground">{dsr.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full sm:w-auto bg-accent">Open DSR Portal</Button>
            </div>
          </div>
        </section>
        <section className="py-24">
          <div className="container px-3">
            <div className="max-w-4xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold mb-6">Sub-processors</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  To support the delivery of our services, MKX Technologies may engage third-party service providers (sub-processors). We maintain a rigorous vetting process for all sub-processors.
                </p>
                <div className="overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-accent/50 font-bold">
                      <tr>
                        <th className="p-4 border-b border-border">Entity</th>
                        <th className="p-4 border-b border-border">Service Provided</th>
                        <th className="p-4 border-b border-border">Location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { name: "Amazon Web Services", service: "Cloud Infrastructure", location: "USA/India" },
                        { name: "Stripe, Inc.", service: "Payment Processing", location: "Global" },
                        { name: "SendGrid (Twilio)", service: "Email Notifications", location: "USA" },
                        { name: "Zendesk, Inc.", service: "Customer Support Tools", location: "USA/Europe" }
                      ].map((sp, i) => (
                        <tr key={i} className="hover:bg-accent/20 transition-colors">
                          <td className="p-4 font-bold">{sp.name}</td>
                          <td className="p-4 text-muted-foreground">{sp.service}</td>
                          <td className="p-4 text-muted-foreground">{sp.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="max-w-4xl mx-auto">
              <div className="p-8 rounded-3xl border border-accent/20 bg-accent/5">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Info className="h-6 w-6 text-accent" />
                  Data Processing Agreement (DPA)
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We offer a standard Data Processing Agreement (DPA) for our enterprise customers that covers our obligations as a data processor under GDPR.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    "Sub-processor transparency",
                    "Standard Contractual Clauses (SCCs)",
                    "Security breach notification protocols",
                    "Data transfer mechanisms"
                  ].map((check) => (
                    <div key={check} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      <span className="text-sm font-medium">{check}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-8 border-t border-accent/10">
                  <h4 className="font-bold mb-2">Contact our Data Protection Officer</h4>
                  <p className="text-sm text-muted-foreground">
                    For any GDPR-related inquiries or to exercise your rights, please contact our DPO at <span className="font-bold text-foreground">dpo@mkxtechnologies.com</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-3xl font-bold mb-6">Need help with GDPR compliance?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">Our Data Protection Officer is available to answer any GDPR-related questions you may have.</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 px-12">
              Contact DPO
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>

  );
}
