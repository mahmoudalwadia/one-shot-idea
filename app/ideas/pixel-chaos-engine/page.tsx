'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import ControlPanel from './components/ControlPanel';
import { ArtEngine } from './art/ArtEngine';
import { ArtConfig } from './types';
import { DEFAULT_STYLE_ID, STYLES } from './styles/registry';

export default function PixelChaosEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<ArtEngine | null>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const [isRecording, setIsRecording] = useState(false);

  // Initialize config with default style params
  const [config, setConfig] = useState<ArtConfig>(() => {
    const def = STYLES[DEFAULT_STYLE_ID];
    const defaultParams: Record<string, string | number | boolean> = {};
    Object.entries(def.schema).forEach(([key, schema]) => {
      defaultParams[key] = schema.default;
    });
    const seedValue = Math.floor(Math.random() * 10000);
    return {
      styleId: DEFAULT_STYLE_ID,
      seed: `chaos-${seedValue}`,
      params: defaultParams
    };
  });

  // Initialize Engine
  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = new ArtEngine(config);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only once

  // Handle Updates
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.updateConfig(config);
    }
  }, [config]);

  // Animation Loop
  const animate = useCallback((time: number) => {
    if (canvasRef.current && engineRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        // Clear logic handled by engine (mostly composites over static)
        engineRef.current.render(ctx, time);
      }
    }
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  // Handle Canvas Resizing with ResizeObserver (more robust for layout changes)
  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current && canvasRef.current && engineRef.current) {
        const { width: rw, height: rh } = engineRef.current.getResolution();
        const { clientWidth: cw, clientHeight: ch } = containerRef.current;

        // Calculate scale to fit CONTAIN
        const scale = Math.min(cw / rw, ch / rh) * 0.95;

        canvasRef.current.style.width = `${rw * scale}px`;
        canvasRef.current.style.height = `${rh * scale}px`;
      }
    };

    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);

    // Initial sizing
    if (engineRef.current) {
        const { width, height } = engineRef.current.getResolution();
        if (canvasRef.current) {
            canvasRef.current.width = width;
            canvasRef.current.height = height;
        }
        updateSize();
    }

    return () => observer.disconnect();
  }, []);

  const handleExportPNG = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `${config.styleId}-${config.seed}.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  const handleExportWebM = () => {
    if (canvasRef.current && !isRecording) {
      setIsRecording(true);
      const stream = canvasRef.current.captureStream(30);
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${config.styleId}-${config.seed}.webm`;
        link.click();
        URL.revokeObjectURL(url);
        setIsRecording(false);
      };
      recorder.start();
      setTimeout(() => recorder.stop(), 6000);
    }
  };

  return (
    // Mobile: flex-col-reverse (Controls at bottom)
    // Desktop: flex-row (Controls at left)
    <div className="flex flex-col-reverse md:flex-row h-screen w-screen bg-black overflow-hidden font-sans text-white relative">
      {/* Back Button - Desktop only (mobile version is in ControlPanel) */}
      <Link
        href="/"
        className="hidden md:block fixed top-4 right-4 z-50 px-3 py-1.5 bg-neutral-800/80 hover:bg-neutral-700 backdrop-blur-sm border border-neutral-600 rounded text-white text-sm transition-colors"
      >
        ← Back
      </Link>

      <ControlPanel
        config={config}
        onChange={setConfig}
        onGenerate={() => engineRef.current?.updateConfig(config)}
        onExportPNG={handleExportPNG}
        onExportWebM={handleExportWebM}
        isRecording={isRecording}
      />
      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center bg-dots p-4 relative min-h-0" // min-h-0 crucial for flex child scrolling/sizing
        style={{
          backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      >
        <canvas
          ref={canvasRef}
          className="shadow-2xl shadow-black border border-neutral-800 bg-black image-pixelated"
          style={{ imageRendering: 'pixelated' }}
        />
        {isRecording && (
          <div className="absolute top-8 right-8 bg-red-600 text-white px-4 py-2 text-xs font-bold uppercase rounded animate-pulse shadow-lg">
            Recording...
          </div>
        )}
      </div>
    </div>
  );
}
