import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Check, Zap, Rocket, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const tiers = [
  {
    name: "Starter",
    id: "starter",
    price: "29",
    description: "Perfect for small teams and startups.",
    features: ["Up to 10 users", "Core HRMS modules", "Basic Reporting", "Email Support"],
    icon: Zap,
    popular: false
  },
  {
    name: "Professional",
    id: "professional",
    price: "99",
    description: "Advanced features for growing businesses.",
    features: ["Up to 50 users", "Full HRMS & CRMS", "Advanced Analytics", "Priority Support", "Custom Integrations"],
    icon: Rocket,
    popular: true
  },
  {
    name: "Enterprise",
    id: "enterprise",
    price: "Custom",
    description: "Unlimited power for large scale organizations.",
    features: ["Unlimited users", "Full Suite Access", "White-glove Onboarding", "Dedicated Success Manager", "24/7 Phone Support"],
    icon: Building2,
    popular: false
  }
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <section className="py-20 lg:py-32">
          <div className="container px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">Simple, Transparent <span className="text-accent">Pricing</span></h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that's right for your business. No hidden fees, no complex contracts.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="container px-6">
            <div className="grid gap-8 lg:grid-cols-3">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative p-8 rounded-3xl border border-border/50 bg-card/50 flex flex-col ${tier.popular ? 'ring-2 ring-accent' : ''}`}
                >
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent hover:bg-accent">Most Popular</Badge>
                  )}
                  <div className="mb-8">
                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <tier.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold">{tier.name}</h3>
                    <p className="text-muted-foreground mt-2 text-sm">{tier.description}</p>
                  </div>
                  <div className="mb-8">
                    <span className="text-4xl font-bold">{tier.price === 'Custom' ? '' : '$'}{tier.price}</span>
                    {tier.price !== 'Custom' && <span className="text-muted-foreground ml-2 text-sm">/month</span>}
                  </div>
                  <div className="flex-1 space-y-4 mb-8">
                    {tier.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-accent" />
                        <span className="text-sm text-foreground/80">{feat}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className={`w-full h-12 text-md font-semibold ${tier.popular ? 'bg-accent hover:bg-accent/90' : 'variant-outline border-border/50'}`}
                    variant={tier.popular ? 'default' : 'outline'}
                  >
                    {tier.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-accent/5">
           <div className="container px-6">
              <h2 className="text-3xl font-bold text-center mb-16">Compare Plans</h2>
              <div className="overflow-hidden rounded-3xl border border-border bg-card">
                 <table className="w-full text-left text-sm">
                    <thead className="bg-accent/50 font-bold">
                       <tr>
                          <th className="p-6 border-b border-border">Features</th>
                          <th className="p-6 border-b border-border">Starter</th>
                          <th className="p-6 border-b border-border">Professional</th>
                          <th className="p-6 border-b border-border">Enterprise</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                       {[
                         { feature: "Users", s: "Up to 10", p: "Up to 50", e: "Unlimited" },
                         { feature: "HRMS Modules", s: "Core", p: "Full", e: "Full + Custom" },
                         { feature: "CRMS Modules", s: "—", p: "Full", e: "Full + Custom" },
                         { feature: "POS Support", s: "Basic", p: "Advanced", e: "Multi-Store" },
                         { feature: "API Access", s: "—", p: "Standard", e: "Premium (High-Rate)" },
                         { feature: "Support", s: "Email", p: "Priority Email", e: "24/7 Phone & Success Manager" },
                         { feature: "Security", s: "Standard", p: "Standard", e: "Advanced + Custom SSO" }
                       ].map((row, i) => (
                         <tr key={i} className="hover:bg-accent/20 transition-colors">
                            <td className="p-6 font-bold">{row.feature}</td>
                            <td className="p-6 text-muted-foreground">{row.s}</td>
                            <td className="p-6 text-muted-foreground">{row.p}</td>
                            <td className="p-6 text-muted-foreground">{row.e}</td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </section>

        <section className="py-24">
           <div className="container px-6">
              <div className="mx-auto max-w-3xl text-center">
                 <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
                 <div className="space-y-6 text-left">
                    {[
                      { q: "Can I upgrade or downgrade my plan later?", a: "Yes, you can change your plan at any time from your account settings. Changes will be reflected in your next billing cycle." },
                      { q: "Are there any setup fees?", a: "We do not charge any setup fees for Starter or Professional plans. Enterprise plans may have a white-glove onboarding fee depending on requirements." },
                      { q: "Do you offer discounts for non-profits?", a: "Yes! We offer significant discounts for eligible non-profits and educational institutions. Please contact our sales team." }
                    ].map((faq, i) => (
                      <div key={i} className="p-6 rounded-2xl border border-border bg-card/30">
                         <h4 className="font-bold mb-2">{faq.q}</h4>
                         <p className="text-sm text-muted-foreground">{faq.a}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
