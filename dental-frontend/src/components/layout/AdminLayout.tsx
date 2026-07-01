import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/login");
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Manage Attendance', path: '/admin/attendance' },
    { name: 'Manage Patients', path: '/admin/patients' },
    {name: 'Manage Staff', path: '/admin/staff'},
  ];

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-10 text-teal-400">DentalAdmin</h2>
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-teal-600' : 'hover:bg-slate-800'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <button 
          onClick={handleLogout} 
          className="text-slate-400 hover:text-red-400 mt-auto text-left"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 capitalize">
            {location.pathname.split('/').pop()}
          </h1>
        </header>
        <Outlet />
      </main>
    </div>
  );
};