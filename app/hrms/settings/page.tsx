"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Loader2, Save, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useApiClient } from "@/lib/api-client";

export default function HRMSSettingsPage() {
  const api = useApiClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [companyName, setCompanyName] = useState("");
  const [workWeekStart, setWorkWeekStart] = useState("Monday");
  const [workWeekEnd, setWorkWeekEnd] = useState("Friday");
  const [standardCheckIn, setStandardCheckIn] = useState("09:00");
  const [standardCheckOut, setStandardCheckOut] = useState("18:00");
  const [allowSelfAttendance, setAllowSelfAttendance] = useState(true);
  const [defaultLeaveAllowance, setDefaultLeaveAllowance] = useState(21);

  const fetchSettings = async () => {
    setIsLoading(true);
    const { data } = await api.get<{
      companyName: string;
      workWeekStart: string;
      workWeekEnd: string;
      standardCheckIn: string;
      standardCheckOut: string;
      allowSelfAttendance: boolean;
      defaultLeaveAllowance: number;
    }>("/api/hrms/settings", { silent: true });

    if (data) {
      setCompanyName(data.companyName || "");
      setWorkWeekStart(data.workWeekStart || "Monday");
      setWorkWeekEnd(data.workWeekEnd || "Friday");
      setStandardCheckIn(data.standardCheckIn || "09:00");
      setStandardCheckOut(data.standardCheckOut || "18:00");
      setAllowSelfAttendance(data.allowSelfAttendance !== undefined ? data.allowSelfAttendance : true);
      setDefaultLeaveAllowance(data.defaultLeaveAllowance || 21);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const { error } = await api.post(
      "/api/hrms/settings",
      {
        companyName,
        workWeekStart,
        workWeekEnd,
        standardCheckIn,
        standardCheckOut,
        allowSelfAttendance,
        defaultLeaveAllowance,
      },
      { successMessage: "HR Configuration saved successfully!" }
    );

    setIsSaving(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">HR Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure your company policies, work hours, and HR preferences dynamically.
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-60 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <Card className="border-border/40 bg-card/95 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" /> General Organization Configuration
              </CardTitle>
              <CardDescription>
                Customize company identity details and key attendance policies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <Label htmlFor="companyName" className="font-semibold text-foreground">
                    HR Profile Company Name *
                  </Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="MKX Technologies Inc."
                    required
                  />
                </div>

                {/* Default Leave Allowance */}
                <div className="space-y-2">
                  <Label htmlFor="leaveAllowance" className="font-semibold text-foreground">
                    Default Annual Leave Allocation (Days)
                  </Label>
                  <Input
                    id="leaveAllowance"
                    type="number"
                    value={defaultLeaveAllowance}
                    onChange={(e) => setDefaultLeaveAllowance(Number(e.target.value))}
                    min={0}
                    max={365}
                    required
                  />
                </div>

                {/* Self Attendance Toggle */}
                <div className="space-y-2">
                  <Label className="font-semibold text-foreground">Employee Self-Checkin Privilege</Label>
                  <Select
                    value={allowSelfAttendance ? "true" : "false"}
                    onValueChange={(val) => setAllowSelfAttendance(val === "true")}
                  >
                    <SelectTrigger className="w-full bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Enable (Staff can self-log attendance)</SelectItem>
                      <SelectItem value="false">Disable (Admin-log only)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card/95 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" /> Workweek & Core Timings
              </CardTitle>
              <CardDescription>
                Define operational standard schedules and standard business operating hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Workweek Start */}
                <div className="space-y-2">
                  <Label className="font-semibold text-foreground">Workweek Start Day</Label>
                  <Select value={workWeekStart} onValueChange={setWorkWeekStart}>
                    <SelectTrigger className="w-full bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monday">Monday</SelectItem>
                      <SelectItem value="Sunday">Sunday</SelectItem>
                      <SelectItem value="Saturday">Saturday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Workweek End */}
                <div className="space-y-2">
                  <Label className="font-semibold text-foreground">Workweek End Day</Label>
                  <Select value={workWeekEnd} onValueChange={setWorkWeekEnd}>
                    <SelectTrigger className="w-full bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Friday">Friday</SelectItem>
                      <SelectItem value="Saturday">Saturday</SelectItem>
                      <SelectItem value="Thursday">Thursday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Standard Check In */}
                <div className="space-y-2">
                  <Label htmlFor="standardCheckIn" className="font-semibold text-foreground">
                    Standard Check-in Time
                  </Label>
                  <Input
                    id="standardCheckIn"
                    type="time"
                    value={standardCheckIn}
                    onChange={(e) => setStandardCheckIn(e.target.value)}
                    required
                  />
                </div>

                {/* Standard Check Out */}
                <div className="space-y-2">
                  <Label htmlFor="standardCheckOut" className="font-semibold text-foreground">
                    Standard Check-out Time
                  </Label>
                  <Input
                    id="standardCheckOut"
                    type="time"
                    value={standardCheckOut}
                    onChange={(e) => setStandardCheckOut(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Trigger */}
          <div className="flex items-center justify-end pt-4 border-t border-border/40">
            <Button type="submit" disabled={isSaving} className="shadow-lg shadow-primary/20 flex items-center gap-2 px-3">
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving Configuration...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" /> Save HR Policies
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
