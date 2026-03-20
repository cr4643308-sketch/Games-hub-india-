import React from 'react';
import { motion } from 'motion/react';
import { Info, Cpu, Shield, Zap, Globe, Layers } from 'lucide-react';

export const ProjectBlueprint = () => {
  return (
    <div className="py-20 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-neon-blue/10 rounded-xl flex items-center justify-center">
            <Info className="w-6 h-6 text-neon-blue" />
          </div>
          <div>
            <h2 className="text-3xl font-black">PROJECT BLUEPRINT</h2>
            <p className="text-gray-400">Lead Product Architect Specification</p>
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-neon-blue" />
              1. Brand Identity & Theme
            </h3>
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">Aesthetic:</strong> Immersive Dark Mode utilizing <code className="text-neon-blue">#121212</code> (Epic Black) as the foundation.
              </p>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">Accent:</strong> <span className="text-neon-blue font-bold">Neon Blue</span> (#00f0ff) and <span className="text-neon-purple font-bold">Neon Purple</span> (#b026ff) representing the futuristic cyber-dark aesthetic, used for primary CTAs and critical UI highlights.
              </p>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">Typography:</strong> <span className="font-sans">Inter</span> for high legibility in UI, paired with <span className="font-black">Black Weights</span> for dramatic headings to create a premium, authoritative feel.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-neon-blue" />
              2. Platform Architecture
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-2xl">
                <h4 className="font-bold mb-2">Frontend Stack</h4>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• React 19 + Vite (High Performance)</li>
                  <li>• Tailwind CSS v4 (Utility-First Styling)</li>
                  <li>• Framer Motion (Immersive Transitions)</li>
                </ul>
              </div>
              <div className="glass-panel p-6 rounded-2xl">
                <h4 className="font-bold mb-2">No-Download Engine</h4>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• WebAssembly (WASM) for local execution</li>
                  <li>• WebGL 2.0 / WebGPU for rendering</li>
                  <li>• Cloud Streaming (WebRTC) for heavy titles</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-neon-blue" />
              3. Technical Implementation
            </h3>
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-white/5 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-neon-blue" />
                </div>
                <div>
                  <h4 className="font-bold">Games & AI Tools</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Utilizing Emscripten for porting C++/Unity titles to the browser. AI tools leverage WebGPU for local inference (Transformers.js) or seamless Cloud API integration for heavy LLM tasks.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-neon-blue" />
              4. Monetization & Security
            </h3>
            <div className="glass-panel p-6 rounded-2xl">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-sm uppercase text-neon-blue mb-3">Revenue Models</h4>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>• Hub+ Premium Subscription</li>
                    <li>• Pay-per-play (Cloud Credits)</li>
                    <li>• Ad-supported Free Tier</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase text-neon-blue mb-3">Performance</h4>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>• Edge Computing (India Nodes)</li>
                    <li>• Adaptive Bitrate Streaming</li>
                    <li>• Progressive Asset Loading</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
