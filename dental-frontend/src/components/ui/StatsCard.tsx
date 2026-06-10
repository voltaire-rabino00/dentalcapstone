import React from 'react';

// Define natin ang interface para malaman kung anong data ang kailangan niya
interface StatsCardProps {
  title: string;
  value: string | number;
  colorClass?: string; // Optional ito, default ay itim/slate
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  colorClass = "text-slate-900" 
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
        {title}
      </p>
      <h3 className={`text-3xl font-bold mt-2 ${colorClass}`}>
        {value}
      </h3>
    </div>
  );
};