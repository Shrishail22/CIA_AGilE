import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useExpense } from '../../context/ExpenseContext';
import { calculateCategoryTotals } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { PieChart as PieIcon } from 'lucide-react';

export const CategoryChart = () => {
  const { expenses, categories, settings } = useExpense();
  const totals = calculateCategoryTotals(expenses);

  const data = categories
    .map(cat => ({
      name: cat.name,
      value: totals[cat.name] || 0,
      color: cat.color
    }))
    .filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value, payload: itemData } = payload[0];
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs">
          <p className="font-semibold text-slate-300 mb-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: itemData.color }} />
            {name}
          </p>
          <p className="font-bold text-white text-sm">
            {formatCurrency(value, settings.currency)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 card-shadow flex flex-col justify-between">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <PieIcon className="w-5 h-5 text-purple-600" />
          Category Breakdown
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Distribution of expenses by category</p>
      </div>

      <div className="h-64 sm:h-72 w-full flex items-center justify-center">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-xs text-slate-400">No category data to display</p>
        )}
      </div>
    </div>
  );
};
