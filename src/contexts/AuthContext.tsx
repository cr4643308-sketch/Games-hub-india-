import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, updateDoc, increment } from 'firebase/firestore';

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
  user: FirebaseUser | null;
  profile: UserProfile | null;
  isGuest: boolean;
  loading: boolean;
  loginWithGoogle: (e?: React.MouseEvent) => Promise<void>;
  logout: () => Promise<void>;
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
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubProfile: () => void;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsGuest(false);
        const userRef = doc(db, 'users', currentUser.uid);
        
        // Check if user exists, if not create them
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
          const newProfile: UserProfile = {
            uid: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || 'Gamer',
            photoURL: currentUser.photoURL || '',
            ghiCoins: 0,
            role: 'user',
            createdAt: new Date().toISOString(),
          };
          await setDoc(userRef, newProfile);
          setProfile(newProfile);
        } else {
          setProfile(docSnap.data() as UserProfile);
        }

        // Listen for real-time coin updates
        unsubProfile = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            setProfile(doc.data() as UserProfile);
          }
        });
        
        setLoading(false);
      } else {
        setProfile(null);
        setLoading(false);
        if (unsubProfile) unsubProfile();
      }
    });

    return () => {
      unsubscribe();
      if (unsubProfile) unsubProfile();
    };
  }, []);

  const loginWithGoogle = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        alert("Sign-in popup was closed before completing. Please try again.");
      } else if (error.code === 'auth/popup-blocked') {
        alert("Sign-in popup was blocked by your browser. Please allow popups for this site.");
      } else if (error.code === 'auth/unauthorized-domain') {
        alert("This domain is not authorized for Google Sign-In. Please check Firebase settings.");
      } else {
        alert("Failed to sign in with Google. Please try again later.");
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
    setIsGuest(false);
  };

  const skipLogin = () => {
    setIsGuest(true);
  };

  const addCoins = async (amount: number) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      ghiCoins: increment(amount)
    });
  };

  const spendCoins = async (amount: number): Promise<boolean> => {
    if (!user || !profile) return false;
    if (profile.ghiCoins < amount) return false;
    
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      ghiCoins: increment(-amount)
    });
    return true;
  };

  const claimEvent = async (eventId: string, rewardAmount: number) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
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
    <AuthContext.Provider value={{ user, profile, isGuest, loading, loginWithGoogle, logout, skipLogin, addCoins, spendCoins, claimEvent }}>
      {children}
    </AuthContext.Provider>
  );
};
