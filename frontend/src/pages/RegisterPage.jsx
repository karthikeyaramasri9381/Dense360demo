import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, AlertCircle, Shield } from 'lucide-react';
import { submitRegistration } from '../services/api';

const initialForm = {
  full_name: '', date_of_birth: '', gender: '', class_name: '', section: '',
  school_name: '', city: '',
  parent_name: '', mobile: '', email: '', relationship: '',
  interests_group: '',
  consent: false,
};

const requiredFieldMessages = {
  full_name: 'Student full name is required.',
  class_name: 'Class / Grade is required.',
  school_name: 'School name is required.',
  parent_name: 'Parent / Guardian name is required.',
  mobile: 'Parent mobile number is required.',
  consent: 'You must agree to the terms to submit.',
};

function validateForm(data) {
  const errors = {};
  if (!data.full_name.trim()) errors.full_name = requiredFieldMessages.full_name;
  else if (data.full_name.trim().length < 2) errors.full_name = 'Please enter a valid full name.';

  if (!data.class_name.trim()) errors.class_name = requiredFieldMessages.class_name;

  if (!data.school_name.trim()) errors.school_name = requiredFieldMessages.school_name;
  else if (data.school_name.trim().length < 2) errors.school_name = 'Please enter a valid school name.';

  if (!data.parent_name.trim()) errors.parent_name = requiredFieldMessages.parent_name;

  if (!data.mobile.trim()) errors.mobile = requiredFieldMessages.mobile;
  else {
    const cleaned = data.mobile.replace(/[\s\-\(\)\+]/g, '');
    if (cleaned.length < 7 || !/^\d+$/.test(cleaned)) errors.mobile = 'Please enter a valid mobile number.';
  }

  if (data.email && data.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) errors.email = 'Please enter a valid email address.';
  }

  if (!data.consent) errors.consent = requiredFieldMessages.consent;

  return errors;
}

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1.5 mt-1.5 text-red-500 text-xs font-medium">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
      {msg}
    </p>
  );
}

function SuccessView({ reg }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F5F2EA] flex flex-col">
      {/* Header */}
      <header className="bg-[#0B2344] py-4 px-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#16B86A] flex items-center justify-center font-display font-black text-white text-sm">360</div>
        <span className="text-white font-display font-black text-lg">DENSE<span className="text-[#16B86A]">360</span></span>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg bg-white rounded-3xl shadow-premium p-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-[#16B86A]/10 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-[#16B86A]" />
          </motion.div>
          <h1 className="font-display font-black text-3xl text-[#0B2344] mb-2">
            REGISTRATION SUBMITTED ✓
          </h1>
          <p className="text-[#64748B] text-base mb-8">
            Thank you for registering with DENSE360.
          </p>
          <div className="rounded-2xl bg-[#F5F2EA] border border-[#0B2344]/10 p-6 mb-6">
            <p className="text-xs uppercase font-bold tracking-widest text-[#64748B] mb-2">Your Registration ID</p>
            <p className="font-display font-black text-2xl sm:text-3xl text-[#0B2344] tracking-widest">
              {reg.registration_id}
            </p>
            <p className="mt-3 text-xs text-[#64748B]">
              Status: <span className="font-bold text-amber-600 uppercase">{reg.status || 'PENDING'}</span>
            </p>
          </div>
          <p className="text-xs text-[#64748B] mb-8 px-4">
            Please save or screenshot your Registration ID above. You may be asked to quote this number.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-xl border-2 border-[#0B2344]/20 text-[#0B2344] font-semibold text-sm hover:border-[#0B2344]/40 transition-colors"
            >
              PRINT / SAVE
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#16B86A] text-white font-bold text-sm shadow-md hover:bg-[#129B58] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO DENSE360
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrEl = document.querySelector('[data-field-error]');
      if (firstErrEl) firstErrEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        full_name: form.full_name.trim(),
        date_of_birth: form.date_of_birth || null,
        gender: form.gender || null,
        class_name: form.class_name.trim(),
        section: form.section.trim() || null,
        school_name: form.school_name.trim(),
        city: form.city.trim() || null,
        parent_name: form.parent_name.trim(),
        mobile: form.mobile.trim(),
        email: form.email.trim() || null,
        relationship: form.relationship.trim() || null,
        interests_group: form.interests_group.trim() || null,
        consent: form.consent,
      };

      const response = await submitRegistration(payload);
      setSubmissionResult({
        registration_id: response.data.registration_id,
        status: response.data.status,
        data: response.data.data,
      });
    } catch (err) {
      if (err.response && err.response.data) {
        const serverErrors = err.response.data.errors;
        if (serverErrors && typeof serverErrors === 'object') {
          const mapped = {};
          if (serverErrors.full_name) mapped.full_name = serverErrors.full_name[0] || serverErrors.full_name;
          if (serverErrors.class_name) mapped.class_name = serverErrors.class_name[0] || serverErrors.class_name;
          if (serverErrors.school_name) mapped.school_name = serverErrors.school_name[0] || serverErrors.school_name;
          if (serverErrors.parent_name) mapped.parent_name = serverErrors.parent_name[0] || serverErrors.parent_name;
          if (serverErrors.mobile) mapped.mobile = serverErrors.mobile[0] || serverErrors.mobile;
          if (serverErrors.email) mapped.email = serverErrors.email[0] || serverErrors.email;
          if (serverErrors.consent) mapped.consent = serverErrors.consent[0] || serverErrors.consent;
          if (Object.keys(mapped).length > 0) {
            setErrors(mapped);
          } else {
            setApiError(err.response.data.message || 'Submission failed. Please try again.');
          }
        } else {
          setApiError(err.response.data.message || 'Submission failed. Please check your details and try again.');
        }
      } else if (err.code === 'ERR_NETWORK') {
        setApiError('Network error — please check your connection and try again.');
      } else {
        setApiError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionResult) {
    return <SuccessView reg={submissionResult} />;
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border-2 bg-white text-[#0B2344] text-sm placeholder-[#94A3B8] font-medium outline-none transition-all duration-200 focus:border-[#16B86A] focus:ring-2 focus:ring-[#16B86A]/20 ${
      errors[field] ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
    }`;

  const selectClass = (field) =>
    `w-full px-4 py-3 rounded-xl border-2 bg-white text-[#0B2344] text-sm font-medium outline-none cursor-pointer transition-all duration-200 focus:border-[#16B86A] focus:ring-2 focus:ring-[#16B86A]/20 ${
      errors[field] ? 'border-red-300' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
    }`;

  const Label = ({ children, required }) => (
    <label className="block text-xs font-bold text-[#0B2344] tracking-wide uppercase mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  return (
    <div className="min-h-screen bg-[#F5F2EA]">
      {/* Header */}
      <header className="bg-[#0B2344] py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#16B86A] flex items-center justify-center font-display font-black text-white text-sm">360</div>
            <span className="text-white font-display font-black text-lg">DENSE<span className="text-[#16B86A]">360</span></span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-slate-300 hover:text-white text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </header>

      {/* Hero area */}
      <div className="bg-[#0B2344] pb-16 pt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#16B86A]/15 text-[#16B86A] text-xs font-bold tracking-widest uppercase mb-5">
              Student Registration
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-white mb-4">
              JOIN DENSE360
            </h1>
            <p className="text-slate-300 text-base max-w-xl mx-auto">
              Fill in your details to participate in the DENSE360 experience.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-premium p-8 sm:p-10"
        >
          {apiError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-10">
            {/* SECTION 01 — Student Details */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F5F2EA]">
                <div className="w-8 h-8 rounded-xl bg-[#0B2344] flex items-center justify-center text-white font-black text-xs">01</div>
                <h2 className="font-display font-bold text-lg text-[#0B2344]">Student Details</h2>
              </div>
              <div className="space-y-5">
                <div data-field-error={errors.full_name || undefined}>
                  <Label required>Full Name</Label>
                  <input type="text" name="full_name" value={form.full_name} onChange={handleChange} placeholder="Enter student's full name" className={inputClass('full_name')} autoComplete="name" />
                  <FieldError msg={errors.full_name} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label>Date of Birth</Label>
                    <input type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} className={inputClass('date_of_birth')} />
                  </div>
                  <div>
                    <Label>Gender</Label>
                    <select name="gender" value={form.gender} onChange={handleChange} className={selectClass('gender')}>
                      <option value="">Select gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                      <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div data-field-error={errors.class_name || undefined}>
                    <Label required>Class</Label>
                    <input type="text" name="class_name" value={form.class_name} onChange={handleChange} placeholder="e.g. 10, 11, 12" className={inputClass('class_name')} />
                    <FieldError msg={errors.class_name} />
                  </div>
                  <div>
                    <Label>Section</Label>
                    <input type="text" name="section" value={form.section} onChange={handleChange} placeholder="e.g. A, B, C" className={inputClass('section')} />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 02 — School Details */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F5F2EA]">
                <div className="w-8 h-8 rounded-xl bg-[#0B2344] flex items-center justify-center text-white font-black text-xs">02</div>
                <h2 className="font-display font-bold text-lg text-[#0B2344]">School Details</h2>
              </div>
              <div className="space-y-5">
                <div data-field-error={errors.school_name || undefined}>
                  <Label required>School Name</Label>
                  <input type="text" name="school_name" value={form.school_name} onChange={handleChange} placeholder="Enter your school name" className={inputClass('school_name')} />
                  <FieldError msg={errors.school_name} />
                </div>
                <div>
                  <Label>City / Location</Label>
                  <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="e.g. Hyderabad, Bengaluru" className={inputClass('city')} />
                </div>
              </div>
            </div>

            {/* SECTION 03 — Parent / Guardian */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F5F2EA]">
                <div className="w-8 h-8 rounded-xl bg-[#0B2344] flex items-center justify-center text-white font-black text-xs">03</div>
                <h2 className="font-display font-bold text-lg text-[#0B2344]">Parent / Guardian</h2>
              </div>
              <div className="space-y-5">
                <div data-field-error={errors.parent_name || undefined}>
                  <Label required>Parent / Guardian Name</Label>
                  <input type="text" name="parent_name" value={form.parent_name} onChange={handleChange} placeholder="Full name of parent or guardian" className={inputClass('parent_name')} />
                  <FieldError msg={errors.parent_name} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div data-field-error={errors.mobile || undefined}>
                    <Label required>Mobile Number</Label>
                    <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} placeholder="e.g. 9999999999" className={inputClass('mobile')} />
                    <FieldError msg={errors.mobile} />
                  </div>
                  <div>
                    <Label>Relationship</Label>
                    <select name="relationship" value={form.relationship} onChange={handleChange} className={selectClass('relationship')}>
                      <option value="">Select relationship</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Guardian">Guardian</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div data-field-error={errors.email || undefined}>
                  <Label>Email</Label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="parent@example.com (optional)" className={inputClass('email')} />
                  <FieldError msg={errors.email} />
                </div>
              </div>
            </div>

            {/* SECTION 04 — Interests / Group */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F5F2EA]">
                <div className="w-8 h-8 rounded-xl bg-[#0B2344] flex items-center justify-center text-white font-black text-xs">04</div>
                <h2 className="font-display font-bold text-lg text-[#0B2344]">Interests / Group</h2>
              </div>
              <div>
                <Label>Interests / Group</Label>
                <input
                  type="text"
                  name="interests_group"
                  value={form.interests_group}
                  onChange={handleChange}
                  placeholder="e.g. MPC"
                  className={inputClass('interests_group')}
                />
                <p className="mt-1.5 text-xs text-[#94A3B8]">Optional — your academic group, stream or area of interest.</p>
              </div>
            </div>

            {/* Consent */}
            <div className="rounded-2xl bg-[#F5F2EA] border border-[#0B2344]/10 p-5">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={form.consent}
                    onChange={handleChange}
                    className="w-5 h-5 rounded accent-[#16B86A] cursor-pointer"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0B2344] leading-relaxed">
                    I agree to the DENSE360 participation terms and consent to the submission of these details.
                  </p>
                  <p className="text-xs text-[#64748B] mt-1">
                    <span className="underline cursor-pointer hover:text-[#0B2344]">Participation Terms</span>
                    {' '}·{' '}
                    <span className="underline cursor-pointer hover:text-[#0B2344]">Privacy Policy</span>
                  </p>
                </div>
              </label>
              <FieldError msg={errors.consent} />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-[#16B86A] hover:bg-[#129B58] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  SUBMIT REGISTRATION
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Security note */}
            <p className="text-center text-xs text-[#94A3B8] flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Your information is submitted securely and used only for DENSE360 programme purposes.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
