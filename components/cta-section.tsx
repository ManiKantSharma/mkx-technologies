"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { DemoModal } from "@/components/demo-modal"
import { motion } from "framer-motion"
import { slideUp, staggerContainer } from "@/lib/animations"

export function CTASection() {
  return (
    <section id="contact" className="border-t border-border bg-secondary/30 px-6 py-32">
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mx-auto max-w-4xl text-center"
      >
        <motion.h2 variants={slideUp} className="mb-6 text-3xl font-bold text-foreground md:text-5xl">
          Ready to transform your business?
        </motion.h2>
        <motion.p variants={slideUp} className="mb-10 text-lg text-muted-foreground">
          Join thousands of companies already using MKX Technologies to streamline their operations.
          Get started with a free trial today.
        </motion.p>
        <motion.div variants={slideUp} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <DemoModal>
            <Button size="lg" className="gap-2">
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Button>
          </DemoModal>
        </motion.div>
        <motion.p variants={slideUp} className="mt-6 text-sm text-muted-foreground">
          No credit card required. 14-day free trial for all plans.
        </motion.p>
      </motion.div>
    </section>
  )
}
