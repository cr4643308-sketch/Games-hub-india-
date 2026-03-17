import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, setDoc, serverTimestamp, query, where } from 'firebase/firestore';
import { Shield, Plus, Users, Calendar, Coins, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export const AdminDashboard = () => {
  const { profile } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', rewardAmount: 100 });
  const [targetEmail, setTargetEmail] = useState('');
  const [grantAmount, setGrantAmount] = useState(1000);

  const isOwner = profile?.role === 'owner';
  const isManager = profile?.role === 'manager';

  useEffect(() => {
    if (!isOwner && !isManager) return;
    fetchData();
  }, [profile]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (isOwner) {
        const usersSnap = await getDocs(collection(db, 'users'));
        setUsers(usersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      }
      const eventsSnap = await getDocs(collection(db, 'events'));
      setEvents(eventsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
    setLoading(false);
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newEventRef = doc(collection(db, 'events'));
      await setDoc(newEventRef, {
        id: newEventRef.id,
        ...newEvent,
        createdBy: profile?.uid,
        createdAt: serverTimestamp(),
        isActive: true
      });
      setNewEvent({ title: '', description: '', rewardAmount: 100 });
      fetchData();
      alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event.");
    }
  };

  const handleGrantCoins = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwner) return;
    
    try {
      const q = query(collection(db, 'users'), where('email', '==', targetEmail));
      const snap = await getDocs(q);
      
      if (snap.empty) {
        alert("User not found!");
        return;
      }
      
      const userDoc = snap.docs[0];
      const currentCoins = userDoc.data().ghiCoins || 0;
      
      await updateDoc(doc(db, 'users', userDoc.id), {
        ghiCoins: currentCoins + grantAmount
      });
      
      alert(`Granted ${grantAmount} GHI Coins to ${targetEmail}`);
      setTargetEmail('');
      fetchData();
    } catch (error) {
      console.error("Error granting coins:", error);
      alert("Failed to grant coins.");
    }
  };

  if (!isOwner && !isManager) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center border border-purple-500/30">
          <Shield className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h1 className="text-3xl font-black">Management Panel</h1>
          <p className="text-gray-400">Role: <span className="uppercase text-purple-400 font-bold">{profile?.role}</span></p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Event Management - Both Owner & Manager */}
        <div className="bg-epic-gray rounded-2xl p-6 border border-white/5">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-saffron" />
            Create Event
          </h2>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Event Title</label>
              <input 
                type="text" 
                required
                value={newEvent.title}
                onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-saffron"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
              <textarea 
                required
                value={newEvent.description}
                onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-saffron h-24"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Reward (GHI Coins)</label>
              <input 
                type="number" 
                required min="1"
                value={newEvent.rewardAmount}
                onChange={e => setNewEvent({...newEvent, rewardAmount: Number(e.target.value)})}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-saffron"
              />
            </div>
            <button type="submit" className="w-full bg-saffron text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> CREATE EVENT
            </button>
          </form>
        </div>

        {/* Coin Generation - Owner Only */}
        {isOwner && (
          <div className="bg-epic-gray rounded-2xl p-6 border border-purple-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-2xl rounded-full" />
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-purple-400">
              <Coins className="w-5 h-5" />
              Generate GHI Coins
            </h2>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <p className="text-sm text-purple-200">
                <strong>Owner Privilege:</strong> You can generate unlimited GHI Coins for yourself or any registered user.
              </p>
            </div>
            <form onSubmit={handleGrantCoins} className="space-y-4 relative z-10">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">User Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="user@example.com (or your email)"
                  value={targetEmail}
                  onChange={e => setTargetEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Amount to Grant</label>
                <input 
                  type="number" 
                  required min="1"
                  value={grantAmount}
                  onChange={e => setGrantAmount(Number(e.target.value))}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20">
                <Coins className="w-4 h-4" /> GRANT COINS
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Active Events List */}
      <div className="bg-epic-gray rounded-2xl p-6 border border-white/5">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          Active Events
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-500">No active events.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map(event => (
              <div key={event.id} className="bg-black/40 border border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  <span className="bg-saffron/20 text-saffron text-xs font-bold px-2 py-1 rounded">
                    +{event.rewardAmount} GHI
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{event.description}</p>
                <div className="text-xs text-gray-500">
                  Status: <span className={event.isActive ? "text-green-400" : "text-red-400"}>{event.isActive ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
