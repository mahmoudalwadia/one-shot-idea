'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useGame } from './hooks/useGame';
import { TitleScreen } from './components/TitleScreen';
import { ClassSelection } from './components/ClassSelection';
import { Viewport } from './components/Viewport';
import { Sidebar } from './components/Sidebar';
import { InventoryScreen } from './components/InventoryScreen';
import { MobileControls } from './components/MobileControls';
import { MobileHUD } from './components/MobileHUD';
import { Direction } from './types';
import { ArrowLeft } from 'lucide-react';

export default function HeroAdventureRetroPage() {
  const { state, movePlayer, startGame, toggleInventory, useItem, selectClass } = useGame();

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.gameStatus === 'TITLE') {
        if (e.key === 'Enter' || e.key === ' ') startGame();
        return;
      }

      if (state.gameStatus === 'CLASS_SELECT') return;

      if (e.key === 'i' || e.key === 'I' || e.key === 'Escape') {
        toggleInventory();
        return;
      }

      if (state.gameStatus === 'PLAYING') {
        switch (e.key) {
          case 'ArrowUp': case 'w': case 'W': movePlayer(Direction.UP); break;
          case 'ArrowDown': case 's': case 'S': movePlayer(Direction.DOWN); break;
          case 'ArrowLeft': case 'a': case 'A': movePlayer(Direction.LEFT); break;
          case 'ArrowRight': case 'd': case 'D': movePlayer(Direction.RIGHT); break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.gameStatus, movePlayer, startGame, toggleInventory]);

  // Render Screens
  if (state.gameStatus === 'TITLE') return <TitleScreen onStart={startGame} />;
  if (state.gameStatus === 'CLASS_SELECT') return <ClassSelection onSelect={selectClass} />;

  // Game Render Loop
  return (
    <div className="h-[100dvh] w-full bg-[#050505] flex flex-col items-center font-retro-text select-none overflow-hidden relative">

      {/* Back Button - Fixed Top Left */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 bg-black border-2 border-white px-3 py-2 text-white hover:bg-white hover:text-black transition-colors cursor-pointer flex items-center gap-2"
      >
        <ArrowLeft size={16} /> BACK
      </Link>

      {/* --- Mobile Only: HUD Top Bar --- */}
      <div className="w-full md:hidden shrink-0">
          <MobileHUD state={state} />
      </div>

      {/* --- Main Content Area --- */}
      <div className="flex-1 w-full max-w-7xl flex flex-col md:flex-row relative md:p-6 lg:p-8 gap-4 md:gap-6 overflow-hidden md:overflow-y-auto">

        {/* Game Viewport Container */}
        <div className="flex-1 flex flex-col items-center justify-start w-full relative z-10 pt-4 md:pt-0">

            {/* Desktop Header */}
            <div className="w-full bg-white text-black p-2 mb-4 border-b-4 border-gray-600 hidden md:flex justify-between items-center font-retro-title shadow-lg shrink-0">
                <h1 className="text-xl md:text-2xl tracking-tighter">Hero Adventure</h1>
                <div className="flex gap-2 text-xs">
                    <span className="bg-black text-white px-2 py-1">FLOOR {state.currentMapId}</span>
                </div>
            </div>

            {/* The Game */}
            <div className="w-full px-2 md:px-0 flex justify-center items-start md:block">
               <Viewport state={state} />
            </div>

            {/* Desktop Hints */}
            <div className="mt-4 text-gray-600 text-sm hidden md:block text-center pb-4">
                WASD / ARROW KEYS to Move • I for Inventory
            </div>
        </div>

        {/* --- Desktop Only: Sidebar --- */}
        <div className="hidden md:block w-64 lg:w-72 shrink-0 pb-8">
           <Sidebar state={state} />
        </div>

      </div>

      {/* --- Mobile Only: Controls Bottom Bar --- */}
      <MobileControls onMove={movePlayer} onToggleInventory={toggleInventory} />


      {/* --- Overlays --- */}
      {state.gameStatus === 'INVENTORY' && (
        <InventoryScreen state={state} onUseItem={useItem} onClose={toggleInventory} />
      )}

      {state.gameStatus === 'GAME_OVER' && (
        <div className="fixed inset-0 bg-red-900/90 z-50 flex items-center justify-center flex-col text-white font-retro-title">
            <h1 className="text-4xl md:text-6xl mb-4 text-black drop-shadow-lg text-center">YOU DIED</h1>
            <p className="text-lg md:text-xl mb-8 font-retro-text text-center px-4">Tap RESTART to try again</p>
            <button
                onClick={() => window.location.reload()}
                className="bg-black border-2 border-white px-8 py-4 text-xl hover:bg-white hover:text-black active:scale-95 cursor-pointer"
            >
                RESTART
            </button>
        </div>
      )}

    </div>
  );
}
