import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { OverallBudgetCard } from '../components/budget/OverallBudgetCard';
import { CategoryBudgetCard } from '../components/budget/CategoryBudgetCard';
import { SetBudgetModal } from '../components/budget/SetBudgetModal';
import { calculateCategoryTotals } from '../utils/calculations';
import { Wallet, Info } from 'lucide-react';

export const Budget = () => {
  const { categories, expenses, budget } = useExpense();
  const [budgetModalTarget, setBudgetModalTarget] = useState(null);

  const categoryTotals = calculateCategoryTotals(expenses);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Wallet className="w-6 h-6 text-emerald-600" />
            <h1 className="text-xl font-extrabold text-slate-800">Budget Management</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Set spending limits for your semester to avoid overspending and build discipline.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100">
          <Info className="w-4 h-4 shrink-0" />
          <span>Real-time local budget tracking</span>
        </div>
      </div>

      {/* Master Overall Monthly Budget */}
      <OverallBudgetCard
        onSetBudget={(target) => setBudgetModalTarget(target)}
      />

      {/* Category Budgets Grid Section */}
      <div>
        <h3 className="text-base font-bold text-slate-800 mb-4">Category Budget Allocations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryBudgetCard
              key={cat.id}
              category={cat}
              spent={categoryTotals[cat.name] || 0}
              onSetCategoryBudget={(category) => {
                setBudgetModalTarget({
                  type: 'category',
                  categoryName: category.name,
                  currentVal: budget.categoryBudgets[category.name] || category.budget || 1000
                });
              }}
            />
          ))}
        </div>
      </div>

      {/* Budget Edit Modal */}
      <SetBudgetModal
        isOpen={!!budgetModalTarget}
        onClose={() => setBudgetModalTarget(null)}
        target={budgetModalTarget}
      />
    </div>
  );
};
