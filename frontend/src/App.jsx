import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import CertificateVerifyPage from './pages/CertificateVerifyPage';

// Admin pages
import AdminLoginPage from './admin/AdminLoginPage';
import AdminDashboardPage from './admin/AdminDashboardPage';
import AdminRegistrationsPage from './admin/AdminRegistrationsPage';
import AdminStudentsPage from './admin/AdminStudentsPage';
import AdminSchoolsPage from './admin/AdminSchoolsPage';
import AdminEventsPage from './admin/AdminEventsPage';
import AdminActivitiesPage from './admin/AdminActivitiesPage';
import AdminAttendancePage from './admin/AdminAttendancePage';
import AdminCertificatesPage from './admin/AdminCertificatesPage';
import AdminReportsPage from './admin/AdminReportsPage';
import AdminSettingsPage from './admin/AdminSettingsPage';

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EA] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-[#0B2344] flex items-center justify-center mx-auto mb-6 font-display font-black text-white text-2xl">
        404
      </div>
      <h1 className="font-display font-black text-4xl text-[#0B2344] mb-3">Page Not Found</h1>
      <p className="text-[#64748B] text-base mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="px-6 py-3 rounded-xl bg-[#16B86A] text-white font-bold text-sm hover:bg-[#129B58] transition-colors">
        Go to DENSE360 Home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/certificate/verify" element={<CertificateVerifyPage />} />

          {/* Admin Auth */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
          <Route path="/admin/registrations" element={<ProtectedRoute><AdminRegistrationsPage /></ProtectedRoute>} />
          <Route path="/admin/students" element={<ProtectedRoute><AdminStudentsPage /></ProtectedRoute>} />
          <Route path="/admin/schools" element={<ProtectedRoute><AdminSchoolsPage /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute><AdminEventsPage /></ProtectedRoute>} />
          <Route path="/admin/activities" element={<ProtectedRoute><AdminActivitiesPage /></ProtectedRoute>} />
          <Route path="/admin/attendance" element={<ProtectedRoute><AdminAttendancePage /></ProtectedRoute>} />
          <Route path="/admin/certificates" element={<ProtectedRoute><AdminCertificatesPage /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute><AdminReportsPage /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminSettingsPage /></ProtectedRoute>} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
