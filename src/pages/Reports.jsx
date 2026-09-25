import React, { useState, useMemo } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { ReportsCharts } from '../components/reports/ReportsCharts';
import { StatCard } from '../components/common/StatCard';
import {
  calculateTotalExpenses,
  getHighestSpendingCategory,
  getHighestExpense,
  calculateAverageDailySpending,
  filterExpensesByMonth
} from '../utils/calculations';
import { formatCurrency } from '../utils/formatters';
import { BarChart3, Calendar, Filter, Zap, Award, DollarSign } from 'lucide-react';

export const Reports = () => {
  const { expenses, categories, settings } = useExpense();

  // Filters
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Filtered expenses based on selected month & category
  const filteredExpenses = useMemo(() => {
    let list = expenses;
    if (selectedMonth) {
      list = filterExpensesByMonth(list, selectedMonth);
    }
    if (categoryFilter !== 'ALL') {
      list = list.filter((e) => e.category === categoryFilter);
    }
    return list;
  }, [expenses, selectedMonth, categoryFilter]);

  // Analytics Metrics
  const totalMonthlySpent = calculateTotalExpenses(filteredExpenses);
  const highestCatInfo = getHighestSpendingCategory(filteredExpenses);
  const highestExp = getHighestExpense(filteredExpenses);
  const avgDaily = calculateAverageDailySpending(expenses, selectedMonth);

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 card-shadow">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-extrabold text-slate-800">Reports & Analytics</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visual insights, trends, and analytical breakdown of student expenditure.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Month Selector */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent text-slate-700 font-semibold focus:outline-none cursor-pointer"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent text-slate-700 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Filtered Spending"
          value={formatCurrency(totalMonthlySpent, settings.currency)}
          subtext={`Total spent in ${selectedMonth}`}
          icon={DollarSign}
          color="indigo"
        />

        <StatCard
          title="Highest Spending Category"
          value={highestCatInfo.category}
          subtext={`Spent ${formatCurrency(highestCatInfo.amount, settings.currency)}`}
          icon={Award}
          color="violet"
        />

        <StatCard
          title="Highest Single Expense"
          value={highestExp ? formatCurrency(highestExp.amount, settings.currency) : 'N/A'}
          subtext={highestExp ? highestExp.title : 'No data'}
          icon={Zap}
          color="amber"
        />

        <StatCard
          title="Avg. Daily Spending"
          value={formatCurrency(avgDaily, settings.currency)}
          subtext="Per day in selected month"
          icon={Calendar}
          color="emerald"
        />
      </div>

      {/* Visual Analytics Charts */}
      <ReportsCharts
        selectedMonth={selectedMonth}
        categoryFilter={categoryFilter}
        filteredExpenses={filteredExpenses}
      />
    </div>
  );
};
