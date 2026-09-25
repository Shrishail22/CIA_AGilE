import React from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { CategoryIcon } from '../common/CategoryIcon';
import { formatCurrency } from '../../utils/formatters';
import { Edit2, Trash2, Receipt } from 'lucide-react';

export const CategoryCard = ({ category, spent, transactionCount, onEdit, onDelete }) => {
  const { budget, settings } = useExpense();

  const allocatedBudget = budget.categoryBudgets[category.name] || category.budget || 1000;
  const percentage = Math.min(100, Math.round((spent / allocatedBudget) * 100));

  let barBg = 'bg-indigo-600';
  if (percentage >= 100) {
    barBg = 'bg-rose-600';
  } else if (percentage >= 80) {
    barBg = 'bg-amber-500';
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 card-shadow card-shadow-hover flex flex-col justify-between">
      <div>
        {/* Top bar: Icon & Actions */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
              style={{ backgroundColor: category.color || '#4F46E5' }}
            >
              <CategoryIcon iconName={category.iconName} className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">{category.name}</h3>
              <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Receipt className="w-3.5 h-3.5" />
                {transactionCount} {transactionCount === 1 ? 'transaction' : 'transactions'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(category)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
              title="Edit Category"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(category)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Delete Category"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Description */}
        {category.description && (
          <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        )}

        {/* Spent & Budget Numbers */}
        <div className="flex justify-between items-baseline mb-2">
          <div>
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
              Total Spent
            </span>
            <span className="text-xl font-extrabold text-slate-800">
              {formatCurrency(spent, settings.currency)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
              Budget Limit
            </span>
            <span className="text-xs font-bold text-slate-600">
              {formatCurrency(allocatedBudget, settings.currency)}
            </span>
          </div>
        </div>

        {/* Spending Progress */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-1.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barBg}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] font-semibold text-slate-500">
          <span>{percentage}% Used</span>
          <span className={spent > allocatedBudget ? 'text-rose-600 font-bold' : ''}>
            {spent > allocatedBudget
              ? `Exceeded by ${formatCurrency(spent - allocatedBudget, settings.currency)}`
              : `${formatCurrency(allocatedBudget - spent, settings.currency)} remaining`}
          </span>
        </div>
      </div>
    </div>
  );
};
