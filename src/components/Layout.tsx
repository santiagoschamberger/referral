import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, Users, Video, LayoutDashboard, Send, DollarSign } from 'lucide-react';

export default function Layout() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#0f172a] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-red-500">
              <LayoutDashboard size={24} />
            </div>
            <span className="text-xl font-bold">
              {user?.role === 'admin' ? 'Admin Portal' : 'Referral Portal'}
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            {user?.role === 'admin' ? (
              <>
                <Link
                  to="/admin"
                  className={`flex items-center space-x-1 hover:text-gray-300 ${
                    isActive('/admin') ? 'text-red-400' : ''
                  }`}
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/users"
                  className={`flex items-center space-x-1 hover:text-gray-300 ${
                    isActive('/users') ? 'text-red-400' : ''
                  }`}
                >
                  <Users size={20} />
                  <span>Users</span>
                </Link>
                <Link
                  to="/admin/tutorials"
                  className={`flex items-center space-x-1 hover:text-gray-300 ${
                    isActive('/admin/tutorials') ? 'text-red-400' : ''
                  }`}
                >
                  <Video size={20} />
                  <span>Tutorials</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1 hover:text-gray-300 ${
                    isActive('/dashboard') ? 'text-red-400' : ''
                  }`}
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/submit"
                  className={`flex items-center space-x-1 hover:text-gray-300 ${
                    isActive('/submit') ? 'text-red-400' : ''
                  }`}
                >
                  <Send size={20} />
                  <span>Submit Referral</span>
                </Link>
                <Link
                  to="/tutorials"
                  className={`flex items-center space-x-1 hover:text-gray-300 ${
                    isActive('/tutorials') ? 'text-red-400' : ''
                  }`}
                >
                  <Video size={20} />
                  <span>Tutorials</span>
                </Link>
                <Link
                  to="/compensation"
                  className={`flex items-center space-x-1 hover:text-gray-300 ${
                    isActive('/compensation') ? 'text-red-400' : ''
                  }`}
                >
                  <DollarSign size={20} />
                  <span>My Compensation</span>
                </Link>
              </>
            )}
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-700">
              <span className="text-sm">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-8 px-4">
        <Outlet />
      </main>
    </div>
  );
}