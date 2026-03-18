import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { motion, AnimatePresence } from 'motion/react';
import { Monitor, Laptop, Smartphone } from 'lucide-react';

// --- Texture Generation ---
function createTexture(color: string, noise: boolean = true, type: string = '') {
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d')!;
  
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 16, 16);
  
  if (noise) {
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        if (Math.random() > 0.5) {
          ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
          ctx.fillRect(i, j, 1, 1);
        } else {
          ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.2})`;
          ctx.fillRect(i, j, 1, 1);
        }
      }
    }
  }

  if (type === 'grass_side') {
    ctx.fillStyle = '#4d8a35'; // Grass color
    for (let i = 0; i < 16; i++) {
      const depth = Math.floor(Math.random() * 3) + 3;
      ctx.fillRect(i, 0, 1, depth);
    }
  } else if (type === 'log_top') {
    ctx.fillStyle = '#b39062';
    ctx.fillRect(2, 2, 12, 12);
    ctx.strokeStyle = '#5c4022';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(8, 8, 4, 0, Math.PI * 2);
    ctx.stroke();
  } else if (type === 'log_side') {
    ctx.fillStyle = '#5c4022';
    for (let i = 0; i < 16; i += 2) {
      ctx.fillRect(i, 0, 1, 16);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  return texture;
}

const textures = {
  grassTop: createTexture('#4d8a35'),
  grassSide: createTexture('#735338', true, 'grass_side'),
  dirt: createTexture('#735338'),
  stone: createTexture('#7d7d7d'),
  woodSide: createTexture('#452f16', true, 'log_side'),
  woodTop: createTexture('#452f16', true, 'log_top'),
  leaves: createTexture('#2d5e1e', true),
};

const materials = {
  grass: [
    new THREE.MeshLambertMaterial({ map: textures.grassSide }), // right
    new THREE.MeshLambertMaterial({ map: textures.grassSide }), // left
    new THREE.MeshLambertMaterial({ map: textures.grassTop }), // top
    new THREE.MeshLambertMaterial({ map: textures.dirt }), // bottom
    new THREE.MeshLambertMaterial({ map: textures.grassSide }), // front
    new THREE.MeshLambertMaterial({ map: textures.grassSide }), // back
  ],
  dirt: new THREE.MeshLambertMaterial({ map: textures.dirt }),
  stone: new THREE.MeshLambertMaterial({ map: textures.stone }),
  wood: [
    new THREE.MeshLambertMaterial({ map: textures.woodSide }),
    new THREE.MeshLambertMaterial({ map: textures.woodSide }),
    new THREE.MeshLambertMaterial({ map: textures.woodTop }),
    new THREE.MeshLambertMaterial({ map: textures.woodTop }),
    new THREE.MeshLambertMaterial({ map: textures.woodSide }),
    new THREE.MeshLambertMaterial({ map: textures.woodSide }),
  ],
  leaves: new THREE.MeshLambertMaterial({ map: textures.leaves, transparent: true, opacity: 0.9 }),
};

type Platform = 'PC' | 'MacBook' | 'Mobile' | null;

interface MinecraftPlayerProps {
  onExit?: () => void;
}

export const MinecraftPlayer = ({ onExit }: MinecraftPlayerProps) => {
  const [platform, setPlatform] = useState<Platform>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mobile controls state
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [isSneaking, setIsSneaking] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);

  // Refs for game loop
  const engineRef = useRef<any>(null);

  const handlePlatformSelect = (selected: Platform) => {
    setPlatform(selected);
    setIsInitializing(true);
    setTimeout(() => {
      setIsInitializing(false);
      initGame(selected);
    }, 2000);
  };

  const initGame = (selectedPlatform: Platform) => {
    if (!containerRef.current) return;

    // Setup Three.js
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#87CEEB'); // Sky blue
    scene.fog = new THREE.Fog('#87CEEB', 20, 50);

    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(20, 50, 20);
    scene.add(dirLight);

    // World Generation
    const worldSize = 32;
    const blocks: THREE.Mesh[] = [];
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const addBlock = (x: number, y: number, z: number, material: any) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      blocks.push(mesh);
    };

    // Generate Terrain
    for (let x = -worldSize / 2; x < worldSize / 2; x++) {
      for (let z = -worldSize / 2; z < worldSize / 2; z++) {
        const y = Math.floor(Math.sin(x / 5) * 2 + Math.cos(z / 4) * 2);
        addBlock(x, y, z, materials.grass);
        addBlock(x, y - 1, z, materials.dirt);
        addBlock(x, y - 2, z, materials.dirt);
        addBlock(x, y - 3, z, materials.stone);
        
        // Random Trees
        if (Math.random() < 0.02 && x > -worldSize/2 + 2 && x < worldSize/2 - 2 && z > -worldSize/2 + 2 && z < worldSize/2 - 2) {
          const treeHeight = 4 + Math.floor(Math.random() * 2);
          for (let i = 1; i <= treeHeight; i++) {
            addBlock(x, y + i, z, materials.wood);
          }
          // Leaves
          for (let lx = -2; lx <= 2; lx++) {
            for (let lz = -2; lz <= 2; lz++) {
              for (let ly = 0; ly <= 2; ly++) {
                if (Math.abs(lx) + Math.abs(lz) + Math.abs(ly) < 4) {
                  addBlock(x + lx, y + treeHeight + ly - 1, z + lz, materials.leaves);
                }
              }
            }
          }
        }
      }
    }

    // Player Setup
    camera.position.set(0, 10, 0);
    const controls = new PointerLockControls(camera, renderer.domElement);
    
    if (selectedPlatform === 'PC' || selectedPlatform === 'MacBook') {
      renderer.domElement.addEventListener('click', () => {
        controls.lock();
      });
    }

    // Movement state
    const moveState = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      jump: false,
      sneak: false,
    };

    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();
    let canJump = false;
    const playerHeight = 1.6;

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW': moveState.forward = true; break;
        case 'ArrowLeft':
        case 'KeyA': moveState.left = true; break;
        case 'ArrowDown':
        case 'KeyS': moveState.backward = true; break;
        case 'ArrowRight':
        case 'KeyD': moveState.right = true; break;
        case 'Space': if (canJump) velocity.y += 10; canJump = false; break;
        case 'ShiftLeft': moveState.sneak = true; break;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW': moveState.forward = false; break;
        case 'ArrowLeft':
        case 'KeyA': moveState.left = false; break;
        case 'ArrowDown':
        case 'KeyS': moveState.backward = false; break;
        case 'ArrowRight':
        case 'KeyD': moveState.right = false; break;
        case 'ShiftLeft': moveState.sneak = false; break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Block interaction (Raycasting)
    const raycaster = new THREE.Raycaster();
    const center = new THREE.Vector2(0, 0);
    
    // Crosshair
    const crosshair = document.createElement('div');
    crosshair.style.position = 'absolute';
    crosshair.style.top = '50%';
    crosshair.style.left = '50%';
    crosshair.style.width = '20px';
    crosshair.style.height = '20px';
    crosshair.style.transform = 'translate(-50%, -50%)';
    crosshair.style.pointerEvents = 'none';
    crosshair.innerHTML = `
      <div style="position:absolute; top:9px; left:0; width:20px; height:2px; background:white; mix-blend-mode: difference;"></div>
      <div style="position:absolute; top:0; left:9px; width:2px; height:20px; background:white; mix-blend-mode: difference;"></div>
    `;
    containerRef.current.appendChild(crosshair);

    let selectedBlockMaterial = materials.wood;

    const interact = (action: 'break' | 'place') => {
      raycaster.setFromCamera(center, camera);
      const intersects = raycaster.intersectObjects(blocks);
      
      if (intersects.length > 0) {
        const intersect = intersects[0];
        if (intersect.distance > 5) return; // Reach limit

        if (action === 'break') {
          scene.remove(intersect.object);
          blocks.splice(blocks.indexOf(intersect.object as THREE.Mesh), 1);
        } else if (action === 'place') {
          const pos = intersect.object.position.clone().add(intersect.face!.normal);
          // Prevent placing inside player
          if (pos.distanceTo(camera.position) > 1.5) {
            addBlock(pos.x, pos.y, pos.z, selectedBlockMaterial);
          }
        }
      }
    };

    if (selectedPlatform === 'PC' || selectedPlatform === 'MacBook') {
      renderer.domElement.addEventListener('mousedown', (e) => {
        if (!controls.isLocked) return;
        if (e.button === 0) interact('break'); // Left click
        if (e.button === 2) interact('place'); // Right click
      });
    }

    // Game Loop
    let prevTime = performance.now();
    
    // Engine ref for cleanup and mobile controls access
    engineRef.current = {
      interact,
      moveState,
      velocity,
      triggerJump: () => { if (canJump) { velocity.y += 10; canJump = false; } },
      camera,
      renderer
    };

    const animate = () => {
      engineRef.current.animationId = requestAnimationFrame(animate);

      const time = performance.now();
      const delta = (time - prevTime) / 1000;

      // Mobile controls override
      if (selectedPlatform === 'Mobile') {
        moveState.forward = engineRef.current.mobileForward || false;
        moveState.backward = engineRef.current.mobileBackward || false;
        moveState.left = engineRef.current.mobileLeft || false;
        moveState.right = engineRef.current.mobileRight || false;
        
        // Simple touch look
        if (engineRef.current.touchLookDelta) {
          const euler = new THREE.Euler(0, 0, 0, 'YXZ');
          euler.setFromQuaternion(camera.quaternion);
          euler.y -= engineRef.current.touchLookDelta.x * 0.005;
          euler.x -= engineRef.current.touchLookDelta.y * 0.005;
          euler.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, euler.x));
          camera.quaternion.setFromEuler(euler);
          engineRef.current.touchLookDelta = {x: 0, y: 0};
        }
      }

      // Physics & Movement
      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;
      velocity.y -= 30.0 * delta; // Gravity

      direction.z = Number(moveState.forward) - Number(moveState.backward);
      direction.x = Number(moveState.right) - Number(moveState.left);
      direction.normalize();

      const speed = moveState.sneak ? 20.0 : 40.0;

      if (moveState.forward || moveState.backward) velocity.z -= direction.z * speed * delta;
      if (moveState.left || moveState.right) velocity.x -= direction.x * speed * delta;

      // Simple collision (floor only for now)
      // Find highest block under player
      let groundY = -100;
      for (const block of blocks) {
        if (Math.abs(block.position.x - camera.position.x) < 0.8 && 
            Math.abs(block.position.z - camera.position.z) < 0.8) {
          if (block.position.y + 0.5 > groundY && block.position.y + 0.5 <= camera.position.y - playerHeight + 0.5) {
            groundY = block.position.y + 0.5;
          }
        }
      }

      controls.moveRight(-velocity.x * delta);
      controls.moveForward(-velocity.z * delta);
      
      camera.position.y += velocity.y * delta;

      if (camera.position.y < groundY + playerHeight) {
        velocity.y = 0;
        camera.position.y = groundY + playerHeight;
        canJump = true;
      }

      // Sneak height adjustment
      if (moveState.sneak) {
        camera.position.y -= 0.3;
      }

      renderer.render(scene, camera);
      prevTime = time;
    };

    animate();

    // Resize handler
    const onWindowResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Cleanup
    return () => {
      if (engineRef.current && engineRef.current.animationId) {
        cancelAnimationFrame(engineRef.current.animationId);
      }
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
    };
  };

  // Mobile Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (platform !== 'Mobile' || !engineRef.current) return;
    engineRef.current.lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    engineRef.current.touchTimer = setTimeout(() => {
      engineRef.current.interact('place');
      engineRef.current.touchTimer = null;
    }, 500);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (platform !== 'Mobile' || !engineRef.current || !engineRef.current.lastTouch) return;
    const touch = e.touches[0];
    const dx = touch.clientX - engineRef.current.lastTouch.x;
    const dy = touch.clientY - engineRef.current.lastTouch.y;
    
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      if (engineRef.current.touchTimer) {
        clearTimeout(engineRef.current.touchTimer);
        engineRef.current.touchTimer = null;
      }
    }

    engineRef.current.touchLookDelta = { x: dx, y: dy };
    engineRef.current.lastTouch = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (platform !== 'Mobile' || !engineRef.current) return;
    if (engineRef.current.touchTimer) {
      clearTimeout(engineRef.current.touchTimer);
      engineRef.current.interact('break');
    }
    engineRef.current.lastTouch = null;
  };

  // Mobile D-Pad Handlers
  const handleDPad = (dir: string, active: boolean) => {
    if (!engineRef.current) return;
    if (dir === 'up') engineRef.current.mobileForward = active;
    if (dir === 'down') engineRef.current.mobileBackward = active;
    if (dir === 'left') engineRef.current.mobileLeft = active;
    if (dir === 'right') engineRef.current.mobileRight = active;
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
          src: local('Courier New');
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

      {/* The Game Canvas Container */}
      <div 
        className={`relative z-10 w-full h-full ${(!platform || isInitializing) ? 'hidden' : 'block'}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div ref={containerRef} className="w-full h-full" />
        
        {/* Mobile Controls Overlay */}
        {platform === 'Mobile' && !isInitializing && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {/* D-Pad */}
            <div className="absolute bottom-12 left-12 w-48 h-48 bg-white/10 rounded-full border-4 border-white/20 pointer-events-auto flex items-center justify-center backdrop-blur-sm">
              <div className="w-16 h-16 bg-white/40 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              {/* Directional buttons */}
              <button 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16"
                onTouchStart={() => handleDPad('up', true)} onTouchEnd={() => handleDPad('up', false)}
              />
              <button 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16"
                onTouchStart={() => handleDPad('down', true)} onTouchEnd={() => handleDPad('down', false)}
              />
              <button 
                className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16"
                onTouchStart={() => handleDPad('left', true)} onTouchEnd={() => handleDPad('left', false)}
              />
              <button 
                className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16"
                onTouchStart={() => handleDPad('right', true)} onTouchEnd={() => handleDPad('right', false)}
              />
            </div>
            
            {/* Action Buttons */}
            <div className="absolute bottom-12 right-12 flex gap-6 pointer-events-auto">
              <button 
                className="w-20 h-20 bg-white/10 rounded-full border-4 border-white/20 flex items-center justify-center active:bg-white/40 backdrop-blur-sm transition-colors"
                onTouchStart={() => { if(engineRef.current) engineRef.current.moveState.sneak = true; }}
                onTouchEnd={() => { if(engineRef.current) engineRef.current.moveState.sneak = false; }}
              >
                <span className="text-white font-bold text-sm drop-shadow-md">SNEAK</span>
              </button>
              <button 
                className="w-24 h-24 bg-white/10 rounded-full border-4 border-white/20 flex items-center justify-center active:bg-white/40 backdrop-blur-sm transition-colors -translate-y-8"
                onTouchStart={() => { if(engineRef.current) engineRef.current.triggerJump(); }}
              >
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
