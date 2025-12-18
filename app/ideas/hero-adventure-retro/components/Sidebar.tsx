import React from 'react';
import { GameState, TileType } from '../types';
import { THEMES } from '../constants';
import { Heart, Zap, Shield, Sword, Coins } from 'lucide-react';

interface Props {
  state: GameState;
}

export const Sidebar: React.FC<Props> = ({ state }) => {
  const { playerStats, currentMapId, maps, playerPos, log } = state;
  const currentMap = maps[currentMapId];
  const theme = THEMES[currentMap.theme];

  const getClassColor = () => {
    switch(playerStats.class) {
      case 'WARRIOR': return 'text-red-500';
      case 'ROGUE': return 'text-green-500';
      case 'WIZARD': return 'text-blue-400';
      default: return 'text-yellow-500';
    }
  };

  return (
    <div className="w-full lg:w-64 flex flex-col gap-4 font-retro-text text-xl">

      {/* Stats Panel */}
      <div className={`p-4 border-4 ${theme.border} bg-[#111] relative`}>
        <div className="absolute -top-3 left-4 bg-[#111] px-2 text-sm text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <span>STATS</span>
            <span className={`${getClassColor()} text-xs font-bold`}>[{playerStats.class}]</span>
        </div>

        <div className="space-y-3">
            <StatRow label="HP" value={playerStats.hp} max={playerStats.maxHp} color="text-red-500" icon={<Heart size={16} fill="currentColor"/>} />
            <StatRow label="SP" value={playerStats.sp} max={playerStats.maxSp} color="text-blue-400" icon={<Zap size={16} fill="currentColor"/>} />

            <div className="h-px bg-gray-700 my-2"></div>

            <div className="flex justify-between items-center text-yellow-400">
                <div className="flex items-center gap-2"><div className="w-4 text-center">LV</div> <span className="text-white">{playerStats.level}</span></div>
                <div className="flex items-center gap-2"><Coins size={16} className="text-yellow-500"/> <span className="text-white">{playerStats.gold}</span></div>
            </div>

            <div className="flex justify-between items-center text-gray-300">
                <div className="flex items-center gap-2" title="Attack Power"><Sword size={16}/> <span className="text-white">{playerStats.attack}</span></div>
                <div className="flex items-center gap-2" title="Defense"><Shield size={16}/> <span className="text-white">{playerStats.defense}</span></div>
            </div>

            <div className="h-px bg-gray-700 my-2"></div>

             {/* Attributes Grid */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-1 text-sm text-gray-400">
                <div className="flex items-center gap-2" title="Strength - Damage">
                    <span className="text-red-500 font-bold">STR</span>
                    <span className="text-white text-lg">{playerStats.str}</span>
                </div>
                <div className="flex items-center gap-2" title="Dexterity - Hit/Crit/Evade">
                    <span className="text-blue-500 font-bold">DEX</span>
                    <span className="text-white text-lg">{playerStats.dex}</span>
                </div>
                 <div className="flex items-center gap-2" title="Constitution - Health/Regen">
                    <span className="text-green-500 font-bold">CON</span>
                    <span className="text-white text-lg">{playerStats.con}</span>
                </div>
                <div className="flex items-center gap-2" title="Intelligence - Magic">
                    <span className="text-purple-500 font-bold">INT</span>
                    <span className="text-white text-lg">{playerStats.int}</span>
                </div>
            </div>
        </div>
      </div>

      {/* Mini Map */}
      <div className={`p-2 border-4 ${theme.border} bg-[#000] aspect-square relative flex items-center justify-center`}>
         <div className="absolute -top-3 right-4 bg-[#111] px-2 text-sm text-gray-400 uppercase tracking-widest">Map</div>
         <div className="w-full h-full grid" style={{
             gridTemplateColumns: `repeat(${currentMap.width}, 1fr)`,
             gridTemplateRows: `repeat(${currentMap.height}, 1fr)`
         }}>
             {currentMap.tiles.map((row, y) => row.map((tile, x) => {
                 const isPlayer = playerPos.x === x && playerPos.y === y;
                 let bg = 'bg-transparent';
                 if (tile === TileType.WALL) bg = 'bg-gray-800';
                 if (tile === TileType.FLOOR) bg = 'bg-gray-900';
                 if (isPlayer) bg = 'bg-white animate-pulse';

                 return <div key={`${x}-${y}`} className={`${bg}`}></div>
             }))}
         </div>
      </div>

      {/* Action Log */}
      <div className={`flex-1 min-h-[120px] p-2 border-4 border-gray-700 bg-[#050505] overflow-hidden font-retro-text text-lg`}>
         <div className="flex flex-col justify-end h-full">
            {log.map((msg, idx) => (
                <div key={idx} className={`truncate ${idx === 0 ? 'text-white brightness-125' : 'text-gray-500'}`}>
                    {idx === 0 ? '> ' : '  '} {msg}
                </div>
            ))}
         </div>
      </div>

    </div>
  );
};

const StatRow: React.FC<{ label: string, value: number, max: number, color: string, icon: React.ReactNode }> = ({ label, value, max, color, icon }) => (
    <div className="flex items-center justify-between">
        <div className={`flex items-center gap-2 w-16 ${color}`}>
            {icon}
            <span>{label}</span>
        </div>
        <div className="flex-1 mx-2 h-4 bg-gray-800 border border-gray-600 relative">
            <div
                className={`h-full ${color.replace('text', 'bg')}`}
                style={{ width: `${(value / max) * 100}%`, transition: 'width 0.2s' }}
            ></div>
        </div>
        <div className="w-12 text-right text-white">
            {value}
        </div>
    </div>
);
