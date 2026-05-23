"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { fadeIn, slideDown } from "@/lib/animations";

export function BlogHero() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={slideDown}
      className="mb-16 text-center"
    >
      <motion.div variants={fadeIn}>
        <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5 mb-6">
          Blog
        </Badge>
      </motion.div>
      <motion.h1 variants={fadeIn} className="text-3xl font-extrabold tracking-tight lg:text-5xl mb-4">
        <span className="text-6xl lg:text-7xl text-accent">I</span>nsights & Resources
      </motion.h1>
      <motion.p variants={fadeIn} className="text-muted-foreground max-w-2xl mx-auto lg:text-lg">
        Stay updated with the latest trends, guides, and insights on how to grow your business using enterprise-grade SaaS tools.
      </motion.p>
    </motion.div>
  );
}
