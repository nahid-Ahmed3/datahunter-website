'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@/lib/firebase';
import { devCreateUserWithEmailAndPassword, devSignInWithEmailAndPassword, devSignOut } from '@/lib/dev-auth-service';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  isDevMode: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: async () => {},
  error: null,
  isDevMode: false,
  signUp: async () => {},
  signIn: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    let unsubscribe: () => void;

    const initializeAuth = async () => {
      try {
        // Check if auth is properly initialized
        if (!auth) {
          setIsDevMode(true);
          // In dev mode, we'll simulate user state
          setLoading(false);
          return;
        }

        unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);
        }, (error) => {
          setError('Authentication error occurred');
          setLoading(false);
        });
      } catch (error: any) {
        setIsDevMode(true);
        setError('Authentication system using development mode');
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      if (!isDevMode && auth) {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      } else {
        // Mock Google sign in
        console.log('Mock Google sign in successful');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with Google');
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      if (!isDevMode && auth) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await devCreateUserWithEmailAndPassword(email, password);
        console.log('Mock sign up successful');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to create account');
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      if (!isDevMode && auth) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await devSignInWithEmailAndPassword(email, password);
        console.log('Mock sign in successful');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to sign in');
      throw error;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      if (!isDevMode && auth) {
        await signOut(auth);
      } else {
        await devSignOut();
        console.log('Mock logout successful');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to logout');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signInWithGoogle, 
      logout, 
      error, 
      isDevMode,
      signUp,
      signIn
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}