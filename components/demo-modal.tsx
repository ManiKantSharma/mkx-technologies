"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { toast } from "sonner"

interface DemoModalProps {
  children: React.ReactNode
}

export function DemoModal({ children }: DemoModalProps) {
  const [open, setOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [products, setProducts] = React.useState<any[]>([])
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    companySize: "",
    product: "",
    message: "",
  })

  const loadProducts = async () => {
    try {
      const res = await fetch("/api/admin/products?limit=50")
      if (res.ok) {
        const result = await res.json()
        if (result && result.success && Array.isArray(result.data)) {
          setProducts(result.data)
          if (result.data.length > 0) {
            setFormData(prev => ({ ...prev, product: result.data[0].id || result.data[0]._id }))
          }
        }
      }
    } catch (err) {
      console.error("Failed to load products inside modal:", err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true)
        toast.success("Demo request submitted successfully!")
      } else {
        toast.error(data.error || "Failed to submit demo request")
      }
    } catch (error) {
      console.error("Error submitting demo request:", error);
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (newOpen) {
      loadProducts()
    } else {
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          companySize: "",
          product: "",
          message: "",
        })
      }, 200)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        {isSuccess ? (
          <div className="flex flex-col items-center py-6 sm:py-8 px-4 text-center">
            <div className="mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-accent/20">
              <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-accent" />
            </div>
            <DialogHeader className="space-y-2 text-center">
              <DialogTitle className="text-xl sm:text-2xl">Your 15-Day Free Trial is Ready!</DialogTitle>
              <DialogDescription className="text-sm sm:text-base text-balance leading-normal px-2">
                Thank you for choosing MKX Technologies! We have successfully provisioned your private isolated database partition and emailed your temporary credentials to <strong className="text-foreground">{formData.email}</strong>.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 w-full rounded-lg border border-border bg-secondary/50 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground leading-none">What is pre-loaded?</p>
                  <p className="text-xs text-muted-foreground leading-normal mt-1.5">
                    We pre-seeded 3 employee files, live daily attendance registers, and time-off leave logs so you can start exploring immediately!
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
              <Button variant="outline" className="flex-1" onClick={() => handleOpenChange(false)}>
                Dismiss
              </Button>
              <Button asChild className="flex-1 gap-2">
                <Link href="/login">
                  Go to Login <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="px-2 sm:px-6">
              <DialogTitle className="text-xl sm:text-2xl">Schedule a Demo</DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                Fill out the form below and our team will reach out to schedule a personalized demo for your business.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4 px-2 sm:px-6 pb-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    required
                    className="text-sm sm:text-base"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    required
                    className="text-sm sm:text-base"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  required
                  className="text-sm sm:text-base"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  placeholder="Acme Inc."
                  required
                  className="text-sm sm:text-base"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) =>
                      setFormData({ ...formData, companySize: value })
                    }
                  >
                    <SelectTrigger id="companySize" className="w-full text-sm sm:text-base">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product">Product Interest</Label>
                  <Select
                    value={formData.product}
                    onValueChange={(value) =>
                      setFormData({ ...formData, product: value })
                    }
                  >
                    <SelectTrigger id="product" className="w-full text-sm sm:text-base">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.length > 0 ? (
                        products.map((prod) => (
                          <SelectItem key={prod.id || prod._id} value={prod.id || prod._id}>
                            {prod.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="hrms">MKX HRMS Ultimate</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Additional Information{" "}
                  <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your business needs or any specific questions..."
                  rows={3}
                  className="text-sm sm:text-base"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full gap-2 text-sm sm:text-base"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Request Demo
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground px-2">
                By submitting this form, you agree to our{" "}
                <Link href="/privacy" className="underline hover:text-foreground">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="underline hover:text-foreground">
                  Terms of Service
                </Link>
                .
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
