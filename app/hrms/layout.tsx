"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Clock,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  ChevronDown,
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

const navigation = [
  { name: "Dashboard", href: "/hrms", icon: LayoutDashboard },
  { name: "Employees", href: "/hrms/employees", icon: Users },
  { name: "Attendance", href: "/hrms/attendance", icon: Clock },
  { name: "Leave Requests", href: "/hrms/leaves", icon: CalendarDays },
  { name: "Settings", href: "/hrms/settings", icon: Settings },
];

export default function HRMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("HR Manager");
  const [companyName, setCompanyName] = useState("MKX Technologies");
  const [userEmail, setUserEmail] = useState("");
  const [trialDays, setTrialDays] = useState<number | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data && data.user) {
            if (data.user.type === "customer") {
              setUserName(data.user.name || "HR Manager");
              setCompanyName(data.user.company || "MKX Technologies");
              setUserEmail(data.user.email || "");
              if (typeof data.user.trialDaysLeft === "number") {
                setTrialDays(data.user.trialDaysLeft);
              }
            }
          }
        }
      } catch (err) {
        console.error("Failed to load user profile in layout:", err);
      }
    }
    loadProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout failed:", err);
    }
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background">
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
            href="/hrms"
            className="group flex items-center gap-3 transition-all duration-300"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded bg-primary shadow-lg shadow-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
              <span className="text-[13px] font-black tracking-tighter text-primary-foreground">
                {companyName
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .substring(0, 3)
                  .toUpperCase() || "MKX"}
              </span>
            </div>
            <div className="flex flex-col gap-1 leading-none">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">{companyName}</span>
              </div>
              <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-[0.2em] mt-0.5">HRMS Suite</span>
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
              (item.href !== "/hrms" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
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
            Back to Main Site
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
          {trialDays !== null && (
            <div className={cn(
              "flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold select-none border tracking-tight shadow-sm transition-all duration-300",
              trialDays <= 3 
                ? "bg-red-500/10 text-red-500 border-red-500/20 animate-pulse" 
                : trialDays <= 7
                  ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                  : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
            )}>
              <span className="relative flex h-2 w-2">
                <span className={cn(
                  "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                  trialDays <= 3 
                    ? "bg-red-400" 
                    : trialDays <= 7 
                      ? "bg-amber-400" 
                      : "bg-emerald-400"
                )}></span>
                <span className={cn(
                  "relative inline-flex rounded-full h-2 w-2",
                  trialDays <= 3 
                    ? "bg-red-500" 
                    : trialDays <= 7 
                      ? "bg-amber-500" 
                      : "bg-emerald-500"
                )}></span>
              </span>
              <span>{trialDays} {trialDays === 1 ? "Day" : "Days"} Left on Trial</span>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3.5 h-auto py-1.5 px-3"
              >
                <div className="h-8.5 w-8.5 rounded-full bg-primary/20 flex items-center justify-center border border-primary/10">
                  <span className="text-[11px] font-black text-primary tracking-tight">
                    {userName
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase() || "MT"}
                  </span>
                </div>
                <div className="hidden sm:flex flex-col items-start leading-none text-left">
                  <span className="text-sm font-bold text-foreground tracking-tight">{userName}</span>
                  <span className="text-[10px] font-medium text-muted-foreground mt-1">{userEmail}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/hrms/settings" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
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
