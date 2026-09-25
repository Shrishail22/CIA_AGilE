// Initial Dummy Data for Student Expense Manager

export const DEFAULT_USER = {
  id: 'user_101',
  name: 'Alex Morgan',
  email: 'alex.morgan@college.edu',
  phone: '+91 98765 43210',
  college: 'National Institute of Technology',
  course: 'Computer Science & Engineering (B.Tech, 3rd Year)',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  isAuthenticated: true,
  memberSince: 'August 2024'
};

export const DEFAULT_CATEGORIES = [
  {
    id: 'cat_food',
    name: 'Food',
    iconName: 'Utensils',
    color: '#F59E0B', // Amber
    budget: 3500,
    isDefault: true,
    description: 'Canteen, Mess, Restaurants, Snacks & Swiggy/Zomato'
  },
  {
    id: 'cat_travel',
    name: 'Travel',
    iconName: 'Bus',
    color: '#3B82F6', // Blue
    budget: 1500,
    isDefault: true,
    description: 'Bus Pass, Cab/Auto rides, Metro & Fuel'
  },
  {
    id: 'cat_edu',
    name: 'Education',
    iconName: 'BookOpen',
    color: '#4F46E5', // Indigo
    budget: 3000,
    isDefault: true,
    description: 'Textbooks, Stationary, Online Courses & Exam Fees'
  },
  {
    id: 'cat_shop',
    name: 'Shopping',
    iconName: 'ShoppingBag',
    color: '#EC4899', // Pink
    budget: 2500,
    isDefault: true,
    description: 'Clothes, Electronics, Footwear & Accessories'
  },
  {
    id: 'cat_ent',
    name: 'Entertainment',
    iconName: 'Film',
    color: '#8B5CF6', // Purple
    budget: 1500,
    isDefault: true,
    description: 'Movies, Gaming, Concerts, Outings & Subscriptions'
  },
  {
    id: 'cat_health',
    name: 'Health',
    iconName: 'HeartPulse',
    color: '#10B981', // Emerald
    budget: 1500,
    isDefault: true,
    description: 'Medicines, Gym Membership, Doctor Consultations'
  },
  {
    id: 'cat_bills',
    name: 'Bills',
    iconName: 'Receipt',
    color: '#EF4444', // Red
    budget: 1500,
    isDefault: true,
    description: 'Hostel Rent, Wi-Fi, Mobile Recharge, Electricity'
  },
  {
    id: 'cat_other',
    name: 'Other',
    iconName: 'MoreHorizontal',
    color: '#6B7280', // Gray
    budget: 1000,
    isDefault: true,
    description: 'Miscellaneous gifts, emergency expenses & others'
  }
];

// Generate dates relative to current month for realistic rendering
const getRelativeDate = (daysAgo) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

export const DEFAULT_EXPENSES = [
  {
    id: 'exp_01',
    title: 'College Canteen Lunch',
    amount: 120,
    category: 'Food',
    date: getRelativeDate(0), // Today
    paymentMethod: 'UPI',
    description: 'Lunch with friends at main canteen (Thali + Juice)',
    createdAt: new Date(Date.now() - 0 * 86400000).toISOString()
  },
  {
    id: 'exp_02',
    title: 'Monthly Bus Pass',
    amount: 450,
    category: 'Travel',
    date: getRelativeDate(2),
    paymentMethod: 'Cash',
    description: 'Student concession monthly bus pass renewal',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 'exp_03',
    title: 'Algorithms & Data Structures Textbook',
    amount: 850,
    category: 'Education',
    date: getRelativeDate(3),
    paymentMethod: 'Debit Card',
    description: 'Core Reference book for 5th Semester syllabus',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 'exp_04',
    title: 'Wireless Earbuds',
    amount: 1499,
    category: 'Shopping',
    date: getRelativeDate(5),
    paymentMethod: 'UPI',
    description: 'Noise cancelling TWS earbuds for online lectures',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString()
  },
  {
    id: 'exp_05',
    title: 'Movie Night & Popcorn',
    amount: 350,
    category: 'Entertainment',
    date: getRelativeDate(6),
    paymentMethod: 'UPI',
    description: 'Weekend movie ticket with hostel roommates',
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString()
  },
  {
    id: 'exp_06',
    title: 'Hostel Electricity & Wi-Fi Share',
    amount: 600,
    category: 'Bills',
    date: getRelativeDate(7),
    paymentMethod: 'Net Banking',
    description: 'Monthly room maintenance and high-speed Wi-Fi share',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString()
  },
  {
    id: 'exp_07',
    title: 'Swiggy Dinner Order',
    amount: 280,
    category: 'Food',
    date: getRelativeDate(8),
    paymentMethod: 'UPI',
    description: 'Late night study group food delivery',
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString()
  },
  {
    id: 'exp_08',
    title: 'Pharmacy & Multivitamins',
    amount: 340,
    category: 'Health',
    date: getRelativeDate(9),
    paymentMethod: 'Cash',
    description: 'Vitamin C supplements and cold medicines',
    createdAt: new Date(Date.now() - 9 * 86400000).toISOString()
  },
  {
    id: 'exp_09',
    title: 'Notebooks & Project Stationary',
    amount: 180,
    category: 'Education',
    date: getRelativeDate(11),
    paymentMethod: 'Cash',
    description: 'Spiral lab record books, pens, and highlighters',
    createdAt: new Date(Date.now() - 11 * 86400000).toISOString()
  },
  {
    id: 'exp_10',
    title: 'Uber Cab Ride',
    amount: 320,
    category: 'Travel',
    date: getRelativeDate(12),
    paymentMethod: 'UPI',
    description: 'Shared cab to city center for hackathon event',
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString()
  },
  {
    id: 'exp_11',
    title: 'Campus Cafe Coffee & Snacks',
    amount: 95,
    category: 'Food',
    date: getRelativeDate(14),
    paymentMethod: 'UPI',
    description: 'Espresso coffee and sandwich during break',
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString()
  },
  {
    id: 'exp_12',
    title: 'College Cultural Fest Ticket',
    amount: 750,
    category: 'Entertainment',
    date: getRelativeDate(15),
    paymentMethod: 'UPI',
    description: 'Pro-night concert pass for annual cultural fest',
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString()
  },
  {
    id: 'exp_13',
    title: 'Denim Jacket',
    amount: 1200,
    category: 'Shopping',
    date: getRelativeDate(17),
    paymentMethod: 'Credit Card',
    description: 'Winter season jacket from end-of-season sale',
    createdAt: new Date(Date.now() - 17 * 86400000).toISOString()
  },
  {
    id: 'exp_14',
    title: 'Room Grocery Supplies',
    amount: 420,
    category: 'Food',
    date: getRelativeDate(19),
    paymentMethod: 'Cash',
    description: 'Milk, oats, fruits, and instant noodles',
    createdAt: new Date(Date.now() - 19 * 86400000).toISOString()
  },
  {
    id: 'exp_15',
    title: 'Mobile Recharge Plan (84 Days)',
    amount: 299,
    category: 'Bills',
    date: getRelativeDate(21),
    paymentMethod: 'UPI',
    description: 'Unlimited calling & 2GB/day 5G data pack',
    createdAt: new Date(Date.now() - 21 * 86400000).toISOString()
  },
  {
    id: 'exp_16',
    title: 'React & Frontend Masterclass',
    amount: 1199,
    category: 'Education',
    date: getRelativeDate(23),
    paymentMethod: 'Debit Card',
    description: 'Udemy certified online course for skill upgrade',
    createdAt: new Date(Date.now() - 23 * 86400000).toISOString()
  },
  {
    id: 'exp_17',
    title: 'Campus Gym Monthly Pass',
    amount: 800,
    category: 'Health',
    date: getRelativeDate(25),
    paymentMethod: 'UPI',
    description: 'Monthly access pass for university fitness center',
    createdAt: new Date(Date.now() - 25 * 86400000).toISOString()
  },
  {
    id: 'exp_18',
    title: "Friend's Birthday Gift",
    amount: 500,
    category: 'Other',
    date: getRelativeDate(27),
    paymentMethod: 'UPI',
    description: 'Personalized desk lamp & card gift share',
    createdAt: new Date(Date.now() - 27 * 86400000).toISOString()
  }
];

export const DEFAULT_BUDGET = {
  monthlyTotal: 15000,
  categoryBudgets: {
    Food: 3500,
    Travel: 1500,
    Education: 3000,
    Shopping: 2500,
    Entertainment: 1500,
    Health: 1500,
    Bills: 1500,
    Other: 1000
  }
};

export const DEFAULT_SETTINGS = {
  currency: '₹',
  theme: 'light',
  notificationsEnabled: true,
  emailAlerts: false
};
