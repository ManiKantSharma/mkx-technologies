import { NextRequest } from "next/server";
import { getEmployeeModel, getAttendanceModel, getLeaveRequestModel, getActivityLogModel } from "@/lib/app-models";
import { ApiResponse, getTenantIdFromToken } from "@/lib/api-utils";

/**
 * Handles GET requests to calculate workforce stats and call Gemini to synthesize Executive AI Insights.
 * Employs a dual-mode parser with rich rule-based smart fallback stats insights.
 */
export async function GET(request: NextRequest) {
  try {
    const orgId = getTenantIdFromToken(request);
    if (!orgId) return ApiResponse.error("Unauthorized", 401);

    const Employee = await getEmployeeModel(orgId);
    const Attendance = await getAttendanceModel(orgId);
    const LeaveRequest = await getLeaveRequestModel(orgId);
    const ActivityLog = await getActivityLogModel(orgId);

    const totalEmployees = await Employee.countDocuments({ organizationId: orgId });
    const onLeave = await LeaveRequest.countDocuments({ organizationId: orgId, status: "APPROVED" });
    const pendingLeaves = await LeaveRequest.countDocuments({ organizationId: orgId, status: "PENDING" });
    
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    
    const presentToday = await Attendance.countDocuments({
      organizationId: orgId,
      date: { $gte: startOfToday, $lte: endOfToday },
      status: { $in: ["PRESENT", "LATE"] }
    });

    const attendanceRate = totalEmployees > 0 ? Math.round((presentToday / totalEmployees) * 100) : 0;
    
    // Get recent logs to detect trends
    const recentLogs = await ActivityLog.find({ organizationId: orgId }).sort({ createdAt: -1 }).limit(10);
    const logsDescription = recentLogs.map(l => `${l.action} by ${l.userEmail}`).join(", ");

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (apiKey) {
      try {
        const prompt = `You are a premium AI HR Executive Consultant. Analyze these real-time company statistics and generate 3 highly actionable, strategic executive bullet points (max 20 words each) for the management dashboard:
        - Total Employees Headcount: ${totalEmployees}
        - Today's Presence Count: ${presentToday} (Attendance rate: ${attendanceRate}%)
        - Employees on Approved Leave: ${onLeave}
        - Pending Leave Requests awaiting approval: ${pendingLeaves}
        - Recent system events: [${logsDescription}]

        Format your response ONLY as a JSON array of strings:
        ["Insight 1", "Insight 2", "Insight 3"]
        Do not wrap in markdown or add markdown backticks.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }]
          }),
          signal: AbortSignal.timeout(6000)
        });

        if (response.ok) {
          const resData = await response.json();
          const rawText = resData.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsedInsights = JSON.parse(cleanedText);
          if (Array.isArray(parsedInsights) && parsedInsights.length > 0) {
            return ApiResponse.success(parsedInsights, "AI Insights successfully generated");
          }
        }
      } catch (geminiError: any) {
        console.warn("Gemini insights calculation failed, using fallback:", geminiError.message);
      }
    }

    // Heuristic fallbacks based on actual metrics
    const fallbacks = [
      `Active workforce stands at ${totalEmployees} employees with a stable daily operations baseline.`,
      attendanceRate < 80 
        ? `Daily presence is currently at ${attendanceRate}%. Consider reviewing check-in policy guidelines.` 
        : `Excellent employee engagement with a robust ${attendanceRate}% check-in rate today.`,
      pendingLeaves > 0 
        ? `There are ${pendingLeaves} pending leave requests awaiting approval. Quick resolutions support team resource planning.`
        : `All leave applications are completely up-to-date with zero backlog.`
    ];

    return ApiResponse.success(fallbacks, "Heuristics successfully generated fallback executive stats insights");
  } catch (error: any) {
    console.error("AI Insights API Error:", error.message);
    return ApiResponse.error("Failed to compile executive AI insights", 500);
  }
}
