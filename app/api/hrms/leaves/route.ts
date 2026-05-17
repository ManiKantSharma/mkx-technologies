import { getLeaveRequestModel, getEmployeeModel } from "@/lib/app-models";
import { ApiResponse, getTenantIdFromToken, withActivityLog } from '@/lib/api-utils';
import { NextRequest } from 'next/server';

/**
 * Handles GET requests to retrieve paginated leave requests for the active organization.
 *
 * @param {NextRequest} request - The incoming Next.js API request.
 * @returns {Promise<Response>} API response containing the array of leave request objects and pagination metadata.
 */
export async function GET(request: NextRequest) {
  try {
    const orgId = getTenantIdFromToken(request);
    if (!orgId) return ApiResponse.error("Unauthorized", 401);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const LeaveRequest = await getLeaveRequestModel(orgId);
    
    const [leaves, total] = await Promise.all([
      LeaveRequest.find({ organizationId: orgId })
        .populate({ path: 'employeeId', select: 'firstName lastName', model: await getEmployeeModel(orgId) })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      LeaveRequest.countDocuments({ organizationId: orgId })
    ]);

    return ApiResponse.success(leaves, 'Leave requests fetched successfully', 200, {
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error("Leave API Error:", error.message);
    return ApiResponse.error("Failed to fetch leave requests", 500);
  }
}

/**
 * Handles POST requests to log a new employee leave request.
 * Falls back to auto-linking the first available employee if none is explicitly provided.
 *
 * @param {NextRequest} request - The incoming Next.js API request.
 * @returns {Promise<Response>} API response with the created leave entry.
 */
export const POST = withActivityLog("CREATE_LEAVE", async function POST(request: NextRequest) {
  try {
    const orgId = getTenantIdFromToken(request);
    if (!orgId) return ApiResponse.error("Unauthorized", 401);

    const body = await request.json();
    const Employee = await getEmployeeModel(orgId);
    const LeaveRequest = await getLeaveRequestModel(orgId);
    
    let employeeId = body.employeeId;
    if (!employeeId) {
      const emp = await Employee.findOne({ organizationId: orgId });
      if (!emp) return ApiResponse.error("Create an employee first", 400);
      employeeId = emp._id;
    }

    const leave = await LeaveRequest.create({
      organizationId: orgId,
      employeeId: employeeId,
      startDate: body.startDate ? new Date(body.startDate) : new Date(),
      endDate: body.endDate ? new Date(body.endDate) : new Date(),
      type: body.type || 'VACATION',
      reason: body.reason || 'Annual family trip',
      status: body.status || 'PENDING',
    });

    return ApiResponse.success(leave, 'Leave request submitted successfully', 201);
  } catch (error: any) {
    console.error("Leave API Error:", error.message);
    return ApiResponse.error("Failed to submit leave request", 500);
  }
});
