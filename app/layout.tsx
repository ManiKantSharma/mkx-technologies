import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/toaster";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MKX Technologies Pvt Ltd",
  "url": "https://mkxtechnologies.vercel.app",
  "logo": "https://mkxtechnologies.vercel.app/icon.svg",
  "description": "Enterprise-grade HRMS, CRMS, and POS systems built for scale and business growth.",
  "sameAs": [
    "https://twitter.com/mkxtechnologies", // Update with actual social links
    "https://linkedin.com/company/mkxtechnologies"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-XXXXXXXXXX", // Update with actual phone
    "contactType": "customer service",
    "email": "mkxtechnologies@gmail.com"
  }
};

export const metadata: Metadata = {
  title: {
    default: "MKX Technologies | Enterprise HRMS, CRMS & POS Solutions",
    template: "%s | MKX Technologies",
  },
  description:
    "MKX Technologies Pvt Ltd provides enterprise-grade business solutions including HRMS, CRMS, and POS systems built for scale and efficiency.",
  keywords: [
    "HRMS",
    "CRMS",
    "POS System",
    "Business Solutions",
    "MKX Technologies",
    "Enterprise Software",
    "SaaS",
    "Inventory Management",
    "Employee Management",
  ],
  authors: [{ name: "MKX Technologies Pvt Ltd" }],
  creator: "MKX Technologies",
  publisher: "MKX Technologies Pvt Ltd",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mkxtechnologies.vercel.app"),
   alternates: {
     canonical: "/",
   },
   openGraph: {
     title: "MKX Technologies | Enterprise Business Solutions",
     description: "Enterprise-grade HRMS, CRMS, and POS systems built for scale.",
     url: "https://mkxtechnologies.vercel.app",
     siteName: "MKX Technologies",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "MKX Technologies Enterprise Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MKX Technologies | Enterprise Business Solutions",
    description: "Enterprise-grade HRMS, CRMS, and POS systems built for scale.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
