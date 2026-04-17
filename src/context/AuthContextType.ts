import { createContext } from 'react';

export interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
