// src/components/protected/AdminProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

export const AdminProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  
  const user = userData ? JSON.parse(userData) : null;
  const userRole = user?.role?.toLowerCase();

  // DEBUGGING: I-log ito sa console (F12 > Console tab)
  console.log("Token:", token);
  console.log("User:", user);
  console.log("Role:", userRole);

  if (token && user && userRole === "admin") {
    return <Outlet />; 
  }

  console.log("Redirecting to login..."); // Tignan kung lumalabas ito pag-click mo
  return token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};