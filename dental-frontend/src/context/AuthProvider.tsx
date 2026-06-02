import React, { useState } from "react";
import { AuthContext, type User } from "./AuthContext.js";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 🎯 Lazy State Initialization: Diretsong binabasa ang localStorage SA LOOB ng useState.
  // Walang useEffect, walang side-effects, walang cascading renders!
  const [authState, setAuthState] = useState<{
    user: User | null;
    token: string | null;
    loading: boolean;
  }>(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        return {
          token: storedToken,
          user: JSON.parse(storedUser) as User,
          loading: false,
        };
      }
    } catch (error) {
      console.error("Failed to parse stored authentication state:", error);
    }

    return {
      user: null,
      token: null,
      loading: false,
    };
  });

  const login = (userData: User, tokenStr: string) => {
    localStorage.setItem("token", tokenStr);
    localStorage.setItem("user", JSON.stringify(userData));
    setAuthState({
      user: userData,
      token: tokenStr,
      loading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthState({
      user: null,
      token: null,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        token: authState.token,
        loading: authState.loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};