import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getAdminStudents } from '../services/api';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminStudents({ search });
      setStudents(res.data.results || res.data);
    } catch (err) {
      setError('Failed to load student data.');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timeout = setTimeout(() => fetchStudents(), 300);
    return () => clearTimeout(timeout);
  }, [fetchStudents]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, school, class, mobile..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none bg-white" />
        </div>

        {error && <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Student', 'Class', 'School', 'City', 'Parent', 'Mobile', 'Group', 'Registration ID'].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 font-bold text-slate-500 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {Array.from({ length: 8 }).map((_, j) => (
                        <td key={j} className="px-5 py-4"><div className="h-3.5 bg-slate-100 rounded" /></td>
                      ))}
                    </tr>
                  ))
                ) : students.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16 text-slate-400 text-sm">
                      {search ? 'No students match your search.' : 'No students registered yet.'}
                    </td>
                  </tr>
                ) : (
                  students.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 font-semibold text-slate-800 whitespace-nowrap">{s.name}</td>
                      <td className="px-5 py-4 text-slate-500">{s.class_name}{s.section ? ` – ${s.section}` : ''}</td>
                      <td className="px-5 py-4 text-slate-500 max-w-[160px] truncate">{s.school_name}</td>
                      <td className="px-5 py-4 text-slate-400">{s.city || '—'}</td>
                      <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{s.parent?.name}</td>
                      <td className="px-5 py-4 text-slate-500 font-mono text-xs">{s.parent?.mobile}</td>
                      <td className="px-5 py-4 text-slate-400">{s.interests_group || '—'}</td>
                      <td className="px-5 py-4 font-mono text-xs text-[#16B86A] font-bold whitespace-nowrap">{s.registration?.registration_code || '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
