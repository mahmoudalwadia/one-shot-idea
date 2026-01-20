'use client';

import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  showPercentage = false,
  size = 'md',
  variant = 'default',
}) => {
  const [isModernTheme, setIsModernTheme] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsModernTheme(document.body.classList.contains('theme-modern'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variantColors = {
    default: isModernTheme ? 'bg-[#81b64c]' : 'bg-[var(--term-main)]',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
  };

  const trackColor = isModernTheme ? 'bg-[#3d3a37]' : 'bg-[var(--term-dim)]';

  return (
    <div className="w-full">
      {/* Label and percentage */}
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className={`text-xs ${isModernTheme ? 'text-[#bababa]' : 'text-[var(--term-main)]'}`}>
              {label}
            </span>
          )}
          {showPercentage && (
            <span className={`text-xs ${isModernTheme ? 'text-[#8b8987]' : 'text-[var(--term-dim)]'}`}>
              {percentage}%
            </span>
          )}
        </div>
      )}

      {/* Progress bar track */}
      <div className={`w-full ${sizeClasses[size]} ${trackColor} rounded-full overflow-hidden`}>
        <div
          className={`h-full ${variantColors[variant]} transition-all duration-300 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Fraction display */}
      {total > 0 && !showPercentage && (
        <div className={`text-xs mt-1 text-right ${isModernTheme ? 'text-[#8b8987]' : 'text-[var(--term-dim)]'}`}>
          {current} / {total}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
