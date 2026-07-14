// pages/staff/StaffLogin.tsx
import React, { useState } from "react";
import { QRScanner } from "../../components/ui/QrScanner";
import { staffAuth } from "../../api/authService";
import { useNavigate } from "react-router-dom";
import { PasswordLoginForm } from "../../components/ui/PasswordLoginForm";

interface LoginCredentials {
  email: string;
  password: string;
}

export const StaffLogin: React.FC = () => {
  const [isQRMode, setIsQRMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // --- 1. QR Login Handler ---
  const handleQRLogin = async (result: string | null) => {
    if (!result || loading) return;
    try {
      setLoading(true);
      const response = await staffAuth.verifyQRCode(result);
      // Gamitin natin ang response structure mula sa backend (data.data)
      const { token, user } = response.data.data;
      
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      
      navigate("/staff/dashboard");
    } catch (error) {
      console.error("QR Login Failed:", error);
      alert("Invalid QR Code or Session Expired");
    } finally {
      setLoading(false);
    }
  };

  // --- 2. Password Login Handler (Fixed) ---
  const handlePasswordLogin = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await staffAuth.loginWithPassword(credentials);
      
      // I-destructure ang response base sa structure ng backend mo
      const { token, user } = response.data.data;

      if (token && user) {
        // I-save ang parehong token at user object
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        
        // Diretsong punta sa dashboard dahil admin-only invitation ang system mo
        navigate("/staff/dashboard"); 
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          {isQRMode ? "Staff QR Login" : "Staff Password Login"}
        </h1>

        {isQRMode ? (
          <div className="flex flex-col items-center">
            <QRScanner onScan={handleQRLogin} />
            {loading && <p className="mt-2 text-sm text-teal-600">Verifying...</p>}
          </div>
        ) : (
          <PasswordLoginForm 
            onLogin={handlePasswordLogin} 
            loading={loading} 
          />
        )}

        <button 
          onClick={() => setIsQRMode(!isQRMode)}
          className="mt-6 w-full text-sm text-teal-600 font-medium hover:underline transition-all"
        >
          {isQRMode ? "← Use Password Login" : "Use QR Code Login →"}
        </button>
      </div>
    </div>
  );
};