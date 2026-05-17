import { NextRequest } from "next/server";
import { getEmployeeModel, getAttendanceModel, getLeaveRequestModel, getActivityLogModel } from "@/lib/app-models";
import { ApiResponse, getTenantIdFromToken } from "@/lib/api-utils";

/**
 * Handles GET requests to calculate and return aggregate HRMS statistics for the active organization.
 * Computes headcount, real-time daily attendance rates, leave statuses, recent hires, and birthdays within 30 days.
 *
 * @param {NextRequest} request - The incoming Next.js API request.
 * @returns {Promise<Response>} API response containing real-time dashboard analytics.
 */
export async function GET(request: NextRequest) {
  try {
    const orgId = getTenantIdFromToken(request);
    if (!orgId) return ApiResponse.error("Unauthorized", 401);

    const Employee = await getEmployeeModel(orgId);
    const Attendance = await getAttendanceModel(orgId);
    const LeaveRequest = await getLeaveRequestModel(orgId);
    const ActivityLog = await getActivityLogModel(orgId);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const totalEmployees = await Employee.countDocuments({ organizationId: orgId });

    const recentHires = await Employee.find({ organizationId: orgId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("firstName lastName email department createdAt");

    const presentToday = await Attendance.countDocuments({
      organizationId: orgId,
      date: { $gte: startOfToday, $lte: endOfToday },
      status: { $in: ["PRESENT", "LATE"] }
    });

    const onLeave = await LeaveRequest.countDocuments({
      organizationId: orgId,
      status: "APPROVED"
    });

    const pendingLeaves = await LeaveRequest.countDocuments({
      organizationId: orgId,
      status: "PENDING"
    });

    const employeesWithBirthdays = await Employee.find({ 
      organizationId: orgId,
      birthday: { $ne: null } 
    }).select("firstName lastName birthday role");

    const upcomingBirthdays = employeesWithBirthdays
      .map(emp => {
        const bday = new Date(emp.birthday!);
        const thisYearBday = new Date(startOfToday.getFullYear(), bday.getMonth(), bday.getDate());
        
        if (thisYearBday < startOfToday) {
          thisYearBday.setFullYear(startOfToday.getFullYear() + 1);
        }

        const diffTime = thisYearBday.getTime() - startOfToday.getTime();
        const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
          id: emp._id.toString(),
          name: `${emp.firstName} ${emp.lastName}`,
          role: emp.role || "N/A",
          daysRemaining,
          formattedDate: bday.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        };
      })
      .filter(emp => emp.daysRemaining >= 0 && emp.daysRemaining <= 30)
      .sort((a, b) => a.daysRemaining - b.daysRemaining);

    const attendanceRate = totalEmployees > 0 ? Math.round((presentToday / totalEmployees) * 100) : 0;

    const recentActivities = await ActivityLog.find({ organizationId: orgId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("userEmail action details ipAddress createdAt");

    return ApiResponse.success({
      totalEmployees,
      presentToday,
      attendanceRate,
      onLeave,
      pendingLeaves,
      recentHires,
      upcomingBirthdays,
      recentActivities,
      productivity: "+12.5%", 
    });
  } catch (error: any) {
    console.error("Failed to fetch HRMS dashboard stats:", error.message);
    return ApiResponse.error("Failed to load dashboard metrics", 500);
  }
}
