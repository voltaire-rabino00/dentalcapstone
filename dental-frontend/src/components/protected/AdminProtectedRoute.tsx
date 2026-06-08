// src/components/protected/AdminProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

export const AdminProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  
  const user = userData ? JSON.parse(userData) : null;

  // I-convert ang role sa lowercase para sigurado
  const userRole = user?.role?.toLowerCase();

  // I-check kung "admin" (lowercase na ito)
  if (token && user && userRole === "admin") {
    return <Outlet />; 
  }

  return token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};