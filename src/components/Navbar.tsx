import React from 'react';
import { Search, User, ShoppingBag, Menu, Bell, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-epic-black/95 backdrop-blur-sm border-b border-white/5 px-6 py-4">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-saffron rounded-lg flex items-center justify-center font-bold text-black">G</div>
            <span className="font-bold text-xl tracking-tighter">GAMES HUB <span className="text-saffron">INDIA</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="text-white hover:text-saffron transition-colors">STORE</a>
            <a href="#" className="hover:text-saffron transition-colors">DISTRIBUTION</a>
            <a href="#" className="hover:text-saffron transition-colors">SUPPORT</a>
            <a href="#" className="hover:text-saffron transition-colors">UNREAL ENGINE</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search store"
              className="bg-epic-gray border-none rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:ring-1 focus:ring-saffron transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <Globe className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <User className="w-5 h-5 text-gray-400" />
            </button>
            <button className="bg-saffron text-black px-4 py-2 rounded font-bold text-sm hover:opacity-90 transition-opacity">
              SIGN IN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
