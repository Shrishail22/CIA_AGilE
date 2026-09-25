import React from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { CategoryIcon } from '../common/CategoryIcon';
import { Badge } from '../common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Eye, Edit2, Trash2, ArrowUpDown } from 'lucide-react';
import { EmptyState } from '../common/EmptyState';

export const ExpenseTable = ({
  expenses,
  onViewDetails,
  onEdit,
  onDelete,
  onAddFirst
}) => {
  const { categories, settings } = useExpense();

  if (!expenses || expenses.length === 0) {
    return (
      <EmptyState
        title="No expenses found"
        description="You have not added any expenses matching these criteria yet."
        actionText="Add New Expense"
        onAction={onAddFirst}
      />
    );
  }

  const getCategoryColor = (catName) => {
    const found = categories.find(c => c.name === catName);
    return found?.color || '#4F46E5';
  };

  const getCategoryIcon = (catName) => {
    const found = categories.find(c => c.name === catName);
    return found?.iconName || 'Tag';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6">Title & Category</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4">Payment Method</th>
              <th className="py-3.5 px-4 text-right">Amount</th>
              <th className="py-3.5 px-4 sm:px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {expenses.map((expense) => {
              const color = getCategoryColor(expense.category);
              const iconName = getCategoryIcon(expense.category);

              return (
                <tr
                  key={expense.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* Title & Category */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm text-white"
                        style={{ backgroundColor: color }}
                      >
                        <CategoryIcon iconName={iconName} className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 line-clamp-1">{expense.title}</p>
                        <span className="inline-block text-xs text-slate-400 mt-0.5">
                          {expense.category}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 text-slate-600 text-xs sm:text-sm whitespace-nowrap">
                    {formatDate(expense.date)}
                  </td>

                  {/* Payment Method */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge variant={expense.paymentMethod === 'UPI' ? 'primary' : 'default'}>
                      {expense.paymentMethod || 'UPI'}
                    </Badge>
                  </td>

                  {/* Amount */}
                  <td className="py-3.5 px-4 text-right font-bold text-slate-800 whitespace-nowrap">
                    {formatCurrency(expense.amount, settings.currency)}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 sm:px-6 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => onViewDetails(expense)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit(expense)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                        title="Edit Expense"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(expense.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Expense"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
