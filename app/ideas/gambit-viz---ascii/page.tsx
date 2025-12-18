'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Chess, Square } from 'chess.js';
import ChessBoard from './components/ChessBoard';
import DeepAnalysisPanel from './components/DeepAnalysisPanel';
import TimeSelector, { TimeControl } from './components/TimeSelector';
import Clock from './components/Clock';
import { TreeNode } from './types';
import { getEvaluatedMoves, analyzeBoardLocal, Difficulty } from './services/chessEngine';
import { useChessWorker } from './hooks/useChessWorker';
import { Monitor, Cpu, Undo, RefreshCw, Palette, ChevronDown } from 'lucide-react';

const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

// Ensure ID starts with a letter to avoid D3/CSS selector issues
const generateId = () => 'n' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);

const initialTree: TreeNode = {
  id: 'root',
  name: 'Start',
  fen: START_FEN,
  children: [],
  parentId: null,
  moveNumber: 0,
  turn: 'w',
  isMainLine: true,
  analysis: "Game Start. White to move.",
  classification: "Book",
  evalScore: 0 // Start score roughly equal
};

// Theme Definitions
const THEMES = [
  { id: 'theme-slate', name: 'SLATE' }, // Moved to top as default
  { id: 'theme-green', name: 'MATRIX' },
  { id: 'theme-amber', name: 'AMBER' },
  { id: 'theme-cyan', name: 'CYAN' },
  { id: 'theme-rose', name: 'ROSE' },
  { id: 'theme-purple', name: 'PURPLE' },
];

// Helper to find nodes in tree
const findNode = (root: TreeNode, id: string): TreeNode | null => {
  if (root.id === id) return root;
  for (const child of root.children) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
};

export default function GambitVizPage() {
  const [game, setGame] = useState(new Chess());
  const [treeRoot, setTreeRoot] = useState<TreeNode>(initialTree);
  const [currentNodeId, setCurrentNodeId] = useState<string>('root');
  const [lastMove, setLastMove] = useState<{from: string, to: string} | null>(null);

  // Chess engine worker (runs in separate thread to avoid UI blocking)
  const { getBestMove: getWorkerBestMove } = useChessWorker();

  // Game State
  const [gameStatus, setGameStatus] = useState<'setup' | 'playing' | 'ended'>('setup');
  const [isVsComputer, setIsVsComputer] = useState(true);
  const [isComputing, setIsComputing] = useState(false);
  const [showTimeSelector, setShowTimeSelector] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  // UI State
  const [currentTheme, setCurrentTheme] = useState('theme-slate');
  const [showThemes, setShowThemes] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);

  // Engine Analysis State
  const [principalVariation, setPrincipalVariation] = useState<string[]>([]);

  // Time Control State
  const [timeControl, setTimeControl] = useState<TimeControl | null>(null);
  const [timeLeft, setTimeLeft] = useState<{w: number, b: number}>({ w: 600000, b: 600000 });
  const lastTickRef = useRef<number>(0);

  // Apply theme to body and cleanup on unmount
  useEffect(() => {
    document.body.className = currentTheme;

    // Cleanup: Remove theme class when component unmounts
    return () => {
      document.body.className = '';
    };
  }, [currentTheme]);

  // --- TIMER LOGIC ---
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    // Initialize lastTick
    lastTickRef.current = Date.now();

    const timerInterval = setInterval(() => {
      const now = Date.now();
      const delta = now - lastTickRef.current;
      lastTickRef.current = now;

      // Don't decrement if game is over
      if (game.isGameOver()) {
          setGameStatus('ended');
          return;
      }

      const turn = game.turn(); // 'w' or 'b'

      setTimeLeft(prev => {
        // If infinite time, don't decrement
        if (prev[turn] === Infinity) return prev;

        const newTime = prev[turn] - delta;
        if (newTime <= 0) {
            // Timeout!
            setGameStatus('ended');
            return { ...prev, [turn]: 0 };
        }
        return { ...prev, [turn]: newTime };
      });

    }, 100);

    return () => clearInterval(timerInterval);
    }, [gameStatus, game]);

  const triggerAnalysis = useCallback(async (nodeId: string, gameObj: Chess) => {
      try {
          const result = await analyzeBoardLocal(gameObj);

          setTreeRoot(prev => {
              const clone = JSON.parse(JSON.stringify(prev));
              const node = findNode(clone, nodeId);
              if (node) {
                  node.analysis = result.analysis;
                  node.classification = result.classification;
                  node.evalScore = result.evalScore; // Capture evaluation
              }
              return clone;
          });
      } catch (err) {
          console.error("Analysis failed", err);
      }
  }, []);

  // Derived state: Current Node (Moved up to be accessible for effects)
  const currentNode = findNode(treeRoot, currentNodeId);

  const startGame = (tc: TimeControl) => {
    setTimeControl(tc);
    setTimeLeft({ w: tc.initialMs, b: tc.initialMs });

    // Reset Board
    const newGame = new Chess();
    setGame(newGame);
    const newRoot = { ...initialTree, id: generateId() };
    setTreeRoot(newRoot);
    setCurrentNodeId(newRoot.id);
    setLastMove(null);
    setIsComputing(false);

    setGameStatus('playing');
    setShowTimeSelector(false);
  };

  const jumpToNode = (node: TreeNode) => {
    if (isComputing) return;
    const newGame = new Chess(node.fen);
    setGame(newGame);
    setCurrentNodeId(node.id);
    if (node.parentId) {
        setLastMove(null);
    } else {
        setLastMove(null);
    }

    // Lazy analysis trigger
    if (!node.analysis && node.id !== 'root') {
        triggerAnalysis(node.id, newGame);
    }
  };

  const handleMove = (source: Square, target: Square) => {
    if (isComputing || gameStatus === 'ended') return;

    // Check if we are at the "Head" of the current game to apply time rules
    const isMainHead = currentNode && currentNode.children.length === 0 && currentNode.isMainLine;

    const gameCopy = new Chess(game.fen());
    try {
      const moveResult = gameCopy.move({
        from: source,
        to: target,
        promotion: 'q',
      });

      if (moveResult) {
        // If we were playing and this move extends the game, add increment
        if (gameStatus === 'playing' && timeControl && isMainHead) {
            const turn = game.turn(); // Who JUST moved
            // Only add increment if not infinite
            if (timeControl.initialMs !== Infinity) {
                setTimeLeft(prev => ({
                    ...prev,
                    [turn]: prev[turn] + timeControl.incrementMs
                }));
            }
        }
        updateGameState(gameCopy, moveResult.san, source, target);
      }
    } catch {
      // Invalid move
    }
  };

  const updateGameState = useCallback(async (newGame: Chess, san: string, from: string, to: string) => {
      setGame(newGame);
      setLastMove({ from, to });

      const parentNodeId = currentNodeId;

      // Determine target ID before state update to avoid async race conditions
      // Check if this move already exists in the current tree state
      let targetNodeId = generateId();

      const parentInCurrentState = findNode(treeRoot, parentNodeId);
      if (parentInCurrentState) {
          const existing = parentInCurrentState.children.find(c => c.name === san);
          if (existing) {
              targetNodeId = existing.id;
          }
      }

      const newNode: TreeNode = {
        id: targetNodeId,
        name: san,
        fen: newGame.fen(),
        children: [],
        parentId: parentNodeId,
        moveNumber: newGame.moveNumber(),
        turn: newGame.turn(),
        isVariation: false,
        isMainLine: true // Played moves are main line by default in this session
      };

      // 1. Update Tree with Played Move
      setTreeRoot((prevRoot) => {
        const newRoot = JSON.parse(JSON.stringify(prevRoot));
        const currentInTree = findNode(newRoot, parentNodeId);

        if (currentInTree) {
          const existingChild = currentInTree.children.find((c: TreeNode) => c.name === san);
          if (existingChild) {
              existingChild.isMainLine = true; // Mark as main line
          } else {
              currentInTree.children.push(newNode);
          }
        }
        return newRoot;
      });

      setCurrentNodeId(targetNodeId);
      triggerAnalysis(targetNodeId, newGame);

      // 2. Compute Variations & Eval for Parent
      if (parentNodeId) {
          const parentNode = findNode(treeRoot, parentNodeId);
          if (parentNode) {
              const parentGame = new Chess(parentNode.fen);

              try {
                  const topMoves = await getEvaluatedMoves(parentGame, 4);

                  setTreeRoot((prevRoot) => {
                      const newRoot = JSON.parse(JSON.stringify(prevRoot));
                      const parentInTree = findNode(newRoot, parentNodeId);

                      if (parentInTree) {
                          topMoves.forEach(m => {
                              const existingChild = parentInTree.children.find((c: TreeNode) => c.name === m.san);

                              if (existingChild) {
                                  existingChild.evalScore = m.score;
                              } else {
                                  parentInTree.children.push({
                                      id: generateId(),
                                      name: m.san,
                                      fen: m.fen,
                                      children: [],
                                      parentId: parentInTree.id,
                                      moveNumber: newNode.moveNumber,
                                      turn: newNode.turn,
                                      isVariation: true,
                                      isMainLine: false,
                                      evalScore: m.score
                                  });
                              }
                          });
                      }
                      return newRoot;
                  });
              } catch (e) {
                  console.error("Variations Error", e);
              }
          }
      }
  }, [currentNodeId, treeRoot, triggerAnalysis]);

  useEffect(() => {
    // Only play if it's CPU turn, game active, not already computing,
    // AND we are at the end of the line (leaf node).
    // This prevents CPU from playing when reviewing history.
    const isLeaf = currentNode && currentNode.children.length === 0;

    if (gameStatus === 'playing' && isVsComputer && game.turn() === 'b' && !game.isGameOver() && !isComputing && isLeaf) {
        const makeComputerMove = async () => {
            setIsComputing(true);

            // Use web worker for computation (runs in separate thread, doesn't block UI/clock)
            const result = await getWorkerBestMove(game.fen(), difficulty);

            // Store the principal variation
            if (result.pv && result.pv.length > 0) {
                setPrincipalVariation(result.pv);
            }

            if (result.move) {
                const gameCopy = new Chess(game.fen());
                const moveResult = gameCopy.move(result.move);
                if (moveResult) {
                   if (timeControl && timeControl.initialMs !== Infinity) {
                       setTimeLeft(prev => ({ ...prev, b: prev.b + timeControl.incrementMs }));
                   }
                   updateGameState(gameCopy, moveResult.san, moveResult.from, moveResult.to);
                }
            }
            setIsComputing(false);
        };
        makeComputerMove();
    }
  }, [game, isVsComputer, isComputing, currentNode, gameStatus, timeControl, updateGameState, difficulty, getWorkerBestMove]);


  const resetGame = () => {
    setShowTimeSelector(true);
    setGameStatus('setup');
    setIsComputing(false);
  };

  const undoMove = () => {
      if (isComputing) return;

      const current = findNode(treeRoot, currentNodeId);
      if (current && current.parentId) {
          const parent = findNode(treeRoot, current.parentId);
          if (parent) jumpToNode(parent);
      }
  };

  const toggleComputerMode = () => {
      setIsVsComputer(!isVsComputer);
  };

  useEffect(() => {
      if (treeRoot.children.length === 0 && treeRoot.id === 'root') {
           const populateRoot = async () => {
               const g = new Chess();
               const topMoves = await getEvaluatedMoves(g, 4);
               setTreeRoot(prev => {
                   const clone = JSON.parse(JSON.stringify(prev));
                   const root = findNode(clone, 'root');
                   if (root && root.children.length === 0) {
                        topMoves.forEach(m => {
                            root.children.push({
                                id: generateId(),
                                name: m.san,
                                fen: m.fen,
                                children: [],
                                parentId: 'root',
                                moveNumber: 1,
                                turn: 'w',
                                isVariation: true,
                                evalScore: m.score
                            });
                        });
                   }
                   return clone;
               });
           };
           populateRoot();
      }
  }, [treeRoot.children.length, treeRoot.id]);

  const isUnlimitedTime = timeControl?.initialMs === Infinity;

  return (
    <div className="h-[100dvh] w-screen bg-[var(--term-bg)] text-[var(--term-main)] font-vt323 overflow-hidden flex flex-col md:flex-row transition-colors duration-300 relative">

      {/* Time Setup Overlay */}
      {showTimeSelector && gameStatus === 'setup' && (
          <TimeSelector onStartGame={startGame} />
      )}

      {/* Back Button - Desktop Only (Fixed Position) */}
      <Link
        href="/"
        className="hidden md:block fixed top-2 right-2 z-50 border border-[var(--term-main)] px-2 py-1 bg-[var(--term-bg)] hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] transition-colors text-xs cursor-pointer"
      >
        ← BACK
      </Link>

      {/* Sidebar (Analysis & Controls) - Top on Mobile, Left on Desktop */}
      <aside
        className={`
          w-full md:w-80 flex flex-col border-b md:border-b-0 md:border-r border-[var(--term-main)] bg-[var(--term-bg)] z-10 flex-shrink-0
          transition-[height] duration-300 ease-in-out
          ${isMobileExpanded ? 'h-[85dvh]' : 'h-[40dvh]'}
          md:h-full
        `}
      >

        {/* Header */}
        <div className="p-2 md:p-4 border-b border-[var(--term-main)] bg-[var(--term-bg)] flex justify-between items-center flex-shrink-0">
          <div>
            <h1 className="text-xl md:text-3xl uppercase mb-0 terminal-text-shadow leading-none tracking-tighter flex items-center gap-2">
                <Monitor className="w-5 h-5 md:w-8 md:h-8" /> Gambit_Viz
            </h1>
            <span className="text-[10px] md:text-xs opacity-70">{`>>> SYSTEM_READY`}</span>
          </div>

          <div className="flex items-center gap-2">
              {/* Back Button - Mobile Only (Inline) */}
              <Link
                href="/"
                className="md:hidden border border-[var(--term-main)] px-2 py-1 bg-[var(--term-bg)] hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] transition-colors text-xs cursor-pointer"
              >
                ← BACK
              </Link>
              {/* Theme Toggle Button */}
              <button
                onClick={() => setShowThemes(!showThemes)}
                className={`p-1 border cursor-pointer ${showThemes ? 'bg-[var(--term-main)] text-[var(--term-bg)]' : 'border-[var(--term-dim)] text-[var(--term-dim)]'}`}
              >
                  <Palette size={16} />
              </button>
          </div>
        </div>

        {/* Expandable Theme Selection Area */}
        {showThemes && (
            <div className="p-2 border-b border-[var(--term-main)] grid grid-cols-3 gap-2 bg-[rgba(var(--term-main-rgb),0.1)] flex-shrink-0">
                 {THEMES.map(t => (
                     <button
                        key={t.id}
                        onClick={() => { setCurrentTheme(t.id); setShowThemes(false); }}
                        className={`text-[10px] p-1 border text-center transition-all cursor-pointer ${currentTheme === t.id ? 'bg-[var(--term-main)] text-[var(--term-bg)] font-bold' : 'border-[var(--term-dim)] text-[var(--term-dim)] hover:border-[var(--term-main)] hover:text-[var(--term-main)]'}`}
                     >
                         {t.name}
                     </button>
                 ))}
            </div>
        )}

        {/* Main Analysis Panel - Visible on ALL screens */}
        <div className="flex-1 overflow-hidden relative flex flex-col min-h-0 bg-[var(--term-bg)]">
            <DeepAnalysisPanel
                rootNode={treeRoot}
                activeNodeId={currentNodeId}
                onNodeClick={jumpToNode}
                isMobileExpanded={isMobileExpanded}
                onToggleMobileExpand={() => setIsMobileExpanded(!isMobileExpanded)}
                principalVariation={principalVariation}
            />
        </div>

        {/* Controls Footer */}
        <div className={`grid ${isVsComputer ? 'grid-cols-4' : 'grid-cols-3'} border-t border-[var(--term-main)] bg-[var(--term-bg)] flex-shrink-0`}>
           <button onClick={toggleComputerMode} className={`p-2 md:p-3 border-r border-[var(--term-main)] hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] transition-colors uppercase font-bold text-center text-xs md:text-sm flex flex-col items-center justify-center cursor-pointer ${isVsComputer ? 'bg-[var(--term-dim)] text-black' : ''}`}>
            <Cpu size={16} className="mb-1" />
            {isVsComputer ? 'CPU:ON' : 'CPU:OFF'}
          </button>
          {isVsComputer && (
            <div className="relative border-r border-[var(--term-main)] flex items-center justify-center">
              <button
                onClick={() => !isComputing && setShowDifficultyDropdown(!showDifficultyDropdown)}
                disabled={isComputing}
                className="p-2 md:p-3 w-full h-full bg-[var(--term-bg)] text-[var(--term-main)] hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] transition-colors uppercase font-bold text-xs md:text-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1"
              >
                {difficulty.toUpperCase()}
                <ChevronDown size={12} className={`transition-transform ${showDifficultyDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showDifficultyDropdown && (
                <div className="absolute bottom-full left-0 right-0 bg-[var(--term-bg)] border border-[var(--term-main)] z-50">
                  {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => { setDifficulty(d); setShowDifficultyDropdown(false); }}
                      className={`w-full p-2 text-xs uppercase font-bold transition-colors cursor-pointer ${
                        difficulty === d
                          ? 'bg-[var(--term-main)] text-[var(--term-bg)]'
                          : 'text-[var(--term-main)] hover:bg-[var(--term-main)] hover:text-[var(--term-bg)]'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <button onClick={undoMove} disabled={isComputing} className="p-2 md:p-3 border-r border-[var(--term-main)] hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] transition-colors uppercase font-bold text-center text-xs md:text-sm disabled:opacity-50 flex flex-col items-center justify-center cursor-pointer">
            <Undo size={16} className="mb-1" />
            UNDO
          </button>
          <button onClick={resetGame} disabled={isComputing} className="p-2 md:p-3 hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] transition-colors uppercase font-bold text-center text-xs md:text-sm disabled:opacity-50 flex flex-col items-center justify-center cursor-pointer">
            <RefreshCw size={16} className="mb-1" />
            NEW GAME
          </button>
        </div>
      </aside>

      {/* Main Board Area - Bottom on Mobile, Right on Desktop */}
      <main className="flex-1 flex flex-col min-h-0 relative bg-[var(--term-bg)]">
        <div className="flex-1 p-2 md:p-4 flex flex-col items-center justify-center bg-[var(--term-bg)] relative min-h-0 overflow-hidden">
          <div className="absolute top-1 left-1 md:top-2 md:left-2 text-[10px] md:text-xs border border-[var(--term-main)] px-1 bg-[var(--term-bg)] z-10">BOARD_VIEW</div>

          {/* Opponent Clock (Black) - HIDE if Unlimited */}
          {!isUnlimitedTime && (
            <div className="w-full flex justify-between items-center mb-1 mt-6 md:mt-0 h-[32px] md:h-[36px] flex-shrink-0" style={{ maxWidth: isUnlimitedTime ? '95vh' : '85vh' }}>
                <span className="text-[10px] md:text-xs font-bold text-[var(--term-dim)]">OPPONENT {isVsComputer ? '(CPU)' : ''}</span>
                <Clock
                  timeMs={timeLeft.b}
                  isActive={gameStatus === 'playing' && game.turn() === 'b'}
                  isLowTime={timeLeft.b < 30000}
                />
            </div>
          )}

          {/* Board Container */}
          <div
            className="flex items-center justify-center relative flex-1 min-h-0"
            style={{
              width: '100%',
              maxWidth: isUnlimitedTime ? '95vh' : '85vh',
            }}
          >
             <div className="w-full h-full max-w-full max-h-full shadow-[0_0_10px_rgba(var(--term-main-rgb),0.3)]" style={{ aspectRatio: '1/1' }}>
                <ChessBoard
                  game={game}
                  onMove={handleMove}
                  lastMove={lastMove}
                />
             </div>

             {/* Game Over Overlay */}
             {gameStatus === 'ended' && (
                 <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/10">
                     <div className="bg-[var(--term-bg)]/40 border-2 border-[var(--term-main)] p-6 text-center shadow-[0_0_20px_var(--term-main)]">
                         <h2 className="text-3xl font-bold uppercase mb-2 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">Game Over</h2>
                         <p className="text-xl mb-4 text-[var(--term-dim)] drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
                             {timeLeft.w <= 0 ? "White time out"
                               : timeLeft.b <= 0 ? "Black time out"
                               : game.isCheckmate() ? "Checkmate"
                               : game.isStalemate() ? "Stalemate"
                               : game.isThreefoldRepetition() ? "Draw by threefold repetition"
                               : game.isInsufficientMaterial() ? "Draw by insufficient material"
                               : "Draw"}
                         </p>
                         <button onClick={resetGame} className="bg-[var(--term-main)]/90 text-[var(--term-bg)] px-6 py-2 font-bold uppercase hover:scale-105 transition-transform cursor-pointer">
                             Play Again
                         </button>
                     </div>
                 </div>
             )}
          </div>

          {/* Player Clock (White) - HIDE if Unlimited */}
          {!isUnlimitedTime && (
            <div className="w-full flex justify-between items-center mt-1 h-[32px] md:h-[36px] flex-shrink-0" style={{ maxWidth: isUnlimitedTime ? '95vh' : '85vh' }}>
                <span className="text-[10px] md:text-xs font-bold text-[var(--term-dim)]">YOU</span>
                <Clock
                  timeMs={timeLeft.w}
                  isActive={gameStatus === 'playing' && game.turn() === 'w'}
                  isLowTime={timeLeft.w < 30000}
                />
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
