
import React from 'react';
import { Clock as ClockIcon, Infinity as InfinityIcon } from 'lucide-react';

interface ClockProps {
  timeMs: number;
  isActive: boolean;
  isLowTime: boolean;
  label?: string;
}

const Clock: React.FC<ClockProps> = ({ timeMs, isActive, isLowTime, label }) => {
  // Format milliseconds to mm:ss, or mm:ss.d if low on time
  const formatTime = (ms: number) => {
    if (ms === Infinity) return "NO LIMIT";
    if (ms <= 0) return "00:00";

    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const mStr = minutes.toString().padStart(2, '0');
    const sStr = seconds.toString().padStart(2, '0');

    // Show tenths of a second if under 20 seconds
    if (ms < 20000) {
        const tenths = Math.floor((ms % 1000) / 100);
        return `${mStr}:${sStr}.${tenths}`;
    }

    return `${mStr}:${sStr}`;
  };

  return (
    <div
        className={`
            flex items-center gap-1.5 px-1.5 py-0.5 border transition-colors duration-200
            min-w-[80px] h-[28px] md:h-[32px]
            ${isActive
                ? 'bg-[var(--term-main)] text-[var(--term-bg)] border-[var(--term-main)] shadow-[0_0_5px_var(--term-main)]'
                : 'bg-[var(--term-bg)] text-[var(--term-dim)] border-[var(--term-dim)] opacity-80'
            }
            ${isLowTime && isActive ? 'animate-pulse' : ''}
        `}
    >
        {timeMs === Infinity ? <InfinityIcon size={12} className="flex-shrink-0" /> : <ClockIcon size={12} className={`flex-shrink-0 ${isActive ? 'animate-spin-slow' : ''}`} />}
        <span className="font-mono text-sm md:text-base font-bold tracking-widest leading-none tabular-nums min-w-[60px] text-right">
            {formatTime(timeMs)}
        </span>
        {label && <span className="text-[9px] uppercase font-bold opacity-70 ml-1 flex-shrink-0">{label}</span>}
    </div>
  );
};

export default Clock;
