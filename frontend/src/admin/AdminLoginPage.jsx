import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim()) {
      setError('Both username and password are required.');
      return;
    }
    setIsLoading(true);
    try {
      await login(form.username.trim(), form.password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid credentials. Please check your username and password.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Network error — cannot connect to the server. Ensure the backend is running.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B2344] flex flex-col items-center justify-center px-4">
      {/* Decorative rings */}
      <div className="absolute top-0 right-0 w-80 h-80 -translate-y-1/3 translate-x-1/3 pointer-events-none">
        <svg viewBox="0 0 300 300" className="w-full h-full opacity-[0.06]">
          <circle cx="150" cy="150" r="140" stroke="#16B86A" strokeWidth="2" fill="none" strokeDasharray="12 8" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-[#16B86A] flex items-center justify-center font-display font-black text-white text-xl shadow-lg">360</div>
            <div>
              <div className="font-display font-black text-2xl text-white tracking-wider">
                DENSE<span className="text-[#16B86A]">360</span>
              </div>
              <div className="text-xs tracking-widest text-slate-400 uppercase">Admin Portal</div>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[#0E2A50] border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h1 className="font-display font-black text-2xl text-white mb-1.5">Admin Login</h1>
          <p className="text-slate-400 text-sm mb-8">Sign in to access the management portal.</p>

          {error && (
            <div className="mb-5 p-4 rounded-xl bg-red-900/30 border border-red-500/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="admin"
                autoComplete="username"
                className="w-full px-4 py-3 rounded-xl bg-white/8 border-2 border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#16B86A] focus:ring-2 focus:ring-[#16B86A]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white/8 border-2 border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#16B86A] focus:ring-2 focus:ring-[#16B86A]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#16B86A] hover:bg-[#129B58] disabled:opacity-60 text-white font-bold text-sm transition-all shadow-lg"
            >
              {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Signing in...</> : 'LOGIN'}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
            ← Return to public website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
