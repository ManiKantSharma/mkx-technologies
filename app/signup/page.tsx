"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const passwordRequirements = [
  { label: "At least 8 characters", regex: /.{8,}/ },
  { label: "One uppercase letter", regex: /[A-Z]/ },
  { label: "One lowercase letter", regex: /[a-z]/ },
  { label: "One number", regex: /[0-9]/ },
];

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const companySize = formData.get("companySize") as string;
    const password = formData.get("password") as string;

    try {
      const loadingToast = toast.loading("Creating your account...");

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          company,
          companySize,
          password,
        }),
      });
      const data = await response.json();
      toast.dismiss(loadingToast);
      if (response.ok && data.success) {
        toast.success(
          "Account created successfully! Welcome to MKX Technologies!",
        );
        router.push("/");
      } else {
        toast.error(data.error || "Signup failed");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1 pt-24">
      {/* Left Panel - Branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-card p-12 pl-38! lg:flex">


        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-foreground text-balance">
            Start your journey with powerful business tools
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Get access to HRMS, CRMS, and POS systems. Free 14-day trial, no
            credit card required.
          </p>

          <div className="space-y-4 pt-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                <Check className="h-3 w-3 text-accent-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  All-in-one platform
                </p>
                <p className="text-sm text-muted-foreground">
                  HRMS, CRMS, and POS in a single dashboard
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                <Check className="h-3 w-3 text-accent-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Enterprise-grade security
                </p>
                <p className="text-sm text-muted-foreground">
                  SOC2 compliant with end-to-end encryption
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                <Check className="h-3 w-3 text-accent-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">24/7 Support</p>
                <p className="text-sm text-muted-foreground">
                  Dedicated support team ready to help
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Join 500+ companies already using MKX Technologies
        </p>
      </div>

      {/* Right Panel - Signup Form */}
      <div className="flex w-full flex-col lg:w-1/2">


        <div className="flex flex-1 items-center justify-center px-6 pb-12 lg:px-12">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold text-foreground">
                Get Started
              </h2>
              <p className="text-muted-foreground">
                Create your demo account to explore our platform
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="firstName">First name</FieldLabel>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      required
                      autoComplete="given-name"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      required
                      autoComplete="family-name"
                    />
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="email">Work email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    autoComplete="email"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="company">Company name</FieldLabel>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Acme Inc."
                    required
                    autoComplete="organization"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="companySize">Company size</FieldLabel>
                  <Select name="companySize" required>
                    <SelectTrigger id="companySize">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      required
                      autoComplete="new-password"
                      className="pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {passwordRequirements.map((req) => (
                      <div
                        key={req.label}
                        className={`flex items-center gap-1.5 text-xs ${
                          req.regex.test(password)
                            ? "text-accent"
                            : "text-muted-foreground"
                        }`}
                      >
                        <Check className="h-3 w-3" />
                        {req.label}
                      </div>
                    ))}
                  </div>
                </Field>

                <div className="flex items-start gap-2">
                  <Checkbox id="terms" className="mt-0.5" required />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-accent hover:text-accent/80"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-accent hover:text-accent/80"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </FieldGroup>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
