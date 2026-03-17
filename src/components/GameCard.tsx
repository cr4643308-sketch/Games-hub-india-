import React from 'react';
import { Plus } from 'lucide-react';
import { Game } from '../constants';

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  const discountedPrice = game.discount 
    ? game.price * (1 - game.discount / 100) 
    : game.price;

  return (
    <div className="epic-card group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-3">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black saffron-glow">
            <Plus className="w-6 h-6" />
          </button>
        </div>
        {game.discount && (
          <div className="absolute bottom-2 left-2 bg-saffron text-black text-xs font-bold px-2 py-1 rounded">
            -{game.discount}%
          </div>
        )}
      </div>
      
      <div className="px-1">
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{game.category}</span>
        <h3 className="font-bold text-sm mb-1 line-clamp-1 group-hover:text-saffron transition-colors">{game.title}</h3>
        <div className="flex items-center gap-2">
          {game.isFree ? (
            <span className="text-sm font-medium">Free</span>
          ) : (
            <>
              {game.discount && (
                <span className="text-xs text-gray-500 line-through">₹{game.price}</span>
              )}
              <span className="text-sm font-medium">₹{discountedPrice.toFixed(0)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
