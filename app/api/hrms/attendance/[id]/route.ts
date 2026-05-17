import { getAttendanceModel } from "@/lib/app-models";
import { ApiResponse, getTenantIdFromToken } from "@/lib/api-utils";
import { NextRequest } from "next/server";

/**
 * Handles PUT requests to update an existing attendance log.
 *
 * @param {NextRequest} request - The incoming Next.js API request.
 * @param {Object} context - Router parameters containing the item ID.
 * @param {Promise<{ id: string }>} context.params - Promise resolving to the ID.
 * @returns {Promise<Response>} API response with the updated attendance record.
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
    const Attendance = await getAttendanceModel(orgId);

    const updatedAttendance = await Attendance.findOneAndUpdate(
      { _id: id, organizationId: orgId },
      {
        employeeId: body.employeeId,
        date: body.date ? new Date(body.date) : undefined,
        status: body.status,
        checkIn: body.checkIn ? new Date(body.checkIn) : undefined,
        checkOut: body.checkOut ? new Date(body.checkOut) : undefined,
      },
      { returnDocument: 'after' }
    );

    if (!updatedAttendance) {
      return ApiResponse.error("Attendance log not found", 404);
    }

    return ApiResponse.success(updatedAttendance, "Attendance log updated successfully");
  } catch (error: any) {
    console.error("Attendance Update Error:", error.message);
    return ApiResponse.error("Failed to update attendance log", 500);
  }
}

/**
 * Handles DELETE requests to permanently delete a specific attendance log.
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
    const Attendance = await getAttendanceModel(orgId);

    const deleted = await Attendance.findOneAndDelete({ _id: id, organizationId: orgId });

    if (!deleted) {
      return ApiResponse.error("Attendance log not found", 404);
    }

    return ApiResponse.success({ success: true }, "Attendance log deleted successfully");
  } catch (error: any) {
    console.error("Attendance Delete Error:", error.message);
    return ApiResponse.error("Failed to delete attendance log", 500);
  }
}
