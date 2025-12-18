import { StyleDefinition, StyleInstance } from '../types';
import { RNG } from '../utils/rng';
import { PALETTES, Noise, map } from '../utils/math';

// --- STYLE 6: INK WASH ---
export const InkWashStyle: StyleDefinition = {
  id: 'ink-wash', name: 'Ink Wash & Splatter', description: 'Watercolor blotches with organic bleed.',
  schema: {
    palette: { type: 'select', label: 'Palette', default: 'Earth', options: Object.keys(PALETTES) },
    spread: { type: 'number', label: 'Spread', default: 50, min: 10, max: 100 },
  },
  presets: { 'Default': {}, 'Heavy': {spread: 90} },
  create: (s, p, w, h) => new InkWashInstance(s, p, w, h)
};

class InkWashInstance implements StyleInstance {
  rng: RNG; blots: {x: number; y: number; r: number; color: string; poly: unknown[]}[] = [];
  constructor(private seed: string, private params: Record<string, string | number | boolean>, private w: number, private h: number) {
    this.rng = new RNG(seed);
  }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#f5f5f0'; ctx.fillRect(0,0,this.w,this.h); // Paper
    const palette = PALETTES[String(this.params.palette)];

    this.blots = [];
    for(let i=0; i<30; i++) {
      this.blots.push({
        x: this.rng.range(0, this.w),
        y: this.rng.range(0, this.h),
        r: this.rng.range(20, 150),
        color: this.rng.pick(palette),
        poly: []
      });
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, staticCanvas: HTMLCanvasElement) {
    // Use low alpha stacking for "bleed"
    ctx.drawImage(staticCanvas, 0, 0);

    const pulse = Math.sin(t * 0.001) * 5;

    this.blots.forEach((b: {x: number; y: number; r: number; color: string; poly: unknown[]}, i: number) => {
      ctx.fillStyle = b.color;
      ctx.globalAlpha = 0.05;

      // Draw organic layered circles
      for(let j=0; j<10; j++) {
        const radius = b.r + pulse + (j * Math.sin(t * 0.002 + i) * 10);
        ctx.beginPath();
        ctx.arc(b.x + Math.sin(j)*5, b.y + Math.cos(j)*5, Math.abs(radius), 0, Math.PI*2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
    });
  }
}

// --- STYLE 7: GEOMETRIC BAUHAUS ---
export const BauhausStyle: StyleDefinition = {
  id: 'bauhaus', name: 'Geometric Bauhaus', description: 'Clean primitive shapes and kinetic motion.',
  schema: {
    palette: { type: 'select', label: 'Palette', default: 'Primary Chaos', options: Object.keys(PALETTES) },
    complexity: { type: 'number', label: 'Shapes', default: 15, min: 5, max: 40 },
  },
  presets: { 'Simple': {complexity: 8}, 'Complex': {complexity: 30} },
  create: (s, p, w, h) => new BauhausInstance(s, p, w, h)
};

class BauhausInstance implements StyleInstance {
  rng: RNG; shapes: {type: string; x: number; y: number; size: number; color: string; rot: number; speed: number}[] = [];
  constructor(private seed: string, private params: Record<string, string | number | boolean>, private w: number, private h: number) {
    this.rng = new RNG(seed);
  }
  renderStatic(ctx: CanvasRenderingContext2D) {
     const palette = PALETTES[String(this.params.palette)];
     ctx.fillStyle = '#EAEAEA'; ctx.fillRect(0,0,this.w,this.h); // Off-white

     this.shapes = [];
     const complexity = this.params.complexity as number;
     for(let i=0; i<complexity; i++) {
       const type = this.rng.pick(['rect', 'circle', 'tri', 'arc']);
       this.shapes.push({
         type,
         x: this.rng.range(0, this.w),
         y: this.rng.range(0, this.h),
         size: this.rng.range(50, 300),
         color: this.rng.pick(palette),
         rot: this.rng.range(0, Math.PI),
         speed: this.rng.range(-0.001, 0.001)
       });
     }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, staticCanvas: HTMLCanvasElement) {
    ctx.drawImage(staticCanvas, 0, 0); // Clear with BG logic (actually need to redraw BG color)
    ctx.fillStyle = '#EAEAEA'; ctx.fillRect(0,0,this.w,this.h);

    this.shapes.forEach((s: {type: string; x: number; y: number; size: number; color: string; rot: number; speed: number}) => {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot + t * s.speed);
      ctx.fillStyle = s.color;

      if(s.type === 'rect') {
        ctx.fillRect(-s.size/2, -s.size/2, s.size, s.size);
      } else if (s.type === 'circle') {
        ctx.beginPath(); ctx.arc(0,0, s.size/2, 0, Math.PI*2); ctx.fill();
      } else if (s.type === 'tri') {
        ctx.beginPath(); ctx.moveTo(0, -s.size/2); ctx.lineTo(s.size/2, s.size/2); ctx.lineTo(-s.size/2, s.size/2); ctx.fill();
      } else if (s.type === 'arc') {
        ctx.beginPath(); ctx.arc(0,0, s.size/2, 0, Math.PI); ctx.fill();
      }

      // Connective lines
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(1000, 0); ctx.stroke();

      ctx.restore();
    });
  }
}

// --- STYLE 8: TOPOGRAPHIC ---
export const TopoStyle: StyleDefinition = {
  id: 'topo', name: 'Topographic Contours', description: 'Animated heightmap contour lines.',
  schema: {
    lines: { type: 'number', label: 'Lines', default: 20, min: 10, max: 50 },
  },
  presets: { 'Default': {} },
  create: (s, p, w, h) => new TopoInstance(s, p, w, h)
};

class TopoInstance implements StyleInstance {
  rng: RNG; noise: Noise;
  constructor(private seed: string, private params: Record<string, string | number | boolean>, private w: number, private h: number) {
    this.rng = new RNG(seed);
    this.noise = new Noise(this.rng);
  }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _staticCanvas: HTMLCanvasElement) {
    ctx.fillStyle = '#1a1a1a'; ctx.fillRect(0,0,this.w,this.h);

    const _step = 20;
    const timeZ = t * 0.0002;

    // Optimization: Don't march every pixel. March grid.
    // For true contours we need marching squares, but simplistic approach:
    // Draw lines where noise value is close to threshold.

    ctx.strokeStyle = '#FFF';
    ctx.lineWidth = 1;

    // Efficient Hack: Draw many horizontal lines deformed by noise (Joy Division style)
    const lines = this.params.lines as number;
    for(let y = 50; y < this.h - 50; y+=this.h/lines) {
      ctx.beginPath();
      for(let x = 0; x < this.w; x+=10) {
        const n = this.noise.perlin2(x * 0.005, y * 0.005 + timeZ);
        const yOff = map(n, -1, 1, -100, 100);
        ctx.lineTo(x, y + yOff);
      }
      ctx.stroke();
    }
  }
}

// --- STYLE 9: CONSTELLATIONS ---
export const ConstellationStyle: StyleDefinition = {
  id: 'constellations', name: 'Particle Constellations', description: 'Connected nodes with proximity lines.',
  schema: {
    palette: { type: 'select', label: 'Palette', default: 'Cool', options: Object.keys(PALETTES) },
    count: { type: 'number', label: 'Stars', default: 100, min: 50, max: 300 },
  },
  presets: { 'Default': {} },
  create: (s, p, w, h) => new ConstellationInstance(s, p, w, h)
};

class ConstellationInstance implements StyleInstance {
  rng: RNG; stars: unknown[] = [];
  constructor(private seed: string, private params: Record<string, string | number | boolean>, private w: number, private h: number) {
    this.rng = new RNG(seed);
  }
  renderStatic(ctx: CanvasRenderingContext2D) {
    const palette = PALETTES[String(this.params.palette)];
    ctx.fillStyle = '#050510'; ctx.fillRect(0,0,this.w,this.h);
    this.stars = [];
    const count = this.params.count as number;
    for(let i=0; i<count; i++) {
      this.stars.push({
        x: this.rng.range(0, this.w),
        y: this.rng.range(0, this.h),
        vx: this.rng.range(-0.5, 0.5),
        vy: this.rng.range(-0.5, 0.5),
        color: this.rng.pick(palette)
      });
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, staticCanvas: HTMLCanvasElement) {
    ctx.drawImage(staticCanvas, 0, 0); // BG

    // Update & Draw
    ctx.lineWidth = 0.5;

    for(let i=0; i<this.stars.length; i++) {
      const s1 = this.stars[i] as {x: number; y: number; vx: number; vy: number; color: string};
      // Move
      s1.x += s1.vx; s1.y += s1.vy;
      // Wrap
      if(s1.x<0) s1.x=this.w; if(s1.x>this.w) s1.x=0;
      if(s1.y<0) s1.y=this.h; if(s1.y>this.h) s1.y=0;

      ctx.fillStyle = s1.color;
      ctx.fillRect(s1.x, s1.y, 2, 2);

      // Connect
      for(let j=i+1; j<this.stars.length; j++) {
        const s2 = this.stars[j] as {x: number; y: number; vx: number; vy: number; color: string};
        const dx = s1.x - s2.x;
        const dy = s1.y - s2.y;
        const dist = dx*dx + dy*dy;
        if(dist < 10000) { // < 100px
          const alpha = 1 - (dist / 10000);
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.stroke();
        }
      }
    }
  }
}
