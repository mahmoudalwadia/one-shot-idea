'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { GameEngine, GameEngineState } from './services/gameEngine';
import { WorldGenerator } from './services/worldGenerator';
import { Renderer } from './services/renderer';
import { GameUI } from './components/GameUI';
import { GameState, BiomeType, Difficulty, PlayerTheme } from './types';
import { PREVIEW_DURATION } from './constants';

function LoadingScreen() {
  return (
    <div className="absolute inset-0 bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl font-black text-yellow-500 mb-4 animate-pulse">LOADING</div>
        <div className="text-gray-500 text-sm uppercase tracking-widest">Generating maze...</div>
      </div>
    </div>
  );
}

export default function WorldsMazeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const animationRef = useRef<number>(0);

  const [gameState, setGameState] = useState<GameState>({
    playerPos: { x: 1.5, y: 1.5 },
    playerFacing: { x: 0, y: 1 },
    playerTheme: PlayerTheme.EXPLORER,
    isMoving: false,
    score: 0,
    currentBiome: BiomeType.FOREST,
    level: 1,
    elapsedTime: 0,
    isLevelComplete: false,
    bestTimes: {},
    difficulty: Difficulty.NORMAL,
    isFullMapMode: false,
    mapModeTimeRemaining: 0,
    isPreviewPhase: true,
    previewTimeRemaining: PREVIEW_DURATION[Difficulty.NORMAL]
  });

  const [world, setWorld] = useState<WorldGenerator | null>(null);

  const gameStateRef = useRef(gameState);
  const worldRef = useRef(world);

  // Keep refs in sync
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    worldRef.current = world;
  }, [world]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (rendererRef.current) {
        rendererRef.current.resize(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // Create renderer
    rendererRef.current = new Renderer(ctx, canvas.width, canvas.height);

    // Create game engine
    const engine = new GameEngine((state: GameEngineState) => {
      setGameState(state.gameState);
      setWorld(state.world);
    });

    engine.start();
    engineRef.current = engine;

    // Render loop
    const render = () => {
      if (rendererRef.current && worldRef.current && gameStateRef.current) {
        const camera = {
          x: gameStateRef.current.playerPos.x,
          y: gameStateRef.current.playerPos.y
        };
        rendererRef.current.updateParticles();
        // Force full map view during preview phase
        const renderState = gameStateRef.current.isPreviewPhase
          ? { ...gameStateRef.current, isFullMapMode: true }
          : gameStateRef.current;
        rendererRef.current.draw(renderState, worldRef.current, camera);
      }
      animationRef.current = requestAnimationFrame(render);
    };

    // Start render loop
    animationRef.current = requestAnimationFrame(render);

    return () => {
      engine.stop();
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleNextLevel = () => {
    engineRef.current?.nextLevel();
  };

  const handleDifficultyChange = (diff: Difficulty) => {
    engineRef.current?.setDifficulty(diff);
  };

  const handleToggleView = () => {
    engineRef.current?.toggleFullMapMode();
  };

  const handleRegenerate = () => {
    engineRef.current?.regenerateCurrentLevel();
  };

  const handleBiomeChange = (biome: BiomeType) => {
    engineRef.current?.setBiome(biome);
  };

  const handleThemeChange = (theme: PlayerTheme) => {
    engineRef.current?.setPlayerTheme(theme);
  };

  const handleJoystickMove = (x: number, y: number) => {
    engineRef.current?.setTouchVector({ x, y });
  };

  return (
    <div className="fixed inset-0 w-full h-dvh bg-black overflow-hidden touch-none">
      {/* Back Button */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 bg-black/90 backdrop-blur-xl border border-gray-800 px-3 py-2 text-gray-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-all cursor-pointer flex items-center gap-2 text-xs font-black uppercase tracking-wider rounded-lg shadow-2xl"
      >
        <ArrowLeft size={14} /> Back
      </Link>

      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ imageRendering: 'pixelated' }}
      />

      {!world && <LoadingScreen />}

      {/* Preview countdown overlay */}
      {gameState.isPreviewPhase && world && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="text-center">
            <div
              className="text-6xl sm:text-8xl font-black tabular-nums"
              style={{
                color: '#fff',
                textShadow: '0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,255,255,0.4), 0 4px 8px rgba(0,0,0,0.8)',
                fontFamily: 'var(--font-geist-mono)'
              }}
            >
              {Math.ceil(gameState.previewTimeRemaining)}
            </div>
            <div
              className="text-base sm:text-xl uppercase tracking-widest mt-2 sm:mt-4 opacity-80 px-4"
              style={{
                color: '#fff',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)'
              }}
            >
              Memorize the maze
            </div>
          </div>
        </div>
      )}

      {/* Map mode countdown overlay */}
      {gameState.isFullMapMode && !gameState.isPreviewPhase && gameState.mapModeTimeRemaining > 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="text-center">
            <div
              className="text-6xl sm:text-8xl font-black tabular-nums"
              style={{
                color: '#fff',
                textShadow: '0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,255,255,0.4), 0 4px 8px rgba(0,0,0,0.8)',
                fontFamily: 'var(--font-geist-mono)'
              }}
            >
              {Math.ceil(gameState.mapModeTimeRemaining)}
            </div>
            <div
              className="text-base sm:text-xl uppercase tracking-widest mt-2 sm:mt-4 opacity-80"
              style={{
                color: '#fff',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)'
              }}
            >
              Map View
            </div>
          </div>
        </div>
      )}

      <GameUI
        gameState={gameState}
        onNextLevel={handleNextLevel}
        onDifficultyChange={handleDifficultyChange}
        onToggleView={handleToggleView}
        onRegenerate={handleRegenerate}
        onBiomeChange={handleBiomeChange}
        onThemeChange={handleThemeChange}
        onJoystickMove={handleJoystickMove}
      />
    </div>
  );
}
