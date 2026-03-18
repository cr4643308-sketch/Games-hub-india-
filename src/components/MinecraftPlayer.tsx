import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Monitor, Laptop, Smartphone, Gamepad2 } from 'lucide-react';

interface MinecraftPlayerProps {
  onExit?: () => void;
}

type Platform = 'PC' | 'MacBook' | 'Mobile' | null;

export const MinecraftPlayer = ({ onExit }: MinecraftPlayerProps) => {
  const [platform, setPlatform] = useState<Platform>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handlePlatformSelect = (selected: Platform) => {
    setPlatform(selected);
    setIsInitializing(true);
    // Simulate loading
    setTimeout(() => {
      setIsInitializing(false);
      initGame(selected);
    }, 2000);
  };

  const initGame = (selectedPlatform: Platform) => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.focus();
      
      if (selectedPlatform === 'PC' || selectedPlatform === 'MacBook') {
        canvas.requestPointerLock = canvas.requestPointerLock || (canvas as any).mozRequestPointerLock;
        canvas.onclick = () => canvas.requestPointerLock();
        
        // Simulate control mapping
        canvas.onkeydown = (e) => {
          if (['w', 'a', 's', 'd', ' ', 'Shift'].includes(e.key)) {
            console.log(`Action: ${e.key}`);
          }
        };
        canvas.onmousedown = (e) => {
          console.log(`Mouse Button: ${e.button}`);
        };
      } else if (selectedPlatform === 'Mobile') {
        // Touch-to-Break and Hold-to-Place logic
        let touchTimer: NodeJS.Timeout;
        canvas.ontouchstart = (e) => {
          e.preventDefault();
          touchTimer = setTimeout(() => {
            console.log('Hold-to-Place triggered');
          }, 500);
        };
        canvas.ontouchend = (e) => {
          e.preventDefault();
          clearTimeout(touchTimer);
          console.log('Touch-to-Break triggered');
        };
      }
      
      // Simulated WebGL context initialization
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#78A7FF'; // Sky color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#55FF55'; // Grass color
        ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 36px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`Minecraft WebGL Engine Running (${selectedPlatform})`, canvas.width / 2, canvas.height / 2 - 40);
        
        ctx.font = '24px "Courier New", monospace';
        if (selectedPlatform === 'Mobile') {
          ctx.fillText('Touch-to-Break and Hold-to-Place enabled', canvas.width / 2, canvas.height / 2 + 20);
        } else {
          ctx.fillText('WASD to move, Space to jump, Shift to sneak', canvas.width / 2, canvas.height / 2 + 20);
          ctx.fillText('Pointer Lock API enabled', canvas.width / 2, canvas.height / 2 + 60);
        }
      }
    }
  };

  return (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center overflow-hidden" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
      {/* Panorama Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div 
          className="absolute inset-0 bg-[url('https://www.minecraft.net/content/dam/games/minecraft/key-art/Games_Subnav_Minecraft-300x465.jpg')] bg-cover bg-center opacity-40 blur-sm"
          style={{ 
            transform: 'scale(1.2)',
            animation: 'pan 30s linear infinite alternate'
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <style>{`
        @keyframes pan {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @font-face {
          font-family: 'Minecraft';
          src: local('Courier New'); /* Placeholder for actual Minecraft font */
        }
      `}</style>

      <AnimatePresence>
        {!platform && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 bg-black/80 border-4 border-[#555] p-8 max-w-3xl w-full mx-4 text-center shadow-[inset_0_0_0_4px_#000]"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-widest drop-shadow-[4px_4px_0_rgba(0,0,0,1)]" style={{ fontFamily: 'Minecraft, "Courier New", monospace' }}>
              GAMES HUB INDIA
            </h1>
            <h2 className="text-xl text-gray-300 mb-10 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">Select Your Platform</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button 
                onClick={() => handlePlatformSelect('PC')}
                className="bg-[#777] hover:bg-[#999] border-b-4 border-r-4 border-[#333] hover:border-[#555] border-t-4 border-l-4 border-t-[#aaa] border-l-[#aaa] p-6 flex flex-col items-center gap-4 transition-all active:border-b-0 active:border-r-0 active:border-t-4 active:border-l-4 active:border-t-[#333] active:border-l-[#333] active:translate-y-1 active:translate-x-1"
              >
                <Monitor className="w-16 h-16 text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)]" />
                <span className="text-white font-bold text-xl drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">PC</span>
              </button>
              
              <button 
                onClick={() => handlePlatformSelect('MacBook')}
                className="bg-[#777] hover:bg-[#999] border-b-4 border-r-4 border-[#333] hover:border-[#555] border-t-4 border-l-4 border-t-[#aaa] border-l-[#aaa] p-6 flex flex-col items-center gap-4 transition-all active:border-b-0 active:border-r-0 active:border-t-4 active:border-l-4 active:border-t-[#333] active:border-l-[#333] active:translate-y-1 active:translate-x-1"
              >
                <Laptop className="w-16 h-16 text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)]" />
                <span className="text-white font-bold text-xl drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">MacBook</span>
              </button>
              
              <button 
                onClick={() => handlePlatformSelect('Mobile')}
                className="bg-[#777] hover:bg-[#999] border-b-4 border-r-4 border-[#333] hover:border-[#555] border-t-4 border-l-4 border-t-[#aaa] border-l-[#aaa] p-6 flex flex-col items-center gap-4 transition-all active:border-b-0 active:border-r-0 active:border-t-4 active:border-l-4 active:border-t-[#333] active:border-l-[#333] active:translate-y-1 active:translate-x-1"
              >
                <Smartphone className="w-16 h-16 text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)]" />
                <span className="text-white font-bold text-xl drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">Mobile</span>
              </button>
            </div>
          </motion.div>
        )}

        {platform && isInitializing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 text-center w-full max-w-md mx-auto px-4"
          >
            <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
              Generating World...
            </h2>
            <div className="w-full h-6 bg-black border-2 border-[#555] relative overflow-hidden shadow-[inset_0_0_0_2px_#000]">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: "linear" }}
                className="absolute inset-y-0 left-0 bg-[#55FF55] border-r-2 border-[#00AA00]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Game Canvas */}
      <div className={`relative z-10 w-full h-full ${(!platform || isInitializing) ? 'hidden' : 'block'}`}>
        <canvas 
          ref={canvasRef} 
          width={1920} 
          height={1080} 
          className="w-full h-full object-cover bg-black outline-none cursor-crosshair"
          tabIndex={0}
        />
        
        {/* Mobile Controls Overlay */}
        {platform === 'Mobile' && !isInitializing && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {/* D-Pad */}
            <div className="absolute bottom-12 left-12 w-48 h-48 bg-white/10 rounded-full border-4 border-white/20 pointer-events-auto flex items-center justify-center backdrop-blur-sm">
              <div className="w-16 h-16 bg-white/40 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              {/* Directional indicators */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] border-l-transparent border-r-transparent border-b-white/50" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-white/50" />
              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-b-[10px] border-r-[15px] border-t-transparent border-b-transparent border-r-white/50" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-b-[10px] border-l-[15px] border-t-transparent border-b-transparent border-l-white/50" />
            </div>
            
            {/* Action Buttons */}
            <div className="absolute bottom-12 right-12 flex gap-6 pointer-events-auto">
              <button className="w-20 h-20 bg-white/10 rounded-full border-4 border-white/20 flex items-center justify-center active:bg-white/40 backdrop-blur-sm transition-colors">
                <span className="text-white font-bold text-sm drop-shadow-md">SNEAK</span>
              </button>
              <button className="w-24 h-24 bg-white/10 rounded-full border-4 border-white/20 flex items-center justify-center active:bg-white/40 backdrop-blur-sm transition-colors -translate-y-8">
                <span className="text-white font-bold text-base drop-shadow-md">JUMP</span>
              </button>
            </div>
            
            {/* Touch to Break/Place Hint */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-black/60 border-2 border-white/20 px-6 py-3 rounded-lg text-white text-sm font-bold tracking-wider backdrop-blur-sm">
              Tap to Break • Hold to Place
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
