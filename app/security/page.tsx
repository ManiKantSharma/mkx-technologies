import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Eye, Server, ShieldAlert, FileCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-8">
        <section className="py-20 text-center lg:py-32">
          <div className="container px-3">
            <div className="mx-auto max-w-3xl space-y-6">
              <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
                Security First
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
                Enterprise <span className="text-accent">Security</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Your data security is our top priority. We use industry-leading standards to keep your business safe.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90">Security Whitepaper</Button>
                <Button size="lg" variant="outline">Contact Security Team</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Security Features</h2>
              <p className="mt-4 text-muted-foreground">Enterprise-grade protection for your business data.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Lock,
                  title: "Data Encryption",
                  desc: "All data is encrypted at rest using AES-256 and in transit using TLS 1.3."
                },
                {
                  icon: Eye,
                  title: "Continuous Monitoring",
                  desc: "24/7 security monitoring and automated threat detection systems."
                },
                {
                  icon: Server,
                  title: "Infrastructure Security",
                  desc: "Hosted on SOC 2 Type II and ISO 27001 certified data centers."
                },
                {
                  icon: ShieldCheck,
                  title: "Access Control",
                  desc: "Multi-factor authentication (MFA) and granular role-based access controls."
                },
                {
                  icon: ShieldAlert,
                  title: "Incident Response",
                  desc: "Rapid response team and established protocols for any security events."
                },
                {
                  icon: FileCheck,
                  title: "Compliance Audits",
                  desc: "Regular third-party security audits and penetration testing."
                }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all">
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
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Network & Infrastructure</h2>
                <p className="text-muted-foreground">
                  We leverage enterprise-grade cloud infrastructure with multiple layers of redundancy and security.
                </p>
                <div className="space-y-4">
                  {[
                    { title: "DDoS Protection", desc: "Automated mitigation of high-volume network attacks." },
                    { title: "Virtual Private Cloud (VPC)", desc: "Isolated network environments for your business data." },
                    { title: "Web Application Firewall (WAF)", desc: "Protection against common web exploits and bots." }
                  ].map((net, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-card/30">
                      <div className="h-6 w-6 rounded bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                        <Server className="h-3 w-3 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{net.title}</h4>
                        <p className="text-xs text-muted-foreground">{net.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Physical Security</h2>
                <p className="text-muted-foreground">
                  Our data centers are protected by strict physical security measures.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "Biometric access control",
                    "24/7 on-site security staff",
                    "Video surveillance (CCTV)",
                    "Redundant power & cooling",
                    "Disaster recovery sites",
                    "Strict visitor protocols"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-accent" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="py-24 bg-accent/5">
          <div className="container px-3">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold mb-6">Security Compliance & Reporting</h2>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  "ISO 27001", "SOC 2 Type II", "GDPR", "CERT-In"
                ].map((cert) => (
                  <div key={cert} className="px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-sm font-bold text-accent">
                    {cert}
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mb-10">
                If you believe you've found a security vulnerability in MKX Technologies, please report it to our security team at <span className="font-bold text-foreground">security@mkxtechnologies.com</span>. For general privacy inquiries, contact our DPO at <span className="font-bold text-foreground">dpo@mkxtechnologies.com</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">Report Vulnerability</Button>
                <Button size="lg" variant="outline">Security Whitepaper</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-border/40">
          <div className="container px-3 text-center">
            <h2 className="text-3xl font-bold mb-6">Trust & Transparency</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">We believe in complete transparency about our security practices. Our team is always available to discuss your security requirements.</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 px-12">
              Contact Security Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
