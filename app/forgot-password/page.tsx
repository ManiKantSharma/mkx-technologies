"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { Header } from "@/components/header"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1 pt-24">
        {/* Left Panel - Branding */}
        <div className="hidden w-1/2 flex-col justify-between bg-card p-12 lg:flex">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-foreground text-balance">
              Reset your password securely
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              We take security seriously. Your password reset link will expire in 24 hours for added protection.
            </p>

            <div className="space-y-4 pt-6 rounded-lg border border-border bg-background/50 p-6">
              <h3 className="font-medium text-foreground">Security Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Use a unique password for each account
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Enable two-factor authentication
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Never share your password with anyone
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Use a password manager for added security
                </li>
              </ul>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Need help? Contact our{" "}
            <Link href="/support" className="text-accent hover:text-accent/80">
              support team
            </Link>
          </p>
        </div>

        {/* Right Panel - Forgot Password Form */}
        <div className="flex w-full flex-col lg:w-1/2">
          <div className="flex flex-1 items-center justify-center px-6 pb-12 lg:px-12">
            <div className="w-full max-w-md space-y-8">
            {!isSubmitted ? (
              <>
                <div className="space-y-2 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                    <Mail className="h-7 w-7 text-accent" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Forgot password?</h2>
                  <p className="text-muted-foreground">
                    No worries, we&apos;ll send you reset instructions
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="email">Email address</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <FieldDescription>
                        Enter the email associated with your account
                      </FieldDescription>
                    </Field>
                  </FieldGroup>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send reset link"}
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-accent transition-colors hover:text-accent/80"
                  >
                    Sign in
                  </Link>
                </p>
              </>
            ) : (
              <div className="space-y-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle className="h-7 w-7 text-accent" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-foreground">Check your email</h2>
                  <p className="text-muted-foreground">
                    We&apos;ve sent a password reset link to
                  </p>
                  <p className="font-medium text-foreground">{email}</p>
                </div>

                <div className="rounded-lg border border-border bg-card p-4 text-left">
                  <p className="text-sm text-muted-foreground">
                    Didn&apos;t receive the email? Check your spam folder or{" "}
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="text-accent hover:text-accent/80"
                    >
                      try another email address
                    </button>
                  </p>
                </div>

                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">Back to login</Link>
                </Button>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
