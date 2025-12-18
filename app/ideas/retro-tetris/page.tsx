'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTetris } from './hooks/useTetris';
import { TETROMINOS } from './utils/tetrominos';
import Controls from './components/Controls';
import { Trophy, Layers, Zap, Bot } from 'lucide-react';

// Components defined within App to share state easily without prop drilling hell for this scale

const Cell: React.FC<{ type: string | number }> = React.memo(({ type }) => {
  const color = type !== 0 && TETROMINOS[type] ? TETROMINOS[type].color : '20, 20, 20';
  const isFilled = type !== 0;

  return (
    <div
      style={{
        background: isFilled
            ? `rgba(${color}, 0.8)`
            : `rgba(${color}, 0.3)`,
        borderBottom: `4px solid rgba(${color}, ${isFilled ? 1 : 0.1})`,
        borderRight: `4px solid rgba(${color}, ${isFilled ? 1 : 0.1})`,
        borderTop: `4px solid rgba(${color}, ${isFilled ? 0.5 : 0})`,
        borderLeft: `4px solid rgba(${color}, ${isFilled ? 0.5 : 0})`,
        boxShadow: isFilled ? `0 0 10px rgba(${color}, 0.5)` : 'none',
      }}
      className={`w-full h-full rounded-[1px] ${isFilled ? 'z-10' : 'z-0'}`}
    />
  );
});
Cell.displayName = 'Cell';

import { TetrominoShape } from './types';

const NextPiece: React.FC<{ tetromino: { shape: TetrominoShape } | null, compact?: boolean }> = ({ tetromino, compact = false }) => {
    if (!tetromino) return null;
    return (
        <div className={`grid grid-rows-4 gap-[1px] bg-black/40 ${compact ? 'p-1 w-12 h-12' : 'p-2 w-24 h-24'} rounded border border-gray-700 place-content-center`}>
            {tetromino.shape.map((row: (string | number)[], y: number) => (
                <div key={y} className="flex gap-[1px]">
                    {row.map((cell: string | number, x: number) => {
                         if (cell !== 0) {
                             return <div key={x} className={`${compact ? 'w-2 h-2' : 'w-4 h-4'} rounded-[1px]`} style={{backgroundColor: `rgb(${TETROMINOS[cell].color})`}} />
                         }
                         return <div key={x} className={`${compact ? 'w-2 h-2' : 'w-4 h-4'} bg-transparent`} />
                    })}
                </div>
            ))}
        </div>
    )
}

export default function RetroTetrisPage() {
  const {
    stage,
    movePlayer,
    dropPlayer,
    hardDrop,
    playerRotate,
    gameStats,
    setGameStats,
    resetGame,
    nextPiece,
    autoPlay,
    setAutoPlay
  } = useTetris();

  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted] = useState(true);

  // Focus handling for keyboard controls
  useEffect(() => {
    if (containerRef.current) containerRef.current.focus();
  }, []);

  // Keyboard controls
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (gameStats.gameOver) {
        if (e.key === 'r' || e.key === 'R' || e.key === 'Enter' || e.key === ' ') {
            resetGame();
        }
        return;
    }

    if (e.key === 'p' || e.key === 'P') {
        setGameStats(prev => ({ ...prev, paused: !prev.paused }));
        return;
    }

    if (e.key === 'r' || e.key === 'R') {
        resetGame();
        return;
    }

    if (e.key === 'a' || e.key === 'A') {
        setAutoPlay(prev => !prev);
        return;
    }

    if (gameStats.paused || autoPlay) return; // Disable manual controls during autoplay? Or let them override? Let's disable to avoid conflict glitches.

    if (e.key === 'ArrowLeft') movePlayer(-1);
    else if (e.key === 'ArrowRight') movePlayer(1);
    else if (e.key === 'ArrowDown') dropPlayer();
    else if (e.key === 'ArrowUp') playerRotate(stage, 1);
    else if (e.key === ' ') { e.preventDefault(); hardDrop(); }
  };

  // Prevent hydration mismatch - don't render game until client-side
  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-gray-950 flex items-center justify-center">
        <Link
          href="/"
          className="fixed top-4 left-4 z-50 bg-black border-2 border-white px-3 py-2 text-white hover:bg-white hover:text-black transition-colors cursor-pointer flex items-center gap-2"
        >
          <ArrowLeft size={16} /> BACK
        </Link>
      </div>
    );
  }

  return (
    <div
        className="fixed inset-0 bg-gray-950 text-white flex flex-col md:flex-row items-center justify-center font-pixel overflow-hidden touch-none select-none"
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        ref={containerRef}
    >
      {/* Back Button - Fixed Top Left */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 bg-black border-2 border-white px-3 py-2 text-white hover:bg-white hover:text-black transition-colors cursor-pointer flex items-center gap-2"
      >
        <ArrowLeft size={16} /> BACK
      </Link>

      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black"></div>

      {/* --- Mobile Header --- */}
      <div className="md:hidden w-full flex justify-between items-center p-3 bg-gray-900/90 border-b border-gray-800 z-20 shrink-0 h-16">
          <div className="flex flex-col">
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 leading-none">TETRIS</span>
              <span className="text-xs text-gray-500">RETRO {autoPlay && "(BOT)"}</span>
          </div>

          <div className="flex items-center gap-4">
               <div className="flex flex-col items-end">
                  <span className="text-[10px] text-gray-400">SCORE</span>
                  <span className="text-lg leading-none font-bold text-white">{gameStats.score}</span>
               </div>
               <div className="flex flex-col items-end">
                  <span className="text-[10px] text-gray-400">LINES</span>
                  <span className="text-lg leading-none font-bold text-cyan-300">{gameStats.rows}</span>
               </div>
               <div className="pl-2 border-l border-gray-700">
                   <NextPiece tetromino={nextPiece} compact={true} />
               </div>
          </div>
      </div>

      <div className="z-10 w-full md:max-w-5xl flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center h-full md:h-auto p-0 md:p-6">

        {/* --- Left Column: Stats (Desktop Only) --- */}
        <div className="hidden md:flex flex-1 w-full md:max-w-xs flex-col gap-4 order-2 md:order-1 self-start">
            <h1 className="text-5xl md:text-6xl text-left text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-bold mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-tighter">
                RETRO<br/>TETRIS
            </h1>

            <div className="bg-gray-900/80 border border-gray-700 p-6 rounded-xl shadow-2xl backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600"></div>
                {autoPlay && <div className="absolute inset-0 bg-cyan-900/10 z-0 animate-pulse pointer-events-none"></div>}

                <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <span className="text-gray-400 flex items-center gap-2"><Trophy size={16}/> SCORE</span>
                        <span className="text-2xl text-white">{gameStats.score}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <span className="text-gray-400 flex items-center gap-2"><Layers size={16}/> LINES</span>
                        <span className="text-2xl text-cyan-300">{gameStats.rows}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 flex items-center gap-2"><Zap size={16}/> LEVEL</span>
                        <span className="text-2xl text-yellow-400">{gameStats.level}</span>
                    </div>
                    {autoPlay && (
                         <div className="flex justify-center items-center mt-2 bg-cyan-900/40 p-1 rounded text-cyan-300 text-sm font-bold animate-pulse">
                            <Bot size={14} className="mr-2"/> AUTO PLAY ENGAGED
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col bg-gray-900/80 border border-gray-700 p-4 rounded-xl items-center">
                <span className="text-gray-400 mb-2 text-sm uppercase tracking-widest">Next</span>
                <NextPiece tetromino={nextPiece} />
            </div>
        </div>

        {/* --- Middle: Game Board --- */}
        <div className="relative order-1 md:order-2 flex-1 flex items-center justify-center min-h-0 w-full md:w-auto py-2 md:py-0">
            <div className={`relative h-full md:h-[80vh] aspect-[10/20] max-h-full border-[2px] md:border-[10px] rounded-lg bg-gray-900 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-colors duration-500 ${autoPlay ? 'border-cyan-900/50 shadow-cyan-900/20' : 'border-gray-800'}`}>
                {/* Grid */}
                <div
                    className="grid grid-rows-[repeat(20,minmax(0,1fr))] grid-cols-[repeat(10,minmax(0,1fr))] gap-[1px] bg-gray-900 w-full h-full"
                >
                {stage.map((row, y) =>
                    row.map((cell, x) => (
                    <Cell key={`${y}-${x}`} type={cell[0]} />
                    ))
                )}
                </div>

                {/* Overlays */}
                {gameStats.gameOver && (
                    <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center z-20 backdrop-blur-sm animate-in zoom-in duration-300 px-4 text-center">
                        <h2 className="text-3xl md:text-4xl text-cyan-400 font-bold mb-4 drop-shadow-[0_2px_0_rgba(255,255,255,0.2)]">
                            {gameStats.score === 0 && gameStats.level === 0 ? 'RETRO TETRIS' : 'GAME OVER'}
                        </h2>
                        {gameStats.score > 0 && <p className="text-gray-300 mb-6">Score: {gameStats.score}</p>}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                resetGame();
                            }}
                            className="bg-white text-black px-8 py-3 rounded font-bold text-xl hover:scale-105 transition-transform shadow-lg active:bg-gray-200 cursor-pointer"
                        >
                             {gameStats.score === 0 && gameStats.level === 0 ? 'START GAME' : 'TRY AGAIN'}
                        </button>
                    </div>
                )}

                {gameStats.paused && !gameStats.gameOver && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 backdrop-blur-sm">
                        <h2 className="text-4xl text-yellow-400 font-bold tracking-widest animate-pulse">PAUSED</h2>
                    </div>
                )}
            </div>
        </div>

        {/* --- Right/Bottom: Controls --- */}
        <div className="flex-none w-full md:w-auto md:max-w-xs flex flex-col items-center justify-end gap-2 order-3 md:order-3 pb-safe">
            <Controls
                onMove={(dir) => { if(!gameStats.paused && !gameStats.gameOver && !autoPlay) movePlayer(dir); }}
                onRotate={() => { if(!gameStats.paused && !gameStats.gameOver && !autoPlay) playerRotate(stage, 1); }}
                onDrop={() => { if(!gameStats.paused && !gameStats.gameOver && !autoPlay) dropPlayer(); }}
                onHardDrop={() => { if(!gameStats.paused && !gameStats.gameOver && !autoPlay) hardDrop(); }}
                onPause={() => setGameStats(prev => ({...prev, paused: !prev.paused}))}
                onReset={() => {
                    resetGame();
                }}
                onAutoPlay={() => setAutoPlay(prev => !prev)}
                isPaused={gameStats.paused}
                isGameOver={gameStats.gameOver}
                isAutoPlay={autoPlay}
            />
        </div>

      </div>
    </div>
  );
}
