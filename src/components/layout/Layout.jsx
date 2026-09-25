import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useExpense } from '../../context/ExpenseContext';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Toast } from '../common/Toast';
import { ExpenseModal } from '../expenses/ExpenseModal';

export const Layout = () => {
  const { user } = useExpense();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  // Protect route - if not authenticated, redirect to login page
  if (!user || !user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        <Navbar
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenQuickAdd={() => setQuickAddOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <Toast />

      {/* Quick Add Expense Modal */}
      <ExpenseModal
        isOpen={quickAddOpen}
        onClose={() => setQuickAddOpen(false)}
      />
    </div>
  );
};
