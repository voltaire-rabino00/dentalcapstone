import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../../components/ui/InputField.js";
import { SuccessModal } from "../../components/ui/SuccessfulModal.js";
import axiosInstance from "../../api/axiosInstance.js";

// Import mo ang mga GIF mo rito
import successGif from "../../assets/success.gif";
import errorGif from "../../assets/error.gif"; 

export const RegisterPatient: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  
  // Dalawang state para sa modals
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axiosInstance.post("/auth/register", { ...formData, role: "Patient" });
      setIsSuccessModalOpen(true); // Buksan ang Success Modal
    } catch (err) {
      console.error(err);
      setIsErrorModalOpen(true); // Buksan ang Error Modal imbes na alert()
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - Dental Branding */}
      <div className="hidden md:flex flex-1 bg-teal-600 p-12 flex-col justify-center text-white">
        <h1 className="text-4xl font-bold mb-6">Smile with Confidence.</h1>
        <p className="text-teal-50 text-lg max-w-sm">
          Join our clinic management system to easily book appointments, track your dental history, and keep your smile healthy.
        </p>
      </div>

      {/* Main Form Section */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
            <p className="text-slate-500 mt-2">Enter your details to register as a patient.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField label="Full Name" type="text" placeholder="e.g. Juan Dela Cruz" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} />
            
            <InputField label="Email Address" type="email" placeholder="name@company.com" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
            
            <InputField label="Password" type="password" placeholder="••••••••" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} />

            <button type="submit" disabled={isLoading} 
              className="w-full py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200">
              {isLoading ? "Processing..." : "Register Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account? {" "}
            <Link to="/login" className="text-teal-600 font-semibold hover:underline">Log in</Link>
          </p>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={() => navigate("/login")}
        title="Welcome to our Family!"
        message="Your account has been successfully created."
        gifUrl={successGif}
      />

      {/* Error Modal */}
      <SuccessModal 
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="Registration Failed"
        message="Something went wrong. Please check your details and try again."
        gifUrl={errorGif}
      />
    </div>
  );
};