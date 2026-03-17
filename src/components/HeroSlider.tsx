import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { GAMES } from '../constants';

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const featured = GAMES.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img 
            src={featured[current].image} 
            alt={featured[current].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-epic-black via-epic-black/40 to-transparent" />
          
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-12 max-w-xl">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-saffron font-bold text-sm tracking-widest uppercase mb-4 block">Featured Release</span>
              <h1 className="text-6xl font-black mb-4 leading-tight">{featured[current].title}</h1>
              <p className="text-gray-300 text-lg mb-8 line-clamp-2">
                Experience the next generation of {featured[current].category.toLowerCase()} directly in your browser. No downloads, just pure performance.
              </p>
              
              <div className="flex items-center gap-4">
                <button className="bg-white text-black px-8 py-4 rounded font-bold flex items-center gap-2 hover:bg-saffron transition-colors">
                  <Play className="w-5 h-5 fill-current" />
                  PLAY NOW
                </button>
                <button className="bg-white/10 backdrop-blur-md border border-white/10 px-8 py-4 rounded font-bold hover:bg-white/20 transition-colors">
                  ADD TO WISHLIST
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 right-8 flex gap-2">
        {featured.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              current === idx ? 'w-8 bg-saffron' : 'w-4 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
