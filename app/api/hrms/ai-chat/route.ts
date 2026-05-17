import { getEmployeeModel, getLeaveRequestModel, getAttendanceModel, getHRSettingsModel } from "@/lib/app-models";
import { ApiResponse, getTenantIdFromToken } from "@/lib/api-utils";
import { NextRequest } from "next/server";

/**
 * Handles POST requests to converse with the intelligent HR Assistant Chatbot.
 * Passes the query, workforce statistics context, and chat history to Gemini for rich, detailed replies.
 */
export async function POST(request: NextRequest) {
  try {
    const orgId = getTenantIdFromToken(request);
    if (!orgId) return ApiResponse.error("Unauthorized", 401);

    const { messages } = await request.json();
    if (!messages || !Array.isArray(messages)) {
      return ApiResponse.error("Missing or invalid 'messages' array in request body", 400);
    }

    // Gather live workspace context to make the chatbot extremely smart!
    const Employee = await getEmployeeModel(orgId);
    const LeaveRequest = await getLeaveRequestModel(orgId);
    const Attendance = await getAttendanceModel(orgId);
    const HRSettings = await getHRSettingsModel(orgId);

    const employees = await Employee.find({ organizationId: orgId }).select("firstName lastName department role email");
    const activeLeaves = await LeaveRequest.find({ organizationId: orgId, status: "APPROVED" })
      .populate({ path: 'employeeId', select: 'firstName lastName', model: Employee });
    
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    
    const presentLogs = await Attendance.find({
      organizationId: orgId,
      date: { $gte: startOfToday, $lte: endOfToday },
      status: { $in: ["PRESENT", "LATE"] }
    }).populate({ path: 'employeeId', select: 'firstName lastName', model: Employee });

    const settings = await HRSettings.findOne({ organizationId: orgId });

    // Format workforce context beautifully
    const companyContext = `
    COMPANY WORKFORCE CONTEXT:
    - Company Name: ${settings?.companyName || "MKX Technologies"}
    - Total Employees: ${employees.length}
    - Employees Directory: ${employees.map(e => `${e.firstName} ${e.lastName} (${e.department} - ${e.role || 'Staff'}, Email: ${e.email})`).join("; ")}
    - Active Approved Leaves: ${activeLeaves.length > 0 ? activeLeaves.map((l: any) => `${l.employeeId?.firstName} ${l.employeeId?.lastName} (${l.type})`).join("; ") : "None"}
    - Checked In Today: ${presentLogs.length > 0 ? presentLogs.map((p: any) => `${p.employeeId?.firstName} ${p.employeeId?.lastName}`).join("; ") : "None"}
    `;

    const lastMessage = messages[messages.length - 1]?.content || "";

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        // Construct standard chat sequence prompt
        const systemPrompt = `You are a premium AI HR Copilot called "MKX AI Assistant".
        You have direct real-time access to the company's workforce records. Use this context to answer accurately:
        ${companyContext}
        
        Guidelines:
        1. Be friendly, highly professional, and brief in your responses (max 100-120 words).
        2. Help write corporate emails, drafts, or summarize attendance.
        3. If asked about workforce data, search the provided COMPANY WORKFORCE CONTEXT above and present it cleanly.
        
        Conversation history:
        ${messages.slice(0, -1).map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join("\n")}
        
        User's question: "${lastMessage}"`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: systemPrompt }]
            }]
          }),
          signal: AbortSignal.timeout(6000)
        });

        if (response.ok) {
          const resData = await response.json();
          const rawText = resData.candidates?.[0]?.content?.parts?.[0]?.text || '';
          return ApiResponse.success({ text: rawText.trim() }, "AI chat response successfully received");
        }
      } catch (geminiError: any) {
        console.warn("Gemini chat failed, using fallback:", geminiError.message);
      }
    }

    // Heuristics Offline Chatbot response
    let responseText = "Hello! I am your offline MKX HR Assistant. I can see you have " + employees.length + " employees registered in our systems. To unlock full real-time conversations and templates, please verify your Gemini API key in your .env file.";
    const lowerMessage = lastMessage.toLowerCase();

    if (lowerMessage.includes("employees") || lowerMessage.includes("who are") || lowerMessage.includes("list")) {
      responseText = `I found ${employees.length} employees currently registered: \n` + 
        employees.map(e => `• ${e.firstName} ${e.lastName} (${e.department})`).join("\n");
    } else if (lowerMessage.includes("leave") || lowerMessage.includes("vacation")) {
      responseText = activeLeaves.length > 0 
        ? `Currently, there are ${activeLeaves.length} employees on approved leave: ` + activeLeaves.map((l: any) => `${l.employeeId?.firstName} ${l.employeeId?.lastName}`).join(", ")
        : "There are currently no active approved leaves in the company today.";
    } else if (lowerMessage.includes("email") || lowerMessage.includes("draft") || lowerMessage.includes("welcome")) {
      responseText = `Here is a drafted welcome onboarding email for your staff:
      
Subject: Welcome to the Team!

Hi,

We are absolutely thrilled to welcome you to the organization! Your skills and experience will be a fantastic addition to our department.

We have set up your corporate directory and workspace logs, and you are fully active. Feel free to reach out if you have any questions!

Best regards,
HR Operations Team`;
    }

    return ApiResponse.success({ text: responseText }, "Heuristic chatbot completed response (local fallback)");
  } catch (error: any) {
    console.error("AI Chat Route Error:", error.message);
    return ApiResponse.error("Failed to generate AI chatbot response", 500);
  }
}
