import { BiomeType, DialogueNode } from './types';

export const TILE_SIZE = 64;
export const WORLD_SIZE = 100; // 100x100 tiles
export const PLAYER_SPEED = 0.05; // Slower, more realistic pace
export const INTERACTION_RADIUS = 1.5; // Tiles

export const BIOME_COLORS: Record<BiomeType, { ground: string[]; particle: string; text: string }> = {
  [BiomeType.FOREST]: {
    ground: ['#1a331a', '#224022', '#152915'], // Darker, richer forest tones
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
    ground: ['#bfdbfe', '#dbeafe', '#93c5fd'], // Sky tones
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
  }
};

export const INITIAL_NPCS: Array<{
  name: string;
  id: string;
  biome: BiomeType;
  dialogue: {
    root: string;
    nodes: Record<string, DialogueNode>;
  };
}> = [
  {
    name: "Elder Oak",
    id: "npc_forest",
    biome: BiomeType.FOREST,
    dialogue: {
      root: "start",
      nodes: {
        "start": { id: "start", text: "The forest breathes... can you hear it?", options: [{ text: "Yes, it's peaceful.", nextId: "peace" }, { text: "I'm just looking for treasure.", nextId: "treasure" }] },
        "peace": { id: "peace", text: "Good. Walk softly, traveler.", options: [{ text: "Goodbye." }] },
        "treasure": { id: "treasure", text: "The real treasure is the journey, but yes, shiny things lie east.", options: [{ text: "Thanks." }] }
      } as Record<string, DialogueNode>
    }
  },
  {
    name: "Nomad Sands",
    id: "npc_desert",
    biome: BiomeType.DESERT,
    dialogue: {
      root: "start",
      nodes: {
        "start": { id: "start", text: "Water is scarce, but secrets are plentiful here.", options: [{ text: "What secrets?", nextId: "secrets" }, { text: "Just passing through.", nextId: "bye" }] },
        "secrets": { id: "secrets", text: "Old cities lie beneath the dunes. Watch your step.", options: [{ text: "I will." }] },
        "bye": { id: "bye", text: "May the wind guide you.", options: [{ text: "Farewell." }] }
      } as Record<string, DialogueNode>
    }
  },
  {
    name: "Cyber Unit 7",
    id: "npc_neon",
    biome: BiomeType.NEON,
    dialogue: {
      root: "start",
      nodes: {
        "start": { id: "start", text: "SYSTEM ONLINE. Welcome to the Grid, organic.", options: [{ text: "Are you a robot?", nextId: "robot" }, { text: "Cool lights.", nextId: "lights" }] },
        "robot": { id: "robot", text: "I am a Construct of the Neon City. We watch.", options: [{ text: "Okay..." }] },
        "lights": { id: "lights", text: "Energy efficiency is 98%. Aesthetic is paramount.", options: [{ text: "Agreed." }] }
      } as Record<string, DialogueNode>
    }
  }
];
