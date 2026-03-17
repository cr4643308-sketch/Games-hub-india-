import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Coins, PlaySquare, LayoutGrid, Calendar, CheckCircle } from 'lucide-react';

export const EarnCoins = () => {
  const { user, profile, addCoins, claimEvent } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleWatchAd = (type: 'short' | 'long') => {
    if (!user) {
      alert("Please sign in to earn GHI Coins!");
      return;
    }
    const reward = type === 'short' ? 30 : 60;
    alert(`Watching ${type} ad... (Simulated)`);
    setTimeout(() => {
      addCoins(reward);
      alert(`You earned ${reward} GHI Coins!`);
    }, 2000);
  };

  const handlePlayGameReward = () => {
    if (!user) {
      alert("Please sign in to earn GHI Coins!");
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
    if (!user) {
      alert("Please sign in to claim event rewards!");
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
    <div className="space-y-8">
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
        <div className="bg-epic-gray rounded-2xl p-6 border border-white/5 hover:border-saffron/30 transition-colors">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-saffron" /> Play & Earn
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
