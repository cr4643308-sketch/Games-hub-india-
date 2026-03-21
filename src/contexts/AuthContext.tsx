import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot, updateDoc, increment } from 'firebase/firestore';
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  ghiCoins: number;
  role: 'user' | 'manager' | 'owner';
  claimedEvents?: string[];
  createdAt: string;
}

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  isGuest: boolean;
  loading: boolean;
  authError: string | null;
  skipLogin: () => void;
  addCoins: (amount: number) => Promise<void>;
  spendCoins: (amount: number) => Promise<boolean>;
  claimEvent: (eventId: string, rewardAmount: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerkAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let unsubProfile: () => void;

    const syncProfile = async () => {
      if (!isLoaded) return;
      
      if (user) {
        setIsGuest(false);
        localStorage.removeItem('isGuest');
        setAuthError(null);
        const userRef = doc(db, 'users', user.id);
        
        try {
          const docSnap = await getDoc(userRef);
          if (!docSnap.exists()) {
            const newProfile: UserProfile = {
              uid: user.id,
              email: user.primaryEmailAddress?.emailAddress || 'no-email@example.com',
              displayName: user.fullName || user.username || 'Gamer',
              photoURL: user.imageUrl || '',
              ghiCoins: 0,
              role: 'user',
              createdAt: new Date().toISOString(),
            };
            await setDoc(userRef, newProfile);
            setProfile(newProfile);
          } else {
            setProfile(docSnap.data() as UserProfile);
          }

          unsubProfile = onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
              setProfile(doc.data() as UserProfile);
            }
          });
          
          setLoading(false);
        } catch (error: any) {
          console.error("Error fetching/creating user profile:", error);
          setAuthError(`Error setting up your profile: ${error.message}. Please try again.`);
          await signOut();
          setProfile(null);
          setLoading(false);
        }
      } else {
        setProfile(null);
        if (localStorage.getItem('isGuest') === 'true') {
          skipLogin();
        }
        setLoading(false);
        if (unsubProfile) unsubProfile();
      }
    };

    syncProfile();

    return () => {
      if (unsubProfile) unsubProfile();
    };
  }, [user, isLoaded]);

  const skipLogin = () => {
    setIsGuest(true);
    localStorage.setItem('isGuest', 'true');
    const savedCoins = parseInt(localStorage.getItem('guestCoins') || '0', 10);
    setProfile({
      uid: 'guest',
      email: 'guest@example.com',
      displayName: 'Guest User',
      photoURL: '',
      ghiCoins: savedCoins,
      role: 'user',
      createdAt: new Date().toISOString(),
      claimedEvents: JSON.parse(localStorage.getItem('guestClaimedEvents') || '[]')
    });
  };

  const addCoins = async (amount: number) => {
    if (isGuest && profile) {
      const newCoins = profile.ghiCoins + amount;
      localStorage.setItem('guestCoins', newCoins.toString());
      setProfile({ ...profile, ghiCoins: newCoins });
      return;
    }
    if (!user) return;
    const userRef = doc(db, 'users', user.id);
    await updateDoc(userRef, {
      ghiCoins: increment(amount)
    });
  };

  const spendCoins = async (amount: number): Promise<boolean> => {
    if (isGuest && profile) {
      if (profile.ghiCoins < amount) return false;
      const newCoins = profile.ghiCoins - amount;
      localStorage.setItem('guestCoins', newCoins.toString());
      setProfile({ ...profile, ghiCoins: newCoins });
      return true;
    }
    if (!user || !profile) return false;
    if (profile.ghiCoins < amount) return false;
    
    const userRef = doc(db, 'users', user.id);
    await updateDoc(userRef, {
      ghiCoins: increment(-amount)
    });
    return true;
  };

  const claimEvent = async (eventId: string, rewardAmount: number) => {
    if (isGuest && profile) {
      const claimedEvents = profile.claimedEvents || [];
      if (!claimedEvents.includes(eventId)) {
        const newCoins = profile.ghiCoins + rewardAmount;
        const newClaimedEvents = [...claimedEvents, eventId];
        localStorage.setItem('guestCoins', newCoins.toString());
        localStorage.setItem('guestClaimedEvents', JSON.stringify(newClaimedEvents));
        setProfile({ ...profile, ghiCoins: newCoins, claimedEvents: newClaimedEvents });
      }
      return;
    }
    if (!user) return;
    const userRef = doc(db, 'users', user.id);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const claimedEvents = data.claimedEvents || [];
      if (!claimedEvents.includes(eventId)) {
        await updateDoc(userRef, {
          ghiCoins: increment(rewardAmount),
          claimedEvents: [...claimedEvents, eventId]
        });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, isGuest, loading, authError, skipLogin, addCoins, spendCoins, claimEvent }}>
      {children}
    </AuthContext.Provider>
  );
};
