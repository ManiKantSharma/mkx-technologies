"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Users, CreditCard, DollarSign, TrendingUp, ArrowUpRight } from "lucide-react"

type Stats = {
  totalProducts: number
  totalUsers: number
  activeSubscriptions: number
  monthlyRevenue: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats")
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 10000)
    return () => clearInterval(interval)
  }, [])

  const statCards = [
    {
      title: "Total Products",
      value: stats?.totalProducts ?? 0,
      description: "Active products in catalog",
      icon: Package,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      description: "Registered users",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Active Subscriptions",
      value: stats?.activeSubscriptions ?? 0,
      description: "Currently active",
      icon: CreditCard,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Monthly Revenue",
      value: `$${(stats?.monthlyRevenue ?? 0).toLocaleString()}`,
      description: "From active subscriptions",
      icon: DollarSign,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your SaaS business metrics</p>
      </div>

      {}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              {loading && !stats ? (
                <div className="h-8 w-20 animate-pulse rounded bg-muted" />
              ) : (
                <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-accent" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common management tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: "Manage Products", href: "/admin/products" },
              { label: "Update Pricing", href: "/admin/pricing" },
              { label: "View Subscriptions", href: "/admin/subscriptions" },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center justify-between rounded-lg border border-border/50 p-3 transition-all hover:bg-accent/10 hover:border-accent/50 group"
              >
                <span className="text-sm font-medium group-hover:text-accent">{action.label}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
              </a>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">System Status & Activity</CardTitle>
            <CardDescription>Latest infrastructure and platform updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-accent/5 transition-colors">
                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <div className="flex-1">
                  <p className="text-sm font-medium">System operational</p>
                  <p className="text-xs text-muted-foreground">Monitoring active metrics in real-time</p>
                </div>
                <span className="text-xs text-muted-foreground font-mono">LIVE</span>
              </div>
              <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-accent/5 transition-colors">
                <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Database Manager</p>
                  <p className="text-xs text-muted-foreground">Mongoose/MongoDB connectivity active</p>
                </div>
                <span className="text-xs text-muted-foreground font-mono">STABLE</span>
              </div>
              <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-accent/5 transition-colors">
                <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Auto-Resilience Engine</p>
                  <p className="text-xs text-muted-foreground">Dynamic mock-fallback standby enabled</p>
                </div>
                <span className="text-xs text-muted-foreground font-mono">READY</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
