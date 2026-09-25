import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpense } from '../../context/ExpenseContext';
import { CategoryIcon } from '../common/CategoryIcon';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { ArrowRight, Clock } from 'lucide-react';

export const RecentTransactions = () => {
  const { expenses, categories, settings } = useExpense();
  const navigate = useNavigate();

  // Show top 5 recent expenses
  const recentList = [...expenses]
    .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
    .slice(0, 5);

  const getCategoryColor = (catName) => {
    const found = categories.find(c => c.name === catName);
    return found?.color || '#4F46E5';
  };

  const getCategoryIcon = (catName) => {
    const found = categories.find(c => c.name === catName);
    return found?.iconName || 'Tag';
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            Recent Transactions
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Latest 5 recorded expenses</p>
        </div>
        <button
          onClick={() => navigate('/expenses')}
          className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View All
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {recentList.length > 0 ? (
          recentList.map(exp => {
            const color = getCategoryColor(exp.category);
            const iconName = getCategoryIcon(exp.category);

            return (
              <div
                key={exp.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/60 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm text-white"
                    style={{ backgroundColor: color }}
                  >
                    <CategoryIcon iconName={iconName} className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">{exp.title}</h4>
                    <p className="text-xs text-slate-400">
                      {exp.category} • {formatDate(exp.date)}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-bold text-slate-800 block">
                    {formatCurrency(exp.amount, settings.currency)}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {exp.paymentMethod || 'UPI'}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-xs text-slate-400 py-6 text-center">No recent transactions</p>
        )}
      </div>
    </div>
  );
};
