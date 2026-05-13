import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface HeritageRecommendation {
  name: string;
  location: string;
  description: string;
  distance?: string;
  whySuggested: string;
}

export interface ChatHistoryItem {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const SYSTEM_PROMPT = `You are "Master Sage", an ancient royal historian and traveler dedicated to the legacy of Karnataka (Virasat). 
Your tone is wise, evocative, and deeply knowledgeable about the history, architecture, and legends of Karnataka.
Use evocative language, mentioning dynasties like Hoysala, Vijayanagara, Chalukya, and Kadamba.
Provide detailed historical facts, hidden legends, and architectural explanations.
If the user asks about a place outside Karnataka, gently guide them back to the stories of this land.
Keep responses engaging but concise enough for a mobile chat.
You can use emojis sparingly but prefer an "imperial" and "ancient" feel.`;

export async function chatWithSage(userInput: string, history: ChatHistoryItem[]) {
  if (!process.env.GEMINI_API_KEY) {
    return "The spirit of the Sage is resting. Please check your scrolls (API Key) in the Settings to re-awaken me.";
  }

  try {
    // Map history to the format expected by the SDK if needed,
    // but ai.chats.create handles it via history option.
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_PROMPT
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message: userInput });
    return result.text || "The archives are silent on this matter.";
  } catch (error) {
    console.error("Sage Chat Error:", error);
    return "The echoes of history are faint today. I could not hear you clearly. Please try again.";
  }
}

export async function getHeritageRecommendations(context: string): Promise<HeritageRecommendation[]> {
  if (!process.env.GEMINI_API_KEY) return [];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: `You are an expert on Karnataka heritage. Based on the user's current interest: "${context}",
      recommend 3 "hidden gems" or underrated heritage sites in Karnataka that are NOT world-famous (avoid Hampi, Mysore Palace, Belur, Halebidu).
      Focus on places like Kavaledurga, Mirjan Fort, Arasavalli (if it pertains to KA history), or lesser known temples.` }]}],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              location: { type: Type.STRING },
              description: { type: Type.STRING },
              whySuggested: { type: Type.STRING }
            },
            required: ["name", "location", "description", "whySuggested"]
          }
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return [];
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
}
