import React from 'react';

export const MineIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="black" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path stroke="white" strokeWidth="2" d="M12 5v4M12 15v4M5 12h4M15 12h4M7.05 7.05l2.83 2.83M14.12 14.12l2.83 2.83M7.05 16.95l2.83-2.83M14.12 9.88l2.83-2.83" />
    <rect x="10" y="10" width="4" height="4" fill="white" opacity="0.3"/>
  </svg>
);

export const FlagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="red" className={className}>
    <path d="M5 21v-2h2v-7h11.5l-2.5-4.5 2.5-4.5H7V2H5v19z" />
  </svg>
);

export const QuestionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className}>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const ShovelIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M14.7 9.3l-2-2a1 1 0 00-1.4 0l-7 7a1 1 0 000 1.4l2 2a1 1 0 001.4 0l7-7a1 1 0 000-1.4z" />
    <path d="M15.4 8.6l1.3-1.3a2 2 0 012.8 0l1.4 1.4a2 2 0 010 2.8l-1.3 1.3" />
    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M8 16l-3 3" />
  </svg>
);
