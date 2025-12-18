'use client';

import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface MobileControlsProps {
  onMove: (direction: 'up' | 'down' | 'left' | 'right' | null) => void;
  onInteract: () => void;
}

export const MobileControls: React.FC<MobileControlsProps> = ({ onMove, onInteract }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 pointer-events-none">
      <div className="w-full h-52 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex items-center justify-between px-8 pb-8 touch-none">
        {/* Interact Button (Left side) */}
        <div className="flex flex-col items-center gap-2 pointer-events-auto">
          <button
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onInteract();
            }}
            className="relative w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700 border-3 border-yellow-400 flex flex-col items-center justify-center text-white active:scale-95 transition-all duration-150 shadow-[0_6px_20px_rgba(234,179,8,0.4),inset_0_2px_4px_rgba(255,255,255,0.2)] active:shadow-[0_2px_10px_rgba(234,179,8,0.3),inset_0_1px_2px_rgba(0,0,0,0.3)] touch-manipulation"
            aria-label="Interact"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50"></div>
            <span className="text-2xl font-bold relative z-10 drop-shadow-lg">E</span>
            <span className="text-[10px] font-mono mt-0.5 font-bold relative z-10 drop-shadow-md">INTERACT</span>
          </button>
        </div>

        {/* D-Pad (Right side) */}
        <div className="relative w-44 h-44 pointer-events-auto">
          {/* Outer glow ring */}
          <div className="absolute inset-0 m-auto w-full h-full rounded-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 blur-xl opacity-60"></div>

          {/* D-Pad Background */}
          <div className="absolute inset-0 m-auto w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg z-0 shadow-[inset_0_2px_8px_rgba(0,0,0,0.5),0_4px_12px_rgba(0,0,0,0.3)] border border-gray-700/50"></div>

          <ControlBtn
            onPressStart={() => onMove('up')}
            onPressEnd={() => onMove(null)}
            icon={<ArrowUp size={30} strokeWidth={2.5} />}
            className="top-0 left-1/2 -translate-x-1/2 rounded-t-xl h-16 w-14 border-b-0"
          />
          <ControlBtn
            onPressStart={() => onMove('down')}
            onPressEnd={() => onMove(null)}
            icon={<ArrowDown size={30} strokeWidth={2.5} />}
            className="bottom-0 left-1/2 -translate-x-1/2 rounded-b-xl h-16 w-14 border-t-0"
          />
          <ControlBtn
            onPressStart={() => onMove('left')}
            onPressEnd={() => onMove(null)}
            icon={<ArrowLeft size={30} strokeWidth={2.5} />}
            className="left-0 top-1/2 -translate-y-1/2 rounded-l-xl w-16 h-14 border-r-0"
          />
          <ControlBtn
            onPressStart={() => onMove('right')}
            onPressEnd={() => onMove(null)}
            icon={<ArrowRight size={30} strokeWidth={2.5} />}
            className="right-0 top-1/2 -translate-y-1/2 rounded-r-xl w-16 h-14 border-l-0"
          />

          {/* Center decorative circle with glow */}
          <div className="absolute inset-0 m-auto w-5 h-5 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full z-30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5),0_0_8px_rgba(255,255,255,0.1)] border border-gray-600/50 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

const ControlBtn: React.FC<{
  onPressStart: () => void;
  onPressEnd: () => void;
  icon: React.ReactNode;
  className: string;
}> = ({ onPressStart, onPressEnd, icon, className }) => (
  <button
    onPointerDown={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onPressStart();
    }}
    onPointerUp={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onPressEnd();
    }}
    onPointerCancel={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onPressEnd();
    }}
    onPointerLeave={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onPressEnd();
    }}
    className={`absolute bg-gradient-to-br from-gray-700 via-gray-750 to-gray-800 active:from-yellow-600 active:via-yellow-700 active:to-yellow-800 border-2 border-gray-600 active:border-yellow-400 flex items-center justify-center text-gray-200 active:text-white shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.1)] active:shadow-[0_2px_8px_rgba(234,179,8,0.4),inset_0_1px_3px_rgba(0,0,0,0.3)] z-20 touch-manipulation transition-all duration-150 ${className}`}
    style={{ touchAction: 'none' }}
  >
    {/* Shine effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-inherit opacity-0 active:opacity-100 transition-opacity duration-150"></div>
    <div className="relative z-10">
      {icon}
    </div>
  </button>
);

