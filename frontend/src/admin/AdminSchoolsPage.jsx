import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getAdminSchoolsReport } from '../services/api';

export default function AdminSchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await getAdminSchoolsReport({ search });
        setSchools(res.data.schools || []);
      } catch (err) {
        setError('Failed to load school data.');
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search school name or city..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm focus:border-[#16B86A] focus:outline-none bg-white" />
        </div>

        {error && <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['School Name', 'City', 'Students', 'Registrations', 'Confirmed', 'Pending'].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 font-bold text-slate-500 text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {Array.from({ length: 6 }).map((_, j) => (
                        <td key={j} className="px-5 py-4"><div className="h-3.5 bg-slate-100 rounded" /></td>
                      ))}
                    </tr>
                  ))
                ) : schools.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-slate-400 text-sm">
                      {search ? 'No schools match your search.' : 'Schools will appear here once students register.'}
                    </td>
                  </tr>
                ) : (
                  schools.map(sc => (
                    <tr key={sc.school_name} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 font-semibold text-slate-800">{sc.school_name}</td>
                      <td className="px-5 py-4 text-slate-400">{sc.city}</td>
                      <td className="px-5 py-4 font-bold text-[#0B2344]">{sc.student_count}</td>
                      <td className="px-5 py-4 text-slate-500">{sc.registration_count}</td>
                      <td className="px-5 py-4"><span className="text-green-700 font-bold">{sc.confirmed_count}</span></td>
                      <td className="px-5 py-4"><span className="text-amber-600 font-bold">{sc.pending_count}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {!loading && schools.length > 0 && (
          <p className="text-xs text-slate-400 text-center">
            Showing {schools.length} school{schools.length !== 1 ? 's' : ''} registered in DENSE360
          </p>
        )}
      </div>
    </AdminLayout>
  );
}
