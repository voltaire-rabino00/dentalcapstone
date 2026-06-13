import { useState } from 'react';
import axios from 'axios';

export const AddStaffModal = ({ isOpen, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', idNo: '', contact: '', status: 'Active', role: '' });
  const [error, setError] = useState(''); // State para sa error message

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error bago mag-submit
    try {
      await axios.post('http://localhost:5000/api/staffs', formData);
      onRefresh();
      onClose();
    } catch (err: unknown) {
      // Magpakita ng mas magandang error
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to connect to server. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Add New Staff</h2>
        
        {/* Error UI: Lalabas lang kapag may error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            required // Add required para hindi empty fields
            type="text" 
            placeholder="Full Name" 
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none" 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            required 
            type="email" 
            placeholder="Email Address" 
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none" 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />

          <select 
            required
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none bg-white"
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          >
            <option value="">Select Role</option>
            <option value="Dentist">Dentist</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Assistant">Assistant</option>
          </select>
          
          <input 
            required 
            type="text" 
            placeholder="ID Number" 
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none" 
            onChange={(e) => setFormData({...formData, idNo: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="Contact Number" 
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none" 
            onChange={(e) => setFormData({...formData, contact: e.target.value})}
          />
          <input 
            required 
            type="password" 
            placeholder="Temporary Password" 
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none" 
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium">Cancel</button>
            <button type="submit" className="px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 shadow-lg shadow-slate-200 font-medium">Save Staff</button>
          </div>
        </form>
      </div>
    </div>
  );
};