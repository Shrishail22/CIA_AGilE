import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useExpense } from '../../context/ExpenseContext';
import {
  Menu,
  Search,
  Bell,
  User,
  AlertCircle,
  X,
  PlusCircle,
  CheckCircle
} from 'lucide-react';
import { calculateMonthlyExpenses } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';

export const Navbar = ({ onOpenSidebar, onOpenQuickAdd }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, searchQuery, setSearchQuery, expenses, budget, settings } = useExpense();
  const [showNotifications, setShowNotifications] = useState(false);

  // Dynamic Page Title mapping
  const getPageTitle = (path) => {
    switch (path) {
      case '/dashboard': return 'Dashboard Overview';
      case '/expenses': return 'Expense Management';
      case '/categories': return 'Category Management';
      case '/budget': return 'Budget Planning';
      case '/reports': return 'Reports & Analytics';
      case '/profile': return 'Profile & Settings';
      default: return 'Student Expense Manager';
    }
  };

  // Calculate live notification alerts
  const monthlyTotal = calculateMonthlyExpenses(expenses);
  const budgetLimit = budget.monthlyTotal || 15000;
  const percentage = Math.round((monthlyTotal / budgetLimit) * 100);

  const notifications = [];
  if (percentage >= 100) {
    notifications.push({
      id: 1,
      title: 'Monthly Budget Exceeded!',
      message: `You spent ${formatCurrency(monthlyTotal, settings.currency)} against your budget limit of ${formatCurrency(budgetLimit, settings.currency)}.`,
      type: 'danger'
    });
  } else if (percentage >= 80) {
    notifications.push({
      id: 2,
      title: 'Approaching Monthly Budget Limit',
      message: `You have reached ${percentage}% of your ${formatCurrency(budgetLimit, settings.currency)} monthly budget.`,
      type: 'warning'
    });
  }

  // Add standard recent activity notification
  notifications.push({
    id: 3,
    title: 'Semester Budget Active',
    message: 'Your transactions are being logged and saved locally in real-time.',
    type: 'info'
  });

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
            {getPageTitle(location.pathname)}
          </h2>
          <p className="hidden sm:block text-xs text-slate-500 font-medium">
            Welcome back, {user?.name || 'Student'} 👋
          </p>
        </div>
      </div>

      {/* Middle & Right Actions */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Global Search Bar */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-xl border border-transparent focus:border-indigo-500 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Add Expense Button */}
        <button
          onClick={onOpenQuickAdd}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Add Expense</span>
        </button>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {notifications.some(n => n.type === 'danger' || n.type === 'warning') && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown Modal */}
          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-modal">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-800">Notifications</h4>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">
                    {notifications.length} New
                  </span>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.map(item => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-3 ${
                        item.type === 'danger'
                          ? 'bg-rose-50 border-rose-100 text-rose-800'
                          : item.type === 'warning'
                          ? 'bg-amber-50 border-amber-100 text-amber-800'
                          : 'bg-slate-50 border-slate-100 text-slate-700'
                      }`}
                    >
                      {item.type === 'danger' ? (
                        <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      ) : item.type === 'warning' ? (
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-bold mb-0.5">{item.title}</p>
                        <p className="text-slate-600">{item.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile Quick Avatar */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
          </div>
          <span className="hidden md:inline text-xs font-semibold text-slate-700">
            {user?.name?.split(' ')[0] || 'Student'}
          </span>
        </button>
      </div>
    </header>
  );
};
