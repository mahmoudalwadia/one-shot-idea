'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Chess, Square, Piece } from 'chess.js';
import { Arrow, Highlight, ANNOTATION_COLORS } from '../data/types';

interface LessonBoardProps {
  fen: string;
  onMove?: (from: Square, to: Square) => void;
  arrows?: Arrow[];
  highlights?: Highlight[];
  interactive?: boolean;
  lastMove?: { from: string; to: string } | null;
  orientation?: 'w' | 'b';
}

// Unicode pieces
const PIECE_UNICODE_OUTLINE: Record<string, Record<string, string>> = {
  w: { p: '♙', n: '♘', b: '♗', r: '♖', q: '♕', k: '♔' },
  b: { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚' }
};

const PIECE_UNICODE_FILLED: Record<string, string> = {
  p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚'
};

const AsciiPiece: React.FC<{ type: string; color: string; isModern?: boolean }> = ({ type, color, isModern = false }) => {
  const symbol = isModern
    ? PIECE_UNICODE_FILLED[type]
    : PIECE_UNICODE_OUTLINE[color][type];

  const pieceColor = isModern
    ? (color === 'w' ? '#ffffff' : '#1a1a1a')
    : 'currentColor';

  const strokeColor = isModern ? (color === 'w' ? '#1a1a1a' : '#ffffff') : 'none';
  const strokeWidth = isModern ? (color === 'w' ? '5' : '3') : '0';

  return (
    <div className="w-full h-full flex items-center justify-center select-none pointer-events-none">
      <svg viewBox="0 0 100 100" className="w-full h-full" style={{ overflow: 'visible' }}>
        <text
          x="50"
          y="55"
          fontSize="85"
          textAnchor="middle"
          dominantBaseline="central"
          fill={pieceColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          paintOrder="stroke fill"
          style={{
            fontFamily: '"Apple Symbols", "Segoe UI Symbol", "DejaVu Sans", "Noto Sans Symbols", sans-serif',
            filter: isModern ? 'none' : 'drop-shadow(0 0 4px rgba(var(--term-main-rgb), 0.4))'
          }}
        >
          {symbol}
        </text>
      </svg>
    </div>
  );
};

// Convert square notation to coordinates (0-7)
const squareToCoords = (square: string): { row: number; col: number } => {
  const col = square.charCodeAt(0) - 97; // 'a' = 0
  const row = 8 - parseInt(square[1]);   // '8' = 0, '1' = 7
  return { row, col };
};

// Convert coordinates to percentage for SVG
const coordsToPercent = (row: number, col: number): { x: number; y: number } => {
  return {
    x: col * 12.5 + 6.25,  // Center of square
    y: row * 12.5 + 6.25
  };
};

// Default starting position FEN
const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

// Validate FEN string
const isValidFen = (fen: string): boolean => {
  if (!fen || typeof fen !== 'string') return false;
  const parts = fen.trim().split(/\s+/);
  return parts.length === 6;
};

const LessonBoard: React.FC<LessonBoardProps> = ({
  fen,
  onMove,
  arrows = [],
  highlights = [],
  interactive = false,
  lastMove = null,
}) => {
  // Compute board directly from FEN - no state, no useEffect sync issues
  // This is the single source of truth: fen prop changes → useMemo runs → board updates
  const { board, game } = useMemo(() => {
    const g = new Chess();
    const validFen = isValidFen(fen) ? fen : START_FEN;
    try {
      g.load(validFen);
    } catch {
      console.warn('Invalid FEN, using start position:', fen);
      g.load(START_FEN);
    }
    return { board: g.board(), game: g };
  }, [fen]);

  // Only UI interaction state - not FEN/board related
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [isModernTheme, setIsModernTheme] = useState(false);

  // Reset selection when FEN changes (new position = clear selection)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Reset UI state when position changes
    setSelectedSquare(null);
     
    setLegalMoves([]);
  }, [fen]);

  // Detect theme
  useEffect(() => {
    const checkTheme = () => {
      setIsModernTheme(document.body.classList.contains('theme-modern'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const getSquare = (row: number, col: number): Square => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    return `${files[col]}${ranks[row]}` as Square;
  };

  const getLegalMoves = (square: Square) => {
    return game.moves({ square, verbose: true }).map((m) => m.to as Square);
  };

  const handleSquareClick = (square: Square) => {
    if (!interactive || !onMove) return;

    const piece = game.get(square);
    const isOwnPiece = piece && piece.color === game.turn();
    const isLegalMove = legalMoves.includes(square);

    // Click on legal move target
    if (selectedSquare && isLegalMove) {
      onMove(selectedSquare, square);
      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }

    // Click on own piece - select it
    if (isOwnPiece) {
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setLegalMoves([]);
      } else {
        setSelectedSquare(square);
        setLegalMoves(getLegalMoves(square));
      }
      return;
    }

    // Click elsewhere - deselect
    setSelectedSquare(null);
    setLegalMoves([]);
  };

  // Build highlight map for quick lookup
  const highlightMap = useMemo(() => {
    const map: Record<string, string> = {};
    highlights.forEach(h => {
      map[h.square] = ANNOTATION_COLORS[h.color];
    });
    return map;
  }, [highlights]);

  const isLightSquare = (row: number, col: number) => (row + col) % 2 === 0;

  const boardContainerClass = isModernTheme
    ? "w-full h-full relative select-none rounded-sm overflow-hidden shadow-lg"
    : "w-full h-full relative select-none p-1 border-2 border-[var(--term-main)] shadow-[0_0_15px_rgba(var(--term-main-rgb),0.2)] bg-[var(--term-bg)]";

  const boardGridClass = isModernTheme
    ? "grid grid-cols-8 grid-rows-8 w-full h-full"
    : "grid grid-cols-8 grid-rows-8 w-full h-full border border-[var(--term-main)] bg-[var(--term-bg)]";

  return (
    <div className={boardContainerClass}>
      {/* Board Grid */}
      <div className={boardGridClass}>
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const square = getSquare(rowIndex, colIndex);
            const isLight = isLightSquare(rowIndex, colIndex);
            const isLegal = legalMoves.includes(square);
            const isLastMoveFrom = lastMove?.from === square;
            const isLastMoveTo = lastMove?.to === square;
            const isSelected = selectedSquare === square;
            const highlightColor = highlightMap[square];

            let bgClass = '';
            let textClass = '';

            if (isModernTheme) {
              textClass = 'text-[#1a1a1a]';
              bgClass = isLight ? 'bg-[var(--board-light)]' : 'bg-[var(--board-dark)]';

              if (isLastMoveFrom || isLastMoveTo) {
                bgClass = isLight ? 'bg-[var(--board-highlight-light)]' : 'bg-[var(--board-highlight-dark)]';
              }
              if (isSelected) {
                bgClass = isLight ? 'bg-[var(--board-selected-light)]' : 'bg-[var(--board-selected-dark)]';
              }
            } else {
              textClass = 'text-[var(--term-main)]';
              bgClass = 'bg-[var(--term-bg)]';

              if (!isLight) {
                bgClass = 'bg-[linear-gradient(45deg,rgba(var(--term-dim-rgb),0.2)_25%,transparent_25%,transparent_75%,rgba(var(--term-dim-rgb),0.2)_75%,rgba(var(--term-dim-rgb),0.2)),linear-gradient(45deg,rgba(var(--term-dim-rgb),0.2)_25%,transparent_25%,transparent_75%,rgba(var(--term-dim-rgb),0.2)_75%,rgba(var(--term-dim-rgb),0.2))] bg-[length:4px_4px] bg-[position:0_0,2px_2px]';
              }

              if (isLastMoveFrom || isLastMoveTo) {
                bgClass = 'bg-[rgba(var(--term-main-rgb),0.2)]';
              }
              if (isSelected) {
                bgClass = 'bg-[rgba(var(--term-main-rgb),0.4)]';
              }
            }

            const squareCellClass = isModernTheme
              ? `relative flex items-center justify-center w-full h-full ${bgClass} touch-manipulation transition-colors duration-100`
              : `relative flex items-center justify-center w-full h-full ${bgClass} border-[0.5px] border-[var(--term-dim)] touch-manipulation transition-colors duration-150`;

            const coordColor = isModernTheme
              ? (isLight ? 'text-[#b58863]' : 'text-[#f0d9b5]')
              : 'text-[var(--term-main)]';

            return (
              <div
                key={square}
                className={squareCellClass}
                onClick={() => handleSquareClick(square)}
                style={highlightColor ? {
                  backgroundColor: highlightColor,
                  opacity: 0.6
                } : undefined}
              >
                {/* Highlight overlay */}
                {highlightColor && (
                  <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ backgroundColor: highlightColor, opacity: 0.4 }}
                  />
                )}

                {/* Coordinates */}
                {colIndex === 0 && (
                  <span className={`absolute top-[2%] left-[3%] text-[10px] md:text-[clamp(8px,1.5vw,12px)] ${isModernTheme ? '' : 'opacity-70'} ${coordColor} font-sans leading-none z-30 font-bold`}>
                    {square.charAt(1)}
                  </span>
                )}
                {rowIndex === 7 && (
                  <span className={`absolute bottom-[2%] right-[3%] text-[10px] md:text-[clamp(8px,1.5vw,12px)] ${isModernTheme ? '' : 'opacity-70'} ${coordColor} font-sans leading-none z-30 font-bold`}>
                    {square.charAt(0)}
                  </span>
                )}

                {/* Legal move marker */}
                {interactive && isLegal && !piece && (
                  <div className={isModernTheme
                    ? "w-[30%] h-[30%] rounded-full bg-black/20 pointer-events-none"
                    : "w-[20%] h-[20%] rounded-full bg-[var(--term-main)] opacity-60 pointer-events-none"
                  } />
                )}
                {interactive && isLegal && piece && (
                  <div className={isModernTheme
                    ? "absolute inset-0 rounded-full border-[6px] border-black/20 z-10 pointer-events-none"
                    : "absolute inset-0 border-2 border-dashed border-[var(--term-main)] animate-pulse z-10 pointer-events-none"
                  } />
                )}

                {/* Piece */}
                {piece && (
                  <div className={`w-full h-full flex items-center justify-center ${interactive ? 'cursor-pointer hover:scale-110 active:scale-90' : ''} transition-transform ${textClass} z-20`}>
                    <AsciiPiece type={piece.type} color={piece.color} isModern={isModernTheme} />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Arrow Overlay - SVG on top of board */}
      {arrows.length > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-40"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Arrow markers for each color */}
            {(['green', 'yellow', 'red', 'blue'] as const).map(color => (
              <marker
                key={color}
                id={`arrowhead-${color}`}
                markerWidth="4"
                markerHeight="4"
                refX="3"
                refY="2"
                orient="auto"
              >
                <polygon
                  points="0 0, 4 2, 0 4"
                  fill={ANNOTATION_COLORS[color]}
                />
              </marker>
            ))}
          </defs>
          {arrows.map((arrow, i) => {
            const fromCoords = squareToCoords(arrow.from);
            const toCoords = squareToCoords(arrow.to);
            const from = coordsToPercent(fromCoords.row, fromCoords.col);
            const to = coordsToPercent(toCoords.row, toCoords.col);

            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={ANNOTATION_COLORS[arrow.color]}
                strokeWidth="1.5"
                strokeLinecap="round"
                markerEnd={`url(#arrowhead-${arrow.color})`}
                opacity="0.8"
              />
            );
          })}
        </svg>
      )}
    </div>
  );
};

export default LessonBoard;
