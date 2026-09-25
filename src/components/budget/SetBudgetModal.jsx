import React, { useState, useEffect } from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { X, Save, AlertCircle } from 'lucide-react';

export const SetBudgetModal = ({ isOpen, onClose, target = null }) => {
  const { updateOverallBudget, updateCategoryBudget, settings } = useExpense();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (target) {
      setAmount(target.currentVal || '');
    } else {
      setAmount('');
    }
    setError('');
  }, [target, isOpen]);

  if (!isOpen || !target) return null;

  const isOverall = target.type === 'overall';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid positive budget amount');
      return;
    }

    if (isOverall) {
      updateOverallBudget(amount);
    } else {
      updateCategoryBudget(target.categoryName, amount);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-modal border border-slate-100">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {isOverall ? 'Set Monthly Overall Budget' : `Set ${target.categoryName} Budget`}
            </h3>
            <p className="text-xs text-slate-500">
              {isOverall
                ? 'Define your total target spending limit for the month'
                : `Set budget allocation limit for ${target.categoryName}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Budget Amount ({settings.currency}) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
                {settings.currency}
              </span>
              <input
                type="number"
                placeholder="15000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none transition-colors ${
                  error ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 focus:border-indigo-500'
                }`}
              />
            </div>
            {error && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {error}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all"
            >
              <Save className="w-4 h-4" />
              Save Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
