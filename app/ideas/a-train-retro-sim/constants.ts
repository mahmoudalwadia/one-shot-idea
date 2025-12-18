export const MAP_SIZE = 40; // Increased map size slightly
export const TILE_WIDTH = 64;
export const TILE_HEIGHT = 32;

// Retro Color Palette
export const COLORS = {
  UI_BG: '#EFEFDE',
  UI_BORDER_LIGHT: '#FFFFFF',
  UI_BORDER_DARK: '#444444',
  UI_TEXT: '#000000',
  GRASS: '#4da94d',
  GRASS_SIDE: '#3d893d',
  TREE_DARK: '#1e4d1e',
  TREE_LIGHT: '#5dbf5d',
  WATER: 'rgba(68, 68, 255, 0.8)',
  WATER_BASE: '#3333cc',
  RAIL: '#555555',
  RAIL_TIE: '#333333',
  ROAD: '#666666',
  ROAD_MARKING: '#FFFFFF',
  
  // Buildings
  BUILDING_FACE: '#d0d0d0',
  BUILDING_SIDE: '#909090',
  BUILDING_ROOF: '#e0e0e0',
  
  // Industrial
  IND_FACE: '#7a6a6a',
  IND_SIDE: '#5a4a4a',
  IND_ROOF: '#6a5a5a',
  
  // Park
  PARK_BASE: '#5dbf5d',
  PARK_PATH: '#c2b280',
  
  BUILDING_WINDOW_OFF: '#222222',
  BUILDING_WINDOW_ON: '#ffffaa',
  STATION_ROOF: '#8B4513',
  SHADOW: 'rgba(0, 0, 0, 0.3)',
};

export const INITIAL_MONEY = 3000000;
export const INITIAL_POPULATION = 1500;

export const COSTS = {
  [2]: 1000,  // RAIL
  [7]: 500,   // ROAD
  [4]: 10000, // STATION
  [5]: 5000,  // RES
  [6]: 50000, // COM
  [8]: 20000, // IND
  [9]: 2000,  // PARK
  [0]: 200,   // BULLDOZE
};

// Simulation Constants
export const TAX_RATE_PER_PERSON = 0.5; // Yen per person per day
export const RAIL_MAINTENANCE = 10; // Yen per rail tile per day