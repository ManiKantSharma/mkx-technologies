import { ApiResponse } from "@/lib/api-utils";
import { NextRequest } from "next/server";

/**
 * Handles POST requests to analyze a leave reason's sentiment and output an AI approval recommendation.
 * Employs a dual-mode parser with rich rule-based smart sentiment analysis fallback.
 */
export async function POST(request: NextRequest) {
  try {
    const { reason } = await request.json();
    if (!reason || typeof reason !== "string") {
      return ApiResponse.error("Missing or invalid 'reason' in request body", 400);
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const prompt = `You are a premium AI HR manager. Analyze the following employee leave reason and evaluate the urgency, sentiment, and provide a smart recommendation:
        "${reason}"

        Respond ONLY with a clean JSON object matching this schema. Do not include markdown tags like \`\`\`json:
        {
          "sentiment": "Medical" | "Urgent" | "Burnout Risk" | "Casual",
          "recommendation": "Short 10-15 word action guidance for the manager",
          "priority": "HIGH" | "MEDIUM" | "LOW"
        }`;

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
          const parsed = JSON.parse(cleanedText);
          return ApiResponse.success(parsed, "AI recommendation successfully calculated");
        }
      } catch (geminiError: any) {
        console.warn("Gemini leave assessment failed, using fallback:", geminiError.message);
      }
    }

    // Heuristics Fallback Sentiment Engine
    const lowerReason = reason.toLowerCase();
    let sentiment: "Medical" | "Urgent" | "Burnout Risk" | "Casual" = "Casual";
    let recommendation = "Standard leave allocation request. Check team capacity calendar before approving.";
    let priority: "HIGH" | "MEDIUM" | "LOW" = "LOW";

    if (lowerReason.includes("sick") || lowerReason.includes("doctor") || lowerReason.includes("medical") || lowerReason.includes("hospital") || lowerReason.includes("surgery") || lowerReason.includes("fever") || lowerReason.includes("accident")) {
      sentiment = "Medical";
      recommendation = "Highly critical medical request. Urgent approval is recommended.";
      priority = "HIGH";
    } else if (lowerReason.includes("emergency") || lowerReason.includes("urgent") || lowerReason.includes("family") || lowerReason.includes("death") || lowerReason.includes("funeral")) {
      sentiment = "Urgent";
      recommendation = "Pressing personal circumstances detected. Fast approval recommended.";
      priority = "HIGH";
    } else if (lowerReason.includes("exhausted") || lowerReason.includes("burnout") || lowerReason.includes("mental health") || lowerReason.includes("stressed") || lowerReason.includes("tired")) {
      sentiment = "Burnout Risk";
      recommendation = "Potential employee burnout flagged. Support physical/mental health break.";
      priority = "MEDIUM";
    } else if (lowerReason.includes("vacation") || lowerReason.includes("trip") || lowerReason.includes("wedding") || lowerReason.includes("travel") || lowerReason.includes("holiday")) {
      sentiment = "Casual";
      recommendation = "Plan-ahead personal break. Safe to approve if daily resource capacity allows.";
      priority = "LOW";
    }

    return ApiResponse.success({
      sentiment,
      recommendation,
      priority
    }, "Heuristic engine successfully evaluated leave recommendation");
  } catch (error: any) {
    console.error("AI Leave Assessment Error:", error.message);
    return ApiResponse.error("Failed to analyze leave request", 500);
  }
}
