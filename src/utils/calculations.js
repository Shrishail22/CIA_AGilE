// Calculations utility for Student Expense Manager

export const calculateTotalExpenses = (expenses = []) => {
  return expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
};

export const filterExpensesByMonth = (expenses = [], yearMonthStr) => {
  // yearMonthStr: '2026-09' or Date object / current month default
  const target = yearMonthStr || new Date().toISOString().slice(0, 7);
  return expenses.filter(exp => exp.date && exp.date.startsWith(target));
};

export const calculateMonthlyExpenses = (expenses = [], yearMonthStr) => {
  const monthlyList = filterExpensesByMonth(expenses, yearMonthStr);
  return calculateTotalExpenses(monthlyList);
};

export const calculateCategoryTotals = (expenses = []) => {
  const totals = {};
  expenses.forEach(exp => {
    const cat = exp.category || 'Other';
    totals[cat] = (totals[cat] || 0) + Number(exp.amount || 0);
  });
  return totals;
};

export const calculateCategoryCounts = (expenses = []) => {
  const counts = {};
  expenses.forEach(exp => {
    const cat = exp.category || 'Other';
    counts[cat] = (counts[cat] || 0) + 1;
  });
  return counts;
};

export const getHighestSpendingCategory = (expenses = []) => {
  const totals = calculateCategoryTotals(expenses);
  let highestCat = 'N/A';
  let maxVal = 0;
  Object.entries(totals).forEach(([cat, val]) => {
    if (val > maxVal) {
      maxVal = val;
      highestCat = cat;
    }
  });
  return { category: highestCat, amount: maxVal };
};

export const getHighestExpense = (expenses = []) => {
  if (!expenses.length) return null;
  return expenses.reduce((max, exp) => (Number(exp.amount) > Number(max.amount) ? exp : max), expenses[0]);
};

export const calculateAverageDailySpending = (expenses = [], yearMonthStr) => {
  const monthlyList = filterExpensesByMonth(expenses, yearMonthStr);
  const total = calculateTotalExpenses(monthlyList);
  const daysInMonth = new Date().getDate(); // Or days passed so far in current month
  return daysInMonth > 0 ? (total / daysInMonth).toFixed(2) : 0;
};

export const getMonthlyChartData = (expenses = []) => {
  // Aggregate expenses by YYYY-MM for the last 6 months
  const monthlyMap = {};
  const today = new Date();
  
  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const key = d.toLocaleString('default', { month: 'short' });
    const fullKey = d.toISOString().slice(0, 7);
    monthlyMap[fullKey] = { monthName: key, total: 0, fullKey };
  }

  expenses.forEach(exp => {
    if (exp.date) {
      const monthKey = exp.date.slice(0, 7);
      if (monthlyMap[monthKey]) {
        monthlyMap[monthKey].total += Number(exp.amount || 0);
      }
    }
  });

  return Object.values(monthlyMap);
};

export const getDailyChartData = (expenses = [], yearMonthStr) => {
  const monthlyList = filterExpensesByMonth(expenses, yearMonthStr);
  const daysMap = {};
  
  // Get days in the given month
  const targetDate = yearMonthStr ? new Date(yearMonthStr + '-01') : new Date();
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const daysCount = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= daysCount; d++) {
    const dayStr = d < 10 ? `0${d}` : `${d}`;
    daysMap[dayStr] = 0;
  }

  monthlyList.forEach(exp => {
    if (exp.date) {
      const day = exp.date.split('-')[2];
      if (daysMap[day] !== undefined) {
        daysMap[day] += Number(exp.amount || 0);
      }
    }
  });

  return Object.entries(daysMap).map(([day, amount]) => ({
    day: `Day ${parseInt(day, 10)}`,
    amount
  }));
};
