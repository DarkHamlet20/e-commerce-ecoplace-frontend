import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('auth_token'),
    role: localStorage.getItem('userRole'),
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setAuth({
        token: localStorage.getItem('auth_token'),
        role: localStorage.getItem('userRole'),
      });
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (token, role) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('userRole', role);
    setAuth({ token, role });
  };

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
