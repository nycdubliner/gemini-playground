import { useState, useEffect, type ReactNode } from 'react';
import { getAccessToken, redirectToAuthCodeFlow } from '../services/spotify';
import { AuthContext } from './AuthContextType';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      getAccessToken(code)
        .then((token) => {
          setAccessToken(token);
          setIsAuthenticated(true);
          localStorage.setItem('spotify_access_token', token);
          window.history.pushState({}, document.title, window.location.pathname);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const storedToken = localStorage.getItem('spotify_access_token');
      if (storedToken) {
        setAccessToken(storedToken);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    }
  }, []);

  const login = () => {
    redirectToAuthCodeFlow();
  };

  const logout = () => {
    setAccessToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('spotify_access_token');
    window.location.href = window.location.origin;
  };

  return (
    <AuthContext.Provider value={{ accessToken, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
