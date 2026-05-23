"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { DemoModal } from "@/components/demo-modal";
import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/lib/animations";

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center px-3 pt-28 lg:pt-28 md:justify-center">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-size-[64px_64px]" />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 mx-auto max-w-full lg:max-w-5xl text-center"
      >
        <motion.div
          variants={slideUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5"
        >
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="text-xs text-muted-foreground sm:text-sm lg:text-sm">
            Enterprise grade Solutions For Modern Businesses
          </span>
        </motion.div>

        <motion.h1
          variants={slideUp}
          className="mb-6 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-5xl lg:text-7xl"
        >
          The complete platform to
          <span className="block"> run your business</span>
        </motion.h1>

        <motion.p
          variants={slideUp}
          className="mx-auto mb-5 max-w-4xl text-pretty text-sm text-muted-foreground sm:text-base md:text-lg lg:text-xl"
        >
          MKX Technologies brings your team&apos;s toolkit to streamline
          operations. Securely manage HR, customers, and sales with our
          integrated suite of enterprise solutions.
        </motion.p>

        <motion.div
          variants={slideUp}
          className="flex items-center justify-center gap-4"
        >
          <DemoModal>
            <Button size="lg" className="gap-2">
              Get a Demo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </DemoModal>
          <Button
            size="lg"
            className="bg-secondary!"
            variant="outline"
            onClick={() => {
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Products
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 mt-10 w-full"
      >
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
              20 days
            </p>
            <p className="text-sm text-muted-foreground">saved on average</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
              98%
            </p>
            <p className="text-sm text-muted-foreground">
              faster time to deploy
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
              300%
            </p>
            <p className="text-sm text-muted-foreground">
              increase in efficiency
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">6x</p>
            <p className="text-sm text-muted-foreground">faster to scale</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
