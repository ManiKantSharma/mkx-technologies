"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  DollarSign,
  Users,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  ChevronDown,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Pricing", href: "/admin/pricing", icon: DollarSign },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { name: "Blog", href: "/admin/blog", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dbStatus, setDbStatus] = useState<'live' | 'demo' | 'loading'>('loading');

  useEffect(() => {
    fetch('/api/admin/status')
      .then(res => res.json())
      .then(data => setDbStatus(data.status))
      .catch(() => setDbStatus('demo'));
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        toast.success("Logged out successfully");
        router.push("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-card border-r border-border transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link
            href="/admin"
            className="group flex items-center gap-3 transition-all duration-300"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded bg-primary shadow-lg shadow-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
              <span className="text-[13px] font-black tracking-tighter text-primary-foreground">MKX</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-foreground">MKX Admin</span>
                {dbStatus === 'live' ? (
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-1.5 py-0.5 border border-emerald-500/20">
                    <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-tight">Live</span>
                  </div>
                ) : dbStatus === 'demo' ? (
                  <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-1.5 py-0.5 border border-amber-500/20">
                    <div className="h-1 w-1 rounded-full bg-amber-500" />
                    <span className="text-[8px] font-bold text-amber-600 uppercase tracking-tight">Demo</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 rounded-full bg-slate-500/10 px-1.5 py-0.5 border border-slate-500/20">
                    <div className="h-1 w-1 rounded-full bg-slate-400 animate-pulse" />
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tight">...</span>
                  </div>
                )}
              </div>
              <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-[0.2em] mt-0.5">Management</span>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="h-5 w-5" />
            Back to Site
          </Link>
        </div>
      </aside>

      {}
      <div className="lg:pl-64">
        {}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-6 backdrop-blur supports-backdrop-filter:bg-background/60">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 h-auto px-3"
              >
                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-xs font-medium text-accent-foreground">
                    A
                  </span>
                </div>
                <span className="text-sm font-medium">Admin</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 focus:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
