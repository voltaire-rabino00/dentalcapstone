import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/auth/Login.js";
import { RegisterPatient } from "./pages/auth/RegisterPatient.js";
import { ProtectedRoute } from "./components/protected/ProtectedRoute.js";
import { Layout } from "./components/layout/Layout.js"; // Siguraduhin na tama ang import path nito
import { PatientDashboard } from "./pages/patient/PatientDashboard.js";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPatient />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* I-wrap ang dashboard sa Layout para lumabas ang Sidebar */}
          <Route element={<Layout />}>
            {/* DITO MO ILAGAY ANG MGA URL PATHS */}
            <Route path="/dashboard" element={<PatientDashboard />} />
            {/* Kapag may Booking at MedicalRecords ka na, 
               ilalagay mo lang sila rito gaya nito:
               <Route path="/booking" element={<Booking />} />
               <Route path="/medical-records" element={<MedicalRecords />} />
            */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;