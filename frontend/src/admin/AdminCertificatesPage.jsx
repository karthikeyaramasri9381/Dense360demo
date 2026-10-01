import React, { useState, useEffect } from 'react';
import { Plus, Loader2, Award } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getAdminCertificates, generateCertificate, getAdminEvents } from '../services/api';

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genSuccess, setGenSuccess] = useState('');
  const [genError, setGenError] = useState('');
  const [form, setForm] = useState({ registration_code: '', event_id: '', certificate_type: 'PARTICIPATION', title: 'Certificate of Participation', activity_name: '' });

  const fetchCerts = async () => {
    setLoading(true);
    try {
      const [cRes, eRes] = await Promise.all([getAdminCertificates(), getAdminEvents()]);
      setCerts(cRes.data.results || cRes.data);
      setEvents(eRes.data.results || eRes.data);
    } catch { }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCerts(); }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!form.registration_code.trim()) { setGenError('Registration ID is required.'); return; }
    setGenerating(true); setGenError('');
    try {
      const res = await generateCertificate({ ...form, event_id: form.event_id || null });
      setGenSuccess(`Certificate ${res.data.data?.certificate_code} generated!`);
      setForm({ registration_code: '', event_id: '', certificate_type: 'PARTICIPATION', title: 'Certificate of Participation', activity_name: '' });
      setShowForm(false);
      fetchCerts();
      setTimeout(() => setGenSuccess(''), 4000);
    } catch (err) {
      setGenError(err.response?.data?.message || 'Failed to generate certificate.');
    } finally { setGenerating(false); }
  };

  const CERT_TYPE_COLORS = { PARTICIPATION: 'bg-blue-50 text-blue-700', ACHIEVEMENT: 'bg-amber-50 text-amber-700', RECOGNITION: 'bg-purple-50 text-purple-700' };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-slate-400 text-sm">{certs.length} certificate{certs.length !== 1 ? 's' : ''} issued</p>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2344] text-white font-bold text-sm hover:bg-[#143868] shadow-md transition-colors">
            <Plus className="w-4 h-4" /> Generate Certificate
          </button>
        </div>

        {genSuccess && <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">✓ {genSuccess}</div>}

        {/* Generate form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle p-6">
            <h2 className="font-display font-bold text-slate-800 text-base mb-4">Generate Certificate</h2>
            {genError && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{genError}</div>}
            <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Registration ID *</label>
                <input type="text" value={form.registration_code} onChange={e => setForm(p => ({ ...p, registration_code: e.target.value }))} placeholder="e.g. D360-2026-000001" className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none font-mono" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Certificate Type</label>
                <select value={form.certificate_type} onChange={e => setForm(p => ({ ...p, certificate_type: e.target.value }))} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none">
                  <option value="PARTICIPATION">Participation</option>
                  <option value="ACHIEVEMENT">Achievement</option>
                  <option value="RECOGNITION">Recognition</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Linked Event</label>
                <select value={form.event_id} onChange={e => setForm(p => ({ ...p, event_id: e.target.value }))} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none">
                  <option value="">None</option>
                  {events.map(ev => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Certificate Title</label>
                <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Activity Name</label>
                <input type="text" value={form.activity_name} onChange={e => setForm(p => ({ ...p, activity_name: e.target.value }))} placeholder="Optional" className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none" />
              </div>
              <div className="sm:col-span-2 flex gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-3 rounded-xl border-2 border-slate-200 text-sm font-medium text-slate-600">Cancel</button>
                <button type="submit" disabled={generating} className="flex-1 py-3 rounded-xl bg-[#16B86A] text-white font-bold text-sm hover:bg-[#129B58] flex items-center justify-center gap-2 disabled:opacity-60">
                  {generating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> : <><Award className="w-4 h-4" /> Generate</>}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Certificates table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Certificate Code', 'Student', 'School', 'Type', 'Event', 'Issued Date', 'Valid'].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 font-bold text-slate-500 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {Array.from({ length: 7 }).map((_, j) => <td key={j} className="px-5 py-4"><div className="h-3.5 bg-slate-100 rounded" /></td>)}
                  </tr>
                )) : certs.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-16 text-slate-400 text-sm">No certificates issued yet.</td></tr>
                ) : certs.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 font-mono text-xs text-purple-700 font-bold">{c.certificate_code}</td>
                    <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">{c.student_name}</td>
                    <td className="px-5 py-4 text-slate-400 text-xs">{c.school_name}</td>
                    <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${CERT_TYPE_COLORS[c.certificate_type]}`}>{c.certificate_type}</span></td>
                    <td className="px-5 py-4 text-slate-400 text-xs">{c.event_title || '—'}</td>
                    <td className="px-5 py-4 text-slate-500">{c.issued_date}</td>
                    <td className="px-5 py-4"><span className={`text-xs font-bold ${c.is_valid ? 'text-green-600' : 'text-red-500'}`}>{c.is_valid ? 'Yes' : 'Revoked'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
