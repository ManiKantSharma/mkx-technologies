"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Plus, CreditCard, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useApiClient } from "@/lib/api-client"
import type { SubscriptionWithDetails, User, Product, PricingPlan } from "@/lib/db"

export default function SubscriptionsPage() {
  const { toast } = useToast()
  const api = useApiClient()
  const [subscriptions, setSubscriptions] = useState<SubscriptionWithDetails[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [plans, setPlans] = useState<(PricingPlan & { productName: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
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

  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      sub.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.productName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const statusColors: Record<string, string> = {
    ACTIVE: "default",
    CANCELLED: "destructive",
    PAUSED: "secondary",
    EXPIRED: "outline",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground">Manage user subscriptions and billing</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Subscription
            </Button>
          </DialogTrigger>
          <DialogContent>
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
                    <SelectTrigger className="w-full">
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
                    <SelectTrigger className="w-full">
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
                    <SelectTrigger className="w-full">
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
                    <SelectTrigger className="w-full">
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

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Subscriptions</CardTitle>
              <CardDescription>{subscriptions.length} total subscriptions</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-32 animate-pulse rounded bg-muted" />
          ) : subscriptions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <CreditCard className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No subscriptions yet</h3>
              <p className="text-muted-foreground">Subscriptions will appear here</p>
              <Button className="mt-4" onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Subscription
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{sub.userName || "No name"}</div>
                          <div className="text-sm text-muted-foreground">{sub.userEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>{sub.productName}</TableCell>
                      <TableCell>{sub.planName}</TableCell>
                      <TableCell>${Number(sub.planPrice).toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={statusColors[sub.status] as "default" | "destructive" | "secondary" | "outline"}>
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(sub.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Select
                          value={sub.status}
                          onValueChange={(value) => updateStatus(sub.id, value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="PAUSED">Paused</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between border-t pt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} subscriptions
                  </div>
                  <Pagination className="mx-0 w-auto">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault()
                            if (pagination.page > 1) setPagination(p => ({ ...p, page: p.page - 1 }))
                          }}
                        />
                      </PaginationItem>
                      {[...Array(pagination.totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            href="#" 
                            isActive={pagination.page === i + 1}
                            onClick={(e) => {
                              e.preventDefault()
                              setPagination(p => ({ ...p, page: i + 1 }))
                            }}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault()
                            if (pagination.page < pagination.totalPages) setPagination(p => ({ ...p, page: p.page + 1 }))
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
