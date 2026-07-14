import { Sidebar } from '../../components/layout/StaffSidebar';
import { LogIn } from 'lucide-react';


export const StaffDashboard = () => {
  // Mock logic: Sa future, dito papasok ang socket/api calls
  const handleTimeIn = () => console.log("Time-in triggered");

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      <Sidebar />
      
      <main className="flex-1 p-8">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Good evening, Dr. Sarah Chen</h1>
            <p className="text-gray-500">Tuesday, July 14, 2026</p>
          </div>
          <button 
            onClick={handleTimeIn}
            className="flex items-center gap-2 bg-[#0d9488] text-white px-6 py-3 rounded-xl hover:bg-[#0b7d72] transition"
          >
            <LogIn size={20} /> Time In
          </button>
        </header>

        {/* Quick Actions Grid */}
        <section className="grid grid-cols-2 gap-6 max-w-4xl">
          <ActionCard title="Manage Patients" description="Register a new patient and create their dental record" />
          <ActionCard title="Manage Records" description="Update and review patient dental charts" />
        </section>
      </main>
    </div>
  );
};

// Sub-component para sa cards (Reusable)
const ActionCard = ({ title, description }: { title: string, description: string }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{description}</p>
  </div>
);