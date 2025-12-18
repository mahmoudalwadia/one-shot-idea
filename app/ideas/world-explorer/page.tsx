'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { GameEngine } from './services/gameEngine';
import { GameUI } from './components/GameUI';
import { MobileControls } from './components/MobileControls';
import { GameState, BiomeType } from './types';

export default function WorldExplorerPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const movementRef = useRef<'up' | 'down' | 'left' | 'right' | null>(null);

  // React state for UI syncing
  const [gameState, setGameState] = useState<GameState>({
    playerPos: { x: 0, y: 0 },
    playerFacing: { x: 0, y: 1 },
    isMoving: false,
    score: 0,
    discoveries: 0,
    currentBiome: BiomeType.FOREST,
    isDialogueOpen: false,
    activeNPC: null,
    currentDialogueNode: null
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Game Engine
    const engine = new GameEngine(canvasRef.current, (newState) => {
      setGameState(newState);
    });

    engine.start();
    engineRef.current = engine;

    // Continuous movement update for touch controls
    const movementInterval = setInterval(() => {
      if (engineRef.current && movementRef.current) {
        const inputManager = engineRef.current.getInputManager();
        inputManager.setTouchMovement(movementRef.current);
      }
    }, 16); // ~60fps

    return () => {
      clearInterval(movementInterval);
      engine.stop();
    };
  }, []);

  const handleOptionSelect = (nextId?: string) => {
    engineRef.current?.advanceDialogue(nextId);
  };

  const handleCloseDialogue = () => {
    engineRef.current?.closeDialogue();
  };

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right' | null) => {
    movementRef.current = direction;
    if (engineRef.current) {
      const inputManager = engineRef.current.getInputManager();
      inputManager.setTouchMovement(direction);
    }
  };

  const handleInteract = () => {
    if (engineRef.current) {
      const inputManager = engineRef.current.getInputManager();
      inputManager.setTouchInteract(true);
      // Reset after a short delay
      setTimeout(() => {
        if (engineRef.current) {
          const inputManager = engineRef.current.getInputManager();
          inputManager.setTouchInteract(false);
        }
      }, 100);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden">
      {/* Exit Button */}
      <Link
        href="/"
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-black/80 rounded-lg transition-all backdrop-blur-sm group"
        title="Exit to Home"
      >
        <ArrowLeft size={16} className="text-yellow-500 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-mono text-yellow-500 group-hover:text-yellow-400">EXIT</span>
      </Link>

      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
      <GameUI
        gameState={gameState}
        onOptionSelect={handleOptionSelect}
        onCloseDialogue={handleCloseDialogue}
      />
      <MobileControls
        onMove={handleMove}
        onInteract={handleInteract}
      />
    </div>
  );
}
