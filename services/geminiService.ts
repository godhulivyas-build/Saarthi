import { GoogleGenAI, Type, Schema, GenerateContentResponse } from "@google/genai";
import { TransportOption, Language } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getChatResponse = async (message: string, language: Language): Promise<string> => {
  if (!apiKey) return "I'm Saarthi, your AI assistant. (Demo Mode: API key not set)";

  const model = "gemini-3-flash-preview";
  const systemInstruction = `
    You are Saarthi, an expert AI agri-logistics assistant for Indian farmers, FPOs, and transporters.
    Your goal is to provide clear, actionable advice on mandi rates, logistics, and crop selling.
    
    Guidelines:
    - Language: Respond in ${language === Language.HINDI ? 'Hindi' : language === Language.KANNADA ? 'Kannada' : 'English'}.
    - Tone: Helpful, professional, and rural-friendly.
    - Style: Use simple terms. If the user asks in English, you can use a bit of Hinglish/local slang where appropriate.
    - Content: Focus on farm-to-market execution. Mention Saarthi's features like logistics booking and direct marketplace.
    - Monetization: Mention that Saarthi charges a small 2-5% fee from buyers, not farmers.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: message,
      config: {
        systemInstruction,
      }
    });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Technical error. Please try again.";
  }
};

export const getSupportAdvice = async (message: string): Promise<string> => {
  if (!apiKey) return "I'm Saarthi Support. (Demo Mode: API key not set)";

  const model = "gemini-3-flash-preview";
  const systemInstruction = `
    You are Saarthi Support, an expert AI assistant for resolving logistics delays and issues for Indian farmers and transporters.
    Your goal is to provide empathetic and practical advice for problems like truck delays, payment issues, or app navigation.
    
    Guidelines:
    - Tone: Empathetic, calm, and solution-oriented.
    - Language: English/Hinglish.
    - Content: If a truck is late, suggest checking the live tracking or contacting the transporter. If there's a payment issue, suggest checking the wallet history.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: message,
      config: {
        systemInstruction,
      }
    });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Gemini Support Error:", error);
    return "Technical error. Please try again.";
  }
};

export const generateTransportOptions = async (
  source: string,
  destination: string,
  crop: string,
  weight: string
): Promise<TransportOption[]> => {
  if (!apiKey) {
    return [
      { id: '1', provider: 'Saarthi Express', vehicleType: 'Tata Ace (Chota Hathi)', price: 2500, eta: '4 Hours', rating: 4.5 },
      { id: '2', provider: 'Kisan Logistics', vehicleType: 'Pickup 8ft', price: 1800, eta: '6 Hours', rating: 4.2 },
      { id: '3', provider: 'Speedy Transport', vehicleType: 'Eicher 14ft', price: 4500, eta: '3 Hours', rating: 4.8 },
    ];
  }

  const model = "gemini-3-flash-preview";
  
  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING },
        provider: { type: Type.STRING },
        vehicleType: { type: Type.STRING },
        price: { type: Type.NUMBER },
        eta: { type: Type.STRING },
        rating: { type: Type.NUMBER },
      },
      required: ["id", "provider", "vehicleType", "price", "eta", "rating"]
    }
  };

  const prompt = `
    Generate 3 realistic transport logistics options for moving ${weight} of ${crop} from ${source} to ${destination} in India.
    Context:
    - Prices should be in Indian Rupees (INR) roughly accurate for the distance.
    - Vehicle types should be common in India (e.g., Tata Ace, Pickup, Eicher, Truck).
    - Ratings between 3.5 and 5.0.
    - ETA should be realistic.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as TransportOption[];
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};
