import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { verifyCertificate } from '../services/api';

export default function CertificateVerifyPage() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) { setError('Please enter a certificate ID.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await verifyCertificate(trimmed);
      setResult(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setResult({ verified: false, message: 'No valid certificate found for this ID.' });
      } else {
        setError('Verification failed. Please check your connection and try again.');
      }
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EA] flex flex-col">
      <header className="bg-[#0B2344] py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#16B86A] flex items-center justify-center font-display font-black text-white text-sm">360</div>
            <span className="text-white font-display font-black text-lg">DENSE<span className="text-[#16B86A]">360</span></span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-slate-300 hover:text-white text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="font-display font-black text-4xl text-[#0B2344] mb-3">Verify Certificate</h1>
            <p className="text-[#64748B] text-sm">Enter a DENSE360 certificate code to verify its authenticity.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-premium p-8">
            <form onSubmit={handleVerify} className="flex gap-3">
              <input
                type="text"
                value={code}
                onChange={e => { setCode(e.target.value); setError(''); setResult(null); }}
                placeholder="e.g. CERT-D360-XXXXXXXX"
                className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 text-sm font-mono focus:border-[#16B86A] focus:outline-none"
              />
              <button type="submit" disabled={loading} className="px-5 py-3 rounded-xl bg-[#0B2344] text-white font-bold text-sm hover:bg-[#143868] disabled:opacity-60 flex items-center gap-2 transition-colors">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                {loading ? '' : 'Verify'}
              </button>
            </form>

            {error && <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}

            {result && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                {result.verified ? (
                  <div className="rounded-2xl bg-green-50 border-2 border-green-200 p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <CheckCircle2 className="w-7 h-7 text-green-600 flex-shrink-0" />
                      <h2 className="font-display font-bold text-green-800 text-xl">Certificate Verified ✓</h2>
                    </div>
                    <div className="space-y-3 text-sm">
                      {[
                        ['Certificate Code', result.data?.certificate_code],
                        ['Student Name', result.data?.student_name],
                        ['School', result.data?.school_name],
                        ['Certificate', result.data?.title],
                        ['Activity', result.data?.activity_name],
                        ['Event', result.data?.event_title],
                        ['Issued Date', result.data?.issued_date],
                        ['Type', result.data?.certificate_type],
                      ].map(([label, val]) => val ? (
                        <div key={label} className="flex gap-3">
                          <span className="text-green-600 font-medium w-36 flex-shrink-0">{label}</span>
                          <span className="text-green-900 font-semibold">{val}</span>
                        </div>
                      ) : null)}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-red-50 border-2 border-red-200 p-6 flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h2 className="font-bold text-red-800 text-base mb-1">Certificate Not Found</h2>
                      <p className="text-red-600 text-sm">{result.message || 'No valid certificate found for this ID. Please check the code and try again.'}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
