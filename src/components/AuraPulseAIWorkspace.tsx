'use client';

import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

// =========================================================================
// 🧠 MINECRAFT RETRO LOGIC ENGINE
// =========================================================================
function processAuraPulseAI(input: string): string {
  const query = input.toLowerCase().trim();

  if (query === 'hi' || query === 'hello' || query === 'hey') {
    return "Yo Ravi bhai! AuraPulse Stone Engine active hai. Batao aaj kya crafting karni hai? Koi naya project build karein? ⛏️💎";
  }
  if (query.includes('kaisa hai') || query.includes('kaise ho')) {
    return "Tera bhai ekdum solid Minecraft Iron Golem jaisa mazboot hai! Tum batao, aaj mining par chalna hai ya coding par? ⚔️";
  }
  if (query.includes('hello bhai') || query.includes('bhaiya')) {
    return "Yo bhai! Batao kya help chahiye? AuraPulse ka local core system ekdum ready hai tumhari madad ke liye. 😉";
  }

  // YouTube Scripting
  if (query.includes('script') || query.includes('video concept')) {
    return `[ 🎬 MINECRAFT ERA VIRAL SCRIPT ]

• 10-SEC HOOK: [Visual: Fast cuts, camera pushing into a deep lava cave] [SFX: Creeper Hissing...] "Agar tumne ye ek galti ki, toh tumhara poora hardcore world khatam! Aaj hum baat karenge top secrets ke baare mein..."
• BODY: Break the content into 3 layers: Resource Gathering, Base Security, and Hidden Mechanics. 
• CTA: "Niche comment me batao tumhara favorite blocks kaun sa hai aur subscribe thoko!"`;
  }

  // Thumbnail Strategy
  if (query.includes('thumbnail') || query.includes('ctr')) {
    return `[ 🖼️ RETRO THUMBNAIL BLUEPRINT ]

• CONCEPT: Split screen setup. Left side dark obsidian dungeon with a giant red question mark. Right side glowing diamond vault.
• TEXT OVERLAY: "MUTATION!" (Font: Heavy Blocky, Color: Neon Green with dark borders).`;
  }

  // Generic fallback
  return `Bhai, tumhari baat ekdum raw aur solid hai. Is problem ko solve karne ke liye hamein server config ko ekdum scratch se re-build karna hoga. Batao, database optimization shuru karein ya scripting blocks lagayein? 🚀`;
}

// =========================================================================
// 🧱 MINECRAFT & STONE-AGE CUSTOM CHAT UI
// =========================================================================
interface AuraPulseAIProps {
  onClose: () => void;
}

export const AuraPulseAIWorkspace = ({ onClose }: AuraPulseAIProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      text: 'Yo Ravi bhai! AuraPulse Old-Era Engine Online hai. Kuchh bhi pucho, pure functional answer milega! 🧱⛏️',
      sender: 'ai',
      timestamp: '08:00 AM'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessageText = inputValue;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      text: userMessageText,
      sender: 'user',
      timestamp: timeStr
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = processAuraPulseAI(userMessageText);
      const newAiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: aiResponse,
        sender: 'ai',
        timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, newAiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      backgroundColor: '#2c241e', // Dark Earthy Brown
      backgroundImage: 'radial-gradient(#4a3b32 1px, transparent 1px)',
      backgroundSize: '16px 16px',
      display: 'flex', 
      flexDirection: 'column', 
      fontFamily: '"Courier New", Courier, monospace, sans-serif' // Blocky typewriter feel
    }}>
      
      {/* 🛡️ OLD-ERA MINECRAFT HEADER */}
      <header style={{ 
        backgroundColor: '#4a4a4a', // Cobblestone Gray
        color: '#f0f0f0', 
        padding: '16px', 
        display: 'flex', 
        alignItems: 'center', 
        borderBottom: '4px solid #2e2e2e',
        boxShadow: '0 4px 0px rgba(0,0,0,0.4)',
        position: 'relative'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: '#f0f0f0', cursor: 'pointer' }}>
            <X className="w-6 h-6" />
        </button>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          backgroundColor: '#8b8b8b', 
          border: '3px solid #dbdbdb',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginRight: '14px', 
          fontSize: '1.3rem' 
        }}>
          ⛏️
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', textShadow: '2px 2px 0px #000', letterSpacing: '1px' }}>AuraPulse Core AI</h2>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#aaffaa', textShadow: '1px 1px 0px #000' }}>
            {isTyping ? '⚡ Processing Blocks...' : '● Ready to Craft'}
          </p>
        </div>
      </header>
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                width: '100%'
              }}
            >
              <div
                style={{
                  maxWidth: '75%',
                  padding: '14px',
                  borderRadius: '4px', // Hard square corners like Minecraft blocks
                  border: isUser ? '3px solid #1a1a1a' : '3px solid #b8b8b8',
                  backgroundColor: isUser ? '#000000' : '#FFFFFF', // User = Black Capsule, AI = White Capsule
                  boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
                  position: 'relative'
                }}
              >
                <div style={{ 
                  fontSize: '1rem', 
                  lineHeight: '1.5', 
                  whiteSpace: 'pre-wrap',
                  fontWeight: 'bold',
                  color: isUser ? '#22c55e' : '#000000' // User = Green Bold, AI = Black Bold
                }}>
                  {msg.text}
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.7rem', color: isUser ? '#166534' : '#666666', marginTop: '8px' }}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
            <div style={{ 
              padding: '10px 16px', 
              backgroundColor: '#FFFFFF', 
              border: '3px solid #b8b8b8', 
              borderRadius: '4px',
              boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
              color: '#000',
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              AuraPulse is smelting data... 🛠️
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        style={{
          backgroundColor: '#3a3a3a', // Smooth Stone Dark Gray
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          borderTop: '4px solid #222222'
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask AuraPulse anything..."
          style={{
            flex: 1,
            padding: '14px 20px',
            borderRadius: '4px', // Minecraft square block style
            border: '3px solid #555555',
            outline: 'none',
            backgroundColor: '#8b8b8b', // Gray Input Capsule
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#ef4444', // Red Bold text when you type!
            boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.4)'
          }}
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          style={{
            padding: '14px 24px',
            borderRadius: '4px',
            backgroundColor: inputValue.trim() ? '#4caf50' : '#555555', // Active Green / Inactive Gray
            color: '#FFFFFF',
            border: '3px solid #2e7d32',
            cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '2px 2px 0px #000',
            textShadow: '1px 1px 0px #000'
          }}
        >
          EXECUTE
        </button>
      </form>
    </div>
  );
};
