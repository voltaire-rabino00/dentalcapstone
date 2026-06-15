import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../../components/ui/InputField.js";
import axiosInstance from "../../api/axiosInstance.js";
import axios from "axios";

export const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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

      // 3. Dynamic Redirection base sa role
      if (user.role === "Admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "staff" || user.role === "dentist") {
        navigate("/staff/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      // 4. Maayos na error handling
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 429) {
          setError("Too many failed attempts. Please wait 15 minutes before trying again.");
        } else if (err.response?.status === 401) {
          setError("Invalid email or password.");
        } else {
          setError(err.response?.data?.message || "Something went wrong. Please try again later.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar/Branding */}
      <div className="hidden md:flex flex-1 bg-teal-700 p-12 flex-col justify-center text-white">
        <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
        <p className="text-teal-50 text-lg max-w-sm">
          Access your dental records, schedule appointments, and manage your oral health with ease.
        </p>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Sign In</h2>
            <p className="text-slate-500 mt-2">Welcome back to your portal.</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label="Email Address"
              type="email"
              placeholder="name@company.com"
              value={formData.email} // Idinagdag para sa controlled state
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password} // Idinagdag para sa controlled state
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 text-white font-semibold rounded-xl transition-all shadow-lg ${
                isLoading 
                  ? "bg-teal-400 cursor-not-allowed" 
                  : "bg-teal-600 hover:bg-teal-700 shadow-teal-200"
              }`}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-teal-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};