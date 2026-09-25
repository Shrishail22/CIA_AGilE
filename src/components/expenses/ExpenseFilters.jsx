import React from 'react';
import { Search, Filter, Calendar, ArrowUpDown, X } from 'lucide-react';

export const ExpenseFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  dateFilter,
  setDateFilter,
  sortBy,
  setSortBy,
  categories,
  onReset
}) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 card-shadow space-y-4 mb-6">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 bg-slate-50 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:border-indigo-500 focus:outline-none transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {/* Category Filter */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 text-xs sm:text-sm text-slate-700 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Month / Date Filter */}
          <div className="relative">
            <input
              type="month"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 text-xs sm:text-sm text-slate-700 rounded-xl focus:outline-none cursor-pointer"
            />
          </div>

          {/* Sort By */}
          <div className="relative col-span-2 sm:col-span-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 text-xs sm:text-sm text-slate-700 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Amount: High to Low</option>
              <option value="amount-asc">Amount: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Badges */}
      {(search || category !== 'ALL' || dateFilter || sortBy !== 'date-desc') && (
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 font-medium">Active Filters:</span>
            {category !== 'ALL' && (
              <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                Category: {category}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setCategory('ALL')} />
              </span>
            )}
            {dateFilter && (
              <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                Month: {dateFilter}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setDateFilter('')} />
              </span>
            )}
            {search && (
              <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                Query: "{search}"
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearch('')} />
              </span>
            )}
          </div>
          <button
            onClick={onReset}
            className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};
