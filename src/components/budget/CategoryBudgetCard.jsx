import React from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { CategoryIcon } from '../common/CategoryIcon';
import { formatCurrency } from '../../utils/formatters';
import { Edit2, AlertCircle } from 'lucide-react';

export const CategoryBudgetCard = ({ category, spent, onSetCategoryBudget }) => {
  const { budget, settings } = useExpense();

  const allocated = budget.categoryBudgets[category.name] || category.budget || 1000;
  const remaining = allocated - spent;
  const percentage = Math.min(100, Math.round((spent / allocated) * 100));

  let statusBg = 'bg-indigo-600';
  let isWarning = percentage >= 80 && percentage < 100;
  let isExceeded = percentage >= 100;

  if (isExceeded) {
    statusBg = 'bg-rose-600';
  } else if (isWarning) {
    statusBg = 'bg-amber-500';
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 card-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
              style={{ backgroundColor: category.color }}
            >
              <CategoryIcon iconName={category.iconName} className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-800">{category.name}</h4>
              <p className="text-xs text-slate-400 font-medium">Category Budget</p>
            </div>
          </div>

          <button
            onClick={() => onSetCategoryBudget(category)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            title="Edit Category Budget"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {/* Numbers */}
        <div className="grid grid-cols-2 gap-2 mb-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px]">
              Allocated
            </span>
            <span className="font-bold text-slate-800">
              {formatCurrency(allocated, settings.currency)}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px]">
              Spent
            </span>
            <span className="font-bold text-indigo-600">
              {formatCurrency(spent, settings.currency)}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Progress ({percentage}%)</span>
            <span className={remaining < 0 ? 'text-rose-600 font-bold' : 'text-slate-500'}>
              {remaining < 0
                ? `${formatCurrency(Math.abs(remaining), settings.currency)} Over`
                : `${formatCurrency(remaining, settings.currency)} Left`}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${statusBg}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Warning Indicator */}
        {(isWarning || isExceeded) && (
          <div
            className={`mt-3 p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 ${
              isExceeded
                ? 'bg-rose-50 text-rose-700 border border-rose-100'
                : 'bg-amber-50 text-amber-700 border border-amber-100'
            }`}
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              {isExceeded
                ? 'Exceeded budget limit!'
                : 'Approaching budget limit (≥80%)'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
