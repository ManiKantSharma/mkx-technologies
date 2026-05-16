import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProductsSection } from "@/components/products-section";
import { FeaturesSection } from "@/components/features-section";
import { PricingSection } from "@/components/pricing-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | MKX Technologies Enterprise Solutions",
  description: "Enterprise-grade HRMS, CRMS, and POS systems built for scale and business growth. Start your 14-day free trial today.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProductsSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
