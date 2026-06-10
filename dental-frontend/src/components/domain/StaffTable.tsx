// src/components/domain/StaffTable.tsx
import { StaffRow } from './StaffRow';


// DITO natin i-define at i-EXPORT para magamit sa ibang files
export interface Staff {
  idNo: string;
  name: string;
  role: string;
  contact: string;
  status: 'Active' | 'Inactive';
  timeIn?: string;
  timeOut?: string;
}

export const StaffTable = ({ data }: { data: Staff[] }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-6">
    <table className="w-full text-left">
      <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase">
        <tr>
          <th className="p-4 w-4"><input type="checkbox" className="rounded" /></th>
          <th className="p-4">ID NO.</th>
          <th className="p-4">NAME</th>
          <th className="p-4">CONTACT NO.</th>
          <th className="p-4">STATUS</th>
          <th className="p-4">TIME IN</th>
          <th className="p-4">TIME OUT</th>
          <th className="p-4"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((staff) => <StaffRow key={staff.idNo} staff={staff} />)}
      </tbody>
    </table>
  </div>
);