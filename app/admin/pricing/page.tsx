"use client";

import { useApiClient } from "@/lib/api-client";
import { Column, DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { PricingPlan, Product } from "@/lib/db";
import { IndianRupee, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type PlanWithProduct = PricingPlan & { productName: string };

export default function PricingPage() {
  const api = useApiClient();
  const [plans, setPlans] = useState<PlanWithProduct[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PlanWithProduct | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    limit: 10,
    total: 0
  });
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    interval: "month",
    features: "",
    isPopular: false,
    isActive: true,
    productId: "",
  });

  useEffect(() => {
    fetchData(pagination.page);
  }, [pagination.page]);

  async function fetchData(page: number = 1) {
    try {
      const [plansRes, productsRes] = await Promise.all([
        api.get<PlanWithProduct[]>(`/api/admin/pricing?page=${page}&limit=${pagination.limit}`, { silent: true }),
        api.get<Product[]>("/api/admin/products", { silent: true }),
      ]);
      if (plansRes.data) {
        setPlans(plansRes.data);
        if (plansRes.meta?.pagination) {
          setPagination(prev => ({
            ...prev,
            ...plansRes.meta.pagination
          }));
        }
      }
      if (productsRes.data) setProducts(productsRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }

  function openCreateDialog() {
    setEditingPlan(null);
    setFormData({
      id: "",
      name: "",
      price: "",
      interval: "month",
      features: "",
      isPopular: false,
      isActive: true,
      productId: products[0]?.id || "",
    });
    setDialogOpen(true);
  }

  function openEditDialog(plan: PlanWithProduct) {
    setEditingPlan(plan);
    setFormData({
      id: plan.id,
      name: plan.name,
      price: String(plan.price),
      interval: plan.interval,
      features: plan.features.join("\n"),
      isPopular: plan.isPopular,
      isActive: plan.isActive,
      productId: plan.productId as string,
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      features: formData.features.split("\n").filter((f) => f.trim()),
    };

    const url = editingPlan ? `/api/admin/pricing/${editingPlan.id}` : "/api/admin/pricing";
    const method = editingPlan ? "put" : "post";

    const { data } = await api[method](url, payload, {
      successMessage: `Plan ${editingPlan ? "updated" : "created"} successfully`
    });

    if (data) {
      fetchData();
      setDialogOpen(false);
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this pricing plan?")) return;
    const { data } = await api.delete(`/api/admin/pricing/${id}`, { successMessage: "Pricing plan removed" });
    if (data) {
      fetchData();
    }
  }

  const columns: Column<PlanWithProduct>[] = [
    {
      header: "Plan Name",
      cell: (plan) => (
        <div className="flex items-center gap-2">
          <div className="font-medium group-hover:text-accent transition-colors">{plan.name}</div>
          {plan.isPopular && (
            <Badge variant="outline" className="text-[10px] h-4 bg-amber-500/10 text-amber-500 border-amber-500/20 px-1">
              POPULAR
            </Badge>
          )}
        </div>
      ),
    },
    {
      header: "Product",
      accessorKey: "productName",
    },
    {
      header: "Price",
      cell: (plan) => (
        <span className="font-mono text-sm font-semibold text-accent">
          ${Number(plan.price).toFixed(2)}/{plan.interval}
        </span>
      ),
    },
    {
      header: "Features",
      cell: (plan) => (
        <span className="text-xs text-muted-foreground font-mono">
          {plan.features.length} features
        </span>
      ),
    },
    {
      header: "Status",
      cell: (plan) => (
        <Badge variant={plan.isActive ? "default" : "secondary"} className="font-mono">
          {plan.isActive ? "ACTIVE" : "INACTIVE"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (plan) => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent/10 hover:text-accent" onClick={() => openEditDialog(plan)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(plan.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Pricing Plans</h1>
          <p className="text-muted-foreground">Manage pricing tiers for your products</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="shadow-lg shadow-accent/20">
              <Plus className="mr-2 h-4 w-4" />
              Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="border-border/40 bg-card/95 backdrop-blur-md">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{editingPlan ? "Edit Plan" : "Add New Plan"}</DialogTitle>
                <DialogDescription>
                  {editingPlan ? "Update the plan details" : "Create a new pricing plan"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {!editingPlan && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="id">Plan ID</Label>
                      <Input
                        id="id"
                        placeholder="e.g., starter"
                        value={formData.id}
                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        required
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="productId">Product</Label>
                      <Select
                        value={formData.productId}
                        onValueChange={(value) => setFormData({ ...formData, productId: value })}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Product" />
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
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="name">Plan Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Starter, Professional"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="29.00"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interval">Interval</Label>
                    <Select
                      value={formData.interval}
                      onValueChange={(value) => setFormData({ ...formData, interval: value })}
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">Monthly</SelectItem>
                        <SelectItem value="year">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="features">Features (one per line)</Label>
                  <textarea
                    id="features"
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Feature 1&#10;Feature 2"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isPopular">Featured Plan</Label>
                  <Switch
                    id="isPopular"
                    checked={formData.isPopular}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPopular: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isActive">Active Status</Label>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : editingPlan ? "Save Changes" : "Create Plan"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={columns}
        data={plans}
        loading={loading}
        pagination={pagination}
        onPageChange={(page) => setPagination(p => ({ ...p, page }))}
        searchPlaceholder="Search plans by name..."
        emptyMessage="No pricing plans found"
        emptyIcon={IndianRupee}
      />
    </div>
  );
}
