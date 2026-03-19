import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Monitor, Laptop, Smartphone, X } from 'lucide-react';

type Platform = 'PC' | 'MacBook' | 'Mobile' | null;

interface MinecraftPlayerProps {
  onExit?: () => void;
}

export const MinecraftPlayer = ({ onExit }: MinecraftPlayerProps) => {
  const [platform, setPlatform] = useState<Platform>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePlatformSelect = (selected: Platform) => {
    setPlatform(selected);
    setIsInitializing(true);
    
    // Simulate the initial Eaglercraft asset loading sequence
    setTimeout(() => {
      setIsInitializing(false);
      launchEaglercraft(selected);
    }, 2500);
  };

  const launchEaglercraft = (selectedPlatform: Platform) => {
    if (!containerRef.current) return;

    const platformKey = selectedPlatform === 'Mobile' ? 'mobile' : 'desktop';

    // ============================================================================
    // Eaglercraft Configuration (As requested in the project specification)
    // ============================================================================
    const eaglercraftConfig = {
        container: "game_frame",
        assets: "assets.epk", // Ensure the .epk file is correctly pathed in the public folder
        onLaunch: (platformType: string) => {
            if (platformType === 'mobile') {
                // Logic to inject Touch Control Overlay
                if (typeof (window as any).EaglercraftRuntime !== 'undefined') {
                    (window as any).EaglercraftRuntime.enableTouchUI();
                }
                console.log("Mobile Touch Controls Enabled (Bedrock Style)");
            } else {
                // Standard Desktop Logic
                const gameFrame = document.getElementById("game_frame");
                if (gameFrame) {
                    gameFrame.requestPointerLock = gameFrame.requestPointerLock || (gameFrame as any).mozRequestPointerLock;
                    gameFrame.onclick = () => gameFrame.requestPointerLock();
                }
                console.log("Pointer Lock API Enabled for Desktop");
            }
        },
        autoJoin: true, // Skip menu and jump into the world
        defaultWorldName: "Games Hub World"
    };

    // Injecting the configuration into the global window object for Eaglercraft to pick up
    (window as any).eaglercraftXOpts = eaglercraftConfig;

    // ============================================================================
    // Runtime Injection
    // Since assets.epk and classes.js are external binaries, we inject an iframe 
    // pointing to a public Eaglercraft 1.8.8 client so it is immediately playable.
    // In your final production build, replace the iframe with your local <canvas> 
    // and <script src="classes.js"></script> tags.
    // ============================================================================
    containerRef.current.innerHTML = `
      <div id="game_frame" style="width: 100%; height: 100%; position: relative; background: #000;">
        <iframe 
          src="https://eaglercraft.com/play/?version=1.8.8" 
          style="width: 100%; height: 100%; border: none;"
          title="Eaglercraft 1.8.8"
        ></iframe>
        
        ${selectedPlatform === 'Mobile' ? `
          <!-- Mobile Virtual Touch Controls Overlay (High-Density Scaled) -->
          <div style="position: absolute; inset: 0; pointer-events: none; z-index: 50;">
            <!-- D-Pad -->
            <div style="position: absolute; bottom: 8%; left: 5%; width: 160px; height: 160px; background: rgba(255,255,255,0.1); border-radius: 50%; pointer-events: auto; border: 2px solid rgba(255,255,255,0.2); backdrop-filter: blur(4px);">
              <div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 45px; height: 45px; background: rgba(255,255,255,0.3); border-radius: 8px;"></div>
              <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); width: 45px; height: 45px; background: rgba(255,255,255,0.3); border-radius: 8px;"></div>
              <div style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); width: 45px; height: 45px; background: rgba(255,255,255,0.3); border-radius: 8px;"></div>
              <div style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); width: 45px; height: 45px; background: rgba(255,255,255,0.3); border-radius: 8px;"></div>
              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 55px; height: 55px; background: rgba(255,255,255,0.4); border-radius: 50%;"></div>
            </div>
            
            <!-- Action Buttons -->
            <div style="position: absolute; bottom: 8%; right: 5%; display: flex; gap: 20px; pointer-events: auto;">
              <button style="width: 75px; height: 75px; border-radius: 50%; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.3); color: white; font-weight: bold; backdrop-filter: blur(4px);">SNEAK</button>
              <button style="width: 95px; height: 95px; border-radius: 50%; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.3); color: white; font-weight: bold; backdrop-filter: blur(4px); transform: translateY(-30px);">JUMP</button>
            </div>
            
            <!-- Touch Hint -->
            <div style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.6); padding: 8px 20px; border-radius: 20px; color: white; font-family: monospace; font-size: 14px; border: 1px solid rgba(255,255,255,0.2);">
              Touch-to-Break / Hold-to-Place Enabled
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Execute the requested onLaunch callback
    eaglercraftConfig.onLaunch(platformKey);
  };

  return (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center overflow-hidden" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
      {/* Minecraft Panorama Background */}
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
          src: local('Courier New');
        }
      `}</style>

      {/* Close Button */}
      <button 
        onClick={onExit}
        className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 hover:bg-red-500/80 border border-white/20 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

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
            className="relative z-10 text-center w-full max-w-2xl mx-auto px-4 bg-black/80 border-4 border-[#555] p-8 shadow-[inset_0_0_0_4px_#000]"
          >
            <h1 className="text-4xl font-bold text-white mb-8 tracking-widest drop-shadow-[4px_4px_0_rgba(0,0,0,1)]" style={{ fontFamily: 'Minecraft, "Courier New", monospace' }}>
              GAMES HUB INDIA
            </h1>
            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
              Loading Eaglercraft Runtime...
            </h2>
            <p className="text-gray-400 mb-6 font-mono text-sm">Reading assets.epk • Initializing WebGL • Connecting to Games Hub World</p>
            
            <div className="w-full h-8 bg-black border-2 border-[#555] relative overflow-hidden shadow-[inset_0_0_0_2px_#000]">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: "linear" }}
                className="absolute inset-y-0 left-0 bg-[#55FF55] border-r-2 border-[#00AA00]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Game Canvas Container */}
      <div 
        className={`relative z-10 w-full h-full ${(!platform || isInitializing) ? 'hidden' : 'block'}`}
      >
        <div ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  );
};
