import { getEmployeeModel, getAttendanceModel, getLeaveRequestModel } from "@/lib/app-models";
import { ApiResponse, getTenantIdFromToken } from '@/lib/api-utils';
import { NextRequest } from 'next/server';

/**
 * Handles POST requests to securely seed high-quality mockup data for the active organization.
 * Clears existing HRMS records for the tenant and inserts structured dummy records.
 *
 * @param {NextRequest} request - The incoming Next.js API request.
 * @returns {Promise<Response>} API response detailing success status and the number of employees created.
 */
export async function POST(request: NextRequest) {
  try {
    const orgId = getTenantIdFromToken(request);
    if (!orgId) return ApiResponse.error("Unauthorized: Please log in to seed your organization data", 401);

    const Employee = await getEmployeeModel(orgId);
    const Attendance = await getAttendanceModel(orgId);
    const LeaveRequest = await getLeaveRequestModel(orgId);

    await Promise.all([
      Employee.deleteMany({ organizationId: orgId }),
      Attendance.deleteMany({ organizationId: orgId }),
      LeaveRequest.deleteMany({ organizationId: orgId })
    ]);

    const birthday1 = new Date();
    birthday1.setFullYear(1992);
    birthday1.setDate(birthday1.getDate() + 1);

    const birthday3 = new Date();
    birthday3.setFullYear(1990);
    birthday3.setDate(birthday3.getDate() + 5);

    const employeeData = [
      { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", department: "Engineering", role: "Principal Engineer", joiningDate: new Date("2024-03-15"), birthday: birthday1, managerName: "Alice Vance", isActive: true }
    ];

    const employees = await Employee.create(
      employeeData.map(emp => ({ ...emp, organizationId: orgId }))
    );

    const today = new Date();

    const attendanceData = [
      { employeeId: employees[0]._id, date: today, status: 'PRESENT', checkIn: new Date(today.setHours(9, 0)) }
    ];

    await Attendance.create(
      attendanceData.map(log => ({ ...log, organizationId: orgId }))
    );

    const leaveData = [
      {
        employeeId: employees[0]._id,
        startDate: new Date(Date.now() + 86400000 * 5),
        endDate: new Date(Date.now() + 86400000 * 10),
        type: 'VACATION',
        status: 'PENDING',
        reason: 'Annual family summer vacation',
      }
    ];

    await LeaveRequest.create(
      leaveData.map(leave => ({ ...leave, organizationId: orgId }))
    );

    return ApiResponse.success(
      { employeesCreated: employees.length },
      "SaaS organization database seeded successfully with rich mockup data!",
      201
    );
  } catch (error: any) {
    console.error("Seeding API Error:", error.message);
    return ApiResponse.error("Failed to seed SaaS database", 500);
  }
}
