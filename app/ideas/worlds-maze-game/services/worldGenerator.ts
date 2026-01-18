import { Tile, BiomeType, DecorationType, Vector2, Difficulty } from '../types';

/**
 * MAZE GENERATION ALGORITHM
 * =========================
 *
 * Core Algorithm: Randomized Depth-First Search (DFS)
 * ---------------------------------------------------
 * 1. Start with a grid where ALL cells are walls (solid)
 * 2. Pick a starting cell (1,1), mark it as a passage
 * 3. Push it onto a stack
 * 4. While stack is not empty:
 *    - Look at the top cell
 *    - Find all unvisited neighbors 2 cells away (to leave walls between)
 *    - If neighbors exist:
 *      - Pick one (weighted by pattern bias)
 *      - Carve passage to it (remove wall between)
 *      - Push new cell onto stack
 *    - Else:
 *      - Pop from stack (backtrack)
 *
 * This creates a "perfect maze" - exactly one path between any two points, no loops.
 *
 * Pattern Biasing
 * ---------------
 * Instead of picking neighbors randomly, the algorithm weights each direction
 * based on a GenerationPattern:
 *
 * | Pattern      | Effect                                              |
 * |--------------|-----------------------------------------------------|
 * | Vortex       | Favors spiral/circular paths around the center      |
 * | Sine Wave    | Creates wavy horizontal corridors                   |
 * | Radial Burst | Paths tend to radiate outward from center           |
 * | Checkerboard | Alternates preferred direction in a grid pattern    |
 * | Flow Field   | Uses sin/cos to create organic curved paths         |
 *
 * The `patternStrength` (controlled by difficulty) determines how much the
 * pattern influences direction choice vs pure randomness.
 *
 * Difficulty Adjustments
 * ----------------------
 * | Difficulty | Size Bonus | Extra Openings | Pattern Strength |
 * |------------|------------|----------------|------------------|
 * | Normal     | +6         | level × 4      | 0.4 (weak)       |
 * | Hard       | +16        | 1              | 0.7 (medium)     |
 * | Expert     | +28        | 0              | 0.9 (strong)     |
 *
 * "Extra openings" break random walls after generation, creating shortcuts
 * (easier difficulties have more).
 *
 * Goal Placement
 * --------------
 * After the maze is complete, the goal is placed at the furthest point from
 * spawn using BFS (findFurthestPoint). This guarantees the player must
 * navigate most of the maze.
 */

enum GenerationPattern {
  VORTEX = 'Vortex',
  SINE_WAVE = 'Sine Wave',
  RADIAL = 'Radial Burst',
  GRID_SHIFT = 'Checkerboard',
  PERLIN_LIKE = 'Flow Field'
}

export class WorldGenerator {
  tiles: Tile[][] = [];
  mazeWidth: number = 0;
  mazeHeight: number = 0;
  spawnPoint: Vector2 = { x: 1.5, y: 1.5 };
  goalPoint: Vector2 = { x: 0, y: 0 };
  currentBiome: BiomeType = BiomeType.FOREST;
  private pattern: GenerationPattern = GenerationPattern.VORTEX;
  private patternSeed: number = 0;

  constructor(level: number, difficulty: Difficulty, forcedBiome?: BiomeType) {
    this.patternSeed = Math.random() * 1000;
    this.generateMaze(level, difficulty, forcedBiome);
  }

  private generateMaze(level: number, difficulty: Difficulty, forcedBiome?: BiomeType) {
    const patterns = Object.values(GenerationPattern);
    this.pattern = patterns[Math.abs(level) % patterns.length];

    let sizeBonus = 0;
    let extraOpenings = 0;
    let patternStrength = 0.5;

    switch (difficulty) {
      case Difficulty.NORMAL:
        sizeBonus = 6;
        extraOpenings = level * 4;
        patternStrength = 0.4;
        break;
      case Difficulty.HARD:
        sizeBonus = 16;
        extraOpenings = 1;
        patternStrength = 0.7;
        break;
      case Difficulty.EXPERT:
        sizeBonus = 28;
        extraOpenings = 0;
        patternStrength = 0.9;
        break;
    }

    const size = Math.max(13, 13 + (level - 1) * 4 + sizeBonus);
    this.mazeWidth = size % 2 === 0 ? size + 1 : size;
    this.mazeHeight = this.mazeWidth;

    if (forcedBiome) {
      this.currentBiome = forcedBiome;
    } else {
      const biomes = Object.values(BiomeType);
      this.currentBiome = biomes[Math.abs(level - 1) % biomes.length];
    }

    // Initialize full grid
    this.tiles = [];
    for (let y = 0; y < this.mazeHeight; y++) {
      const row: Tile[] = [];
      for (let x = 0; x < this.mazeWidth; x++) {
        row.push(this.createDefaultTile(x, y, true));
      }
      this.tiles.push(row);
    }

    const stack: [number, number][] = [];
    const startX = 1;
    const startY = 1;

    if (this.tiles[startY] && this.tiles[startY][startX]) {
      this.tiles[startY][startX].isSolid = false;
      stack.push([startX, startY]);
    }

    const visited = new Set<string>();
    visited.add(`${startX},${startY}`);

    // Main Maze Generation (Randomized DFS)
    while (stack.length > 0) {
      const top = stack[stack.length - 1];
      if (!top) {
        stack.pop();
        continue;
      }
      const currX = top[0];
      const currY = top[1];

      const neighbors: {nx: number, ny: number, wx: number, wy: number, weight: number}[] = [];
      const dirs: [number, number, number, number][] = [
        [0, -2, 0, -1], [0, 2, 0, 1], [-2, 0, -1, 0], [2, 0, 1, 0]
      ];

      for (const d of dirs) {
        const nx = currX + d[0];
        const ny = currY + d[1];

        if (nx > 0 && nx < this.mazeWidth - 1 && ny > 0 && ny < this.mazeHeight - 1 && !visited.has(`${nx},${ny}`)) {
          const bias = this.calculatePatternBias(currX, currY, d[0], d[1], patternStrength);
          neighbors.push({ nx, ny, wx: currX + d[2], wy: currY + d[3], weight: bias });
        }
      }

      if (neighbors.length > 0) {
        const totalWeight = neighbors.reduce((acc, n) => acc + n.weight, 0);
        let rand = Math.random() * totalWeight;
        let selected = neighbors[0];

        for (const n of neighbors) {
          if (rand < n.weight) {
            selected = n;
            break;
          }
          rand -= n.weight;
        }

        this.tiles[selected.ny][selected.nx].isSolid = false;
        this.tiles[selected.wy][selected.wx].isSolid = false;

        visited.add(`${selected.nx},${selected.ny}`);
        stack.push([selected.nx, selected.ny]);
      } else {
        stack.pop();
      }
    }

    // CRITICAL: Shortcuts for lower difficulties must be added BEFORE goal placement
    // to ensure the goal is placed on the furthest point of the FINAL topology.
    for (let i = 0; i < extraOpenings; i++) {
      const rx = 1 + Math.floor(Math.random() * (this.mazeWidth - 2));
      const ry = 1 + Math.floor(Math.random() * (this.mazeHeight - 2));
      if (this.tiles[ry] && this.tiles[ry][rx] && this.tiles[ry][rx].isSolid) {
        const checkPoints = [[ry - 1, rx], [ry + 1, rx], [ry, rx - 1], [ry, rx + 1]];
        let neighborsCount = 0;
        for (const cp of checkPoints) {
           if (this.tiles[cp[0]] && this.tiles[cp[0]][cp[1]] && !this.tiles[cp[0]][cp[1]].isSolid) {
             neighborsCount++;
           }
        }
        // Break wall if it connects two different areas
        if (neighborsCount >= 2) this.tiles[ry][rx].isSolid = false;
      }
    }

    // Final Goal placement: Find the point with the longest path from start
    this.goalPoint = this.findFurthestPoint(startX, startY);

    const gy = Math.floor(this.goalPoint.y);
    const gx = Math.floor(this.goalPoint.x);
    if (this.tiles[gy] && this.tiles[gy][gx]) {
      this.tiles[gy][gx].isGoal = true;
    }

    this.goalPoint.x += 0.5;
    this.goalPoint.y += 0.5;

    // Final decoration pass
    for (let y = 0; y < this.mazeHeight; y++) {
      for (let x = 0; x < this.mazeWidth; x++) {
        if (this.tiles[y] && this.tiles[y][x] && this.tiles[y][x].isSolid) {
          this.tiles[y][x].decoration = this.getBiomeDecoration(this.currentBiome);
        }
      }
    }
  }

  private calculatePatternBias(x: number, y: number, dx: number, dy: number, strength: number): number {
    const centerX = (this.mazeWidth || 1) / 2;
    const centerY = (this.mazeHeight || 1) / 2;
    const relX = (x - centerX) / (this.mazeWidth || 1);
    const relY = (y - centerY) / (this.mazeHeight || 1);

    let influence = 0;

    switch (this.pattern) {
      case GenerationPattern.VORTEX:
        influence = (dx * (-relY) + dy * relX);
        break;
      case GenerationPattern.SINE_WAVE:
        influence = (dy * Math.sin(x * 0.3 + this.patternSeed)) + (dx * 0.5);
        break;
      case GenerationPattern.RADIAL:
        influence = (dx * relX + dy * relY);
        break;
      case GenerationPattern.GRID_SHIFT:
        influence = ((Math.floor(x / 4) + Math.floor(y / 4)) % 2 === 0) ? dx : dy;
        break;
      case GenerationPattern.PERLIN_LIKE:
        const angle = Math.sin(x * 0.2) + Math.cos(y * 0.2);
        influence = (dx * Math.cos(angle)) + (dy * Math.sin(angle));
        break;
    }

    return Math.max(0.1, 1 + influence * 20 * strength);
  }

  private findFurthestPoint(sx: number, sy: number): Vector2 {
    const queue: [number, number, number][] = [[sx, sy, 0]];
    const visited = new Set<string>();
    visited.add(`${sx},${sy}`);
    let furthest = { x: sx, y: sy, dist: 0 };

    while (queue.length > 0) {
      const item = queue.shift();
      if (!item) continue;

      const cx = item[0];
      const cy = item[1];
      const d = item[2];

      if (d > furthest.dist) {
        furthest = { x: cx, y: cy, dist: d };
      }

      const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
      for (const dir of dirs) {
        const nx = cx + dir[0];
        const ny = cy + dir[1];

        if (nx >= 0 && nx < this.mazeWidth && ny >= 0 && ny < this.mazeHeight &&
            this.tiles[ny] && this.tiles[ny][nx] && !this.tiles[ny][nx].isSolid && !visited.has(`${nx},${ny}`)) {
          visited.add(`${nx},${ny}`);
          queue.push([nx, ny, d + 1]);
        }
      }
    }
    return { x: furthest.x, y: furthest.y };
  }

  private createDefaultTile(x: number, y: number, solid: boolean): Tile {
    return {
      x, y,
      biome: this.currentBiome,
      isSolid: solid,
      variation: Math.random(),
      decoration: DecorationType.NONE
    };
  }

  private getBiomeDecoration(biome: BiomeType): DecorationType {
    switch (biome) {
      case BiomeType.FOREST: return DecorationType.TREE;
      case BiomeType.DESERT: return DecorationType.ROCK;
      case BiomeType.CAVERNS: return DecorationType.CRYSTAL;
      case BiomeType.ISLANDS: return DecorationType.CLOUD;
      case BiomeType.NEON: return DecorationType.BUILDING;
      case BiomeType.OCEAN: return DecorationType.CORAL;
      case BiomeType.ARCTIC: return DecorationType.ICE;
      case BiomeType.VOLCANIC: return DecorationType.OBSIDIAN;
      case BiomeType.ANCIENT: return DecorationType.RUIN;
      case BiomeType.TOXIC: return DecorationType.MUSHROOM;
      case BiomeType.CELESTIAL: return DecorationType.STAR;
      case BiomeType.AUTUMN: return DecorationType.PUMPKIN;
      case BiomeType.INDUSTRIAL: return DecorationType.GEAR;
      case BiomeType.JUNGLE: return DecorationType.TOTEM;
      case BiomeType.ETHERIC: return DecorationType.ORB;
      case BiomeType.CANYON: return DecorationType.SPIRE;
      default: return DecorationType.NONE;
    }
  }

  public getTile(x: number, y: number): Tile | null {
    if (x < 0 || x >= this.mazeWidth || y < 0 || y >= this.mazeHeight || !this.tiles[y]) return null;
    return this.tiles[y][x] || null;
  }
}
