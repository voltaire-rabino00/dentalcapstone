import React from 'react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm">Total Patients</p>
          <h3 className="text-3xl font-bold text-slate-900">128</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm">Staff Present</p>
          <h3 className="text-3xl font-bold text-teal-600">8</h3>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm">Add Staff</button>
          <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm">View Reports</button>
        </div>
      </div>
    </div>
  );
};