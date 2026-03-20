import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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
  authError: string | null;
  loginWithGoogle: (e?: React.MouseEvent) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string, name: string) => Promise<void>;
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

  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let unsubProfile: () => void;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsGuest(false);
        localStorage.removeItem('isGuest');
        setAuthError(null);
        const userRef = doc(db, 'users', currentUser.uid);
        
        try {
          // Check if user exists, if not create them
          const docSnap = await getDoc(userRef);
          if (!docSnap.exists()) {
            const newProfile: UserProfile = {
              uid: currentUser.uid,
              email: currentUser.email || 'no-email@example.com',
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
        } catch (error: any) {
          console.error("Error fetching/creating user profile:", error);
          setAuthError(`Error setting up your profile: ${error.message}. Please try again.`);
          await signOut(auth);
          setUser(null);
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
    });

    return () => {
      unsubscribe();
      if (unsubProfile) unsubProfile();
    };
  }, []);

  const loginWithGoogle = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        setAuthError("Sign-in popup was closed before completing. Please try again.");
      } else if (error.code === 'auth/popup-blocked') {
        setAuthError("Sign-in popup was blocked by your browser. Please allow popups for this site.");
      } else if (error.code === 'auth/unauthorized-domain') {
        setAuthError(`This domain is not authorized for Google Sign-In. Please add ${window.location.hostname} to the Authorized Domains in your Firebase Console (Authentication > Settings > Authorized domains).`);
      } else if (error.code === 'auth/cancelled-popup-request') {
        setAuthError("Sign-in popup request was cancelled. Please try again.");
      } else {
        setAuthError(`Failed to sign in with Google: ${error.message}`);
      }
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Email login failed:", error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setAuthError("Invalid email or password.");
      } else if (error.code === 'auth/operation-not-allowed') {
        setAuthError("Email/password login is not enabled in Firebase Console. Please enable it under Authentication > Sign-in method.");
      } else {
        setAuthError(`Failed to sign in: ${error.message}`);
      }
    }
  };

  const registerWithEmail = async (email: string, password: string, name: string) => {
    setAuthError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      
      // The onAuthStateChanged listener will handle creating the user document
    } catch (error: any) {
      console.error("Email registration failed:", error);
      if (error.code === 'auth/email-already-in-use') {
        setAuthError("An account with this email already exists.");
      } else if (error.code === 'auth/weak-password') {
        setAuthError("Password should be at least 6 characters.");
      } else if (error.code === 'auth/operation-not-allowed') {
        setAuthError("Email/password registration is not enabled in Firebase Console. Please enable it under Authentication > Sign-in method.");
      } else {
        setAuthError(`Failed to register: ${error.message}`);
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
    setIsGuest(false);
    localStorage.removeItem('isGuest');
  };

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
    const userRef = doc(db, 'users', user.uid);
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
    
    const userRef = doc(db, 'users', user.uid);
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
    <AuthContext.Provider value={{ user, profile, isGuest, loading, authError, loginWithGoogle, loginWithEmail, registerWithEmail, logout, skipLogin, addCoins, spendCoins, claimEvent }}>
      {children}
    </AuthContext.Provider>
  );
};
