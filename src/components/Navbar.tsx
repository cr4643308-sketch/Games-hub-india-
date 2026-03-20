import React from 'react';
import { Search, User, Globe, LogOut, Coins, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';

export const Navbar = () => {
  const { user, profile, isGuest, loginWithGoogle, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-epic-black/95 backdrop-blur-sm border-b border-white/5 px-6 py-4">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-neon-blue rounded-lg flex items-center justify-center font-bold text-black shadow-[0_0_15px_rgba(0,240,255,0.5)]">G</div>
              <span className="font-bold text-xl tracking-tighter">GAMES HUB <span className="text-neon-blue drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">INDIA</span></span>
            </div>
            <div className="flex items-center gap-1 mt-0.5 ml-1">
              <div className="w-3 h-3 bg-neon-purple rounded-sm flex items-center justify-center shadow-[0_0_10px_rgba(176,38,255,0.5)]">
                <span className="text-[8px] font-black text-white">X</span>
              </div>
              <span className="text-[9px] font-bold text-neon-purple tracking-[0.2em] uppercase drop-shadow-[0_0_5px_rgba(176,38,255,0.5)]">XERDOX AI</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="text-white hover:text-neon-blue transition-colors">STORE</a>
            <a href="#" className="hover:text-neon-blue transition-colors">DISTRIBUTION</a>
            <a href="#" className="hover:text-neon-blue transition-colors">SUPPORT</a>
            <a href="#" className="hover:text-neon-blue transition-colors">UNREAL ENGINE</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search store"
              className="bg-epic-gray border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue transition-all text-white placeholder-gray-500"
            />
          </div>
          
          <div className="flex items-center gap-2">
            {/* GHI Coins Display - Top Right */}
            {user && profile && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 animate-pulse px-4 py-2 rounded-full border border-neon-blue/30 shadow-[0_0_15px_rgba(0,240,255,0.2)] mr-4"
              >
                <Coins className="w-5 h-5 text-neon-blue" />
                <span className="text-white font-bold text-sm tracking-wider">
                  {profile.ghiCoins.toLocaleString()} GHI
                </span>
                {profile.role !== 'user' && (
                  <span className="ml-2 text-[10px] bg-neon-purple/30 px-2 py-0.5 rounded-full text-white font-bold uppercase flex items-center gap-1 border border-neon-purple/50">
                    <Shield className="w-3 h-3" />
                    {profile.role}
                  </span>
                )}
              </motion.div>
            )}

            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <Globe className="w-5 h-5 text-gray-400 hover:text-neon-blue" />
            </button>
            
            {user ? (
              <div className="flex items-center gap-3 ml-2">
                <img src={user.photoURL || ''} alt="Profile" className="w-8 h-8 rounded-full border border-neon-blue/50 shadow-[0_0_10px_rgba(0,240,255,0.3)]" referrerPolicy="no-referrer" />
                <button 
                  onClick={logout}
                  className="p-2 hover:bg-red-500/10 rounded-full transition-colors group"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
                </button>
              </div>
            ) : (
              <button 
                type="button"
                onClick={loginWithGoogle}
                className="bg-neon-blue text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-white transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
              >
                <User className="w-4 h-4" />
                SIGN IN
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
