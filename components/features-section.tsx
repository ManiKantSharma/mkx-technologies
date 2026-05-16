"use client"

import { Shield, Zap, Globe, Clock, BarChart3, Headphones } from "lucide-react"
import { motion } from "framer-motion"
import { fadeIn, slideUp, staggerContainer } from "@/lib/animations"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed with sub-second response times across all modules.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance with SOC 2, GDPR, and HIPAA standards.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Multi-region deployment with 99.99% uptime SLA for mission-critical operations.",
  },
  {
    icon: Clock,
    title: "Real-time Sync",
    description: "Instant data synchronization across all devices and locations.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Powerful dashboards and reports to drive data-informed decisions.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock expert support with average response time under 2 minutes.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border bg-secondary/30 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16 grid gap-8 lg:grid-cols-2 lg:gap-16"
        >
          <motion.div variants={slideUp}>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl">
              Faster iteration.
              <span className="block">More innovation.</span>
            </h2>
          </motion.div>
          <motion.div variants={slideUp} className="flex items-center">
            <p className="text-lg text-muted-foreground">
              The platform for rapid progress. Let your team focus on shipping features instead of managing infrastructure with automated CI/CD, built-in testing, and integrated collaboration.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeIn}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/50"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
