import React from 'react';

export const StatCard = ({ title, value, subtext, icon: Icon, color = 'indigo', badgeText, badgeColor = 'emerald' }) => {
  const colorMap = {
    indigo: { bg: 'bg-indigo-50 text-indigo-600 border-indigo-100', accent: 'from-indigo-500 to-indigo-600' },
    violet: { bg: 'bg-purple-50 text-purple-600 border-purple-100', accent: 'from-purple-500 to-purple-600' },
    emerald: { bg: 'bg-emerald-50 text-emerald-600 border-emerald-100', accent: 'from-emerald-500 to-emerald-600' },
    amber: { bg: 'bg-amber-50 text-amber-600 border-amber-100', accent: 'from-amber-500 to-amber-600' },
    rose: { bg: 'bg-rose-50 text-rose-600 border-rose-100', accent: 'from-rose-500 to-rose-600' },
    blue: { bg: 'bg-blue-50 text-blue-600 border-blue-100', accent: 'from-blue-500 to-blue-600' }
  };

  const selected = colorMap[color] || colorMap.indigo;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 card-shadow card-shadow-hover relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">{title}</span>
        <div className={`p-3 rounded-xl border ${selected.bg}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h3>
          {badgeText && (
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${badgeColor === 'emerald' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {badgeText}
            </span>
          )}
        </div>
        {subtext && <p className="text-xs text-slate-500 mt-1.5">{subtext}</p>}
      </div>
    </div>
  );
};
