import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // Kung walang token, redirect sa login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};