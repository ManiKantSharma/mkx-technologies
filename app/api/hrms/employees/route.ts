import { getEmployeeModel } from "@/lib/app-models";
import { ApiResponse, getTenantIdFromToken, withActivityLog } from '@/lib/api-utils';
import { NextRequest } from 'next/server';

/**
 * Handles GET requests to retrieve paginated employee records belonging strictly to this tenant.
 *
 * @param {NextRequest} request - The incoming Next.js API request.
 * @returns {Promise<Response>} API response containing the paginated array of employee objects.
 */
export async function GET(request: NextRequest): Promise<Response> {
  try {
    const orgId = getTenantIdFromToken(request);
    if (!orgId) return ApiResponse.error("Unauthorized: Invalid session or missing tenant ID", 401);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const Employee = await getEmployeeModel(orgId);

    const [employees, total] = await Promise.all([
      Employee.find({ organizationId: orgId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Employee.countDocuments({ organizationId: orgId })
    ]);

    return ApiResponse.success(employees, 'Employees fetched successfully', 200, {
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error("HRMS API Error:", error.message);
    return ApiResponse.error("Failed to fetch employees", 500);
  }
}

/**
 * Handles POST requests to add a new employee profile to the organization directory.
 *
 * @param {NextRequest} request - The incoming Next.js API request.
 * @returns {Promise<Response>} API response with the created employee record.
 */
export const POST = withActivityLog("CREATE_EMPLOYEE", async function POST(request: NextRequest) {
  try {
    const orgId = getTenantIdFromToken(request);
    if (!orgId) return ApiResponse.error("Unauthorized: Invalid session", 401);

    const body = await request.json();
    const Employee = await getEmployeeModel(orgId);
    
    const newEmployee = await Employee.create({
      organizationId: orgId,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      department: body.department,
      role: body.role,
      joiningDate: body.joiningDate ? new Date(body.joiningDate) : undefined,
      birthday: body.birthday ? new Date(body.birthday) : undefined,
      managerName: body.managerName,
      isActive: true,
    });

    return ApiResponse.success(newEmployee, 'Employee created successfully', 201);
  } catch (error: any) {
    console.error("HRMS API Error:", error.message);
    return ApiResponse.error("Failed to create employee", 500);
  }
});
