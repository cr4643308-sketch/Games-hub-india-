import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

export const Login = () => {
  const [isSignUp, setIsSignUp] = React.useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10" />
      
      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] animate-pulse delay-1000" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0a0a0a]/80 border border-white/10 shadow-[0_0_30px_rgba(0,240,255,0.2)] mb-6 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-50 blur-xl group-hover:opacity-75 transition-opacity" />
            <Shield className="w-8 h-8 text-neon-blue relative z-10" />
          </div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple mb-2">
            ENTRY TERMINAL
          </h1>
          <p className="text-gray-400 font-medium">Authenticate to access the Games Hub</p>
        </div>

        <div className="glass-panel p-1 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden">
          {/* Glitch effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <div className="bg-[#0a0a0a]/90 rounded-[22px] p-6 backdrop-blur-xl">
            {isSignUp ? (
              <SignUp 
                routing="hash" 
                signInUrl="/login" 
                afterSignUpUrl="/"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "bg-transparent shadow-none w-full",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "bg-white/5 border border-white/10 hover:bg-white/10 text-white",
                    socialButtonsBlockButtonText: "text-white font-medium",
                    dividerLine: "bg-white/10",
                    dividerText: "text-gray-500",
                    formFieldLabel: "text-gray-300",
                    formFieldInput: "bg-[#0a0a0a] border border-white/10 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue rounded-xl",
                    formButtonPrimary: "bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold hover:opacity-90 transition-opacity rounded-xl",
                    footerActionText: "text-gray-400",
                    footerActionLink: "text-neon-blue hover:text-neon-purple transition-colors",
                  }
                }}
              />
            ) : (
              <SignIn 
                routing="hash" 
                signUpUrl="/login#signup" 
                afterSignInUrl="/"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "bg-transparent shadow-none w-full",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "bg-white/5 border border-white/10 hover:bg-white/10 text-white",
                    socialButtonsBlockButtonText: "text-white font-medium",
                    dividerLine: "bg-white/10",
                    dividerText: "text-gray-500",
                    formFieldLabel: "text-gray-300",
                    formFieldInput: "bg-[#0a0a0a] border border-white/10 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue rounded-xl",
                    formButtonPrimary: "bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold hover:opacity-90 transition-opacity rounded-xl",
                    footerActionText: "text-gray-400",
                    footerActionLink: "text-neon-blue hover:text-neon-purple transition-colors",
                  }
                }}
              />
            )}
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
