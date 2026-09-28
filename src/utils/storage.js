import {
  DEFAULT_USER,
  DEFAULT_EXPENSES,
  DEFAULT_CATEGORIES,
  DEFAULT_BUDGET,
  DEFAULT_SETTINGS
} from '../data/dummyData';

const KEYS = {
  USER: 'sem_user_data_v2',
  EXPENSES: 'sem_expenses_data_v2',
  CATEGORIES: 'sem_categories_data_v2',
  BUDGET: 'sem_budget_data_v2',
  SETTINGS: 'sem_settings_data_v2'
};

export const getStoredUser = () => {
  try {
    const item = localStorage.getItem(KEYS.USER);
    return item ? JSON.parse(item) : DEFAULT_USER;
  } catch (e) {
    console.error('Error reading user from localStorage', e);
    return DEFAULT_USER;
  }
};

export const setStoredUser = (user) => {
  try {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  } catch (e) {
    console.error('Error saving user to localStorage', e);
  }
};

export const getStoredExpenses = () => {
  try {
    const item = localStorage.getItem(KEYS.EXPENSES);
    return item ? JSON.parse(item) : DEFAULT_EXPENSES;
  } catch (e) {
    console.error('Error reading expenses from localStorage', e);
    return DEFAULT_EXPENSES;
  }
};

export const setStoredExpenses = (expenses) => {
  try {
    localStorage.setItem(KEYS.EXPENSES, JSON.stringify(expenses));
  } catch (e) {
    console.error('Error saving expenses to localStorage', e);
  }
};

export const getStoredCategories = () => {
  try {
    const item = localStorage.getItem(KEYS.CATEGORIES);
    return item ? JSON.parse(item) : DEFAULT_CATEGORIES;
  } catch (e) {
    console.error('Error reading categories from localStorage', e);
    return DEFAULT_CATEGORIES;
  }
};

export const setStoredCategories = (categories) => {
  try {
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (e) {
    console.error('Error saving categories to localStorage', e);
  }
};

export const getStoredBudget = () => {
  try {
    const item = localStorage.getItem(KEYS.BUDGET);
    return item ? JSON.parse(item) : DEFAULT_BUDGET;
  } catch (e) {
    console.error('Error reading budget from localStorage', e);
    return DEFAULT_BUDGET;
  }
};

export const setStoredBudget = (budget) => {
  try {
    localStorage.setItem(KEYS.BUDGET, JSON.stringify(budget));
  } catch (e) {
    console.error('Error saving budget to localStorage', e);
  }
};

export const getStoredSettings = () => {
  try {
    const item = localStorage.getItem(KEYS.SETTINGS);
    return item ? JSON.parse(item) : DEFAULT_SETTINGS;
  } catch (e) {
    console.error('Error reading settings from localStorage', e);
    return DEFAULT_SETTINGS;
  }
};

export const setStoredSettings = (settings) => {
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings to localStorage', e);
  }
};

export const clearAllData = () => {
  localStorage.removeItem(KEYS.USER);
  localStorage.removeItem(KEYS.EXPENSES);
  localStorage.removeItem(KEYS.CATEGORIES);
  localStorage.removeItem(KEYS.BUDGET);
  localStorage.removeItem(KEYS.SETTINGS);
};
