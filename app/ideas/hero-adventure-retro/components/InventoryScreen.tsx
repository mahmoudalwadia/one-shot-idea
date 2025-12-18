import React from 'react';
import { GameState } from '../types';

interface Props {
  state: GameState;
  onUseItem: (index: number) => void;
  onClose: () => void;
}

export const InventoryScreen: React.FC<Props> = ({ state, onUseItem, onClose }) => {
  const { inventory, playerStats } = state;
  const gridSlots = Array.from({ length: 12 });

  return (
    <div className="absolute inset-0 z-40 bg-black/95 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl border-4 border-yellow-600 bg-[#1a1100] p-6 text-white font-retro-text shadow-2xl">
        
        <div className="flex justify-between items-center mb-6 border-b-2 border-yellow-800 pb-2">
            <h2 className="text-4xl text-yellow-500">Inventory</h2>
            <button onClick={onClose} className="px-4 py-1 bg-red-900 border border-red-500 hover:bg-red-700">CLOSE [ESC]</button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
            {/* Items Grid */}
            <div className="flex-1 grid grid-cols-4 gap-4">
                {gridSlots.map((_, idx) => {
                    const item = inventory[idx];
                    return (
                        <button 
                            key={idx}
                            disabled={!item}
                            onClick={() => item && onUseItem(idx)}
                            className={`aspect-square border-2 ${item ? 'border-yellow-400 bg-yellow-900/20 hover:bg-yellow-900/50' : 'border-yellow-900 bg-[#110a00]'} flex flex-col items-center justify-center relative group transition-all`}
                        >
                            {item && (
                                <>
                                    <div className="text-4xl mb-2 filter drop-shadow-md">{item.icon}</div>
                                    <span className="text-xs text-center leading-none text-yellow-100">{item.name}</span>
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full mb-2 bg-gray-800 border border-white p-2 text-xs w-40 hidden group-hover:block z-50 pointer-events-none shadow-xl">
                                        <div className="font-bold text-yellow-400 mb-1">{item.name}</div>
                                        {item.description}
                                        {item.value && <div className="text-green-300 mt-1">Val: {item.value}</div>}
                                    </div>
                                </>
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Character Stats (Simplified) */}
            <div className="w-full md:w-1/3 border-2 border-yellow-800 p-4 bg-[#110a00]">
                <h3 className="text-2xl text-yellow-600 mb-4 border-b border-yellow-900">Stats</h3>
                <div className="space-y-4 text-gray-300">
                     <div className="flex justify-between"><span>STR</span> <span className="text-white">{playerStats.str}</span></div>
                     <div className="flex justify-between"><span>DEX</span> <span className="text-white">{playerStats.dex}</span></div>
                     <div className="flex justify-between"><span>CON</span> <span className="text-white">{playerStats.con}</span></div>
                     <div className="flex justify-between"><span>INT</span> <span className="text-white">{playerStats.int}</span></div>
                </div>

                <div className="mt-8 pt-4 border-t border-yellow-900 text-sm text-gray-400">
                    <p>GOLD: <span className="text-yellow-400">{playerStats.gold}</span></p>
                    <p>LVL: <span className="text-white">{playerStats.level}</span></p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
