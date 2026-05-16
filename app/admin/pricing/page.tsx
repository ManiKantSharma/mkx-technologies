"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, IndianRupee, Star } from "lucide-react";
import type { Product, PricingPlan } from "@/lib/db";

type PlanWithProduct = PricingPlan & { productName: string };

export default function PricingPage() {
  const [plans, setPlans] = useState<PlanWithProduct[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PlanWithProduct | null>(null);
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
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [plansRes, productsRes] = await Promise.all([
        fetch("/api/admin/pricing"),
        fetch("/api/admin/products"),
      ]);
      if (plansRes.ok) setPlans(await plansRes.json());
      if (productsRes.ok) setProducts(await productsRes.json());
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
      productId: plan.productId,
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      features: formData.features.split("\n").filter((f) => f.trim()),
    };
    try {
      if (editingPlan) {
        const res = await fetch(`/api/admin/pricing/${editingPlan.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          fetchData();
          setDialogOpen(false);
        }
      } else {
        const res = await fetch("/api/admin/pricing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          fetchData();
          setDialogOpen(false);
        }
      }
    } catch (error) {
      console.error("Failed to save plan:", error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this pricing plan?")) return;
    try {
      const res = await fetch(`/api/admin/pricing/${id}`, { method: "DELETE" });
      if (res.ok) fetchData();
    } catch (error) {
      console.error("Failed to delete plan:", error);
    }
  }

  const groupedPlans = plans.reduce(
    (acc, plan) => {
      if (!acc[plan.productId]) acc[plan.productId] = [];
      acc[plan.productId].push(plan);
      return acc;
    },
    {} as Record<string, PlanWithProduct[]>,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pricing Plans</h1>
          <p className="text-muted-foreground">
            Manage pricing tiers for your products
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingPlan ? "Edit Plan" : "Add New Plan"}
                </DialogTitle>
                <DialogDescription>
                  {editingPlan
                    ? "Update the plan details"
                    : "Create a new pricing plan"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {!editingPlan && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="id">Plan ID</Label>
                      <Input
                        id="id"
                        placeholder="e.g., hrms-starter"
                        value={formData.id}
                        onChange={(e) =>
                          setFormData({ ...formData, id: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="productId">Product</Label>
                      <Select
                        value={formData.productId}
                        onValueChange={(value) =>
                          setFormData({ ...formData, productId: value })
                        }
                      >
                        <SelectTrigger>
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
                  </>
                )}
                <div className="space-y-2">
                  <Label htmlFor="name">Plan Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Starter, Professional"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="29.00"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interval">Interval</Label>
                    <Select
                      value={formData.interval}
                      onValueChange={(value) =>
                        setFormData({ ...formData, interval: value })
                      }
                    >
                      <SelectTrigger>
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
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    value={formData.features}
                    onChange={(e) =>
                      setFormData({ ...formData, features: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isPopular">Mark as Popular</Label>
                  <Switch
                    id="isPopular"
                    checked={formData.isPopular}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isPopular: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isActive">Active</Label>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isActive: checked })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPlan ? "Save Changes" : "Create Plan"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <Card>
          <CardContent className="py-8">
            <div className="h-32 animate-pulse rounded bg-muted" />
          </CardContent>
        </Card>
      ) : plans.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <IndianRupee className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No pricing plans yet</h3>
            <p className="text-muted-foreground">
              Create pricing plans for your products
            </p>
            <Button className="mt-4" onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Plan
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedPlans).map(([productId, productPlans]) => (
            <Card key={productId}>
              <CardHeader>
                <CardTitle>
                  {productPlans[0]?.productName || productId}
                </CardTitle>
                <CardDescription>
                  {productPlans.length} pricing{" "}
                  {productPlans.length === 1 ? "plan" : "plans"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Features</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productPlans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {plan.name}
                            {plan.isPopular && (
                              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          ₹{Number(plan.price).toFixed(2)}/{plan.interval}
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground">
                            {plan.features.length} features
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={plan.isActive ? "default" : "secondary"}
                          >
                            {plan.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(plan)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDelete(plan.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
