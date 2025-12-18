import { EntityType, Entity, Item, ItemType, MapData, TileType } from './types';

export const VIEWPORT_WIDTH = 15;
export const VIEWPORT_HEIGHT = 11;

export const THEMES = {
  green: {
    bg: 'bg-[#1a1a1a]', // Dark bg
    wall: 'bg-[#8b9c48]', // Mossy green
    floor: 'bg-[#2e3b1f]', // Dark moss
    accent: 'text-[#d9e2b1]',
    water: 'bg-[#3b48a0]',
    border: 'border-[#8b9c48]'
  },
  blue: {
    bg: 'bg-[#000000]',
    wall: 'bg-[#3b48a0]', // Deep blue
    floor: 'bg-[#1a1c2c]', // Dark blue/grey
    accent: 'text-[#5fcde4]',
    water: 'bg-[#3b48a0]',
    border: 'border-[#3b48a0]'
  },
  orange: {
    bg: 'bg-[#241510]',
    wall: 'bg-[#d08126]', // Orange
    floor: 'bg-[#3e2716]', // Brown
    accent: 'text-[#fbf236]',
    water: 'bg-[#ac3232]', // Lava?
    border: 'border-[#d08126]'
  },
  purple: {
    bg: 'bg-[#150e18]',
    wall: 'bg-[#8e3e96]', // Purple
    floor: 'bg-[#2d1b2e]', // Dark Purple
    accent: 'text-[#e9b5f5]',
    water: 'bg-[#4b692f]', // Acid?
    border: 'border-[#8e3e96]'
  }
};

export const ITEMS: Record<string, Item> = {
  POTION_HP: {
    id: 'potion_hp',
    name: 'Health Potion',
    type: ItemType.CONSUMABLE,
    icon: '🧪',
    description: 'Restores 15 HP',
    value: 10
  },
  SWORD_IRON: {
    id: 'sword_iron',
    name: 'Iron Sword',
    type: ItemType.WEAPON,
    icon: '⚔️',
    description: 'ATK +3',
    value: 2
  },
  KEY_GOLD: {
    id: 'key_gold',
    name: 'Gold Key',
    type: ItemType.KEY,
    icon: '🔑',
    description: 'Opens gold doors',
  },
  MEAT: {
    id: 'meat',
    name: 'Meat',
    type: ItemType.CONSUMABLE,
    icon: '🍖',
    description: 'Restores 8 HP',
    value: 5
  },
  GEM: {
    id: 'gem',
    name: 'Blue Gem',
    type: ItemType.MISC,
    icon: '💎',
    description: 'Shiny!',
    value: 50
  }
};

// Helper to create simple box room with random noise
const createRoom = (w: number, h: number, wallType: number = TileType.WALL): number[][] => {
  const map: number[][] = [];
  for (let y = 0; y < h; y++) {
    const row: number[] = [];
    for (let x = 0; x < w; x++) {
      if (y === 0 || y === h - 1 || x === 0 || x === w - 1) {
        row.push(wallType);
      } else {
        // Random obstacles
        row.push(Math.random() > 0.9 ? TileType.WALL : TileType.FLOOR);
      }
    }
    map.push(row);
  }
  return map;
};

// Map 1: The Green Dungeon
const map1Tiles = createRoom(20, 15);
// Add some structure
for(let i=5; i<15; i++) map1Tiles[5][i] = TileType.WALL;
map1Tiles[5][10] = TileType.FLOOR; // Doorway

const map1Entities: Entity[] = [
  { id: 'm1_e1', type: EntityType.ENEMY, x: 8, y: 8, hp: 15, maxHp: 15, name: 'Slime', icon: '🦠', color: 'text-green-400', attack: 5, defense: 1, agility: 2, xpValue: 15, interactable: false },
  { id: 'm1_e2', type: EntityType.ENEMY, x: 12, y: 3, hp: 20, maxHp: 20, name: 'Bat', icon: '🦇', color: 'text-purple-400', attack: 6, defense: 1, agility: 6, xpValue: 20, interactable: false },
  { id: 'm1_c1', type: EntityType.CHEST, x: 18, y: 2, icon: '📦', interactable: true },
  { id: 'm1_s1', type: EntityType.STAIRS_DOWN, x: 18, y: 13, icon: '🚪', interactable: true },
  { id: 'm1_k1', type: EntityType.KEY, x: 3, y: 12, icon: '🔑', interactable: true },
];

// Map 2: The Blue Catacombs
const map2Tiles = createRoom(20, 15);
// Add water
for(let y=6; y<10; y++) for(let x=6; x<14; x++) map2Tiles[y][x] = TileType.WATER;
map2Tiles[8][8] = TileType.FLOOR; // Island
map2Tiles[8][9] = TileType.FLOOR; // Bridge
map2Tiles[8][10] = TileType.FLOOR; // Bridge
map2Tiles[8][11] = TileType.FLOOR; // Bridge
map2Tiles[8][12] = TileType.FLOOR; // Bridge
map2Tiles[8][13] = TileType.FLOOR; // Bridge

const map2Entities: Entity[] = [
  { id: 'm2_e1', type: EntityType.ENEMY, x: 8, y: 8, hp: 45, maxHp: 45, name: 'Skeleton', icon: '💀', color: 'text-gray-200', attack: 12, defense: 4, agility: 3, xpValue: 40, interactable: false },
  { id: 'm2_e2', type: EntityType.ENEMY, x: 15, y: 10, hp: 35, maxHp: 35, name: 'Ghost', icon: '👻', color: 'text-blue-200', attack: 14, defense: 2, agility: 8, xpValue: 50, interactable: false },
  { id: 'm2_c1', type: EntityType.CHEST, x: 4, y: 2, icon: '📦', interactable: true },
  { id: 'm2_s1', type: EntityType.STAIRS_UP, x: 2, y: 13, icon: '🚪', interactable: true },
  { id: 'm2_s2', type: EntityType.STAIRS_DOWN, x: 17, y: 2, icon: '🚪', interactable: true },
];

// SANITIZATION: Ensure Player Start and Entities are accessible
const sanitizeMap = (tiles: number[][], entities: Entity[]) => {
  // 1. Ensure Player Start (2,2) is floor
  if (tiles[2] && tiles[2][2]) tiles[2][2] = TileType.FLOOR;

  // 2. Ensure all entities are on floor (overwrite walls/water if necessary)
  entities.forEach(e => {
    if (tiles[e.y] && tiles[e.y][e.x] !== undefined) {
      tiles[e.y][e.x] = TileType.FLOOR;
    }
  });
};

// Map 3: The Orange Caverns
const map3Tiles = createRoom(20, 15);
// Add lava pools
for(let y=3; y<6; y++) for(let x=3; x<7; x++) map3Tiles[y][x] = TileType.WATER; // Top left lava
for(let y=9; y<13; y++) for(let x=13; x<17; x++) map3Tiles[y][x] = TileType.WATER; // Bottom right lava
// Add wall structure
for(let i=7; i<13; i++) map3Tiles[i][10] = TileType.WALL;
map3Tiles[10][10] = TileType.FLOOR; // Doorway

const map3Entities: Entity[] = [
  { id: 'm3_e1', type: EntityType.ENEMY, x: 5, y: 8, hp: 60, maxHp: 60, name: 'Fire Imp', icon: '👹', color: 'text-orange-500', attack: 16, defense: 5, agility: 5, xpValue: 60, interactable: false },
  { id: 'm3_e2', type: EntityType.ENEMY, x: 15, y: 7, hp: 70, maxHp: 70, name: 'Demon', icon: '😈', color: 'text-red-600', attack: 18, defense: 6, agility: 4, xpValue: 70, interactable: false },
  { id: 'm3_e3', type: EntityType.ENEMY, x: 10, y: 3, hp: 55, maxHp: 55, name: 'Gargoyle', icon: '🗿', color: 'text-gray-500', attack: 15, defense: 8, agility: 2, xpValue: 65, interactable: false },
  { id: 'm3_c1', type: EntityType.CHEST, x: 18, y: 13, icon: '📦', interactable: true },
  { id: 'm3_s1', type: EntityType.STAIRS_UP, x: 2, y: 2, icon: '🚪', interactable: true },
  { id: 'm3_s2', type: EntityType.STAIRS_DOWN, x: 18, y: 2, icon: '🚪', interactable: true },
];

// Map 4: The Purple Crypts
const map4Tiles = createRoom(20, 15);
// Add pillars and maze-like structure
for(let y=2; y<13; y+=3) {
  for(let x=2; x<18; x+=4) {
    if (map4Tiles[y] && map4Tiles[y][x]) map4Tiles[y][x] = TileType.WALL;
    if (map4Tiles[y+1] && map4Tiles[y+1][x]) map4Tiles[y+1][x] = TileType.WALL;
  }
}
// Clear some paths
for(let x=5; x<15; x++) map4Tiles[7][x] = TileType.FLOOR;

const map4Entities: Entity[] = [
  { id: 'm4_e1', type: EntityType.ENEMY, x: 8, y: 5, hp: 85, maxHp: 85, name: 'Lich', icon: '🧙', color: 'text-purple-400', attack: 22, defense: 7, agility: 6, xpValue: 90, interactable: false },
  { id: 'm4_e2', type: EntityType.ENEMY, x: 12, y: 10, hp: 90, maxHp: 90, name: 'Wraith', icon: '☠️', color: 'text-purple-300', attack: 20, defense: 5, agility: 9, xpValue: 95, interactable: false },
  { id: 'm4_e3', type: EntityType.ENEMY, x: 15, y: 5, hp: 80, maxHp: 80, name: 'Necromancer', icon: '🧛', color: 'text-purple-600', attack: 24, defense: 6, agility: 5, xpValue: 100, interactable: false },
  { id: 'm4_e4', type: EntityType.ENEMY, x: 5, y: 11, hp: 75, maxHp: 75, name: 'Specter', icon: '👤', color: 'text-purple-200', attack: 19, defense: 4, agility: 10, xpValue: 85, interactable: false },
  { id: 'm4_c1', type: EntityType.CHEST, x: 3, y: 3, icon: '📦', interactable: true },
  { id: 'm4_c2', type: EntityType.CHEST, x: 16, y: 12, icon: '📦', interactable: true },
  { id: 'm4_s1', type: EntityType.STAIRS_UP, x: 2, y: 13, icon: '🚪', interactable: true },
  { id: 'm4_s2', type: EntityType.STAIRS_DOWN, x: 17, y: 2, icon: '🚪', interactable: true },
];

// Map 5: The Dark Throne (Final Level)
const map5Tiles = createRoom(20, 15);
// Create throne room layout
for(let y=6; y<10; y++) {
  map5Tiles[y][3] = TileType.WALL;
  map5Tiles[y][16] = TileType.WALL;
}
for(let x=3; x<17; x++) {
  map5Tiles[6][x] = TileType.WALL;
  map5Tiles[9][x] = TileType.WALL;
}
// Entrance to throne room
map5Tiles[6][10] = TileType.FLOOR;
map5Tiles[9][10] = TileType.FLOOR;

const map5Entities: Entity[] = [
  { id: 'm5_boss', type: EntityType.ENEMY, x: 10, y: 7, hp: 150, maxHp: 150, name: 'Dark Lord', icon: '👑', color: 'text-red-500', attack: 30, defense: 10, agility: 7, xpValue: 200, interactable: false },
  { id: 'm5_e1', type: EntityType.ENEMY, x: 6, y: 7, hp: 80, maxHp: 80, name: 'Elite Guard', icon: '🛡️', color: 'text-gray-400', attack: 25, defense: 12, agility: 4, xpValue: 110, interactable: false },
  { id: 'm5_e2', type: EntityType.ENEMY, x: 14, y: 7, hp: 80, maxHp: 80, name: 'Elite Guard', icon: '🛡️', color: 'text-gray-400', attack: 25, defense: 12, agility: 4, xpValue: 110, interactable: false },
  { id: 'm5_e3', type: EntityType.ENEMY, x: 5, y: 12, hp: 75, maxHp: 75, name: 'Shadow Knight', icon: '⚔️', color: 'text-black', attack: 26, defense: 9, agility: 6, xpValue: 105, interactable: false },
  { id: 'm5_e4', type: EntityType.ENEMY, x: 15, y: 12, hp: 75, maxHp: 75, name: 'Shadow Knight', icon: '⚔️', color: 'text-black', attack: 26, defense: 9, agility: 6, xpValue: 105, interactable: false },
  { id: 'm5_c1', type: EntityType.CHEST, x: 10, y: 2, icon: '📦', interactable: true },
  { id: 'm5_c2', type: EntityType.CHEST, x: 3, y: 13, icon: '📦', interactable: true },
  { id: 'm5_c3', type: EntityType.CHEST, x: 16, y: 13, icon: '📦', interactable: true },
  { id: 'm5_s1', type: EntityType.STAIRS_UP, x: 2, y: 2, icon: '🚪', interactable: true },
];

sanitizeMap(map1Tiles, map1Entities);
sanitizeMap(map2Tiles, map2Entities);
sanitizeMap(map3Tiles, map3Entities);
sanitizeMap(map4Tiles, map4Entities);
sanitizeMap(map5Tiles, map5Entities);

export const INITIAL_MAPS: Record<number, MapData> = {
  1: {
    id: 1,
    width: 20,
    height: 15,
    tiles: map1Tiles,
    theme: 'green',
    entities: map1Entities
  },
  2: {
    id: 2,
    width: 20,
    height: 15,
    tiles: map2Tiles,
    theme: 'blue',
    entities: map2Entities
  },
  3: {
    id: 3,
    width: 20,
    height: 15,
    tiles: map3Tiles,
    theme: 'orange',
    entities: map3Entities
  },
  4: {
    id: 4,
    width: 20,
    height: 15,
    tiles: map4Tiles,
    theme: 'purple',
    entities: map4Entities
  },
  5: {
    id: 5,
    width: 20,
    height: 15,
    tiles: map5Tiles,
    theme: 'green',
    entities: map5Entities
  }
};
