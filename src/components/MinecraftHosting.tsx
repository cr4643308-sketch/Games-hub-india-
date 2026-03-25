import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, CheckCircle } from 'lucide-react';
import { HOSTING_PLANS } from '../constants';

export const MinecraftHosting = () => {
  return (
    <section className="py-20 px-6 bg-[#050505] text-white">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-4xl font-black text-center mb-16 tracking-tighter">
          MINECRAFT <span className="text-neon-blue">HOSTING</span>
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {HOSTING_PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -10 }}
              className={`relative p-6 rounded-2xl border ${
                plan.isPremium 
                  ? 'bg-purple-950/20 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
                  : 'bg-epic-gray border-white/10 shadow-[0_0_15px_rgba(0,240,255,0.05)]'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-blue text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Popular
                </div>
              )}
              
              <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                <Cpu className="w-4 h-4" /> RYZEN 9 7900 NODE
              </div>
              
              <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
              <div className="text-4xl font-black mb-6">
                {plan.price}<span className="text-sm text-gray-500 font-normal">/mo</span>
              </div>
              
              <div className="space-y-3 mb-8 text-sm text-gray-300">
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-neon-blue" /> {plan.ram} RAM</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-neon-blue" /> {plan.cpu} CPU</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-neon-blue" /> {plan.nvme} NVMe</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-neon-blue" /> Dedicated Port</div>
              </div>
              
              <motion.button
                whileHover={{ boxShadow: '0 0 20px rgba(0,240,255,0.6)' }}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  plan.isCustom 
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : plan.isPremium
                      ? 'bg-purple-600 text-white hover:bg-purple-500'
                      : 'bg-neon-blue text-black hover:bg-white'
                }`}
              >
                {plan.isCustom ? 'Contact Support' : 'Select Plan'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
