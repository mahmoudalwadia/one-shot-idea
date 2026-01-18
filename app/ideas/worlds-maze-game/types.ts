export enum BiomeType {
  FOREST = 'Mystic Forest',
  DESERT = 'Golden Desert',
  CAVERNS = 'Crystal Caverns',
  ISLANDS = 'Floating Islands',
  NEON = 'Neon Metropolis',
  OCEAN = 'Deep Ocean',
  ARCTIC = 'Arctic Tundra',
  VOLCANIC = 'Volcanic Wastes',
  ANCIENT = 'Ancient Ruins',
  TOXIC = 'Toxic Marsh',
  CELESTIAL = 'Celestial Void',
  AUTUMN = 'Autumn Grove',
  INDUSTRIAL = 'Iron Fortress',
  JUNGLE = 'Golden Jungle',
  ETHERIC = 'Etheric Realm',
  CANYON = 'Red Canyons'
}

export enum Difficulty {
  NORMAL = 'Normal',
  HARD = 'Hard',
  EXPERT = 'Expert',
}

export enum PlayerTheme {
  EXPLORER = 'Explorer',
  CAT = 'Feline',
  PACMAN = 'Orb-Eater',
  BOT = 'Unit-01',
  GHOST = 'Specter',
  SLIME = 'Slime',
  NINJA = 'Shinobi',
  ALIEN = 'Xenomorph',
  KNIGHT = 'Paladin',
  ROBOT_DOG = 'Sparky v2',
  VAMPIRE = 'Nosferatu',
  WIZARD = 'Mage',
  ASTRONAUT = 'Star-Walker',
  ZOMBIE = 'Undead',
  DRAGON = 'Drake',
  PHOENIX = 'Firebird'
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
  variation: number;
  isGoal?: boolean;
}

export enum DecorationType {
  TREE = 'tree',
  ROCK = 'rock',
  CRYSTAL = 'crystal',
  CLOUD = 'cloud',
  BUILDING = 'building',
  CORAL = 'coral',
  ICE = 'ice',
  OBSIDIAN = 'obsidian',
  RUIN = 'ruin',
  MUSHROOM = 'mushroom',
  STAR = 'star',
  PUMPKIN = 'pumpkin',
  GEAR = 'gear',
  TOTEM = 'totem',
  ORB = 'orb',
  SPIRE = 'spire',
  NONE = 'none'
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
  type: 'leaf' | 'sand' | 'sparkle' | 'rain' | 'bubble' | 'cloud' | 'snow' | 'ash' | 'spore' | 'star';
}

export interface GameState {
  playerPos: Vector2;
  playerFacing: Vector2;
  playerTheme: PlayerTheme;
  isMoving: boolean;
  score: number;
  currentBiome: BiomeType;
  level: number;
  elapsedTime: number;
  isLevelComplete: boolean;
  bestTimes: Record<number, number>;
  difficulty: Difficulty;
  isFullMapMode: boolean;
  mapModeTimeRemaining: number;
  isPreviewPhase: boolean;
  previewTimeRemaining: number;
}
