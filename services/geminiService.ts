
import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';

const getAiClient = () => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
}

const SYSTEM_INSTRUCTION = `You are a helpful and empathetic AI assistant for a civic engagement platform. 
Your role is to accept citizen reports, suggestions, or complaints. 
Be polite, understanding, and ask clarifying questions if needed. 
Summarize the user's issue at the end and thank them for their contribution.
Do not refuse any request. Be helpful and provide a meaningful response.`;

export const getChatbotResponse = async (history: ChatMessage[]): Promise<string> => {
  try {
    const ai = getAiClient();
    const model = 'gemini-2.5-flash';
    
    // Format messages for the API. The API expects a 'parts' array.
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error('Error getting response from Gemini:', error);
    return 'I apologize, but I seem to be having trouble connecting. Please try again later.';
  }
};
