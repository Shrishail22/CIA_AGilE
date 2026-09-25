import React, { useState, useMemo } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { ExpenseTable } from '../components/expenses/ExpenseTable';
import { ExpenseFilters } from '../components/expenses/ExpenseFilters';
import { ExpenseModal } from '../components/expenses/ExpenseModal';
import { ExpenseDetailModal } from '../components/expenses/ExpenseDetailModal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { calculateTotalExpenses } from '../utils/calculations';
import { formatCurrency } from '../utils/formatters';
import { PlusCircle, Receipt, Download } from 'lucide-react';

export const Expenses = () => {
  const { expenses, categories, deleteExpense, searchQuery, setSearchQuery, settings } = useExpense();

  // Local Filter States
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  // Modal States
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [expenseDetail, setExpenseDetail] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Sync global search query if set from Navbar
  const search = searchQuery;

  // Filter & Sort Logic
  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((exp) => {
        // Search query check
        const matchSearch =
          !search ||
          exp.title.toLowerCase().includes(search.toLowerCase()) ||
          (exp.description && exp.description.toLowerCase().includes(search.toLowerCase()));

        // Category filter check
        const matchCat = categoryFilter === 'ALL' || exp.category === categoryFilter;

        // Date filter check (YYYY-MM)
        const matchDate = !dateFilter || (exp.date && exp.date.startsWith(dateFilter));

        return matchSearch && matchCat && matchDate;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') {
          return new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt);
        }
        if (sortBy === 'date-asc') {
          return new Date(a.date || a.createdAt) - new Date(b.date || b.createdAt);
        }
        if (sortBy === 'amount-desc') {
          return Number(b.amount) - Number(a.amount);
        }
        if (sortBy === 'amount-asc') {
          return Number(a.amount) - Number(b.amount);
        }
        return 0;
      });
  }, [expenses, search, categoryFilter, dateFilter, sortBy]);

  const totalFilteredAmount = calculateTotalExpenses(filteredExpenses);

  const handleResetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('ALL');
    setDateFilter('');
    setSortBy('date-desc');
  };

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 card-shadow">
        <div>
          <div className="flex items-center gap-2">
            <Receipt className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-extrabold text-slate-800">Expense Management</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Showing <span className="font-bold text-slate-800">{filteredExpenses.length}</span> of{' '}
            <span className="font-bold text-slate-800">{expenses.length}</span> expenses (Total:{' '}
            <span className="font-bold text-indigo-600">{formatCurrency(totalFilteredAmount, settings.currency)}</span>)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setExpenseToEdit(null);
              setAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Add New Expense
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <ExpenseFilters
        search={search}
        setSearch={setSearchQuery}
        category={categoryFilter}
        setCategory={setCategoryFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        onReset={handleResetFilters}
      />

      {/* Expense Table */}
      <ExpenseTable
        expenses={filteredExpenses}
        onViewDetails={(exp) => setExpenseDetail(exp)}
        onEdit={(exp) => {
          setExpenseToEdit(exp);
          setAddModalOpen(true);
        }}
        onDelete={(id) => setDeleteTargetId(id)}
        onAddFirst={() => {
          setExpenseToEdit(null);
          setAddModalOpen(true);
        }}
      />

      {/* Add / Edit Expense Modal */}
      <ExpenseModal
        isOpen={addModalOpen}
        onClose={() => {
          setAddModalOpen(false);
          setExpenseToEdit(null);
        }}
        expenseToEdit={expenseToEdit}
      />

      {/* Expense Detail View Modal */}
      <ExpenseDetailModal
        isOpen={!!expenseDetail}
        onClose={() => setExpenseDetail(null)}
        expense={expenseDetail}
        onEdit={(exp) => {
          setExpenseToEdit(exp);
          setAddModalOpen(true);
        }}
        onDelete={(id) => setDeleteTargetId(id)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) {
            deleteExpense(deleteTargetId);
            setDeleteTargetId(null);
          }
        }}
        title="Delete Expense Item?"
        message="Are you sure you want to permanently delete this expense transaction? This action cannot be reversed."
        confirmText="Delete Expense"
        confirmVariant="danger"
      />
    </div>
  );
};
