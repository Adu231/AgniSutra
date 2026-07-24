import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, UserRole } from '@/types';
import { DEMO_ACCOUNTS } from '@/constants';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  organization: string;
  role?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const FALLBACK_USER: User = {
  id: 'usr_001',
  name: 'Arjun Mehta',
  email: 'officer@agnisutra.demo',
  role: 'safety_officer',
  organization: 'DLF Commercial Properties',
  phone: '+91 98765 43210',
  department: 'Fire Safety & Compliance',
  location: 'Mumbai, Maharashtra',
  joinedAt: '2024-01-15',
  lastActive: new Date().toISOString(),
  plan: 'professional',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('agnisutra_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('agnisutra_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));

    // Check demo accounts first
    const demoAccount = DEMO_ACCOUNTS.find(
      a => a.email.toLowerCase() === email.toLowerCase()
    );

    if (demoAccount) {
      if (password !== demoAccount.password) {
        setIsLoading(false);
        return { success: false, error: 'Incorrect password for this demo account. Use: demo123' };
      }
      const loggedUser: User = {
        id: `usr_${demoAccount.role}`,
        name: demoAccount.name,
        email: demoAccount.email,
        role: demoAccount.role as UserRole,
        organization: demoAccount.org,
        phone: '+91 98765 43210',
        department: demoAccount.label,
        location: 'Mumbai, Maharashtra',
        joinedAt: '2024-01-01',
        lastActive: new Date().toISOString(),
        plan: demoAccount.role === 'admin' ? 'enterprise' : 'professional',
      };
      setUser(loggedUser);
      localStorage.setItem('agnisutra_user', JSON.stringify(loggedUser));
      setIsLoading(false);
      return { success: true };
    }

    // Generic login for non-demo accounts
    if (password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Invalid email or password. Try a demo account above.' };
    }

    const genericUser: User = {
      ...FALLBACK_USER,
      id: `usr_${Date.now()}`,
      email,
      name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    };
    setUser(genericUser);
    localStorage.setItem('agnisutra_user', JSON.stringify(genericUser));
    setIsLoading(false);
    return { success: true };
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: data.name,
      email: data.email,
      role: 'safety_officer',
      organization: data.organization,
      joinedAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      plan: 'free',
    };

    setUser(newUser);
    localStorage.setItem('agnisutra_user', JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('agnisutra_user');
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    await new Promise(r => setTimeout(r, 800));
    if (user) {
      const updated = { ...user, ...data, lastActive: new Date().toISOString() };
      setUser(updated);
      localStorage.setItem('agnisutra_user', JSON.stringify(updated));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
