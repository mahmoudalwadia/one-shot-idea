export enum BiomeType {
  FOREST = 'Mystic Forest',
  DESERT = 'Golden Desert',
  CAVERNS = 'Crystal Caverns',
  ISLANDS = 'Floating Islands',
  NEON = 'Neon Metropolis',
  OCEAN = 'Deep Ocean',
}

export interface Vector2 {
  x: number;
  y: number;
}

export interface Tile {
  x: number;
  y: number;
  biome: BiomeType;
  isSolid: boolean;
  decoration?: DecorationType;
  variation: number; // 0-1 random value for texture variation
}

export enum DecorationType {
  TREE = 'tree',
  ROCK = 'rock',
  CRYSTAL = 'crystal',
  CLOUD = 'cloud',
  BUILDING = 'building',
  CORAL = 'coral',
  NONE = 'none'
}

export interface DialogueOption {
  text: string;
  nextId?: string; // If null, ends conversation
  action?: () => void;
}

export interface DialogueNode {
  id: string;
  text: string;
  options: DialogueOption[];
}

export interface NPC {
  id: string;
  name: string;
  color: string;
  position: Vector2;
  dialogueRoot: string;
  dialogueNodes: Record<string, DialogueNode>;
}

export interface Collectible {
  id: string;
  position: Vector2;
  biome: BiomeType;
  collected: boolean;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  type: 'leaf' | 'sand' | 'sparkle' | 'rain' | 'bubble' | 'cloud';
}

export interface GameState {
  playerPos: Vector2;
  playerFacing: Vector2; // Direction player is looking
  isMoving: boolean;     // Whether player is currently walking
  score: number;
  discoveries: number;
  currentBiome: BiomeType;
  isDialogueOpen: boolean;
  activeNPC: NPC | null;
  currentDialogueNode: DialogueNode | null;
}
