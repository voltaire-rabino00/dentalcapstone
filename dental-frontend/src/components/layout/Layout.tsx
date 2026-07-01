import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

 
  const isActive = (path: string) => location.pathname === path ? "bg-teal-600 shadow-lg" : "hover:bg-teal-700/50";

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar - Desktop: fixed, Mobile: hidden */}
      <aside className="w-64 bg-teal-800 text-white flex flex-col shadow-xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-wider text-teal-50">DENTAL PORTAL</h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link to="/dashboard" className={`block py-3 px-4 rounded-lg transition-all ${isActive("/dashboard")}`}>Dashboard</Link>
          <Link to="/booking" className={`block py-3 px-4 rounded-lg transition-all ${isActive("/booking")}`}>Book Appointment</Link>
          <Link to="/medical-records" className={`block py-3 px-4 rounded-lg transition-all ${isActive("/medical-records")}`}>Medical Records</Link>
        </nav>

        <div className="p-4 border-t border-teal-700">
          <button onClick={handleLogout} className="w-full py-3 px-4 text-left text-red-200 hover:text-white hover:bg-red-900/30 rounded-lg transition-colors font-medium">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-6 mb-6">
            <h1 className="text-xl font-semibold text-slate-800 capitalize">{location.pathname.replace("/", "") || "Dashboard"}</h1>
        </header>
        
        <div className="px-8 pb-8">
            {/* Card Container for Content */}
            <div className="bg-white rounded-2xl shadow-sm p-8 min-h-125">
                <Outlet />
            </div>
        </div>
      </main>
    </div>
  );
};