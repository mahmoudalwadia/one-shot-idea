import { BiomeType, DecorationType, GameState, Particle, Tile, Vector2, PlayerTheme } from '../types';
import { TILE_SIZE, BIOME_COLORS } from '../constants';
import { WorldGenerator } from './worldGenerator';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private particles: Particle[] = [];
  private playerTrail: TrailPoint[] = [];
  private lastPlayerPos: Vector2 = { x: 0, y: 0 };
  private ambientPulse: number = 0;

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
    // Update ambient pulse
    this.ambientPulse = (this.ambientPulse + 0.02) % (Math.PI * 2);

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      if (p.type === 'bubble' && p.y < 0) p.y = this.height;
    }

    // Age trail points
    for (let i = this.playerTrail.length - 1; i >= 0; i--) {
      this.playerTrail[i].age++;
      if (this.playerTrail[i].age > 15) {
        this.playerTrail.splice(i, 1);
      }
    }
  }

  private updateTrail(playerPos: Vector2, isMoving: boolean) {
    const dx = playerPos.x - this.lastPlayerPos.x;
    const dy = playerPos.y - this.lastPlayerPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (isMoving && dist > 0.05) {
      this.playerTrail.push({
        x: playerPos.x,
        y: playerPos.y,
        age: 0
      });
      this.lastPlayerPos = { ...playerPos };

      // Limit trail length
      if (this.playerTrail.length > 12) {
        this.playerTrail.shift();
      }
    }
  }

  public draw(gameState: GameState, world: WorldGenerator, camera: Vector2) {
    if (!this.ctx) return;

    // Draw biome-themed gradient background
    this.drawBackground(gameState.currentBiome);

    this.ctx.save();

    let currentTileSize = TILE_SIZE;
    let camX = camera.x;
    let camY = camera.y;

    if (gameState.isFullMapMode) {
        const padding = 60;
        const availableW = this.width - padding * 2;
        const availableH = this.height - padding * 2;
        const mazeW = (world.mazeWidth || 1) * TILE_SIZE;
        const mazeH = (world.mazeHeight || 1) * TILE_SIZE;

        const scale = Math.min(availableW / (mazeW || 1), availableH / (mazeH || 1));
        currentTileSize = TILE_SIZE * scale;

        camX = world.mazeWidth / 2;
        camY = world.mazeHeight / 2;
    }

    const camOffsetX = this.width / 2 - camX * currentTileSize;
    const camOffsetY = this.height / 2 - camY * currentTileSize;
    this.ctx.translate(camOffsetX, camOffsetY);

    // Viewport Culling
    const viewPadding = 2;
    const startX = Math.max(0, Math.floor((camX * currentTileSize - this.width / 2) / currentTileSize) - viewPadding);
    const endX = Math.min(world.mazeWidth, Math.ceil((camX * currentTileSize + this.width / 2) / currentTileSize) + viewPadding);
    const startY = Math.max(0, Math.floor((camY * currentTileSize - this.height / 2) / currentTileSize) - viewPadding);
    const endY = Math.min(world.mazeHeight, Math.ceil((camY * currentTileSize + this.height / 2) / currentTileSize) + viewPadding);

    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        const tile = world.getTile(x, y);
        if (tile) this.drawTileGround(tile, x, y, currentTileSize);
      }
    }

    if (world.goalPoint) {
      this.drawGoal(world.goalPoint, currentTileSize, gameState.currentBiome);
    }

    // Update and draw player trail
    this.updateTrail(gameState.playerPos, gameState.isMoving);
    this.drawTrail(currentTileSize, gameState.currentBiome);

    this.drawPlayer(gameState, currentTileSize);

    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        const tile = world.getTile(x, y);
        if (tile && tile.isSolid) this.drawDecoration(tile, x, y, currentTileSize);
      }
    }

    this.ctx.restore();

    this.generateParticles(gameState.currentBiome);
    this.drawParticles();
    this.drawAmbientLight(gameState.currentBiome);
    this.drawVignette();
  }

  private drawTileGround(tile: Tile, x: number, y: number, size: number) {
    const biomeData = BIOME_COLORS[tile.biome];
    if (!biomeData) return;
    const colors = biomeData.ground;
    if (!colors || colors.length === 0) return;

    const px = x * size;
    const py = y * size;
    const colorIndex = Math.floor(tile.variation * colors.length) % colors.length;
    const baseColor = colors[colorIndex] || colors[0];

    if (tile.isSolid) {
      // Draw wall shadow first (offset down-right)
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(px + 3, py + 3, size, size);

      // Draw wall base (darker)
      this.ctx.fillStyle = this.darkenColor(baseColor, 0.25);
      this.ctx.fillRect(px, py, size, size);

      // Add subtle inner highlight on top-left edges
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      this.ctx.fillRect(px, py, size, 2);
      this.ctx.fillRect(px, py, 2, size);

      // Add dark border on bottom-right edges for depth
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      this.ctx.fillRect(px, py + size - 2, size, 2);
      this.ctx.fillRect(px + size - 2, py, 2, size);
    } else {
      // Floor tile with subtle gradient feel
      this.ctx.fillStyle = baseColor;
      this.ctx.fillRect(px - 0.5, py - 0.5, size + 1, size + 1);

      // Add subtle tile border for texture
      this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(px + 0.5, py + 0.5, size - 1, size - 1);

      // Add tiny highlight on alternate tiles for visual interest
      if ((x + y) % 2 === 0) {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        this.ctx.fillRect(px, py, size, size);
      }
    }
  }

  private drawGoal(pos: Vector2, size: number, biome: BiomeType) {
    const cx = pos.x * size;
    const cy = pos.y * size;
    const time = Date.now();
    const glowColor = BIOME_COLORS[biome]?.text || '#ffffff';

    this.ctx.save();
    this.ctx.translate(cx, cy);

    // Outer glow effect
    const outerGlow = this.ctx.createRadialGradient(0, 0, size * 0.2, 0, 0, size * 1.2);
    outerGlow.addColorStop(0, glowColor);
    outerGlow.addColorStop(0.3, this.hexToRgba(glowColor, 0.4));
    outerGlow.addColorStop(1, 'transparent');
    this.ctx.fillStyle = outerGlow;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, size * 1.2, 0, Math.PI * 2);
    this.ctx.fill();

    // Animated rotating rings
    for (let i = 0; i < 3; i++) {
      const ringRadius = size * (0.35 + i * 0.12);
      const rotation = (time / (800 + i * 200)) * (i % 2 === 0 ? 1 : -1);
      const alpha = 0.6 - i * 0.15;

      this.ctx.save();
      this.ctx.rotate(rotation);
      this.ctx.strokeStyle = this.hexToRgba(glowColor, alpha);
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([8, 8]);
      this.ctx.beginPath();
      this.ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();
    }
    this.ctx.setLineDash([]);

    // Inner portal with swirl effect
    const innerGrad = this.ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.3);
    innerGrad.addColorStop(0, '#000');
    innerGrad.addColorStop(0.7, this.hexToRgba(glowColor, 0.3));
    innerGrad.addColorStop(1, glowColor);
    this.ctx.fillStyle = innerGrad;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
    this.ctx.fill();

    // Center pulse
    const pulse = 0.8 + Math.sin(time / 200) * 0.2;
    this.ctx.fillStyle = glowColor;
    this.ctx.globalAlpha = 0.8;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, size * 0.08 * pulse, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.globalAlpha = 1.0;

    // Floating particles around portal
    for (let i = 0; i < 6; i++) {
      const angle = (time / 1000) + (i * Math.PI / 3);
      const dist = size * 0.4 + Math.sin(time / 300 + i) * size * 0.05;
      const px = Math.cos(angle) * dist;
      const py = Math.sin(angle) * dist;

      this.ctx.fillStyle = glowColor;
      this.ctx.globalAlpha = 0.6;
      this.ctx.beginPath();
      this.ctx.arc(px, py, 2, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1.0;

    this.ctx.restore();
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private drawTrail(size: number, biome: BiomeType) {
    if (this.playerTrail.length < 2) return;

    const glowColor = BIOME_COLORS[biome]?.text || '#ffffff';

    // Draw trail as fading circles
    for (let i = 0; i < this.playerTrail.length; i++) {
      const point = this.playerTrail[i];
      const alpha = Math.max(0, (1 - point.age / 15) * 0.4);
      const trailSize = (1 - point.age / 15) * size * 0.15;

      if (alpha > 0 && trailSize > 0) {
        const px = point.x * size;
        const py = point.y * size;

        // Glow effect
        const glow = this.ctx.createRadialGradient(px, py, 0, px, py, trailSize * 2);
        glow.addColorStop(0, this.hexToRgba(glowColor, alpha));
        glow.addColorStop(1, 'transparent');
        this.ctx.fillStyle = glow;
        this.ctx.beginPath();
        this.ctx.arc(px, py, trailSize * 2, 0, Math.PI * 2);
        this.ctx.fill();

        // Core
        this.ctx.fillStyle = this.hexToRgba(glowColor, alpha * 1.5);
        this.ctx.beginPath();
        this.ctx.arc(px, py, trailSize, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }

  private drawDecoration(tile: Tile, x: number, y: number, size: number) {
    const cx = x * size + size / 2;
    const cy = y * size + size / 2;
    const time = Date.now();
    this.ctx.save();

    // Draw shadow for decoration
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    this.ctx.beginPath();
    this.ctx.ellipse(cx + 2, cy + size/3, size/4, size/8, 0, 0, Math.PI * 2);
    this.ctx.fill();

    switch (tile.decoration) {
        case DecorationType.TREE:
            this.ctx.fillStyle = '#4b2e1e';
            this.ctx.fillRect(cx - size/10, cy, size/5, size/4);
            ['#1b5e20', '#2e7d32', '#388e3c'].forEach((c, i) => {
                this.ctx.fillStyle = c;
                const r = (size * 0.45) - (i * size/8);
                const oy = (i * -size/6);
                this.ctx.beginPath();
                this.ctx.arc(cx, cy - size/8 + oy, Math.max(0, r), 0, Math.PI * 2);
                this.ctx.fill();
            });
            break;
        case DecorationType.ICE:
            this.ctx.fillStyle = '#bae6fd';
            this.ctx.beginPath();
            this.ctx.moveTo(cx - size/2, cy + size/2);
            this.ctx.lineTo(cx, cy - size/2.5);
            this.ctx.lineTo(cx + size/2, cy + size/2);
            this.ctx.fill();
            this.ctx.fillStyle = '#f0f9ff';
            this.ctx.beginPath();
            this.ctx.moveTo(cx - size/4, cy + size/2);
            this.ctx.lineTo(cx, cy - size/4);
            this.ctx.lineTo(cx + size/6, cy + size/2);
            this.ctx.fill();
            break;
        case DecorationType.OBSIDIAN:
            this.ctx.fillStyle = '#0c0a09';
            this.ctx.fillRect(cx - size/4, cy - size/2, size/2, size);
            this.ctx.strokeStyle = '#ef4444';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(cx - size/4, cy - size/2, size/2, size);
            break;
        case DecorationType.RUIN:
            this.ctx.fillStyle = '#57534e';
            this.ctx.fillRect(cx - size/3, cy - size/2, size/1.5, size/4);
            this.ctx.fillRect(cx - size/4, cy - size/4, size/2, size/1.5);
            break;
        case DecorationType.MUSHROOM:
            this.ctx.fillStyle = '#e7e5e4';
            this.ctx.fillRect(cx - size/10, cy, size/5, size/4);
            this.ctx.fillStyle = '#ef4444';
            this.ctx.beginPath();
            this.ctx.arc(cx, cy, size/3, Math.PI, 0);
            this.ctx.fill();
            this.ctx.fillStyle = '#fff';
            this.ctx.beginPath();
            this.ctx.arc(cx - size/8, cy - size/8, size/16, 0, Math.PI * 2);
            this.ctx.arc(cx + size/10, cy - size/6, size/20, 0, Math.PI * 2);
            this.ctx.fill();
            break;
        case DecorationType.STAR:
            this.ctx.fillStyle = '#fbbf24';
            const s = size/3;
            this.ctx.beginPath();
            for(let i=0; i<5; i++) {
                this.ctx.lineTo(cx + Math.cos(i*Math.PI*2/5 - Math.PI/2)*s, cy + Math.sin(i*Math.PI*2/5 - Math.PI/2)*s);
                this.ctx.lineTo(cx + Math.cos((i+0.5)*Math.PI*2/5 - Math.PI/2)*s/2, cy + Math.sin((i+0.5)*Math.PI*2/5 - Math.PI/2)*s/2);
            }
            this.ctx.closePath();
            this.ctx.fill();
            break;
        case DecorationType.GEAR:
            this.ctx.fillStyle = '#52525b';
            this.ctx.translate(cx, cy);
            this.ctx.rotate(time/1000);
            this.ctx.beginPath();
            this.ctx.arc(0, 0, size/3, 0, Math.PI*2);
            for(let i=0; i<8; i++) {
                this.ctx.rotate(Math.PI/4);
                this.ctx.fillRect(-size/8, -size/2.5, size/4, size/4);
            }
            this.ctx.fill();
            this.ctx.fillStyle = '#27272a';
            this.ctx.beginPath();
            this.ctx.arc(0, 0, size/6, 0, Math.PI*2);
            this.ctx.fill();
            break;
        case DecorationType.TOTEM:
            this.ctx.fillStyle = '#92400e';
            this.ctx.fillRect(cx-size/4, cy-size/2, size/2, size);
            this.ctx.fillStyle = '#fbbf24';
            this.ctx.fillRect(cx-size/6, cy-size/4, size/3, size/8);
            this.ctx.beginPath();
            this.ctx.arc(cx, cy-size/3, size/10, 0, Math.PI*2);
            this.ctx.fill();
            break;
        case DecorationType.ORB:
            const grad = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, size/2);
            grad.addColorStop(0, '#f5d0fe');
            grad.addColorStop(1, 'transparent');
            this.ctx.fillStyle = grad;
            this.ctx.beginPath();
            this.ctx.arc(cx, cy, size/2, 0, Math.PI*2);
            this.ctx.fill();
            this.ctx.fillStyle = '#e879f9';
            this.ctx.beginPath();
            this.ctx.arc(cx + Math.sin(time/500)*size/8, cy + Math.cos(time/500)*size/8, size/10, 0, Math.PI*2);
            this.ctx.fill();
            break;
        case DecorationType.SPIRE:
            this.ctx.fillStyle = '#450a0a';
            this.ctx.beginPath();
            this.ctx.moveTo(cx-size/2.5, cy+size/2);
            this.ctx.lineTo(cx, cy-size/2);
            this.ctx.lineTo(cx+size/2.5, cy+size/2);
            this.ctx.fill();
            break;
        case DecorationType.PUMPKIN:
            this.ctx.fillStyle = '#ea580c';
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy, size/3, size/4, 0, 0, Math.PI*2);
            this.ctx.fill();
            this.ctx.fillStyle = '#166534';
            this.ctx.fillRect(cx-2, cy-size/3, 4, size/6);
            break;
        case DecorationType.CRYSTAL:
            this.ctx.fillStyle = BIOME_COLORS[tile.biome]?.text || '#d8b4fe';
            this.ctx.globalAlpha = 0.8;
            for(let i=0; i<3; i++) {
                this.ctx.save();
                this.ctx.translate(cx + (i-1)*size/5, cy);
                this.ctx.rotate((i-1) * 0.3);
                this.ctx.beginPath();
                this.ctx.moveTo(0, -size/3);
                this.ctx.lineTo(size/10, 0);
                this.ctx.lineTo(-size/10, 0);
                this.ctx.fill();
                this.ctx.restore();
            }
            break;
        case DecorationType.BUILDING:
            this.ctx.fillStyle = '#111827';
            this.ctx.fillRect(cx - size/2.5, cy - size/2.5, size/1.25, size/1.25);
            this.ctx.strokeStyle = '#06b6d4';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(cx - size/2.5, cy - size/2.5, size/1.25, size/1.25);
            break;
        case DecorationType.CLOUD:
            this.ctx.fillStyle = 'rgba(255,255,255,0.8)';
            this.ctx.beginPath();
            this.ctx.arc(cx - size/5, cy, size/4, 0, Math.PI*2);
            this.ctx.arc(cx + size/5, cy, size/4, 0, Math.PI*2);
            this.ctx.arc(cx, cy - size/5, size/4, 0, Math.PI*2);
            this.ctx.fill();
            break;
        case DecorationType.CORAL:
            this.ctx.fillStyle = '#fb7185';
            this.ctx.beginPath();
            this.ctx.arc(cx, cy, size/3, 0, Math.PI*2);
            this.ctx.fill();
            break;
        case DecorationType.ROCK:
            this.ctx.fillStyle = '#795548';
            this.ctx.beginPath();
            this.ctx.moveTo(cx - size/2.5, cy + size/2.5);
            this.ctx.lineTo(cx - size/4, cy - size/4);
            this.ctx.lineTo(cx + size/4, cy - size/3);
            this.ctx.lineTo(cx + size/2.5, cy + size/2.5);
            this.ctx.fill();
            break;
        default:
            this.ctx.fillStyle = '#222';
            this.ctx.fillRect(cx-size/2, cy-size/2, size, size);
    }
    this.ctx.restore();
  }

  private drawPlayer(gameState: GameState, size: number) {
    const { playerPos, playerFacing, isMoving, playerTheme, currentBiome } = gameState;
    const cx = playerPos.x * size;
    const cy = playerPos.y * size;
    const time = Date.now();
    const bob = isMoving ? Math.sin(time / 100) * (size/25) : Math.sin(time / 400) * (size/50);
    const glowColor = BIOME_COLORS[currentBiome]?.text || '#ffffff';

    this.ctx.save();
    this.ctx.translate(cx, cy);

    // Player glow effect
    const glowRadius = size * 0.6;
    const glowPulse = 0.9 + Math.sin(time / 500) * 0.1;
    const playerGlow = this.ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius * glowPulse);
    playerGlow.addColorStop(0, this.hexToRgba(glowColor, 0.25));
    playerGlow.addColorStop(0.5, this.hexToRgba(glowColor, 0.1));
    playerGlow.addColorStop(1, 'transparent');
    this.ctx.fillStyle = playerGlow;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, glowRadius * glowPulse, 0, Math.PI * 2);
    this.ctx.fill();

    // Common Shadow (slightly larger and softer)
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    this.ctx.beginPath();
    this.ctx.ellipse(0, size/4, size/5, size/10, 0, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.translate(0, bob);

    switch(playerTheme) {
        case PlayerTheme.CAT:
            this.drawCat(size, playerFacing);
            break;
        case PlayerTheme.PACMAN:
            this.drawPacman(size, playerFacing, time);
            break;
        case PlayerTheme.BOT:
            this.drawBot(size, playerFacing, time);
            break;
        case PlayerTheme.GHOST:
            this.drawGhost(size, playerFacing, time);
            break;
        case PlayerTheme.SLIME:
            this.drawSlime(size, time);
            break;
        case PlayerTheme.NINJA:
            this.drawNinja(size, playerFacing);
            break;
        case PlayerTheme.ALIEN:
            this.drawAlien(size, playerFacing, time);
            break;
        case PlayerTheme.KNIGHT:
            this.drawKnight(size, playerFacing);
            break;
        case PlayerTheme.ROBOT_DOG:
            this.drawRobotDog(size, playerFacing, time);
            break;
        case PlayerTheme.VAMPIRE:
            this.drawVampire(size, playerFacing);
            break;
        case PlayerTheme.WIZARD:
            this.drawWizard(size, playerFacing, time);
            break;
        case PlayerTheme.ASTRONAUT:
            this.drawAstronaut(size, playerFacing);
            break;
        case PlayerTheme.ZOMBIE:
            this.drawZombie(size, playerFacing, isMoving, time);
            break;
        case PlayerTheme.DRAGON:
            this.drawDragon(size, playerFacing, time);
            break;
        case PlayerTheme.PHOENIX:
            this.drawPhoenix(size, time);
            break;
        default:
            this.drawExplorer(size, playerFacing, isMoving, time);
    }

    this.ctx.restore();
  }

  private drawExplorer(size: number, playerFacing: Vector2, isMoving: boolean, time: number) {
    this.ctx.fillStyle = '#451a03';
    this.ctx.beginPath();
    this.ctx.roundRect(-size/6, -size/8, size/3, size/4, 4);
    this.ctx.fill();
    this.ctx.strokeStyle = '#2d1102';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(-size/6, -size/8, size/3, size/4);

    this.ctx.fillStyle = '#92400e';
    this.ctx.beginPath();
    this.ctx.roundRect(-size/8, -size/8, size/4, size/3.5, size/16);
    this.ctx.fill();

    this.ctx.fillStyle = '#451a03';
    this.ctx.fillRect(-size/8, size/20, size/4, size/20);
    this.ctx.fillStyle = '#facc15';
    this.ctx.fillRect(-size/32, size/20, size/16, size/20);

    const scarfWave = Math.sin(time / 200) * (size/20);
    this.ctx.fillStyle = '#dc2626';
    this.ctx.beginPath();
    this.ctx.roundRect(-size/8 - 2, -size/8 - 2, size/4 + 4, size/20, 2);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.moveTo(size/8, -size/8);
    this.ctx.quadraticCurveTo(size/4 + scarfWave, -size/16, size/4, size/8 + scarfWave);
    this.ctx.lineTo(size/6, size/8 + scarfWave);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.fillStyle = '#ffdbac';
    this.ctx.beginPath();
    this.ctx.arc(0, -size/5, size/8, 0, Math.PI * 2);
    this.ctx.fill();

    const faceX = (playerFacing?.x || 0) * 2;
    const faceY = (playerFacing?.y || 0) * 1;

    this.ctx.fillStyle = '#000';
    this.ctx.beginPath();
    this.ctx.arc(-2.5 + faceX, -size/5 + faceY, 1.2, 0, Math.PI*2);
    this.ctx.arc(2.5 + faceX, -size/5 + faceY, 1.2, 0, Math.PI*2);
    this.ctx.fill();

    this.ctx.fillStyle = 'rgba(244, 114, 182, 0.4)';
    this.ctx.beginPath();
    this.ctx.arc(-4 + faceX, -size/6 + faceY, 1.5, 0, Math.PI*2);
    this.ctx.arc(4 + faceX, -size/6 + faceY, 1.5, 0, Math.PI*2);
    this.ctx.fill();

    this.ctx.fillStyle = '#78350f';
    this.ctx.beginPath();
    this.ctx.moveTo(-size/16, -size/4);
    this.ctx.lineTo(0, -size/3);
    this.ctx.lineTo(size/16, -size/4);
    this.ctx.fill();

    this.ctx.save();
    this.ctx.translate(faceX * 0.5, faceY * 0.5);
    this.ctx.fillStyle = '#78350f';
    this.ctx.beginPath();
    this.ctx.ellipse(0, -size/3.5, size/5, size/12, 0, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(0, -size/3.5, size/8, Math.PI, 0);
    this.ctx.fill();
    this.ctx.fillStyle = '#451a03';
    this.ctx.fillRect(-size/8, -size/3.5 - 2, size/4, 4);
    this.ctx.restore();

    const legOffset = isMoving ? Math.sin(time / 100) * (size/15) : 0;
    this.ctx.fillStyle = '#451a03';
    this.ctx.fillRect(-size/10, size/8 + legOffset, size/16, size/8);
    this.ctx.fillRect(size/32, size/8 - legOffset, size/16, size/8);
  }

  private drawCat(size: number, facing: Vector2) {
    this.ctx.fillStyle = '#111'; // Black cat
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, size/4, size/6, 0, 0, Math.PI*2); // Body
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(0, -size/5, size/6, 0, Math.PI*2); // Head
    this.ctx.fill();

    // Ears
    this.ctx.beginPath();
    this.ctx.moveTo(-size/8, -size/3.5);
    this.ctx.lineTo(-size/5, -size/2);
    this.ctx.lineTo(-size/16, -size/3.5);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.moveTo(size/8, -size/3.5);
    this.ctx.lineTo(size/5, -size/2);
    this.ctx.lineTo(size/16, -size/3.5);
    this.ctx.fill();

    // Eyes
    this.ctx.fillStyle = '#4ade80';
    const fx = facing.x * 3;
    const fy = facing.y * 1;
    this.ctx.beginPath();
    this.ctx.arc(-size/10 + fx, -size/5 + fy, size/24, 0, Math.PI*2);
    this.ctx.arc(size/10 + fx, -size/5 + fy, size/24, 0, Math.PI*2);
    this.ctx.fill();

    // Tail
    this.ctx.strokeStyle = '#111';
    this.ctx.lineWidth = size/12;
    this.ctx.lineCap = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.quadraticCurveTo(size/2, -size/4, size/3, -size/2);
    this.ctx.stroke();
  }

  private drawPacman(size: number, facing: Vector2, time: number) {
    this.ctx.fillStyle = '#fde047';
    const angle = (Math.sin(time / 100) + 1) * 0.4;
    const dirAngle = Math.atan2(facing.y, facing.x);

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.arc(0, 0, size/3, dirAngle + angle, dirAngle + Math.PI*2 - angle);
    this.ctx.lineTo(0, 0);
    this.ctx.fill();
  }

  private drawBot(size: number, facing: Vector2, time: number) {
    this.ctx.fillStyle = '#3f3f46';
    this.ctx.fillRect(-size/4, -size/4, size/2, size/2.5); // Body

    this.ctx.fillStyle = '#71717a';
    this.ctx.fillRect(-size/6, -size/2.5, size/3, size/6); // Head

    this.ctx.fillStyle = '#06b6d4';
    const fx = facing.x * 4;
    this.ctx.fillRect(-size/8 + fx, -size/3, size/4, size/16); // Visor

    this.ctx.fillStyle = '#ef4444';
    if (Math.sin(time/200) > 0.8) {
      this.ctx.beginPath();
      this.ctx.arc(0, -size/2.5, 2, 0, Math.PI*2);
      this.ctx.fill();
    }
  }

  private drawGhost(size: number, facing: Vector2, time: number) {
    this.ctx.globalAlpha = 0.7;
    this.ctx.fillStyle = '#fff';
    this.ctx.beginPath();
    this.ctx.arc(0, -size/8, size/4, Math.PI, 0);
    this.ctx.lineTo(size/4, size/4);

    const wave = Math.sin(time/150) * 5;
    for(let i=0; i<3; i++) {
        this.ctx.quadraticCurveTo(size/4 - (i+0.5)*size/6, size/4 + wave, size/4 - (i+1)*size/6, size/4);
    }

    this.ctx.lineTo(-size/4, -size/8);
    this.ctx.fill();

    this.ctx.fillStyle = '#000';
    const fx = facing.x * 3;
    const fy = facing.y * 1;
    this.ctx.beginPath();
    this.ctx.arc(-size/12 + fx, -size/6 + fy, 2, 0, Math.PI*2);
    this.ctx.arc(size/12 + fx, -size/6 + fy, 2, 0, Math.PI*2);
    this.ctx.fill();
    this.ctx.globalAlpha = 1.0;
  }

  private drawSlime(size: number, time: number) {
    this.ctx.fillStyle = '#4ade80';
    this.ctx.globalAlpha = 0.8;
    const squish = Math.sin(time/150) * 0.1;
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, (size/3) * (1+squish), (size/4) * (1-squish), 0, 0, Math.PI*2);
    this.ctx.fill();

    this.ctx.fillStyle = '#fff';
    this.ctx.beginPath();
    this.ctx.arc(-size/10, -size/12, 3, 0, Math.PI*2);
    this.ctx.arc(size/10, -size/12, 3, 0, Math.PI*2);
    this.ctx.fill();
    this.ctx.globalAlpha = 1.0;
  }

  private drawNinja(size: number, facing: Vector2) {
    this.ctx.fillStyle = '#18181b';
    this.ctx.beginPath();
    this.ctx.roundRect(-size/5, -size/4, size/2.5, size/2, 4); // Body/Head
    this.ctx.fill();

    this.ctx.fillStyle = '#ffdbac';
    this.ctx.fillRect(-size/6, -size/6, size/3, size/8); // Mask gap

    this.ctx.fillStyle = '#000';
    const fx = facing.x * 2;
    this.ctx.beginPath();
    this.ctx.arc(-size/16 + fx, -size/8, 1.5, 0, Math.PI*2);
    this.ctx.arc(size/16 + fx, -size/8, 1.5, 0, Math.PI*2);
    this.ctx.fill();

    this.ctx.fillStyle = '#ef4444';
    this.ctx.fillRect(-size/5, -size/5.5, size/2.5, 2); // Headband
    this.ctx.beginPath();
    this.ctx.moveTo(size/5, -size/5.5);
    this.ctx.lineTo(size/3, -size/8);
    this.ctx.lineTo(size/3, -size/16);
    this.ctx.fill();
  }

  private drawAlien(size: number, facing: Vector2, time: number) {
    this.ctx.fillStyle = '#a3e635';
    this.ctx.beginPath();
    this.ctx.ellipse(0, -size/8, size/4, size/3, 0, 0, Math.PI*2);
    this.ctx.fill();

    this.ctx.fillStyle = '#000';
    const fx = facing.x * 4;
    const fy = facing.y * 2;
    this.ctx.save();
    this.ctx.translate(fx, fy);
    this.ctx.beginPath();
    this.ctx.ellipse(-size/10, -size/6, size/12, size/6, Math.PI/6, 0, Math.PI*2);
    this.ctx.ellipse(size/10, -size/6, size/12, size/6, -Math.PI/6, 0, Math.PI*2);
    this.ctx.fill();
    this.ctx.restore();

    // Antenna
    const swing = Math.sin(time/200) * 0.2;
    this.ctx.strokeStyle = '#a3e635';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -size/3);
    this.ctx.lineTo(swing * 20, -size/2);
    this.ctx.stroke();
    this.ctx.fillStyle = '#a3e635';
    this.ctx.beginPath();
    this.ctx.arc(swing * 20, -size/2, 3, 0, Math.PI*2);
    this.ctx.fill();
  }

  private drawKnight(size: number, facing: Vector2) {
    this.ctx.fillStyle = '#94a3b8';
    this.ctx.fillRect(-size/4, -size/4, size/2, size/2); // Helmet

    this.ctx.fillStyle = '#475569';
    const fx = facing.x * 3;
    this.ctx.fillRect(-size/6 + fx, -size/8, size/3, size/16); // Slit

    this.ctx.fillStyle = '#ef4444'; // Plume
    this.ctx.beginPath();
    this.ctx.moveTo(0, -size/4);
    this.ctx.quadraticCurveTo(-size/4, -size/2, -size/2, -size/3);
    this.ctx.fill();
  }

  private drawRobotDog(size: number, facing: Vector2, time: number) {
    this.ctx.fillStyle = '#71717a';
    this.ctx.fillRect(-size/4, -size/8, size/2, size/4); // Body

    this.ctx.fillStyle = '#52525b';
    const fx = facing.x * 5;
    this.ctx.fillRect(-size/8 + fx, -size/3, size/3, size/4); // Head

    // Digital eyes
    this.ctx.fillStyle = '#22d3ee';
    this.ctx.fillRect(-size/16 + fx, -size/4, 2, 2);
    this.ctx.fillRect(size/8 + fx, -size/4, 2, 2);

    // Floppy ears
    const earSwing = Math.sin(time/250) * 0.1;
    this.ctx.fillStyle = '#3f3f46';
    this.ctx.save();
    this.ctx.translate(-size/8 + fx, -size/3);
    this.ctx.rotate(earSwing);
    this.ctx.fillRect(-size/8, 0, size/8, size/6);
    this.ctx.restore();

    // Tail
    this.ctx.strokeStyle = '#71717a';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(size/4, 0);
    this.ctx.lineTo(size/3 + Math.sin(time/100) * 5, -size/6);
    this.ctx.stroke();
  }

  private drawVampire(size: number, facing: Vector2) {
    // Cape
    this.ctx.fillStyle = '#7f1d1d';
    this.ctx.beginPath();
    this.ctx.moveTo(0, -size/6);
    this.ctx.lineTo(-size/3, size/3);
    this.ctx.lineTo(size/3, size/3);
    this.ctx.fill();

    this.ctx.fillStyle = '#fef2f2';
    this.ctx.beginPath();
    this.ctx.arc(0, -size/6, size/6, 0, Math.PI*2); // Face
    this.ctx.fill();

    this.ctx.fillStyle = '#000'; // Hair
    this.ctx.beginPath();
    this.ctx.arc(0, -size/6, size/6, Math.PI, Math.PI*2);
    this.ctx.lineTo(0, -size/6);
    this.ctx.fill();

    const fx = facing.x * 3;
    const fy = facing.y * 1;
    this.ctx.fillStyle = '#000'; // Eyes
    this.ctx.beginPath();
    this.ctx.arc(-size/16 + fx, -size/6 + fy, 1.2, 0, Math.PI*2);
    this.ctx.arc(size/16 + fx, -size/6 + fy, 1.2, 0, Math.PI*2);
    this.ctx.fill();

    this.ctx.fillStyle = '#fff'; // Fangs
    this.ctx.beginPath();
    this.ctx.moveTo(-size/20 + fx, -size/8 + fy);
    this.ctx.lineTo(-size/24 + fx, -size/12 + fy);
    this.ctx.lineTo(-size/32 + fx, -size/8 + fy);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.moveTo(size/20 + fx, -size/8 + fy);
    this.ctx.lineTo(size/24 + fx, -size/12 + fy);
    this.ctx.lineTo(size/32 + fx, -size/8 + fy);
    this.ctx.fill();
  }

  private drawWizard(size: number, facing: Vector2, time: number) {
    const fx = facing.x * 3;
    const fy = facing.y * 1;

    // Robe
    this.ctx.fillStyle = '#312e81';
    this.ctx.beginPath();
    this.ctx.moveTo(0, -size/8);
    this.ctx.lineTo(-size/3, size/3);
    this.ctx.lineTo(size/3, size/3);
    this.ctx.fill();

    // Hat
    this.ctx.fillStyle = '#312e81';
    this.ctx.beginPath();
    this.ctx.moveTo(-size/4, -size/4);
    this.ctx.lineTo(0, -size/2);
    this.ctx.lineTo(size/4, -size/4);
    this.ctx.fill();
    this.ctx.fillRect(-size/3, -size/4, size/1.5, size/20);

    // Stars on hat
    this.ctx.fillStyle = '#fbbf24';
    this.ctx.beginPath();
    this.ctx.arc(0, -size/2.5, 2, 0, Math.PI*2);
    this.ctx.fill();

    // Face
    this.ctx.fillStyle = '#ffdbac';
    this.ctx.beginPath();
    this.ctx.arc(0, -size/8, size/8, 0, Math.PI*2);
    this.ctx.fill();

    // Beard
    this.ctx.fillStyle = '#e2e8f0';
    this.ctx.beginPath();
    this.ctx.moveTo(-size/10, -size/8);
    this.ctx.lineTo(0, size/8);
    this.ctx.lineTo(size/10, -size/8);
    this.ctx.fill();

    // Eyes
    this.ctx.fillStyle = '#000';
    this.ctx.beginPath();
    this.ctx.arc(-size/20 + fx, -size/8 + fy, 1, 0, Math.PI*2);
    this.ctx.arc(size/20 + fx, -size/8 + fy, 1, 0, Math.PI*2);
    this.ctx.fill();
  }

  private drawAstronaut(size: number, facing: Vector2) {
    const fx = facing.x * 4;
    const fy = facing.y * 2;

    this.ctx.fillStyle = '#f8fafc';
    this.ctx.beginPath();
    this.ctx.roundRect(-size/4, -size/4, size/2, size/2, 6);
    this.ctx.fill();

    // Visor
    this.ctx.fillStyle = '#1e293b';
    this.ctx.beginPath();
    this.ctx.roundRect(-size/6 + fx, -size/6 + fy, size/3, size/4, 4);
    this.ctx.fill();

    // Glow on visor
    this.ctx.fillStyle = 'rgba(255,255,255,0.1)';
    this.ctx.fillRect(-size/8 + fx, -size/6 + fy, size/10, size/10);

    // Patch
    this.ctx.fillStyle = '#ef4444';
    this.ctx.beginPath();
    this.ctx.arc(-size/8, size/10, 2, 0, Math.PI*2);
    this.ctx.fill();
  }

  private drawZombie(size: number, facing: Vector2, isMoving: boolean, time: number) {
    const fx = facing.x * 2;
    const fy = facing.y * 1;
    const armWave = Math.sin(time / 200) * (size/10);

    this.ctx.fillStyle = '#3f6212'; // Rotten green
    this.ctx.beginPath();
    this.ctx.roundRect(-size/5, -size/4, size/2.5, size/2, 4);
    this.ctx.fill();

    // Arms reaching out
    this.ctx.strokeStyle = '#3f6212';
    this.ctx.lineWidth = size/10;
    this.ctx.lineCap = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(-size/10, 0);
    this.ctx.lineTo(-size/3, armWave);
    this.ctx.moveTo(size/10, 0);
    this.ctx.lineTo(size/3, -armWave);
    this.ctx.stroke();

    // One missing eye
    this.ctx.fillStyle = '#fee2e2';
    this.ctx.beginPath();
    this.ctx.arc(-size/10 + fx, -size/8 + fy, 2, 0, Math.PI*2);
    this.ctx.fill();
    this.ctx.fillStyle = '#ef4444';
    this.ctx.beginPath();
    this.ctx.arc(-size/10 + fx, -size/8 + fy, 0.5, 0, Math.PI*2);
    this.ctx.fill();

    // Open mouth
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(-size/20 + fx, fy, size/10, size/12);
  }

  private drawDragon(size: number, facing: Vector2, time: number) {
    const fx = facing.x * 3;
    const wingFlap = Math.sin(time/150) * (size/4);

    this.ctx.fillStyle = '#065f46'; // Dark green
    // Wings
    this.ctx.fillStyle = '#064e3b';
    this.ctx.beginPath();
    this.ctx.moveTo(-size/8, 0);
    this.ctx.lineTo(-size/2, -wingFlap);
    this.ctx.lineTo(-size/8, size/8);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.moveTo(size/8, 0);
    this.ctx.lineTo(size/2, -wingFlap);
    this.ctx.lineTo(size/8, size/8);
    this.ctx.fill();

    // Body
    this.ctx.fillStyle = '#065f46';
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, size/4, size/6, 0, 0, Math.PI*2);
    this.ctx.fill();

    // Head
    this.ctx.save();
    this.ctx.translate(fx, -size/8);
    this.ctx.beginPath();
    this.ctx.arc(0, 0, size/8, 0, Math.PI*2);
    this.ctx.fill();
    // Snout
    this.ctx.fillRect(-size/16, 0, size/8, size/8);
    // Horns
    this.ctx.fillStyle = '#ecfdf5';
    this.ctx.beginPath();
    this.ctx.moveTo(-size/16, -size/16);
    this.ctx.lineTo(-size/8, -size/4);
    this.ctx.lineTo(0, -size/16);
    this.ctx.fill();
    this.ctx.restore();
  }

  private drawPhoenix(size: number, time: number) {
    const wave = Math.sin(time / 100);
    const glow = this.ctx.createRadialGradient(0, 0, 0, 0, 0, size/2);
    glow.addColorStop(0, '#f97316');
    glow.addColorStop(1, 'transparent');

    this.ctx.fillStyle = glow;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, size/2, 0, Math.PI*2);
    this.ctx.fill();

    this.ctx.fillStyle = '#ef4444';
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, size/6, size/10, 0, 0, Math.PI*2);
    this.ctx.fill();

    // Wings
    this.ctx.fillStyle = '#f97316';
    this.ctx.beginPath();
    this.ctx.moveTo(-size/8, 0);
    this.ctx.quadraticCurveTo(-size/2, -size/2 * wave, -size/4, size/4);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.moveTo(size/8, 0);
    this.ctx.quadraticCurveTo(size/2, -size/2 * wave, size/4, size/4);
    this.ctx.fill();

    // Head
    this.ctx.fillStyle = '#ef4444';
    this.ctx.beginPath();
    this.ctx.arc(0, -size/8, size/12, 0, Math.PI*2);
    this.ctx.fill();
    this.ctx.fillStyle = '#fbbf24'; // Beak
    this.ctx.beginPath();
    this.ctx.moveTo(0, -size/8);
    this.ctx.lineTo(size/8, -size/10);
    this.ctx.lineTo(0, -size/12);
    this.ctx.fill();
  }

  private generateParticles(biome: BiomeType) {
    if (this.particles.length > 50 || Math.random() > 0.2) return;
    const x = Math.random() * this.width;
    const y = Math.random() * this.height;

    let vy = 0.5;
    let type: Particle['type'] = 'sparkle';

    if (biome === BiomeType.OCEAN) { vy = -0.3; type = 'bubble'; }
    else if (biome === BiomeType.FOREST) { vy = 0.4; type = 'leaf'; }
    else if (biome === BiomeType.ARCTIC) { vy = 0.8; type = 'snow'; }
    else if (biome === BiomeType.VOLCANIC) { vy = -0.2; type = 'ash'; }
    else if (biome === BiomeType.TOXIC) { vy = 0.1; type = 'spore'; }
    else if (biome === BiomeType.CELESTIAL) { vy = 0.05; type = 'star'; }
    else if (biome === BiomeType.AUTUMN) { vy = 0.6; type = 'leaf'; }

    this.particles.push({
        x, y: vy < 0 ? this.height : 0,
        vx: (Math.random()-0.5) * 0.3,
        vy: vy * (1 + Math.random()),
        life: 250, maxLife: 250,
        color: BIOME_COLORS[biome]?.particle || '#fff',
        size: 1 + Math.random() * 2,
        type
    });
  }

  private drawParticles() {
    this.ctx.save();
    for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        if (!p) continue;
        const alpha = (p.life / p.maxLife) * 0.5;

        // Draw particle glow
        const glow = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        glow.addColorStop(0, this.hexToRgba(p.color, alpha * 0.5));
        glow.addColorStop(1, 'transparent');
        this.ctx.fillStyle = glow;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw particle core
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = alpha;
        this.ctx.beginPath();
        if (p.type === 'snow') {
            // Snowflake shape
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalAlpha = alpha * 0.5;
            for (let j = 0; j < 6; j++) {
              const angle = j * Math.PI / 3;
              this.ctx.beginPath();
              this.ctx.moveTo(p.x, p.y);
              this.ctx.lineTo(p.x + Math.cos(angle) * p.size * 2, p.y + Math.sin(angle) * p.size * 2);
              this.ctx.strokeStyle = p.color;
              this.ctx.lineWidth = 0.5;
              this.ctx.stroke();
            }
        } else if (p.type === 'ash') {
            this.ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
        } else if (p.type === 'leaf') {
            // Leaf shape
            this.ctx.beginPath();
            this.ctx.ellipse(p.x, p.y, p.size * 1.5, p.size * 0.7, p.vx * 2, 0, Math.PI * 2);
            this.ctx.fill();
        } else if (p.type === 'star') {
            // Star twinkle
            const twinkle = 0.5 + Math.sin(Date.now() / 100 + i) * 0.5;
            this.ctx.globalAlpha = alpha * twinkle;
            this.ctx.arc(p.x, p.y, p.size * twinkle, 0, Math.PI * 2);
            this.ctx.fill();
        } else {
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    this.ctx.globalAlpha = 1.0;
    this.ctx.restore();
  }

  private drawAmbientLight(biome: BiomeType) {
    const glowColor = BIOME_COLORS[biome]?.text || '#ffffff';
    const pulseIntensity = 0.03 + Math.sin(this.ambientPulse) * 0.02;

    // Subtle pulsing ambient glow from center
    const ambientGlow = this.ctx.createRadialGradient(
      this.width / 2, this.height / 2, 0,
      this.width / 2, this.height / 2, this.height * 0.8
    );
    ambientGlow.addColorStop(0, this.hexToRgba(glowColor, pulseIntensity));
    ambientGlow.addColorStop(0.5, this.hexToRgba(glowColor, pulseIntensity * 0.3));
    ambientGlow.addColorStop(1, 'transparent');

    this.ctx.fillStyle = ambientGlow;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Add subtle corner glows for atmosphere
    const corners = [
      { x: 0, y: 0 },
      { x: this.width, y: 0 },
      { x: 0, y: this.height },
      { x: this.width, y: this.height }
    ];

    corners.forEach((corner, i) => {
      const cornerPulse = Math.sin(this.ambientPulse + i * Math.PI / 2) * 0.015;
      const cornerGlow = this.ctx.createRadialGradient(
        corner.x, corner.y, 0,
        corner.x, corner.y, this.height * 0.4
      );
      cornerGlow.addColorStop(0, this.hexToRgba(glowColor, 0.02 + cornerPulse));
      cornerGlow.addColorStop(1, 'transparent');
      this.ctx.fillStyle = cornerGlow;
      this.ctx.fillRect(0, 0, this.width, this.height);
    });
  }

  private drawVignette() {
      const g = this.ctx.createRadialGradient(this.width/2, this.height/2, this.height/2.5, this.width/2, this.height/2, this.height);
      g.addColorStop(0, 'rgba(0,0,0,0)');
      g.addColorStop(1, 'rgba(0,0,0,0.6)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(0, 0, this.width, this.height);
  }

  private drawBackground(biome: BiomeType) {
    const biomeData = BIOME_COLORS[biome];
    if (!biomeData) {
      this.ctx.fillStyle = '#050505';
      this.ctx.fillRect(0, 0, this.width, this.height);
      return;
    }

    // Create a subtle gradient background based on biome
    const baseColor = biomeData.ground[0] || '#050505';
    const gradient = this.ctx.createRadialGradient(
      this.width / 2, this.height / 2, 0,
      this.width / 2, this.height / 2, Math.max(this.width, this.height) * 0.7
    );

    // Darken the base color for background
    gradient.addColorStop(0, this.darkenColor(baseColor, 0.3));
    gradient.addColorStop(1, this.darkenColor(baseColor, 0.6));

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  private darkenColor(hex: string, factor: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${Math.floor(r * factor)}, ${Math.floor(g * factor)}, ${Math.floor(b * factor)})`;
  }

  private lightenColor(hex: string, factor: number): string {
    const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + Math.floor(255 * factor));
    const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + Math.floor(255 * factor));
    const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + Math.floor(255 * factor));
    return `rgb(${r}, ${g}, ${b})`;
  }
}
