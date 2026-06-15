import { useState, useEffect } from 'react';
import type { Staff } from '../domain/StaffTable';

interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: Staff | null;
  onSave?: (data: Partial<Staff>) => void;
  isViewOnly?: boolean;
}

export const StaffModal = ({ isOpen, onClose, staff, onSave, isViewOnly = false }: StaffModalProps) => {
  // Initialize state based on staff prop
  const [formData, setFormData] = useState<Partial<Staff>>(
    staff || { name: '', email: '', role: '', contact: '', status: 'Active' }
  );

  // Gamitin ang isOpen bilang dependency para ma-reset ang form pagbukas/pagbago ng staff
useEffect(() => {
    // Gumamit ng timer para ma-defer ang state update sa susunod na tick
    const handler = setTimeout(() => {
      if (isOpen) {
        setFormData(staff || { name: '', email: '', role: '', contact: '', status: 'Active' });
      }
    }, 0);

    // Cleanup function para i-clear ang timeout
    return () => clearTimeout(handler);
  }, [staff, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">
          {isViewOnly ? 'Staff Information' : (staff ? 'Edit Staff Details' : 'Add New Staff')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
            <input 
              disabled={isViewOnly}
              className="w-full p-3 border border-slate-200 rounded-lg bg-white disabled:bg-slate-50 disabled:text-slate-500 transition-all outline-none focus:ring-2 focus:ring-slate-900" 
              value={formData.name || ''}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
            <input 
              disabled={isViewOnly}
              className="w-full p-3 border border-slate-200 rounded-lg bg-white disabled:bg-slate-50 disabled:text-slate-500 outline-none" 
              value={formData.email || ''}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Job Role */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Job Role</label>
            <input 
              disabled={isViewOnly}
              className="w-full p-3 border border-slate-200 rounded-lg bg-white disabled:bg-slate-50 disabled:text-slate-500 outline-none" 
              value={formData.role || ''}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Contact No.</label>
            <input 
              disabled={isViewOnly}
              className="w-full p-3 border border-slate-200 rounded-lg bg-white disabled:bg-slate-50 disabled:text-slate-500 outline-none" 
              value={formData.contact || ''}
              onChange={(e) => setFormData({...formData, contact: e.target.value})}
            />
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-600 mb-1">Status</label>
            <select 
              disabled={isViewOnly}
              className="w-full p-3 border border-slate-200 rounded-lg bg-white disabled:bg-slate-50 disabled:text-slate-500 outline-none"
              value={formData.status || 'Active'}
              onChange={(e) => setFormData({...formData, status: e.target.value as 'Active' | 'Inactive'})}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors"
          >
            {isViewOnly ? 'Close' : 'Cancel'}
          </button>
          
          {/* DITO NAG-I-ISOLATE: Lalabas lang ang Save button kung HINDI view-only */}
          {!isViewOnly && (
            <button 
              onClick={() => onSave?.(formData)} 
              className="px-6 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 shadow-lg transition-all"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};