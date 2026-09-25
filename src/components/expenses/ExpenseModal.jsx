import React, { useState, useEffect } from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { X, Plus, Save, AlertCircle } from 'lucide-react';

export const ExpenseModal = ({ isOpen, onClose, expenseToEdit = null }) => {
  const { addExpense, editExpense, categories, settings } = useExpense();

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: categories[0]?.name || 'Food',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'UPI',
    description: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (expenseToEdit) {
      setFormData({
        title: expenseToEdit.title || '',
        amount: expenseToEdit.amount || '',
        category: expenseToEdit.category || categories[0]?.name || 'Food',
        date: expenseToEdit.date || new Date().toISOString().split('T')[0],
        paymentMethod: expenseToEdit.paymentMethod || 'UPI',
        description: expenseToEdit.description || ''
      });
    } else {
      setFormData({
        title: '',
        amount: '',
        category: categories[0]?.name || 'Food',
        date: new Date().toISOString().split('T')[0],
        paymentMethod: 'UPI',
        description: ''
      });
    }
    setErrors({});
  }, [expenseToEdit, isOpen, categories]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Title is required';
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      errs.amount = 'Enter a valid positive amount';
    }
    if (!formData.category) errs.category = 'Select a category';
    if (!formData.date) errs.date = 'Select a date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (expenseToEdit) {
      editExpense(expenseToEdit.id, formData);
    } else {
      addExpense(formData);
    }
    onClose();
  };

  const paymentMethods = ['UPI', 'Cash', 'Debit Card', 'Credit Card', 'Net Banking'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-modal border border-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {expenseToEdit ? 'Edit Expense' : 'Add New Expense'}
            </h3>
            <p className="text-xs text-slate-500">Record your student spending details</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Expense Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Canteen Lunch, Textbook, Bus Pass"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none transition-colors ${
                errors.title ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
            {errors.title && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.title}
              </p>
            )}
          </div>

          {/* Amount & Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Amount ({settings.currency}) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
                  {settings.currency}
                </span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none transition-colors ${
                    errors.amount ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 focus:border-indigo-500'
                  }`}
                />
              </div>
              {errors.amount && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.amount}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 text-sm text-slate-800 focus:outline-none bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Payment Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 text-sm text-slate-800 focus:outline-none bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Payment Method
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 text-sm text-slate-800 focus:outline-none bg-white"
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Description / Notes (Optional)
            </label>
            <textarea
              rows="3"
              placeholder="Add extra context, receipt notes, roomie shares..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 text-sm text-slate-800 focus:outline-none resize-none"
            />
          </div>

          {/* Footer Actions */}
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
              {expenseToEdit ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {expenseToEdit ? 'Save Changes' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
