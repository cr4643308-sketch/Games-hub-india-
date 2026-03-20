import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { GameCard } from './components/GameCard';
import { ProjectBlueprint } from './ProjectBlueprint';
import { XerdoxAI } from './components/XerdoxAI';
import { ApplicationBeta } from './components/ApplicationBeta';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { EarnCoins } from './components/EarnCoins';
import { GAMES, Game } from './constants';
import { ChevronRight, LayoutGrid, List, X, Maximize2, Settings, MessageSquare, Power, ShoppingBag, Coins, PlaySquare, Calendar, Shield, Sparkles, Search, Users, Sword, Zap, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { MinecraftPlayer } from './components/MinecraftPlayer';

const AppContent = () => {
  const { user, profile, spendCoins } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const categories = ['All', 'Action', 'RPG', 'Indie'];

  const filteredGames = GAMES.filter(g => {
    const matchesCategory = activeCategory === 'All' || g.category === activeCategory;
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results = [];
    
    // Check Xerdox AI
    if ('xerdox ai study'.includes(query)) {
      results.push({
        type: 'ai',
        title: 'XERDOX STUDY AI',
        description: 'Advanced study-buddy AI',
        icon: <Zap className="w-6 h-6 text-neon-purple" />
      });
    }

    // Check Earn Coins
    if ('earn coins rewards money'.includes(query)) {
      results.push({
        type: 'earn',
        title: 'Earn Coins',
        description: 'Watch ads and complete tasks to earn GHI Coins',
        icon: <Coins className="w-6 h-6 text-yellow-400" />
      });
    }

    // Check Admin Panel
    if ('admin panel dashboard settings'.includes(query)) {
      results.push({
        type: 'admin',
        title: 'Admin Panel',
        description: 'Manage games, users, and platform settings',
        icon: <Shield className="w-6 h-6 text-red-500" />
      });
    }
    
    // Check Games
    GAMES.forEach(g => {
      if (g.title.toLowerCase().includes(query) || g.category.toLowerCase().includes(query) || g.tags.some(t => t.toLowerCase().includes(query))) {
        results.push({
          type: 'game',
          game: g,
          title: g.title,
          description: `${g.category} • ${g.isFree ? 'Free' : `${g.price} GHI`}`,
          icon: <Gamepad2 className="w-6 h-6 text-neon-blue" />
        });
      }
    });
    
    return results;
  }, [searchQuery]);

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
            <section className="mb-16 relative rounded-3xl overflow-hidden bg-cyber-dark border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10" />
              
              <div className="relative z-10 px-8 py-24 md:py-32 flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.h1 
                    animate={{ 
                      rotateX: [10, -5, 10],
                      rotateY: [-5, 5, -5],
                      y: [-5, 5, -5]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_30px_rgba(0,240,255,0.5)]" 
                    style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                  >
                    GAMES HUB INDIA
                  </motion.h1>
                </motion.div>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl md:text-2xl text-gray-300 font-medium mb-12 max-w-2xl"
                >
                  The ultimate nexus for high-performance gaming and next-gen experiences.
                </motion.p>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="w-full max-w-2xl relative group"
                >
                  {/* Glowing Background Blur */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-neon-blue rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                  
                  {/* Search Box Container */}
                  <div className="relative flex items-center bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-full p-2 shadow-[0_0_40px_rgba(139,92,246,0.1)]">
                    <div className="pl-5 pr-3 flex items-center justify-center">
                      <Search className="w-6 h-6 text-purple-400 group-focus-within:text-neon-blue transition-colors duration-300" />
                    </div>
                    
                    <input 
                      type="text" 
                      placeholder="Search for hosted games, servers, or tools..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                      className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:outline-none px-2 py-3 text-lg font-medium w-full"
                    />
                    
                    <button className="relative overflow-hidden rounded-full px-8 py-3 font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300 transform hover:scale-105 group/btn">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-neon-blue opacity-90 group-hover/btn:opacity-100 transition-opacity" />
                      <span className="relative z-10 tracking-wider">FIND</span>
                    </button>
                  </div>

                  {/* Search Results Dropdown */}
                  <AnimatePresence>
                    {isSearchFocused && searchQuery.trim().length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-4 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(139,92,246,0.15)] overflow-hidden z-50 max-h-96 overflow-y-auto"
                      >
                        {searchResults.length > 0 ? (
                          searchResults.map((result, idx) => (
                            <div
                              key={idx}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                if (result.type === 'ai') {
                                  setActiveCategory('XERDOX AI');
                                } else if (result.type === 'game' && result.game) {
                                  setSelectedGame(result.game);
                                } else if (result.type === 'earn') {
                                  setActiveCategory('Earn Coins');
                                } else if (result.type === 'admin') {
                                  setActiveCategory('Admin Panel');
                                }
                                setSearchQuery('');
                                setIsSearchFocused(false);
                              }}
                              className="flex items-center gap-4 p-4 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-none"
                            >
                              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                {result.icon}
                              </div>
                              <div>
                                <h4 className="text-white font-bold">{result.title}</h4>
                                <p className="text-gray-400 text-sm">{result.description}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-6 text-center text-gray-400">
                            No results found for "{searchQuery}"
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </section>

            {/* Founder Section */}
            {activeCategory === 'All' && (
              <section className="mb-16">
                <div className="relative overflow-hidden rounded-3xl bg-epic-gray border border-white/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-3xl rounded-full" />
                  <div className="relative z-10 flex-1">
                    <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold mb-4 border border-yellow-500/20">
                      <Users className="w-4 h-4" />
                      INNOVATORS
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-300">
                      Visionary Leadership
                    </h2>
                    <p className="text-gray-400 max-w-xl">
                      Pushing the boundaries of web-based gaming and community experiences. Join us in building the future of interactive entertainment.
                    </p>
                  </div>
                  <div className="relative z-10 flex flex-col items-center md:items-end">
                    <div className="glitch-wrapper">
                      <div className="glitch text-4xl md:text-6xl" data-text="FOUNDER - RAVI">
                        FOUNDER - RAVI
                      </div>
                    </div>
                    <div className="mt-4 text-neon-blue font-mono text-sm tracking-widest uppercase flex items-center gap-2">
                      <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                      System Architect
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Application Beta Section */}
            {activeCategory === 'All' && (
              <section className="mb-16">
                <div className="relative overflow-hidden rounded-3xl bg-epic-black border border-neon-purple/30 p-8 md:p-12 flex flex-col items-center justify-center text-center neon-glow-purple">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-transparent" />
                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
                      JOIN THE ELITE RANKS
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                      Apply now for the exclusive Application Beta and get early access to our premium servers and features.
                    </p>
                    <button 
                      onClick={() => setShowApplication(true)}
                      className="relative group overflow-hidden rounded-full px-12 py-5 font-black text-xl text-white shadow-[0_0_30px_rgba(176,38,255,0.3)] hover:shadow-[0_0_50px_rgba(0,240,255,0.5)] transition-all duration-500 transform hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-purple bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                      <span className="relative z-10 tracking-wider text-white drop-shadow-md">
                        FILL APPLICATION
                      </span>
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Our AI's Section */}
            {activeCategory === 'All' && (
              <section className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold">Our <span className="text-neon-purple">AI's</span></h2>
                  </div>
                </div>
                <div className="flex gap-6">
                  {/* Xerdox AI Small Square Box */}
                  <div 
                    onClick={() => setActiveCategory('XERDOX AI')}
                    className="w-24 h-24 bg-[#1a1a1a] border border-neon-purple/30 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all group relative overflow-hidden shadow-[0_0_15px_rgba(176,38,255,0.15)] hover:shadow-[0_0_25px_rgba(176,38,255,0.3)]"
                    title="Open Xerdox AI"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <X className="w-8 h-8 text-neon-purple mb-1 group-hover:animate-pulse" />
                    <span className="text-[10px] font-bold text-white tracking-widest">XERDOX</span>
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
            <div className="glass-panel p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Network Status</h3>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-black text-neon-blue">24,812</div>
                  <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">Online Players</div>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <div className="text-xl font-bold text-white">12ms</div>
                  <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">Avg Latency</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Categories</h3>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${
                      activeCategory === cat 
                        ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {cat === 'Action' && <Sword className="w-4 h-4" />}
                      {cat === 'RPG' && <Shield className="w-4 h-4" />}
                      {cat === 'Indie' && <Gamepad2 className="w-4 h-4" />}
                      {cat === 'All' && <LayoutGrid className="w-4 h-4" />}
                      {cat}
                    </span>
                    {activeCategory === cat && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Economy & Admin</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveCategory('Earn Coins')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                    activeCategory === 'Earn Coins' 
                      ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.1)]' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <Coins className="w-4 h-4" /> Earn GHI Coins
                </button>
                
                {(profile?.role === 'owner' || profile?.role === 'manager') && (
                  <button
                    onClick={() => setActiveCategory('Admin Panel')}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 mt-2 ${
                      activeCategory === 'Admin Panel' 
                        ? 'bg-red-500/10 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                    }`}
                  >
                    <Shield className="w-4 h-4" /> Admin Panel
                  </button>
                )}
              </div>
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
                    className="w-20 h-20 bg-neon-purple/10 rounded-3xl flex items-center justify-center mb-6 border border-neon-purple/30 neon-glow-purple"
                  >
                    <Zap className="w-10 h-10 text-neon-purple" />
                  </motion.div>
                  <h2 className="text-4xl font-black mb-4">XERDOX <span className="text-neon-purple">STUDY</span> AI</h2>
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
                    <h2 className="text-2xl font-bold">Available <span className="text-neon-blue">Servers</span></h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <p className="text-gray-500">No games found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-epic-gray mt-20 py-12 px-6 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neon-blue rounded-lg flex items-center justify-center font-bold text-black">G</div>
            <span className="font-bold text-lg tracking-tighter">GAMES HUB <span className="text-neon-blue">INDIA</span></span>
          </div>
          <div className="flex gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-neon-blue transition-colors">Cookie Settings</a>
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
                <span className="text-[10px] bg-neon-blue/20 text-neon-blue px-1.5 py-0.5 rounded font-bold uppercase">Live</span>
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
                    <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin mb-6" />
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
                            className="bg-neon-blue text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform block mx-auto"
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
                      <h2 className="text-4xl font-black mb-4 text-neon-blue">SESSION ACTIVE</h2>
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

      {/* Application Beta Modal */}
      <AnimatePresence>
        {showApplication && (
          <ApplicationBeta onClose={() => setShowApplication(false)} />
        )}
      </AnimatePresence>
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
