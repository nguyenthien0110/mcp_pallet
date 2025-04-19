"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { validateLogin } from "@/lib/auth";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (client: string, key: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (client: string, key: string) => {
    const result = await validateLogin(client, key);
    if (result) {
      localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("refresh_token", result.refresh_token);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
