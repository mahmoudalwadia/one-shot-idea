import React from 'react';
import { PlayerClass } from '../types';

interface Props {
  onSelect: (cls: PlayerClass) => void;
}

export const ClassSelection: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h2 className="text-4xl text-center text-white font-retro-title mb-8">Choose Your Path</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Warrior */}
          <div 
            onClick={() => onSelect('WARRIOR')}
            className="border-4 border-red-800 bg-[#1a0f0f] p-6 cursor-pointer hover:bg-[#2a1515] hover:border-red-500 transition-all group text-center"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
              🛡️
            </div>
            <h3 className="text-2xl text-red-500 text-center font-retro-title mb-4">Warrior</h3>
            <p className="text-gray-400 font-retro-text mb-4 text-center">
              A master of arms and armor. High health and strength.
            </p>
            <ul className="text-sm text-gray-300 font-retro-text space-y-2 text-left px-4">
              <li className="flex justify-between"><span>STR</span> <span className="text-red-400">8</span></li>
              <li className="flex justify-between"><span>CON</span> <span className="text-green-400">7</span></li>
              <li className="flex justify-between"><span>DEX</span> <span className="text-blue-400">3</span></li>
              <li className="flex justify-between"><span>INT</span> <span className="text-purple-400">2</span></li>
            </ul>
          </div>

          {/* Rogue */}
          <div 
            onClick={() => onSelect('ROGUE')}
            className="border-4 border-green-800 bg-[#0f1a0f] p-6 cursor-pointer hover:bg-[#152a15] hover:border-green-500 transition-all group text-center"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
              🥷
            </div>
            <h3 className="text-2xl text-green-500 text-center font-retro-title mb-4">Rogue</h3>
            <p className="text-gray-400 font-retro-text mb-4 text-center">
              Swift and deadly. High evasion and critical hits.
            </p>
            <ul className="text-sm text-gray-300 font-retro-text space-y-2 text-left px-4">
              <li className="flex justify-between"><span>STR</span> <span className="text-red-400">4</span></li>
              <li className="flex justify-between"><span>CON</span> <span className="text-green-400">4</span></li>
              <li className="flex justify-between"><span>DEX</span> <span className="text-blue-400">8</span></li>
              <li className="flex justify-between"><span>INT</span> <span className="text-purple-400">4</span></li>
            </ul>
          </div>

          {/* Wizard */}
          <div 
            onClick={() => onSelect('WIZARD')}
            className="border-4 border-blue-800 bg-[#0f0f1a] p-6 cursor-pointer hover:bg-[#15152a] hover:border-blue-500 transition-all group text-center"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
              🧙
            </div>
            <h3 className="text-2xl text-blue-500 text-center font-retro-title mb-4">Wizard</h3>
            <p className="text-gray-400 font-retro-text mb-4 text-center">
              Master of arcane arts. High intellect but fragile.
            </p>
            <ul className="text-sm text-gray-300 font-retro-text space-y-2 text-left px-4">
              <li className="flex justify-between"><span>STR</span> <span className="text-red-400">2</span></li>
              <li className="flex justify-between"><span>CON</span> <span className="text-green-400">3</span></li>
              <li className="flex justify-between"><span>DEX</span> <span className="text-blue-400">5</span></li>
              <li className="flex justify-between"><span>INT</span> <span className="text-purple-400">10</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
