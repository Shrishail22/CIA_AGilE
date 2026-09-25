import React from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { CategoryIcon } from '../common/CategoryIcon';
import { Badge } from '../common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { X, Calendar, CreditCard, Tag, FileText, Edit2, Trash2 } from 'lucide-react';

export const ExpenseDetailModal = ({ isOpen, onClose, expense, onEdit, onDelete }) => {
  const { categories, settings } = useExpense();

  if (!isOpen || !expense) return null;

  const categoryObj = categories.find(c => c.name === expense.category);
  const color = categoryObj?.color || '#4F46E5';
  const iconName = categoryObj?.iconName || 'Tag';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-modal border border-slate-100">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div
              className="p-3 rounded-2xl shadow-sm flex items-center justify-center text-white"
              style={{ backgroundColor: color }}
            >
              <CategoryIcon iconName={iconName} className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">{expense.title}</h3>
              <Badge variant="primary">{expense.category}</Badge>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Box */}
        <div className="bg-slate-50 p-4 rounded-xl text-center mb-6 border border-slate-100">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Expense Amount</span>
          <h2 className="text-3xl font-extrabold text-slate-800 mt-1">
            {formatCurrency(expense.amount, settings.currency)}
          </h2>
        </div>

        {/* Info Rows */}
        <div className="space-y-3.5 mb-6 text-sm text-slate-600">
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50/70">
            <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
            <div className="flex-1 flex justify-between">
              <span className="text-slate-500 font-medium">Date</span>
              <span className="font-semibold text-slate-800">{formatDate(expense.date)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50/70">
            <CreditCard className="w-4 h-4 text-purple-500 shrink-0" />
            <div className="flex-1 flex justify-between">
              <span className="text-slate-500 font-medium">Payment Method</span>
              <span className="font-semibold text-slate-800">{expense.paymentMethod || 'UPI'}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50/70">
            <FileText className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="text-slate-500 font-medium block mb-0.5">Description</span>
              <p className="text-slate-800 font-normal leading-relaxed text-xs">
                {expense.description || 'No description provided.'}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={() => {
              onClose();
              onDelete(expense.id);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>

          <button
            onClick={() => {
              onClose();
              onEdit(expense);
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Edit2 className="w-4 h-4" />
            Edit Expense
          </button>
        </div>
      </div>
    </div>
  );
};
