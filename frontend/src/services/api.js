import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token for admin endpoints
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('dense360_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor for responses and auto-logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('dense360_access_token');
        localStorage.removeItem('dense360_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Public APIs
export const submitRegistration = (data) => api.post('/registrations/', data);
export const getPublicEvents = () => api.get('/events/');
export const getPublicActivities = () => api.get('/activities/');
export const verifyCertificate = (code) => api.get(`/certificates/verify/${code}/`);

// Auth APIs
export const loginAdmin = (username, password) => api.post('/auth/login/', { username, password });
export const getAdminProfile = () => api.get('/auth/me/');

// Admin APIs
export const getAdminDashboardStats = () => api.get('/registrations/admin/dashboard/');
export const getAdminRegistrations = (params) => api.get('/registrations/admin/list/', { params });
export const getAdminRegistrationDetail = (id) => api.get(`/registrations/admin/${id}/`);
export const updateAdminRegistrationStatus = (id, data) => api.patch(`/registrations/admin/${id}/`, data);

export const getAdminStudents = (params) => api.get('/students/admin/list/', { params });
export const getAdminStudentDetail = (id) => api.get(`/students/admin/${id}/`);

export const getAdminSchoolsReport = (params) => api.get('/schools/admin/report/', { params });
export const getAdminSchoolStudents = (schoolName) => api.get('/schools/admin/students/', { params: { school_name: schoolName } });

export const getAdminEvents = () => api.get('/events/admin/list/');
export const createAdminEvent = (data) => api.post('/events/admin/list/', data);
export const updateAdminEvent = (id, data) => api.patch(`/events/admin/${id}/`, data);
export const deleteAdminEvent = (id) => api.delete(`/events/admin/${id}/`);

export const getAdminActivities = () => api.get('/activities/admin/list/');
export const createAdminActivity = (data) => api.post('/activities/admin/list/', data);
export const updateAdminActivity = (id, data) => api.patch(`/activities/admin/${id}/`, data);
export const deleteAdminActivity = (id) => api.delete(`/activities/admin/${id}/`);

export const getAdminAttendance = (params) => api.get('/attendance/admin/list/', { params });
export const markAttendance = (data) => api.post('/attendance/admin/mark/', data);

export const getAdminCertificates = () => api.get('/certificates/admin/list/');
export const generateCertificate = (data) => api.post('/certificates/admin/generate/', data);

export const getAdminReportsSummary = () => api.get('/reports/admin/summary/');
export const exportRegistrationsCsvUrl = `${API_BASE_URL}/reports/admin/export/csv/`;

export default api;
