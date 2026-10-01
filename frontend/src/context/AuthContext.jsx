import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, getAdminProfile } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dense360_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('dense360_access_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('dense360_access_token');
      if (storedToken) {
        try {
          const res = await getAdminProfile();
          setUser(res.data);
          localStorage.setItem('dense360_user', JSON.stringify(res.data));
        } catch (err) {
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (username, password) => {
    const res = await loginAdmin(username, password);
    const { access, refresh, user: userData } = res.data;
    localStorage.setItem('dense360_access_token', access);
    localStorage.setItem('dense360_refresh_token', refresh);
    localStorage.setItem('dense360_user', JSON.stringify(userData));
    setToken(access);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('dense360_access_token');
    localStorage.removeItem('dense360_refresh_token');
    localStorage.removeItem('dense360_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
