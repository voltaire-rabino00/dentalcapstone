// pages/admin/AttendancePage.tsx
import { Users, UserCheck, UserX, Clock } from 'lucide-react'; 
import { StatCard } from '../../components/domain/StatCard';
import { StatusBadge } from '../../components/domain/StatusBadge';

export const AttendancePage = () => {
  return (
    <div className="p-8 bg-[#eef6fb] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0d9488]">Attendance Management</h1>
        <p className="text-gray-500">Monitor and manage staff attendance records</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Staff" value="8" icon={Users} colorClass="bg-teal-50 text-teal-600" />
        <StatCard title="Present Today" value="5" icon={UserCheck} colorClass="bg-emerald-50 text-emerald-600" />
        <StatCard title="Absent Today" value="1" icon={UserX} colorClass="bg-red-50 text-red-600" />
        <StatCard title="Late Today" value="2" icon={Clock} colorClass="bg-amber-50 text-amber-600" />
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Attendance Records</h2>
          <div className="flex gap-2">
            <input placeholder="Search staff..." className="px-4 py-2 border rounded-lg" />
            <button className="bg-[#0d9488] text-white px-4 py-2 rounded-lg">Export</button>
          </div>
        </div>

        <table className="w-full">
          <thead className="text-gray-400 text-sm border-b">
            <tr>
              <th className="text-left pb-4">STAFF NAME</th>
              <th className="text-left pb-4">DATE</th>
              <th className="text-left pb-4">TIME IN</th>
              <th className="text-left pb-4">TIME OUT</th>
              <th className="text-left pb-4">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {/* Sample Row */}
            <tr className="hover:bg-gray-50">
              <td className="py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center">MS</div>
                <div><p className="font-semibold">Dr. Maria Santos</p><p className="text-xs text-gray-400">Dentist</p></div>
              </td>
              <td>Jul 6, 2026</td>
              <td className="font-mono">08:00 AM</td>
              <td className="font-mono">17:00 PM</td>
              <td><StatusBadge status="Present" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};