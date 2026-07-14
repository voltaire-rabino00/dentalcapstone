import { Navigate, Outlet } from "react-router-dom";

export const StaffProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  
  const user = userData ? JSON.parse(userData) : null;
  const userRole = user?.role?.toLowerCase(); // Siguraduhin na 'staff' ang role sa database

  // Check kung may token at kung ang role ay 'staff'
  if (token && user && userRole === "staff") {
    return <Outlet />;
  }

  // Kung hindi staff, i-redirect sa login
  return <Navigate to="/staff/login" replace />;
};