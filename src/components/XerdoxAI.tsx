import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Paperclip, Image as ImageIcon, X, MoreVertical, Search, Phone, Video, CheckCheck, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { XerdoxService, Message } from '../services/xerdoxService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const XerdoxAI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Hey Bestie! ⚡ XERDOX AI here. Ravi ne mujhe specially tumhare liye design kiya hai. Math problem ho ya coding, bas pooch lo! Main XERDOX STUDY ka dimaag hoon. 📝✅",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const xerdoxRef = useRef<XerdoxService | null>(null);

  useEffect(() => {
    xerdoxRef.current = new XerdoxService();
    
    // Check if API key is likely missing and show a system message
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "undefined" || apiKey === "") {
      setMessages(prev => [...prev, {
        id: 'system-auth',
        role: 'model',
        text: "⚠️ **System Alert:** Bro, AI Studio ke **Secrets** tab mein `GEMINI_API_KEY` add karna bhool gaye ho shayad. Jab tak key nahi hogi, main reply nahi kar paunga! 🔑⚡",
        timestamp: new Date(),
      }]);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
      image: selectedImage || undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    const responseText = await xerdoxRef.current?.sendMessage(input, selectedImage || undefined);

    const modelMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText || "Sorry, something went wrong.",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-[#0b141a] rounded-2xl overflow-hidden shadow-2xl border border-white/5">
      {/* WhatsApp Header */}
      <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center border border-saffron/30">
            <User className="w-6 h-6 text-saffron" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">XERDOX AI ⚡</h3>
            <p className="text-[#8696a0] text-xs">online</p>
          </div>
        </div>
        <div className="flex items-center gap-5 text-[#aebac1]">
          <Video className="w-5 h-5 cursor-not-allowed opacity-30" />
          <Phone className="w-5 h-5 cursor-not-allowed opacity-30" />
          <div className="w-px h-6 bg-[#3b4a54]" />
          <Search className="w-5 h-5 cursor-pointer hover:text-white" />
          <MoreVertical className="w-5 h-5 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0b141a] relative"
        style={{
          backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
          backgroundSize: '400px',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="flex justify-center mb-6">
          <span className="bg-[#182229] text-[#8696a0] text-[11px] px-3 py-1 rounded-lg uppercase tracking-wider font-medium">
            Today
          </span>
        </div>

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex w-full",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-lg p-2 relative shadow-sm",
                  msg.role === 'user' 
                    ? "bg-[#005c4b] text-white rounded-tr-none" 
                    : "bg-[#202c33] text-[#e9edef] rounded-tl-none"
                )}
              >
                {msg.image && (
                  <img 
                    src={msg.image} 
                    alt="Uploaded" 
                    className="rounded-md mb-2 max-w-full h-auto border border-white/10"
                  />
                )}
                <div className="text-[14.2px] leading-relaxed break-words markdown-body">
                  <ReactMarkdown 
                    remarkPlugins={[remarkMath]} 
                    rehypePlugins={[rehypeKatex]}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-[#8696a0]">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {msg.role === 'user' && (
                    <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                  )}
                </div>
                
                {/* Bubble Tail */}
                <div className={cn(
                  "absolute top-0 w-2 h-3",
                  msg.role === 'user' 
                    ? "-right-2 bg-[#005c4b] [clip-path:polygon(0_0,0_100%,100%_0)]" 
                    : "-left-2 bg-[#202c33] [clip-path:polygon(100%_0,100%_100%,0_0)]"
                )} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#202c33] text-[#e9edef] rounded-lg rounded-tl-none p-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-[#202c33] p-2 flex items-end gap-2">
        <div className="flex items-center gap-2 mb-1 px-2">
          <button className="text-[#8696a0] hover:text-white transition-colors">
            <MoreVertical className="w-6 h-6 rotate-90" />
          </button>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="text-[#8696a0] hover:text-white transition-colors"
          >
            <Paperclip className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 bg-[#2a3942] rounded-lg flex flex-col overflow-hidden">
          {selectedImage && (
            <div className="p-2 bg-[#1f2c33] border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-saffron" />
                <span className="text-xs text-gray-400">Image attached</span>
              </div>
              <button 
                onClick={() => setSelectedImage(null)}
                className="p-1 hover:bg-white/10 rounded-full"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          )}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message"
            className="w-full bg-transparent text-[#e9edef] text-sm py-3 px-4 focus:outline-none resize-none max-h-32 min-h-[44px]"
            rows={1}
          />
        </div>

        <button 
          onClick={handleSend}
          disabled={isLoading || (!input.trim() && !selectedImage)}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all shrink-0 mb-0.5",
            (input.trim() || selectedImage) 
              ? "bg-[#00a884] text-white hover:bg-[#008f72]" 
              : "bg-[#2a3942] text-[#8696a0]"
          )}
        >
          <Send className="w-5 h-5 ml-0.5" />
        </button>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          className="hidden" 
          accept="image/*"
        />
      </div>
    </div>
  );
};
