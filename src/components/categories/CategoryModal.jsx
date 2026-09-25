import React, { useState, useEffect } from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { AVAILABLE_ICONS, CategoryIcon } from '../common/CategoryIcon';
import { X, Save, Plus, AlertCircle } from 'lucide-react';

export const CategoryModal = ({ isOpen, onClose, categoryToEdit = null }) => {
  const { addCategory, editCategory, settings } = useExpense();

  const [formData, setFormData] = useState({
    name: '',
    iconName: 'Tag',
    color: '#4F46E5',
    budget: '1500',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const colorPalette = [
    '#4F46E5', // Indigo
    '#7C3AED', // Violet
    '#EC4899', // Pink
    '#EF4444', // Red
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#64748B'  // Slate
  ];

  useEffect(() => {
    if (categoryToEdit) {
      setFormData({
        name: categoryToEdit.name || '',
        iconName: categoryToEdit.iconName || 'Tag',
        color: categoryToEdit.color || '#4F46E5',
        budget: categoryToEdit.budget || '1500',
        description: categoryToEdit.description || ''
      });
    } else {
      setFormData({
        name: '',
        iconName: 'Tag',
        color: '#4F46E5',
        budget: '1500',
        description: ''
      });
    }
    setErrors({});
  }, [categoryToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Category name is required';
    if (!formData.budget || isNaN(formData.budget) || Number(formData.budget) <= 0) {
      errs.budget = 'Enter a valid monthly budget';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (categoryToEdit) {
      editCategory(categoryToEdit.id, formData);
      onClose();
    } else {
      const success = addCategory(formData);
      if (success !== false) onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-modal border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {categoryToEdit ? 'Edit Category' : 'Create Custom Category'}
            </h3>
            <p className="text-xs text-slate-500">Organize and set limits for your spending</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Category Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Books, Gaming, Rent, Subscriptions"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none transition-colors ${
                errors.name ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
            {errors.name && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
              </p>
            )}
          </div>

          {/* Monthly Budget */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Monthly Category Budget ({settings.currency}) *
            </label>
            <input
              type="number"
              placeholder="1500"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none transition-colors ${
                errors.budget ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 focus:border-indigo-500'
              }`}
            />
            {errors.budget && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.budget}
              </p>
            )}
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Category Color
            </label>
            <div className="flex flex-wrap gap-2.5">
              {colorPalette.map(color => (
                <button
                  type="button"
                  key={color}
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-8 h-8 rounded-full transition-transform ${
                    formData.color === color ? 'scale-115 ring-2 ring-offset-2 ring-indigo-500' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Select Icon
            </label>
            <div className="grid grid-cols-5 gap-2 max-h-36 overflow-y-auto p-1.5 border border-slate-200 rounded-xl">
              {AVAILABLE_ICONS.map(iconName => (
                <button
                  type="button"
                  key={iconName}
                  onClick={() => setFormData({ ...formData, iconName })}
                  className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
                    formData.iconName === iconName
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <CategoryIcon iconName={iconName} className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Description (Optional)
            </label>
            <input
              type="text"
              placeholder="Short description of this category..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 text-sm text-slate-800 focus:outline-none"
            />
          </div>

          {/* Actions */}
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
              {categoryToEdit ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {categoryToEdit ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
