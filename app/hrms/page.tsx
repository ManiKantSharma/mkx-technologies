"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Clock, CalendarDays, TrendingUp, Sparkles, UserPlus } from "lucide-react";
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

interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  attendanceRate: number;
  onLeave: number;
  pendingLeaves: number;
  productivity: string;
  recentHires: Employee[];
  upcomingBirthdays: BirthdayInfo[];
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
              {stats?.pendingLeaves ?? 0} pending requests
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
    </div>
  );
}
