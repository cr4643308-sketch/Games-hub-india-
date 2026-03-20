import React from 'react';
import { motion } from 'motion/react';
import { Play, Circle } from 'lucide-react';

const GAMES = [
  { id: 1, title: 'Minecraft Enhanced', image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Xerdox AI', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-[#050505]/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center font-black text-black shadow-[0_0_15px_rgba(0,255,255,0.5)]">
              GHI
            </div>
            <span className="font-black text-2xl tracking-tighter">
              GAMES HUB <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">INDIA</span>
            </span>
          </div>
          
          <div className="relative group cursor-default">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
            <div className="relative flex items-center bg-[#0a0a0a] px-5 py-2 rounded-full border border-yellow-500/50">
              <span className="text-yellow-400 font-bold text-sm tracking-widest uppercase" style={{ textShadow: '0 0 10px rgba(250,204,21,0.5)' }}>
                Founder: RAVI
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-6 pt-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 drop-shadow-[0_0_25px_rgba(0,255,255,0.4)]"
          >
            GAMES HUB INDIA
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto"
          >
            The Ultimate Destination for AI-Hosted Games.
          </motion.p>
        </section>

        {/* Innovators/Team Section */}
        <section className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="relative group w-full max-w-md"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-600" />
              
              <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs font-bold tracking-widest text-gray-400 mb-6 border border-white/10">
                INNOVATOR
              </div>
              
              <h2 className="text-4xl font-black mb-2 flex flex-col items-center justify-center">
                <span className="text-gray-500 text-lg tracking-widest mb-1">FOUNDER - RAVI</span>
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 font-black tracking-tighter mt-2 text-5xl" style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
                  RAVI
                  {/* Glitch effect layers */}
                  <span className="absolute top-0 left-0 -ml-0.5 text-cyan-400 opacity-70 mix-blend-screen animate-[glitch_3s_infinite_linear_alternate-reverse] pointer-events-none" aria-hidden="true">RAVI</span>
                  <span className="absolute top-0 left-0 ml-0.5 text-purple-500 opacity-70 mix-blend-screen animate-[glitch_2s_infinite_linear_alternate-reverse] pointer-events-none" aria-hidden="true">RAVI</span>
                </span>
              </h2>
              
              <div className="mt-6 inline-block bg-cyan-500/10 border border-cyan-500/30 px-4 py-1.5 rounded-full">
                <span className="text-cyan-400 text-sm font-bold tracking-wide">
                  Professional 3D Programmer
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Games Grid */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-black text-white">Featured <span className="text-purple-500">Games</span></h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GAMES.map((game, i) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                  <img 
                    src={game.image} 
                    alt={game.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    <Circle className="w-2 h-2 fill-green-500 text-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Server Online</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-6 text-white group-hover:text-cyan-400 transition-colors">
                    {game.title}
                  </h3>
                  
                  <button className="w-full relative overflow-hidden rounded-xl bg-white/5 border border-white/10 py-3 font-bold text-sm tracking-widest transition-all duration-300 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center justify-center gap-2 text-gray-300 group-hover:text-white transition-colors">
                      <Play className="w-4 h-4" />
                      PLAY NOW
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}