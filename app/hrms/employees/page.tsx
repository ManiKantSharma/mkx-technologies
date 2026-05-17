"use client";

import { Column, DataTable } from "@/components/admin/data-table";
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
import { useApiClient } from "@/lib/api-client";
import { Edit2, Loader2, Plus, Trash2, Users } from "lucide-react";
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

  const api = useApiClient();

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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button onClick={handleOpenAddDialog} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Employee
          </Button>
          <DialogContent className="sm:max-w-[480px]">
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <DialogHeader>
                <DialogTitle>{editId ? "Edit Employee Details" : "Add New Employee"}</DialogTitle>
                <DialogDescription>
                  Enter the personal and occupational details of the staff member.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-2 max-h-[60vh] overflow-y-auto px-1">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="firstName" className="text-right">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jane"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lastName" className="text-right">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Smith"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane.smith@example.com"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">
                    Department *
                  </Label>
                  <Input
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Engineering"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role / Title
                  </Label>
                  <Input
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Principal Engineer"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="managerName" className="text-right">
                    Manager
                  </Label>
                  <Input
                    id="managerName"
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                    placeholder="Alice Cooper"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="joiningDate" className="text-right">
                    Joining Date
                  </Label>
                  <Input
                    id="joiningDate"
                    type="date"
                    value={joiningDate}
                    onChange={(e) => setJoiningDate(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="birthday" className="text-right">
                    Birthday
                  </Label>
                  <Input
                    id="birthday"
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>

              <DialogFooter className="pt-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Employee"
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
