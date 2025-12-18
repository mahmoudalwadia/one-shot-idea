export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export enum TileType {
  FLOOR = 0,
  WALL = 1,
  DOOR = 2,
  WATER = 3,
  VOID = 9
}

export enum EntityType {
  PLAYER = 'PLAYER',
  ENEMY = 'ENEMY',
  CHEST = 'CHEST',
  KEY = 'KEY',
  POTION = 'POTION',
  STAIRS_DOWN = 'STAIRS_DOWN',
  STAIRS_UP = 'STAIRS_UP'
}

export enum ItemType {
  WEAPON = 'WEAPON',
  ARMOR = 'ARMOR',
  CONSUMABLE = 'CONSUMABLE',
  KEY = 'KEY',
  MISC = 'MISC'
}

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  icon: string; // Now stores an Emoji string
  effect?: (state: GameState) => Partial<GameState>;
  description: string;
  value?: number;
}

export interface Entity {
  id: string;
  type: EntityType;
  x: number;
  y: number;
  hp?: number;
  maxHp?: number;
  name?: string;
  interactable: boolean;
  color?: string; // Still useful for text color
  icon?: string; // New: Emoji icon
  attack?: number; // Enemy attack power
  defense?: number; // Enemy defense
  agility?: number; // New: For evasion calculation
  xpValue?: number; // XP given on death
}

export type PlayerClass = 'WARRIOR' | 'ROGUE' | 'WIZARD';

export interface Stats {
  hp: number;
  maxHp: number;
  sp: number;
  maxSp: number;
  level: number;
  gold: number;
  attack: number;
  defense: number;
  xp: number;
  maxXp: number;
  // Characteristics
  class: PlayerClass;
  str: number; // Strength: Melee Dmg, Crit Dmg
  dex: number; // Dexterity: Hit Chance, Evasion, Crit Chance
  int: number; // Intelligence: Max SP, Magic Dmg
  con: number; // Constitution: Max HP, Regen
}

export interface MapData {
  id: number;
  width: number;
  height: number;
  tiles: number[][];
  theme: 'green' | 'blue' | 'orange' | 'purple';
  entities: Entity[];
}

export interface GameState {
  currentMapId: number;
  playerPos: { x: number; y: number };
  playerStats: Stats;
  inventory: Item[];
  maps: Record<number, MapData>;
  gameStatus: 'TITLE' | 'CLASS_SELECT' | 'PLAYING' | 'INVENTORY' | 'GAME_OVER' | 'VICTORY';
  log: string[];
}
