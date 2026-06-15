import type { Staff } from '../domain/StaffTable';

interface ViewStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: Staff | null;
}

export const ViewStaffModal = ({ isOpen, onClose, staff }: ViewStaffModalProps) => {
  if (!isOpen || !staff) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">
          Staff Information
        </h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</p>
              <p className="text-slate-800 font-medium mt-1">{staff.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold mt-1 ${
                staff.status === 'Active' ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {staff.status}
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</p>
            <p className="text-slate-800 font-medium mt-1">{staff.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Job Role</p>
              <p className="text-slate-800 font-medium mt-1">{staff.role}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact No.</p>
              <p className="text-slate-800 font-medium mt-1">{staff.contact}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t flex justify-end">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors w-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};