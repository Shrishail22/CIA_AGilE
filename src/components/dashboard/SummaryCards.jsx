import React from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { StatCard } from '../common/StatCard';
import {
  calculateTotalExpenses,
  calculateMonthlyExpenses
} from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { Wallet, Calendar, PiggyBank, Receipt } from 'lucide-react';

export const SummaryCards = () => {
  const { expenses, budget, settings } = useExpense();

  const totalAllTime = calculateTotalExpenses(expenses);
  const monthlyTotal = calculateMonthlyExpenses(expenses);
  const monthlyBudget = budget.monthlyTotal || 15000;
  const remainingBudget = monthlyBudget - monthlyTotal;
  const totalCount = expenses.length;

  const budgetUsagePercent = Math.round((monthlyTotal / monthlyBudget) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
      <StatCard
        title="Total Expenses"
        value={formatCurrency(totalAllTime, settings.currency)}
        subtext={`Across all ${totalCount} transactions`}
        icon={Wallet}
        color="indigo"
      />

      <StatCard
        title="Monthly Expenses"
        value={formatCurrency(monthlyTotal, settings.currency)}
        subtext={`For current month (${budgetUsagePercent}% of budget)`}
        icon={Calendar}
        color="violet"
        badgeText={`${budgetUsagePercent}%`}
        badgeColor={budgetUsagePercent > 100 ? 'rose' : 'emerald'}
      />

      <StatCard
        title="Monthly Budget"
        value={formatCurrency(monthlyBudget, settings.currency)}
        subtext="Set overall spending limit"
        icon={PiggyBank}
        color="blue"
      />

      <StatCard
        title="Remaining Budget"
        value={formatCurrency(remainingBudget, settings.currency)}
        subtext={remainingBudget < 0 ? 'Over budget alert!' : 'Available to spend'}
        icon={Receipt}
        color={remainingBudget < 0 ? 'rose' : 'emerald'}
        badgeText={remainingBudget < 0 ? 'Exceeded' : 'Safe'}
        badgeColor={remainingBudget < 0 ? 'rose' : 'emerald'}
      />
    </div>
  );
};
