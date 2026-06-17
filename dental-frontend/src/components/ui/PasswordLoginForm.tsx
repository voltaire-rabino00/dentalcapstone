import React, { useState } from "react"; // Huwag kalimutan ito!

interface PasswordLoginFormProps {
  onLogin: (data: unknown) => void;
  loading: boolean;
}

export const PasswordLoginForm: React.FC<PasswordLoginFormProps> = ({ onLogin, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        type="email" 
        placeholder="Staff Email" 
        className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 outline-none" 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 outline-none" 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button 
        type="submit" 
        disabled={loading} 
        className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};