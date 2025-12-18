'use client';

import React from 'react';
import { MODES } from '../constants';
import { ControlPanelProps } from '../types';
import * as Icons from 'lucide-react';

const MonitorButton: React.FC<{
  modeConfig: typeof MODES[0];
  isActive: boolean;
  onClick: () => void;
}> = ({ modeConfig, isActive, onClick }) => {

  // Dynamic icon rendering
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{size?: number; color?: string; strokeWidth?: number}>>)[modeConfig.iconName] || Icons.Monitor;

  return (
    <button
      onClick={onClick}
      className={`
        relative group flex flex-col items-center justify-center
        h-24 md:h-32 w-full
        border-2 rounded-lg transition-all duration-300
        overflow-hidden
        ${isActive
          ? `border-${modeConfig.color} bg-${modeConfig.color}/10 shadow-[0_0_15px_rgba(var(--color-${modeConfig.color}),0.5)]`
          : 'border-gray-800 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-800'
        }
      `}
    >
      {/* Mini Scanline Overlay inside button */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-40"></div>

      {/* Active Indicator Light */}
      <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${isActive ? `bg-${modeConfig.color} shadow-[0_0_8px_${modeConfig.hexColor}] animate-pulse` : 'bg-gray-800'}`}></div>

      {/* Icon Preview */}
      <div className={`z-10 mb-2 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
        <IconComponent
          size={32}
          color={isActive ? modeConfig.hexColor : '#6b7280'}
          strokeWidth={1.5}
        />
      </div>

      {/* Label */}
      <span className={`z-10 text-[10px] md:text-xs font-bold tracking-widest uppercase ${isActive ? `text-${modeConfig.color}` : 'text-gray-500'}`}>
        {modeConfig.label}
      </span>

      {/* Decoration lines */}
      {isActive && (
        <div className={`absolute bottom-0 left-0 w-full h-1 bg-${modeConfig.color}`}></div>
      )}
    </button>
  );
};

const ControlPanel: React.FC<ControlPanelProps> = ({ currentMode, onModeSelect, backButton }) => {
  return (
    <div className="flex-1 bg-gray-950 p-4 md:p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">

        {/* Header of Control Panel */}
        <div className="flex justify-between items-end mb-4 border-b border-gray-800 pb-2">
          <div className="flex items-end gap-4">
            {backButton && (
              <div className="mb-1">
                {backButton}
              </div>
            )}
            <div>
              <h2 className="text-gray-400 text-sm tracking-[0.2em] uppercase mb-1">Visual Control System</h2>
              <div className="text-[10px] text-gray-600 font-mono">Build v2.0.45 // TERMINAL ACTIVE</div>
            </div>
          </div>
          <div className="hidden md:flex gap-4 text-[10px] text-gray-600 font-mono">
             <span>MEM: 64%</span>
             <span>CPU: 12%</span>
             <span>NET: ONLINE</span>
          </div>
        </div>

        {/* Grid of Monitors */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
          {MODES.map((mode) => (
            <MonitorButton
              key={mode.id}
              modeConfig={mode}
              isActive={currentMode === mode.id}
              onClick={() => onModeSelect(mode.id)}
            />
          ))}
        </div>

        {/* Detailed Info for Active Mode */}
        <div className="mt-6 border border-gray-800 bg-gray-900/30 p-4 rounded-md flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="w-full md:w-auto flex-shrink-0">
               <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Current Protocol</div>
               <div className="text-xl text-white font-bold">{MODES.find(m => m.id === currentMode)?.label}</div>
            </div>
            <div className="hidden md:block w-px h-10 bg-gray-800"></div>
            <div className="text-sm text-gray-400 font-mono">
              {">"} {MODES.find(m => m.id === currentMode)?.description}
              <span className="animate-pulse inline-block ml-1">_</span>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ControlPanel;
