export enum TileType {
  GRASS = 0,
  WATER = 1,
  RAIL = 2,
  STATION = 4,
  BUILDING_RES = 5,
  BUILDING_COM = 6,
  BUILDING_IND = 8, // New: Industrial
  PARK = 9,         // New: Parks
  ROAD = 7,
}

export interface Tile {
  x: number;
  y: number;
  type: TileType;
  height: number;
  variant: number; // For randomizing building visuals or tree layouts
  population: number; // Current residents
}

export interface GameState {
  money: number;
  population: number;
  date: Date;
  tiles: Tile[][];
  selectedTool: ToolType;
  gameSpeed: number; // 0 = pause, 1 = normal, 2 = fast
  lastIncome: number; // For UI feedback
}

export enum ToolType {
  INSPECT = 'INSPECT',
  RAIL = 'RAIL',
  STATION = 'STATION',
  ROAD = 'ROAD',
  BUILDING_RES = 'BUILDING_RES',
  BUILDING_COM = 'BUILDING_COM',
  BUILDING_IND = 'BUILDING_IND',
  PARK = 'PARK',
  BULLDOZE = 'BULLDOZE',
}

export interface AdvisorResponse {
  message: string;
  mood: 'happy' | 'neutral' | 'concerned' | 'optimistic' | 'pleased';
}
