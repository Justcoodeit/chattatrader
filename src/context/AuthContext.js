import { createContext, useContext, useState, useEffect } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { COOKIES } from '../libs/builder/constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = getCookie(COOKIES.auth_Token);
      setIsAuthenticated(!!token);
    };

    // Check auth status initially
    checkAuth();

    // Set up an interval to check auth status periodically
    const interval = setInterval(checkAuth, 5000); // Check every 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const login = (token) => {
    setCookie(COOKIES.auth_Token, token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    deleteCookie(COOKIES.auth_Token);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
