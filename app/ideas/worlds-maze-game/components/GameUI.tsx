'use client';

import React, { useState, useCallback, useRef } from 'react';
import { GameState, Difficulty, BiomeType, PlayerTheme } from '../types';
import { BIOME_COLORS } from '../constants';

interface GameUIProps {
  gameState: GameState;
  onNextLevel: () => void;
  onDifficultyChange: (diff: Difficulty) => void;
  onToggleView: () => void;
  onRegenerate: () => void;
  onBiomeChange: (biome: BiomeType) => void;
  onThemeChange: (theme: PlayerTheme) => void;
  onJoystickMove?: (x: number, y: number) => void;
}

// Virtual Joystick Component
const VirtualJoystick: React.FC<{ onMove: (x: number, y: number) => void }> = ({ onMove }) => {
  const joystickRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const calculateMove = useCallback((clientX: number, clientY: number) => {
    if (!joystickRef.current) return;

    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let deltaX = clientX - centerX;
    let deltaY = clientY - centerY;

    const maxDistance = rect.width / 2 - 20;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance > maxDistance) {
      deltaX = (deltaX / distance) * maxDistance;
      deltaY = (deltaY / distance) * maxDistance;
    }

    setPosition({ x: deltaX, y: deltaY });

    // Normalize to -1 to 1
    const normalizedX = deltaX / maxDistance;
    const normalizedY = deltaY / maxDistance;
    onMove(normalizedX, normalizedY);
  }, [onMove]);

  const handleEnd = useCallback(() => {
    isDraggingRef.current = false;
    setPosition({ x: 0, y: 0 });
    onMove(0, 0);
  }, [onMove]);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    const touch = e.touches[0];
    calculateMove(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!isDraggingRef.current) return;
    const touch = e.touches[0];
    calculateMove(touch.clientX, touch.clientY);
  };

  return (
    <div
      ref={joystickRef}
      className="w-32 h-32 rounded-full bg-black/70 border-2 border-white/30 relative touch-none select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
    >
      <div
        className="w-14 h-14 rounded-full bg-yellow-500 absolute top-1/2 left-1/2 shadow-lg shadow-yellow-500/30"
        style={{
          transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
        }}
      />
      {/* Direction indicators */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-white/40 text-sm font-bold">▲</div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/40 text-sm font-bold">▼</div>
      <div className="absolute left-2 top-1/2 -translate-y-1/2 text-white/40 text-sm font-bold">◀</div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 text-sm font-bold">▶</div>
    </div>
  );
};

export const GameUI: React.FC<GameUIProps> = ({
  gameState,
  onNextLevel,
  onDifficultyChange,
  onToggleView,
  onRegenerate,
  onBiomeChange,
  onThemeChange,
  onJoystickMove,
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [worldSelectorOpen, setWorldSelectorOpen] = useState(false);
  const [themeSelectorOpen, setThemeSelectorOpen] = useState(false);
  const biomeColor = BIOME_COLORS[gameState.currentBiome];

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleJoystickMove = useCallback((x: number, y: number) => {
    onJoystickMove?.(x, y);
  }, [onJoystickMove]);

  return (
    <div className="absolute inset-0 pointer-events-none text-white font-mono select-none">

      {/* Top Left: HUD - Compact on mobile */}
      <div className="absolute top-14 left-2 sm:top-16 sm:left-4 flex flex-col gap-1 sm:gap-2 pointer-events-auto">
        <div className="bg-black/90 p-2 sm:p-4 rounded-lg sm:rounded-xl border-l-4 border-yellow-500 shadow-2xl backdrop-blur-xl border border-gray-800">
          <div className="flex justify-between items-start mb-1 gap-2 sm:gap-4">
            <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-black">Level {gameState.level}</div>
            <div className={`text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded border uppercase font-black ${
              gameState.difficulty === Difficulty.EXPERT ? 'bg-red-600/30 text-red-500 border-red-600/50' : 'bg-yellow-600/30 text-yellow-500 border-yellow-600/50'
            }`}>
                {gameState.difficulty}
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tighter">{formatTime(gameState.elapsedTime)}</div>
          <div className="hidden sm:flex items-center justify-between mt-2 pt-2 border-t border-gray-800">
             <div className="text-[10px] text-gray-500 uppercase">Personal Best</div>
             <div className="text-[10px] text-yellow-500 font-bold">{gameState.bestTimes[gameState.level] ? formatTime(gameState.bestTimes[gameState.level]) : '--:--.--'}</div>
          </div>
        </div>

        {/* Score - hidden on very small screens */}
        <div className="hidden xs:flex bg-black/80 p-2 sm:p-3 rounded-lg backdrop-blur-md border border-gray-800 justify-between items-center">
          <span className="text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-wider">Score</span>
          <span className="text-xs sm:text-sm font-black text-yellow-500 ml-2 sm:ml-4">{gameState.score.toLocaleString()}</span>
        </div>

        {/* Biome indicator - compact on mobile */}
        <div
          className="bg-black/80 p-2 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-md border border-gray-800"
          style={{ borderLeft: `4px solid ${biomeColor.text}` }}
        >
          <div className="text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-widest">World</div>
          <div className="text-sm sm:text-lg font-black uppercase tracking-tighter truncate max-w-[100px] sm:max-w-none" style={{ color: biomeColor.text }}>
            {gameState.currentBiome.split(' ')[0]}
          </div>
        </div>
      </div>

      {/* Top Right: Settings button (mobile) / Full controls (desktop) */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 pointer-events-auto">
        {/* Mobile: Single settings button */}
        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className="sm:hidden bg-black/90 p-3 rounded-xl backdrop-blur-xl shadow-2xl border border-gray-800 text-yellow-500 cursor-pointer"
        >
          <span className="text-xl">⚙️</span>
        </button>

        {/* Desktop: Full controls */}
        <div className="hidden sm:flex flex-col gap-3 items-end">
          {/* Difficulty Selector */}
          <div className="flex gap-2 z-[60]">
            <div className="bg-black/90 p-1.5 rounded-2xl flex gap-1.5 backdrop-blur-xl shadow-2xl border border-gray-800 p-2">
                {Object.values(Difficulty).map((diff) => (
                    <button
                        key={diff}
                        onClick={() => onDifficultyChange(diff)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all transform active:scale-90 cursor-pointer ${
                            gameState.difficulty === diff
                            ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20'
                            : 'bg-gray-900 text-gray-500 hover:text-white hover:bg-gray-800'
                        }`}
                    >
                        {diff}
                    </button>
                ))}
            </div>
          </div>

          {/* Theme Selector */}
          <div className="group relative bg-black/90 p-3 rounded-2xl hover:bg-gray-800 transition-all backdrop-blur-xl shadow-2xl border border-gray-800 flex items-center gap-3 cursor-pointer w-48 z-[50]"
               onClick={() => setThemeSelectorOpen(!themeSelectorOpen)}>
              <div className="text-yellow-500">🎭</div>
              <div className="flex-1">
                  <div className="text-[8px] text-gray-500 uppercase tracking-widest">Avatar</div>
                  <div className="text-[10px] font-black uppercase text-white truncate max-w-[80px]">{gameState.playerTheme}</div>
              </div>
              <div className="text-[10px] text-gray-600 tracking-tighter">▾</div>

              {themeSelectorOpen && (
                  <div className="absolute right-full top-0 mr-4 w-48 bg-zinc-950 border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-[150] animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="max-h-96 overflow-y-auto custom-scrollbar bg-black/40">
                        <div className="px-4 py-2 text-[8px] text-gray-500 border-b border-white/5 uppercase font-bold tracking-widest bg-black/60">Entity Database</div>
                        {Object.values(PlayerTheme).map((theme) => (
                            <div
                                key={theme}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onThemeChange(theme);
                                    setThemeSelectorOpen(false);
                                }}
                                className={`px-4 py-3 text-[10px] font-black uppercase hover:bg-white/10 transition-colors border-b border-white/5 last:border-0 ${gameState.playerTheme === theme ? 'text-yellow-500 bg-white/5' : 'text-gray-400'}`}
                            >
                                {theme}
                            </div>
                        ))}
                      </div>
                  </div>
              )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 z-[40]">
            <button
              onClick={onRegenerate}
              className="group bg-black/90 p-4 rounded-2xl hover:bg-gray-800 transition-all backdrop-blur-xl shadow-2xl border border-gray-800 text-yellow-500 flex items-center gap-3 active:scale-95 cursor-pointer"
              title="Generate New Mathematical Pattern"
            >
              <span className="text-xs font-black uppercase tracking-widest group-hover:text-white transition-colors">Re-Seed</span>
              <span className="text-xl animate-spin-slow group-hover:rotate-180 transition-transform duration-500">⚙️</span>
            </button>

            <button
              onClick={onToggleView}
              className="bg-black/90 p-4 rounded-2xl hover:bg-gray-800 transition-all backdrop-blur-xl shadow-2xl border border-gray-800 flex items-center gap-4 active:scale-95 cursor-pointer"
            >
              <span className="text-xs font-black uppercase tracking-widest text-gray-300">Observer</span>
              <span className="text-yellow-500 font-black px-2 py-0.5 rounded-md bg-yellow-500/10 border border-yellow-500/20">
                  {gameState.isFullMapMode ? 'MAP' : 'PLAYER'}
              </span>
            </button>
          </div>

          {/* World selector */}
          <div className="group relative bg-black/80 p-4 rounded-xl backdrop-blur-md transition-all duration-700 shadow-xl border border-gray-800 cursor-pointer w-64"
               onClick={() => setWorldSelectorOpen(!worldSelectorOpen)}
               style={{ borderLeft: `6px solid ${biomeColor.text}` }}>
            <div className="text-[10px] text-gray-400 uppercase mb-1 tracking-widest flex justify-between items-center gap-4">
              <span>Atmosphere</span>
              <span className="text-[8px] opacity-70 group-hover:opacity-100 transition-opacity bg-white/5 px-1 rounded uppercase">Change World ▾</span>
            </div>
            <div className="text-lg font-black uppercase tracking-tighter" style={{ color: biomeColor.text }}>{gameState.currentBiome}</div>

            {worldSelectorOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-zinc-950 border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar bg-black/40">
                  {Object.values(BiomeType).map((biome) => (
                    <div
                      key={biome}
                      onClick={(e) => {
                        e.stopPropagation();
                        onBiomeChange(biome);
                        setWorldSelectorOpen(false);
                      }}
                      className={`px-4 py-3 text-xs font-bold flex items-center gap-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0 ${gameState.currentBiome === biome ? 'bg-white/5 text-white' : 'text-gray-400'}`}
                    >
                      <div className="w-3 h-3 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.2)]" style={{ backgroundColor: BIOME_COLORS[biome].text }}></div>
                      <span className="flex-1 whitespace-nowrap">{biome}</span>
                      {gameState.currentBiome === biome && <span className="text-[8px] text-yellow-500 font-black tracking-tighter bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/20">ACTIVE</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Settings Panel (slide-in) */}
      {settingsOpen && (
        <div className="sm:hidden absolute inset-0 z-[200] pointer-events-auto">
          <div className="absolute inset-0 bg-black/80" onClick={() => setSettingsOpen(false)} />
          <div className="absolute top-0 right-0 w-72 h-full bg-zinc-950 border-l border-gray-800 p-4 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black text-yellow-500 uppercase">Settings</h2>
              <button onClick={() => setSettingsOpen(false)} className="text-gray-400 text-2xl cursor-pointer">&times;</button>
            </div>

            {/* Difficulty */}
            <div className="mb-6">
              <div className="text-[10px] text-gray-500 uppercase mb-2 tracking-widest">Difficulty</div>
              <div className="flex flex-wrap gap-2">
                {Object.values(Difficulty).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => onDifficultyChange(diff)}
                    className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase cursor-pointer ${
                      gameState.difficulty === diff
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-900 text-gray-400'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Avatar */}
            <div className="mb-6">
              <div className="text-[10px] text-gray-500 uppercase mb-2 tracking-widest">Avatar</div>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {Object.values(PlayerTheme).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => onThemeChange(theme)}
                    className={`px-2 py-2 rounded-lg text-[9px] font-black uppercase truncate cursor-pointer ${
                      gameState.playerTheme === theme
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-900 text-gray-400'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* World */}
            <div className="mb-6">
              <div className="text-[10px] text-gray-500 uppercase mb-2 tracking-widest">World</div>
              <div className="grid grid-cols-1 gap-1 max-h-48 overflow-y-auto">
                {Object.values(BiomeType).map((biome) => (
                  <button
                    key={biome}
                    onClick={() => onBiomeChange(biome)}
                    className={`px-3 py-2 rounded-lg text-[10px] font-bold flex items-center gap-2 cursor-pointer ${
                      gameState.currentBiome === biome
                        ? 'bg-white/10 text-white'
                        : 'bg-gray-900/50 text-gray-400'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BIOME_COLORS[biome].text }} />
                    <span className="truncate">{biome}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => { onRegenerate(); setSettingsOpen(false); }}
                className="w-full bg-gray-900 p-3 rounded-lg text-yellow-500 font-black text-xs uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Re-Seed</span> <span>⚙️</span>
              </button>
              <button
                onClick={() => { onToggleView(); setSettingsOpen(false); }}
                className="w-full bg-gray-900 p-3 rounded-lg text-gray-300 font-black text-xs uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Toggle View</span>
                <span className="text-yellow-500 px-2 py-0.5 rounded bg-yellow-500/10 text-[10px]">
                  {gameState.isFullMapMode ? 'MAP' : 'PLAYER'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Controls: Map Button & Virtual Joystick */}
      {!gameState.isLevelComplete && !gameState.isPreviewPhase && onJoystickMove && (
        <div className="sm:hidden absolute bottom-4 left-0 right-0 flex justify-between items-end px-4 pointer-events-auto">
          <button
            onClick={onToggleView}
            className="bg-black/80 p-4 rounded-full border-2 border-white/20 active:scale-95 transition-transform cursor-pointer"
          >
            <span className="text-2xl">{gameState.isFullMapMode ? '👁️' : '🗺️'}</span>
          </button>

          <VirtualJoystick onMove={handleJoystickMove} />
        </div>
      )}

      {/* Level Complete Modal */}
      {gameState.isLevelComplete && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center pointer-events-auto z-[200] p-4">
          <div className="bg-zinc-950 border border-yellow-500/30 p-6 sm:p-12 rounded-2xl sm:rounded-[2.5rem] shadow-[0_0_100px_rgba(234,179,8,0.1)] text-center max-w-lg w-full animate-in zoom-in duration-500">
            <div className="text-5xl sm:text-7xl mb-4 sm:mb-6 transform hover:scale-110 transition-transform">🛰️</div>
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6 uppercase italic tracking-tighter leading-none">BIOME COMPLETE</h2>

            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-zinc-900/50 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-800">
                    <div className="text-gray-500 text-[8px] sm:text-[10px] uppercase tracking-widest mb-1">Duration</div>
                    <div className="text-lg sm:text-2xl font-black text-white">{formatTime(gameState.elapsedTime)}</div>
                </div>
                <div className="bg-zinc-900/50 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-800">
                    <div className="text-gray-500 text-[8px] sm:text-[10px] uppercase tracking-widest mb-1">Score</div>
                    <div className="text-lg sm:text-2xl font-black text-yellow-500">+{Math.max(0, 1000 - Math.floor(gameState.elapsedTime / 1000) * 10)}</div>
                </div>
            </div>

            <button
                onClick={onNextLevel}
                className="w-full bg-yellow-500 hover:bg-white text-black py-4 sm:py-6 rounded-2xl sm:rounded-3xl text-lg sm:text-xl font-black uppercase tracking-widest transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_rgba(234,179,8,0.3)] cursor-pointer"
            >
                Enter Portal
            </button>
          </div>
        </div>
      )}

      {/* Style overrides for custom animations and scrollbar */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(234, 179, 8, 0.5);
        }
      `}</style>
    </div>
  );
};
