import React from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { User, Mail, Phone, GraduationCap, BookOpen, Calendar, Edit2 } from 'lucide-react';

export const ProfileCard = ({ onEditProfile }) => {
  const { user } = useExpense();

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 card-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-indigo-600/30 border-2 border-white">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">{user?.name || 'Student Name'}</h3>
              <p className="text-xs font-medium text-indigo-600">{user?.course || 'Undergraduate Student'}</p>
              <span className="inline-block mt-1 text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold">
                Member since {user?.memberSince || 'August 2024'}
              </span>
            </div>
          </div>

          <button
            onClick={onEditProfile}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit Profile
          </button>
        </div>

        {/* Profile Info Grid */}
        <div className="space-y-3 border-t border-slate-100 pt-4 text-xs">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/70">
            <Mail className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-slate-400 font-medium block text-[10px] uppercase">Email Address</span>
              <span className="font-semibold text-slate-800">{user?.email || 'N/A'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/70">
            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-slate-400 font-medium block text-[10px] uppercase">Phone Number</span>
              <span className="font-semibold text-slate-800">{user?.phone || 'Not set'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/70">
            <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-slate-400 font-medium block text-[10px] uppercase">College / Institution</span>
              <span className="font-semibold text-slate-800">{user?.college || 'N/A'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/70">
            <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-slate-400 font-medium block text-[10px] uppercase">Degree / Specialization</span>
              <span className="font-semibold text-slate-800">{user?.course || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
