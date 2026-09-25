import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { CategoryCard } from '../components/categories/CategoryCard';
import { CategoryModal } from '../components/categories/CategoryModal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { calculateCategoryTotals, calculateCategoryCounts } from '../utils/calculations';
import { Grid, PlusCircle, AlertTriangle } from 'lucide-react';

export const Categories = () => {
  const { categories, expenses, deleteCategory } = useExpense();

  const [modalOpen, setModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  // In-use confirmation dialog state
  const [deleteWarning, setDeleteWarning] = useState(null);

  const categoryTotals = calculateCategoryTotals(expenses);
  const categoryCounts = calculateCategoryCounts(expenses);

  const handleDeleteRequest = (cat) => {
    const res = deleteCategory(cat.id, false);
    if (res && res.inUse) {
      setDeleteWarning({
        id: cat.id,
        name: cat.name,
        count: res.count
      });
    }
  };

  const handleForceDelete = () => {
    if (deleteWarning) {
      deleteCategory(deleteWarning.id, true);
      setDeleteWarning(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 card-shadow">
        <div>
          <div className="flex items-center gap-2">
            <Grid className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-extrabold text-slate-800">Category Management</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage spending categories, icons, colors, and category budget caps.
          </p>
        </div>

        <button
          onClick={() => {
            setCategoryToEdit(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          Add Custom Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            spent={categoryTotals[cat.name] || 0}
            transactionCount={categoryCounts[cat.name] || 0}
            onEdit={(c) => {
              setCategoryToEdit(c);
              setModalOpen(true);
            }}
            onDelete={handleDeleteRequest}
          />
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      <CategoryModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setCategoryToEdit(null);
        }}
        categoryToEdit={categoryToEdit}
      />

      {/* Category In-Use Warning Modal */}
      {deleteWarning && (
        <ConfirmModal
          isOpen={!!deleteWarning}
          onClose={() => setDeleteWarning(null)}
          onConfirm={handleForceDelete}
          title={`Delete Category "${deleteWarning.name}"?`}
          message={`Warning: This category is currently being used by ${deleteWarning.count} expense transaction(s). Deleting it will automatically reassign those transactions to the "Other" category.`}
          confirmText="Yes, Delete & Reassign"
          confirmVariant="danger"
        />
      )}
    </div>
  );
};
