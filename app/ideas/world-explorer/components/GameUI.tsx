'use client';

import React, { useState, useEffect } from 'react';
import { GameState } from '../types';
import { BIOME_COLORS } from '../constants';

interface GameUIProps {
  gameState: GameState;
  onOptionSelect: (nextId?: string) => void;
  onCloseDialogue: () => void;
}

export const GameUI: React.FC<GameUIProps> = ({ gameState, onOptionSelect, onCloseDialogue }) => {
  const [helpOpen, setHelpOpen] = useState(false);

  const biomeColor = BIOME_COLORS[gameState.currentBiome];

  // Toggle help panel with "H" key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'h' || e.key === 'H') {
        setHelpOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none text-white font-mono">

      {/* Top Left: HUD */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-col gap-1.5 sm:gap-2 pointer-events-auto">
        <div className="bg-black/70 p-2 sm:p-4 rounded-lg border-l-4 border-yellow-500 shadow-lg backdrop-blur-sm">
          <div className="text-xl sm:text-3xl font-bold text-yellow-400">{gameState.score}</div>
          <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">Discovery Score</div>
        </div>

        <div className="bg-black/60 p-2 sm:p-3 rounded-lg flex items-center gap-2 sm:gap-3 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse bg-blue-400"></div>
          <div>
            <div className="text-xs sm:text-sm font-bold">Discoveries: {gameState.discoveries}</div>
          </div>
        </div>

        <div className="bg-black/60 p-2 sm:p-3 rounded-lg flex items-center gap-2 sm:gap-3 backdrop-blur-sm transition-colors duration-500"
             style={{ borderLeft: `4px solid ${biomeColor.text}` }}>
          <div>
            <div className="text-[10px] sm:text-xs text-gray-400">Current Biome</div>
            <div className="text-sm sm:text-lg font-bold" style={{ color: biomeColor.text }}>{gameState.currentBiome}</div>
          </div>
        </div>
      </div>

      {/* Top Right: Help */}
      <div className="absolute top-2 right-2 sm:top-16 sm:right-4 pointer-events-auto">
        <div
          className="bg-black/70 p-2 sm:p-3 rounded-lg cursor-pointer hover:bg-black/80 active:bg-black/90 transition-all backdrop-blur-sm touch-manipulation"
          onClick={() => setHelpOpen(!helpOpen)}
        >
          {!helpOpen ? (
            <div className="text-yellow-400 font-bold text-xs sm:text-sm">▶ Controls {typeof window !== 'undefined' && window.innerWidth >= 768 ? '(H)' : ''}</div>
          ) : (
            <div className="w-56 sm:w-64">
                <div className="flex justify-between items-center mb-2 border-b border-gray-600 pb-2">
                    <span className="font-bold text-yellow-400 text-xs sm:text-sm">Guide</span>
                    <span className="text-[10px] sm:text-xs text-gray-500">(Tap to hide)</span>
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                    <li className="flex justify-between"><span>Move</span> <span className="text-white">WASD / Arrows / Touch</span></li>
                    <li className="flex justify-between"><span>Interact</span> <span className="text-white">E / Space / Touch</span></li>
                    <li className="flex justify-between"><span>Cancel</span> <span className="text-white">Esc</span></li>
                </ul>
                <div className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-400 italic">
                    Find glowing items and speak to strangers to uncover the world&apos;s secrets.
                </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Center: Dialogue */}
      {gameState.isDialogueOpen && gameState.activeNPC && gameState.currentDialogueNode && (
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-2 sm:px-4 pointer-events-auto md:pb-0 pb-48">
          <div className="bg-black/90 border border-gray-700 rounded-xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-bold" style={{ color: gameState.activeNPC.color }}>
                    {gameState.activeNPC.name}
                </h3>
                <button
                    onClick={onCloseDialogue}
                    className="text-gray-500 hover:text-white active:text-white transition-colors text-xl sm:text-2xl touch-manipulation"
                >
                    ✕
                </button>
            </div>

            <p className="text-sm sm:text-lg mb-4 sm:mb-6 leading-relaxed text-gray-200">
                {gameState.currentDialogueNode.text}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                {gameState.currentDialogueNode.options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => onOptionSelect(opt.nextId)}
                        className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-yellow-100 px-3 sm:px-4 py-2 rounded-lg border border-gray-600 hover:border-yellow-500 active:border-yellow-400 transition-all text-xs sm:text-sm font-bold touch-manipulation"
                    >
                        {opt.text}
                    </button>
                ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
