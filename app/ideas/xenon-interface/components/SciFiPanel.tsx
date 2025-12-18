'use client';

import React from 'react';

interface SciFiPanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  borderColor?: 'cyan' | 'amber' | 'rose' | 'slate';
  noPadding?: boolean;
}

export const SciFiPanel: React.FC<SciFiPanelProps> = ({
  children,
  className = '',
  title,
  borderColor = 'cyan',
  noPadding = false
}) => {
  const borderClass = {
    cyan: 'border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.05)]',
    amber: 'border-amber-500/30 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.05)]',
    rose: 'border-rose-500/30 text-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.05)]',
    slate: 'border-slate-700 text-slate-400',
  }[borderColor];

  // Using a very dark semi-transparent background to allow for global layered effects if needed
  const bgClass = {
    cyan: 'bg-[#050b14]/90',
    amber: 'bg-[#080500]/90',
    rose: 'bg-[#0a0202]/90',
    slate: 'bg-[#020202]/90',
  }[borderColor];

  return (
    <div className={`relative border ${borderClass} ${bgClass} flex flex-col ${className}`}>
      {/* Corner Brackets - Style Match */}
      <div className={`absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l ${borderClass} border-opacity-100`}></div>
      <div className={`absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t border-r ${borderClass} border-opacity-100`}></div>
      <div className={`absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b border-l ${borderClass} border-opacity-100`}></div>
      <div className={`absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r ${borderClass} border-opacity-100`}></div>

      {/* Header Line */}
      {title && (
        <div className="flex items-center gap-1 sm:gap-2 px-1 py-0.5 border-b border-inherit bg-black/40 shrink-0 z-10">
          <div className={`w-0.5 h-0.5 sm:w-1 sm:h-1 ${borderColor === 'cyan' ? 'bg-cyan-500' : borderColor === 'amber' ? 'bg-amber-500' : borderColor === 'rose' ? 'bg-rose-500' : 'bg-slate-500'}`}></div>
          <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-bold opacity-80 truncate">{title}</span>
          <div className="flex-1"></div>
          <div className="flex gap-0.5">
             <div className="w-0.5 h-0.5 bg-current opacity-50"></div>
             <div className="w-0.5 h-0.5 bg-current opacity-50"></div>
             <div className="w-0.5 h-0.5 bg-current opacity-50"></div>
          </div>
        </div>
      )}

      <div className={`flex-1 overflow-hidden relative ${noPadding ? '' : 'p-2'}`}>
        {children}
      </div>
    </div>
  );
};
