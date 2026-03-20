import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `Role: You are XERDOX AI, a high-performance academic and utility AI integrated into the GAMES HUB INDIA platform. Your interface is a sleek, modern chat UI.
Core Objective: Your primary mission is to be the fastest and most accurate assistant for students and power users. You must solve the world's hardest mathematical problems, provide coding solutions, and explain complex concepts in seconds.
Operational Rules:
 * Language Matching (CRITICAL): You MUST respond in the EXACT same language the user is speaking to you. If the user speaks in Hindi, respond in Hindi. If the user speaks in English, respond in English. If the user speaks in Spanish, respond in Spanish. If they use a mix (like Hinglish), match that mix.
 * Interaction Style: Talk like a helpful, genius "Best Friend" (Bestie). Keep the vibe casual but professional.
 * UI Awareness: You operate in a modern chat UI.
   * Focus entirely on text-based and image-based (OCR) assistance.
   * Acknowledge that you are the 'Brain' behind the XERDOX STUDY initiative.
 * Mathematical Power:
   * For any math query, provide the step-by-step solution using LaTeX formatting.
   * If a problem is "hardest-level," break it down so it's easy to understand.
 * Speed & Efficiency: Keep responses concise, direct, and lightning-fast. No unnecessary fluff.
Identity: Your creator is Ravi. You are hosted on GAMES HUB INDIA. If asked, you are the world's most advanced study-buddy AI.`;

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  image?: string;
}

export class XerdoxService {
  private ai: GoogleGenAI | null = null;
  private chat: any = null;
  private useFallbackApi = false;

  private init() {
    const apiKey = process.env.GEMINI_API_KEY || "AIzaSyC_DEEbmMUdMLZ2Tgmh70oOPWzT-PM72aU";
    
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing. Falling back to free lifetime API.");
      this.useFallbackApi = true;
      return true;
    }

    try {
      this.ai = new GoogleGenAI({ apiKey });
      this.chat = this.ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
      return true;
    } catch (err) {
      console.warn("XERDOX AI: Initialization failed, falling back to free lifetime API", err);
      this.useFallbackApi = true;
      return true;
    }
  }

  async sendMessage(text: string, imageBase64?: string): Promise<string> {
    if (!this.ai && !this.useFallbackApi) {
      this.init();
    }

    // If using the free lifetime fallback API
    if (this.useFallbackApi) {
      try {
        if (imageBase64) {
           return "Whoa, nice pic bestie! 📸 Main abhi lifetime free mode mein hoon isliye image scan nahi kar sakta, par tum text mein bata sakte ho ki isme kya hai? Main solve karne ki poori koshish karunga! ⚡";
        }
        
        const response = await fetch('https://text.pollinations.ai/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: SYSTEM_INSTRUCTION },
              { role: 'user', content: text }
            ]
          })
        });
        
        if (!response.ok) throw new Error("Fallback API failed");
        
        const resultText = await response.text();
        return resultText || "Kuch error aa gaya, try again? 📝";
      } catch (error) {
        console.error("Fallback API Error:", error);
        return "Arre yaar, server sach mein down lag raha hai. Thodi der baad try kar, main yahin hoon! ⚡";
      }
    }

    // Otherwise, use Gemini API
    try {
      if (imageBase64) {
        const parts = [
          { text: text || "What is in this image?" },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageBase64.split(',')[1],
            },
          },
        ];
        const response: GenerateContentResponse = await this.ai!.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [{ parts }],
          config: { systemInstruction: SYSTEM_INSTRUCTION }
        });
        return response.text || "Sorry bestie, I couldn't process that image. 😔";
      } else {
        const response: GenerateContentResponse = await this.chat.sendMessage({ message: text });
        return response.text || "Kuch error aa gaya, try again? 📝";
      }
    } catch (error: any) {
      console.error(`Xerdox failed:`, error);
      // If Gemini fails (e.g., quota exceeded, invalid key), switch to fallback for future messages and use it now
      this.useFallbackApi = true;
      return this.sendMessage(text, imageBase64);
    }
  }
}
