import React, { useState } from "react";

export const PatientDashboard: React.FC = () => {
  const [userName] = useState<string>(() => {
    const userData = localStorage.getItem("user");

    if (!userData) return "";

    try {
      const user = JSON.parse(userData);
      return user.name || "";
    } catch {
      return "";
    }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">
        Welcome Back, {userName || "Patient"}!
      </h1>
      <p className="text-slate-600 mt-2">
        Manage your dental health here.
      </p>
    </div>
  );
};