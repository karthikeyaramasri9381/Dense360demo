import React, { useState, useEffect } from 'react';
import { CheckSquare, Loader2, Search } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getAdminAttendance, markAttendance, getAdminEvents } from '../services/api';

export default function AdminAttendancePage() {
  const [attendance, setAttendance] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [loading, setLoading] = useState(false);
  const [marking, setMarking] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [markForm, setMarkForm] = useState({ registration_code: '', status: 'PRESENT', notes: '' });

  useEffect(() => {
    getAdminEvents().then(res => setEvents(res.data.results || res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedEventId) return;
    setLoading(true);
    getAdminAttendance({ event_id: selectedEventId })
      .then(res => setAttendance(res.data.attendance || []))
      .catch(() => setError('Failed to load attendance.'))
      .finally(() => setLoading(false));
  }, [selectedEventId]);

  const handleMark = async (e) => {
    e.preventDefault();
    if (!markForm.registration_code.trim() || !selectedEventId) {
      setError('Select an event and enter a Registration ID.');
      return;
    }
    setMarking(true);
    setError('');
    try {
      const res = await markAttendance({ ...markForm, event_id: selectedEventId });
      setSuccess(res.data.message || 'Attendance marked!');
      setMarkForm({ registration_code: '', status: 'PRESENT', notes: '' });
      setTimeout(() => setSuccess(''), 3000);
      // Refresh list
      const aRes = await getAdminAttendance({ event_id: selectedEventId });
      setAttendance(aRes.data.attendance || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to mark attendance.');
    } finally {
      setMarking(false);
    }
  };

  const STATUS_COLORS = { PRESENT: 'bg-green-100 text-green-700', ABSENT: 'bg-red-100 text-red-600', EXCUSED: 'bg-amber-100 text-amber-700' };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Event selector */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle p-6">
          <h2 className="font-display font-bold text-slate-800 text-base mb-4">Select Event</h2>
          <select value={selectedEventId} onChange={e => setSelectedEventId(e.target.value)} className="w-full max-w-md px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none">
            <option value="">— Choose an event —</option>
            {events.map(ev => <option key={ev.id} value={ev.id}>{ev.title} ({ev.date})</option>)}
          </select>
        </div>

        {/* Mark attendance form */}
        {selectedEventId && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle p-6">
            <h2 className="font-display font-bold text-slate-800 text-base mb-4">Mark Attendance</h2>
            {error && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
            {success && <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">✓ {success}</div>}
            <form onSubmit={handleMark} className="flex flex-wrap gap-3 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Registration ID</label>
                <input type="text" value={markForm.registration_code} onChange={e => setMarkForm(prev => ({ ...prev, registration_code: e.target.value }))} placeholder="e.g. D360-2026-000001" className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none font-mono" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Status</label>
                <select value={markForm.status} onChange={e => setMarkForm(prev => ({ ...prev, status: e.target.value }))} className="px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none">
                  <option value="PRESENT">Present</option>
                  <option value="ABSENT">Absent</option>
                  <option value="EXCUSED">Excused</option>
                </select>
              </div>
              <button type="submit" disabled={marking} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#16B86A] text-white font-bold text-sm hover:bg-[#129B58] disabled:opacity-60 transition-colors">
                {marking ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckSquare className="w-4 h-4" />}
                {marking ? 'Marking...' : 'Mark'}
              </button>
            </form>
          </div>
        )}

        {/* Attendance list */}
        {selectedEventId && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50">
              <h2 className="font-display font-bold text-slate-800 text-base">Attendance List ({attendance.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['Reg ID', 'Student', 'School', 'Class', 'Status', 'Marked At'].map(h => (
                      <th key={h} className="text-left px-5 py-3.5 font-bold text-slate-500 text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {loading ? Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {Array.from({ length: 6 }).map((_, j) => <td key={j} className="px-5 py-4"><div className="h-3.5 bg-slate-100 rounded" /></td>)}
                    </tr>
                  )) : attendance.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-12 text-slate-400 text-sm">No attendance records for this event yet.</td></tr>
                  ) : attendance.map(att => (
                    <tr key={att.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-xs text-[#16B86A] font-bold">{att.registration_code}</td>
                      <td className="px-5 py-4 font-semibold text-slate-800">{att.student_name}</td>
                      <td className="px-5 py-4 text-slate-400 text-xs">{att.school_name}</td>
                      <td className="px-5 py-4 text-slate-500">{att.class_name}</td>
                      <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${STATUS_COLORS[att.status]}`}>{att.status}</span></td>
                      <td className="px-5 py-4 text-slate-400 text-xs">{new Date(att.marked_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
