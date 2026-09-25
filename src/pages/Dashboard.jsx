import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { ExpenseOverviewChart } from '../components/dashboard/ExpenseOverviewChart';
import { CategoryChart } from '../components/dashboard/CategoryChart';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { BudgetProgressCard } from '../components/dashboard/BudgetProgressCard';
import { ExpenseModal } from '../components/expenses/ExpenseModal';
import { PlusCircle, Sparkles } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useExpense();
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Dynamic greeting based on current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-6">
      {/* Banner / Greeting Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Subtle Background Glows */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 top-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-indigo-100 text-xs font-semibold backdrop-blur-md mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Student Finance Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {getGreeting()}, {user?.name || 'Student'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/90 mt-1 max-w-xl">
            Track your semester spending, monitor monthly budget caps, and analyze your category breakdown.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-indigo-700 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-lg transition-all transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4 text-indigo-600" />
            Record New Expense
          </button>
        </div>
      </div>

      {/* Top Section: 4 Summary Metric Cards */}
      <SummaryCards />

      {/* Middle Section: 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseOverviewChart />
        <CategoryChart />
      </div>

      {/* Bottom Section: Recent Transactions & Budget Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions />
        <BudgetProgressCard />
      </div>

      {/* Quick Add Expense Modal */}
      <ExpenseModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
    </div>
  );
};
