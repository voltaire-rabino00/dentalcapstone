import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/auth/Login.js";
import { RegisterPatient } from "./pages/auth/RegisterPatient.js";
import { ProtectedRoute } from "./components/protected/ProtectedRoute.js";
import { Layout } from "./components/layout/Layout.js"; // Siguraduhin na tama ang import path nito
import { PatientDashboard } from "./pages/patient/PatientDashboard.js";
import { AdminProtectedRoute } from "./components/protected/AdminProtectedRoute.js";
import { AdminLayout } from "./components/layout/AdminLayout.js";
import { AdminDashboard } from "./pages/admin/AdminDashboard.js";
// import { AdminAttendance } from "./pages/admin/AdminAttendance.js"; 
// import { AdminPatients } from "./pages/admin/AdminPatients.js";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPatient />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* --- Patient Protected Routes --- */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<PatientDashboard />} />
            {/* Dito mo ilalagay ang booking at medical records sa future */}
          </Route>
        </Route>

        {/* --- Admin Protected Routes --- */}
        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
           <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* <Route path="/admin/attendance" element={<AdminAttendance />} />
        <Route path="/admin/patients" element={<AdminPatients />} /> */}
          </Route>
        </Route>

        {/* Catch-all route for invalid paths */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;