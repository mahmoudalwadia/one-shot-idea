import { BiomeType, Difficulty } from './types';

export const TILE_SIZE = 64;
export const PLAYER_SPEED = 0.18;

export const PREVIEW_DURATION: Record<Difficulty, number> = {
  [Difficulty.NORMAL]: 6,
  [Difficulty.HARD]: 4,
  [Difficulty.EXPERT]: 2,
};

export const getMazeSize = (level: number) => {
    const base = 15;
    const growth = 4;
    return Math.min(81, base + (level - 1) * growth);
};

export const BIOME_COLORS: Record<BiomeType, { ground: string[]; particle: string; text: string }> = {
  [BiomeType.FOREST]: {
    ground: ['#1a331a', '#224022', '#152915'],
    particle: '#4ade80',
    text: '#86efac'
  },
  [BiomeType.DESERT]: {
    ground: ['#dcb159', '#d4a750', '#e3ba64'],
    particle: '#fde047',
    text: '#facc15'
  },
  [BiomeType.CAVERNS]: {
    ground: ['#1e1b2e', '#25213b', '#181524'],
    particle: '#d8b4fe',
    text: '#e9d5ff'
  },
  [BiomeType.ISLANDS]: {
    ground: ['#bfdbfe', '#dbeafe', '#93c5fd'],
    particle: '#ffffff',
    text: '#e0f2fe'
  },
  [BiomeType.NEON]: {
    ground: ['#09090b', '#18181b', '#000000'],
    particle: '#2dd4bf',
    text: '#f0abfc'
  },
  [BiomeType.OCEAN]: {
    ground: ['#0c4a6e', '#075985', '#082f49'],
    particle: '#7dd3fc',
    text: '#38bdf8'
  },
  [BiomeType.ARCTIC]: {
    ground: ['#f8fafc', '#f1f5f9', '#e2e8f0'],
    particle: '#ffffff',
    text: '#94a3b8'
  },
  [BiomeType.VOLCANIC]: {
    ground: ['#1c1917', '#292524', '#0c0a09'],
    particle: '#ef4444',
    text: '#f87171'
  },
  [BiomeType.ANCIENT]: {
    ground: ['#2d362d', '#1e241e', '#3f4d3f'],
    particle: '#4ade80',
    text: '#fbbf24'
  },
  [BiomeType.TOXIC]: {
    ground: ['#141b14', '#1a241a', '#0d110d'],
    particle: '#a3e635',
    text: '#bef264'
  },
  [BiomeType.CELESTIAL]: {
    ground: ['#020617', '#0f172a', '#1e1b4b'],
    particle: '#f472b6',
    text: '#818cf8'
  },
  [BiomeType.AUTUMN]: {
    ground: ['#7c2d12', '#9a3412', '#431407'],
    particle: '#f97316',
    text: '#fdba74'
  },
  [BiomeType.INDUSTRIAL]: {
    ground: ['#27272a', '#3f3f46', '#18181b'],
    particle: '#71717a',
    text: '#cbd5e1'
  },
  [BiomeType.JUNGLE]: {
    ground: ['#064e3b', '#065f46', '#022c22'],
    particle: '#fbbf24',
    text: '#fbbf24'
  },
  [BiomeType.ETHERIC]: {
    ground: ['#4c1d95', '#5b21b6', '#2e1065'],
    particle: '#e879f9',
    text: '#f5d0fe'
  },
  [BiomeType.CANYON]: {
    ground: ['#7f1d1d', '#991b1b', '#b91c1c'],
    particle: '#fca5a5',
    text: '#f87171'
  }
};
