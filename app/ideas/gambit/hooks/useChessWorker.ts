'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { Difficulty } from '../services/chessEngine';

interface WorkerResult {
  move: string | null;
  pv: string[];
  eval: number;
}

export const useChessWorker = () => {
  const workerRef = useRef<Worker | null>(null);
  const [isReady, setIsReady] = useState(false);
  const pendingResolveRef = useRef<((result: WorkerResult) => void) | null>(null);

  useEffect(() => {
    // Create worker
    workerRef.current = new Worker(
      new URL('../services/chessWorker.ts', import.meta.url)
    );

    workerRef.current.onmessage = (e: MessageEvent<WorkerResult>) => {
      if (pendingResolveRef.current) {
        pendingResolveRef.current(e.data);
        pendingResolveRef.current = null;
      }
    };

    workerRef.current.onerror = (error) => {
      console.error('Chess worker error:', error);
      if (pendingResolveRef.current) {
        pendingResolveRef.current({ move: null, pv: [], eval: 0 });
        pendingResolveRef.current = null;
      }
    };

    setIsReady(true);

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  const getBestMove = useCallback(
    (fen: string, difficulty: Difficulty): Promise<WorkerResult> => {
      return new Promise((resolve) => {
        if (!workerRef.current) {
          resolve({ move: null, pv: [], eval: 0 });
          return;
        }

        pendingResolveRef.current = resolve;
        workerRef.current.postMessage({
          type: 'getBestMove',
          fen,
          difficulty,
        });
      });
    },
    []
  );

  return { getBestMove, isReady };
};
