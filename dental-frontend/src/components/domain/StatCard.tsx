// components/domain/StatCard.tsx
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  colorClass: string;
}

export const StatCard = ({ title, value, icon: Icon, colorClass }: StatCardProps) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
    <div className={`p-3 rounded-xl ${colorClass}`}>
      <Icon size={24} />
    </div>
  </div>
);