import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpense } from '../../context/ExpenseContext';
import { calculateMonthlyExpenses, calculateCategoryTotals } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { Wallet, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const BudgetProgressCard = () => {
  const { expenses, budget, categories, settings } = useExpense();
  const navigate = useNavigate();

  const monthlyTotal = calculateMonthlyExpenses(expenses);
  const totalBudget = budget.monthlyTotal || 15000;
  const percentage = Math.min(100, Math.round((monthlyTotal / totalBudget) * 100));

  const categoryTotals = calculateCategoryTotals(expenses);

  // Top 3 category budgets
  const topCategories = categories.slice(0, 4);

  let statusBg = 'bg-indigo-600';
  let badgeText = 'On Track';
  let badgeStyle = 'bg-emerald-100 text-emerald-800';

  if (percentage >= 100) {
    statusBg = 'bg-rose-600';
    badgeText = 'Exceeded Limit!';
    badgeStyle = 'bg-rose-100 text-rose-800';
  } else if (percentage >= 80) {
    statusBg = 'bg-amber-500';
    badgeText = 'Warning (>80%)';
    badgeStyle = 'bg-amber-100 text-amber-800';
  }

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 card-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-emerald-600" />
              Budget Health & Progress
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Overall monthly spending allocation</p>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${badgeStyle}`}>
            {badgeText}
          </span>
        </div>

        {/* Total Progress Bar */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-5">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-slate-600">
              Spent: {formatCurrency(monthlyTotal, settings.currency)}
            </span>
            <span className="text-slate-800">
              Budget: {formatCurrency(totalBudget, settings.currency)}
            </span>
          </div>

          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${statusBg}`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2 font-medium">
            <span>{percentage}% Used</span>
            <span>{formatCurrency(Math.max(0, totalBudget - monthlyTotal), settings.currency)} Left</span>
          </div>
        </div>

        {/* Category Budget Snapshots */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Category Budget Snapshots
          </p>
          {topCategories.map(cat => {
            const spent = categoryTotals[cat.name] || 0;
            const catBudget = budget.categoryBudgets[cat.name] || cat.budget || 1000;
            const catPercent = Math.min(100, Math.round((spent / catBudget) * 100));

            return (
              <div key={cat.id} className="text-xs space-y-1">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </span>
                  <span>
                    {formatCurrency(spent, settings.currency)} / {formatCurrency(catBudget, settings.currency)}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${catPercent}%`,
                      backgroundColor: catPercent >= 100 ? '#EF4444' : catPercent >= 80 ? '#F59E0B' : cat.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100">
        <button
          onClick={() => navigate('/budget')}
          className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-200"
        >
          Manage All Budgets
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
