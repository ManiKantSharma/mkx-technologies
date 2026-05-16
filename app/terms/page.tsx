"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Metadata } from "next";
import { motion } from "framer-motion";
import { fadeIn, slideUp, staggerContainer } from "@/lib/animations";

export default function TermsPage() {
  const lastUpdated = "April 7, 2026";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mb-12 space-y-4"
        >
          <motion.h1 
            variants={slideUp}
            className="text-4xl font-extrabold tracking-tight lg:text-5xl"
          >
            Terms of Service
          </motion.h1>
          <motion.p variants={slideUp} className="text-muted-foreground">Last updated: {lastUpdated}</motion.p>
        </motion.div>

        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="prose prose-slate dark:prose-invert max-w-none space-y-12"
        >
          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">1. Introduction</h2>
            <p className="leading-7 text-muted-foreground">
              Welcome to MKX Technologies. These Terms of Service ("Terms") govern your use of our HRMS, CRMS, and POS systems (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">2. Use of Services</h2>
            <p className="leading-7 text-muted-foreground">
              You may use our Services only for lawful purposes and in accordance with these Terms. You are responsible for all activity that occurs under your account.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>You must be at least 18 years old to use the Services.</li>
              <li>You must provide accurate and complete information during registration.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">3. Subscriptions and Payments</h2>
            <p className="leading-7 text-muted-foreground">
              Some parts of our Services are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Free trials are offered for a limited period.</li>
              <li>Subscriptions automatically renew unless canceled.</li>
              <li>Fees are non-refundable except as required by law.</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">4. Intellectual Property</h2>
            <p className="leading-7 text-muted-foreground">
              The Services and their original content, features, and functionality are and will remain the exclusive property of MKX Technologies and its licensors.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">5. Limitation of Liability</h2>
            <p className="leading-7 text-muted-foreground">
              In no event shall MKX Technologies, its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Services.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">6. Changes to Terms</h2>
            <p className="leading-7 text-muted-foreground">
              We reserve the right to modify or replace these Terms at any time. We will provide notice of any material changes by posting the new Terms on this page.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">7. Contact Us</h2>
            <p className="leading-7 text-muted-foreground">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="rounded-lg bg-card p-6 border border-border">
              <p className="font-semibold">MKX Technologies Support</p>
              <p className="text-sm text-muted-foreground">Email: support@mkxtechnologies.com</p>
              <p className="text-sm text-muted-foreground">Address: 2468/8 CISF, Sector 8 Faridabad, Haryana, India</p>
            </div>
          </motion.section>
        </motion.div>
      </main>

      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 MKX Technologies. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
