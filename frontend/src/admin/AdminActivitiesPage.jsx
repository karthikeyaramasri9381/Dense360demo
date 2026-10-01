import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, Edit2 } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getAdminActivities, createAdminActivity, updateAdminActivity, deleteAdminActivity, getAdminEvents } from '../services/api';

const defaultForm = { title: '', description: '', event: '', category: 'WORKSHOP', date: '', time: '', venue: '', status: 'ACTIVE' };

function ActivityModal({ activity, events, onClose, onSave }) {
  const [form, setForm] = useState(activity || defaultForm);
  const [saving, setSaving] = useState(false);
  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSave = async () => {
    if (!form.title.trim()) return alert('Activity title is required.');
    setSaving(true);
    try {
      const payload = { ...form, event: form.event || null };
      if (activity?.id) await updateAdminActivity(activity.id, payload);
      else await createAdminActivity(payload);
      onSave();
    } catch { alert('Failed to save activity.'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 z-10 max-h-[90vh] overflow-y-auto">
        <h2 className="font-display font-bold text-slate-800 text-xl mb-6">{activity?.id ? 'Edit Activity' : 'Add Activity'}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Activity Title *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none">
              <option value="WORKSHOP">Student Engagement Activity</option>
              <option value="CHALLENGE">Learning-Based Challenge</option>
              <option value="COMPETITION">Competition</option>
              <option value="CREATIVE">Creative Activity</option>
              <option value="TEAM">Team-Based Activity</option>
              <option value="PROBLEM_SOLVING">Problem-Solving Experience</option>
              <option value="INTERACTIVE">Interactive Session</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Linked Event</label>
            <select name="event" value={form.event || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none">
              <option value="">No event (standalone)</option>
              {events.map(ev => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={2} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Time</label>
              <input type="time" name="time" value={form.time} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Venue</label>
            <input type="text" name="venue" value={form.venue} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none" />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="flex-1 py-3 rounded-xl bg-[#0B2344] text-white font-bold text-sm hover:bg-[#143868] flex items-center justify-center gap-2 disabled:opacity-60">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : 'Save Activity'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [aRes, eRes] = await Promise.all([getAdminActivities(), getAdminEvents()]);
      setActivities(aRes.data.results || aRes.data);
      setEvents(eRes.data.results || eRes.data);
    } catch { setError('Failed to load activities.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this activity?')) return;
    try { await deleteAdminActivity(id); setActivities(prev => prev.filter(a => a.id !== id)); }
    catch { alert('Failed to delete activity.'); }
  };

  const CATEGORY_COLORS = {
    WORKSHOP: 'bg-blue-50 text-blue-700',
    CHALLENGE: 'bg-amber-50 text-amber-700',
    COMPETITION: 'bg-red-50 text-red-700',
    CREATIVE: 'bg-purple-50 text-purple-700',
    TEAM: 'bg-green-50 text-green-700',
    PROBLEM_SOLVING: 'bg-orange-50 text-orange-700',
    INTERACTIVE: 'bg-pink-50 text-pink-700',
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-slate-400 text-sm">{activities.length} activit{activities.length !== 1 ? 'ies' : 'y'}</p>
          <button onClick={() => { setEditingActivity(null); setShowModal(true); }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2344] text-white font-bold text-sm hover:bg-[#143868] transition-colors shadow-md">
            <Plus className="w-4 h-4" /> Add Activity
          </button>
        </div>
        {error && <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Activity', 'Category', 'Event', 'Date', 'Venue', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 font-bold text-slate-500 text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {Array.from({ length: 6 }).map((_, j) => <td key={j} className="px-5 py-4"><div className="h-3.5 bg-slate-100 rounded" /></td>)}
                  </tr>
                )) : activities.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-16 text-slate-400 text-sm">No activities yet. Add your first DENSE360 activity.</td></tr>
                ) : activities.map(act => (
                  <tr key={act.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-slate-800">{act.title}</td>
                    <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${CATEGORY_COLORS[act.category] || 'bg-slate-100 text-slate-500'}`}>{act.category_display || act.category}</span></td>
                    <td className="px-5 py-4 text-slate-400 text-xs">{act.event_title || '—'}</td>
                    <td className="px-5 py-4 text-slate-400">{act.date || '—'}</td>
                    <td className="px-5 py-4 text-slate-400">{act.venue || '—'}</td>
                    <td className="px-5 py-4 flex gap-2">
                      <button onClick={() => { setEditingActivity(act); setShowModal(true); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-colors"><Edit2 className="w-3 h-3" /> Edit</button>
                      <button onClick={() => handleDelete(act.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 transition-colors"><Trash2 className="w-3 h-3" /> Del</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && <ActivityModal activity={editingActivity} events={events} onClose={() => { setShowModal(false); setEditingActivity(null); }} onSave={() => { setShowModal(false); setEditingActivity(null); fetchData(); }} />}
    </AdminLayout>
  );
}
