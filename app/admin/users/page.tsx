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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Users } from "lucide-react"
import { useApiClient } from "@/lib/api-client"
import type { User } from "@/lib/db"
import { DataTable, Column } from "@/components/admin/data-table"

type UserWithSubscriptions = User & { activeSubscriptions: number }

export default function UsersPage() {
  const api = useApiClient()
  const [users, setUsers] = useState<UserWithSubscriptions[]>([])
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
    email: "",
    name: "",
    company: "",
    companySize: "",
  })

  useEffect(() => {
    fetchUsers(pagination.page)
  }, [pagination.page])

  async function fetchUsers(page: number = 1) {
    try {
      const { data, meta } = await api.get<UserWithSubscriptions[]>(`/api/admin/users?page=${page}&limit=${pagination.limit}`, { silent: true })
      if (data) {
        setUsers(data)
        if (meta?.pagination) {
          setPagination(prev => ({
            ...prev,
            ...meta.pagination
          }))
        }
      }
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setLoading(false)
    }
  }

  function openCreateDialog() {
    setFormData({
      id: crypto.randomUUID(),
      email: "",
      name: "",
      company: "",
      companySize: "",
    })
    setDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { data } = await api.post("/api/admin/users", formData, { successMessage: "User created successfully" })

    if (data) {
      fetchUsers()
      setDialogOpen(false)
    }
    setSaving(false)
  }

  const columns: Column<UserWithSubscriptions>[] = [
    {
      header: "User",
      cell: (user) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent border border-border/50 group-hover:border-accent/50 transition-colors">
            <span className="text-sm font-medium text-accent-foreground">
              {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-medium group-hover:text-accent transition-colors">{user.name || "No name"}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Company",
      accessorKey: "company",
    },
    {
      header: "Size",
      accessorKey: "companySize",
    },
    {
      header: "Subscriptions",
      cell: (user) => (
        <Badge variant={Number(user.activeSubscriptions) > 0 ? "default" : "secondary"} className="font-mono">
          {user.activeSubscriptions} active
        </Badge>
      ),
    },
    {
      header: "Joined",
      cell: (user) => (
        <span className="text-muted-foreground font-mono text-xs">
          {new Date(user.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Users</h1>
          <p className="text-muted-foreground">Manage registered users and their subscriptions</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="shadow-lg shadow-accent/20">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="border-border/40 bg-card/95 backdrop-blur-md">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new user account manually</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Acme Inc."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) => setFormData({ ...formData, companySize: value })}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Creating..." : "Create User"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        pagination={pagination}
        onPageChange={(page) => setPagination(p => ({ ...p, page }))}
        searchPlaceholder="Search users by name or email..."
        emptyMessage="No users found"
        emptyIcon={Users}
      />
    </div>
  )
}
