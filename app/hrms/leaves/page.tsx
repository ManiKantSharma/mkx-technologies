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
import { CalendarDays, Edit2, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Standard Employee information model as referenced by Leave objects.
 */
type Employee = {
  id: string;
  firstName: string;
  lastName: string;
};

/**
 * Represents a dynamic leave request in the HR system.
 */
type Leave = {
  id: string;
  employeeId: { _id: string; firstName: string; lastName: string };
  startDate: string;
  endDate: string;
  type: "VACATION" | "SICK" | "PERSONAL";
  status: "PENDING" | "APPROVED" | "REJECTED";
  reason: string;
};

/**
 * LeavesPage component is a dynamic time-off directory.
 * Standardizes requests, status updates, and dynamic search/filtering.
 *
 * @returns {React.ReactElement} The Leaves management dashboard.
 */
export default function LeavesPage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const [employeeId, setEmployeeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState<"VACATION" | "SICK" | "PERSONAL">("VACATION");
  const [status, setStatus] = useState<"PENDING" | "APPROVED" | "REJECTED">("PENDING");
  const [reason, setReason] = useState("");

  const [aiRecommendation, setAiRecommendation] = useState<{ sentiment: string; recommendation: string; priority: string } | null>(null);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);

  const api = useApiClient();

  /**
   * Assessment trigger that parses employee time-off reason sentiment and urgency.
   */
  const handleAiAnalyzeLeave = async () => {
    if (!reason.trim()) return;
    setIsAiAnalyzing(true);
    const { data, error } = await api.post<any>("/api/hrms/leaves/ai-recommend", { reason }, { silent: true });
    setIsAiAnalyzing(false);
    if (!error && data) {
      setAiRecommendation(data);
    }
  };

  /**
   * Fetches the complete list of leaves from the tenant's API database.
   */
  const fetchLeaves = async () => {
    setIsLoading(true);
    const { data, error } = await api.get<Leave[]>("/api/hrms/leaves", { silent: true });
    if (!error && data) {
      setLeaves(data);
    }
    setIsLoading(false);
  };

  /**
   * Fetches all registered employees to populate drop-down option lists.
   */
  const fetchEmployees = async () => {
    const { data } = await api.get<Employee[]>("/api/hrms/employees", { silent: true });
    if (data) {
      setEmployees(data);
    }
  };

  useEffect(() => {
    fetchLeaves();
    fetchEmployees();
  }, []);

  /**
   * Clears state and initializes variables for creating a new leave request.
   */
  const handleOpenAddDialog = () => {
    setEditId(null);
    setEmployeeId(employees[0]?.id || "");
    setStartDate(new Date().toISOString().split("T")[0]);
    setEndDate(new Date().toISOString().split("T")[0]);
    setType("VACATION");
    setStatus("PENDING");
    setReason("");
    setAiRecommendation(null);
    setIsDialogOpen(true);
  };

  /**
   * Populates states with selected leave request details to update their values.
   *
   * @param {Leave} leave - Selected leave item.
   */
  const handleOpenEditDialog = (leave: Leave) => {
    setEditId(leave.id);
    setEmployeeId(leave.employeeId?._id || "");
    setStartDate(leave.startDate ? leave.startDate.split("T")[0] : "");
    setEndDate(leave.endDate ? leave.endDate.split("T")[0] : "");
    setType(leave.type);
    setStatus(leave.status);
    setReason(leave.reason || "");
    setAiRecommendation(null);
    setIsDialogOpen(true);
  };

  /**
   * Triggers API delete operation with validation.
   *
   * @param {string} id - The ID of the leave request to remove.
   */
  const handleDeleteLeave = async (id: string) => {
    if (!confirm("Are you sure you want to delete this leave request?")) return;

    const { error } = await api.delete(`/api/hrms/leaves/${id}`, {
      successMessage: "Leave request removed successfully!",
    });
    if (!error) {
      fetchLeaves();
    }
  };

  /**
   * Direct handler to process addition or updates of leave requests.
   *
   * @param {React.FormEvent} e - Form submit trigger event.
   */
  const handleSaveLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || !startDate || !endDate) return;

    setIsSubmitting(true);
    const payload = {
      employeeId,
      startDate,
      endDate,
      type,
      status,
      reason,
    };

    const { error } = editId
      ? await api.put(`/api/hrms/leaves/${editId}`, payload, {
          successMessage: "Leave request updated successfully!",
        })
      : await api.post("/api/hrms/leaves", payload, {
          successMessage: "Leave request submitted successfully!",
        });

    setIsSubmitting(false);
    if (!error) {
      setIsDialogOpen(false);
      fetchLeaves();
    }
  };

  const filteredLeaves = leaves.filter((leave) => {
    const empName = `${leave.employeeId?.firstName || ""} ${leave.employeeId?.lastName || ""}`.toLowerCase();
    const searchString = `${empName} ${leave.type} ${leave.status} ${leave.reason || ""}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  const statusColors: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
    APPROVED: "default",
    PENDING: "secondary",
    REJECTED: "destructive",
  };

  const columns: Column<Leave>[] = [
    {
      header: "Employee",
      className: "font-semibold text-foreground px-4 py-3",
      cell: (leave) => (
        <span>
          {leave.employeeId?.firstName || "Unknown"} {leave.employeeId?.lastName || "Staff"}
        </span>
      ),
    },
    {
      header: "Leave Type",
      className: "px-4 py-3 font-medium text-muted-foreground",
      cell: (leave) => <span>{leave.type}</span>,
    },
    {
      header: "Reason",
      className: "px-4 py-3 text-muted-foreground max-w-xs truncate",
      cell: (leave) => <span>{leave.reason || "—"}</span>,
    },
    {
      header: "Dates",
      className: "px-4 py-3 text-muted-foreground",
      cell: (leave) => (
        <span>
          {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Status",
      className: "px-4 py-3",
      cell: (leave) => (
        <Badge variant={statusColors[leave.status]} className="font-mono text-[10px] tracking-wide uppercase px-2.5 py-0.5">
          {leave.status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      className: "px-4 py-3 text-right",
      cell: (leave) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={() => handleOpenEditDialog(leave)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => handleDeleteLeave(leave.id)}
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
          <h1 className="text-3xl font-bold tracking-tight">Leave Requests</h1>
          <p className="text-muted-foreground mt-2">
            Manage employee time off, sick leave, and vacations.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button onClick={handleOpenAddDialog} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Request Vacation
          </Button>
          <DialogContent className="sm:max-w-[440px]">
            <form onSubmit={handleSaveLeave} className="space-y-4">
              <DialogHeader>
                <DialogTitle>{editId ? "Update Leave request" : "Submit Leave Request"}</DialogTitle>
                <DialogDescription>
                  File or update a time-off request on behalf of any active personnel.
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
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Leave Type</Label>
                    <Select value={type} onValueChange={(val: any) => setType(val)}>
                      <SelectTrigger className="w-full bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VACATION">Vacation</SelectItem>
                        <SelectItem value="SICK">Sick Leave</SelectItem>
                        <SelectItem value="PERSONAL">Personal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={(val: any) => setStatus(val)}>
                      <SelectTrigger className="w-full bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="APPROVED">Approved</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason / Notes</Label>
                  <Input
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Annual summer family vacation trip"
                  />
                  {reason.trim().length > 3 && (
                    <div className="mt-2 flex justify-between items-center bg-indigo-500/5 border border-indigo-500/10 p-2.5 rounded-lg">
                      <div className="flex-1 mr-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                          AI Co-pilot Assessment
                        </div>
                        {isAiAnalyzing ? (
                          <p className="text-[11px] text-muted-foreground mt-1 animate-pulse">Analyzing reason urgency...</p>
                        ) : aiRecommendation ? (
                          <div className="mt-1 space-y-1">
                            <p className="text-[11px] font-medium text-foreground/90 leading-relaxed">{aiRecommendation.recommendation}</p>
                            <div className="flex gap-2 items-center mt-1.5">
                              <span className="text-[9px] uppercase tracking-wider font-bold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded">
                                Sentiment: {aiRecommendation.sentiment}
                              </span>
                              <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${
                                aiRecommendation.priority === 'HIGH' ? 'bg-red-500/15 text-red-600 dark:text-red-400' :
                                aiRecommendation.priority === 'MEDIUM' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' :
                                'bg-green-500/15 text-green-600 dark:text-green-400'
                              }`}>
                                Priority: {aiRecommendation.priority}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[11px] text-muted-foreground mt-1">Ready to assess sentiment.</p>
                        )}
                      </div>
                      {!aiRecommendation && !isAiAnalyzing && (
                        <Button type="button" onClick={handleAiAnalyzeLeave} variant="outline" size="sm" className="h-7 text-[10px] gap-1 border-indigo-500/30 text-indigo-600 hover:bg-indigo-500/5 transition-all">
                          <Sparkles className="h-3 w-3" /> Assess
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter className="pt-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Leave"
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
            <CalendarDays className="h-5 w-5" /> Leave Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredLeaves}
            loading={isLoading}
            emptyMessage="No leave requests found in the organization."
            emptyIcon={CalendarDays}
            searchPlaceholder="Search leaves by employee name, type, status, reason..."
            onSearchChange={setSearchQuery}
          />
        </CardContent>
      </Card>
    </div>
  );
}
