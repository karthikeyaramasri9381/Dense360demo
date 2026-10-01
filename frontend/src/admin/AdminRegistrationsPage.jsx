import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, RefreshCw, ChevronDown, X, Loader2 } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getAdminRegistrations, updateAdminRegistrationStatus } from '../services/api';

function StatusBadge({ status }) {
  const map = {
    PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
    CONFIRMED: 'bg-green-100 text-green-700 border-green-200',
    REJECTED: 'bg-red-100 text-red-600 border-red-200',
    CANCELLED: 'bg-slate-100 text-slate-500 border-slate-200',
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border ${map[status] || 'bg-slate-100 text-slate-500 border-slate-200'}`}>
      {status}
    </span>
  );
}

function RegistrationDetailModal({ reg, onClose, onStatusUpdate }) {
  const [newStatus, setNewStatus] = useState(reg.status);
  const [notes, setNotes] = useState(reg.admin_notes || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAdminRegistrationStatus(reg.id, { status: newStatus, admin_notes: notes });
      setSaved(true);
      onStatusUpdate(reg.id, newStatus, notes);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const s = reg.student || {};
  const p = s.parent || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-slate-800 text-lg">Registration Details</h2>
            <p className="font-mono text-xs text-[#16B86A] font-bold">{reg.registration_code}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Student info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Student</h3>
            <div className="rounded-xl bg-slate-50 p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Name</span><span className="font-semibold text-slate-800">{s.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Class</span><span className="font-semibold text-slate-800">{s.class_name}{s.section ? ` – ${s.section}` : ''}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Gender</span><span className="font-semibold text-slate-800">{s.gender || '—'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">DOB</span><span className="font-semibold text-slate-800">{s.date_of_birth || '—'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Group</span><span className="font-semibold text-slate-800">{s.interests_group || '—'}</span></div>
            </div>
          </div>
          {/* School info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">School</h3>
            <div className="rounded-xl bg-slate-50 p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">School Name</span><span className="font-semibold text-slate-800">{s.school_name}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">City</span><span className="font-semibold text-slate-800">{s.city || '—'}</span></div>
            </div>
          </div>
          {/* Parent info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Parent / Guardian</h3>
            <div className="rounded-xl bg-slate-50 p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Name</span><span className="font-semibold text-slate-800">{p.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Mobile</span><span className="font-semibold text-slate-800">{p.mobile}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Email</span><span className="font-semibold text-slate-800">{p.email || '—'}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Relationship</span><span className="font-semibold text-slate-800">{p.relationship || '—'}</span></div>
            </div>
          </div>
          {/* Status Update */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Update Status</h3>
            <select value={newStatus} onChange={e => setNewStatus(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm font-medium focus:border-[#16B86A] focus:outline-none mb-3">
              <option value="PENDING">PENDING</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="REJECTED">REJECTED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add admin notes (optional)..." className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none resize-none" rows={3} />
            <button onClick={handleSave} disabled={saving} className="mt-3 w-full py-3 rounded-xl bg-[#0B2344] hover:bg-[#143868] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedReg, setSelectedReg] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const PAGE_SIZE = 20;

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, search, status: statusFilter !== 'ALL' ? statusFilter : undefined };
      const res = await getAdminRegistrations(params);
      setRegistrations(res.data.results || res.data);
      setTotal(res.data.count || (res.data.results ? res.data.count : 0));
    } catch (err) {
      setError('Failed to load registrations. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    const timeout = setTimeout(() => fetchRegistrations(), 300);
    return () => clearTimeout(timeout);
  }, [fetchRegistrations]);

  const handleStatusUpdate = (id, newStatus, notes) => {
    setRegistrations(prev =>
      prev.map(r => r.id === id ? { ...r, status: newStatus, admin_notes: notes } : r)
    );
    if (selectedReg?.id === id) {
      setSelectedReg(prev => ({ ...prev, status: newStatus, admin_notes: notes }));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name, school, ID, mobile..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none bg-white"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {['ALL', 'PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED'].map(s => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                  statusFilter === s ? 'bg-[#0B2344] text-white' : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button onClick={fetchRegistrations} className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {error && <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-5 py-3.5 font-bold text-slate-500 text-xs uppercase tracking-widest">Reg ID</th>
                  <th className="text-left px-5 py-3.5 font-bold text-slate-500 text-xs uppercase tracking-widest">Student</th>
                  <th className="text-left px-5 py-3.5 font-bold text-slate-500 text-xs uppercase tracking-widest hidden md:table-cell">School</th>
                  <th className="text-left px-5 py-3.5 font-bold text-slate-500 text-xs uppercase tracking-widest hidden lg:table-cell">Class</th>
                  <th className="text-left px-5 py-3.5 font-bold text-slate-500 text-xs uppercase tracking-widest hidden xl:table-cell">Mobile</th>
                  <th className="text-left px-5 py-3.5 font-bold text-slate-500 text-xs uppercase tracking-widest hidden xl:table-cell">Group</th>
                  <th className="text-left px-5 py-3.5 font-bold text-slate-500 text-xs uppercase tracking-widest">Status</th>
                  <th className="text-left px-5 py-3.5 font-bold text-slate-500 text-xs uppercase tracking-widest hidden sm:table-cell">Date</th>
                  <th className="text-left px-5 py-3.5 font-bold text-slate-500 text-xs uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {Array.from({ length: 9 }).map((_, j) => (
                        <td key={j} className="px-5 py-4">
                          <div className="h-3.5 bg-slate-100 rounded w-full" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-16 text-slate-400 text-sm">
                      {search || statusFilter !== 'ALL' ? 'No registrations match your search or filter.' : 'No registrations yet. Students will appear here once they register.'}
                    </td>
                  </tr>
                ) : (
                  registrations.map(reg => (
                    <tr key={reg.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-xs text-[#16B86A] font-bold">{reg.registration_code}</td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-800">{reg.student?.name}</div>
                      </td>
                      <td className="px-5 py-4 text-slate-500 hidden md:table-cell truncate max-w-[150px]">{reg.student?.school_name}</td>
                      <td className="px-5 py-4 text-slate-500 hidden lg:table-cell">{reg.student?.class_name}</td>
                      <td className="px-5 py-4 text-slate-500 hidden xl:table-cell">{reg.student?.parent?.mobile}</td>
                      <td className="px-5 py-4 text-slate-500 hidden xl:table-cell">{reg.student?.interests_group || '—'}</td>
                      <td className="px-5 py-4"><StatusBadge status={reg.status} /></td>
                      <td className="px-5 py-4 text-slate-400 text-xs hidden sm:table-cell">
                        {new Date(reg.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => setSelectedReg(reg)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B2344]/8 text-[#0B2344] text-xs font-bold hover:bg-[#0B2344]/15 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && registrations.length > 0 && total > PAGE_SIZE && (
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-400">Page {page}</p>
              <div className="flex gap-2">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm disabled:opacity-40 hover:bg-slate-50 transition-colors">← Prev</button>
                <button disabled={registrations.length < PAGE_SIZE} onClick={() => setPage(p => p + 1)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm disabled:opacity-40 hover:bg-slate-50 transition-colors">Next →</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {selectedReg && (
        <RegistrationDetailModal
          reg={selectedReg}
          onClose={() => setSelectedReg(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </AdminLayout>
  );
}
