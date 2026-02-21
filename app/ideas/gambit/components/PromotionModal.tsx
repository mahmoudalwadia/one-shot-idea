'use client';

import React, { useState, useEffect } from 'react';

type PieceType = 'q' | 'r' | 'b' | 'n';

interface PromotionModalProps {
  color: 'w' | 'b';
  onSelect: (piece: PieceType) => void;
  onCancel: () => void;
}

// Filled Unicode symbols for pieces
const PIECE_SYMBOLS: Record<PieceType, string> = {
  q: '♛',
  r: '♜',
  b: '♝',
  n: '♞',
};

const PIECE_NAMES: Record<PieceType, string> = {
  q: 'Queen',
  r: 'Rook',
  b: 'Bishop',
  n: 'Knight',
};

const PromotionModal: React.FC<PromotionModalProps> = ({ color, onSelect, onCancel }) => {
  const [isModernTheme, setIsModernTheme] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsModernTheme(document.body.classList.contains('theme-modern'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const pieces: PieceType[] = ['q', 'r', 'b', 'n'];

  // Modern theme colors - matching ChessBoard piece styling
  const pieceColor = isModernTheme
    ? (color === 'w' ? '#ffffff' : '#1a1a1a')
    : 'var(--term-main)';
  const strokeColor = isModernTheme
    ? (color === 'w' ? '#1a1a1a' : '#ffffff')
    : 'none';
  // White pieces get bolder stroke for better visibility
  const strokeWidth = isModernTheme ? (color === 'w' ? '5' : '3') : '0';

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      style={{ overscrollBehavior: 'contain' }}
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="promotion-modal-title"
    >
      <div
        className={`
          ${isModernTheme
            ? 'bg-[#312e2b] border-2 border-[#5c5955] rounded-lg shadow-xl'
            : 'bg-[var(--term-bg)] border-2 border-[var(--term-main)] shadow-[0_0_20px_rgba(var(--term-main-rgb),0.3)]'
          }
          p-4 flex flex-col items-center
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          id="promotion-modal-title"
          className={`
          text-lg mb-3 uppercase font-bold
          ${isModernTheme ? 'text-[#bababa] font-sans' : 'text-[var(--term-main)] terminal-text-shadow'}
        `}>
          Promote Pawn
        </h3>

        <div className="flex gap-2">
          {pieces.map((piece) => (
            <button
              key={piece}
              onClick={() => onSelect(piece)}
              aria-label={`Promote to ${PIECE_NAMES[piece]}`}
              className={`
                w-16 h-16 md:w-20 md:h-20 flex items-center justify-center cursor-pointer
                transition-all duration-150 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2
                ${isModernTheme
                  ? 'bg-[#b58863] hover:bg-[#cdd26a] rounded focus:ring-[#cdd26a]'
                  : 'border border-[var(--term-main)] hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] focus:ring-[var(--term-main)]'
                }
              `}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ overflow: 'visible' }}>
                <text
                  x="50"
                  y="55"
                  fontSize="70"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={pieceColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  paintOrder="stroke fill"
                  style={{
                    fontFamily: '"Apple Symbols", "Segoe UI Symbol", "DejaVu Sans", "Noto Sans Symbols", sans-serif',
                  }}
                >
                  {PIECE_SYMBOLS[piece]}
                </text>
              </svg>
            </button>
          ))}
        </div>

        <button
          onClick={onCancel}
          className={`
            mt-3 px-4 py-1 text-sm uppercase cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
            ${isModernTheme
              ? 'text-[#8b8987] hover:text-[#bababa] font-sans focus-visible:ring-[#cdd26a]'
              : 'text-[var(--term-dim)] hover:text-[var(--term-main)] focus-visible:ring-[var(--term-main)]'
            }
          `}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PromotionModal;
