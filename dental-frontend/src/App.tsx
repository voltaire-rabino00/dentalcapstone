import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/Login.js";
import { RegisterPatient } from "./pages/auth/RegisterPatient";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dito natin ilalagay ang mga pages mo */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPatient />} />
        
        {/* Default route (redirect sa login) */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;