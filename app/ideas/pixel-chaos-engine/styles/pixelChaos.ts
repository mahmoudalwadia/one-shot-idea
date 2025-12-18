import { StyleDefinition, StyleInstance, ParamsSchemaMap } from '../types';
import { RNG } from '../utils/rng';
import { PALETTES } from '../utils/math';

interface Scribble {
  points: Array<{x: number; y: number}>;
  color: string;
  width: number;
  offset: number;
}

interface Sparkle {
  x: number;
  y: number;
  phase: number;
}

const SCHEMA: ParamsSchemaMap = {
  palette: { type: 'select', label: 'Palette', default: 'Primary Chaos' as string, options: Object.keys(PALETTES) },
  clusterCount: { type: 'number', label: 'Clusters', default: 12 as number, min: 1, max: 25, step: 1 },
  clusterSize: { type: 'number', label: 'Cluster Size', default: 60 as number, min: 10, max: 200, step: 5 },
  pixelDensity: { type: 'number', label: 'Pixel Noise', default: 0.5 as number, min: 0, max: 1, step: 0.05 },
  scribbleDensity: { type: 'number', label: 'Scribbles', default: 0.5 as number, min: 0, max: 1, step: 0.05 },
  animationIntensity: { type: 'number', label: 'Anim Intensity', default: 0.5 as number, min: 0, max: 1, step: 0.05 },
};

export const PixelChaosStyle: StyleDefinition = {
  id: 'pixel-chaos',
  name: 'Pixel Chaos',
  description: 'Original chaotic glitch aesthetics with chunky clusters.',
  schema: SCHEMA,
  presets: {
    'Default': { clusterCount: 12, pixelDensity: 0.5, scribbleDensity: 0.5 },
    'Dense': { clusterCount: 20, pixelDensity: 0.9, scribbleDensity: 0.8 },
    'Minimal': { clusterCount: 5, pixelDensity: 0.1, scribbleDensity: 0.2 },
  },
  create: (seed, params, w, h) => new PixelChaosInstance(seed, params, w, h)
};

class PixelChaosInstance implements StyleInstance {
  rng: RNG;
  scribbles: Scribble[] = [];
  sparkles: Sparkle[] = [];
  params: Record<string, string | number | boolean>;
  w: number;
  h: number;
  grid = 12;

  constructor(seed: string, params: Record<string, string | number | boolean>, w: number, h: number) {
    this.rng = new RNG(seed);
    this.params = params;
    this.w = w;
    this.h = h;
  }

  renderStatic(ctx: CanvasRenderingContext2D) {
    const p = this.params as Record<string, string | number | boolean> & {
      palette: string;
      clusterCount: number;
      clusterSize: number;
      pixelDensity: number;
      scribbleDensity: number;
      animationIntensity: number;
    };
    const palette = PALETTES[p.palette];

    // BG
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, this.w, this.h);

    // Dust
    for (let i = 0; i < 2000; i++) {
      ctx.fillStyle = `rgba(255,255,255,${this.rng.range(0.01, 0.05)})`;
      ctx.fillRect(this.rng.rangeInt(0, this.w), this.rng.rangeInt(0, this.h), 1, 1);
    }

    // Clusters
    for (let i = 0; i < p.clusterCount; i++) {
      const cx = this.rng.rangeInt(2, (this.w / this.grid) - 2);
      const cy = this.rng.rangeInt(2, (this.h / this.grid) - 2);
      const color = this.rng.pick(palette) as string;
      const cells: Array<{x: number; y: number}> = [{x: cx, y: cy}];
      const size = this.rng.rangeInt(p.clusterSize / 2, p.clusterSize * 1.5);

      for (let j = 0; j < size; j++) {
        const base = this.rng.pick(cells) as {x: number; y: number};
        const dir = this.rng.rangeInt(0, 4);
        let nx = base.x, ny = base.y;
        if (dir === 0) nx++; else if (dir === 1) nx--; else if (dir === 2) ny++; else ny--;

        if (nx > 0 && nx < this.w/this.grid && ny > 0 && ny < this.h/this.grid) {
          if (!cells.some(c => (c as {x: number; y: number}).x === nx && (c as {x: number; y: number}).y === ny)) {
            if (this.rng.chance(0.9)) cells.push({x: nx, y: ny});
          }
        }
      }

      ctx.fillStyle = color;
      cells.forEach(c => {
        const cell = c as {x: number; y: number};
        ctx.fillRect(cell.x * this.grid, cell.y * this.grid, this.grid, this.grid);
      });
    }

    // Generate Scribbles
    this.scribbles = [];
    const numScribbles = 50 + (p.scribbleDensity * 300);
    for (let i = 0; i < numScribbles; i++) {
      const points: Array<{x: number; y: number}> = [];
      let sx = this.rng.range(0, this.w);
      let sy = this.rng.range(0, this.h);
      points.push({x: sx, y: sy});
      let angle = this.rng.range(0, Math.PI * 2);
      const len = this.rng.rangeInt(5, 50);
      for(let j=0; j<len; j++) {
        angle += this.rng.range(-1, 1);
        sx += Math.cos(angle) * 10;
        sy += Math.sin(angle) * 10;
        points.push({x: sx, y: sy});
      }
      this.scribbles.push({
        points,
        color: this.rng.chance(0.3) ? '#FFCC00' : '#FFFFFF',
        width: this.rng.range(1, 3),
        offset: this.rng.range(0, Math.PI * 2)
      });
    }

    // Sparkles
    this.sparkles = [];
    for(let i=0; i<100; i++) {
      this.sparkles.push({
        x: this.rng.rangeInt(0, this.w),
        y: this.rng.rangeInt(0, this.h),
        phase: this.rng.range(0, Math.PI * 2)
      });
    }
  }

  renderFrame(ctx: CanvasRenderingContext2D, t: number, staticCanvas: HTMLCanvasElement) {
    // Draw static BG
    ctx.drawImage(staticCanvas, 0, 0);

    const normT = (t % 6000) / 6000;
    const anim = (this.params as { animationIntensity: number }).animationIntensity;

    // Draw scribbles
    ctx.lineCap = 'round';
    this.scribbles.forEach(s => {
      const scribble = s as {points: Array<{x: number; y: number}>; color: string; width: number; offset: number};
      ctx.beginPath();
      ctx.strokeStyle = scribble.color;
      ctx.lineWidth = scribble.width;
      const shiftX = Math.sin(normT * Math.PI * 2 + scribble.offset) * (10 * anim);
      const shiftY = Math.cos(normT * Math.PI * 2 + scribble.offset * 0.5) * (5 * anim);

      if (scribble.points.length > 0) {
        ctx.moveTo(scribble.points[0].x + shiftX, scribble.points[0].y + shiftY);
        for (let i = 1; i < scribble.points.length; i++) {
          ctx.lineTo(scribble.points[i].x + shiftX, scribble.points[i].y + shiftY);
        }
      }
      ctx.stroke();
    });

    // Sparkles
    ctx.fillStyle = '#FFF';
    this.sparkles.forEach(s => {
      const sparkle = s as {x: number; y: number; phase: number};
      const alpha = 0.5 + 0.5 * Math.sin(normT * Math.PI * 8 + sparkle.phase);
      if (alpha > 0.8) ctx.fillRect(sparkle.x, sparkle.y, 4, 4);
    });
  }
}
