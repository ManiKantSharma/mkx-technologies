"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Settings, Database, Bell, Shield, Globe } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your admin panel and application settings</p>
      </div>

      <div className="grid gap-6">
        {}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>Configure basic application settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" defaultValue="MKX Technologies" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input id="supportEmail" type="email" defaultValue="support@mkxtechnologies.com" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable access to the application
                </p>
              </div>
              <Switch />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database
            </CardTitle>
            <CardDescription>Database connection and status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <div>
                  <p className="font-medium">MongoDB Atlas</p>
                  <p className="text-sm text-muted-foreground">Connected and operational</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Database Tables</Label>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-secondary p-2">Product</div>
                <div className="rounded-lg bg-secondary p-2">PricingPlan</div>
                <div className="rounded-lg bg-secondary p-2">User</div>
                <div className="rounded-lg bg-secondary p-2">Subscription</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure email and push notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New User Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when a new user signs up
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Subscription Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Notify when subscriptions are created or cancelled
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Receive weekly summary of business metrics
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Security and access control settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Require 2FA for admin access
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Session Timeout</Label>
                <p className="text-sm text-muted-foreground">
                  Auto-logout after inactivity
                </p>
              </div>
              <Input type="number" defaultValue="30" className="w-20" />
              <span className="text-sm text-muted-foreground">minutes</span>
            </div>
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              API Configuration
            </CardTitle>
            <CardDescription>Manage API keys and endpoints</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>API Base URL</Label>
              <Input defaultValue="/api/admin" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Available Endpoints</Label>
              <div className="rounded-lg border border-border p-4 font-mono text-sm">
                <p className="text-muted-foreground">GET /api/admin/products</p>
                <p className="text-muted-foreground">GET /api/admin/pricing</p>
                <p className="text-muted-foreground">GET /api/admin/users</p>
                <p className="text-muted-foreground">GET /api/admin/subscriptions</p>
                <p className="text-muted-foreground">GET /api/admin/stats</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
