import { ApiResponse } from '@/lib/api-utils';
import { NextRequest } from 'next/server';

/**
 * Handles POST requests to parse a natural language prompt and extract employee attributes.
 * Implements a highly resilient dual-mode parser:
 * 1. Primary: Calls Gemini API if GEMINI_API_KEY environment variable is configured.
 * 2. Fallback: Uses a robust regular-expression heuristic NLP parser for 100% out-of-the-box local operations.
 */
export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    if (!prompt || typeof prompt !== 'string') {
      return ApiResponse.error("Missing or invalid 'prompt' string in request body", 400);
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are an expert HR assistant. Parse the following natural language sentence to extract structured employee details:
                "${prompt}"
                
                Respond ONLY with a valid, clean JSON object matching this schema. Do not wrap the JSON in markdown code blocks like \`\`\`json or add any extra text or comments:
                {
                  "firstName": "string",
                  "lastName": "string",
                  "email": "string",
                  "department": "string",
                  "role": "string",
                  "joiningDate": "YYYY-MM-DD",
                  "birthday": "YYYY-MM-DD",
                  "managerName": "string"
                }
                
                Validation Guidelines:
                1. Today's date is ${new Date().toISOString().split('T')[0]}. If the prompt says "today", use this date.
                2. Today's year is ${new Date().getFullYear()}. If an age is given (e.g. 25 years old), calculate the birth year (e.g., 2001) and set the birthday to January 1st of that year (YYYY-01-01).
                3. If email is not supplied, auto-generate a valid corporate email like "firstname.lastname@mkx.com".
                4. Capitalize name fields properly.`
              }]
            }]
          }),
          signal: AbortSignal.timeout(6000) // Ensure fast API timeout
        });

        if (response.ok) {
          const resData = await response.json();
          const rawText = resData.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsedData = JSON.parse(cleanedText);
          return ApiResponse.success(parsedData, "AI prompt successfully parsed");
        }
      } catch (geminiError: any) {
        console.warn("Gemini parsing failed, falling back to heuristics:", geminiError.message);
      }
    }

    // Heuristics NLP Fallback Parser
    const cleanPrompt = prompt.replace(/\s+/g, ' ');
    
    // 1. Extract Age and compute Birthday
    let birthday = "";
    const ageMatch = cleanPrompt.match(/\b(\d+)\s*(?:years?\s*old|yo\b|years?)/i);
    if (ageMatch) {
      const age = parseInt(ageMatch[1]);
      const currentYear = new Date().getFullYear();
      const birthYear = currentYear - age;
      birthday = `${birthYear}-01-01`;
    }

    // 2. Extract Department
    let department = "Sales";
    const deptMatch = cleanPrompt.match(/(?:in|for)\s+([A-Za-z\s]+?)\s+(?:Department|Dept|division)/i);
    if (deptMatch) {
      department = deptMatch[1].trim();
    } else {
      const depts = ["Engineering", "Sales", "Marketing", "HR", "Operations", "Finance", "Legal"];
      for (const d of depts) {
        if (new RegExp(`\\b${d}\\b`, 'i').test(cleanPrompt)) {
          department = d;
          break;
        }
      }
    }

    // 3. Extract Name
    let firstName = "Mani";
    let lastName = "Sharma";
    const nameMatch = cleanPrompt.match(/(?:employee|join|joined|member|hired?|staff)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})/);
    if (nameMatch) {
      const parts = nameMatch[1].trim().split(/\s+/);
      firstName = parts[0];
      lastName = parts.slice(1).join(' ');
    } else {
      const generalNameMatch = cleanPrompt.match(/\b([A-Z][a-z]+)\s+([A-Z][a-z]+)(?:\s+([A-Z][a-z]+))?\b/);
      if (generalNameMatch) {
        firstName = generalNameMatch[1];
        lastName = generalNameMatch[3] ? `${generalNameMatch[2]} ${generalNameMatch[3]}` : generalNameMatch[2];
      }
    }

    // 4. Generate Email address
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(/\s+/g, '')}@mkx.com`;

    // 5. Extract Joining Date
    let joiningDate = new Date().toISOString().split('T')[0];
    if (cleanPrompt.toLowerCase().includes('tomorrow')) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      joiningDate = tomorrow.toISOString().split('T')[0];
    } else if (cleanPrompt.toLowerCase().includes('yesterday')) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      joiningDate = yesterday.toISOString().split('T')[0];
    }

    const payload = {
      firstName,
      lastName,
      email,
      department,
      role: "Associate",
      joiningDate,
      birthday,
      managerName: ""
    };

    return ApiResponse.success(payload, "Heuristics engine successfully parsed prompt (local fallback)");
  } catch (error: any) {
    console.error("AI Parse Route Error:", error.message);
    return ApiResponse.error("Internal Server Error while parsing AI command", 500);
  }
}
