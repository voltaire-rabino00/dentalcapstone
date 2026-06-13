import { useEffect, useState } from 'react';
import axios from 'axios';
import { StatsCard } from '../../components/ui/StatsCard';
import { StaffTable } from '../../components/domain/StaffTable';
import type { Staff } from '../../components/domain/StaffTable';
import { AddStaffModal } from '../../components/modals/AddStaffModal';

export const ManageStaff = () => {
  const [staffData, setStaffData] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // We'll control fetching with a refresh counter to avoid synchronous setState in effects
  const [refreshIndex, setRefreshIndex] = useState(0);

  // Trigger to request a re-fetch (used by the modal after adding staff)
  const triggerRefresh = () => setRefreshIndex(i => i + 1);

  // Perform the fetch inside an async IIFE in the effect so state updates happen after async work
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/staffs');
        if (mounted) setStaffData(response.data);
      } catch (err) {
        console.error("Error fetching staff:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [refreshIndex]);

  return (
    <div className="p-8">
      {/* Header section */}
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Manage Staff</h1>
          <p className="text-slate-500">{staffData.length} total employees</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          + Add Staff
        </button>
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-3 gap-6">
        <StatsCard title="Total Staff" value={staffData.length} />
        <StatsCard title="Active" value={staffData.filter(s => s.status === 'Active').length} colorClass="text-teal-600" />
        <StatsCard title="Inactive" value={staffData.filter(s => s.status === 'Inactive').length} colorClass="text-slate-500" />
      </div>

      {/* Table section */}
      {loading ? (
        <div className="mt-6 text-center text-slate-500">Loading data...</div>
      ) : (
        <StaffTable data={staffData} />
      )}

      {/* Modal - Ito ay lalabas lang sa gitna ng dashboard mo */}
      <AddStaffModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={triggerRefresh} 
      />
    </div>
  );
};