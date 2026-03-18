import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, ShieldAlert, X } from 'lucide-react';

export const AuthModal = () => {
  const { user, isGuest, loading, authError, loginWithGoogle, skipLogin } = useAuth();

  if (loading || user || isGuest) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-epic-black border border-white/10 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
        >
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-saffron/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-saffron/20">
              <LogIn className="w-8 h-8 text-saffron" />
            </div>
            
            <h2 className="text-3xl font-black mb-2">Welcome to <span className="text-saffron">GHI</span></h2>
            <p className="text-gray-400 mb-8">
              Sign in to earn GHI Coins, save your progress, and unlock premium games.
            </p>

            {authError && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-left flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>{authError}</span>
                </div>
                <div className="text-xs text-red-300 mt-1 pl-7">
                  <strong>Tip:</strong> If you are viewing this in an embedded preview, third-party cookies might be blocked. Try opening the app in a new tab using the button in the top right corner of the preview.
                </div>
              </div>
            )}

            <button
              onClick={loginWithGoogle}
              className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors mb-4"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <button
              onClick={skipLogin}
              className="w-full bg-white/5 text-gray-300 font-bold py-4 rounded-xl hover:bg-white/10 transition-colors border border-white/10"
            >
              Skip for now
            </button>
            
            <div className="mt-6 flex items-start gap-2 text-left bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-red-300">
                <strong>Warning:</strong> If you skip, you can browse games, but your GHI Coins and game progress will <strong>not be saved</strong>.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
