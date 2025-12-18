'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Difficulty, GameStatus, CellData, CellState, DIFFICULTY_CONFIGS } from './types';
import { createEmptyBoard, initializeBoard, revealCell, toggleFlag, checkWin, revealAllMines } from './utils/gameLogic';
import Cell from './components/Cell';
import Controls from './components/Controls';

export default function MinesweeperPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.BEGINNER);
  const [board, setBoard] = useState<CellData[][]>([]);
  const [status, setStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [timer, setTimer] = useState(0);
  const [minesRemaining, setMinesRemaining] = useState(0);
  const [isFlagMode, setIsFlagMode] = useState(false);

  const timerRef = useRef<number | null>(null);
  const boardRef = useRef<HTMLDivElement>(null); // For scrolling/centering

  // Initialize empty board on load or difficulty change
  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  // Timer Logic
  useEffect(() => {
    if (status === GameStatus.PLAYING) {
      timerRef.current = window.setInterval(() => {
        setTimer(t => Math.min(t + 1, 999));
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  const resetGame = () => {
    const config = DIFFICULTY_CONFIGS[difficulty];
    setBoard(createEmptyBoard(config.rows, config.cols));
    setStatus(GameStatus.IDLE);
    setTimer(0);
    setMinesRemaining(config.mines);
  };

  const handleManualReveal = (row: number, col: number) => {
    if (status === GameStatus.WON || status === GameStatus.LOST) return;
    if (board[row][col].state === CellState.FLAGGED) return;

    let currentBoard = board;

    // First Click Initialization
    if (status === GameStatus.IDLE) {
      const config = DIFFICULTY_CONFIGS[difficulty];
      currentBoard = initializeBoard(config.rows, config.cols, config.mines, row, col);
      setStatus(GameStatus.PLAYING);
    }

    const { newBoard, exploded } = revealCell(currentBoard, row, col);
    setBoard(newBoard);

    if (exploded) {
      setStatus(GameStatus.LOST);
      setBoard(revealAllMines(newBoard));
    } else {
      if (checkWin(newBoard)) {
        setStatus(GameStatus.WON);
        setMinesRemaining(0); // Force counter to 0 on win
      }
    }
  };

  const handleManualFlag = (row: number, col: number) => {
    if (status === GameStatus.WON || status === GameStatus.LOST) return;
    // Cannot flag if idle (game hasn't started really).

    // Check if revealed - can't flag revealed
    if (board[row][col].state === CellState.REVEALED) return;

    const newBoard = toggleFlag(board, row, col);
    setBoard(newBoard);

    // Update mines remaining count robustly
    const flags = newBoard.flat().filter(c => c.state === CellState.FLAGGED).length;
    const totalMines = DIFFICULTY_CONFIGS[difficulty].mines;
    setMinesRemaining(totalMines - flags);
  };

  const handleCellClick = (row: number, col: number) => {
    if (isFlagMode) {
      handleManualFlag(row, col);
    } else {
      handleManualReveal(row, col);
    }
  };

  const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    handleManualFlag(row, col);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 sm:p-4 bg-teal-700 select-none">

      {/* Back Button */}
      <Link
        href="/"
        className="fixed top-4 left-4 bg-win-gray text-black px-3 py-1.5 border-2 border-win-light border-r-win-dark border-b-win-dark shadow-win-out hover:shadow-win-in active:shadow-win-in font-sans text-sm"
      >
        ← Back
      </Link>

      {/* Game Window */}
      <div className="bg-win-gray p-1 border-4 border-win-light border-r-win-dark border-b-win-dark shadow-2xl max-w-full">

        {/* Header / Title Bar (Optional aesthetic) */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-2 py-1 mb-1 font-bold text-sm flex justify-between items-center">
          <span className="truncate">Minesweeper.exe</span>
          <div className="flex gap-1 flex-shrink-0">
             <div className="w-4 h-4 bg-win-gray text-black flex items-center justify-center text-xs border border-win-light shadow-win-out cursor-pointer leading-none">−</div>
             <div className="w-4 h-4 bg-win-gray text-black flex items-center justify-center text-[10px] border border-win-light shadow-win-out cursor-pointer">X</div>
          </div>
        </div>

        {/* Menu Bar (Difficulty Selector) */}
        <div className="flex gap-4 mb-3 text-sm px-1 overflow-x-auto pb-1">
          {Object.values(Difficulty).map(d => (
            <button
              key={d}
              onClick={() => {
                 setDifficulty(d);
                 setIsFlagMode(false); // Reset mode on difficulty change
              }}
              className={`whitespace-nowrap hover:underline ${difficulty === d ? 'font-bold' : ''}`}
            >
              {d.charAt(0) + d.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Inner Bezel Container */}
        <div className="border-4 border-win-dark border-r-win-light border-b-win-light p-2 sm:p-3 bg-win-gray">

          <Controls
            minesLeft={minesRemaining}
            timer={timer}
            status={status}
            onReset={resetGame}
            isFlagMode={isFlagMode}
            onToggleFlagMode={() => setIsFlagMode(!isFlagMode)}
          />

          {/* Board Container */}
          <div
            ref={boardRef}
            className="overflow-auto border-4 border-win-dark border-r-win-light border-b-win-light max-h-[65vh] max-w-[90vw] touch-manipulation"
          >
            <div
              className="grid gap-0"
              style={{
                gridTemplateColumns: `repeat(${DIFFICULTY_CONFIGS[difficulty].cols}, min-content)`
              }}
            >
              {board.map((rowArr, rIndex) => (
                rowArr.map((cellData, cIndex) => (
                  <Cell
                    key={`${rIndex}-${cIndex}`}
                    data={cellData}
                    onClick={handleCellClick}
                    onRightClick={handleRightClick}
                    isGameOver={status === GameStatus.WON || status === GameStatus.LOST}
                  />
                ))
              ))}
            </div>
          </div>

        </div>

        {/* Status Bar */}
        <div className="mt-1 text-xs border-t border-gray-400 pt-1 text-gray-800 min-h-[1.5rem] font-sans">
          <span>{isFlagMode ? "Mode: Place Flags" : "Mode: Reveal"}</span>
        </div>

      </div>

      <div className="mt-4 text-white/50 text-xs text-center font-sans">
        <p className="hidden sm:block">Left Click: Reveal | Right Click: Flag</p>
        <p className="sm:hidden">Tap: Reveal/Flag | Use Toggle Button</p>
      </div>
    </div>
  );
}
