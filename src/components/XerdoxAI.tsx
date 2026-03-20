import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Paperclip, Image as ImageIcon, X, Sparkles, User, Bot, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { XerdoxService, Message } from '../services/xerdoxService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface XerdoxAIProps {
  onClose: () => void;
}

export const XerdoxAI = ({ onClose }: XerdoxAIProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello! I'm XERDOX AI. How can I help you today?",
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
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[100] flex flex-col w-full h-full bg-[#0a0a0a] overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02] backdrop-blur-xl z-10 absolute top-0 left-0 right-0">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 px-3 py-1.5 rounded-lg transition-colors">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            XERDOX <span className="text-purple-400">AI</span>
          </h3>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMessages([{
              id: Date.now().toString(),
              role: 'model',
              text: "Hello! I'm XERDOX AI. How can I help you today?",
              timestamp: new Date(),
            }])}
            className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            Clear Chat
          </button>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors border border-red-500/20"
            title="Exit Xerdox AI"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 pt-24 pb-32 space-y-8 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex w-full gap-4 max-w-3xl mx-auto",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={cn(
                  "relative max-w-[80%]",
                  msg.role === 'user' 
                    ? "bg-[#1a1a1a] border border-white/10 text-white rounded-2xl rounded-tr-sm px-5 py-3.5 shadow-lg" 
                    : "text-gray-200 pt-1"
                )}
              >
                {msg.image && (
                  <img 
                    src={msg.image} 
                    alt="Uploaded" 
                    className="rounded-xl mb-3 max-w-full h-auto border border-white/10 shadow-md"
                  />
                )}
                <div className={cn(
                  "text-[15px] leading-relaxed break-words markdown-body",
                  msg.role === 'model' && "prose prose-invert max-w-none"
                )}>
                  <ReactMarkdown 
                    remarkPlugins={[remarkMath]} 
                    rehypePlugins={[rehypeKatex]}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1 border border-white/20">
                  <User className="w-4 h-4 text-gray-300" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex w-full gap-4 max-w-3xl mx-auto justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div className="pt-2 flex gap-1.5 items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent pt-12">
        <div className="max-w-3xl mx-auto relative">
          {selectedImage && (
            <div className="absolute bottom-full mb-4 left-0 p-2 bg-[#1a1a1a] border border-white/10 rounded-xl flex items-center gap-3 shadow-xl">
              <div className="w-10 h-10 rounded-lg bg-black/50 overflow-hidden flex items-center justify-center">
                <img src={selectedImage} alt="Preview" className="w-full h-full object-cover opacity-80" />
              </div>
              <span className="text-xs text-gray-400 font-medium pr-2">Image attached</span>
              <button 
                onClick={() => setSelectedImage(null)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors mr-1"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          )}
          
          <div className="relative flex items-end gap-2 bg-[#1a1a1a] border border-white/10 rounded-2xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] focus-within:border-purple-500/50 focus-within:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-300">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors shrink-0"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Message Xerdox AI..."
              className="flex-1 bg-transparent text-white text-[15px] py-3 px-2 focus:outline-none resize-none max-h-48 min-h-[44px] placeholder-gray-500"
              rows={1}
            />

            <button 
              onClick={handleSend}
              disabled={isLoading || (!input.trim() && !selectedImage)}
              className={cn(
                "p-3 rounded-xl flex items-center justify-center transition-all shrink-0",
                (input.trim() || selectedImage) 
                  ? "bg-white text-black hover:bg-gray-200 shadow-md" 
                  : "bg-white/5 text-gray-500"
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-center mt-3">
            <p className="text-[11px] text-gray-500">Xerdox AI can make mistakes. Consider verifying important information.</p>
          </div>
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          className="hidden" 
          accept="image/*"
        />
      </div>
    </motion.div>
  );
};
