import React, { useState } from "react";
import { QRScanner } from "../../components/ui/QrScanner";
import { staffAuth } from "../../api/authService"; // Import ang auth service
import { useNavigate } from "react-router-dom";

export const StaffLogin: React.FC = () => {
  const [isQRMode, setIsQRMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleQRLogin = async (result: string | null) => {
    if (!result || loading) return;

    try {
      setLoading(true);
      const response = await staffAuth.verifyQRCode(result);
      
      // I-save ang token/user sa localStorage/context
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect based on activation status
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
          <div className="space-y-4">
            {/* Dito mo mamaya i-render ang PasswordLoginForm */}
            <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-500">
              Password Form Placeholder
            </div>
          </div>
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