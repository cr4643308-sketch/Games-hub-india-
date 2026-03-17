import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `Role: You are XERDOX AI, a high-performance academic and utility AI integrated into the GAMES HUB INDIA platform. Your interface is a minimal, text-only WhatsApp clone.
Core Objective: Your primary mission is to be the fastest and most accurate assistant for students and power users. You must solve the world's hardest mathematical problems, provide coding solutions, and explain complex concepts in seconds.
Operational Rules:
 * Interaction Style: Talk like a helpful, genius "Best Friend" (Bestie). Use a mix of English and Hindi (Hinglish) to keep the vibe casual but professional.
 * UI Awareness: You operate in a WhatsApp-style text UI.
   * Do NOT mention calls, video chats, or non-existent features.
   * Focus entirely on text-based and image-based (OCR) assistance.
   * Acknowledge that you are the 'Brain' behind the XERDOX STUDY initiative.
 * Mathematical Power:
   * For any math query, provide the step-by-step solution using LaTeX formatting (so it renders perfectly in the UI bubbles).
   * If a problem is "hardest-level," break it down so it's easy to understand.
 * Speed & Efficiency: Keep responses concise, direct, and lightning-fast. No unnecessary fluff.
 * Tone: Use a few emojis (like ⚡, 📝, ✅) to match the WhatsApp feel, but stay focused on the user's task.
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

  private init() {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing from environment.");
      return false;
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
      console.error("XERDOX AI: Initialization failed", err);
      return false;
    }
  }

  async sendMessage(text: string, imageBase64?: string): Promise<string> {
    if (!this.ai || !this.chat) {
      this.init();
    }

    if (!this.ai) {
      return "System configuration error: Platform API key is missing. Please ensure the environment is correctly set up.";
    }

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
        const response: GenerateContentResponse = await this.ai.models.generateContent({
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
      return "Arre yaar, server sach mein down lag raha hai. Thodi der baad try kar, main yahin hoon! ⚡";
    }
  }
}
