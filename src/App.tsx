import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { GameCard } from './components/GameCard';
import { ProjectBlueprint } from './ProjectBlueprint';
import { XerdoxAI } from './components/XerdoxAI';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { EarnCoins } from './components/EarnCoins';
import { GAMES, Game } from './constants';
import { ChevronRight, LayoutGrid, List, X, Maximize2, Settings, MessageSquare, Power, ShoppingBag, Coins, PlaySquare, Calendar, Shield, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { MinecraftPlayer } from './components/MinecraftPlayer';

const AppContent = () => {
  const { user, profile, spendCoins } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const categories = ['All', 'Game', 'XERDOX AI'];

  const filteredGames = activeCategory === 'All' 
    ? GAMES 
    : GAMES.filter(g => g.category === activeCategory);

  const handleStartSession = async () => {
    if (!selectedGame) return;
    
    if (selectedGame.isFree) {
      setSessionStarted(true);
      return;
    }

    if (!user) {
      alert("Please sign in to play premium games!");
      return;
    }

    const discountedPrice = selectedGame.discount 
      ? selectedGame.price * (1 - selectedGame.discount / 100) 
      : selectedGame.price;

    const success = await spendCoins(discountedPrice);
    if (success) {
      setSessionStarted(true);
    } else {
      alert(`Not enough GHI Coins! You need ${discountedPrice} coins to play this game.`);
    }
  };

  const closeGame = () => {
    setSelectedGame(null);
    setSessionStarted(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AuthModal />
      
      <main className="flex-1 max-w-[1600px] mx-auto w-full px-6 py-8">
        {/* Hero Section */}
        {activeCategory !== 'XERDOX AI' && activeCategory !== 'Admin Panel' && activeCategory !== 'Earn Coins' && (
          <>
            <section className="mb-16">
              <HeroSlider />
            </section>

            {/* Featured XERDOX AI Section */}
            {activeCategory === 'All' && (
              <section className="mb-16">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/20 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-3xl -mr-32 -mt-32 rounded-full" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 blur-3xl -ml-32 -mb-32 rounded-full" />
                  
                  <div className="relative z-10 flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-bold mb-6 border border-purple-500/30">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                      NEW FEATURE
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                      Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">XERDOX AI</span>
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-xl leading-relaxed">
                      Your high-performance academic and utility assistant. Solve complex math, code faster, and learn anything in seconds.
                    </p>
                    <button 
                      onClick={() => setActiveCategory('XERDOX AI')}
                      className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-purple-600/20 flex items-center gap-3 mx-auto md:mx-0"
                    >
                      <div className="w-5 h-5 bg-white/20 rounded flex items-center justify-center">
                        <span className="text-[10px] font-black">X</span>
                      </div>
                      CHAT WITH XERDOX
                    </button>
                  </div>

                  <div className="relative z-10 w-full md:w-1/3 aspect-square max-w-[300px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl rotate-6 opacity-20" />
                    <div className="absolute inset-0 bg-[#0b141a] rounded-3xl border border-purple-500/30 shadow-2xl flex flex-col p-4">
                      <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <span className="text-[10px] text-purple-400 font-bold">X</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400">XERDOX AI</span>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-[#202c33] p-2 rounded-lg rounded-tl-none text-[10px] text-gray-300 w-4/5">
                          Hey bestie! Need help with math? ⚡
                        </div>
                        <div className="bg-[#005c4b] p-2 rounded-lg rounded-tr-none text-[10px] text-white w-4/5 ml-auto">
                          Solve {'$\\int x^2 dx$'}
                        </div>
                        <div className="bg-[#202c33] p-2 rounded-lg rounded-tl-none text-[10px] text-gray-300 w-4/5">
                          Sure! The answer is {'$\\frac{x^3}{3} + C$'} ✅
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
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
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Economy</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveCategory('Earn Coins')}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeCategory === 'Earn Coins' 
                      ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Coins className="w-4 h-4" /> Earn GHI Coins
                </button>
                
                {(profile?.role === 'owner' || profile?.role === 'manager') && (
                  <button
                    onClick={() => setActiveCategory('Admin Panel')}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 mt-2 ${
                      activeCategory === 'Admin Panel' 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Shield className="w-4 h-4" /> Admin Panel
                  </button>
                )}
              </div>
            </div>

            <div>
              {activeCategory !== 'XERDOX AI' && activeCategory !== 'Admin Panel' && activeCategory !== 'Earn Coins' && (
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
            {activeCategory === 'Admin Panel' ? (
              <AdminDashboard />
            ) : activeCategory === 'Earn Coins' ? (
              <EarnCoins />
            ) : activeCategory === 'XERDOX AI' ? (
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
            <a href="#" className="hover:text-saffron transition-colors">Cookie Settings</a>
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
                  onClick={closeGame}
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
                  onClick={closeGame}
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
                className={selectedGame.id === 'minecraft-web' && sessionStarted ? "absolute inset-0 bg-black z-50" : "relative w-full max-w-5xl aspect-video bg-black rounded-xl shadow-2xl border border-white/10 overflow-hidden"}
              >
                {/* Simulated Game Loading */}
                {!sessionStarted ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-epic-black">
                    <div className="w-16 h-16 border-4 border-saffron border-t-transparent rounded-full animate-spin mb-6" />
                    <h3 className="text-xl font-bold mb-2">Initializing {selectedGame.category}...</h3>
                    <p className="text-gray-500 text-sm animate-pulse">Optimizing for your browser via WebAssembly</p>
                    <div className="absolute inset-0 opacity-0 animate-[fadeIn_1s_ease-in_2s_forwards]">
                      <img src={selectedGame.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center">
                          <h2 className="text-4xl font-black mb-4">{selectedGame.title}</h2>
                          {!selectedGame.isFree && (
                            <div className="mb-6 flex items-center justify-center gap-2 text-yellow-400 font-bold bg-yellow-400/10 px-4 py-2 rounded-full inline-flex">
                              <Coins className="w-5 h-5" />
                              {selectedGame.discount 
                                ? selectedGame.price * (1 - selectedGame.discount / 100) 
                                : selectedGame.price} GHI Coins / Session
                            </div>
                          )}
                          <button 
                            onClick={handleStartSession}
                            className="bg-saffron text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform block mx-auto"
                          >
                            START SESSION
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : selectedGame.id === 'minecraft-web' ? (
                  <MinecraftPlayer onExit={closeGame} />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-epic-black">
                    <img src={selectedGame.image} className="w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <h2 className="text-4xl font-black mb-4 text-saffron">SESSION ACTIVE</h2>
                      <p className="text-gray-300">The game is now running in the browser.</p>
                    </div>
                  </div>
                )}
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

      {/* Floating Badge */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group cursor-pointer" onClick={() => setActiveCategory('XERDOX AI')}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          
          <div className="relative flex items-center bg-[#1a1a1a] px-6 py-3 rounded-full leading-none">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-6 h-6 text-yellow-400 animate-bounce" />
              <span className="text-gray-100 font-bold tracking-wide">XERDOX AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}


