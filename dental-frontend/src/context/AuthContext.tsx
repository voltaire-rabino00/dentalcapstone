import { createContext, useContext } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "Admin" | "Dentist" | "Staff" | "Patient";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, tokenStr: string) => void;
  logout: () => void;
  loading: boolean;
}

// 🎯 Isang malinis na context object export lang
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🎯 Dito na rin natin isama ang useAuth hook para isang tawag na lang sa iba pang files!
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};