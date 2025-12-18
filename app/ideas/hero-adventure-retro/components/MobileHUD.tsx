import React from 'react';
import { GameState } from '../types';
import { Heart, Zap, Coins } from 'lucide-react';

interface Props {
  state: GameState;
}

export const MobileHUD: React.FC<Props> = ({ state }) => {
  const { playerStats, log } = state;

  return (
    <div className="w-full bg-[#111] border-b-2 border-gray-700 p-2 flex flex-col gap-1 shadow-lg z-20">

      {/* Top Row: Bars and Coins */}
      <div className="flex items-center justify-between gap-2 text-sm font-retro-text">
        {/* HP Bar */}
        <div className="flex-1 flex items-center gap-1">
          <Heart size={14} className="text-red-500 fill-red-500" />
          <div className="flex-1 h-3 bg-gray-800 border border-gray-600 relative max-w-[100px]">
             <div
               className="h-full bg-red-600"
               style={{ width: `${(playerStats.hp / playerStats.maxHp) * 100}%` }}
             ></div>
          </div>
          <span className="text-white w-8 text-right">{playerStats.hp}</span>
        </div>

         {/* SP Bar */}
         <div className="flex-1 flex items-center gap-1">
          <Zap size={14} className="text-blue-400 fill-blue-400" />
          <div className="flex-1 h-3 bg-gray-800 border border-gray-600 relative max-w-[100px]">
             <div
               className="h-full bg-blue-500"
               style={{ width: `${(playerStats.sp / playerStats.maxSp) * 100}%` }}
             ></div>
          </div>
          <span className="text-white w-6 text-right">{playerStats.sp}</span>
        </div>

        {/* Gold & Level */}
        <div className="flex items-center gap-3 text-yellow-400 font-bold pl-2 border-l border-gray-700">
             <div className="flex items-center gap-1">
                 <Coins size={14} />
                 <span>{playerStats.gold}</span>
             </div>
             <div className="bg-gray-800 text-white px-1.5 rounded text-xs border border-gray-600">
                 LV {playerStats.level}
             </div>
        </div>
      </div>

      {/* Bottom Row: Last Log Message Ticker */}
      <div className="w-full h-6 bg-black border border-gray-800 flex items-center px-2 overflow-hidden">
        <span className="text-gray-400 text-sm whitespace-nowrap animate-pulse">
            {log[0] ? `> ${log[0]}` : '> Ready to adventure...'}
        </span>
      </div>
    </div>
  );
};
