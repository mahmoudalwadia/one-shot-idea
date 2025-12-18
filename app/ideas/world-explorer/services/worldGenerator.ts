import { Tile, BiomeType, DecorationType, NPC, Collectible, Vector2 } from '../types';
import { WORLD_SIZE, INITIAL_NPCS, BIOME_COLORS } from '../constants';

export class WorldGenerator {
  tiles: Tile[][] = [];
  npcs: NPC[] = [];
  collectibles: Collectible[] = [];
  biomeCenters: { type: BiomeType; pos: Vector2 }[] = [];

  constructor() {
    this.generateWorld();
  }

  private generateWorld() {
    // 1. Initialize Biome Centers
    const biomes = [
      BiomeType.FOREST,
      BiomeType.DESERT,
      BiomeType.CAVERNS,
      BiomeType.ISLANDS,
      BiomeType.NEON,
      BiomeType.OCEAN
    ];

    // Create slightly more centers than types for variety, reusing types
    for (let i = 0; i < 8; i++) {
      this.biomeCenters.push({
        type: biomes[i % biomes.length],
        pos: {
          x: Math.floor(Math.random() * WORLD_SIZE),
          y: Math.floor(Math.random() * WORLD_SIZE)
        }
      });
    }

    // 2. Generate Tiles
    for (let y = 0; y < WORLD_SIZE; y++) {
      this.tiles[y] = [];
      for (let x = 0; x < WORLD_SIZE; x++) {
        const tile = this.createTile(x, y);
        this.tiles[y][x] = tile;
      }
    }

    // 3. Place NPCs
    INITIAL_NPCS.forEach(npcDef => {
        const center = this.biomeCenters.find(b => b.type === npcDef.biome);
        if (center) {
            // Find a non-solid spot near center
            const pos = { ...center.pos };
            let attempts = 0;
            while (attempts < 20) {
                pos.x = center.pos.x + (Math.random() * 10 - 5);
                pos.y = center.pos.y + (Math.random() * 10 - 5);
                // Clamp
                pos.x = Math.max(0, Math.min(WORLD_SIZE-1, pos.x));
                pos.y = Math.max(0, Math.min(WORLD_SIZE-1, pos.y));

                const t = this.getTile(Math.floor(pos.x), Math.floor(pos.y));
                if (t && !t.isSolid) break;
                attempts++;
            }

            this.npcs.push({
                id: npcDef.id,
                name: npcDef.name,
                color: BIOME_COLORS[npcDef.biome].text,
                position: pos,
                dialogueRoot: npcDef.dialogue.root,
                dialogueNodes: npcDef.dialogue.nodes
            });
        }
    });

    // 4. Scatter Collectibles
    for (let i = 0; i < 60; i++) {
        const x = Math.floor(Math.random() * WORLD_SIZE);
        const y = Math.floor(Math.random() * WORLD_SIZE);
        const tile = this.tiles[y][x];
        if (!tile.isSolid) {
            this.collectibles.push({
                id: `col_${i}`,
                position: { x: x + 0.5, y: y + 0.5 },
                biome: tile.biome,
                collected: false
            });
        }
    }
  }

  private createTile(x: number, y: number): Tile {
    // Determine Biome by closest center (Voronoi)
    let closestDist = Infinity;
    let closestBiome = BiomeType.FOREST;

    for (const center of this.biomeCenters) {
      const dx = center.pos.x - x;
      const dy = center.pos.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Add a little noise to the distance for jagged edges
      const noise = (Math.random() - 0.5) * 5;

      if (dist + noise < closestDist) {
        closestDist = dist + noise;
        closestBiome = center.type;
      }
    }

    const isSolid = Math.random() < 0.1; // 10% chance of obstacle
    let decoration = DecorationType.NONE;

    if (isSolid) {
        switch (closestBiome) {
            case BiomeType.FOREST: decoration = DecorationType.TREE; break;
            case BiomeType.DESERT: decoration = DecorationType.ROCK; break;
            case BiomeType.CAVERNS: decoration = DecorationType.CRYSTAL; break;
            case BiomeType.ISLANDS: decoration = DecorationType.CLOUD; break;
            case BiomeType.NEON: decoration = DecorationType.BUILDING; break;
            case BiomeType.OCEAN: decoration = DecorationType.CORAL; break;
        }
    }

    return {
      x,
      y,
      biome: closestBiome,
      isSolid,
      decoration,
      variation: Math.random()
    };
  }

  public getTile(x: number, y: number): Tile | null {
    if (x < 0 || x >= WORLD_SIZE || y < 0 || y >= WORLD_SIZE) return null;
    return this.tiles[y][x];
  }
}
