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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil, Trash2, Package } from "lucide-react"
import { useApiClient } from "@/lib/api-client"
import type { Product } from "@/lib/db"
import { DataTable, Column } from "@/components/admin/data-table"

export default function ProductsPage() {
  const api = useApiClient()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    limit: 10,
    total: 0
  })
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    icon: "",
    isActive: true,
  })

  useEffect(() => {
    fetchProducts(pagination.page)
  }, [pagination.page])

  async function fetchProducts(page: number = 1) {
    try {
      const { data, meta } = await api.get<Product[]>(`/api/admin/products?page=${page}&limit=${pagination.limit}`, { silent: true })
      if (data) {
        setProducts(data)
        if (meta?.pagination) {
          setPagination(prev => ({
            ...prev,
            ...meta.pagination
          }))
        }
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }

  function openCreateDialog() {
    setEditingProduct(null)
    setFormData({ id: "", name: "", description: "", icon: "", isActive: true })
    setDialogOpen(true)
  }

  function openEditDialog(product: Product) {
    setEditingProduct(product)
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description || "",
      icon: product.icon || "",
      isActive: product.isActive,
    })
    setDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const url = editingProduct ? `/api/admin/products/${editingProduct.id}` : "/api/admin/products"
    const method = editingProduct ? "put" : "post"

    const { data } = await api[method](url, formData, {
      successMessage: `Product ${editingProduct ? "updated" : "created"} successfully`
    })

    if (data) {
      fetchProducts()
      setDialogOpen(false)
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return
    const { data } = await api.delete(`/api/admin/products/${id}`, { successMessage: "Product removed" })
    if (data) {
      fetchProducts()
    }
  }

  const columns: Column<Product>[] = [
    {
      header: "Product",
      cell: (product) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <div className="font-medium group-hover:text-accent transition-colors">{product.name}</div>
            <div className="text-xs text-muted-foreground font-mono">{product.id}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Description",
      cell: (product) => (
        <p className="text-sm text-muted-foreground line-clamp-1 max-w-[300px]">
          {product.description || "No description"}
        </p>
      ),
    },
    {
      header: "Status",
      cell: (product) => (
        <Badge variant={product.isActive ? "default" : "secondary"} className="font-mono">
          {product.isActive ? "ACTIVE" : "INACTIVE"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (product) => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent/10 hover:text-accent" onClick={() => openEditDialog(product)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(product.id)}>
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your SaaS product offerings</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="shadow-lg shadow-accent/20">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="border-border/40 bg-card/95 backdrop-blur-md">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                <DialogDescription>
                  {editingProduct
                    ? "Update the product details below"
                    : "Fill in the details to create a new product"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {!editingProduct && (
                  <div className="space-y-2">
                    <Label htmlFor="id">Product ID</Label>
                    <Input
                      id="id"
                      placeholder="e.g., hrms, crms, pos"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Product name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Product description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-background/50"
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
                  {saving ? "Saving..." : editingProduct ? "Save Changes" : "Create Product"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={columns}
        data={products}
        loading={loading}
        pagination={pagination}
        onPageChange={(page) => setPagination(p => ({ ...p, page }))}
        searchPlaceholder="Search products by name or ID..."
        emptyMessage="No products found"
        emptyIcon={Package}
      />
    </div>
  )
}
