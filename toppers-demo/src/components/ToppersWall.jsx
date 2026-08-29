import React, { useState, useMemo } from 'react';
import { toppersData } from '../data/toppersData';

export default function ToppersWall() {
  const [activeTab, setActiveTab] = useState('SSLC');
  const [search, setSearch] = useState('');

  const currentList = useMemo(() => {
    const list = activeTab === 'SSLC' ? toppersData.sslcToppers : toppersData.cbseToppers;
    if (!search.trim()) return list;
    return list.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.score.includes(search));
  }, [activeTab, search]);

  return (
    <section className="py-16 bg-blue-50/50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badges */}
        <div className="text-center mb-8">
          <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Academic Year {toppersData.academicYear} • {toppersData.stats.resultRate}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            {toppersData.tagline}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {toppersData.subtitle}
          </p>
        </div>

        {/* Board Category Toggle Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('SSLC')}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
              activeTab === 'SSLC' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            SSLC Toppers ({toppersData.sslcToppers.length})
          </button>
          <button
            onClick={() => setActiveTab('CBSE')}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
              activeTab === 'CBSE' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            CBSE Toppers ({toppersData.cbseToppers.length})
          </button>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search student by name or marks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {currentList.map((student, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-between"
            >
              {/* Badge */}
              {student.badge && (
                <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-full mb-2">
                  {student.badge}
                </span>
              )}

              {/* Avatar Placeholder */}
              <div className="w-20 h-24 mb-3 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center">
                <span className="text-xl font-black text-slate-400">
                  {student.name.charAt(0)}
                </span>
              </div>

              {/* Student Name */}
              <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate w-full">
                {student.name}
              </h3>

              {/* Score Tag */}
              <span className="mt-1 text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-full">
                {student.score}
              </span>

              {/* Special Note */}
              {student.note && (
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-2 leading-tight bg-emerald-50 dark:bg-emerald-950/60 p-1 rounded">
                  {student.note}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
