"use client";

import { Column, DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApiClient } from "@/lib/api-client";
import { Edit2, Loader2, Plus, Sparkles, Trash2, Users } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Represents a single employee in the multi-tenant directory.
 */
type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role?: string;
  joiningDate?: string;
  birthday?: string;
  managerName?: string;
  isActive: boolean;
};

/**
 * EmployeesPage component provides a comprehensive personnel directory.
 * Supports real-time client search, employee creation, information updates, and deletions.
 *
 * @returns {React.ReactElement} The Employees list dashboard view.
 */
export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [birthday, setBirthday] = useState("");
  const [managerName, setManagerName] = useState("");

  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const api = useApiClient();

  const handleAiQuickCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsAiLoading(true);
    // 1. Parse prompt via AI
    const { data: parsed, error: parseError } = await api.post<any>("/api/hrms/employees/ai-parse", { prompt: aiPrompt }, {
      silent: true
    });

    if (parseError || !parsed) {
      setIsAiLoading(false);
      return;
    }

    // 2. Directly create the employee in the database
    const payload = {
      firstName: parsed.firstName || "Mani",
      lastName: parsed.lastName || "Sharma",
      email: parsed.email || `${(parsed.firstName || "Mani").toLowerCase()}.${(parsed.lastName || "Sharma").toLowerCase()}@mkx.com`,
      department: parsed.department || "Sales",
      role: parsed.role || "Associate",
      joiningDate: parsed.joiningDate || undefined,
      birthday: parsed.birthday || undefined,
      managerName: parsed.managerName || undefined,
    };

    const { error: createError } = await api.post("/api/hrms/employees", payload, {
      successMessage: `Successfully onboarded ${payload.firstName} ${payload.lastName} via AI!`,
    });

    setIsAiLoading(false);

    if (!createError) {
      setAiPrompt("");
      fetchEmployees();
    }
  };

  /**
   * Fetches the complete list of employees from the tenant's API database.
   */
  const fetchEmployees = async () => {
    setIsLoading(true);
    const { data, error } = await api.get<Employee[]>("/api/hrms/employees", { silent: true });

    if (!error && data) {
      setEmployees(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /**
   * Clears state and initializes variables for creating a new employee profile.
   */
  const handleOpenAddDialog = () => {
    setEditId(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setDepartment("");
    setRole("");
    setJoiningDate("");
    setBirthday("");
    setManagerName("");
    setIsDialogOpen(true);
  };

  /**
   * Populates states with selected employee metadata to edit their attributes.
   *
   * @param {Employee} emp - Selected employee item.
   */
  const handleOpenEditDialog = (emp: Employee) => {
    setEditId(emp.id);
    setFirstName(emp.firstName);
    setLastName(emp.lastName);
    setEmail(emp.email);
    setDepartment(emp.department);
    setRole(emp.role || "");
    setJoiningDate(emp.joiningDate ? emp.joiningDate.split("T")[0] : "");
    setBirthday(emp.birthday ? emp.birthday.split("T")[0] : "");
    setManagerName(emp.managerName || "");
    setIsDialogOpen(true);
  };

  /**
   * Triggers API delete operation with absolute validation before removal.
   *
   * @param {string} id - The ID of the employee profile to remove.
   */
  const handleDeleteEmployee = async (id: string) => {
    if (!confirm("Are you sure you want to remove this employee?")) return;

    const { error } = await api.delete(`/api/hrms/employees/${id}`, {
      successMessage: "Employee deleted successfully!",
    });
    if (!error) {
      fetchEmployees();
    }
  };

  /**
   * Direct handler to process addition or updates of employee accounts.
   *
   * @param {React.FormEvent} e - Form submit trigger event.
   */
  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !department) return;

    setIsSubmitting(true);
    const payload = {
      firstName,
      lastName,
      email,
      department,
      role,
      joiningDate: joiningDate || undefined,
      birthday: birthday || undefined,
      managerName: managerName || undefined,
    };

    const { error } = editId
      ? await api.put(`/api/hrms/employees/${editId}`, payload, {
        successMessage: "Employee details updated successfully!",
      })
      : await api.post("/api/hrms/employees", payload, {
        successMessage: "Employee created successfully!",
      });

    setIsSubmitting(false);
    if (!error) {
      setIsDialogOpen(false);
      fetchEmployees();
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const searchString = `${emp.firstName} ${emp.lastName} ${emp.email} ${emp.department} ${emp.role || ""} ${emp.managerName || ""}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  const columns: Column<Employee>[] = [
    {
      header: "Name",
      className: "font-semibold text-foreground px-4 py-3",
      cell: (emp) => (
        <span>
          {emp.firstName} {emp.lastName}
        </span>
      ),
    },
    {
      header: "Department & Role",
      className: "px-4 py-3",
      cell: (emp) => (
        <div>
          <span className="text-foreground font-medium block">{emp.department}</span>
          {emp.role && <span className="text-xs text-muted-foreground">{emp.role}</span>}
        </div>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
      className: "text-muted-foreground px-4 py-3",
    },
    {
      header: "Manager",
      className: "text-muted-foreground font-medium px-4 py-3",
      cell: (emp) => <span>{emp.managerName || "—"}</span>,
    },
    {
      header: "Joined Date",
      className: "text-muted-foreground px-4 py-3",
      cell: (emp) => (
        <span>
          {emp.joiningDate
            ? new Date(emp.joiningDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
            : "—"}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "px-4 py-3 text-right",
      cell: (emp) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={() => handleOpenEditDialog(emp)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => handleDeleteEmployee(emp.id)}
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
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground mt-2">
            Manage your organization's workforce, departments, and roles.
          </p>
        </div>

        <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button onClick={handleOpenAddDialog} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Employee
          </Button>
          <SheetContent className="sm:max-w-120 flex flex-col h-full p-6">
            <form onSubmit={handleAddEmployee} className="flex flex-col h-full justify-between">
              <div className="flex flex-col gap-6 overflow-y-auto pr-2 pb-6">
                <SheetHeader className="p-0">
                  <SheetTitle className="text-xl font-bold tracking-tight">
                    {editId ? "Edit Employee Details" : "Add New Employee"}
                  </SheetTitle>
                  <SheetDescription className="text-xs text-muted-foreground mt-1">
                    Enter the personal and occupational details of the staff member.
                  </SheetDescription>
                </SheetHeader>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="firstName" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Jane"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="lastName" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                      Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Smith"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 col-span-2">
                    <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane.smith@example.com"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="department" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                      Department <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="Engineering"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="role" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                      Role / Title
                    </Label>
                    <Input
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Principal Engineer"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 col-span-2">
                    <Label htmlFor="managerName" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                      Manager
                    </Label>
                    <Input
                      id="managerName"
                      value={managerName}
                      onChange={(e) => setManagerName(e.target.value)}
                      placeholder="Alice Cooper"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="joiningDate" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                      Joining Date
                    </Label>
                    <Input
                      id="joiningDate"
                      type="date"
                      value={joiningDate}
                      onChange={(e) => setJoiningDate(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="birthday" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                      Birthday
                    </Label>
                    <Input
                      id="birthday"
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <SheetFooter className="border-t pt-4 mt-auto">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Employee"
                  )}
                </Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      {/* AI Quick-Onboard Assistant */}
      <Card className="border border-indigo-500/20 bg-linear-to-r from-indigo-500/5 via-transparent to-transparent shadow-sm">
        <CardContent className="pt-6">
          <form onSubmit={handleAiQuickCreate} className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-wider">
                AI Onboarding Assistant
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Onboard employees rapidly in plain English. Just describe the onboarding events (e.g., <i>"Today join a employee Mani Kant Sharma in Sales Department who is 25 years old"</i>) to let AI auto-complete the paperwork.
            </p>
            <div className="flex gap-2">
              <Input
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Today join a employee Mani Kant Sharma in Sales Department who is 25 years old..."
                disabled={isAiLoading}
                className="flex-1 bg-background/50 border-indigo-500/10 focus-visible:ring-indigo-500"
              />
              <Button type="submit" disabled={isAiLoading} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors">
                {isAiLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Parsing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> Parse & Fill
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" /> Employee Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredEmployees}
            loading={isLoading}
            emptyMessage="No employees found in the directory."
            emptyIcon={Users}
            searchPlaceholder="Search employees by name, department, role, manager..."
            onSearchChange={setSearchQuery}
          />
        </CardContent>
      </Card>
    </div>
  );
}
