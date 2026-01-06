'use client';

import { useRef, useEffect } from 'react';
import { PatternDefinition, Interaction } from '../types';

interface PatternCanvasProps {
  pattern: PatternDefinition;
  speed: number;
}

export default function PatternCanvas({ pattern, speed }: PatternCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);
  const interactionRef = useRef<Interaction>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      accumulatedTimeRef.current += delta;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          pattern.draw(
            ctx,
            canvas.width,
            canvas.height,
            accumulatedTimeRef.current,
            speed,
            interactionRef.current
          );
        }
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    const updateInteraction = (e: MouseEvent | TouchEvent) => {
      let x, y;
      const active = e.type === 'mousedown' || e.type === 'touchstart' || (e instanceof MouseEvent && e.buttons > 0) || (e instanceof TouchEvent && e.touches.length > 0);

      if (e instanceof MouseEvent) {
        x = e.clientX;
        y = e.clientY;
      } else {
        if (e.touches.length > 0) {
          x = e.touches[0].clientX;
          y = e.touches[0].clientY;
        } else {
          return;
        }
      }
      interactionRef.current = { x, y, active };
    };

    const handleEnd = () => {
      interactionRef.current = { ...interactionRef.current, active: false };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', updateInteraction);
    window.addEventListener('mousedown', updateInteraction);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchstart', updateInteraction, { passive: false });
    window.addEventListener('touchmove', updateInteraction, { passive: false });
    window.addEventListener('touchend', handleEnd);

    handleResize();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', updateInteraction);
      window.removeEventListener('mousedown', updateInteraction);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchstart', updateInteraction);
      window.removeEventListener('touchmove', updateInteraction);
      window.removeEventListener('touchend', handleEnd);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [pattern, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full touch-none"
    />
  );
}
