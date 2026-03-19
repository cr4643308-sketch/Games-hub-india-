import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';

interface ApplicationBetaProps {
  onClose: () => void;
}

const questions = [
  { id: 'ign', label: 'In-Game Name (IGN):', type: 'text' },
  { id: 'ageGroup', label: 'Age Group:', type: 'radio', options: ['18+', '18-'] },
  { id: 'playtime', label: 'Daily Playtime:', type: 'radio', options: ['1HR+', '2HR+', '3HR+', '5HRS+'] },
  { id: 'motivation', label: 'Why do you want to play in our server?', type: 'textarea' },
  { id: 'realName', label: 'Real Name:', type: 'text' },
  { id: 'isYouTuber', label: 'Are you a YouTuber?', type: 'radio', options: ['Yes', 'No'] },
  { id: 'hasStats', label: 'Do you have 30+ subs and 500+ average views?', type: 'radio', options: ['Yes', 'No'] },
  { id: 'channelInfo', label: 'Channel Name & Link:', type: 'text' },
  { id: 'communityCheck', label: "Have you joined RKF's and Ravi's Discord servers?", type: 'radio', options: ['Yes', 'No', 'Other'] },
  { id: 'communityCheckOther', label: 'If Other, please describe:', type: 'text', dependsOn: { id: 'communityCheck', value: 'Other' } },
  { id: 'pvpTier', label: 'Which tier are you in?', type: 'radio', options: ['Low Tier', 'High Tier'] },
];

export const ApplicationBeta: React.FC<ApplicationBetaProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Starfall Animation Effect
  useEffect(() => {
    const canvas = document.getElementById('starfall-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: { x: number, y: number, length: number, speed: number, opacity: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 5 + 2,
        opacity: Math.random()
      });
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x, star.y + star.length);
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = -star.length;
          star.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleToggle = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [id]: prev[id] === value ? '' : value
    }));
  };

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    for (const q of questions) {
      if (q.dependsOn && formData[q.dependsOn.id] !== q.dependsOn.value) continue;
      if (!formData[q.id] || formData[q.id].trim() === '') {
        setError(`Please fill out: ${q.label}`);
        setTimeout(() => setError(null), 3000);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ign: formData.ign,
          ageGroup: formData.ageGroup,
          playtime: formData.playtime,
          motivation: formData.motivation,
          realName: formData.realName,
          isYouTuber: formData.isYouTuber,
          hasStats: formData.hasStats,
          channelInfo: formData.channelInfo,
          communityCheck: formData.communityCheck === 'Other' ? formData.communityCheckOther : formData.communityCheck,
          pvpTier: formData.pvpTier
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        let errorMessage = 'Failed to submit application.';
        try {
          const data = await response.json();
          errorMessage = data.error || errorMessage;
        } catch (e) {
          // Fallback if response is not JSON (e.g. 502 Bad Gateway HTML)
          errorMessage = `Server error (${response.status}). Please try again later.`;
        }
        setError(errorMessage);
        setTimeout(() => setError(null), 3000);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Network error. Please try again.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto"
    >
      {/* Animated Solar System Background */}
      <div className="fixed inset-0 bg-black overflow-hidden pointer-events-none">
        <canvas id="starfall-canvas" className="absolute inset-0 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5 animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/10 animate-[spin_40s_linear_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/20 animate-[spin_20s_linear_infinite]" />
        
        {/* Sun */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 to-orange-600 blur-md animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-500 shadow-[0_0_100px_rgba(255,215,0,0.8)]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl my-12 mx-4">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {isSuccess ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(128,0,128,0.5)]">
                <Check className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-400 mb-4 text-balance">
                Successfully submitted your form you'll notified on discord
              </h2>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 mb-2">
                  APPLICATION BETA
                </h2>
                <p className="text-gray-400">Join the elite ranks of Games Hub India.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {questions.map((q) => {
                  if (q.dependsOn && formData[q.dependsOn.id] !== q.dependsOn.value) return null;

                  return (
                    <div key={q.id} className="space-y-3">
                      <label className="block text-xl font-bold text-[#FFD700]">
                        {q.label}
                      </label>
                      
                      {q.type === 'text' && (
                        <input
                          type="text"
                          value={formData[q.id] || ''}
                          onChange={(e) => handleInputChange(q.id, e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#800080] font-medium focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                          placeholder="Type your answer here..."
                        />
                      )}

                      {q.type === 'textarea' && (
                        <textarea
                          value={formData[q.id] || ''}
                          onChange={(e) => handleInputChange(q.id, e.target.value)}
                          rows={4}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#800080] font-medium focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                          placeholder="Type your answer here..."
                        />
                      )}

                      {q.type === 'radio' && q.options && (
                        <div className="flex flex-wrap gap-4">
                          {q.options.map(opt => {
                            const isSelected = formData[q.id] === opt;
                            return (
                              <button
                                type="button"
                                key={opt}
                                onClick={() => handleToggle(q.id, opt)}
                                className="flex items-center gap-3 group"
                              >
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                  isSelected 
                                    ? 'border-purple-500 bg-gradient-to-br from-purple-500 to-yellow-500 shadow-[0_0_15px_rgba(128,0,128,0.5)]' 
                                    : 'border-white/30 group-hover:border-white/60'
                                }`}>
                                  <AnimatePresence>
                                    {isSelected && (
                                      <motion.div 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="w-2.5 h-2.5 bg-white rounded-full"
                                      />
                                    )}
                                  </AnimatePresence>
                                </div>
                                <span className={`text-lg font-medium transition-colors ${isSelected ? 'text-purple-300' : 'text-gray-300 group-hover:text-white'}`}>
                                  {opt}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="pt-8 flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative group overflow-hidden rounded-full px-12 py-5 font-black text-xl text-white shadow-[0_0_40px_rgba(128,0,128,0.4)] hover:shadow-[0_0_60px_rgba(255,215,0,0.6)] transition-all duration-500 transform hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-yellow-500 to-purple-600 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <span className="relative z-10 tracking-wider">
                      {isSubmitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
                    </span>
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>

      {/* Minecraft-themed Error Toast */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] bg-[#555555] border-4 border-[#333333] p-4 shadow-[4px_4px_0_rgba(0,0,0,0.5)] flex items-center gap-3"
            style={{ fontFamily: '"Courier New", Courier, monospace' }}
          >
            <div className="w-8 h-8 bg-red-500 border-2 border-red-800 flex items-center justify-center text-white font-bold text-xl">
              !
            </div>
            <span className="text-white font-bold text-lg drop-shadow-[2px_2px_0_#000]">
              {error}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </motion.div>
  );
};
