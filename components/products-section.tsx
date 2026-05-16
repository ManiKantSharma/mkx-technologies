"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, HeartHandshake, ShoppingCart, ArrowRight, Check } from "lucide-react"
import { useState } from "react"
import { DemoModal } from "./demo-modal"
import { motion, AnimatePresence } from "framer-motion"
import { fadeIn, slideUp, staggerContainer } from "@/lib/animations"

const products = [
  {
    id: "hrms",
    name: "HRMS",
    fullName: "Human Resource Management System",
    description: "Streamline your entire HR workflow from recruitment to retirement with our comprehensive solution.",
    icon: Users,
    features: [
      "Employee Onboarding & Offboarding",
      "Payroll Management",
      "Leave & Attendance Tracking",
      "Performance Reviews",
      "Training & Development",
      "Employee Self-Service Portal",
    ],
    color: "bg-accent",
  },
  {
    id: "crms",
    name: "CRMS",
    fullName: "Customer Relationship Management System",
    description: "Build stronger customer relationships and drive sales growth with intelligent CRM tools.",
    icon: HeartHandshake,
    features: [
      "Contact & Lead Management",
      "Sales Pipeline Tracking",
      "Email Marketing Integration",
      "Customer Analytics",
      "Support Ticket System",
      "Automated Workflows",
    ],
    color: "bg-blue-500",
  },
  {
    id: "pos",
    name: "POS System",
    fullName: "Point of Sale System",
    description: "Modern retail and restaurant POS solution designed for speed, reliability, and ease of use.",
    icon: ShoppingCart,
    features: [
      "Real-time Inventory Management",
      "Multi-location Support",
      "Payment Processing",
      "Sales Analytics & Reports",
      "Customer Loyalty Programs",
      "Offline Mode Support",
    ],
    color: "bg-amber-500",
  },
]

export function ProductsSection() {
  const [activeProduct, setActiveProduct] = useState(products[0])

  return (
    <section id="products" className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.h2 variants={slideUp} className="mb-4 text-3xl font-bold text-foreground md:text-5xl">Our Products</motion.h2>
          <motion.p variants={slideUp} className="mx-auto max-w-2xl text-muted-foreground">
            A collection of enterprise-grade solutions you can easily integrate into your business.
          </motion.p>
        </motion.div>

        {/* Product Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => setActiveProduct(product)}
              className={`rounded px-6 py-3 text-sm font-medium transition-all ${activeProduct.id === product.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
            >
              {product.name}
            </button>
          ))}
        </div>

        {/* Active Product Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 lg:grid-cols-2"
          >
            <Card className="border-border bg-card">
              <CardHeader>
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded ${activeProduct.color}`}>
                  <activeProduct.icon className="h-6 w-6 text-background" />
                </div>
                <CardTitle className="text-2xl text-card-foreground">{activeProduct.fullName}</CardTitle>
                <CardDescription className="text-base">{activeProduct.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <DemoModal>
                  <Button className="gap-2">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </DemoModal>
              </CardContent>
            </Card>

            <Card className="border-border bg-secondary/50">
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 md:grid-cols-2">
                  {activeProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Product Cards Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={fadeIn}>
              <Card
                className="group cursor-pointer border-border bg-card transition-all hover:border-accent/50 hover:bg-card/80"
                onClick={() => setActiveProduct(product)}
              >
                <CardHeader>
                  <div className={`mb-2 inline-flex h-10 w-10 items-center justify-center rounded ${product.color}`}>
                    <product.icon className="h-5 w-5 text-background" />
                  </div>
                  <CardTitle className="text-card-foreground">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-accent group-hover:underline">
                    Explore {product.name}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
