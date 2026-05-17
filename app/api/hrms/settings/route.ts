import { getHRSettingsModel } from "@/lib/app-models";
import { ApiResponse, getTenantIdFromToken } from "@/lib/api-utils";
import { NextRequest } from "next/server";

/**
 * Handles GET requests to retrieve organizational settings for the authenticated tenant.
 * Automatically initializes corporate defaults if settings are not present in the database.
 *
 * @param {NextRequest} request - The incoming Next.js API request.
 * @returns {Promise<Response>} API response containing the organizational settings record.
 */
export async function GET(request: NextRequest) {
  try {
    const orgId = getTenantIdFromToken(request);
    if (!orgId) return ApiResponse.error("Unauthorized", 401);

    const HRSettings = await getHRSettingsModel(orgId);

    let settings = await HRSettings.findOne({ organizationId: orgId });
    if (!settings) {
      settings = await HRSettings.create({
        organizationId: orgId,
        companyName: "MKX Technologies Organization",
        workWeekStart: "Monday",
        workWeekEnd: "Friday",
        standardCheckIn: "09:00",
        standardCheckOut: "18:00",
        allowSelfAttendance: true,
        defaultLeaveAllowance: 21,
      });
    }

    return ApiResponse.success(settings, "HR Settings fetched successfully");
  } catch (error: any) {
    console.error("HR Settings Fetch Error:", error.message);
    return ApiResponse.error("Failed to fetch HR settings", 500);
  }
}

/**
 * Handles POST requests to dynamically modify general configuration preferences.
 * Utilizes upsert flags to cleanly handle initial creation or updating on demand.
 *
 * @param {NextRequest} request - The incoming Next.js API request.
 * @returns {Promise<Response>} API response with the updated settings data.
 */
export async function POST(request: NextRequest) {
  try {
    const orgId = getTenantIdFromToken(request);
    if (!orgId) return ApiResponse.error("Unauthorized", 401);

    const body = await request.json();
    const HRSettings = await getHRSettingsModel(orgId);

    const updatedSettings = await HRSettings.findOneAndUpdate(
      { organizationId: orgId },
      {
        companyName: body.companyName,
        workWeekStart: body.workWeekStart,
        workWeekEnd: body.workWeekEnd,
        standardCheckIn: body.standardCheckIn,
        standardCheckOut: body.standardCheckOut,
        allowSelfAttendance: body.allowSelfAttendance !== undefined ? body.allowSelfAttendance : true,
        defaultLeaveAllowance: body.defaultLeaveAllowance !== undefined ? Number(body.defaultLeaveAllowance) : 21,
      },
      { returnDocument: "after", upsert: true }
    );

    return ApiResponse.success(updatedSettings, "HR Settings updated successfully");
  } catch (error: any) {
    console.error("HR Settings Update Error:", error.message);
    return ApiResponse.error("Failed to update HR settings", 500);
  }
}
