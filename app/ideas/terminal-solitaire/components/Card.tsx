import React from 'react';
import { Card as CardType, Color } from '../types';
import { RANK_LABELS, SUIT_SYMBOLS } from '../constants';
import { getSuitColor } from '../utils/gameLogic';

interface CardProps {
  card?: CardType;
  onClick?: () => void;
  onDoubleClick?: () => void;
  isSelected?: boolean;
  isPlaceholder?: boolean;
  className?: string;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
}

const Card: React.FC<CardProps> = ({
  card,
  onClick,
  onDoubleClick,
  isSelected,
  isPlaceholder,
  className,
  draggable,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  // Common dimensions: fluid on mobile (approx 1/7th width minus gaps), fixed on tablet/desktop
  const baseDimensions = "w-[12vw] h-[16.8vw] sm:w-20 sm:h-28 md:w-24 md:h-32 max-w-[80px] max-h-[112px] sm:max-w-none sm:max-h-none";

  if (isPlaceholder || !card) {
    return (
      <div
        onClick={onClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`${baseDimensions} border-2 border-dashed border-term-border/30 rounded-md sm:rounded-lg flex items-center justify-center cursor-pointer ${className || ''} ${isSelected ? 'ring-2 ring-term-yellow bg-term-yellow/10' : ''}`}
      >
        <span className="text-term-border/20 text-xl sm:text-2xl font-mono">[]</span>
      </div>
    );
  }

  if (!card.isFaceUp) {
    return (
      <div
        onClick={onClick}
        className={`${baseDimensions} border-2 border-term-white rounded-md sm:rounded-lg relative overflow-hidden bg-term-bg cursor-pointer card-pattern shadow-lg transition-transform ${isSelected ? '-translate-y-2 ring-2 ring-term-yellow' : ''} ${className || ''}`}
      >
        {/* Card back visual */}
      </div>
    );
  }

  const color = getSuitColor(card.suit);
  const textColor = color === Color.RED ? 'text-term-red' : 'text-term-white';
  const symbol = SUIT_SYMBOLS[card.suit];
  const label = RANK_LABELS[card.rank];

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={`
        ${baseDimensions} border-2 border-term-white rounded-md sm:rounded-lg
        bg-term-bg relative cursor-pointer select-none shadow-lg
        flex flex-col justify-between p-1 sm:p-2
        font-mono font-bold
        transition-all duration-100
        ${isSelected ? 'ring-2 ring-term-yellow -translate-y-1 z-50 bg-term-white/5' : ''}
        ${textColor}
        ${className || ''}
      `}
    >
      {/* Top Left */}
      <div className="flex flex-col items-center leading-none self-start">
        <span className="text-[10px] sm:text-sm md:text-base">{label}</span>
        <span className="text-[10px] sm:text-sm md:text-base">{symbol}</span>
      </div>

      {/* Center Big Symbol */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
         <span className="text-2xl sm:text-4xl md:text-5xl">{symbol}</span>
      </div>

      {/* Bottom Right */}
      <div className="flex flex-col items-center leading-none self-end rotate-180">
        <span className="text-[10px] sm:text-sm md:text-base">{label}</span>
        <span className="text-[10px] sm:text-sm md:text-base">{symbol}</span>
      </div>
    </div>
  );
};

export default Card;
