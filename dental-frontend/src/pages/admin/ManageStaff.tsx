import { StatsCard } from '../../components/ui/StatsCard';
import { StaffTable } from '../../components/domain/StaffTable';
import type { Staff } from '../../components/domain/StaffTable';

export const ManageStaff = () => {
  // Lagyan ng explicit type na Staff[]
  const staffData: Staff[] = [
    { idNo: "STF-001", name: "Maria Santos", role: "Supervisor", contact: "+63 912 345 6789", status: "Active", timeIn: "08:02 AM", timeOut: "05:00 PM" },
    { idNo: "STF-003", name: "Ana Dela Cruz", role: "Stock Clerk", contact: "+63 920 111 2233", status: "Inactive", timeIn: "", timeOut: "" },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Manage Staff</h1>
          <p className="text-slate-500">10 total employees</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium">+ Add Staff</button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <StatsCard title="Total Staff" value={10} />
        <StatsCard title="Active" value={7} colorClass="text-teal-600" />
        <StatsCard title="Inactive" value={3} colorClass="text-red-500" />
      </div>

      <StaffTable data={staffData} />
    </div>
  );
};