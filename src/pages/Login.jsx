import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useExpense } from '../context/ExpenseContext';
import { Wallet, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Login = () => {
  const { user, login } = useExpense();
  const navigate = useNavigate();

  const [email, setEmail] = useState('alex.morgan@college.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});

  // If already authenticated, redirect to dashboard
  if (user && user.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Blurs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="max-w-md w-full relative z-10">
        {/* Logo Branding Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white shadow-xl shadow-indigo-500/30 mb-4">
            <Wallet className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">CampusPay</h1>
          <p className="text-sm text-slate-400 mt-1">Student Expense & Budget Management System</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-700/60 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-1">Welcome Back!</h2>
          <p className="text-xs text-slate-400 mb-6">Sign in to track your college budget and expenses.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Student Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="student@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 text-sm text-white placeholder-slate-500 border focus:outline-none transition-all ${
                    errors.email ? 'border-rose-500' : 'border-slate-700 focus:border-indigo-500'
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/80 text-sm text-white placeholder-slate-500 border focus:outline-none transition-all ${
                    errors.password ? 'border-rose-500' : 'border-slate-700 focus:border-indigo-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-rose-400 mt-1">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-slate-400 py-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                />
                <span>Remember Login State</span>
              </label>
              <span className="text-indigo-400 text-xs">Demo Mode</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.99]"
            >
              Sign In to Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Info */}
          <div className="mt-6 p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-300">
            <p className="font-semibold mb-1 flex items-center gap-1.5 text-indigo-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Demo Credentials Ready
            </p>
            <p className="text-[11px] text-indigo-300/80">
              Pre-filled with student account. Click "Sign In" to explore the application!
            </p>
          </div>

          <div className="mt-6 text-center text-xs text-slate-400">
            Don't have a student account?{' '}
            <Link to="/register" className="text-indigo-400 font-bold hover:underline">
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
