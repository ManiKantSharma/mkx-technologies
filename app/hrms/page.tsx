"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, CalendarDays, TrendingUp, Sparkles, UserPlus, Activity } from "lucide-react";
import { useApiClient } from "@/lib/api-client";
import { Skeleton } from "@/components/ui/skeleton";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role?: string;
  createdAt: string;
}

interface BirthdayInfo {
  id: string;
  name: string;
  role: string;
  daysRemaining: number;
  formattedDate: string;
}

interface ActivityLog {
  id: string;
  userEmail: string;
  action: string;
  details: string;
  ipAddress?: string;
  createdAt: string;
}

interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  attendanceRate: number;
  onLeave: number;
  pendingLeaves: number;
  productivity: string;
  recentHires: Employee[];
  upcomingBirthdays: BirthdayInfo[];
  recentActivities?: ActivityLog[];
}

export default function HRMSDashboard() {
  const api = useApiClient();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await api.get<DashboardStats>("/api/hrms/stats");
      if (response && !response.error && response.data) {
        setStats(response.data);
      }
    } catch (err) {
      console.error("Error loading dashboard metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSeedData = async () => {
    await api.post("/api/hrms/seed", {}, {
      successMessage: "SaaS database populated with rich test records!",
      pendingMessage: "Seeding demo records..."
    });
    fetchStats();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HRMS Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Overview of your organization's human resources.
          </p>
        </div>
        <Button onClick={handleSeedData} variant="outline" className="flex items-center gap-2 border-primary/40 hover:bg-primary/5">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" /> Seed Test Data
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold">{stats?.totalEmployees ?? 0}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Active registered staff
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold">{stats?.presentToday ?? 0}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.attendanceRate ?? 0}% attendance rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold">{stats?.onLeave ?? 0}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Approved leaves ({stats?.pendingLeaves ?? 0} pending)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productivity</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.productivity ?? "+12.5%"}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Compared to last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Hires</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : stats?.recentHires && stats.recentHires.length > 0 ? (
              <div className="space-y-4">
                {stats.recentHires.map((emp) => (
                  <div key={emp.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0 border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <UserPlus className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{emp.firstName} {emp.lastName}</p>
                        <p className="text-xs text-muted-foreground">
                          {emp.role || "Employee"} • {emp.email}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs bg-muted px-2.5 py-0.5 rounded-full font-medium text-muted-foreground">
                      {emp.department || "N/A"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent hires to display.</p>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Birthdays</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : stats?.upcomingBirthdays && stats.upcomingBirthdays.length > 0 ? (
              <div className="space-y-4">
                {stats.upcomingBirthdays.map((bday) => (
                  <div key={bday.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0 border-border/40">
                    <div>
                      <p className="text-sm font-medium">{bday.name}</p>
                      <p className="text-xs text-muted-foreground">{bday.role}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                        {bday.formattedDate}
                      </span>
                      <p className="text-[10px] text-muted-foreground mt-1 font-medium">
                        {bday.daysRemaining === 0 ? "Today! 🎉" : bday.daysRemaining === 1 ? "Tomorrow! 🎂" : `In ${bday.daysRemaining} days`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming birthdays in the next 30 days.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Full-Width Section at the Bottom */}
      <Card className="w-full mt-6">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/40">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" /> System Activity Audit Log
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Real-time multi-tenant execution trace for compliance and monitoring.
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : stats?.recentActivities && stats.recentActivities.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground font-semibold">
                    <th className="pb-3 pr-4">Action</th>
                    <th className="pb-3 pr-4">Details</th>
                    <th className="pb-3 pr-4">Operator</th>
                    <th className="pb-3 pr-4">IP Address</th>
                    <th className="pb-3 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {stats.recentActivities.map((act) => (
                    <tr key={act.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3.5 pr-4 font-semibold text-primary uppercase tracking-wider text-[11px]">
                        {act.action.replace(/_/g, ' ')}
                      </td>
                      <td className="py-3.5 pr-4 text-muted-foreground max-w-[300px] truncate">
                        {act.details}
                      </td>
                      <td className="py-3.5 pr-4 font-medium text-muted-foreground">
                        {act.userEmail}
                      </td>
                      <td className="py-3.5 pr-4 text-muted-foreground font-mono text-[11px]">
                        {act.ipAddress || "127.0.0.1"}
                      </td>
                      <td className="py-3.5 text-right text-muted-foreground font-mono text-[10px]">
                        {new Date(act.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No recent system activity logged yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
