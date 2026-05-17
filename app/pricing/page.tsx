import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Check, Zap, Rocket, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const tiers = [
  {
    name: "Trial",
    id: "trial",
    price: "0",
    description: "Perfect for exploring platform capabilities.",
    features: ["15-day sandbox trial", "Core HRMS modules", "Pre-seeded employee records", "Standard check-in/out logs", "Email support"],
    icon: Zap,
    popular: false
  },
  {
    name: "Premium",
    id: "premium",
    price: "99",
    description: "Advanced features for scaling enterprise teams.",
    features: ["Unlimited active employees", "Full HRMS, CRMS & POS access", "Advanced attendance reporting", "Priority 24/7 support", "Custom API integrations"],
    icon: Rocket,
    popular: true
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
            <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
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
                    {tier.price === '0' ? 'Get Started' : 'Upgrade Now'}
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
                          <th className="p-6 border-b border-border">Trial Plan</th>
                          <th className="p-6 border-b border-border">Premium Plan</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                       {[
                         { feature: "Trial Period", s: "15 Days", p: "Lifetime / Active Sub" },
                         { feature: "Active Employees", s: "Up to 3", p: "Unlimited" },
                         { feature: "HRMS Modules", s: "Core Modules", p: "Full Suite (All Modules)" },
                         { feature: "CRMS Modules", s: "—", p: "Full Suite" },
                         { feature: "POS Support", s: "Basic", p: "Enterprise Multi-Store" },
                         { feature: "API Access", s: "—", p: "Premium (High-Rate)" },
                         { feature: "Support", s: "Email Support", p: "24/7 Priority Support" },
                         { feature: "Security & SSO", s: "Standard", p: "Enterprise Grade / SSO" }
                       ].map((row, i) => (
                         <tr key={i} className="hover:bg-accent/20 transition-colors">
                            <td className="p-6 font-bold">{row.feature}</td>
                            <td className="p-6 text-muted-foreground">{row.s}</td>
                            <td className="p-6 text-muted-foreground">{row.p}</td>
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
