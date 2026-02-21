'use client';

import React from 'react';
import { Play, BookOpen, Swords, GraduationCap } from 'lucide-react';

interface ModeSelectorProps {
  onSelectPlay: () => void;
  onSelectLearn: () => void;
}

export default function ModeSelector({ onSelectPlay, onSelectLearn }: ModeSelectorProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[var(--term-bg)]/95 backdrop-blur-sm">
      <div className="border-2 border-[var(--term-main)] bg-[var(--term-bg)] p-6 md:p-8 max-w-lg w-[90%] shadow-[0_0_30px_rgba(var(--term-main-rgb),0.3)]">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider terminal-text-shadow">
            Gambit
          </h2>
          <p className="text-xs md:text-sm text-[var(--term-dim)] mt-1">
            {`>>> SELECT_MODE`}
          </p>
        </div>

        {/* Mode Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Play Mode */}
          <button
            onClick={onSelectPlay}
            className="group border-2 border-[var(--term-main)] p-4 md:p-6 hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] transition-colors cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--term-main)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--term-bg)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 border border-current">
                <Swords size={24} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold uppercase">Play</h3>
                <span className="text-[10px] text-[var(--term-dim)] group-hover:text-[var(--term-bg)]/70">
                  VS_COMPUTER
                </span>
              </div>
            </div>
            <p className="text-xs md:text-sm text-[var(--term-dim)] group-hover:text-[var(--term-bg)]/80">
              Challenge the engine with adjustable difficulty. Analyze your moves with real-time evaluation.
            </p>
            <div className="mt-3 flex items-center gap-2 text-[10px] uppercase">
              <Play size={12} aria-hidden="true" />
              <span>Start Game</span>
            </div>
          </button>

          {/* Learn Mode */}
          <button
            onClick={onSelectLearn}
            className="group border-2 border-[var(--term-main)] p-4 md:p-6 hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] transition-colors cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--term-main)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--term-bg)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 border border-current">
                <GraduationCap size={24} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold uppercase">Learn</h3>
                <span className="text-[10px] text-[var(--term-dim)] group-hover:text-[var(--term-bg)]/70">
                  INTERACTIVE_COURSES
                </span>
              </div>
            </div>
            <p className="text-xs md:text-sm text-[var(--term-dim)] group-hover:text-[var(--term-bg)]/80">
              Master chess with 7 courses covering openings, tactics, strategy, and endgames.
            </p>
            <div className="mt-3 flex items-center gap-2 text-[10px] uppercase">
              <BookOpen size={12} aria-hidden="true" />
              <span>Browse Courses</span>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-center">
          <div className="border border-[var(--term-dim)] px-4 py-2">
            <p className="text-[10px] text-[var(--term-dim)] whitespace-nowrap">
              │ 76 lessons • 124 puzzles • 7 courses │
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
