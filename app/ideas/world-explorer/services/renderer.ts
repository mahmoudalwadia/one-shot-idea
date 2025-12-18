import { BiomeType, DecorationType, GameState, Particle, Tile, Vector2, NPC, Collectible } from '../types';
import { TILE_SIZE, BIOME_COLORS, INTERACTION_RADIUS } from '../constants';
import { WorldGenerator } from './worldGenerator';

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private particles: Particle[] = [];

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  public resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public updateParticles() {
    // Update logic separated from draw for consistency
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;

      // Wrap around for rain/snow feel or just kill
      if (p.type === 'rain' && p.y > this.height) p.y = 0;
      if (p.type === 'bubble' && p.y < 0) p.y = this.height;

      if (p.life <= 0) this.particles.splice(i, 1);
    }
  }

  public draw(gameState: GameState, world: WorldGenerator, camera: Vector2) {
    // Clear Screen
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.save();

    // Apply Camera
    const camOffsetX = this.width / 2 - camera.x * TILE_SIZE;
    const camOffsetY = this.height / 2 - camera.y * TILE_SIZE;
    this.ctx.translate(camOffsetX, camOffsetY);

    // Calculate Viewport (Culling)
    const startCol = Math.floor((camera.x * TILE_SIZE - this.width / 2) / TILE_SIZE) - 2;
    const endCol = startCol + Math.ceil(this.width / TILE_SIZE) + 4;
    const startRow = Math.floor((camera.y * TILE_SIZE - this.height / 2) / TILE_SIZE) - 2;
    const endRow = startRow + Math.ceil(this.height / TILE_SIZE) + 4;

    // Draw Tiles (Layer 1: Ground)
    for (let y = startRow; y <= endRow; y++) {
      for (let x = startCol; x <= endCol; x++) {
        const tile = world.getTile(x, y);
        if (tile) {
            this.drawTileGround(tile, x, y);
        }
      }
    }

    // Draw Collectibles
    world.collectibles.forEach(c => {
        if (!c.collected &&
            c.position.x >= startCol && c.position.x <= endCol &&
            c.position.y >= startRow && c.position.y <= endRow) {
            this.drawCollectible(c);
        }
    });

    // Draw NPCs
    world.npcs.forEach(npc => {
        if (npc.position.x >= startCol && npc.position.x <= endCol &&
            npc.position.y >= startRow && npc.position.y <= endRow) {
            this.drawNPC(npc);
        }
    });

    // Draw Player
    this.drawPlayer(gameState);

    // Draw Decorations (Layer 2: Objects/Obstacles)
    for (let y = startRow; y <= endRow; y++) {
      for (let x = startCol; x <= endCol; x++) {
        const tile = world.getTile(x, y);
        if (tile && tile.isSolid) {
            this.drawDecoration(tile, x, y);
        }
      }
    }

    // Interaction Hint
    world.npcs.forEach(npc => {
        const dist = Math.sqrt(Math.pow(gameState.playerPos.x - npc.position.x, 2) + Math.pow(gameState.playerPos.y - npc.position.y, 2));
        if (dist < INTERACTION_RADIUS) {
            this.drawInteractionPrompt(npc.position);
        }
    });

    this.ctx.restore();

    // Draw Particles
    this.generateParticles(gameState.currentBiome);
    this.drawParticles();

    // Atmosphere / Vignette overlay for realism
    this.drawVignette();
  }

  /**
   * Draws ground with procedural texture "noise" based on position seed
   */
  private drawTileGround(tile: Tile, x: number, y: number) {
    const colors = BIOME_COLORS[tile.biome].ground;
    const baseColor = colors[Math.floor(tile.variation * colors.length)];

    // Base Ground
    this.ctx.fillStyle = baseColor;
    this.ctx.fillRect(x * TILE_SIZE - 0.5, y * TILE_SIZE - 0.5, TILE_SIZE + 1, TILE_SIZE + 1);

    // Procedural Detail (Deterministic based on x,y)
    const seed = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    const rand = (n: number) => {
        const r = Math.sin(seed * n) * 10000;
        return r - Math.floor(r);
    };

    this.ctx.save();
    const cx = x * TILE_SIZE;
    const cy = y * TILE_SIZE;

    switch (tile.biome) {
        case BiomeType.FOREST:
            // Grass blades
            this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
            for(let i=0; i<3; i++) {
                const ox = rand(i) * TILE_SIZE;
                const oy = rand(i+10) * TILE_SIZE;
                this.ctx.fillRect(cx + ox, cy + oy, 2, 4);
            }
            break;
        case BiomeType.DESERT:
            // Sand grains
            this.ctx.fillStyle = 'rgba(255,255,255,0.2)';
            for(let i=0; i<5; i++) {
                const ox = rand(i) * TILE_SIZE;
                const oy = rand(i+5) * TILE_SIZE;
                this.ctx.fillRect(cx + ox, cy + oy, 2, 2);
            }
            break;
        case BiomeType.OCEAN:
            // Waves/Ripples
            this.ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            this.ctx.lineWidth = 2;
            for(let i=0; i<2; i++) {
                const ox = rand(i) * TILE_SIZE;
                const oy = rand(i+3) * TILE_SIZE;
                this.ctx.beginPath();
                this.ctx.moveTo(cx + ox - 5, cy + oy);
                this.ctx.lineTo(cx + ox + 5, cy + oy);
                this.ctx.stroke();
            }
            break;
        case BiomeType.NEON:
            // Grid lines
            this.ctx.strokeStyle = 'rgba(45, 212, 191, 0.1)';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(cx, cy, TILE_SIZE, TILE_SIZE);
            break;
        case BiomeType.CAVERNS:
            // Rock texture
            this.ctx.fillStyle = 'rgba(0,0,0,0.2)';
            for(let i=0; i<2; i++) {
                const ox = rand(i) * TILE_SIZE;
                const oy = rand(i+8) * TILE_SIZE;
                this.ctx.beginPath();
                this.ctx.arc(cx + ox, cy + oy, 3, 0, Math.PI*2);
                this.ctx.fill();
            }
            break;
    }
    this.ctx.restore();
  }

  private drawDecoration(tile: Tile, x: number, y: number) {
    const cx = x * TILE_SIZE + TILE_SIZE / 2;
    const cy = y * TILE_SIZE + TILE_SIZE / 2;

    this.ctx.save();

    // Cast shadow
    this.ctx.shadowColor = 'rgba(0,0,0,0.4)';
    this.ctx.shadowBlur = 10;
    this.ctx.shadowOffsetX = 5;
    this.ctx.shadowOffsetY = 5;

    switch (tile.decoration) {
        case DecorationType.TREE:
            // Trunk
            this.ctx.fillStyle = '#3e2723';
            this.ctx.fillRect(cx - 6, cy, 12, 15);
            // Leaves
            this.ctx.fillStyle = '#1b5e20';
            this.ctx.beginPath();
            this.ctx.arc(cx, cy - 10, TILE_SIZE * 0.35, 0, Math.PI * 2);
            this.ctx.arc(cx - 10, cy - 5, TILE_SIZE * 0.25, 0, Math.PI * 2);
            this.ctx.arc(cx + 10, cy - 5, TILE_SIZE * 0.25, 0, Math.PI * 2);
            this.ctx.fill();
            // Highlight
            this.ctx.fillStyle = '#2e7d32';
            this.ctx.beginPath();
            this.ctx.arc(cx, cy - 15, TILE_SIZE * 0.2, 0, Math.PI * 2);
            this.ctx.fill();
            break;

        case DecorationType.ROCK:
            this.ctx.fillStyle = '#5d4037';
            this.ctx.beginPath();
            this.ctx.moveTo(cx - 15, cy + 10);
            this.ctx.lineTo(cx - 5, cy - 15);
            this.ctx.lineTo(cx + 15, cy + 5);
            this.ctx.lineTo(cx + 5, cy + 15);
            this.ctx.closePath();
            this.ctx.fill();
            // Facet highlight
            this.ctx.fillStyle = '#795548';
            this.ctx.beginPath();
            this.ctx.moveTo(cx - 5, cy - 15);
            this.ctx.lineTo(cx + 5, cy);
            this.ctx.lineTo(cx + 15, cy + 5);
            this.ctx.fill();
            break;

        case DecorationType.CRYSTAL:
            this.ctx.shadowColor = '#d8b4fe';
            this.ctx.shadowBlur = 15;
            this.ctx.fillStyle = '#a855f7';
            this.ctx.beginPath();
            this.ctx.moveTo(cx, cy - 25);
            this.ctx.lineTo(cx + 12, cy);
            this.ctx.lineTo(cx, cy + 25);
            this.ctx.lineTo(cx - 12, cy);
            this.ctx.fill();
            // Shine
            this.ctx.fillStyle = '#e9d5ff';
            this.ctx.beginPath();
            this.ctx.moveTo(cx, cy - 25);
            this.ctx.lineTo(cx + 4, cy);
            this.ctx.lineTo(cx, cy + 25);
            this.ctx.fill();
            break;

        case DecorationType.BUILDING:
            this.ctx.shadowColor = '#00ffff';
            this.ctx.shadowBlur = 10;
            this.ctx.fillStyle = '#0f172a';
            this.ctx.fillRect(cx - 15, cy - 30, 30, 50);
            // Neon strips
            this.ctx.fillStyle = '#00ffff';
            this.ctx.fillRect(cx - 10, cy - 25, 20, 2);
            this.ctx.fillRect(cx - 10, cy - 15, 20, 2);
            this.ctx.fillRect(cx - 10, cy - 5, 20, 2);
            break;

        case DecorationType.CLOUD:
            this.ctx.shadowColor = 'rgba(0,0,0,0.1)';
            this.ctx.fillStyle = 'rgba(255,255,255,0.9)';
            this.ctx.beginPath();
            this.ctx.arc(cx, cy, 20, 0, Math.PI*2);
            this.ctx.arc(cx - 15, cy + 5, 15, 0, Math.PI*2);
            this.ctx.arc(cx + 15, cy + 5, 15, 0, Math.PI*2);
            this.ctx.fill();
            break;

        case DecorationType.CORAL:
            this.ctx.fillStyle = '#f43f5e';
            this.ctx.beginPath();
            this.ctx.moveTo(cx, cy + 20);
            this.ctx.bezierCurveTo(cx - 10, cy, cx - 15, cy - 10, cx - 10, cy - 20);
            this.ctx.bezierCurveTo(cx, cy - 10, cx + 5, cy - 10, cx, cy + 20);
            this.ctx.fill();
            break;
    }
    this.ctx.restore();
  }

  private drawCollectible(c: Collectible) {
    const cx = c.position.x * TILE_SIZE;
    const cy = c.position.y * TILE_SIZE;

    // Smooth Pulse
    const scale = 1 + Math.sin(Date.now() / 300) * 0.15;

    this.ctx.save();
    this.ctx.translate(cx, cy);
    this.ctx.scale(scale, scale);

    const color = BIOME_COLORS[c.biome].particle;
    this.ctx.fillStyle = color;
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = color;

    // Diamond shape
    this.ctx.beginPath();
    this.ctx.moveTo(0, -12);
    this.ctx.lineTo(10, 0);
    this.ctx.lineTo(0, 12);
    this.ctx.lineTo(-10, 0);
    this.ctx.closePath();
    this.ctx.fill();

    // Inner highlight
    this.ctx.fillStyle = '#ffffff';
    this.ctx.globalAlpha = 0.5;
    this.ctx.beginPath();
    this.ctx.arc(0, -5, 3, 0, Math.PI*2);
    this.ctx.fill();

    this.ctx.restore();
  }

  private drawPlayer(gameState: GameState) {
    const { playerPos, playerFacing, isMoving } = gameState;
    const cx = playerPos.x * TILE_SIZE;
    const cy = playerPos.y * TILE_SIZE;

    this.ctx.save();
    this.ctx.translate(cx, cy);

    // Shadow under feet
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    this.ctx.beginPath();
    this.ctx.ellipse(0, 14, 12, 6, 0, 0, Math.PI * 2);
    this.ctx.fill();

    // Bobbing animation
    const bob = isMoving ? Math.sin(Date.now() / 100) * 2 : 0;
    this.ctx.translate(0, bob);

    // Character Colors
    const skinColor = '#ffdbac';
    const shirtColor = '#eab308';
    const pantsColor = '#78350f';
    const backpackColor = '#57534e';

    // Rotate slightly based on movement X for banking effect
    const bankAngle = isMoving ? playerFacing.x * 0.1 : 0;
    this.ctx.rotate(bankAngle);

    // Legs (animated)
    const legOffset = isMoving ? Math.sin(Date.now() / 100) * 4 : 0;

    // Left Leg
    this.ctx.fillStyle = pantsColor;
    this.ctx.fillRect(-6, 8 + legOffset, 5, 10);
    // Right Leg
    this.ctx.fillStyle = pantsColor;
    this.ctx.fillRect(1, 8 - legOffset, 5, 10);

    // Backpack (drawn behind if facing down, front if facing up)
    if (playerFacing.y < 0) {
        this.ctx.fillStyle = backpackColor;
        this.ctx.fillRect(-8, -10, 16, 14);
    }

    // Body
    this.ctx.fillStyle = shirtColor;
    this.ctx.beginPath();
    this.ctx.roundRect(-8, -8, 16, 18, 4);
    this.ctx.fill();

    // Head
    this.ctx.fillStyle = skinColor;
    this.ctx.beginPath();
    this.ctx.arc(0, -12, 8, 0, Math.PI * 2);
    this.ctx.fill();

    // Hair/Hat
    this.ctx.fillStyle = '#3f2e18';
    this.ctx.beginPath();
    this.ctx.arc(0, -14, 8.5, Math.PI, 0);
    this.ctx.fill();

    // Eyes
    this.ctx.fillStyle = '#000';
    if (playerFacing.y >= 0) {
        // Backpack straps
        this.ctx.fillStyle = backpackColor;
        this.ctx.fillRect(-6, -6, 2, 14);
        this.ctx.fillRect(4, -6, 2, 14);

        // Eyes
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(-3, -12, 2, 2);
        this.ctx.fillRect(1, -12, 2, 2);
    }

    if (playerFacing.x !== 0 && playerFacing.y === 0) {
         this.ctx.fillStyle = '#000';
         this.ctx.fillRect(playerFacing.x > 0 ? 3 : -5, -12, 2, 2);
    }

    if (playerFacing.y < 0) {
       this.ctx.fillStyle = backpackColor;
       this.ctx.fillRect(-8, -8, 16, 14);
       this.ctx.fillStyle = '#78716c';
       this.ctx.fillRect(-6, -4, 12, 6);
    }

    this.ctx.restore();
  }

  private drawNPC(npc: NPC) {
    const cx = npc.position.x * TILE_SIZE;
    const cy = npc.position.y * TILE_SIZE;

    this.ctx.save();
    this.ctx.translate(cx, cy);

    // Shadow
    this.ctx.fillStyle = 'rgba(0,0,0,0.4)';
    this.ctx.beginPath();
    this.ctx.ellipse(0, 10, 10, 5, 0, 0, Math.PI * 2);
    this.ctx.fill();

    // Robe/Body
    this.ctx.fillStyle = npc.color;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -15);
    this.ctx.lineTo(10, 10);
    this.ctx.lineTo(-10, 10);
    this.ctx.closePath();
    this.ctx.fill();

    // Head
    this.ctx.fillStyle = '#ffe0bd';
    this.ctx.beginPath();
    this.ctx.arc(0, -15, 7, 0, Math.PI*2);
    this.ctx.fill();

    // Hood
    this.ctx.fillStyle = npc.color;
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.beginPath();
    this.ctx.arc(0, -17, 7, Math.PI, 0);
    this.ctx.fill();

    // Name label
    this.ctx.font = 'bold 12px Courier New';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'white';
    this.ctx.shadowColor = 'black';
    this.ctx.shadowBlur = 4;
    this.ctx.fillText(npc.name, 0, -30);
    this.ctx.restore();
  }

  private drawInteractionPrompt(pos: Vector2) {
    const cx = pos.x * TILE_SIZE;
    const cy = pos.y * TILE_SIZE;

    this.ctx.save();
    this.ctx.fillStyle = '#fbbf24';
    this.ctx.font = 'bold 16px Courier New';
    this.ctx.textAlign = 'center';
    this.ctx.shadowColor = 'black';
    this.ctx.shadowBlur = 4;

    const bounce = Math.sin(Date.now() / 150) * 4;

    // Draw Keycap
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(cx - 10, cy - 50 + bounce, 20, 20);
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(cx - 10, cy - 50 + bounce, 20, 20);

    this.ctx.fillStyle = '#000';
    this.ctx.fillText('E', cx, cy - 35 + bounce);
    this.ctx.restore();
  }

  private generateParticles(biome: BiomeType) {
    if (this.particles.length > 150) return;

    const spawnChance = 0.3;
    if (Math.random() > spawnChance) return;

    let p: Particle | null = null;
    const x = Math.random() * this.width;
    const y = Math.random() * this.height;

    switch (biome) {
        case BiomeType.FOREST:
            p = { x, y: 0, vx: (Math.random() - 0.5), vy: 1 + Math.random(), life: 300, maxLife: 300, color: '#4ade80', size: 2 + Math.random() * 2, type: 'leaf' };
            break;
        case BiomeType.DESERT:
            p = { x: 0, y, vx: 3 + Math.random() * 2, vy: (Math.random() - 0.5), life: 200, maxLife: 200, color: '#fde047', size: 1.5, type: 'sand' };
            break;
        case BiomeType.CAVERNS:
            p = { x, y, vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, life: 150, maxLife: 150, color: '#ffffff', size: 1 + Math.random(), type: 'sparkle' };
            break;
        case BiomeType.NEON:
            p = { x, y: 0, vx: 0, vy: 8 + Math.random() * 4, life: 60, maxLife: 60, color: 'rgba(45, 212, 191, 0.6)', size: 1, type: 'rain' };
            break;
        case BiomeType.OCEAN:
            p = { x, y: this.height, vx: (Math.random() - 0.5) * 0.5, vy: -0.5 - Math.random(), life: 400, maxLife: 400, color: 'rgba(255, 255, 255, 0.4)', size: 2 + Math.random() * 3, type: 'bubble' };
            break;
        case BiomeType.ISLANDS:
             p = { x: this.width, y: Math.random() * this.height, vx: -0.5 - Math.random(), vy: 0, life: 600, maxLife: 600, color: 'rgba(255,255,255,0.7)', size: 10 + Math.random() * 20, type: 'cloud' };
             break;
    }

    if (p) this.particles.push(p);
  }

  private drawParticles() {
    this.ctx.save();
    for (const p of this.particles) {
        this.ctx.fillStyle = p.color;

        if (p.type === 'rain') {
            this.ctx.fillRect(p.x, p.y, 1, 15);
        } else if (p.type === 'sparkle') {
            const opacity = Math.sin((p.life / p.maxLife) * Math.PI);
            this.ctx.globalAlpha = opacity;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            this.ctx.fill();
        } else if (p.type === 'cloud') {
            this.ctx.globalAlpha = 0.4;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            this.ctx.fill();
        } else {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            this.ctx.fill();
        }
    }
    this.ctx.restore();
  }

  private drawVignette() {
      const gradient = this.ctx.createRadialGradient(
          this.width / 2, this.height / 2, this.height / 3,
          this.width / 2, this.height / 2, this.height
      );
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.6)');

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.width, this.height);
  }
}
