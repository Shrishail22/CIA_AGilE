import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getStoredUser,
  setStoredUser,
  getStoredExpenses,
  setStoredExpenses,
  getStoredCategories,
  setStoredCategories,
  getStoredBudget,
  setStoredBudget,
  getStoredSettings,
  setStoredSettings,
  clearAllData as clearStorage
} from '../utils/storage';
import { DEFAULT_USER, DEFAULT_EXPENSES, DEFAULT_CATEGORIES, DEFAULT_BUDGET, DEFAULT_SETTINGS } from '../data/dummyData';

const ExpenseContext = createContext(null);

export const ExpenseProvider = ({ children }) => {
  const [user, setUserState] = useState(getStoredUser);
  const [expenses, setExpensesState] = useState(getStoredExpenses);
  const [categories, setCategoriesState] = useState(getStoredCategories);
  const [budget, setBudgetState] = useState(getStoredBudget);
  const [settings, setSettingsState] = useState(getStoredSettings);
  const [toasts, setToasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Save changes to LocalStorage whenever state updates
  useEffect(() => {
    setStoredUser(user);
  }, [user]);

  useEffect(() => {
    setStoredExpenses(expenses);
  }, [expenses]);

  useEffect(() => {
    setStoredCategories(categories);
  }, [categories]);

  useEffect(() => {
    setStoredBudget(budget);
  }, [budget]);

  useEffect(() => {
    setStoredSettings(settings);
  }, [settings]);

  // Toast System
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Auth Operations
  const login = (email, password) => {
    // Dummy validation
    if (!email || !password) {
      showToast('Please fill in all fields', 'error');
      return false;
    }
    const updatedUser = {
      ...user,
      email: email,
      name: user.name || email.split('@')[0],
      isAuthenticated: true
    };
    setUserState(updatedUser);
    showToast('Welcome back! Successfully logged in.', 'success');
    return true;
  };

  const register = (userData) => {
    const newUser = {
      id: 'user_' + Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      college: userData.college || 'College of Engineering',
      course: userData.course || 'B.Tech CS',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isAuthenticated: true,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    setUserState(newUser);
    showToast('Account created successfully! Welcome to Student Expense Manager.', 'success');
    return true;
  };

  const logout = () => {
    setUserState(prev => ({ ...prev, isAuthenticated: false }));
    showToast('Logged out successfully.', 'info');
  };

  const updateProfile = (updatedData) => {
    setUserState(prev => ({ ...prev, ...updatedData }));
    showToast('Profile updated successfully!', 'success');
  };

  // Expense CRUD Operations
  const addExpense = (expenseData) => {
    const newExpense = {
      id: 'exp_' + Date.now(),
      title: expenseData.title,
      amount: Number(expenseData.amount),
      category: expenseData.category,
      date: expenseData.date || new Date().toISOString().split('T')[0],
      paymentMethod: expenseData.paymentMethod || 'UPI',
      description: expenseData.description || '',
      createdAt: new Date().toISOString()
    };
    setExpensesState(prev => [newExpense, ...prev]);
    showToast(`Added expense "${newExpense.title}" of ${settings.currency}${newExpense.amount}`, 'success');
  };

  const editExpense = (id, updatedData) => {
    setExpensesState(prev =>
      prev.map(exp => (exp.id === id ? { ...exp, ...updatedData, amount: Number(updatedData.amount) } : exp))
    );
    showToast('Expense updated successfully!', 'success');
  };

  const deleteExpense = (id) => {
    const expToDelete = expenses.find(e => e.id === id);
    setExpensesState(prev => prev.filter(exp => exp.id !== id));
    showToast(`Deleted expense "${expToDelete?.title || 'Item'}"`, 'info');
  };

  // Category CRUD Operations
  const addCategory = (categoryData) => {
    const exists = categories.some(
      c => c.name.toLowerCase() === categoryData.name.trim().toLowerCase()
    );
    if (exists) {
      showToast(`Category "${categoryData.name}" already exists!`, 'error');
      return false;
    }
    const newCat = {
      id: 'cat_' + Date.now(),
      name: categoryData.name.trim(),
      iconName: categoryData.iconName || 'Tag',
      color: categoryData.color || '#4F46E5',
      budget: Number(categoryData.budget) || 1000,
      isDefault: false,
      description: categoryData.description || 'Custom category'
    };
    setCategoriesState(prev => [...prev, newCat]);
    
    // Also update budget state for new category
    setBudgetState(prev => ({
      ...prev,
      categoryBudgets: {
        ...prev.categoryBudgets,
        [newCat.name]: newCat.budget
      }
    }));

    showToast(`Category "${newCat.name}" created!`, 'success');
    return true;
  };

  const editCategory = (id, updatedData) => {
    const oldCat = categories.find(c => c.id === id);
    const oldName = oldCat?.name;

    setCategoriesState(prev =>
      prev.map(cat => (cat.id === id ? { ...cat, ...updatedData } : cat))
    );

    // If category name changed, update expenses and budget keys accordingly
    if (oldName && updatedData.name && oldName !== updatedData.name) {
      setExpensesState(prev =>
        prev.map(exp => (exp.category === oldName ? { ...exp, category: updatedData.name } : exp))
      );
      setBudgetState(prev => {
        const catBudgets = { ...prev.categoryBudgets };
        const oldBudgetVal = catBudgets[oldName] || updatedData.budget || 1000;
        delete catBudgets[oldName];
        catBudgets[updatedData.name] = updatedData.budget || oldBudgetVal;
        return { ...prev, categoryBudgets: catBudgets };
      });
    }

    showToast('Category updated successfully!', 'success');
  };

  const deleteCategory = (id, forceDelete = false) => {
    const catToDelete = categories.find(c => c.id === id);
    if (!catToDelete) return;

    // Check if category is used by any expense
    const inUseCount = expenses.filter(e => e.category === catToDelete.name).length;
    if (inUseCount > 0 && !forceDelete) {
      return { inUse: true, count: inUseCount, categoryName: catToDelete.name };
    }

    // Reassign affected expenses to 'Other' if force deleted
    if (inUseCount > 0 && forceDelete) {
      setExpensesState(prev =>
        prev.map(exp => (exp.category === catToDelete.name ? { ...exp, category: 'Other' } : exp))
      );
    }

    setCategoriesState(prev => prev.filter(c => c.id !== id));
    
    // Remove from category budgets
    setBudgetState(prev => {
      const catBudgets = { ...prev.categoryBudgets };
      delete catBudgets[catToDelete.name];
      return { ...prev, categoryBudgets: catBudgets };
    });

    showToast(`Category "${catToDelete.name}" deleted.`, 'info');
    return { inUse: false };
  };

  // Budget Operations
  const updateOverallBudget = (amount) => {
    setBudgetState(prev => ({
      ...prev,
      monthlyTotal: Number(amount)
    }));
    showToast(`Monthly overall budget set to ${settings.currency}${amount}`, 'success');
  };

  const updateCategoryBudget = (categoryName, amount) => {
    setBudgetState(prev => ({
      ...prev,
      categoryBudgets: {
        ...prev.categoryBudgets,
        [categoryName]: Number(amount)
      }
    }));
    
    // Also update budget property in categories array
    setCategoriesState(prev =>
      prev.map(c => (c.name === categoryName ? { ...c, budget: Number(amount) } : c))
    );

    showToast(`Budget for "${categoryName}" set to ${settings.currency}${amount}`, 'success');
  };

  // Settings
  const updateSettings = (newSettings) => {
    setSettingsState(prev => ({ ...prev, ...newSettings }));
    showToast('Settings saved!', 'success');
  };

  // Reset to default sample data
  const resetToDefaults = () => {
    clearStorage();
    setUserState(DEFAULT_USER);
    setExpensesState(DEFAULT_EXPENSES);
    setCategoriesState(DEFAULT_CATEGORIES);
    setBudgetState(DEFAULT_BUDGET);
    setSettingsState(DEFAULT_SETTINGS);
    showToast('Application reset to initial sample data.', 'info');
  };

  return (
    <ExpenseContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        expenses,
        addExpense,
        editExpense,
        deleteExpense,
        categories,
        addCategory,
        editCategory,
        deleteCategory,
        budget,
        updateOverallBudget,
        updateCategoryBudget,
        settings,
        updateSettings,
        toasts,
        showToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        resetToDefaults
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};
