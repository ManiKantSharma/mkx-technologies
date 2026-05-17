import { getLeaveRequestModel } from "@/lib/app-models";
import { ApiResponse, getTenantIdFromToken, withActivityLog } from "@/lib/api-utils";
import { NextRequest } from "next/server";

/**
 * Handles PUT requests to update an existing leave request.
 *
 * @param {NextRequest} request - The incoming Next.js API request.
 * @param {Object} context - Router parameters containing the item ID.
 * @param {Promise<{ id: string }>} context.params - Promise resolving to the ID.
 * @returns {Promise<Response>} API response with the updated leave request object.
 */
export const PUT = withActivityLog("UPDATE_LEAVE", async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const orgId = getTenantIdFromToken(request);
    if (!orgId) return ApiResponse.error("Unauthorized", 401);

    const { id } = await params;
    const body = await request.json();
    const LeaveRequest = await getLeaveRequestModel(orgId);

    const updatedLeave = await LeaveRequest.findOneAndUpdate(
      { _id: id, organizationId: orgId },
      {
        employeeId: body.employeeId,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        type: body.type,
        status: body.status,
        reason: body.reason,
      },
      { returnDocument: 'after' }
    );

    if (!updatedLeave) {
      return ApiResponse.error("Leave request not found", 404);
    }

    return ApiResponse.success(updatedLeave, "Leave request updated successfully");
  } catch (error: any) {
    console.error("Leave Update Error:", error.message);
    return ApiResponse.error("Failed to update leave request", 500);
  }
});

/**
 * Handles DELETE requests to permanently remove an employee's leave request.
 *
 * @param {NextRequest} request - The incoming Next.js API request.
 * @param {Object} context - Router parameters containing the item ID.
 * @param {Promise<{ id: string }>} context.params - Promise resolving to the ID.
 * @returns {Promise<Response>} API response confirming successful deletion.
 */
export const DELETE = withActivityLog("DELETE_LEAVE", async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const orgId = getTenantIdFromToken(request);
    if (!orgId) return ApiResponse.error("Unauthorized", 401);

    const { id } = await params;
    const LeaveRequest = await getLeaveRequestModel(orgId);

    const deleted = await LeaveRequest.findOneAndDelete({ _id: id, organizationId: orgId });

    if (!deleted) {
      return ApiResponse.error("Leave request not found", 404);
    }

    return ApiResponse.success({ success: true }, "Leave request deleted successfully");
  } catch (error: any) {
    console.error("Leave Delete Error:", error.message);
    return ApiResponse.error("Failed to delete leave request", 500);
  }
});
