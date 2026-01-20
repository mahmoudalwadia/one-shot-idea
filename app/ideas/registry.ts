import type { IdeaMeta } from '@/app/types/idea';

export const ideas: IdeaMeta[] = [
  {
    slug: 'masonry',
    title: 'Glass Masonry Gallery',
    description: 'A beautiful glass-effect masonry image gallery with smooth animations and dynamic layouts.',
    featured: false,
  },
  {
    slug: 'hand-3d',
    title: 'The Scarred Hand',
    description: 'Interactive 3D hand visualization with detailed textures and atmospheric lighting.',
    featured: false,
  },
  {
    slug: 'simulation',
    title: 'Simulation Patterns',
    description: 'Mesmerizing visual simulation patterns with interactive controls and emergent behaviors.',
    featured: false,
  },
  {
    slug: 'world-explorer',
    title: 'World Explorer',
    description: 'Explore procedurally generated 3D worlds with immersive navigation and discovery.',
    featured: false,
  },
  {
    slug: 'japanese-web',
    title: 'デジタル東京',
    description: 'A digital Tokyo-inspired web experience with Japanese aesthetics and neon atmosphere.',
    featured: false,
  },
  {
    slug: 'supernova',
    title: 'Supernova',
    description: 'Control the lifecycle of a star with your hands - from stable fusion to explosive supernova.',
    featured: true,
  },
  {
    slug: 'retro-dashboard',
    title: 'Retro-Futuristic Dashboard',
    description: 'A retro-futuristic control dashboard with vintage CRT aesthetics and analog displays.',
    featured: false,
  },
  {
    slug: 'xenon-interface',
    title: 'Xenon Interface 9000',
    description: 'Sci-fi themed interface with neon glow effects and futuristic control panels.',
    featured: false,
  },
  {
    slug: 'chameleon-chat',
    title: 'Chameleon Chat',
    description: 'A chat interface that adapts its personality and visual style dynamically.',
    featured: false,
  },
  {
    slug: 'terra',
    title: 'Terra',
    description: 'An interactive 3D globe visualization with dynamic terrain and atmospheric effects.',
    featured: true,
  },
  {
    slug: 'minesweeper',
    title: 'Minesweeper',
    description: 'Classic Minesweeper game reimagined with modern visuals and smooth interactions.',
    featured: false,
  },
  {
    slug: 'terminal-solitaire',
    title: 'Terminal Solitaire',
    description: 'Classic solitaire card game with a terminal aesthetic and hacker vibes.',
    featured: false,
  },
  {
    slug: 'gambit',
    title: 'Gambit',
    description: 'A chess game with a terminal interface.',
    featured: true,
  },
  {
    slug: 'ascii-cortex',
    title: 'ASCII Cortex',
    description: 'ASCII art neural network visualization with real-time pulse animations.',
    featured: false,
  },
  {
    slug: 'a-train-retro-sim',
    title: 'A-Train Retro Sim',
    description: 'A retro-style train simulation game inspired by classic A-Train titles.',
    featured: false,
  },
  {
    slug: 'pixel-chaos-engine',
    title: 'Pixel Chaos Engine',
    description: 'A chaotic pixel art generator with emergent behavior and colorful patterns.',
    featured: true,
  },
  {
    slug: 'hero-adventure-retro',
    title: 'Hero Adventure Retro',
    description: 'A retro-style adventure game with pixel art graphics and classic gameplay.',
    featured: false,
  },
  {
    slug: 'retro-tetris',
    title: 'Retro Tetris',
    description: 'Classic Tetris game with authentic retro visuals, sounds, and gameplay feel.',
    featured: true,
  },
  {
    slug: 'generative-pattern-studio',
    title: 'Pattern Studio',
    description: 'Create and explore generative art patterns with interactive controls.',
    featured: false,
  },
  {
    slug: 'worlds-maze-game',
    title: 'Worlds Maze',
    description: 'Navigate through procedurally generated mazes across 16 unique atmospheric biomes.',
    featured: true,
  },
];

export function getIdeaBySlug(slug: string): IdeaMeta | undefined {
  return ideas.find((idea) => idea.slug === slug);
}

export function getAllIdeas(): IdeaMeta[] {
  return ideas;
}

export function getFeaturedIdeas(): IdeaMeta[] {
  return ideas.filter((idea) => idea.featured);
}
