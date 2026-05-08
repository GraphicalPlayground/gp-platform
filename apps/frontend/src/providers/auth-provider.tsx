'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

type User = {
  id: string;
  email: string;
  pseudo: string;
  role: 'student' | 'instructor' | 'admin';
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = Cookies.get('auth');
    if (auth) {
      try {
        setUser(JSON.parse(auth));
      } catch (e) {
        console.error('Failed to parse auth cookie');
        Cookies.remove('auth');
        Cookies.remove('token');
      }
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    Cookies.remove('auth', { path: '/' });
    Cookies.remove('token', { path: '/' });
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
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
