import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, ClipboardList, Users, School, CalendarDays, Zap,
  CheckSquare, Award, BarChart3, Settings, LogOut, Menu, X, ChevronRight, Bell
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/registrations', icon: ClipboardList, label: 'Registrations' },
  { to: '/admin/students', icon: Users, label: 'Students' },
  { to: '/admin/schools', icon: School, label: 'Schools' },
  { to: '/admin/events', icon: CalendarDays, label: 'Events' },
  { to: '/admin/activities', icon: Zap, label: 'Activities' },
  { to: '/admin/attendance', icon: CheckSquare, label: 'Attendance' },
  { to: '/admin/certificates', icon: Award, label: 'Certificates' },
  { to: '/admin/reports', icon: BarChart3, label: 'Reports' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#16B86A] flex items-center justify-center font-display font-black text-white text-sm">360</div>
          <div>
            <div className="font-display font-black text-white text-base">DENSE<span className="text-[#16B86A]">360</span></div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400">Admin Portal</div>
          </div>
        </Link>
      </div>

      {/* User info */}
      <div className="px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#16B86A]/20 flex items-center justify-center font-bold text-[#16B86A] text-sm">
            {user?.name ? user.name[0].toUpperCase() : user?.username?.[0]?.toUpperCase() || 'A'}
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{user?.name || user?.username || 'Admin'}</p>
            <p className="text-slate-400 text-xs">{user?.role || 'Admin'}</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to || location.pathname.startsWith(to + '/');
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-[#16B86A] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/8'
              }`}
            >
              <Icon className="w-4.5 h-4.5 flex-shrink-0" />
              <span>{label}</span>
              {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
        >
          <LogOut className="w-4.5 h-4.5 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  const currentPage = navItems.find(n => location.pathname === n.to || location.pathname.startsWith(n.to + '/'));

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 bg-[#0B2344] border-r border-white/5 flex-col fixed top-0 bottom-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-72 bg-[#0B2344] border-r border-white/5 flex flex-col z-50">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-100 shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="font-display font-bold text-slate-800 text-lg">
                {currentPage?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-slate-600 hidden sm:block transition-colors">
                View website ↗
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
