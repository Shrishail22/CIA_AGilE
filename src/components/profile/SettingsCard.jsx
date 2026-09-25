import React, { useState } from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { ConfirmModal } from '../common/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  DollarSign,
  Sun,
  Bell,
  Trash2,
  RotateCcw,
  LogOut,
  ShieldAlert
} from 'lucide-react';

export const SettingsCard = () => {
  const { settings, updateSettings, resetToDefaults, logout } = useExpense();
  const navigate = useNavigate();

  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const currencies = [
    { symbol: '₹', label: 'INR (₹) - Indian Rupee' },
    { symbol: '$', label: 'USD ($) - US Dollar' },
    { symbol: '€', label: 'EUR (€) - Euro' },
    { symbol: '£', label: 'GBP (£) - British Pound' }
  ];

  const themes = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme (Experimental)' },
    { value: 'system', label: 'System Default' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 card-shadow space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Application Settings</h3>
          <p className="text-xs text-slate-500">Preferences, display options & data management</p>
        </div>
      </div>

      {/* Currency Selection */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <DollarSign className="w-4 h-4 text-indigo-600" />
          Preferred Currency Symbol
        </label>
        <select
          value={settings.currency || '₹'}
          onChange={(e) => updateSettings({ currency: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 text-sm text-slate-800 bg-white focus:outline-none"
        >
          {currencies.map(c => (
            <option key={c.symbol} value={c.symbol}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Theme Selection */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sun className="w-4 h-4 text-indigo-600" />
          Appearance Theme
        </label>
        <select
          value={settings.theme || 'light'}
          onChange={(e) => updateSettings({ theme: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 text-sm text-slate-800 bg-white focus:outline-none"
        >
          {themes.map(t => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Notification Preferences */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-indigo-600" />
          Notification Alert Controls
        </label>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer">
            <span className="text-xs font-semibold text-slate-700">
              Budget Warning Notifications (&gt;80% limit)
            </span>
            <input
              type="checkbox"
              checked={settings.notificationsEnabled ?? true}
              onChange={(e) => updateSettings({ notificationsEnabled: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
          </label>
        </div>
      </div>

      {/* Danger Zone: Data Management */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <p className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4" />
          Data & Account Management
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setConfirmResetOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Sample Data
          </button>

          <button
            onClick={() => setConfirmClearOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All Data
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout Account
        </button>
      </div>

      {/* Confirm Modals */}
      <ConfirmModal
        isOpen={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        onConfirm={() => {
          localStorage.clear();
          window.location.reload();
        }}
        title="Clear All Expenses & Data?"
        message="Are you sure you want to clear all stored expense transactions, custom categories, and budgets? This action cannot be undone."
        confirmText="Yes, Clear All Data"
        confirmVariant="danger"
      />

      <ConfirmModal
        isOpen={confirmResetOpen}
        onClose={() => setConfirmResetOpen(false)}
        onConfirm={resetToDefaults}
        title="Reset to Initial Sample Data?"
        message="This will restore all default student expenses, sample budgets, and standard categories."
        confirmText="Reset Sample Data"
        confirmVariant="primary"
      />
    </div>
  );
};
