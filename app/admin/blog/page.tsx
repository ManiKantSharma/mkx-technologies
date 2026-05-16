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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Plus, Pencil, Trash2, FileText, ExternalLink } from "lucide-react"
import { useApiClient } from "@/lib/api-client"
import type { BlogPost } from "@/lib/db"
import Link from "next/link"
import { DataTable, Column } from "@/components/admin/data-table"

export default function BlogAdminPage() {
  const api = useApiClient()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    limit: 10,
    total: 0
  })
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    slug: "",
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    author: "Admin",
    category: "General",
    content: "",
    published: true,
  })

  useEffect(() => {
    fetchPosts(pagination.page)
  }, [pagination.page])

  async function fetchPosts(page: number = 1) {
    try {
      const { data, meta } = await api.get<BlogPost[]>(`/api/admin/blog?page=${page}&limit=${pagination.limit}`, { silent: true })
      if (data) {
        setPosts(data)
        if (meta?.pagination) {
          setPagination(prev => ({
            ...prev,
            ...meta.pagination
          }))
        }
      }
    } catch (error) {
      console.error("Failed to fetch blog posts:", error)
    } finally {
      setLoading(false)
    }
  }

  function openCreateDialog() {
    setEditingPost(null)
    setFormData({
      id: Math.random().toString(36).substring(2, 11),
      title: "",
      description: "",
      slug: "",
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: "Admin",
      category: "General",
      content: "",
      published: true,
    })
    setDialogOpen(true)
  }

  function openEditDialog(post: BlogPost) {
    setEditingPost(post)
    setFormData({
      id: post.id,
      title: post.title,
      description: post.description,
      slug: post.slug,
      date: post.date,
      author: post.author,
      category: post.category,
      content: post.content,
      published: post.published,
    })
    setDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const url = editingPost ? `/api/admin/blog/${editingPost.id}` : "/api/admin/blog"
    const method = editingPost ? "put" : "post"

    const { data } = await api[method](url, formData, {
      successMessage: editingPost ? "Post updated" : "Post created"
    })

    if (data) {
      fetchPosts()
      setDialogOpen(false)
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this blog post?")) return
    const { data } = await api.delete(`/api/admin/blog/${id}`, { successMessage: "Post removed" })
    if (data) {
      fetchPosts()
    }
  }

  useEffect(() => {
    if (!editingPost && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.title, editingPost])

  const columns: Column<BlogPost>[] = [
    {
      header: "Post Details",
      cell: (post) => (
        <div className="flex flex-col max-w-[400px]">
          <div className="font-medium group-hover:text-accent transition-colors line-clamp-1">{post.title}</div>
          <div className="text-xs text-muted-foreground line-clamp-1">{post.description}</div>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Author",
      accessorKey: "author",
    },
    {
      header: "Status",
      cell: (post) => (
        <Badge variant={post.published ? "default" : "secondary"} className="font-mono text-[10px]">
          {post.published ? "PUBLISHED" : "DRAFT"}
        </Badge>
      ),
    },
    {
      header: "Date",
      cell: (post) => (
        <span className="text-muted-foreground text-xs font-mono">{post.date}</span>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (post) => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent/10 hover:text-accent" asChild>
            <Link href={`/blog/${post.slug}`} target="_blank">
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent/10 hover:text-accent" onClick={() => openEditDialog(post)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(post.id)}>
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your website's blog content</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="shadow-lg shadow-accent/20">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-border/40 bg-card/95 backdrop-blur-md">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{editingPost ? "Edit Post" : "Create New Post"}</DialogTitle>
                <DialogDescription>
                  {editingPost ? "Update your blog post details below" : "Fill in the details to publish a new blog post"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter post title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    placeholder="post-url-slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Business Strategy"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    placeholder="Author name"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    placeholder="e.g., April 1, 2026"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    placeholder="A brief summary"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="content">Content (Markdown)</Label>
                  <Textarea
                    id="content"
                    placeholder="The full content..."
                    className="min-h-[200px] bg-background/50"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Publishing..." : editingPost ? "Save Changes" : "Publish Post"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={columns}
        data={posts}
        loading={loading}
        pagination={pagination}
        onPageChange={(page) => setPagination(p => ({ ...p, page }))}
        searchPlaceholder="Search posts by title..."
        emptyMessage="No blog posts found"
        emptyIcon={FileText}
      />
    </div>
  )
}
