import React from 'react';
import { CellData, CellState } from '../types';
import { MineIcon, FlagIcon, QuestionIcon } from './Icons';

interface CellProps {
  data: CellData;
  onClick: (row: number, col: number) => void;
  onRightClick: (e: React.MouseEvent, row: number, col: number) => void;
  isGameOver: boolean;
}

const NUMBER_COLORS = [
  '',
  'text-blue-700',
  'text-green-700',
  'text-red-600',
  'text-indigo-800',
  'text-red-900',
  'text-teal-700',
  'text-black',
  'text-gray-600'
];

const Cell: React.FC<CellProps> = ({ data, onClick, onRightClick }) => {
  const { row, col, state, value, isMine } = data;

  // Determine appearance based on state
  const isRevealed = state === CellState.REVEALED;
  const isFlagged = state === CellState.FLAGGED;
  const isQuestion = state === CellState.QUESTION;

  // Increased size for mobile friendliness (w-8 h-8 is 32px)
  const baseClasses = `
    w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center text-xl font-bold select-none cursor-default
  `;

  if (isRevealed) {
    if (isMine) {
      // Revealed Mine
      return (
        <div
          className={`${baseClasses} bg-win-c0 border border-gray-400`}
        >
           <MineIcon className="w-5 h-5" />
        </div>
      );
    }
    // Revealed Number or Empty
    return (
      <div className={`${baseClasses} border border-gray-400 bg-win-c0 text-center ${NUMBER_COLORS[value] || 'text-black'}`}>
        {value > 0 ? value : ''}
      </div>
    );
  }

  // Hidden / Flagged / Question
  return (
    <div
      onClick={() => onClick(row, col)}
      onContextMenu={(e) => onRightClick(e, row, col)}
      className={`${baseClasses} bg-win-c0 shadow-win-out active:shadow-none active:border active:border-gray-400`}
    >
      {isFlagged && <FlagIcon className="w-4 h-4" />}
      {isQuestion && <QuestionIcon className="w-4 h-4 text-black" />}
    </div>
  );
};

export default React.memo(Cell);
