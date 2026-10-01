import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, Edit2 } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getAdminEvents, createAdminEvent, updateAdminEvent, deleteAdminEvent } from '../services/api';

const defaultForm = { title: '', description: '', date: '', start_time: '', end_time: '', venue: '', status: 'PUBLISHED', capacity: 500 };

function EventModal({ event, onClose, onSave }) {
  const [form, setForm] = useState(event || defaultForm);
  const [saving, setSaving] = useState(false);
  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSave = async () => {
    if (!form.title.trim() || !form.date) return alert('Title and date are required.');
    setSaving(true);
    try {
      if (event?.id) await updateAdminEvent(event.id, form);
      else await createAdminEvent(form);
      onSave();
    } catch (err) { alert('Failed to save event.'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 z-10">
        <h2 className="font-display font-bold text-slate-800 text-xl mb-6">{event?.id ? 'Edit Event' : 'Add Event'}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Event Title *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={2} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Date *</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Venue</label>
            <input type="text" name="venue" value={form.venue} onChange={handleChange} placeholder="e.g. Main Auditorium" className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none" />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="flex-1 py-3 rounded-xl bg-[#0B2344] text-white font-bold text-sm hover:bg-[#143868] transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : 'Save Event'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [error, setError] = useState('');

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await getAdminEvents();
      setEvents(res.data.results || res.data);
    } catch { setError('Failed to load events.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try { await deleteAdminEvent(id); setEvents(prev => prev.filter(e => e.id !== id)); }
    catch { alert('Failed to delete event.'); }
  };

  const handleSave = () => { setShowModal(false); setEditingEvent(null); fetchEvents(); };

  const STATUS_COLORS = { DRAFT: 'bg-slate-100 text-slate-500', PUBLISHED: 'bg-green-100 text-green-700', COMPLETED: 'bg-blue-100 text-blue-700', CANCELLED: 'bg-red-100 text-red-600' };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-slate-400 text-sm">{events.length} event{events.length !== 1 ? 's' : ''} in DENSE360</p>
          <button onClick={() => { setEditingEvent(null); setShowModal(true); }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2344] text-white font-bold text-sm hover:bg-[#143868] transition-colors shadow-md">
            <Plus className="w-4 h-4" /> Add Event
          </button>
        </div>
        {error && <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 animate-pulse space-y-3">
              <div className="h-5 bg-slate-100 rounded w-2/3" />
              <div className="h-4 bg-slate-50 rounded w-1/2" />
            </div>
          )) : events.length === 0 ? (
            <div className="col-span-3 text-center py-16 text-slate-400 text-sm bg-white rounded-2xl border border-slate-100">
              No events yet. Add your first DENSE360 event.
            </div>
          ) : events.map(ev => (
            <div key={ev.id} className="bg-white rounded-2xl border border-slate-100 shadow-subtle p-6 hover:shadow-premium transition-all">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-display font-bold text-slate-800 text-base leading-snug">{ev.title}</h3>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap flex-shrink-0 ${STATUS_COLORS[ev.status]}`}>{ev.status}</span>
              </div>
              <p className="text-slate-400 text-xs mb-4">{ev.date} {ev.start_time ? `· ${ev.start_time}` : ''}</p>
              <p className="text-slate-500 text-xs mb-4">{ev.venue}</p>
              <div className="flex gap-2">
                <button onClick={() => { setEditingEvent(ev); setShowModal(true); }} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-colors">
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => handleDelete(ev.id)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && <EventModal event={editingEvent} onClose={() => { setShowModal(false); setEditingEvent(null); }} onSave={handleSave} />}
    </AdminLayout>
  );
}
