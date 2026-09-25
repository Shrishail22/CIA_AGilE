import React from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { calculateMonthlyExpenses } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { PiggyBank, Edit3, AlertCircle, CheckCircle2 } from 'lucide-react';

export const OverallBudgetCard = ({ onSetBudget }) => {
  const { expenses, budget, settings } = useExpense();

  const monthlySpent = calculateMonthlyExpenses(expenses);
  const monthlyLimit = budget.monthlyTotal || 15000;
  const remaining = monthlyLimit - monthlySpent;
  const percentage = Math.min(100, Math.round((monthlySpent / monthlyLimit) * 100));

  let statusBg = 'bg-indigo-600';
  let badgeText = 'Healthy Budget';
  let badgeClass = 'bg-emerald-100 text-emerald-800';

  if (percentage >= 100) {
    statusBg = 'bg-rose-600';
    badgeText = 'Budget Exceeded!';
    badgeClass = 'bg-rose-100 text-rose-800';
  } else if (percentage >= 80) {
    statusBg = 'bg-amber-500';
    badgeText = 'Warning: Near Limit (>80%)';
    badgeClass = 'bg-amber-100 text-amber-800';
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <PiggyBank className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Monthly Overall Budget</h3>
            <p className="text-xs text-slate-500">Master spending cap across all categories</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-xs px-3 py-1 rounded-full font-bold ${badgeClass}`}>
            {badgeText}
          </span>
          <button
            onClick={() => onSetBudget({ type: 'overall', currentVal: monthlyLimit })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Set Budget
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div>
          <span className="text-xs text-slate-500 font-medium block uppercase tracking-wider">Total Monthly Limit</span>
          <span className="text-2xl font-extrabold text-slate-800">
            {formatCurrency(monthlyLimit, settings.currency)}
          </span>
        </div>

        <div>
          <span className="text-xs text-slate-500 font-medium block uppercase tracking-wider">Total Amount Spent</span>
          <span className="text-2xl font-extrabold text-indigo-600">
            {formatCurrency(monthlySpent, settings.currency)}
          </span>
        </div>

        <div>
          <span className="text-xs text-slate-500 font-medium block uppercase tracking-wider">Remaining Amount</span>
          <span className={`text-2xl font-extrabold ${remaining < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
            {formatCurrency(remaining, settings.currency)}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold text-slate-700">
          <span>Overall Usage Progress</span>
          <span>{percentage}% Used</span>
        </div>
        <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${statusBg}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
