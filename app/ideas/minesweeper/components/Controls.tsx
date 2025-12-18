import React from 'react';
import DigitalDisplay from './DigitalDisplay';
import { GameStatus } from '../types';
import { FlagIcon, ShovelIcon } from './Icons';

interface ControlsProps {
  minesLeft: number;
  timer: number;
  status: GameStatus;
  onReset: () => void;
  isFlagMode: boolean;
  onToggleFlagMode: () => void;
}

const Controls: React.FC<ControlsProps> = ({ minesLeft, timer, status, onReset, isFlagMode, onToggleFlagMode }) => {
  
  const getFace = () => {
    switch (status) {
      case GameStatus.WON: return '😎';
      case GameStatus.LOST: return '😵';
      case GameStatus.PLAYING: return '🙂'; // Active
      default: return '🙂';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-win-gray p-2 border-b-4 border-l-4 border-win-light border-r-4 border-t-4 border-win-dark mb-4 shadow-inner gap-3 sm:gap-2">
      
      {/* Top Row on Mobile: Counters and Face */}
      <div className="flex justify-between w-full sm:w-auto sm:contents">
        <DigitalDisplay value={minesLeft} />
        
        <div className="flex gap-2">
          {/* Flag Mode Toggle (Visible on all sizes, crucial for mobile) */}
          <button
            onClick={onToggleFlagMode}
            className={`
              w-10 h-10 flex items-center justify-center border-2
              ${isFlagMode 
                ? 'bg-gray-300 border-win-dark border-r-win-light border-b-win-light shadow-win-in' 
                : 'bg-win-gray border-win-light border-r-win-dark border-b-win-dark shadow-win-out'
              } 
              active:shadow-win-in active:translate-y-[1px]
            `}
            aria-label="Toggle Flag Mode"
            title={isFlagMode ? "Flag Mode On" : "Dig Mode On"}
          >
            {isFlagMode ? <FlagIcon className="w-5 h-5" /> : <ShovelIcon className="w-5 h-5 text-gray-700" />}
          </button>

          <button 
            onClick={onReset}
            className="w-10 h-10 bg-win-gray border-2 border-win-light border-r-win-dark border-b-win-dark shadow-win-out active:shadow-win-in flex items-center justify-center text-2xl active:translate-y-[1px]"
            aria-label="Reset Game"
          >
            {getFace()}
          </button>
        </div>

        <DigitalDisplay value={timer} />
      </div>
    </div>
  );
};

export default Controls;