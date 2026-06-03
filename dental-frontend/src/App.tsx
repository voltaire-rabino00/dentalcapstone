import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/auth/Login.js";
import { RegisterPatient } from "./pages/auth/RegisterPatient.js";
import { ProtectedRoute } from "./components/protected/ProtectedRoute.js";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPatient />} />
        
        {/* Default route: Redirect sa Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

  
        <Route element={<ProtectedRoute />}>
          {/* <Route path="/dashboard" element={<PatientDashboard />} /> */}
        </Route>
       
      </Routes>
    </Router>
  );
}

export default App;