// components/layout/Sidebar.tsx
import { Users, FileText, Clock } from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Manage Patients', icon: Users, path: '/staff/patients' },
  { name: 'Manage Records', icon: FileText, path: '/staff/records' },
  { name: 'Attendance', icon: Clock, path: '/staff/attendance' },
];

export const Sidebar = () => (
  <nav className="w-64 h-screen bg-[#0d9488] text-white p-6">
    <div className="text-2xl font-bold mb-10">DentalCare</div>
    <ul className="space-y-4">
      {MENU_ITEMS.map((item) => (
        <li key={item.name} className="flex items-center gap-3 hover:bg-[#0b7d72] p-3 rounded-lg cursor-pointer transition">
          <item.icon size={20} />
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  </nav>
);