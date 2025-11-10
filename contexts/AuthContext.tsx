
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  signup: (email: string, name: string) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial auth check
    setLoading(false);
  }, []);

  const login = useCallback((email: string, name: string) => {
    // In a real app, you'd call an API and get a JWT.
    // Here, we'll just simulate a successful login.
    const mockUser: User = { id: `user_${Date.now()}`, email, name };
    setUser(mockUser);
  }, [setUser]);

  const signup = useCallback((email: string, name: string) => {
    // Signup and login are the same in this mock version
    login(email, name);
  }, [login]);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const value = { user, login, logout, signup, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
