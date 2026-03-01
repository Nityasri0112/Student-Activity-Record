import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext({ 
  user: null, 
  login: () => {}, 
  logout: () => {} 
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Check localStorage for existing user session
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
