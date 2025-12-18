"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";

interface CardData {
  id: number;
  title: string;
  category: string;
  height: "sm" | "md" | "lg" | "xl";
  color: string;
}

const cards: CardData[] = [
  { id: 1, title: "Ethereal Forms", category: "Abstract", height: "xl", color: "rgba(255, 255, 255, 0.25)" },
  { id: 2, title: "Urban Decay", category: "Photography", height: "sm", color: "rgba(255, 255, 255, 0.2)" },
  { id: 3, title: "Neon Dreams", category: "Digital", height: "md", color: "rgba(255, 255, 255, 0.3)" },
  { id: 4, title: "Quiet Moments", category: "Film", height: "lg", color: "rgba(255, 255, 255, 0.22)" },
  { id: 5, title: "Raw Texture", category: "Material", height: "sm", color: "rgba(255, 255, 255, 0.28)" },
  { id: 6, title: "Light Study", category: "Photography", height: "xl", color: "rgba(255, 255, 255, 0.18)" },
  { id: 7, title: "Void Space", category: "Architecture", height: "md", color: "rgba(255, 255, 255, 0.24)" },
  { id: 8, title: "Kinetic Flow", category: "Motion", height: "sm", color: "rgba(255, 255, 255, 0.26)" },
  { id: 9, title: "Brutalist", category: "Architecture", height: "xl", color: "rgba(255, 255, 255, 0.2)" },
  { id: 10, title: "Analog Waves", category: "Sound", height: "md", color: "rgba(255, 255, 255, 0.22)" },
  { id: 11, title: "Fractured", category: "Abstract", height: "lg", color: "rgba(255, 255, 255, 0.25)" },
  { id: 12, title: "Still Life", category: "Photography", height: "sm", color: "rgba(255, 255, 255, 0.23)" },
  { id: 13, title: "Digital Waves", category: "Motion", height: "xl", color: "rgba(255, 255, 255, 0.27)" },
  { id: 14, title: "Urban Light", category: "Photography", height: "md", color: "rgba(255, 255, 255, 0.21)" },
  { id: 15, title: "Abstract Forms", category: "Abstract", height: "sm", color: "rgba(255, 255, 255, 0.24)" },
  { id: 16, title: "Structure", category: "Architecture", height: "lg", color: "rgba(255, 255, 255, 0.26)" },
];

const heightMap = {
  sm: "h-48",
  md: "h-64",
  lg: "h-80",
  xl: "h-96",
};

// Helper function to clamp values
const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max);

function MasonryCard({ card, index }: { card: CardData; index: number }) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [isHovering, setIsHovering] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const absoluteX = e.clientX - rect.left;
    const absoluteY = e.clientY - rect.top;

    // Calculate percentage position (0-100)
    const percentX = clamp((100 / rect.width) * absoluteX);
    const percentY = clamp((100 / rect.height) * absoluteY);

    // Calculate center offset (-50 to 50)
    const centerX = percentX - 50;
    const centerY = percentY - 50;

    // Update pointer position for glare
    setPointer({ x: percentX, y: percentY });

    // Calculate rotation based on corner proximity (more intense at corners)
    const rotateY = -(centerX / 3.5);
    const rotateX = centerY / 2;

    setTransform({ rotateX, rotateY, scale: 1.02 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
    setPointer({ x: 50, y: 50 });
    setIsHovering(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  return (
    <button
      ref={cardRef}
      type="button"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`${heightMap[card.height]} relative cursor-pointer overflow-hidden rounded-lg shadow-sm w-full text-left border-0 bg-transparent p-0`}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
        transition: isHovering ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {/* Glass background with blur */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          backgroundColor: card.color,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      />

      {/* Glass inner glow / edge highlight */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.05) 100%
          )`,
        }}
      />

      {/* Subtle noise texture for glass feel */}
      <div
        className="absolute inset-0 rounded-lg opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Shimmer - single light sweep that follows cursor */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
        style={{
          background: `
            linear-gradient(
              105deg,
              transparent ${pointer.x - 15}%,
              rgba(255, 255, 255, 0.5) ${pointer.x - 5}%,
              rgba(255, 255, 255, 0.8) ${pointer.x}%,
              rgba(255, 255, 255, 0.5) ${pointer.x + 5}%,
              transparent ${pointer.x + 15}%
            )
          `,
          opacity: isHovering ? 1 : 0,
          transition: "opacity 0.25s ease-out",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <span
          className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1 transition-all duration-300"
          style={{
            transform: isHovering ? "translateY(0)" : "translateY(4px)",
            opacity: isHovering ? 1 : 0.6,
          }}
        >
          {card.category}
        </span>
        <h3
          className="text-neutral-800 text-sm font-light tracking-wide transition-all duration-300"
          style={{
            transform: isHovering ? "translateY(0)" : "translateY(4px)",
            opacity: isHovering ? 1 : 0.8,
          }}
        >
          {card.title}
        </h3>
      </div>

      {/* Corner accent */}
      <div
        className="absolute top-3 right-3 w-6 h-6 border-t border-r border-neutral-300 transition-all duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          transform: isHovering ? "translate(0, 0)" : "translate(-4px, 4px)",
        }}
      />

      {/* Glass border */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-300"
        style={{
          boxShadow: isHovering
            ? "inset 0 0 0 1px rgba(255,255,255,0.5), inset 0 1px 0 0 rgba(255,255,255,0.6), 0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.3)"
            : "inset 0 0 0 1px rgba(255,255,255,0.3), inset 0 1px 0 0 rgba(255,255,255,0.4), 0 0 0 1px rgba(255,255,255,0.2)",
        }}
      />
    </button>
  );
}

export default function MasonryPage() {
  return (
    <div
      className="min-h-screen px-4 py-16 md:px-8 lg:px-16 background-gradient-to-r from-blue-50 to-purple-50"
      style={{
        background: "linear-gradient(135deg, #cce0fa 0%, #f5f7fa 50%, #d7e9fe 100%)",
      }}
    >
      {/* Header with back arrow and title */}
      <div className="max-w-7xl mx-auto mb-12">
        <Link
          href="/"
          className="inline-flex items-center text-neutral-600 hover:text-neutral-800 transition-colors mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-label="Back arrow"
          >
            <title>Back arrow</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-4xl font-light text-neutral-800 mb-2">
          Glass Masonry Gallery
        </h1>
        <p className="text-neutral-600 text-sm">
          Interactive 3D tilt effects with glassmorphism design
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-3">
          {cards.map((card, index) => (
            <MasonryCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>

      {/* Footer accent line */}
      <div className="max-w-7xl mx-auto mt-24">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      </div>
    </div>
  );
}
