import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Server, Monitor, Cpu } from 'lucide-react';
import { GAMES } from '../constants';

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const featured = GAMES.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (featured.length === 0) {
    return (
      <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-epic-gray flex items-center justify-center border border-white/5">
        <div className="text-center">
          <h2 className="text-3xl font-black mb-2 text-gray-700">GAMES HUB INDIA</h2>
          <p className="text-gray-500">Coming soon to your browser</p>
        </div>
      </div>
    );
  }

  const isMinecraft = featured[current].id === 'minecraft-web';

  return (
    <div className="relative w-full rounded-2xl overflow-hidden group min-h-[600px] border border-white/10 shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 flex"
        >
          {/* Background Layer */}
          <div className="absolute inset-0 z-0">
            {isMinecraft ? (
              <div className="w-full h-full bg-[#1a0b2e] relative overflow-hidden">
                {/* Animated Purple End Dimension / Sunset Vibe */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#2d1b4e] via-[#1a0b2e] to-[#0d0514] opacity-90" />
                
                {/* Floating Particles/Blocks */}
                <div className="absolute inset-0 opacity-30">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 bg-purple-500/40 border border-purple-400/50 rounded-sm"
                      initial={{ 
                        y: '100%', 
                        x: `${Math.random() * 100}%`,
                        rotate: 0,
                        opacity: Math.random() * 0.5 + 0.2
                      }}
                      animate={{ 
                        y: '-20%', 
                        rotate: 360,
                        opacity: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: Math.random() * 10 + 10, 
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                      }}
                    />
                  ))}
                </div>
                
                {/* Subtle Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                
                {/* Glowing Orbs */}
                <motion.div 
                  className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px]"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[100px]"
                  animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
              </div>
            ) : (
              <>
                <img 
                  src={featured[current].image} 
                  alt={featured[current].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-epic-black via-epic-black/60 to-transparent" />
              </>
            )}
          </div>
          
          {/* Content Layer - Epic Games Style Split Layout */}
          <div className="relative z-10 w-full flex flex-col md:flex-row h-full">
            
            {/* Left Side: Game Info & CTA */}
            <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {isMinecraft ? (
                  <>
                    <span className="inline-block bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                      Latest Web Edition (1.21.6 Experience)
                    </span>
                    
                    {/* High Quality Logo Placeholder (Using Text for now, but styled like a logo) */}
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-100 to-gray-400 drop-shadow-2xl" style={{ fontFamily: '"Minecraft", "Courier New", monospace' }}>
                      MINECRAFT
                    </h1>
                    
                    <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl font-medium">
                      Experience infinite world-building, intense survival mode, and boundless creative freedom. The legendary sandbox game, now optimized for seamless browser play. No downloads required.
                    </p>
                  </>
                ) : (
                  <>
                    <span className="text-neon-blue font-bold text-sm tracking-widest uppercase mb-4 block">Featured Release</span>
                    <h1 className="text-6xl font-black mb-4 leading-tight">{featured[current].title}</h1>
                    <p className="text-gray-300 text-lg mb-8 line-clamp-2">
                      Experience the next generation of {featured[current].category.toLowerCase()} directly in your browser. No downloads, just pure performance.
                    </p>
                  </>
                )}
                
                <div className="flex flex-wrap items-center gap-4 mb-12">
                  <button className={`text-black px-10 py-5 rounded-lg font-black text-lg flex items-center gap-3 transition-all hover:scale-105 shadow-xl ${isMinecraft ? 'bg-purple-500 hover:bg-purple-400 text-white shadow-purple-500/20' : 'bg-white hover:bg-neon-blue'}`}>
                    <Play className={`w-6 h-6 ${isMinecraft ? 'fill-white' : 'fill-current'}`} />
                    PLAY NOW
                  </button>
                  <button className="bg-black/40 backdrop-blur-md border border-white/10 px-8 py-5 rounded-lg font-bold hover:bg-white/10 transition-colors">
                    ADD TO WISHLIST
                  </button>
                </div>

                {/* Technical Specs / Controls Section (Epic Games Style) */}
                {isMinecraft && (
                  <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                    <div>
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Monitor className="w-4 h-4" /> System Requirements
                      </h3>
                      <ul className="text-sm text-gray-400 space-y-2">
                        <li><span className="text-gray-300">OS:</span> Any Modern Browser</li>
                        <li><span className="text-gray-300">RAM:</span> 4GB+ Recommended</li>
                        <li><span className="text-gray-300">Engine:</span> WebAssembly / WebGL2</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Cpu className="w-4 h-4" /> Controls
                      </h3>
                      <ul className="text-sm text-gray-400 space-y-2">
                        <li><span className="text-gray-300">WASD:</span> Move</li>
                        <li><span className="text-gray-300">Space:</span> Jump</li>
                        <li><span className="text-gray-300">Left/Right Click:</span> Mine/Place</li>
                      </ul>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right Side: Visual Showcase */}
            {isMinecraft && (
              <div className="hidden md:flex w-5/12 relative items-center justify-center p-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="relative w-full aspect-[3/4] max-w-md rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30"
                  style={{ perspective: 1000 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Minecraft Gameplay" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded">MULTIPLAYER</span>
                      <span className="bg-white/20 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded">SURVIVAL</span>
                    </div>
                    <p className="text-sm text-gray-300 font-medium">Join thousands of players in the ultimate web sandbox.</p>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        {featured.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              current === idx ? 'w-8 bg-white' : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
