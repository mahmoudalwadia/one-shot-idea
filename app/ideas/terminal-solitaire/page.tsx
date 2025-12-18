'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card as CardType, GameState, MoveSource, PileType } from './types';
import { initializeGame, canMoveToFoundation, canMoveToTableau } from './utils/gameLogic';
import Card from './components/Card';
import { RefreshCw, Trophy, HelpCircle, X, RotateCcw } from 'lucide-react';

export default function TerminalSolitairePage() {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [history, setHistory] = useState<GameState[]>([]);
  const [selectedSource, setSelectedSource] = useState<MoveSource | null>(null);
  const [hasWon, setHasWon] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    // Check win condition
    const isWin = gameState.foundations.every(f => f.length === 13);
    if (isWin && !hasWon) {
      setHasWon(true);
    }
  }, [gameState, hasWon]);

  const saveToHistory = () => {
    setHistory(prev => [...prev, gameState]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setGameState(previousState);
    setHistory(prev => prev.slice(0, -1));
    setSelectedSource(null);
  };

  const handleRestart = () => {
    setGameState(initializeGame());
    setHistory([]);
    setSelectedSource(null);
    setHasWon(false);
  };

  const handleStockClick = () => {
    saveToHistory();
    setGameState(prev => {
      const newStock = [...prev.stock];
      const newWaste = [...prev.waste];

      if (newStock.length > 0) {
        // Draw 1 card
        const card = newStock.pop()!;
        card.isFaceUp = true;
        newWaste.push(card);
      } else {
        // Recycle waste to stock
        while (newWaste.length > 0) {
          const card = newWaste.pop()!;
          card.isFaceUp = false;
          newStock.push(card);
        }
      }

      return {
        ...prev,
        stock: newStock,
        waste: newWaste,
        moves: prev.moves + 1
      };
    });
    setSelectedSource(null);
  };

  const executeMove = (source: MoveSource, targetPileType: PileType, targetPileIndex: number) => {
    // 1. Get Cards (Validation Logic)
    let cardsToMove: CardType[] = [];
    let sourcePile: CardType[] = [];

    // Helper to access current state safely inside the setter or before
    // Since we need to validate BEFORE saving history/state, we use the closure 'gameState'
    if (source.pileType === 'waste') {
      sourcePile = gameState.waste;
      if (sourcePile.length > 0) cardsToMove = [sourcePile[sourcePile.length - 1]];
    } else if (source.pileType === 'tableau') {
      sourcePile = gameState.tableau[source.index];
      const cardIndex = source.cardIndex ?? sourcePile.length - 1;
      cardsToMove = sourcePile.slice(cardIndex);
    } else if (source.pileType === 'foundation') {
       sourcePile = gameState.foundations[source.index];
       if (sourcePile.length > 0) cardsToMove = [sourcePile[sourcePile.length - 1]];
    }

    if (cardsToMove.length === 0) return;

    const movingCard = cardsToMove[0];
    let isValid = false;
    let targetPile: CardType[] = [];

    if (targetPileType === 'foundation') {
      targetPile = gameState.foundations[targetPileIndex];
      if (cardsToMove.length === 1 && canMoveToFoundation(movingCard, targetPile)) {
        isValid = true;
      }
    } else if (targetPileType === 'tableau') {
      targetPile = gameState.tableau[targetPileIndex];
      if (canMoveToTableau(movingCard, targetPile)) {
        isValid = true;
      }
    }

    if (isValid) {
      saveToHistory();
      setGameState(prev => {
        const newGameState = {
          ...prev,
          foundations: [...prev.foundations.map(f => [...f])],
          tableau: [...prev.tableau.map(t => [...t])],
          waste: [...prev.waste],
          moves: prev.moves + 1
        };

        // Remove from source
        if (source.pileType === 'waste') {
          newGameState.waste.pop();
        } else if (source.pileType === 'tableau') {
           const indexToRemove = source.cardIndex ?? (sourcePile.length - cardsToMove.length);
           newGameState.tableau[source.index].splice(indexToRemove, cardsToMove.length);

           // Flip new top card
           const tableauCol = newGameState.tableau[source.index];
           if (tableauCol.length > 0 && !tableauCol[tableauCol.length - 1].isFaceUp) {
             tableauCol[tableauCol.length - 1].isFaceUp = true;
             newGameState.score += 5;
           }
        } else if (source.pileType === 'foundation') {
            newGameState.foundations[source.index].pop();
        }

        // Add to target
        if (targetPileType === 'foundation') {
          newGameState.foundations[targetPileIndex].push(movingCard);
          newGameState.score += 10;
        } else if (targetPileType === 'tableau') {
          newGameState.tableau[targetPileIndex].push(...cardsToMove);
        }

        return newGameState;
      });
      setSelectedSource(null);
    }
  };

  const handleInteraction = (pileType: PileType, pileIndex: number, cardIndex?: number) => {
      if (!selectedSource) {
          // SELECTING
          let isValidSource = false;
          if (pileType === 'waste' && gameState.waste.length > 0) isValidSource = true;
          if (pileType === 'foundation' && gameState.foundations[pileIndex].length > 0) isValidSource = true;
          if (pileType === 'tableau') {
             const pile = gameState.tableau[pileIndex];
             if (cardIndex !== undefined && pile[cardIndex]?.isFaceUp) isValidSource = true;
          }

          if (isValidSource) {
              setSelectedSource({ pileType, index: pileIndex, cardIndex });
          }
          return;
      }

      // MOVING or DESELECTING or SWITCHING
      if (selectedSource.pileType === pileType && selectedSource.index === pileIndex && selectedSource.cardIndex === cardIndex) {
          setSelectedSource(null);
          return;
      }

      // Check for move validity via duplicate logic to avoid invalid history entries
      // (Simplified check for UI responsiveness)
      let potentialMoveValid = false;
      let cardsToMove: CardType[] = [];

      // Re-grab source cards based on current state
      if (selectedSource.pileType === 'waste') cardsToMove = [gameState.waste[gameState.waste.length-1]];
      else if (selectedSource.pileType === 'foundation') cardsToMove = [gameState.foundations[selectedSource.index][gameState.foundations[selectedSource.index].length-1]];
      else if (selectedSource.pileType === 'tableau') cardsToMove = gameState.tableau[selectedSource.index].slice(selectedSource.cardIndex ?? gameState.tableau[selectedSource.index].length-1);

      if (cardsToMove.length > 0) {
          if (pileType === 'foundation') {
              if (cardsToMove.length === 1 && canMoveToFoundation(cardsToMove[0], gameState.foundations[pileIndex])) potentialMoveValid = true;
          } else if (pileType === 'tableau') {
              if (canMoveToTableau(cardsToMove[0], gameState.tableau[pileIndex])) potentialMoveValid = true;
          }
      }

      if (potentialMoveValid) {
          executeMove(selectedSource, pileType, pileIndex);
      } else {
          // If invalid move, select new source if valid
          let isNewSourceValid = false;
          if (pileType === 'waste' && gameState.waste.length > 0) isNewSourceValid = true;
          if (pileType === 'foundation' && gameState.foundations[pileIndex].length > 0) isNewSourceValid = true;
          if (pileType === 'tableau') {
             const pile = gameState.tableau[pileIndex];
             if (cardIndex !== undefined && pile[cardIndex]?.isFaceUp) isNewSourceValid = true;
          }

          if (isNewSourceValid) {
             setSelectedSource({ pileType, index: pileIndex, cardIndex });
          } else {
              setSelectedSource(null);
          }
      }
  };

  const handleDoubleClick = (pileType: PileType, pileIndex: number, cardIndex?: number) => {
    let card: CardType | null = null;
    let isTopCard = false;

    // Identify card
    if (pileType === 'waste' && gameState.waste.length > 0) {
        card = gameState.waste[gameState.waste.length - 1];
        isTopCard = true;
    } else if (pileType === 'tableau') {
        const pile = gameState.tableau[pileIndex];
        if (pile.length > 0) {
            const top = pile[pile.length - 1];
            if (cardIndex === undefined || cardIndex === pile.length - 1) {
                card = top;
                isTopCard = true;
            }
        }
    }

    if (card && isTopCard) {
        // Find first valid foundation
        for (let i = 0; i < 4; i++) {
            if (canMoveToFoundation(card, gameState.foundations[i])) {
                saveToHistory();
                setGameState(prev => {
                    const newFoundations = [...prev.foundations.map(f => [...f])];
                    const newTableau = [...prev.tableau.map(t => [...t])];
                    const newWaste = [...prev.waste];
                    let score = prev.score;

                    if (pileType === 'waste') newWaste.pop();
                    else if (pileType === 'tableau') {
                        newTableau[pileIndex].pop();
                        const tCol = newTableau[pileIndex];
                        if (tCol.length > 0 && !tCol[tCol.length - 1].isFaceUp) {
                            tCol[tCol.length - 1].isFaceUp = true;
                            score += 5;
                        }
                    }

                    newFoundations[i].push(card!);
                    score += 10;

                    return { ...prev, foundations: newFoundations, tableau: newTableau, waste: newWaste, score, moves: prev.moves + 1 };
                });
                setSelectedSource(null);
                return;
            }
        }
    }
  };

  const handleDragStart = (e: React.DragEvent, pileType: PileType, index: number, cardIndex?: number) => {
      const source: MoveSource = { pileType, index, cardIndex };
      e.dataTransfer.setData('application/json', JSON.stringify(source));
      e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetPileType: PileType, targetIndex: number) => {
      e.preventDefault();
      e.stopPropagation();
      try {
          const data = e.dataTransfer.getData('application/json');
          if (!data) return;
          const source: MoveSource = JSON.parse(data);
          executeMove(source, targetPileType, targetIndex);
      } catch (err) {
          console.error("Failed to parse drag data", err);
      }
  };

  const handleAutoStack = () => {
    saveToHistory();

    setGameState(prev => {
        const newState = {
            ...prev,
            foundations: prev.foundations.map(f => [...f]),
            tableau: prev.tableau.map(t => [...t]),
            waste: [...prev.waste],
            score: prev.score,
            moves: prev.moves + 1
        };

        let movesMadeInLoop = true;

        while (movesMadeInLoop) {
            movesMadeInLoop = false;

            // Check Waste
            if (newState.waste.length > 0) {
                const wasteCard = newState.waste[newState.waste.length - 1];
                for (let i = 0; i < 4; i++) {
                    if (canMoveToFoundation(wasteCard, newState.foundations[i])) {
                        newState.foundations[i].push(newState.waste.pop()!);
                        newState.score += 10;
                        movesMadeInLoop = true;
                        break;
                    }
                }
                if (movesMadeInLoop) continue;
            }

            // Check Tableau
            for (let i = 0; i < 7; i++) {
                const pile = newState.tableau[i];
                if (pile.length > 0) {
                    const card = pile[pile.length - 1];
                    for (let j = 0; j < 4; j++) {
                        if (canMoveToFoundation(card, newState.foundations[j])) {
                            newState.foundations[j].push(pile.pop()!);
                            newState.score += 10;
                            // Flip card below
                            if (pile.length > 0 && !pile[pile.length - 1].isFaceUp) {
                                pile[pile.length - 1].isFaceUp = true;
                                newState.score += 5;
                            }
                            movesMadeInLoop = true;
                            break;
                        }
                    }
                    if (movesMadeInLoop) break;
                }
            }
        }

        return newState;
    });
  };

  const handleBackgroundClick = () => {
    if (selectedSource) setSelectedSource(null);
  };

  return (
    <div
        className="min-h-screen bg-term-bg text-term-white flex flex-col items-center justify-center p-0 sm:p-4"
        onClick={handleBackgroundClick}
    >
      {/* Back Button */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 bg-term-card text-term-white px-3 py-1.5 border border-term-border/40 rounded hover:bg-term-border/20 transition-colors font-mono text-sm"
      >
        ← Back
      </Link>

      {/* Terminal Window Frame */}
      <div
        className="w-full h-[100dvh] sm:h-[90vh] max-w-6xl aspect-auto bg-black/40 sm:rounded-xl border-x-0 sm:border border-term-border/20 shadow-2xl flex flex-col overflow-hidden backdrop-blur-sm"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Title Bar */}
        <div className="bg-term-card border-b border-term-border/20 p-2 sm:p-3 flex items-center justify-between shrink-0">
          <div className="flex gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-term-red"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-term-yellow"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-term-green"></div>
          </div>
          <div className="text-xs sm:text-sm font-bold opacity-50 flex items-center gap-2">
             <span>Term</span>
             <span>—</span>
             <span>Solitaire</span>
          </div>
          <div
            className="flex items-center gap-2 text-xs text-term-border/50 cursor-pointer hover:text-term-white transition-colors"
            onClick={() => setShowHelp(true)}
          >
             <HelpCircle size={14} />
             <span className="hidden sm:inline">How to Play</span>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 p-2 sm:p-4 md:p-8 flex flex-col gap-4 sm:gap-8 relative overflow-y-auto overflow-x-hidden" onClick={handleBackgroundClick}>

            {/* Top Stats Bar */}
            <div className="flex justify-between items-center text-[10px] sm:text-sm font-mono text-term-border" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col sm:flex-row sm:gap-6 gap-1">
                    <div>SCORE: <span className="text-term-green">{gameState.score}</span></div>
                    <div>MOVES: <span className="text-term-yellow">{gameState.moves}</span></div>
                </div>
                <div className="flex gap-2 sm:gap-4">
                    <button
                        onClick={handleUndo}
                        disabled={history.length === 0}
                        className={`transition-colors flex items-center gap-1 ${history.length === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-term-yellow'} touch-manipulation`}
                        title="Undo last move"
                    >
                        <RotateCcw size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">UNDO</span>
                    </button>
                    <button onClick={handleAutoStack} className="hover:text-term-white transition-colors flex items-center gap-1 touch-manipulation" title="Automatically move cards to foundations">
                        [<span className="hidden sm:inline"> AUTO-STACK </span><span className="sm:hidden">AUTO</span>]
                    </button>
                    <button onClick={handleRestart} className="hover:text-term-red transition-colors flex items-center gap-1 touch-manipulation">
                        <RefreshCw size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">RESTART</span>
                    </button>
                </div>
            </div>

            {/* Top Row */}
            <div className="flex justify-between items-start" onClick={(e) => e.stopPropagation()}>

                {/* Left: Stock & Waste */}
                <div className="flex gap-2 sm:gap-4 md:gap-6">
                    {/* Stock */}
                    <div className="relative">
                        {gameState.stock.length > 0 ? (
                            <Card
                                card={gameState.stock[gameState.stock.length - 1]}
                                onClick={handleStockClick}
                            />
                        ) : (
                            <div
                                onClick={handleStockClick}
                                className="w-[12vw] h-[16.8vw] sm:w-20 sm:h-28 md:w-24 md:h-32 max-w-[80px] max-h-[112px] sm:max-w-none sm:max-h-none border-2 border-dashed border-term-border/30 rounded-md sm:rounded-lg flex items-center justify-center cursor-pointer hover:bg-term-white/5 transition-colors"
                            >
                                <RefreshCw className="opacity-20 w-4 h-4 sm:w-6 sm:h-6" />
                            </div>
                        )}
                         <div className="hidden sm:block absolute -bottom-6 w-full text-center text-xs text-term-border/50 uppercase tracking-widest">Stock</div>
                    </div>

                    {/* Waste */}
                    <div className="relative">
                        {gameState.waste.length > 0 ? (
                            <Card
                                card={gameState.waste[gameState.waste.length - 1]}
                                isSelected={selectedSource?.pileType === 'waste'}
                                onClick={() => handleInteraction('waste', 0)}
                                onDoubleClick={() => handleDoubleClick('waste', 0)}
                                draggable={true}
                                onDragStart={(e) => handleDragStart(e, 'waste', 0)}
                            />
                        ) : (
                            <Card isPlaceholder />
                        )}
                        <div className="hidden sm:block absolute -bottom-6 w-full text-center text-xs text-term-border/50 uppercase tracking-widest">Waste</div>
                    </div>
                </div>

                {/* Right: Foundations */}
                <div className="flex gap-1 sm:gap-2 md:gap-4">
                    {gameState.foundations.map((pile, index) => (
                        <div key={`foundation-${index}`} className="relative">
                             {pile.length > 0 ? (
                                <Card
                                    card={pile[pile.length - 1]}
                                    isSelected={selectedSource?.pileType === 'foundation' && selectedSource.index === index}
                                    onClick={() => handleInteraction('foundation', index)}
                                    draggable={true}
                                    onDragStart={(e) => handleDragStart(e, 'foundation', index)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, 'foundation', index)}
                                />
                            ) : (
                                <div
                                    onClick={() => handleInteraction('foundation', index)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, 'foundation', index)}
                                    className={`w-[12vw] h-[16.8vw] sm:w-20 sm:h-28 md:w-24 md:h-32 max-w-[80px] max-h-[112px] sm:max-w-none sm:max-h-none border-2 border-term-border/20 rounded-md sm:rounded-lg flex items-center justify-center cursor-pointer hover:border-term-border/40 transition-colors ${selectedSource && canMoveToFoundation(selectedSource.pileType === 'waste' ? gameState.waste[gameState.waste.length-1] : (selectedSource.pileType === 'tableau' ? gameState.tableau[selectedSource.index][selectedSource.cardIndex!] : gameState.foundations[selectedSource.index][gameState.foundations[selectedSource.index].length-1] ), pile) ? 'bg-term-green/10 border-term-green/50' : ''}`}
                                >
                                    <span className="text-xl sm:text-4xl opacity-10 font-serif">
                                        {index === 0 ? '♥' : index === 1 ? '♦' : index === 2 ? '♣' : '♠'}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Row: Tableau */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-4 flex-1 h-full min-h-[400px]" onClick={(e) => e.stopPropagation()}>
                {gameState.tableau.map((pile, pileIndex) => (
                    <div
                        key={`tableau-${pileIndex}`}
                        className="flex flex-col items-center relative h-full [--spacing-down:8px] [--spacing-up:22px] sm:[--spacing-down:12px] sm:[--spacing-up:30px]"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 'tableau', pileIndex)}
                    >
                        {/* Placeholder for empty column */}
                        {pile.length === 0 && (
                             <div
                                onClick={() => handleInteraction('tableau', pileIndex)}
                                className={`w-[12vw] h-[16.8vw] sm:w-20 sm:h-28 md:w-24 md:h-32 max-w-[80px] max-h-[112px] sm:max-w-none sm:max-h-none border-2 border-dashed border-term-border/10 rounded-md sm:rounded-lg absolute top-0 hover:border-term-border/30 transition-colors ${selectedSource && selectedSource.pileType !== 'foundation' && canMoveToTableau(selectedSource.pileType === 'waste' ? gameState.waste[gameState.waste.length-1] : gameState.tableau[selectedSource.index][selectedSource.cardIndex!], pile) ? 'bg-term-green/5 border-term-green/30' : ''}`}
                             />
                        )}

                        {/* Stack of Cards */}
                        <div className="w-full relative h-full pointer-events-none">
                             {pile.map((card, cardIndex) => {
                                const faceDownCount = pile.slice(0, cardIndex).filter(c => !c.isFaceUp).length;
                                const faceUpCount = pile.slice(0, cardIndex).filter(c => c.isFaceUp).length;

                                return (
                                <div
                                    key={card.id}
                                    className="absolute left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-auto"
                                    style={{
                                        top: `calc(${faceDownCount} * var(--spacing-down) + ${faceUpCount} * var(--spacing-up))`,
                                        zIndex: cardIndex
                                    }}
                                >
                                    <Card
                                        card={card}
                                        isSelected={selectedSource?.pileType === 'tableau' && selectedSource.index === pileIndex && (selectedSource.cardIndex === undefined || selectedSource.cardIndex <= cardIndex) && card.isFaceUp}
                                        onClick={() => handleInteraction('tableau', pileIndex, cardIndex)}
                                        onDoubleClick={() => handleDoubleClick('tableau', pileIndex, cardIndex)}
                                        draggable={card.isFaceUp}
                                        onDragStart={(e) => handleDragStart(e, 'tableau', pileIndex, cardIndex)}
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDrop(e, 'tableau', pileIndex)}
                                        className={card.isFaceUp ? "hover:-translate-y-1" : ""}
                                    />
                                </div>
                                );
                             })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Victory Overlay */}
            {hasWon && (
                <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center backdrop-blur-md">
                    <Trophy className="text-term-yellow w-24 h-24 mb-4 animate-bounce" />
                    <h1 className="text-4xl md:text-6xl font-bold text-term-white mb-2">YOU WIN!</h1>
                    <p className="text-term-border mb-8 font-mono">Score: {gameState.score}</p>
                    <button
                        onClick={handleRestart}
                        className="px-8 py-3 bg-term-green text-black font-bold rounded hover:bg-term-white transition-colors"
                    >
                        PLAY AGAIN
                    </button>
                </div>
            )}

            {/* Help Modal */}
            {showHelp && (
              <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center backdrop-blur-md p-4">
                <div className="bg-term-bg border border-term-border/40 rounded-xl p-6 max-w-md w-full shadow-2xl relative">
                   <button
                     onClick={() => setShowHelp(false)}
                     className="absolute top-4 right-4 text-term-border/50 hover:text-term-red transition-colors"
                   >
                     <X size={20} />
                   </button>
                   <h2 className="text-xl font-bold text-term-white mb-4 border-b border-term-border/20 pb-2 flex items-center gap-2">
                     <HelpCircle size={20} /> How to Play
                   </h2>

                   <div className="space-y-4 text-sm text-term-border">
                     <div>
                       <h3 className="text-term-yellow font-bold mb-1">Controls</h3>
                       <ul className="list-disc list-inside space-y-1">
                         <li><strong className="text-term-white">Mobile:</strong> Tap to select, Tap to move.</li>
                         <li><strong className="text-term-white">Drag & Drop:</strong> Drag cards to move them.</li>
                         <li><strong className="text-term-white">Double Click:</strong> Instantly move a card to Foundations.</li>
                         <li><strong className="text-term-white">Undo:</strong> Mistakes happen. Use Undo to step back.</li>
                       </ul>
                     </div>

                     <div>
                       <h3 className="text-term-yellow font-bold mb-1">Rules</h3>
                       <ul className="list-disc list-inside space-y-1">
                         <li><strong className="text-term-white">Foundations:</strong> Stack cards by Suit from Ace to King.</li>
                         <li><strong className="text-term-white">Tableau:</strong> Stack cards by alternating colors (Red/Black) in descending order.</li>
                         <li><strong className="text-term-white">Stock:</strong> Draw new cards.</li>
                       </ul>
                     </div>
                   </div>

                   <button
                      onClick={() => setShowHelp(false)}
                      className="mt-6 w-full py-2 bg-term-white/10 hover:bg-term-white/20 text-term-white rounded font-bold transition-colors"
                   >
                      GOT IT
                   </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
