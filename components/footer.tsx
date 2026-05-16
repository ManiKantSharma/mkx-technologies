import Link from "next/link";

const footerLinks = {
  products: [
    { name: "HRMS", href: "/#products" },
    { name: "CRMS", href: "/#products" },
    { name: "POS System", href: "/#products" },
    { name: "Integrations", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
  ],
  company: [
    { name: "About", href: "/#features" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Community", href: "#" },
    { name: "Webinars", href: "#" },
    { name: "Case Studies", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Security", href: "#" },
    { name: "GDPR", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border lg:px-6 py-12">
      <div className="mx-auto lg:max-w-7xl">
        <div className="grid gap-8 px-6 md:grid-cols-2 lg:grid-cols-6">
          {}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex relative whitespace-nowrap items-center gap-0.5"
            >
              <span className="rounded-full h-10 w-10 bg-[#A70400]"></span>
              <span className="text-2xl absolute left-[10.5px] tracking-wider font-bold font-orbitron stroke-1 text-foreground text-stroke-black">
                MKX Technologies
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              MKX Technologies Pvt Ltd. Enterprise-grade business solutions to
              help you scale.
            </p>
            <div className="mt-2 space-y-2 text-sm text-muted-foreground">
              <p> 2468/8 CISF, Sector 8, Faridabad, Haryana, India</p>
              <p className="">Email: support@mkxtechnologies.com</p>
            </div>
          </div>

          {}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Products
            </h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-center lg:text-start text-muted-foreground">
            &copy; {new Date().getFullYear()} MKX Technologies Pvt Ltd. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              LinkedIn
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
