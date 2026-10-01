import React from 'react';
import AdminLayout from './AdminLayout';
import { useAuth } from '../context/AuthContext';

export default function AdminSettingsPage() {
  const { user } = useAuth();
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle p-8">
          <h2 className="font-display font-bold text-slate-800 text-lg mb-6">Admin Profile</h2>
          <div className="space-y-4 text-sm">
            {[
              ['Username', user?.username],
              ['Email', user?.email],
              ['Role', user?.role],
              ['Name', user?.name || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || '—'],
            ].map(([label, val]) => (
              <div key={label} className="flex items-center gap-4 py-3 border-b border-slate-50">
                <span className="text-slate-400 font-medium w-28 flex-shrink-0">{label}</span>
                <span className="text-slate-800 font-semibold">{val || '—'}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-subtle p-8">
          <h2 className="font-display font-bold text-slate-800 text-lg mb-4">System Information</h2>
          <div className="space-y-3 text-sm">
            {[
              ['Platform', 'DENSE360 Admin Portal'],
              ['Version', 'v1.0.0 — Initial Release'],
              ['API Backend', 'Django REST Framework'],
              ['Database', 'SQLite (dev) / MySQL (production)'],
              ['Frontend', 'React + Vite + Tailwind CSS'],
              ['Auth', 'JWT (SimpleJWT)'],
            ].map(([label, val]) => (
              <div key={label} className="flex items-center gap-4 py-2.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium w-28 flex-shrink-0">{label}</span>
                <span className="text-slate-600">{val}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="font-bold text-amber-800 text-sm mb-2">Production Deployment Notes</h3>
          <ul className="text-amber-700 text-xs space-y-1.5 list-disc list-inside">
            <li>Set <code>DEBUG=False</code> in production environment variables</li>
            <li>Configure a real <code>DJANGO_SECRET_KEY</code></li>
            <li>Connect MySQL with production credentials</li>
            <li>Set <code>CORS_ALLOWED_ORIGINS</code> to production domain</li>
            <li>Run <code>python manage.py collectstatic</code> before deployment</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
