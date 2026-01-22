'use client';

import React from 'react';

interface ChessLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ChessLogo({ size = 'md', className = '' }: ChessLogoProps) {
  // Size mappings for the grid
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div
      className={`${sizes[size]} grid grid-cols-4 grid-rows-4 border border-current ${className}`}
      style={{
        fontSize: 0,
        lineHeight: 0,
      }}
      aria-label="Chess board logo"
    >
      {/* 4x4 checkerboard pattern */}
      {Array.from({ length: 16 }).map((_, i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        const isLight = (row + col) % 2 === 0;
        return (
          <div
            key={i}
            className={isLight ? 'bg-current' : 'bg-transparent'}
          />
        );
      })}
    </div>
  );
}
