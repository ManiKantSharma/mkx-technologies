import { getEmployeeModel } from "@/lib/app-models";
import { ApiResponse, getTenantIdFromToken } from "@/lib/api-utils";
import { NextRequest } from "next/server";

/**
 * Handles PUT requests to update an existing employee profile.
 *
 * @param {NextRequest} request - The incoming Next.js API request.
 * @param {Object} context - Router parameters containing the item ID.
 * @param {Promise<{ id: string }>} context.params - Promise resolving to the ID.
 * @returns {Promise<Response>} API response with the updated employee record.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const orgId = getTenantIdFromToken(request);
    if (!orgId) return ApiResponse.error("Unauthorized", 401);

    const { id } = await params;
    const body = await request.json();
    const Employee = await getEmployeeModel(orgId);

    const updatedEmployee = await Employee.findOneAndUpdate(
      { _id: id, organizationId: orgId },
      {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        department: body.department,
        role: body.role,
        joiningDate: body.joiningDate ? new Date(body.joiningDate) : undefined,
        birthday: body.birthday ? new Date(body.birthday) : undefined,
        managerName: body.managerName,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
      { returnDocument: 'after' }
    );

    if (!updatedEmployee) {
      return ApiResponse.error("Employee not found", 404);
    }

    return ApiResponse.success(updatedEmployee, "Employee updated successfully");
  } catch (error: any) {
    console.error("Employee Update Error:", error.message);
    return ApiResponse.error("Failed to update employee", 500);
  }
}

/**
 * Handles DELETE requests to permanently remove an employee from the directory.
 *
 * @param {NextRequest} request - The incoming Next.js API request.
 * @param {Object} context - Router parameters containing the item ID.
 * @param {Promise<{ id: string }>} context.params - Promise resolving to the ID.
 * @returns {Promise<Response>} API response confirming successful deletion.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const orgId = getTenantIdFromToken(request);
    if (!orgId) return ApiResponse.error("Unauthorized", 401);

    const { id } = await params;
    const Employee = await getEmployeeModel(orgId);

    const deleted = await Employee.findOneAndDelete({ _id: id, organizationId: orgId });

    if (!deleted) {
      return ApiResponse.error("Employee not found", 404);
    }

    return ApiResponse.success({ success: true }, "Employee deleted successfully");
  } catch (error: any) {
    console.error("Employee Delete Error:", error.message);
    return ApiResponse.error("Failed to delete employee", 500);
  }
}
