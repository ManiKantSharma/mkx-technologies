"use client";

import { Column, DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
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
import { useApiClient } from "@/lib/api-client";
import { Clock, Edit2, Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Standard Employee model as referenced by Attendance records.
 */
type Employee = {
  id: string;
  firstName: string;
  lastName: string;
};

/**
 * Represents a dynamic attendance event in the organization.
 */
type Attendance = {
  id: string;
  employeeId: { _id: string; firstName: string; lastName: string };
  date: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "HALF_DAY";
  checkIn?: string;
  checkOut?: string;
};

/**
 * AttendancePage component standardizes daily check-in / check-out operations.
 * Supports manual entries, state configuration, and full record management.
 *
 * @returns {React.ReactElement} The Attendance register dashboard view.
 */
export default function AttendancePage() {
  const [logs, setLogs] = useState<Attendance[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<"PRESENT" | "ABSENT" | "LATE" | "HALF_DAY">("PRESENT");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");

  const api = useApiClient();

  /**
   * Fetches the complete list of attendance logs from the tenant's database.
   */
  const fetchLogs = async () => {
    setIsLoading(true);
    const { data, error } = await api.get<Attendance[]>("/api/hrms/attendance", { silent: true });
    if (!error && data) {
      setLogs(data);
    }
    setIsLoading(false);
  };

  /**
   * Fetches the registered employees list to populate drop-down option lists.
   */
  const fetchEmployees = async () => {
    const { data } = await api.get<Employee[]>("/api/hrms/employees", { silent: true });
    if (data) {
      setEmployees(data);
    }
  };

  useEffect(() => {
    fetchLogs();
    fetchEmployees();
  }, []);

  /**
   * Clears state and initializes variables for logging a new attendance record.
   */
  const handleOpenAddDialog = () => {
    setEditId(null);
    setEmployeeId(employees[0]?.id || "");
    setDate(new Date().toISOString().split("T")[0]);
    setStatus("PRESENT");
    setCheckInTime("09:00");
    setCheckOutTime("18:00");
    setIsDialogOpen(true);
  };

  /**
   * Populates states with selected attendance record details to update their values.
   *
   * @param {Attendance} log - Selected attendance item.
   */
  const handleOpenEditDialog = (log: Attendance) => {
    setEditId(log.id);
    setEmployeeId(log.employeeId?._id || "");
    setDate(log.date ? log.date.split("T")[0] : "");
    setStatus(log.status);

    if (log.checkIn) {
      const d = new Date(log.checkIn);
      setCheckInTime(d.toTimeString().slice(0, 5));
    } else {
      setCheckInTime("");
    }

    if (log.checkOut) {
      const d = new Date(log.checkOut);
      setCheckOutTime(d.toTimeString().slice(0, 5));
    } else {
      setCheckOutTime("");
    }

    setIsDialogOpen(true);
  };

  /**
   * Triggers API delete operation with validation.
   *
   * @param {string} id - The ID of the attendance log to remove.
   */
  const handleDeleteLog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this attendance log?")) return;

    const { error } = await api.delete(`/api/hrms/attendance/${id}`, {
      successMessage: "Attendance record deleted successfully!",
    });
    if (!error) {
      fetchLogs();
    }
  };

  /**
   * Direct handler to process addition or updates of attendance logs.
   *
   * @param {React.FormEvent} e - Form submit trigger event.
   */
  const handleSaveAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || !date) return;

    setIsSubmitting(true);

    let checkIn: string | undefined;
    if (checkInTime) {
      checkIn = new Date(`${date}T${checkInTime}:00`).toISOString();
    }

    let checkOut: string | undefined;
    if (checkOutTime) {
      checkOut = new Date(`${date}T${checkOutTime}:00`).toISOString();
    }

    const payload = {
      employeeId,
      date: new Date(date).toISOString(),
      status,
      checkIn,
      checkOut,
    };

    const { error } = editId
      ? await api.put(`/api/hrms/attendance/${editId}`, payload, {
          successMessage: "Attendance log updated successfully!",
        })
      : await api.post("/api/hrms/attendance", payload, {
          successMessage: "Attendance logged successfully!",
        });

    setIsSubmitting(false);
    if (!error) {
      setIsDialogOpen(false);
      fetchLogs();
    }
  };

  const filteredLogs = logs.filter((log) => {
    const empName = `${log.employeeId?.firstName || ""} ${log.employeeId?.lastName || ""}`.toLowerCase();
    const searchString = `${empName} ${log.status}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  const statusColors: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
    PRESENT: "default",
    LATE: "secondary",
    HALF_DAY: "outline",
    ABSENT: "destructive",
  };

  const columns: Column<Attendance>[] = [
    {
      header: "Employee",
      className: "font-semibold text-foreground px-4 py-3",
      cell: (log) => (
        <span>
          {log.employeeId?.firstName || "Unknown"} {log.employeeId?.lastName || "Staff"}
        </span>
      ),
    },
    {
      header: "Date",
      className: "px-4 py-3 text-muted-foreground",
      cell: (log) => <span>{new Date(log.date).toLocaleDateString()}</span>,
    },
    {
      header: "Check In",
      className: "px-4 py-3 text-muted-foreground font-mono",
      cell: (log) => (
        <span>
          {log.checkIn
            ? new Date(log.checkIn).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "—"}
        </span>
      ),
    },
    {
      header: "Check Out",
      className: "px-4 py-3 text-muted-foreground font-mono",
      cell: (log) => (
        <span>
          {log.checkOut
            ? new Date(log.checkOut).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "—"}
        </span>
      ),
    },
    {
      header: "Status",
      className: "px-4 py-3",
      cell: (log) => (
        <Badge variant={statusColors[log.status]} className="font-mono text-[10px] tracking-wide uppercase px-2.5 py-0.5">
          {log.status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      className: "px-4 py-3 text-right",
      cell: (log) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={() => handleOpenEditDialog(log)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => handleDeleteLog(log.id)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground mt-2">
            Track daily attendance, check-ins, and working hours.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button onClick={handleOpenAddDialog} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Log Attendance
          </Button>
          <DialogContent className="sm:max-w-[420px]">
            <form onSubmit={handleSaveAttendance} className="space-y-4">
              <DialogHeader>
                <DialogTitle>{editId ? "Update Attendance Log" : "Log Staff Attendance"}</DialogTitle>
                <DialogDescription>
                  Manually register check-in and check-out events for employees.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-2 px-1">
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee *</Label>
                  <Select value={employeeId} onValueChange={setEmployeeId}>
                    <SelectTrigger className="w-full bg-background/50">
                      <SelectValue placeholder="Select staff member" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.firstName} {emp.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={(val: any) => setStatus(val)}>
                      <SelectTrigger className="w-full bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PRESENT">Present</SelectItem>
                        <SelectItem value="LATE">Late Check-in</SelectItem>
                        <SelectItem value="HALF_DAY">Half Day</SelectItem>
                        <SelectItem value="ABSENT">Absent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkInTime">Check-in Time</Label>
                    <Input
                      id="checkInTime"
                      type="time"
                      value={checkInTime}
                      onChange={(e) => setCheckInTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkOutTime">Check-out Time</Label>
                    <Input
                      id="checkOutTime"
                      type="time"
                      value={checkOutTime}
                      onChange={(e) => setCheckOutTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="pt-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Log"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" /> Attendance Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredLogs}
            loading={isLoading}
            emptyMessage="No attendance records logged."
            emptyIcon={Clock}
            searchPlaceholder="Search logs by employee name or status..."
            onSearchChange={setSearchQuery}
          />
        </CardContent>
      </Card>
    </div>
  );
}
