import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { ShieldAlert, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

export const AuthModal = () => {
  const { user, isGuest, loading, authError, loginWithGoogle, skipLogin } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (loading || user || isGuest) return null;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Visual only for now, can be hooked up to Firebase later
    alert('Email authentication coming soon! Please use Google Login.');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-hidden"
      >
        {/* Futuristic Background Elements */}
        <div className="absolute inset-0 bg-[#050505]/90 backdrop-blur-md" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="relative w-full max-w-md"
        >
          {/* Glassmorphic Container */}
          <div className="relative overflow-hidden rounded-[2rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.15)] p-8">
            
            {/* Glowing Top Border */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-400 text-sm">
                {isLogin ? 'Enter your details to access your universe.' : 'Join the elite ranks of gamers today.'}
              </p>
            </div>

            {/* Toggle Login/Register */}
            <div className="flex p-1 bg-black/40 rounded-xl mb-8 border border-white/5">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isLogin 
                    ? 'bg-white/10 text-white shadow-lg border border-white/10' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                  !isLogin 
                    ? 'bg-white/10 text-white shadow-lg border border-white/10' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Sign Up
              </button>
            </div>

            {authError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{authError}</span>
                  <span className="text-xs text-red-300/70">
                    If viewing in an embedded preview, third-party cookies might be blocked. Try opening in a new tab.
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleEmailSubmit} className="space-y-4 mb-6">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="relative"
                  >
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                />
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full relative group overflow-hidden rounded-xl py-3.5 font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-90 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </form>

            <div className="relative flex items-center py-2 mb-6">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase tracking-widest">or continue with</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            <button
              onClick={loginWithGoogle}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 mb-6"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Google
            </button>

            <div className="text-center">
              <button
                onClick={skipLogin}
                className="text-sm text-gray-500 hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
              >
                Skip for now (Guest Mode)
              </button>
            </div>
            
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

