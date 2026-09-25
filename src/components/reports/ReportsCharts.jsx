import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { useExpense } from '../../context/ExpenseContext';
import {
  getMonthlyChartData,
  getDailyChartData,
  calculateCategoryTotals
} from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { BarChart3, LineChart as LineIcon, PieChart as PieIcon } from 'lucide-react';

export const ReportsCharts = ({ selectedMonth, categoryFilter, filteredExpenses }) => {
  const { categories, settings } = useExpense();

  const monthlyBarData = getMonthlyChartData(filteredExpenses);
  const dailyLineData = getDailyChartData(filteredExpenses, selectedMonth);

  const catTotals = calculateCategoryTotals(filteredExpenses);
  const pieData = categories
    .map(c => ({
      name: c.name,
      value: catTotals[c.name] || 0,
      color: c.color
    }))
    .filter(d => d.value > 0);

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
    <div className="space-y-6">
      {/* 2-Column Row: Monthly Bar & Category Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Expense Bar Chart */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 card-shadow">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Monthly Comparison (6 Months)
            </h3>
            <p className="text-xs text-slate-500">Historical spending trend per month</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="monthName" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="total" fill="#4F46E5" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie / Donut Chart */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 card-shadow">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-purple-600" />
              Category Breakdown (Filtered)
            </h3>
            <p className="text-xs text-slate-500">Share of spending by category</p>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={32}
                    iconType="circle"
                    wrapperStyle={{ fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs text-slate-400">No category breakdown available</p>
            )}
          </div>
        </div>
      </div>

      {/* Daily Expense Line Chart */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 card-shadow">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <LineIcon className="w-5 h-5 text-emerald-600" />
            Daily Expense Trend ({selectedMonth || 'Current Month'})
          </h3>
          <p className="text-xs text-slate-500">Day-by-day expense fluctuation across the selected month</p>
        </div>
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyLineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 3, fill: '#10B981' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
