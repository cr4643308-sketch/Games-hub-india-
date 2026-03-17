import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { GameCard } from './components/GameCard';
import { ProjectBlueprint } from './ProjectBlueprint';
import { XerdoxAI } from './components/XerdoxAI';
import { GAMES, Game } from './constants';
import { ChevronRight, LayoutGrid, List, X, Maximize2, Settings, MessageSquare, Power, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const categories = ['All', 'Game', 'AI Tool', 'Productivity', 'XERDOX AI'];

  const filteredGames = activeCategory === 'All' 
    ? GAMES 
    : GAMES.filter(g => g.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-[1600px] mx-auto w-full px-6 py-8">
        {/* Hero Section */}
        {activeCategory !== 'XERDOX AI' && (
          <section className="mb-16">
            <HeroSlider />
          </section>
        )}

        {/* Store Navigation */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Browse</h3>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === cat 
                        ? 'bg-white/10 text-saffron' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {cat === 'XERDOX AI' ? '⚡ XERDOX AI' : `${cat}s`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              {activeCategory !== 'XERDOX AI' && (
                <>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Filters</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                      <input type="checkbox" className="rounded border-white/10 bg-epic-gray text-saffron focus:ring-saffron" />
                      Free to Play
                    </label>
                    <label className="flex items-center gap-3 text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                      <input type="checkbox" className="rounded border-white/10 bg-epic-gray text-saffron focus:ring-saffron" />
                      On Sale
                    </label>
                    <label className="flex items-center gap-3 text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                      <input type="checkbox" className="rounded border-white/10 bg-epic-gray text-saffron focus:ring-saffron" />
                      New Releases
                    </label>
                  </div>
                </>
              )}
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1">
            {activeCategory === 'XERDOX AI' ? (
              <div className="space-y-8">
                <div className="flex flex-col items-center text-center mb-12">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-saffron/10 rounded-3xl flex items-center justify-center mb-6 border border-saffron/20"
                  >
                    <MessageSquare className="w-10 h-10 text-saffron" />
                  </motion.div>
                  <h2 className="text-4xl font-black mb-4">XERDOX <span className="text-saffron">STUDY</span> AI</h2>
                  <p className="text-gray-400 max-w-lg">
                    The world's most advanced study-buddy AI. Solve math, code, and learn complex concepts in seconds. ⚡
                  </p>
                </div>
                <XerdoxAI />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold">Trending in <span className="text-saffron">India</span></h2>
                    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
                      <button className="p-1.5 bg-white/10 rounded shadow-sm"><LayoutGrid className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-500 hover:text-white"><List className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <button className="text-sm font-bold flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                    VIEW ALL <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {filteredGames.length > 0 ? (
                    filteredGames.map(game => (
                      <motion.div
                        key={game.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedGame(game)}
                      >
                        <GameCard game={game} />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center glass-panel rounded-2xl">
                      <p className="text-gray-500">No items found in this category.</p>
                    </div>
                  )}
                </div>

                {/* Free Games Section */}
                <section className="mt-20">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-saffron/10 rounded-xl flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-saffron" />
                    </div>
                    <h2 className="text-2xl font-bold">Free Games Weekly</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="glass-panel aspect-video rounded-2xl flex flex-col items-center justify-center text-gray-500 border-dashed border-2">
                      <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                      <p className="font-medium">New free games coming soon</p>
                    </div>
                    <div className="glass-panel aspect-video rounded-2xl flex flex-col items-center justify-center text-gray-500 border-dashed border-2">
                      <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                      <p className="font-medium">Stay tuned for updates</p>
                    </div>
                  </div>
                </section>

                {/* Blueprint Section */}
                <ProjectBlueprint />
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-epic-gray mt-20 py-12 px-6">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-saffron rounded-lg flex items-center justify-center font-bold text-black">G</div>
            <span className="font-bold text-lg tracking-tighter">GAMES HUB <span className="text-saffron">INDIA</span></span>
          </div>
          <div className="flex gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
          <p className="text-xs text-gray-500">© 2026 Games Hub India. All rights reserved.</p>
        </div>
      </footer>

      {/* Player Overlay */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col"
          >
            {/* Player Header */}
            <div className="h-14 bg-epic-black/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="h-4 w-px bg-white/10" />
                <span className="font-bold text-sm">{selectedGame.title}</span>
                <span className="text-[10px] bg-saffron/20 text-saffron px-1.5 py-0.5 rounded font-bold uppercase">Live</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                  <MessageSquare className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                  <Settings className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                  <Maximize2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="ml-4 bg-red-500/10 text-red-500 px-4 py-1.5 rounded font-bold text-xs flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all"
                >
                  <Power className="w-3 h-3" />
                  EXIT
                </button>
              </div>
            </div>

            {/* Game Canvas / Iframe Area */}
            <div className="flex-1 relative bg-epic-black flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <img src={selectedGame.image} className="w-full h-full object-cover blur-3xl" referrerPolicy="no-referrer" />
              </div>
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-full max-w-5xl aspect-video bg-black rounded-xl shadow-2xl border border-white/10 overflow-hidden"
              >
                {/* Simulated Game Loading */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-epic-black">
                  <div className="w-16 h-16 border-4 border-saffron border-t-transparent rounded-full animate-spin mb-6" />
                  <h3 className="text-xl font-bold mb-2">Initializing {selectedGame.category}...</h3>
                  <p className="text-gray-500 text-sm animate-pulse">Optimizing for your browser via WebAssembly</p>
                </div>
                
                {/* Simulated Game Content */}
                <div className="absolute inset-0 opacity-0 animate-[fadeIn_1s_ease-in_2s_forwards]">
                  <img src={selectedGame.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center">
                      <h2 className="text-4xl font-black mb-4">{selectedGame.title}</h2>
                      <button className="bg-saffron text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                        START SESSION
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Player Footer */}
            <div className="h-12 bg-epic-black/80 backdrop-blur-md border-t border-white/10 px-6 flex items-center justify-between text-[10px] text-gray-500 font-medium">
              <div className="flex gap-6">
                <span>LATENCY: 12ms</span>
                <span>FPS: 60</span>
                <span>ENGINE: WASM/WebGL2</span>
              </div>
              <div className="flex gap-4">
                <span>REGION: ASIA-SOUTH-1 (MUMBAI)</span>
                <span className="text-green-500">STABLE CONNECTION</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


