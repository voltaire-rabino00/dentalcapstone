// src/components/domain/StaffRow.tsx
import { Avatar } from '../common/Avatar';
import type { Staff } from './StaffTable'; // Mag-import sa halip na i-redefine

export const StaffRow = ({ staff }: { staff: Staff }) => (
  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
    <td className="p-4"><input type="checkbox" className="rounded border-slate-300" /></td>
    <td className="p-4 text-sm text-slate-600">{staff.idNo}</td>
    <td className="p-4 flex items-center gap-3">
      <Avatar name={staff.name} />
      <div>
        <p className="font-medium text-slate-900">{staff.name}</p>
        <p className="text-xs text-slate-400">{staff.role}</p>
      </div>
    </td>
    <td className="p-4 text-sm text-slate-600">{staff.contact}</td>
    <td className="p-4">
      <span className={`px-2 py-1 rounded-full text-xs font-medium flex w-fit items-center gap-1 ${
        staff.status === 'Active' ? 'bg-teal-50 text-teal-700' : 'bg-red-50 text-red-600'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${staff.status === 'Active' ? 'bg-teal-500' : 'bg-red-500'}`}></span>
        {staff.status}
      </span>
    </td>
    <td className="p-4 text-sm text-slate-500">{staff.timeIn || '-'}</td>
    <td className="p-4 text-sm text-slate-500">{staff.timeOut || '-'}</td>
    <td className="p-4 text-slate-400 cursor-pointer">...</td>
  </tr>
);