"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, CreditCard } from "lucide-react"
import { useApiClient } from "@/lib/api-client"
import type { SubscriptionWithDetails, User, Product, PricingPlan } from "@/lib/db"
import { DataTable, Column } from "@/components/admin/data-table"

export default function SubscriptionsPage() {
  const api = useApiClient()
  const [subscriptions, setSubscriptions] = useState<SubscriptionWithDetails[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [plans, setPlans] = useState<(PricingPlan & { productName: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    limit: 10,
    total: 0
  })
  const [formData, setFormData] = useState({
    id: "",
    userId: "",
    productId: "",
    pricingPlanId: "",
    status: "ACTIVE",
  })

  useEffect(() => {
    fetchData(pagination.page)
  }, [pagination.page])

  async function fetchData(page: number = 1) {
    try {
      const [subs, usersRes, productsRes, plansRes] = await Promise.all([
        api.get<SubscriptionWithDetails[]>(`/api/admin/subscriptions?page=${page}&limit=${pagination.limit}`, { silent: true }),
        api.get<User[]>("/api/admin/users", { silent: true }),
        api.get<Product[]>("/api/admin/products", { silent: true }),
        api.get<PricingPlan[]>("/api/admin/pricing", { silent: true }),
      ])

      if (subs.data) {
        setSubscriptions(subs.data)
        if (subs.meta?.pagination) {
          setPagination(prev => ({
            ...prev,
            ...subs.meta.pagination
          }))
        }
      }
      if (usersRes.data) setUsers(usersRes.data)
      if (productsRes.data) setProducts(productsRes.data)
      if (plansRes.data) setPlans(plansRes.data as (PricingPlan & { productName: string })[])

    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  function openCreateDialog() {
    setFormData({
      id: crypto.randomUUID(),
      userId: "",
      productId: "",
      pricingPlanId: "",
      status: "ACTIVE",
    })
    setDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { data } = await api.post("/api/admin/subscriptions", {
      userId: formData.userId,
      productId: formData.productId,
      pricingPlanId: formData.pricingPlanId,
      status: formData.status,
    }, { successMessage: "Subscription created successfully" })

    if (data) {
      fetchData()
      setDialogOpen(false)
    }
    setSaving(false)
  }

  async function updateStatus(id: string, status: string) {
    const { data } = await api.put(`/api/admin/subscriptions/${id}`, {
      status,
      endDate: status === "CANCELLED" ? new Date().toISOString() : null,
    }, { successMessage: "Status updated" })

    if (data) {
      fetchData()
    }
  }

  const filteredPlans = plans.filter((plan) => plan.productId === formData.productId)

  const statusColors: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
    ACTIVE: "default",
    CANCELLED: "destructive",
    PAUSED: "secondary",
    EXPIRED: "outline",
  }

  const columns: Column<SubscriptionWithDetails>[] = [
    {
      header: "User",
      cell: (sub) => (
        <div>
          <div className="font-medium group-hover:text-accent transition-colors">{sub.userName || "No name"}</div>
          <div className="text-xs text-muted-foreground">{sub.userEmail}</div>
        </div>
      ),
    },
    {
      header: "Product / Plan",
      cell: (sub) => (
        <div>
          <div className="text-sm font-medium">{sub.productName}</div>
          <div className="text-xs text-muted-foreground">{sub.planName}</div>
        </div>
      ),
    },
    {
      header: "Price",
      cell: (sub) => (
        <span className="font-mono text-sm font-semibold text-accent">
          ${Number(sub.planPrice).toFixed(2)}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (sub) => (
        <Badge variant={statusColors[sub.status]} className="font-mono">
          {sub.status}
        </Badge>
      ),
    },
    {
      header: "Started",
      cell: (sub) => (
        <span className="text-muted-foreground font-mono text-xs">
          {new Date(sub.startDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (sub) => (
        <div className="flex justify-end">
          <Select
            value={sub.status}
            onValueChange={(value) => updateStatus(sub.id, value)}
          >
            <SelectTrigger className="w-[110px] h-8 text-xs bg-background/50 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="PAUSED">Paused</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Subscriptions</h1>
          <p className="text-muted-foreground">Manage user subscriptions and billing</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="shadow-lg shadow-accent/20">
              <Plus className="mr-2 h-4 w-4" />
              Add Subscription
            </Button>
          </DialogTrigger>
          <DialogContent className="border-border/40 bg-card/95 backdrop-blur-md">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Create Subscription</DialogTitle>
                <DialogDescription>Manually create a subscription for a user</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="userId">User</Label>
                  <Select
                    value={formData.userId}
                    onValueChange={(value) => setFormData({ ...formData, userId: value })}
                  >
                    <SelectTrigger className="w-full bg-background/50">
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name || user.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productId">Product</Label>
                  <Select
                    value={formData.productId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, productId: value, pricingPlanId: "" })
                    }
                  >
                    <SelectTrigger className="w-full bg-background/50">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pricingPlanId">Pricing Plan</Label>
                  <Select
                    value={formData.pricingPlanId}
                    onValueChange={(value) => setFormData({ ...formData, pricingPlanId: value })}
                    disabled={!formData.productId}
                  >
                    <SelectTrigger className="w-full bg-background/50">
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredPlans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.name} - ${Number(plan.price).toFixed(2)}/{plan.interval}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="w-full bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="PAUSED">Paused</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Creating..." : "Create Subscription"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={columns}
        data={subscriptions}
        loading={loading}
        pagination={pagination}
        onPageChange={(page) => setPagination(p => ({ ...p, page }))}
        searchPlaceholder="Search by user or product..."
        emptyMessage="No subscriptions found"
        emptyIcon={CreditCard}
      />
    </div>
  )
}
