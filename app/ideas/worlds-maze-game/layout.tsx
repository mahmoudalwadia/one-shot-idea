import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Worlds Maze Game - Navigate Through Procedural Biomes',
  description: 'A procedurally generated maze game featuring 16 unique biomes, multiple difficulty levels, and atmospheric worlds. Navigate through mystical forests, neon cities, volcanic wastes, and more.',
  openGraph: {
    title: 'Worlds Maze Game',
    description: 'Navigate through procedurally generated mazes across 16 unique atmospheric biomes.',
    images: [
      {
        url: '/worlds-maze-game.png',
        width: 1200,
        height: 630,
        alt: 'Worlds Maze Game Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Worlds Maze Game',
    description: 'Navigate through procedurally generated mazes across 16 unique atmospheric biomes.',
    images: ['/worlds-maze-game.png'],
  },
};

export default function WorldsMazeGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
