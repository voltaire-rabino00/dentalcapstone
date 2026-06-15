import { StaffRow } from './StaffRow';

export interface Staff {
  _id: string;
  idNo: string;
  name: string;
  email: string;
  role: string;
  contact: string;
  status: 'Active' | 'Inactive';
}

// 1. Gawa ka ng interface para sa props
interface StaffTableProps {
  data: Staff[];
  onDelete: (id: string) => void;
  onEdit: (staff: Staff) => void;
  onView: (staff: Staff) => void;
}

// 2. Gamitin ang interface sa function signature
export const StaffTable = ({ data, onDelete, onEdit, onView }: StaffTableProps) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-6">
    <table className="w-full text-left">
      <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase">
        <tr>
          <th className="p-4 w-4"><input type="checkbox" className="rounded" /></th>
          <th className="p-4">ID NO.</th>
          <th className="p-4">NAME</th>
          <th className="p-4">CONTACT NO.</th>
          <th className="p-4">STATUS</th>
          <th className="p-4 text-center">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {data.map((staff) => (
          <StaffRow 
            key={staff._id}
            staff={staff} 
            onDelete={onDelete} 
            onEdit={onEdit} 
            onView={onView} 
          />
        ))}
      </tbody>
    </table>
  </div>
);