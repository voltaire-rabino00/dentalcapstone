import { useEffect, useState } from 'react';
import axios from 'axios';
import { StatsCard } from '../../components/ui/StatsCard';
import { StaffTable } from '../../components/domain/StaffTable';
import type { Staff } from '../../components/domain/StaffTable';
import { AddStaffModal } from '../../components/modals/AddStaffModal';
import { StaffModal } from '../../components/modals/StaffModal';
import { ViewStaffModal } from '../../components/modals/ViewStaffModal';

export const ManageStaff = () => {
  const [staffData, setStaffData] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modals States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const triggerRefresh = () => setRefreshIndex(i => i + 1);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      try {
        await axios.delete(`http://localhost:5000/api/staffs/${id}`);
        triggerRefresh();
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete staff.");
      }
    }
  };

  const handleEdit = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsEditModalOpen(true);
  };

  const handleView = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsViewModalOpen(true);
  };

  const handleUpdate = async (updatedData: Partial<Staff>) => {
    try {
      await axios.put(`http://localhost:5000/api/staffs/${selectedStaff?._id}`, updatedData);
      setIsEditModalOpen(false);
      triggerRefresh();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update staff.");
    }
  };

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
    return () => { mounted = false; };
  }, [refreshIndex]);

  return (
    <div className="p-8">
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Manage Staff</h1>
          <p className="text-slate-500">{staffData.length} total employees</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          + Add Staff
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <StatsCard title="Total Staff" value={staffData.length} />
        <StatsCard title="Active" value={staffData.filter(s => s.status === 'Active').length} colorClass="text-teal-600" />
        <StatsCard title="Inactive" value={staffData.filter(s => s.status === 'Inactive').length} colorClass="text-slate-500" />
      </div>

      {loading ? (
        <div className="mt-6 text-center text-slate-500">Loading data...</div>
      ) : (
        <StaffTable 
          data={staffData} 
          onDelete={handleDelete} 
          onEdit={handleEdit}
          onView={handleView}
        />
      )}

      {/* Modals */}
      <AddStaffModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onRefresh={triggerRefresh} 
      />
      
      {/* Edit Modal */}
      <StaffModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        staff={selectedStaff}
        onSave={handleUpdate}
        isViewOnly={false}
      />

      {/* View Modal */}
      <ViewStaffModal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        staff={selectedStaff} 
      />
    </div>
  );
};