import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { useExpense } from '../../context/ExpenseContext';
import { getMonthlyChartData } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { TrendingUp } from 'lucide-react';

export const ExpenseOverviewChart = () => {
  const { expenses, settings } = useExpense();
  const data = getMonthlyChartData(expenses);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs">
          <p className="font-semibold text-slate-300 mb-1">{label}</p>
          <p className="font-bold text-indigo-400 text-sm">
            {formatCurrency(payload[0].value, settings.currency)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            Monthly Expense Overview
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Spending trend over the last 6 months</p>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="monthName" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="total" fill="#4F46E5" radius={[8, 8, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
