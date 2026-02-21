import React, { useState } from 'react';
import { Chess, Square, Piece } from 'chess.js';

interface ChessBoardProps {
  game: Chess;
  onMove: (source: Square, target: Square) => void;
  orientation?: 'w' | 'b';
  lastMove: { from: string; to: string } | null;
}

// Unicode Chess Pieces
// Outline symbols for terminal themes
const PIECE_UNICODE_OUTLINE: Record<string, Record<string, string>> = {
  w: { p: '♙', n: '♘', b: '♗', r: '♖', q: '♕', k: '♔' },
  b: { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚' }
};
// Filled symbols for modern theme (use filled black pieces for both, colored via fill)
const PIECE_UNICODE_FILLED: Record<string, string> = {
  p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚'
};

const AsciiPiece: React.FC<{ type: string; color: string; isModern?: boolean }> = ({ type, color, isModern = false }) => {
  // Use filled symbols for modern theme, outline for terminal themes
  const symbol = isModern
    ? PIECE_UNICODE_FILLED[type]
    : PIECE_UNICODE_OUTLINE[color][type];

  // Lichess-style piece colors - solid fill with opposite color outline
  const pieceColor = isModern
    ? (color === 'w' ? '#ffffff' : '#1a1a1a')
    : 'currentColor';

  // Pieces get opposite color border for visibility
  const strokeColor = isModern ? (color === 'w' ? '#1a1a1a' : '#ffffff') : 'none';
  const strokeWidth = isModern ? '3' : '0';

  return (
    <div className="w-full h-full flex items-center justify-center select-none pointer-events-none">
       {/* Use SVG for perfect scaling text */}
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

const ChessBoard: React.FC<ChessBoardProps> = ({ game, onMove, lastMove }) => {
  const [draggedPiece, setDraggedPiece] = useState<{ piece: Piece; square: Square } | null>(null);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [hoverSquare, setHoverSquare] = useState<Square | null>(null);
  const [isModernTheme, setIsModernTheme] = useState(false);

  // Detect if modern theme is active
  React.useEffect(() => {
    const checkTheme = () => {
      setIsModernTheme(document.body.classList.contains('theme-modern'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const board = game.board();

  const getSquare = (row: number, col: number): Square => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    return `${files[col]}${ranks[row]}` as Square;
  };

  const getLegalMoves = (square: Square) => {
    return game.moves({ square, verbose: true }).map((m: { to: string }) => m.to as Square);
  };

  // --- Click / Touch Handling ---
  const handleSquareClick = (square: Square) => {
    if (draggedPiece) return;

    const piece = game.get(square);
    const isOwnPiece = piece && piece.color === game.turn();
    const isLegalMove = legalMoves.includes(square);

    // Case 1: Clicking a legal move target (Move)
    if (selectedSquare && isLegalMove) {
      onMove(selectedSquare, square);
      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }

    // Case 1.5: Castling by clicking King then Rook
    if (selectedSquare && piece && isOwnPiece) {
      const selectedPiece = game.get(selectedSquare);

      // Check if we're trying to castle (clicking rook after selecting king)
      if (selectedPiece && selectedPiece.type === 'k' && piece.type === 'r' && piece.color === selectedPiece.color) {
        let castleTarget: Square | null = null;

        // Determine the castling target square
        if (selectedSquare === 'e1') {
          if (square === 'h1') castleTarget = 'g1';
          if (square === 'a1') castleTarget = 'c1';
        } else if (selectedSquare === 'e8') {
          if (square === 'h8') castleTarget = 'g8';
          if (square === 'a8') castleTarget = 'c8';
        }

        // Verify it's a legal castle move
        if (castleTarget && legalMoves.includes(castleTarget)) {
          onMove(selectedSquare, castleTarget);
          setSelectedSquare(null);
          setLegalMoves([]);
          return;
        }
      }
    }

    // Case 2: Clicking own piece (Select / Change Selection)
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

    // Case 3: Clicking empty or enemy square that isn't a legal move (Deselect)
    setSelectedSquare(null);
    setLegalMoves([]);
  };

  // --- Drag and Drop Handling ---
  const handleDragStart = (e: React.DragEvent, piece: Piece, square: Square) => {
    if (piece.color !== game.turn()) {
        e.preventDefault();
        return;
    }
    e.dataTransfer.setData('text/plain', square);
    e.dataTransfer.effectAllowed = 'move';

    setDraggedPiece({ piece, square });
    setSelectedSquare(square);
    setLegalMoves(getLegalMoves(square));
  };

  const handleDragOver = (e: React.DragEvent, square: Square) => {
    e.preventDefault();
    setHoverSquare(square);
  };

  const handleDrop = (e: React.DragEvent, targetSquare: Square) => {
    e.preventDefault();
    const sourceSquare = e.dataTransfer.getData('text/plain') as Square;
    setHoverSquare(null);
    setLegalMoves([]);
    setDraggedPiece(null);
    setSelectedSquare(null);

    if (sourceSquare !== targetSquare) {
      let actualTargetSquare = targetSquare;
      const piece = game.get(sourceSquare);
      const targetPiece = game.get(targetSquare);

      // Support Castling by dragging King onto Rook
      if (piece && piece.type === 'k' && targetPiece && targetPiece.type === 'r' && piece.color === targetPiece.color) {
         if (sourceSquare === 'e1') {
             if (targetSquare === 'h1') actualTargetSquare = 'g1';
             if (targetSquare === 'a1') actualTargetSquare = 'c1';
         } else if (sourceSquare === 'e8') {
             if (targetSquare === 'h8') actualTargetSquare = 'g8';
             if (targetSquare === 'a8') actualTargetSquare = 'c8';
         }
      }

      // Validate move (includes En Passant and Castling logic from chess.js)
      try {
          const moves = game.moves({ square: sourceSquare as Square, verbose: true });
          const isLegal = moves.some((m: { to: string }) => m.to === actualTargetSquare);

          if (isLegal) {
              onMove(sourceSquare, actualTargetSquare);
          }
      } catch {
          // ignore invalid moves
      }
    }
  };

  const handleDragEnd = () => {
    setHoverSquare(null);
    setLegalMoves([]);
    setDraggedPiece(null);
    setSelectedSquare(null);
  };

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
            const isHovered = hoverSquare === square;
            const isLastMoveFrom = lastMove?.from === square;
            const isLastMoveTo = lastMove?.to === square;
            const isSelected = selectedSquare === square;

            // Coloring - Modern (Lichess) vs Terminal
            let bgClass = '';
            let textClass = '';

            if (isModernTheme) {
              // Lichess-style solid colors
              textClass = 'text-[#1a1a1a]';
              bgClass = isLight ? 'bg-[var(--board-light)]' : 'bg-[var(--board-dark)]';

              if (isLastMoveFrom || isLastMoveTo) {
                bgClass = isLight ? 'bg-[var(--board-highlight-light)]' : 'bg-[var(--board-highlight-dark)]';
              }
              if (isSelected) {
                bgClass = isLight ? 'bg-[var(--board-selected-light)]' : 'bg-[var(--board-selected-dark)]';
              }
              if (isHovered && isLegal) {
                bgClass = 'bg-[#82c882]';
              }
              if (isHovered && draggedPiece?.piece.type === 'k' && piece?.type === 'r' && piece.color === draggedPiece.piece.color) {
                bgClass = 'bg-[#82c882]';
              }
            } else {
              // Terminal ASCII coloring
              textClass = 'text-[var(--term-main)]';
              bgClass = 'bg-[var(--term-bg)]';

              if (!isLight) {
                  // Crosshatch effect for dark squares
                  bgClass = 'bg-[linear-gradient(45deg,rgba(var(--term-dim-rgb),0.2)_25%,transparent_25%,transparent_75%,rgba(var(--term-dim-rgb),0.2)_75%,rgba(var(--term-dim-rgb),0.2)),linear-gradient(45deg,rgba(var(--term-dim-rgb),0.2)_25%,transparent_25%,transparent_75%,rgba(var(--term-dim-rgb),0.2)_75%,rgba(var(--term-dim-rgb),0.2))] bg-[length:4px_4px] bg-[position:0_0,2px_2px]';
              }

              if (isLastMoveFrom || isLastMoveTo) {
                 bgClass = 'bg-[rgba(var(--term-main-rgb),0.2)]';
              }
              if (isSelected) {
                  bgClass = 'bg-[rgba(var(--term-main-rgb),0.4)]';
              }
              if (isHovered && isLegal) {
                  bgClass = 'bg-[var(--term-main)]';
                  textClass = 'text-[var(--term-bg)]';
              }
              if (isHovered && draggedPiece?.piece.type === 'k' && piece?.type === 'r' && piece.color === draggedPiece.piece.color) {
                   bgClass = 'bg-[rgba(var(--term-main-rgb),0.6)]';
                   textClass = 'text-[var(--term-bg)]';
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
                onDragOver={(e) => handleDragOver(e, square)}
                onDrop={(e) => handleDrop(e, square)}
                onClick={() => handleSquareClick(square)}
              >
                {/* Ranks */}
                {colIndex === 0 && (
                  <span className={`absolute top-[2%] left-[3%] text-[10px] md:text-[clamp(8px,1.5vw,12px)] ${isModernTheme ? '' : 'opacity-70'} ${coordColor} font-sans leading-none z-30 font-bold`}>
                    {square.charAt(1)}
                  </span>
                )}

                {/* Files */}
                {rowIndex === 7 && (
                  <span className={`absolute bottom-[2%] right-[3%] text-[10px] md:text-[clamp(8px,1.5vw,12px)] ${isModernTheme ? '' : 'opacity-70'} ${coordColor} font-sans leading-none z-30 font-bold`}>
                    {square.charAt(0)}
                  </span>
                )}

                {/* Legal Move Marker */}
                {isLegal && !piece && (
                  <button
                    onClick={() => handleSquareClick(square)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSquareClick(square);
                      }
                    }}
                    aria-label={`Move to ${square}`}
                    className={`${isModernTheme
                      ? "w-[30%] h-[30%] rounded-full bg-black/20"
                      : "w-[20%] h-[20%] rounded-full bg-[var(--term-main)] opacity-60"
                    } cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--term-main)]`}
                  />
                )}
                 {isLegal && piece && (
                  <button
                    onClick={() => handleSquareClick(square)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSquareClick(square);
                      }
                    }}
                    aria-label={`Capture on ${square}`}
                    className={isModernTheme
                      ? "absolute inset-0 rounded-full border-[6px] border-black/20 z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#81b64c]"
                      : "absolute inset-0 border-2 border-dashed border-[var(--term-main)] motion-safe:animate-pulse z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--term-main)]"
                    }
                  />
                )}

                {/* Piece */}
                {piece && (
                  <div
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, piece, square)}
                    onDragEnd={handleDragEnd}
                    tabIndex={piece.color === game.turn() ? 0 : -1}
                    role="button"
                    aria-label={`${piece.color === 'w' ? 'White' : 'Black'} ${piece.type === 'p' ? 'pawn' : piece.type === 'n' ? 'knight' : piece.type === 'b' ? 'bishop' : piece.type === 'r' ? 'rook' : piece.type === 'q' ? 'queen' : 'king'} on ${square}${isSelected ? ', selected' : ''}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSquareClick(square);
                      }
                    }}
                    className={`w-full h-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-90 transition-transform ${textClass} z-20 focus:outline-none focus:ring-2 focus:ring-[var(--term-main)] focus:ring-inset`}
                    style={{ opacity: draggedPiece?.square === square ? 0.5 : 1 }}
                  >
                    <AsciiPiece type={piece.type} color={piece.color} isModern={isModernTheme} />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChessBoard;
