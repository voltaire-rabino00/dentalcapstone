// src/components/domain/StaffRow.tsx
import { Avatar } from '../common/Avatar';
import type { Staff } from './StaffTable';

interface StaffRowProps {
  staff: Staff;
  onDelete: (id: string) => void;
  onEdit: (staff: Staff) => void;
  onView: (staff: Staff) => void;
}

export const StaffRow = ({ staff, onDelete, onEdit, onView }: StaffRowProps) => (
  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
    <td className="p-4"><input type="checkbox" className="rounded border-slate-300" /></td>
    <td className="p-4 text-sm text-slate-600">{staff.idNo}</td>
    <td className="p-4 flex items-center gap-3">
      <Avatar name={staff.name} />
      <div>
        <p className="font-medium text-slate-900">{staff.name}</p>
        <p className="text-xs text-slate-400">{staff.email}</p>
        <p className="text-xs text-teal-600 font-semibold">{staff.role}</p>
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
    
    <td className="p-4 flex gap-2 justify-center">
      <button
        onClick={() => onView(staff)}
        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-[10px] font-bold hover:bg-blue-100 transition"
      >
        VIEW
      </button>
      <button
        onClick={() => onEdit(staff)}
        className="px-3 py-1 bg-amber-50 text-amber-700 rounded-md text-[10px] font-bold hover:bg-amber-100 transition"
      >
        EDIT
      </button>
      <button 
        onClick={() => onDelete(staff._id)}
        className="px-3 py-1 bg-red-50 text-red-700 rounded-md text-[10px] font-bold hover:bg-red-100 transition"
      >
        DELETE
      </button>
    </td>
  </tr>
);