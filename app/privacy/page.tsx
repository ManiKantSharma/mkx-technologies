"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Metadata } from "next";
import { motion } from "framer-motion";
import { fadeIn, slideUp, staggerContainer } from "@/lib/animations";

export default function PrivacyPage() {
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
            Privacy Policy
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
              MKX Technologies ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our HRMS, CRMS, and POS systems.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">2. Information We Collect</h2>
            <p className="leading-7 text-muted-foreground">
              We collect information you provide directly to us when you create an account, use our Services, or communicate with us.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Contact information (e.g., name, email address, phone number).</li>
              <li>Professional information (e.g., company name, company size).</li>
              <li>Payment and billing information.</li>
              <li>Technical data (e.g., IP address, browser type, device information).</li>
              <li>Usage data (e.g., how you interact with our Services).</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">3. How We Use Your Information</h2>
            <p className="leading-7 text-muted-foreground">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Providing, maintaining, and improving our Services.</li>
              <li>Processing transactions and sending related information.</li>
              <li>Sending technical notices, updates, and support messages.</li>
              <li>Communicating with you about products, services, and events.</li>
              <li>Monitoring and analyzing trends, usage, and activities.</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">4. Data Security</h2>
            <p className="leading-7 text-muted-foreground">
              We use industry-standard security measures to protect your personal data from unauthorized access, disclosure, or misuse. This includes encryption of data in transit and at rest.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">5. Information Sharing</h2>
            <p className="leading-7 text-muted-foreground">
              We do not sell your personal data. We may share your information with service providers who perform services on our behalf, or as required by law.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">6. Your Rights</h2>
            <p className="leading-7 text-muted-foreground">
              Depending on your location, you may have rights regarding your personal data, such as the right to access, correct, or delete your information. You can manage your communication preferences through your account settings.
            </p>
          </motion.section>

          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">7. Contact Us</h2>
            <p className="leading-7 text-muted-foreground">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="rounded-lg bg-card p-6 border border-border">
              <p className="font-semibold">MKX Technologies Privacy Team</p>
              <p className="text-sm text-muted-foreground">Email: privacy@mkxtechnologies.com</p>
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
