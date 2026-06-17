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
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      if (!response.data.user.isActivated) {
        navigate("/staff/setup");
      } else {
        navigate("/staff/dashboard");
      }
    } catch (error) {
      console.error("QR Login Failed:", error);
      alert("Invalid QR Code or Session Expired");
    } finally {
      setLoading(false);
    }
  };

  // --- 2. Password Login Handler (Dapat nasa loob ng component!) ---
const handlePasswordLogin = async (credentials: LoginCredentials) => {
  try {
    setLoading(true);
    const response = await staffAuth.loginWithPassword(credentials);
    
    // I-log natin ang buong response para makita kung nasaan ang 'user'
    console.log("Full Login Response:", response); 
    
    // Siguraduhin na ang path ay tugma sa response structure
    // Halimbawa, kung ang 'user' ay nasa loob ng 'data':
    const userData = response.data?.user || response.data; 

    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      
      if (!userData.isActivated) {
        navigate("/staff/setup");
      } else {
        navigate("/staff/dashboard"); 
      }
    }
  } catch (error) {
    console.error("Login error details:", error);
    alert("Login failed!");
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