import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Idagdag ang useNavigate
import { InputField } from "../../components/ui/InputField.js";
import axiosInstance from "../../api/axiosInstance.js";

export const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Default UI para sa error
  const navigate = useNavigate();

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Koneksyon sa backend
      const response = await axiosInstance.post("/auth/login", formData);
      const { token, user } = response.data.data;
      
      // 2. I-save ang credentials
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // 3. DYNAMIC REDIRECTION (Dito ang magic!)
      // Tinitignan natin ang 'role' na galing sa database
      if (user.role === "Admin") {
        navigate("/admin/dashboard"); // Para sa Admin
      } else if (user.role === "staff" || user.role === "dentist") {
        navigate("/staff/dashboard"); // O kahit anong route para sa staff
      } else {
        navigate("/dashboard"); // Default para sa Patient
      }

    } catch (err: unknown) {
      console.error(err);
      // Mas magandang error message base sa server response
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex flex-1 bg-teal-700 p-12 flex-col justify-center text-white">
        <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
        <p className="text-teal-50 text-lg max-w-sm">
          Access your dental records, schedule appointments, and manage your oral health with ease.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Sign In</h2>
            <p className="text-slate-500 mt-2">Welcome back to your portal.</p>
          </div>

          {/* Default UI para sa Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField 
              label="Email Address" 
              type="email" 
              placeholder="name@company.com" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
            
            <InputField 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don't have an account? {" "}
            <Link to="/register" className="text-teal-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};