"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Hook to detect mobile screen size
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

type PatternType = "matrix" | "grid" | "glitch" | "scan" | "binary" | "noise" | "wave" | "particles" | "hexagon" | "DNA" | "brokenTV" | "wavyNets";

interface Pattern {
  id: PatternType;
  name: string;
  description: string;
}

const patterns: Pattern[] = [
  { id: "matrix", name: "Matrix Rain", description: "Cascading digital code" },
  { id: "grid", name: "Digital Grid", description: "Infinite wireframe mesh" },
  { id: "glitch", name: "Glitch Reality", description: "Reality fragmentation" },
  { id: "scan", name: "Scan Lines", description: "CRT monitor aesthetic" },
  { id: "binary", name: "Binary Stream", description: "Raw data flow" },
  { id: "noise", name: "Static Noise", description: "Signal interference" },
  { id: "wave", name: "Data Waves", description: "Oscillating energy fields" },
  { id: "particles", name: "Particle Field", description: "Quantum fluctuations" },
  { id: "hexagon", name: "Hexagonal Grid", description: "Cellular structure" },
  { id: "DNA", name: "DNA Helix", description: "Genetic code spiral" },
  { id: "brokenTV", name: "Broken TV", description: "Signal distortion" },
  { id: "wavyNets", name: "Wavy Nets", description: "Multi-layer mesh waves" },
];

export default function SimulationPage() {
  const [selectedPattern, setSelectedPattern] = useState<PatternType>("matrix");

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black">
      {/* Pattern Backgrounds */}
      {selectedPattern === "matrix" && <MatrixPattern />}
      {selectedPattern === "grid" && <GridPattern />}
      {selectedPattern === "glitch" && <GlitchPattern />}
      {selectedPattern === "scan" && <ScanPattern />}
      {selectedPattern === "binary" && <BinaryPattern />}
      {selectedPattern === "noise" && <NoisePattern />}
      {selectedPattern === "wave" && <WavePattern />}
      {selectedPattern === "particles" && <ParticlesPattern />}
      {selectedPattern === "hexagon" && <HexagonPattern />}
      {selectedPattern === "DNA" && <DNAPattern />}
      {selectedPattern === "brokenTV" && <BrokenTVPattern />}
      {selectedPattern === "wavyNets" && <WavyNetsPattern />}

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 h-full flex flex-col pointer-events-auto">
          {/* Header */}
          <div className="mb-auto">
            <Link
              href="/"
              className="inline-flex items-center text-green-400 hover:text-green-300 active:text-green-500 transition-colors mb-4 sm:mb-6 touch-manipulation"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
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
              <span className="text-sm sm:text-base">Back</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-green-400 mb-2 font-mono">
              Simulation Patterns
            </h1>
            <p className="text-green-500 text-xs sm:text-sm font-mono">
              We are living in a simulation
            </p>
          </div>

          {/* Pattern Selector */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <label
              htmlFor="pattern-select"
              className="block text-green-400 text-xs sm:text-sm font-mono mb-2 sm:mb-3"
            >
              Select Reality Layer:
            </label>
            <select
              id="pattern-select"
              value={selectedPattern}
              onChange={(e) => setSelectedPattern(e.target.value as PatternType)}
              className="bg-black border-2 border-green-500 text-green-400 px-3 sm:px-4 py-2.5 sm:py-2 rounded font-mono text-xs sm:text-sm focus:outline-none focus:border-green-300 cursor-pointer hover:bg-green-950 active:bg-green-900 transition-colors touch-manipulation"
            >
              {patterns.map((pattern) => (
                <option key={pattern.id} value={pattern.id}>
                  {pattern.name} — {pattern.description}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// Matrix Rain Pattern - Optimized CSS version
function MatrixPattern() {
  const isMobile = useIsMobile();
  const columnCount = isMobile ? 25 : 60;
  const charsPerColumn = isMobile ? 20 : 30;
  const fontSize = isMobile ? 12 : 14;

  const columns = Array.from({ length: columnCount }, (_, i) => ({
    x: `${(i / columnCount) * 100}%`,
    duration: 3 + (i * 0.1) % 2,
    delay: (i * 0.15) % 2,
    chars: Array.from({ length: charsPerColumn }, (_, j) =>
      String.fromCharCode(0x30a0 + ((i * 7 + j * 13) % 96))
    )
  }));

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <style>
        {`
          @keyframes matrix-fall {
            0% { transform: translateY(-100%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
        `}
      </style>
      {columns.map((col, colIdx) => (
        <div
          key={`matrix-col-${colIdx}`}
          style={{
            position: 'absolute',
            top: 0,
            left: col.x,
            fontFamily: 'monospace',
            fontSize: `${fontSize}px`,
            color: '#00ff00',
            whiteSpace: 'nowrap',
            willChange: 'transform',
            animationName: 'matrix-fall',
            animationDuration: `${col.duration}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `${col.delay}s`,
          }}
        >
          {col.chars.map((char, charIdx) => (
            <span
              key={`matrix-char-${colIdx}-${charIdx}`}
              style={{
                display: 'block',
                lineHeight: 1.2,
              }}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

// Digital Grid Pattern
function GridPattern() {
  const isMobile = useIsMobile();

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: isMobile ? "30px 30px" : "50px 50px",
        animation: "grid-move 20s linear infinite",
      }}
    >
      <style>
        {`
          @keyframes grid-move {
            0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
            100% { transform: perspective(500px) rotateX(60deg) translateY(50px); }
          }
        `}
      </style>
      {/* Grid lines with perspective */}
      <div className="absolute inset-0 w-full h-full opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={`grid-line-${i * 5}`}
            className="absolute left-0 right-0 w-full h-px bg-green-500"
            style={{ top: `${i * 5}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// Glitch Pattern
function GlitchPattern() {
  const isMobile = useIsMobile();
  const blockCount = isMobile ? 10 : 15;

  const glitchBlocks = Array.from({ length: blockCount }, (_, i) => ({
    left: ((i * 37) % 100),
    top: ((i * 53) % 100),
    width: 50 + ((i * 17) % 200),
    height: 2 + ((i * 7) % 10),
    delay: (i * 0.02) % 0.3,
  }));

  return (
    <div className="absolute inset-0 w-full h-full">
      <style>
        {`
          @keyframes glitch-1 {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-5px); }
            40% { transform: translateX(5px); }
            60% { transform: translateX(-5px); }
            80% { transform: translateX(5px); }
          }
          @keyframes glitch-2 {
            0%, 100% { transform: translateX(0) scaleX(1); }
            25% { transform: translateX(10px) scaleX(1.05); }
            50% { transform: translateX(-10px) scaleX(0.95); }
            75% { transform: translateX(10px) scaleX(1.05); }
          }
          .glitch-layer {
            animation: glitch-1 0.3s infinite;
          }
          .glitch-overlay {
            animation: glitch-2 0.5s infinite;
          }
        `}
      </style>
      <div className="absolute inset-0 w-full h-full bg-black">
        {/* Base layer */}
        <div
          className="absolute inset-0 w-full h-full opacity-30"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              rgba(0, 255, 0, 0.1) 0px,
              transparent 2px,
              transparent 4px,
              rgba(0, 255, 0, 0.1) 4px
            )`,
          }}
        />
        {/* Glitch blocks */}
        {glitchBlocks.map((block) => (
          <div
            key={`glitch-${block.left}-${block.top}-${block.width}-${block.height}`}
            className="glitch-layer absolute bg-green-500"
            style={{
              left: `${block.left}%`,
              top: `${block.top}%`,
              width: `${block.width}px`,
              height: `${block.height}px`,
              opacity: 0.2,
              animationDelay: `${block.delay}s`,
            }}
          />
        ))}
        {/* Color shift overlay */}
        <div
          className="glitch-overlay absolute inset-0 w-full h-full mix-blend-screen opacity-50"
          style={{
            background: "rgba(255, 0, 0, 0.1)",
          }}
        />
      </div>
    </div>
  );
}

// Scan Lines Pattern
function ScanPattern() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <style>
        {`
          @keyframes scan {
            0% { top: -10%; }
            100% { top: 110%; }
          }
          .scan-line {
            animation: scan 3s linear infinite;
          }
        `}
      </style>
      {/* Horizontal scan lines */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent 0px,
            rgba(0, 255, 0, 0.03) 1px,
            transparent 2px
          )`,
        }}
      />
      {/* Moving scan line */}
      <div
        className="scan-line absolute left-0 w-full h-1 opacity-40"
        style={{
          background: "linear-gradient(to bottom, transparent, #00ff00, transparent)",
          boxShadow: "0 0 20px #00ff00",
          top: "0%",
        }}
      />
      {/* Vignette effect */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      />
    </div>
  );
}

// Binary Stream Pattern
function BinaryPattern() {
  const isMobile = useIsMobile();
  const lineCount = isMobile ? 100 : 200;
  const charsPerLine = isMobile ? 100 : 250;

  const binaryLines = Array.from({ length: lineCount }, (_, i) =>
    Array.from({ length: charsPerLine }, (_, j) => ((i * 7 + j * 13) % 2 === 0 ? "1" : "0")).join("")
  );

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <style>
        {`
          @keyframes binary-scroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          .binary-stream {
            animation: binary-scroll 20s linear infinite;
            width: 100%;
            height: 200%;
          }
        `}
      </style>
      <div className={`binary-stream font-mono text-green-500 ${isMobile ? 'text-[10px]' : 'text-xs'} leading-tight`}>
        {binaryLines.map((line, i) => (
          <div key={`binary-${line.substring(0, 10)}-${i}`} className="whitespace-nowrap opacity-30 w-full overflow-hidden">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

// Static Noise Pattern
function NoisePattern() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <style>
        {`
          @keyframes noise {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-5%, -5%); }
            20% { transform: translate(-10%, 5%); }
            30% { transform: translate(5%, -10%); }
            40% { transform: translate(-5%, 15%); }
            50% { transform: translate(-10%, 5%); }
            60% { transform: translate(15%, 0); }
            70% { transform: translate(0, 10%); }
            80% { transform: translate(-15%, 0); }
            90% { transform: translate(10%, 5%); }
          }
          .noise-bg {
            animation: noise 0.2s infinite;
          }
        `}
      </style>
      <div
        className="noise-bg absolute inset-0 w-full h-full opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            rgba(0, 255, 0, 0.05) 0px,
            transparent 1px,
            transparent 2px,
            rgba(0, 255, 0, 0.05) 3px
          )`,
        }}
      />
    </div>
  );
}

// Data Waves Pattern
function WavePattern() {
  const isMobile = useIsMobile();
  const waveCount = isMobile ? 8 : 12;

  return (
    <div className="absolute inset-0 w-full h-full">
      <style>
        {`
          @keyframes wave {
            0% { transform: translateY(0) scaleY(1); }
            50% { transform: translateY(-2%) scaleY(1.1); }
            100% { transform: translateY(0) scaleY(1); }
          }
          .wave-line {
            animation: wave 3s ease-in-out infinite;
          }
        `}
      </style>
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <title>Data Waves Pattern</title>
        {Array.from({ length: waveCount }, (_, i) => {
          const yPos = 10 + (i / (waveCount - 1)) * 80;
          return (
            <path
              key={`wave-${yPos}-${i * 0.2}`}
              className="wave-line"
              d={`M 0 ${yPos} Q 12.5 ${yPos - 3} 25 ${yPos} T 50 ${yPos} T 75 ${yPos} T 100 ${yPos}`}
              stroke="#00ff00"
              strokeWidth="0.3"
              fill="none"
              opacity={0.4 - i * 0.02}
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            />
          );
        })}
      </svg>
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.9) 100%)",
        }}
      />
    </div>
  );
}

// Particle Field Pattern
function ParticlesPattern() {
  const isMobile = useIsMobile();
  const particleCount = isMobile ? 25 : 50;

  const particles = Array.from({ length: particleCount }, (_, i) => ({
    x: (i * 37) % 100,
    y: (i * 53) % 100,
    size: 2 + (i % 4),
    delay: (i * 0.1) % 3,
    duration: 3 + (i % 3),
  }));

  return (
    <div className="absolute inset-0 w-full h-full">
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translate(0, 0); opacity: 0.3; }
            50% { transform: translate(20px, -30px); opacity: 1; }
          }
          .particle {
            animation: float linear infinite;
          }
        `}
      </style>
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <title>Particle Field Pattern</title>
        {particles.map((p) => (
          <circle
            key={`particle-${p.x}-${p.y}-${p.size}-${p.delay}`}
            className="particle"
            cx={`${p.x}%`}
            cy={`${p.y}%`}
            r={p.size}
            fill="#00ff00"
            style={{
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
        {particles.map((p, i) => {
          const nextP = particles[(i + 1) % particles.length];
          return (
            <line
              key={`line-${p.x}-${p.y}-${nextP.x}-${nextP.y}`}
              x1={`${p.x}%`}
              y1={`${p.y}%`}
              x2={`${nextP.x}%`}
              y2={`${nextP.y}%`}
            stroke="#00ff00"
            strokeWidth="0.5"
            opacity="0.2"
          />
          );
        })}
      </svg>
    </div>
  );
}

// Hexagonal Grid Pattern
function HexagonPattern() {
  const isMobile = useIsMobile();
  const hexCount = isMobile ? 80 : 200;
  const colsPerRow = isMobile ? 12 : 20;

  const hexagons = Array.from({ length: hexCount }, (_, i) => {
    const row = Math.floor(i / colsPerRow);
    const col = i % colsPerRow;
    return {
      x: col * 5.5 + (row % 2) * 2.75,
      y: row * 10,
      delay: (i * 0.05) % 2,
    };
  });

  return (
    <div className="absolute inset-0 w-full h-full">
      <style>
        {`
          @keyframes pulse-hex {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
          }
          .hexagon {
            animation: pulse-hex 3s ease-in-out infinite;
          }
        `}
      </style>
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 100" preserveAspectRatio="none">
        <title>Hexagonal Grid Pattern</title>
        {hexagons.map((hex) => {
          const size = 2;
          const height = size * Math.sqrt(3) / 2;
          return (
            <polygon
              key={`hex-${hex.x}-${hex.y}-${hex.delay}`}
              className="hexagon"
              points={`
                ${hex.x + size},${hex.y}
                ${hex.x + size / 2},${hex.y + height}
                ${hex.x - size / 2},${hex.y + height}
                ${hex.x - size},${hex.y}
                ${hex.x - size / 2},${hex.y - height}
                ${hex.x + size / 2},${hex.y - height}
              `}
              fill="none"
              stroke="#00ff00"
              strokeWidth="0.2"
              style={{
                animationDelay: `${hex.delay}s`,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

// DNA Helix Pattern
function DNAPattern() {
  const isMobile = useIsMobile();
  const segmentCount = isMobile ? 50 : 80;

  const segments = Array.from({ length: segmentCount }, (_, i) => ({
    angle: (i * 18) % 360,
    y: (i * 2.5) % 200,
  }));

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <style>
        {`
          @keyframes rotate-helix {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          .helix-container {
            animation: rotate-helix 10s linear infinite;
          }
        `}
      </style>
      <svg className="helix-container absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ height: "200%" }}>
        <title>DNA Helix Pattern</title>
        {segments.map((seg) => {
          const x1 = 50 + Math.sin((seg.angle * Math.PI) / 180) * 15;
          const x2 = 50 - Math.sin((seg.angle * Math.PI) / 180) * 15;
          return (
            <g key={`dna-${seg.angle}-${seg.y}`}>
              <circle cx={x1} cy={seg.y} r="1.5" fill="#00ff00" opacity="0.8" />
              <circle cx={x2} cy={seg.y} r="1.5" fill="#00ff00" opacity="0.8" />
              <line
                x1={x1}
                y1={seg.y}
                x2={x2}
                y2={seg.y}
                stroke="#00ff00"
                strokeWidth="0.3"
                opacity="0.4"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Broken TV Pattern
function BrokenTVPattern() {
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      <style>
        {`
          @keyframes tv-flicker {
            0%, 100% { opacity: 1; }
            5% { opacity: 0.9; }
            10% { opacity: 1; }
            15% { opacity: 0.85; }
            20% { opacity: 1; }
            25% { opacity: 0.95; }
            30% { opacity: 1; }
          }
          @keyframes rgb-shift {
            0% { transform: translate(0, 0); }
            33% { transform: translate(-1px, 0); }
            66% { transform: translate(1px, 0); }
            100% { transform: translate(0, 0); }
          }
          @keyframes scan-roll {
            0% { transform: translateY(0); }
            100% { transform: translateY(100%); }
          }
          @keyframes horizontal-glitch {
            0%, 100% { transform: translateX(0); }
            10% { transform: translateX(-5px); }
            20% { transform: translateX(5px); }
            30% { transform: translateX(-3px); }
            40% { transform: translateX(3px); }
            50% { transform: translateX(-2px); }
            60% { transform: translateX(2px); }
            70% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
            90% { transform: translateX(-1px); }
          }
          @keyframes noise-anim {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-2%, -2%); }
            20% { transform: translate(-1%, 2%); }
            30% { transform: translate(3%, -1%); }
            40% { transform: translate(-3%, 3%); }
            50% { transform: translate(2%, 1%); }
            60% { transform: translate(1%, -3%); }
            70% { transform: translate(-2%, 2%); }
            80% { transform: translate(3%, -2%); }
            90% { transform: translate(-1%, 1%); }
          }
        `}
      </style>

      {/* Base static noise background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          animation: "noise-anim 0.2s infinite, tv-flicker 0.5s infinite",
          opacity: 0.6,
        }}
      />

      {/* RGB split overlay */}
      <div className="absolute inset-0 w-full h-full mix-blend-screen" style={{ animation: "rgb-shift 0.1s infinite" }}>
        <div className="absolute inset-0 w-full h-full bg-red-500 opacity-10" style={{ transform: "translateX(-2px)" }} />
        <div className="absolute inset-0 w-full h-full bg-green-500 opacity-10" />
        <div className="absolute inset-0 w-full h-full bg-blue-500 opacity-10" style={{ transform: "translateX(2px)" }} />
      </div>

      {/* Horizontal scan lines */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent 0px,
            rgba(0, 255, 0, 0.03) 1px,
            transparent 2px,
            transparent 3px
          )`,
        }}
      />

      {/* Moving vertical bars (glitch effect) */}
      {Array.from({ length: isMobile ? 15 : 30 }, (_, i) => {
        const left = (i * 37) % 100;
        const width = 2 + (i % 5);
        const delay = i * 0.02;
        return (
          <div
            key={`glitch-bar-${left}-${width}-${delay}`}
          className="absolute bg-green-500"
          style={{
            left: `${left}%`,
            top: 0,
            width: `${width}px`,
            height: "100%",
            opacity: (i % 5) * 0.05,
            animation: `horizontal-glitch ${0.3 + (i % 3) * 0.1}s infinite`,
            animationDelay: `${i * 0.02}s`,
          }}
        />
        );
      })}

      {/* Random glitch blocks */}
      {Array.from({ length: isMobile ? 25 : 40 }, (_, i) => {
        const left = (i * 47) % 100;
        const top = (i * 23) % 100;
        const width = 10 + (i % 20);
        const height = 1 + (i % 4);
        return (
          <div
            key={`block-${left}-${top}-${width}-${height}`}
          className="absolute"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${width}%`,
            height: `${height}px`,
            backgroundColor: i % 3 === 0 ? "#00ff00" : i % 3 === 1 ? "#ff0000" : "#0000ff",
            opacity: 0.15,
            animation: `horizontal-glitch ${0.2 + (i % 4) * 0.1}s infinite`,
            animationDelay: `${i * 0.01}s`,
          }}
        />
        );
      })}

      {/* Rolling scan line */}
      <div
        className="absolute left-0 w-full"
        style={{
          height: "3px",
          background: "linear-gradient(to bottom, transparent, rgba(0, 255, 0, 0.5), transparent)",
          boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)",
          animation: "scan-roll 2s linear infinite",
        }}
      />

      {/* Signal loss bars */}
      {Array.from({ length: 8 }, (_, i) => {
        const top = i * 12.5;
        const delay = i * 0.15;
        const duration = 0.4 + i * 0.1;
        return (
          <div
            key={`signal-${top}-${delay}-${duration}`}
          className="absolute left-0 w-full"
          style={{
            top: `${top}%`,
            height: "4px",
            backgroundColor: "#00ff00",
            opacity: 0.2,
            animation: `horizontal-glitch ${0.4 + i * 0.1}s infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
        );
      })}

      {/* Dark vignette */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      />
    </div>
  );
}

// Wavy Nets Pattern
function WavyNetsPattern() {
  const isMobile = useIsMobile();
  const layerCount = isMobile ? 4 : 6;

  const layers = Array.from({ length: layerCount }, (_, i) => ({
    gridSize: 12 + i * 3,
    delay: i * 0.5,
    duration: 5 + i * 0.8,
    opacity: 0.2 - i * 0.025,
  }));

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <style>
        {`
          @keyframes wave-undulate {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3%); }
          }
          .wave-layer {
            animation: wave-undulate ease-in-out infinite;
          }
        `}
      </style>

      {layers.map((layer, layerIndex) => (
        <svg
          key={`layer-${layer.gridSize}-${layer.delay}-${layer.duration}`}
          className="wave-layer absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            animationDuration: `${layer.duration}s`,
            animationDelay: `${layer.delay}s`,
          }}
        >
          <title>Wavy Nets Pattern Layer {layerIndex + 1}</title>
          {/* Vertical lines */}
          {Array.from({ length: layer.gridSize }, (_, i) => {
            const x = (i / (layer.gridSize - 1)) * 100;
            const amplitude = 2.5 + layerIndex * 0.8;
            const frequency = 0.04 + layerIndex * 0.008;
            const phase = layerIndex * 20;
            const pathData = Array.from({ length: 100 }, (_, j) => {
              const y = j;
              const offset = Math.sin((y + phase) * frequency) * amplitude;
              return `${j === 0 ? "M" : "L"} ${x + offset} ${y}`;
            }).join(" ");

            return (
              <path
                key={`v-${layerIndex}-${x}-${amplitude}-${frequency}`}
                d={pathData}
                stroke="#00ff00"
                strokeWidth="0.15"
                fill="none"
                opacity={layer.opacity}
              />
            );
          })}

          {/* Horizontal lines */}
          {Array.from({ length: layer.gridSize }, (_, i) => {
            const y = (i / (layer.gridSize - 1)) * 100;
            const amplitude = 2.5 + layerIndex * 0.8;
            const frequency = 0.04 + layerIndex * 0.008;
            const phase = layerIndex * 20;
            const pathData = Array.from({ length: 100 }, (_, j) => {
              const x = j;
              const offset = Math.sin((x + phase) * frequency) * amplitude;
              return `${j === 0 ? "M" : "L"} ${x} ${y + offset}`;
            }).join(" ");

            return (
              <path
                key={`h-${layerIndex}-${y}-${amplitude}-${frequency}`}
                d={pathData}
                stroke="#00ff00"
                strokeWidth="0.15"
                fill="none"
                opacity={layer.opacity}
              />
            );
          })}
        </svg>
      ))}

      {/* Center glow effect */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(0,255,0,0.15) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
