"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DemoModal } from "./demo-modal";
import { motion } from "framer-motion";
import { slideDown, staggerContainer, fadeIn } from "@/lib/animations";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial="initial"
      animate="animate"
      variants={slideDown}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-3 py-4">
        <Link
          href="/"
          className="flex relative whitespace-nowrap items-center gap-0.5"
        >
          <span className="rounded-full h-10 w-10 bg-brand"></span>
          <span className="text-2xl absolute left-[10.5px] tracking-wider font-bold font-orbitron stroke-1 text-foreground text-stroke-black">
            MKX Technologies
          </span>
        </Link>

        { }
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/#products"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            href="/#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="/#contact"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <DemoModal>
            <Button size="sm">Get Started</Button>
          </DemoModal>
        </div>

        { }
        <motion.button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </motion.div>
        </motion.button>
      </nav>

      { }
      <motion.div
        initial="collapsed"
        animate={mobileMenuOpen ? "expanded" : "collapsed"}
        variants={{
          expanded: {
            height: "auto",
            opacity: 1,
            transition: { duration: 0.3, ease: "easeInOut" }
          },
          collapsed: {
            height: 0,
            opacity: 0,
            overflow: "hidden",
            transition: { duration: 0.3, ease: "easeInOut" }
          }
        }}
        className="md:hidden"
      >
        <motion.div
          className="border-t border-border bg-background px-6 py-4"
          initial="hidden"
          animate={mobileMenuOpen ? "visible" : "hidden"}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, delay: 0.1 }
            },
            hidden: {
              opacity: 0,
              y: -10,
              transition: { duration: 0.2 }
            }
          }}
        >
          <motion.div
            className="flex flex-col gap-4"
            variants={staggerContainer}
            initial="initial"
            animate={mobileMenuOpen ? "animate" : "initial"}
          >
            <motion.div variants={fadeIn}>
              <Link
                href="/#products"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Link
                href="/#features"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Link
                href="/#pricing"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Link
                href="/#contact"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </motion.div>
            <motion.div
              className="flex flex-col gap-2 pt-4"
              variants={fadeIn}
            >
              <DemoModal>
                <Button size="sm" className="w-full">Get Started</Button>
              </DemoModal>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
