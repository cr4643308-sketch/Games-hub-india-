import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Coins, PlaySquare, LayoutGrid, Calendar, CheckCircle, X } from 'lucide-react';

const AI_ADS = [
  { name: 'ChatGPT', desc: 'The ultimate AI assistant for writing and coding.', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80' },
  { name: 'Midjourney', desc: 'Create breathtaking AI art in seconds.', img: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=800&q=80' },
  { name: 'Claude', desc: 'Next-generation AI for complex reasoning.', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80' },
  { name: 'Gemini', desc: 'Google\'s most capable AI model yet.', img: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?auto=format&fit=crop&w=800&q=80' },
  { name: 'Perplexity', desc: 'The AI search engine that gives you direct answers.', img: 'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=800&q=80' }
];

export const EarnCoins = () => {
  const { user, profile, isGuest, addCoins, claimEvent } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Ad Modal State
  const [showAd, setShowAd] = useState(false);
  const [adTimeLeft, setAdTimeLeft] = useState(0);
  const [currentAd, setCurrentAd] = useState(AI_ADS[0]);
  const [currentReward, setCurrentReward] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'events'), where('isActive', '==', true));
        const snap = await getDocs(q);
        setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showAd && adTimeLeft > 0) {
      timer = setTimeout(() => setAdTimeLeft(prev => prev - 1), 1000);
    } else if (showAd && adTimeLeft === 0) {
      // Ad finished
      addCoins(currentReward);
      setShowAd(false);
      alert(`Ad completed! You earned ${currentReward} GHI Coins!`);
    }
    return () => clearTimeout(timer);
  }, [showAd, adTimeLeft, currentReward, addCoins]);

  const handleWatchAd = (type: 'short' | 'long') => {
    if (!user && !isGuest) {
      alert("Please sign in or continue as guest to earn GHI Coins!");
      return;
    }
    
    // Pick a random AI ad
    const randomAd = AI_ADS[Math.floor(Math.random() * AI_ADS.length)];
    setCurrentAd(randomAd);
    
    const reward = type === 'short' ? 30 : 60;
    const duration = type === 'short' ? 5 : 10; // Shortened for demo purposes (5s/10s)
    
    setCurrentReward(reward);
    setAdTimeLeft(duration);
    setShowAd(true);
  };

  const handlePlayGameReward = () => {
    if (!user && !isGuest) {
      alert("Please sign in or continue as guest to earn GHI Coins!");
      return;
    }
    const reward = Math.floor(Math.random() * (150 - 30 + 1)) + 30;
    alert(`Playing game... (Simulated)`);
    setTimeout(() => {
      addCoins(reward);
      alert(`You earned ${reward} GHI Coins from playing!`);
    }, 2000);
  };

  const handleClaimEvent = async (eventId: string, rewardAmount: number) => {
    if (!user && !isGuest) {
      alert("Please sign in or continue as guest to claim event rewards!");
      return;
    }
    try {
      await claimEvent(eventId, rewardAmount);
      alert(`Successfully claimed ${rewardAmount} GHI Coins!`);
    } catch (error) {
      console.error("Error claiming event:", error);
      alert("Failed to claim event reward.");
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Ad Modal */}
      {showAd && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative">
            {/* Ad Header */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-4">
              <div className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-white font-bold border border-white/10">
                Reward in: {adTimeLeft}s
              </div>
              {adTimeLeft === 0 && (
                <button onClick={() => setShowAd(false)} className="bg-black/60 p-2 rounded-full hover:bg-white/10 transition">
                  <X className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
            
            {/* Ad Content */}
            <div className="relative h-[400px] w-full">
              <img src={currentAd.img} alt={currentAd.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-8">
                <span className="text-purple-400 font-bold tracking-wider text-sm uppercase mb-2">Sponsored AI Tool</span>
                <h2 className="text-4xl font-black text-white mb-2">{currentAd.name}</h2>
                <p className="text-gray-300 text-lg max-w-lg">{currentAd.desc}</p>
                <button className="mt-6 bg-white text-black font-bold py-3 px-8 rounded-xl w-max hover:bg-gray-200 transition">
                  Try {currentAd.name} Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center border border-purple-500/30">
          <Coins className="w-6 h-6 text-yellow-400" />
        </div>
        <div>
          <h2 className="text-3xl font-black">Earn GHI Coins</h2>
          <p className="text-gray-400">Watch ads, play specific games, or participate in events to earn coins for premium titles.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Ads Section */}
        <div className="bg-epic-gray rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-colors">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <PlaySquare className="w-5 h-5 text-purple-400" /> Watch Ads
          </h3>
          <div className="space-y-4">
            <button 
              onClick={() => handleWatchAd('short')}
              className="w-full bg-black/40 border border-white/10 p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="text-left">
                <div className="font-bold">Short Ad (15s)</div>
                <div className="text-xs text-gray-500">Quick reward</div>
              </div>
              <div className="text-yellow-400 font-bold flex items-center gap-1">
                +30 <Coins className="w-4 h-4" />
              </div>
            </button>
            <button 
              onClick={() => handleWatchAd('long')}
              className="w-full bg-black/40 border border-white/10 p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="text-left">
                <div className="font-bold">Long Ad (30s)</div>
                <div className="text-xs text-gray-500">Double reward</div>
              </div>
              <div className="text-yellow-400 font-bold flex items-center gap-1">
                +60 <Coins className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Games Section */}
        <div className="bg-epic-gray rounded-2xl p-6 border border-white/5 hover:border-neon-blue/30 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.05)] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-neon-blue" /> Play & Earn
          </h3>
          <p className="text-sm text-gray-400 mb-6">Play these specific games to earn a random amount of GHI Coins (30 - 150).</p>
          <div className="space-y-4">
            {['Bio Logos Riddle', 'Math Puzzle Pro', 'Math Games'].map(game => (
              <button 
                key={game}
                onClick={handlePlayGameReward}
                className="w-full bg-black/40 border border-white/10 p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="font-bold text-left">{game}</div>
                <div className="text-yellow-400 font-bold flex items-center gap-1 text-sm">
                  30-150 <Coins className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="bg-epic-gray rounded-2xl p-6 border border-white/5 hover:border-blue-500/30 transition-colors mt-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" /> Active Events
        </h3>
        {loading ? (
          <p className="text-gray-500">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-500">No active events right now. Check back later!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map(event => {
              const isClaimed = profile?.claimedEvents?.includes(event.id);
              return (
                <div key={event.id} className="bg-black/40 border border-white/10 p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">{event.title}</h4>
                      <div className="text-yellow-400 font-bold flex items-center gap-1 text-sm bg-yellow-400/10 px-2 py-1 rounded-lg">
                        +{event.rewardAmount} <Coins className="w-3 h-3" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">{event.description}</p>
                  </div>
                  <button 
                    onClick={() => handleClaimEvent(event.id, event.rewardAmount)}
                    disabled={isClaimed}
                    className={`w-full py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
                      isClaimed 
                        ? 'bg-white/5 text-gray-500 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-500 text-white'
                    }`}
                  >
                    {isClaimed ? (
                      <>
                        <CheckCircle className="w-4 h-4" /> CLAIMED
                      </>
                    ) : (
                      'CLAIM REWARD'
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
