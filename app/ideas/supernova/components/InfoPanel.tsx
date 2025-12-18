'use client';

import React from 'react';
import { SimulationState, StarPhase } from '../types';
import { Activity, Thermometer, Box } from 'lucide-react';

interface InfoPanelProps {
  state: SimulationState;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ state }) => {
  const getPhaseColor = (phase: StarPhase) => {
    switch (phase) {
      case StarPhase.STABLE: return 'text-green-400';
      case StarPhase.UNSTABLE: return 'text-yellow-400 animate-pulse';
      case StarPhase.IMPLODING: return 'text-orange-500 animate-bounce';
      case StarPhase.SUPERNOVA: return 'text-red-500 animate-pulse';
      case StarPhase.REMNANT: return 'text-purple-400';
      default: return 'text-white';
    }
  };

  return (
    <div
      style={{ maxWidth: 'max-content' }}
      className="inline-block bg-slate-950/80 backdrop-blur-lg border border-slate-700/50 rounded-lg sm:rounded-xl p-2.5 sm:p-4 text-xs sm:text-sm font-mono shadow-2xl pointer-events-none select-none shrink-0"
    >
      <h2 className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 mb-2 sm:mb-3 border-b border-slate-700 pb-1.5 sm:pb-2 flex justify-between">
        <span>Stellar Telemetry</span>
        <span className="text-[8px] sm:text-[10px] text-slate-600">LIVE</span>
      </h2>

      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
            <Activity size={12} className="sm:w-[14px] sm:h-[14px]" />
            <span>Phase</span>
          </div>
          <span className={`font-bold text-[10px] sm:text-sm ${getPhaseColor(state.phase)}`}>{state.phase}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
            <Thermometer size={12} className="sm:w-[14px] sm:h-[14px]" />
            <span>Core Temp</span>
          </div>
          <span className="text-blue-300 font-numeric tabular-nums text-[10px] sm:text-sm">
            {(state.coreTemperature / 1000000).toFixed(1)}M K
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
            <Box size={12} className="sm:w-[14px] sm:h-[14px]" />
            <span>Mass</span>
          </div>
          <span className="text-yellow-300 font-numeric tabular-nums text-[10px] sm:text-sm">{state.mass.toFixed(1)} M☉</span>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
