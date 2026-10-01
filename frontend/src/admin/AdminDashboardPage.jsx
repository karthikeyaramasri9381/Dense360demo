import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, ClipboardList, Clock, CheckCircle, XCircle, School, CalendarDays, ArrowRight } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getAdminDashboardStats } from '../services/api';

function StatCard({ icon: Icon, label, value, color, loading }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center`} style={{ backgroundColor: color + '18' }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
      <div className={`font-display font-black text-3xl text-slate-800 mb-1 ${loading ? 'animate-pulse' : ''}`}>
        {loading ? '...' : value}
      </div>
      <div className="text-slate-400 text-sm font-medium">{label}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    PENDING: 'bg-amber-100 text-amber-700',
    CONFIRMED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-600',
    CANCELLED: 'bg-slate-100 text-slate-500',
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide ${map[status] || 'bg-slate-100 text-slate-500'}`}>
      {status}
    </span>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentRegs, setRecentRegs] = useState([]);
  const [topSchools, setTopSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getAdminDashboardStats();
        setStats(res.data.stats);
        setRecentRegs(res.data.recent_registrations || []);
        setTopSchools(res.data.top_schools || []);
      } catch (err) {
        setError('Failed to load dashboard data. Please refresh.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const statCards = [
    { icon: Users, label: 'Total Students', value: stats?.total_students ?? 0, color: '#3B82F6' },
    { icon: ClipboardList, label: 'Total Registrations', value: stats?.total_registrations ?? 0, color: '#16B86A' },
    { icon: Clock, label: 'Pending', value: stats?.pending ?? 0, color: '#F59E0B' },
    { icon: CheckCircle, label: 'Confirmed', value: stats?.confirmed ?? 0, color: '#10B981' },
    { icon: School, label: 'Schools Registered', value: stats?.schools_count ?? 0, color: '#8B5CF6' },
    { icon: CalendarDays, label: 'Upcoming Events', value: stats?.upcoming_events ?? 0, color: '#EC4899' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-r from-[#0B2344] to-[#1D4E89] p-7 text-white shadow-premium"
        >
          <h1 className="font-display font-black text-2xl sm:text-3xl mb-1.5">DENSE360 Admin</h1>
          <p className="text-slate-300 text-sm">
            Connecting Schools. Engaging Students. Creating Opportunities.
          </p>
        </motion.div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <StatCard {...card} loading={loading} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Grid: Recent + Top Schools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Registrations */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-subtle"
          >
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
              <h2 className="font-display font-bold text-slate-800">Recent Registrations</h2>
              <Link to="/admin/registrations" className="text-xs font-semibold text-[#16B86A] hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="px-6 py-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3.5 bg-slate-100 rounded animate-pulse w-2/3" />
                      <div className="h-3 bg-slate-50 rounded animate-pulse w-1/2" />
                    </div>
                  </div>
                ))
              ) : recentRegs.length === 0 ? (
                <div className="px-6 py-12 text-center text-slate-400 text-sm">
                  No registrations yet. Once students register, they'll appear here.
                </div>
              ) : (
                recentRegs.map((reg) => (
                  <div key={reg.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#0B2344]/8 flex items-center justify-center text-[#0B2344] font-black text-sm flex-shrink-0">
                      {reg.student?.name?.[0] || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm truncate">{reg.student?.name}</p>
                      <p className="text-slate-400 text-xs truncate">{reg.student?.school_name} · Class {reg.student?.class_name}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <StatusBadge status={reg.status} />
                      <p className="text-[10px] text-slate-400 font-mono">{reg.registration_code}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Top Schools */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-subtle"
          >
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
              <h2 className="font-display font-bold text-slate-800">Top Schools</h2>
              <Link to="/admin/schools" className="text-xs font-semibold text-[#16B86A] hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-5 space-y-3">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-12 bg-slate-50 rounded-xl animate-pulse" />
                ))
              ) : topSchools.length === 0 ? (
                <div className="text-center text-slate-400 text-sm py-8">
                  Schools will appear once students register.
                </div>
              ) : (
                topSchools.map((s, i) => (
                  <div key={s.school_name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-[#0B2344] text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{s.school_name}</p>
                    </div>
                    <div className="text-sm font-bold text-[#16B86A]">{s.count}</div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
