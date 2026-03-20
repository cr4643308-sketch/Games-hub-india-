import React from 'react';
import { Play, Users, Star } from 'lucide-react';
import { Game } from '../constants';

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  const discountedPrice = game.discount 
    ? game.price * (1 - game.discount / 100) 
    : game.price;

  return (
    <div className="group relative rounded-2xl bg-epic-gray border border-white/5 p-4 transition-all duration-500 hover:bg-epic-light hover:border-neon-blue/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] cursor-pointer overflow-hidden">
      {/* 3D Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden rounded-xl mb-4" style={{ perspective: '1000px' }}>
        <div className="w-full h-full transition-transform duration-700 ease-out group-hover:[transform:rotateX(12deg)_scale(1.1)]" style={{ transformStyle: 'preserve-3d' }}>
          <img 
            src={game.image} 
            alt={game.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-epic-black via-transparent to-transparent opacity-80" />
        </div>
        
        {/* Play Now Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-sm">
          <button className="flex items-center gap-2 bg-neon-blue text-black px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.8)]">
            <Play className="w-4 h-4 fill-current" />
            PLAY NOW
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {game.discount && (
            <div className="bg-neon-purple text-white text-xs font-bold px-2 py-1 rounded shadow-[0_0_10px_rgba(176,38,255,0.5)]">
              -{game.discount}%
            </div>
          )}
          {game.isFree && (
            <div className="bg-neon-blue text-black text-xs font-bold px-2 py-1 rounded shadow-[0_0_10px_rgba(0,240,255,0.5)]">
              FREE
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-neon-blue font-bold uppercase tracking-widest bg-neon-blue/10 px-2 py-0.5 rounded">
            {game.category}
          </span>
          <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
            <Star className="w-3 h-3 fill-current" />
            {game.rating || '4.5'}
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-1 line-clamp-1 text-white group-hover:text-neon-blue transition-colors">
          {game.title}
        </h3>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
            <Users className="w-3.5 h-3.5" />
            {game.playersOnline || '1,200'} Online
          </div>
          
          <div className="flex items-center gap-2">
            {game.isFree ? (
              <span className="text-sm font-bold text-neon-blue">PLAY FREE</span>
            ) : (
              <div className="flex items-center gap-2">
                {game.discount && (
                  <span className="text-xs text-gray-500 line-through">₹{game.price}</span>
                )}
                <span className="text-sm font-bold text-white">₹{discountedPrice.toFixed(0)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
