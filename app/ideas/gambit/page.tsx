'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Chess, Square } from 'chess.js';
import ChessBoard from './components/ChessBoard';
import DeepAnalysisPanel from './components/DeepAnalysisPanel';
import PromotionModal from './components/PromotionModal';
import TimeSelector, { TimeControl } from './components/TimeSelector';
import ModeSelector from './components/ModeSelector';
import Clock from './components/Clock';
import LearnMode from './learn/LearnMode';
import { TreeNode } from './types';
import { getEvaluatedMoves, analyzeBoardLocal, Difficulty } from './services/chessEngine';
import { useChessWorker } from './hooks/useChessWorker';
import { Monitor, Cpu, Undo, RefreshCw, Palette, ChevronDown, BookOpen, Play } from 'lucide-react';

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
  { id: 'theme-modern', name: 'MODERN' },
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

function GambitContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

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

  // URL-driven state for mode
  const urlMode = searchParams.get('mode') as 'play' | 'learn' | null;
  const urlCourse = searchParams.get('course');
  const urlLesson = searchParams.get('lesson');

  // Determine if we should show mode selector (only if no mode in URL)
  const [showModeSelector, setShowModeSelector] = useState(!urlMode);

  // Mode is derived from URL, with fallback to 'play'
  const mode = urlMode || 'play';

  // Helper to update URL params
  const updateUrlParams = useCallback((params: { mode?: string | null; course?: string | null; lesson?: string | null }) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (params.mode !== undefined) {
      if (params.mode) {
        newParams.set('mode', params.mode);
      } else {
        newParams.delete('mode');
      }
    }

    if (params.course !== undefined) {
      if (params.course) {
        newParams.set('course', params.course);
      } else {
        newParams.delete('course');
      }
    }

    if (params.lesson !== undefined) {
      if (params.lesson) {
        newParams.set('lesson', params.lesson);
      } else {
        newParams.delete('lesson');
      }
    }

    const newUrl = newParams.toString() ? `?${newParams.toString()}` : window.location.pathname;
    router.push(newUrl, { scroll: false });
  }, [searchParams, router]);

  // Set mode and update URL
  const setMode = useCallback((newMode: 'play' | 'learn') => {
    if (newMode === 'play') {
      // Clear all learn-related params when switching to play
      updateUrlParams({ mode: null, course: null, lesson: null });
    } else {
      updateUrlParams({ mode: newMode, course: null, lesson: null });
    }
  }, [updateUrlParams]);

  // Promotion State
  const [pendingPromotion, setPendingPromotion] = useState<{ source: Square; target: Square } | null>(null);

  // Engine Analysis State
  const [principalVariation, setPrincipalVariation] = useState<string[]>([]);
  const [analyzingNodeId, setAnalyzingNodeId] = useState<string | null>(null);

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
      // Set analyzing state immediately for UI feedback
      setAnalyzingNodeId(nodeId);

      try {
          const result = await analyzeBoardLocal(gameObj);

          // Update tree with results - this triggers immediate re-render
          setTreeRoot(prev => {
              const clone = JSON.parse(JSON.stringify(prev));
              const node = findNode(clone, nodeId);
              if (node) {
                  node.analysis = result.analysis;
                  node.classification = result.classification;
                  node.evalScore = result.evalScore;
              }
              return clone;
          });
      } catch (err) {
          console.error("Analysis failed", err);
      } finally {
          // Clear analyzing state immediately when done
          setAnalyzingNodeId(null);
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

  const isPromotionMove = (source: Square, target: Square): boolean => {
    const piece = game.get(source);
    if (!piece || piece.type !== 'p') return false;
    const targetRank = target.charAt(1);
    return (piece.color === 'w' && targetRank === '8') || (piece.color === 'b' && targetRank === '1');
  };

  const handleMove = (source: Square, target: Square) => {
    if (isComputing || gameStatus === 'ended') return;

    // Check if this is a promotion move
    if (isPromotionMove(source, target)) {
      // Verify it's a legal move before showing modal
      const gameCopy = new Chess(game.fen());
      try {
        const testMove = gameCopy.move({ from: source, to: target, promotion: 'q' });
        if (testMove) {
          setPendingPromotion({ source, target });
          return;
        }
      } catch {
        // Invalid move
        return;
      }
    }

    // Check if we are at the "Head" of the current game to apply time rules
    const isMainHead = currentNode && currentNode.children.length === 0 && currentNode.isMainLine;

    const gameCopy = new Chess(game.fen());
    try {
      const moveResult = gameCopy.move({
        from: source,
        to: target,
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

  const handlePromotion = (piece: 'q' | 'r' | 'b' | 'n') => {
    if (!pendingPromotion) return;

    const { source, target } = pendingPromotion;
    const isMainHead = currentNode && currentNode.children.length === 0 && currentNode.isMainLine;

    const gameCopy = new Chess(game.fen());
    try {
      const moveResult = gameCopy.move({
        from: source,
        to: target,
        promotion: piece,
      });

      if (moveResult) {
        if (gameStatus === 'playing' && timeControl && isMainHead) {
          const turn = game.turn();
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

    setPendingPromotion(null);
  };

  const cancelPromotion = () => {
    setPendingPromotion(null);
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

  // If in learn mode, render LearnMode component
  if (mode === 'learn') {
    return (
      <div className="h-[100dvh] w-screen bg-[var(--term-bg)] text-[var(--term-main)] font-vt323 overflow-hidden flex flex-col transition-colors duration-300 relative">
        {/* Header with Mode Toggle */}
        <header className="p-2 md:p-4 border-b border-[var(--term-main)] bg-[var(--term-bg)] flex-shrink-0">
          {/* Title row with back button */}
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-xl md:text-3xl uppercase mb-0 terminal-text-shadow leading-none tracking-tighter flex items-center gap-2">
              <Monitor className="w-5 h-5 md:w-8 md:h-8" /> Gambit
            </h1>
            <Link
              href="/"
              className="text-[10px] md:text-xs text-[var(--term-dim)] hover:text-[var(--term-main)] transition-colors cursor-pointer"
            >
              ← BACK
            </Link>
          </div>
          {/* Controls row */}
          <div className="flex items-center gap-2">
            {/* Mode Toggle - In learn mode, LEARN is active */}
            <div className="flex border border-[var(--term-main)]">
              <button
                onClick={() => setMode('play')}
                className="px-2 py-1 text-[10px] md:text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors text-[var(--term-dim)] hover:text-[var(--term-main)]"
              >
                <Play size={12} /> PLAY
              </button>
              <button
                onClick={() => setMode('learn')}
                className="px-2 py-1 text-[10px] md:text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors border-l border-[var(--term-main)] bg-[var(--term-main)] text-[var(--term-bg)]"
              >
                <BookOpen size={12} /> LEARN
              </button>
            </div>
            {/* Theme Toggle Button */}
            <button
              onClick={() => setShowThemes(!showThemes)}
              className={`p-1 border cursor-pointer ${showThemes ? 'bg-[var(--term-main)] text-[var(--term-bg)]' : 'border-[var(--term-dim)] text-[var(--term-dim)]'}`}
            >
              <Palette size={16} />
            </button>
          </div>
        </header>

        {/* Expandable Theme Selection Area */}
        {showThemes && (
          <div className="p-2 border-b border-[var(--term-main)] grid grid-cols-3 md:grid-cols-7 gap-2 bg-[rgba(var(--term-main-rgb),0.1)] flex-shrink-0">
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

        {/* Learn Mode Content */}
        <div className="flex-1 overflow-auto">
          <LearnMode
            onBack={() => setMode('play')}
            urlCourse={urlCourse}
            urlLesson={urlLesson}
            onUrlChange={(course, lesson) => updateUrlParams({ course, lesson })}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-screen bg-[var(--term-bg)] text-[var(--term-main)] font-vt323 overflow-hidden flex flex-col transition-colors duration-300 relative">

      {/* Mode Selection Overlay - Shows first */}
      {showModeSelector && (
        <ModeSelector
          onSelectPlay={() => {
            setShowModeSelector(false);
            // Play mode doesn't need URL params
          }}
          onSelectLearn={() => {
            setShowModeSelector(false);
            setMode('learn');
          }}
        />
      )}

      {/* Time Setup Overlay - Shows after selecting Play mode */}
      {!showModeSelector && showTimeSelector && gameStatus === 'setup' && (
          <TimeSelector onStartGame={startGame} />
      )}

      {/* Promotion Modal */}
      {pendingPromotion && (
        <PromotionModal
          color={game.turn()}
          onSelect={handlePromotion}
          onCancel={cancelPromotion}
        />
      )}

      {/* Header - Always at top */}
      <header className="p-2 md:p-4 border-b border-[var(--term-main)] bg-[var(--term-bg)] flex-shrink-0">
        {/* Title row with back button */}
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-xl md:text-3xl uppercase mb-0 terminal-text-shadow leading-none tracking-tighter flex items-center gap-2">
            <Monitor className="w-5 h-5 md:w-8 md:h-8" /> Gambit
          </h1>
          <Link
            href="/"
            className="text-[10px] md:text-xs text-[var(--term-dim)] hover:text-[var(--term-main)] transition-colors cursor-pointer"
          >
            ← BACK
          </Link>
        </div>
        {/* Controls row */}
        <div className="flex items-center gap-2">
          {/* Mode Toggle - In play mode, PLAY is active */}
          <div className="flex border border-[var(--term-main)]">
            <button
              onClick={() => setMode('play')}
              className="px-2 py-1 text-[10px] md:text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors bg-[var(--term-main)] text-[var(--term-bg)]"
            >
              <Play size={12} /> PLAY
            </button>
            <button
              onClick={() => setMode('learn')}
              className="px-2 py-1 text-[10px] md:text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors border-l border-[var(--term-main)] text-[var(--term-dim)] hover:text-[var(--term-main)]"
            >
              <BookOpen size={12} /> LEARN
            </button>
          </div>
          {/* Theme Toggle Button */}
          <button
            onClick={() => setShowThemes(!showThemes)}
            className={`p-1 border cursor-pointer ${showThemes ? 'bg-[var(--term-main)] text-[var(--term-bg)]' : 'border-[var(--term-dim)] text-[var(--term-dim)]'}`}
          >
              <Palette size={16} />
          </button>
        </div>
      </header>

      {/* Expandable Theme Selection Area */}
      {showThemes && (
          <div className="p-2 border-b border-[var(--term-main)] grid grid-cols-3 md:grid-cols-7 gap-2 bg-[rgba(var(--term-main-rgb),0.1)] flex-shrink-0">
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

      {/* Content Area */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:w-80 flex-col border-r border-[var(--term-main)] bg-[var(--term-bg)]">
          {/* Analysis Panel */}
          <div className="flex-1 overflow-hidden relative flex flex-col min-h-0">
              <DeepAnalysisPanel
                  rootNode={treeRoot}
                  activeNodeId={currentNodeId}
                  onNodeClick={jumpToNode}
                  isMobileExpanded={isMobileExpanded}
                  onToggleMobileExpand={() => setIsMobileExpanded(!isMobileExpanded)}
                  principalVariation={principalVariation}
                  analyzingNodeId={analyzingNodeId}
              />
          </div>

          {/* Desktop Controls Footer */}
          <div className={`grid ${isVsComputer ? 'grid-cols-4' : 'grid-cols-3'} border-t border-[var(--term-main)] bg-[var(--term-bg)] flex-shrink-0`}>
             <button onClick={toggleComputerMode} className={`p-3 border-r border-[var(--term-main)] hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] transition-colors uppercase font-bold text-center text-sm flex flex-col items-center justify-center cursor-pointer ${isVsComputer ? 'bg-[var(--term-dim)] text-black' : ''}`}>
              <Cpu size={16} className="mb-1" />
              {isVsComputer ? 'CPU:ON' : 'CPU:OFF'}
            </button>
            {isVsComputer && (
              <div className="relative border-r border-[var(--term-main)] flex items-center justify-center">
                <button
                  onClick={() => !isComputing && setShowDifficultyDropdown(!showDifficultyDropdown)}
                  disabled={isComputing}
                  className="p-3 w-full h-full bg-[var(--term-bg)] text-[var(--term-main)] hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] transition-colors uppercase font-bold text-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1"
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
            <button onClick={undoMove} disabled={isComputing} className="p-3 border-r border-[var(--term-main)] hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] transition-colors uppercase font-bold text-center text-sm disabled:opacity-50 flex flex-col items-center justify-center cursor-pointer">
              <Undo size={16} className="mb-1" />
              UNDO
            </button>
            <button onClick={resetGame} disabled={isComputing} className="p-3 hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] transition-colors uppercase font-bold text-center text-sm disabled:opacity-50 flex flex-col items-center justify-center cursor-pointer">
              <RefreshCw size={16} className="mb-1" />
              NEW GAME
            </button>
          </div>
        </aside>

        {/* Main Content - Board + Analysis, scrollable until lg breakpoint */}
        <main className="flex-1 flex flex-col min-h-0 relative bg-[var(--term-bg)] overflow-y-auto lg:overflow-hidden">

          {/* Board Section - scrollable until lg breakpoint, hide when expanded */}
          <div className={`p-2 md:p-4 lg:flex-shrink-0 lg:flex-1 flex flex-col items-center justify-center relative lg:max-h-none ${isMobileExpanded ? 'hidden md:flex' : ''}`}>

            {/* Opponent Clock (Black) */}
            {!isUnlimitedTime && (
              <div className="w-full flex justify-between items-center mb-1 h-[24px] md:h-[36px] flex-shrink-0" style={{ maxWidth: 'min(100%, 85vh)' }}>
                  <span className="text-[10px] md:text-xs font-bold text-[var(--term-dim)]">OPPONENT {isVsComputer ? '(CPU)' : ''}</span>
                  <Clock
                    timeMs={timeLeft.b}
                    isActive={gameStatus === 'playing' && game.turn() === 'b'}
                    isLowTime={timeLeft.b < 30000}
                  />
              </div>
            )}

            {/* Board Container - Square, width-based on mobile, height-based on desktop */}
            <div
              className="flex items-center justify-center relative w-full md:flex-1 md:min-h-0"
              style={{ maxWidth: 'min(100%, 85vh)' }}
            >
               <div
                 className="shadow-[0_0_10px_rgba(var(--term-main-rgb),0.3)] w-full md:h-full"
                 style={{
                   aspectRatio: '1/1',
                   maxWidth: '100%',
                 }}
               >
                  <ChessBoard
                    game={game}
                    onMove={handleMove}
                    lastMove={lastMove}
                  />
               </div>

               {/* Game Over Overlay */}
               {gameStatus === 'ended' && (
                   <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/10">
                       <div className="bg-[var(--term-bg)]/40 border-2 border-[var(--term-main)] p-4 md:p-6 text-center shadow-[0_0_20px_var(--term-main)]">
                           <h2 className="text-2xl md:text-3xl font-bold uppercase mb-2 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">Game Over</h2>
                           <p className="text-lg md:text-xl mb-4 text-[var(--term-dim)] drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
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

            {/* Player Clock (White) */}
            {!isUnlimitedTime && (
              <div className="w-full flex justify-between items-center mt-1 h-[28px] md:h-[36px] flex-shrink-0" style={{ maxWidth: '85vh' }}>
                  <span className="text-[10px] md:text-xs font-bold text-[var(--term-dim)]">YOU</span>
                  <Clock
                    timeMs={timeLeft.w}
                    isActive={gameStatus === 'playing' && game.turn() === 'w'}
                    isLowTime={timeLeft.w < 30000}
                  />
              </div>
            )}

          </div>

          {/* Mobile Analysis Panel */}
          <div className={`md:hidden overflow-hidden border-t border-[var(--term-main)] ${isMobileExpanded ? 'flex-1' : 'h-[160px] flex-shrink-0'}`}>
            <DeepAnalysisPanel
              rootNode={treeRoot}
              activeNodeId={currentNodeId}
              onNodeClick={jumpToNode}
              isMobileExpanded={isMobileExpanded}
              onToggleMobileExpand={() => setIsMobileExpanded(!isMobileExpanded)}
              principalVariation={principalVariation}
              analyzingNodeId={analyzingNodeId}
            />
          </div>
        </main>

      </div>

      {/* Mobile Controls Footer - Only on mobile */}
      <div className={`md:hidden grid ${isVsComputer ? 'grid-cols-4' : 'grid-cols-3'} border-t border-[var(--term-main)] bg-[var(--term-bg)] flex-shrink-0`}>
         <button onClick={toggleComputerMode} className={`p-2 border-r border-[var(--term-main)] hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] transition-colors uppercase font-bold text-center text-xs flex flex-col items-center justify-center cursor-pointer ${isVsComputer ? 'bg-[var(--term-dim)] text-black' : ''}`}>
          <Cpu size={14} className="mb-0.5" />
          {isVsComputer ? 'CPU' : 'CPU'}
        </button>
        {isVsComputer && (
          <div className="relative border-r border-[var(--term-main)] flex items-center justify-center">
            <button
              onClick={() => !isComputing && setShowDifficultyDropdown(!showDifficultyDropdown)}
              disabled={isComputing}
              className="p-2 w-full h-full bg-[var(--term-bg)] text-[var(--term-main)] hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] transition-colors uppercase font-bold text-xs disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1"
            >
              {difficulty.toUpperCase().slice(0, 3)}
              <ChevronDown size={10} className={`transition-transform ${showDifficultyDropdown ? 'rotate-180' : ''}`} />
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
        <button onClick={undoMove} disabled={isComputing} className="p-2 border-r border-[var(--term-main)] hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] transition-colors uppercase font-bold text-center text-xs disabled:opacity-50 flex flex-col items-center justify-center cursor-pointer">
          <Undo size={14} className="mb-0.5" />
          UNDO
        </button>
        <button onClick={resetGame} disabled={isComputing} className="p-2 hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] transition-colors uppercase font-bold text-center text-xs disabled:opacity-50 flex flex-col items-center justify-center cursor-pointer">
          <RefreshCw size={14} className="mb-0.5" />
          NEW
        </button>
      </div>
    </div>
  );
}

// Wrapper component with Suspense for useSearchParams
export default function GambitPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-[var(--term-bg)]">
        <div className="text-[var(--term-main)] animate-pulse">Loading...</div>
      </div>
    }>
      <GambitContent />
    </Suspense>
  );
}
