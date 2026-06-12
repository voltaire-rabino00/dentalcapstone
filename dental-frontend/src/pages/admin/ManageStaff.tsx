import { useEffect, useState } from 'react';
import axios from 'axios';
import { StatsCard } from '../../components/ui/StatsCard';
import { StaffTable } from '../../components/domain/StaffTable';
import type { Staff } from '../../components/domain/StaffTable';

export const ManageStaff = () => {
  const [staffData, setStaffData] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/staffs');
        setStaffData(response.data);
      } catch (err) {
        console.error("Error fetching staff:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Manage Staff</h1>
          <p className="text-slate-500">{staffData.length} total employees</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors">
          + Add Staff
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <StatsCard title="Total Staff" value={staffData.length} />
        <StatsCard title="Active" value={staffData.filter(s => s.status === 'Active').length} colorClass="text-teal-600" />
        <StatsCard title="Inactive" value={staffData.filter(s => s.status === 'Inactive').length} colorClass="text-red-500" />
      </div>

      {loading ? (
        <div className="mt-6 text-center text-slate-500">Loading data...</div>
      ) : (
        <StaffTable data={staffData} />
      )}
    </div>
  );
};