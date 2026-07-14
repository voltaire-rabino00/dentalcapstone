import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { Login } from "./pages/auth/Login.js";
import { RegisterPatient } from "./pages/auth/RegisterPatient.js";
import { ProtectedRoute } from "./components/protected/ProtectedRoute.js";
import { Layout } from "./components/layout/Layout.js";
import { PatientDashboard } from "./pages/patient/PatientDashboard.js";
import { AdminProtectedRoute } from "./components/protected/AdminProtectedRoute.js";
import { AdminLayout } from "./components/layout/AdminLayout.js";
import { AdminDashboard } from "./pages/admin/AdminDashboard.js";
import { ManageStaff } from "./pages/admin/ManageStaff.js";
import { StaffLogin } from "./pages/staff/StaffLogin.js";
import { AttendancePage } from "./pages/admin/ManageAttendance.js";
import { StaffDashboard } from "./pages/staff/StaffDashboard.js";
import { StaffProtectedRoute } from "./components/protected/StaffProtectedRoute.js";
// import { StaffSetup } from "./pages/staff/StaffSetup.js";

// Initialize the socket ONCE at module scope, outside the component.
// Replace the URL with your actual backend server address (e.g. from an env var).
const socket = io(import.meta.env.VITE_SOCKET_URL ?? "http://localhost:5000");

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Frontend connected to Socket.io! ID:", socket.id);
    });

    socket.on("new-attendance", (data) => {
      console.log("May bagong attendance:", data);
    });

    return () => {
      socket.off("connect");
      socket.off("new-attendance");
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/register" element={<RegisterPatient />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* --- Patient Protected Routes --- */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<PatientDashboard />} />
            {/* <Route path="/staff/setup" element={<StaffSetup />} /> */}
          </Route>
        </Route>

        {/* --- Admin Protected Routes --- */}
        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/staff" element={<ManageStaff />} /> 
            <Route path="/admin/attendance" element={<AttendancePage />} />
          </Route>
        </Route>

              {/* --- Staff Protected Routes --- */}
        <Route element={<StaffProtectedRoute />}>
            <Route path="/staff/dashboard" element={<StaffDashboard />} />
          </Route>

        {/* Catch-all route for invalid paths */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;