import { getAttendanceModel, getEmployeeModel } from "@/lib/app-models";
import { ApiResponse, getTenantIdFromToken, withActivityLog } from '@/lib/api-utils';
import { NextRequest } from 'next/server';

/**
 * Handles GET requests to retrieve paginated attendance logs for the active organization.
 *
 * @param {NextRequest} request - The incoming Next.js API request.
 * @returns {Promise<Response>} API response containing the array of attendance logs and pagination metadata.
 */
export async function GET(request: NextRequest) {
  try {
    const orgId = getTenantIdFromToken(request);
    if (!orgId) return ApiResponse.error("Unauthorized", 401);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const Attendance = await getAttendanceModel(orgId);

    const [attendanceLogs, total] = await Promise.all([
      Attendance.find({ organizationId: orgId })
        .populate({ path: 'employeeId', select: 'firstName lastName email', model: await getEmployeeModel(orgId) })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit),
      Attendance.countDocuments({ organizationId: orgId })
    ]);

    return ApiResponse.success(attendanceLogs, 'Attendance logs fetched successfully', 200, {
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error("Attendance API Error:", error.message);
    return ApiResponse.error("Failed to fetch attendance logs", 500);
  }
}

/**
 * Handles POST requests to log a new attendance record for an employee.
 * Falls back to auto-linking the first available employee profile if none is explicitly sent.
 *
 * @param {NextRequest} request - The incoming Next.js API request.
 * @returns {Promise<Response>} API response with the created attendance entry.
 */
export const POST = withActivityLog("LOG_ATTENDANCE", async function POST(request: NextRequest) {
  try {
    const orgId = getTenantIdFromToken(request);
    if (!orgId) return ApiResponse.error("Unauthorized", 401);

    const body = await request.json();
    const Employee = await getEmployeeModel(orgId);
    const Attendance = await getAttendanceModel(orgId);

    let employeeId = body.employeeId;
    if (!employeeId) {
      const emp = await Employee.findOne({ organizationId: orgId });
      if (!emp) return ApiResponse.error("Create an employee first", 400);
      employeeId = emp._id;
    }

    const log = await Attendance.create({
      organizationId: orgId,
      employeeId: employeeId,
      date: body.date ? new Date(body.date) : new Date(),
      status: body.status || 'PRESENT',
      checkIn: body.checkIn ? new Date(body.checkIn) : new Date(),
      checkOut: body.checkOut ? new Date(body.checkOut) : undefined,
    });

    return ApiResponse.success(log, 'Attendance log created successfully', 201);
  } catch (error: any) {
    console.error("Attendance API Error:", error.message);
    return ApiResponse.error("Failed to create attendance log", 500);
  }
});
