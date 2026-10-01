import React, { useState, useEffect } from 'react';
import { Download, BarChart3 } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getAdminReportsSummary, exportRegistrationsCsvUrl } from '../services/api';

export default function AdminReportsPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAdminReportsSummary()
      .then(res => setSummary(res.data.summary))
      .catch(() => setError('Failed to load report data.'))
      .finally(() => setLoading(false));
  }, []);

  const handleExportCSV = () => {
    const token = localStorage.getItem('dense360_access_token');
    const url = exportRegistrationsCsvUrl;
    const link = document.createElement('a');
    link.href = url;
    link.click();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Export actions */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle p-6">
          <h2 className="font-display font-bold text-slate-800 text-base mb-4">Export Data</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={exportRegistrationsCsvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0B2344] text-white font-bold text-sm hover:bg-[#143868] transition-colors shadow-md"
            >
              <Download className="w-4 h-4" />
              Export Registrations (CSV)
            </a>
          </div>
          <p className="mt-3 text-xs text-slate-400">Note: Authentication header is required for export. Open URL in the same browser session.</p>
        </div>

        {error && <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}

        {/* Summary stats */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => <div key={i} className="h-40 bg-white rounded-2xl border border-slate-100 animate-pulse" />)}
          </div>
        ) : summary ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* By status */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle p-6">
              <h3 className="font-display font-bold text-slate-700 text-sm uppercase tracking-wider mb-4">By Status</h3>
              <div className="space-y-2">
                {summary.by_status.map(s => (
                  <div key={s.status} className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">{s.status}</span>
                    <span className="font-bold text-slate-800 text-sm">{s.total}</span>
                  </div>
                ))}
                {summary.by_status.length === 0 && <p className="text-slate-400 text-sm">No data yet.</p>}
              </div>
            </div>

            {/* By class */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle p-6">
              <h3 className="font-display font-bold text-slate-700 text-sm uppercase tracking-wider mb-4">By Class</h3>
              <div className="space-y-2">
                {summary.by_class.slice(0, 8).map(c => (
                  <div key={c.class_name} className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm">Class {c.class_name}</span>
                    <span className="font-bold text-slate-800 text-sm">{c.total}</span>
                  </div>
                ))}
                {summary.by_class.length === 0 && <p className="text-slate-400 text-sm">No data yet.</p>}
              </div>
            </div>

            {/* Top schools */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle p-6">
              <h3 className="font-display font-bold text-slate-700 text-sm uppercase tracking-wider mb-4">Top Schools</h3>
              <div className="space-y-2">
                {summary.by_school.map(s => (
                  <div key={s.school_name} className="flex items-center justify-between gap-2">
                    <span className="text-slate-500 text-sm truncate">{s.school_name}</span>
                    <span className="font-bold text-slate-800 text-sm flex-shrink-0">{s.total}</span>
                  </div>
                ))}
                {summary.by_school.length === 0 && <p className="text-slate-400 text-sm">No data yet.</p>}
              </div>
            </div>
          </div>
        ) : null}

        {/* Totals */}
        {summary && (
          <div className="flex gap-4 flex-wrap">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle px-6 py-4 flex items-center gap-4">
              <BarChart3 className="w-8 h-8 text-[#16B86A]" />
              <div>
                <p className="text-slate-400 text-xs font-medium">Total Students</p>
                <p className="font-display font-black text-2xl text-slate-800">{summary.total_students}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle px-6 py-4 flex items-center gap-4">
              <BarChart3 className="w-8 h-8 text-[#0B2344]" />
              <div>
                <p className="text-slate-400 text-xs font-medium">Total Registrations</p>
                <p className="font-display font-black text-2xl text-slate-800">{summary.total_registrations}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
