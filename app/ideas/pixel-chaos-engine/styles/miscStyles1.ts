import { StyleDefinition, StyleInstance, ParamsSchemaMap } from '../types';
import { RNG } from '../utils/rng';
import { PALETTES, Noise } from '../utils/math';

// --- STYLE 2: FLOW FIELD RIBBONS ---
export const FlowFieldStyle: StyleDefinition = {
  id: 'flow-field', name: 'Flow Field Ribbons', description: 'Smooth, drifting ribbons following a noise field.',
  schema: {
    palette: { type: 'select' as const, label: 'Palette', default: 'Cool' as string, options: Object.keys(PALETTES) },
    density: { type: 'number' as const, label: 'Density', default: 500 as number, min: 100, max: 2000, step: 100 },
    noiseScale: { type: 'number' as const, label: 'Turbulence', default: 0.005 as number, min: 0.001, max: 0.02, step: 0.001 },
    speed: { type: 'number' as const, label: 'Flow Speed', default: 1 as number, min: 0, max: 5, step: 0.5 },
  } as ParamsSchemaMap,
  presets: { 'Default': {density: 500}, 'Storm': {density: 1500, noiseScale: 0.015, speed: 3}, 'Calm': {density: 200, speed: 0.5} },
  create: (s, p, w, h) => new FlowFieldInstance(s, p, w, h)
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  color?: string;
  size?: number;
  len?: number;
}

class FlowFieldInstance implements StyleInstance {
  rng: RNG; noise: Noise; particles: Particle[] = [];
  constructor(private seed: string, private params: Record<string, string | number | boolean>, private w: number, private h: number) {
    this.rng = new RNG(seed);
    this.noise = new Noise(this.rng);
  }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#111'; ctx.fillRect(0,0,this.w,this.h);
    const palette = PALETTES[this.params.palette as string];
    // Init particles
    this.particles = [];
    for(let i=0; i<(this.params.density as number); i++) {
      this.particles.push({
        x: this.rng.range(0, this.w),
        y: this.rng.range(0, this.h),
        vx: 0,
        vy: 0,
        age: 0,
        color: this.rng.pick(palette),
        size: this.rng.range(1, 3),
        len: this.rng.range(10, 100)
      });
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, staticCanvas: HTMLCanvasElement) {
    ctx.drawImage(staticCanvas, 0, 0); // Clear with BG
    // Fade trail effect
    // ctx.fillStyle = 'rgba(0,0,0,0.1)'; ctx.fillRect(0,0,this.w,this.h); // Optional

    const scale = this.params.noiseScale as number;
    const timeOffset = t * 0.0005 * (this.params.speed as number);

    this.particles.forEach(p => {
      const particle = p;
      ctx.beginPath();
      ctx.strokeStyle = particle.color || '#FFF';
      ctx.lineWidth = particle.size || 1;
      ctx.moveTo(particle.x, particle.y);

      let cx = particle.x;
      let cy = particle.y;

      // Draw tail based on noise
      for(let i=0; i<20; i++) {
        const angle = this.noise.perlin2(cx * scale, cy * scale + timeOffset) * Math.PI * 4;
        cx += Math.cos(angle) * 5;
        cy += Math.sin(angle) * 5;
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();
    });
  }
}

// --- STYLE 3: VORONOI STAINED GLASS ---
export const VoronoiStyle: StyleDefinition = {
  id: 'voronoi', name: 'Voronoi Stained Glass', description: 'Cellular regions with thick borders and shimmer.',
  schema: {
    palette: { type: 'select' as const, label: 'Palette', default: 'Earth' as string, options: Object.keys(PALETTES) },
    cells: { type: 'number' as const, label: 'Cell Count', default: 50 as number, min: 10, max: 200, step: 10 },
    borderWidth: { type: 'number' as const, label: 'Border', default: 4 as number, min: 0, max: 10, step: 1 },
  } as ParamsSchemaMap,
  presets: { 'Large': {cells: 20}, 'Mosaic': {cells: 150} },
  create: (s, p, w, h) => new VoronoiInstance(s, p, w, h)
};

class VoronoiInstance implements StyleInstance {
  rng: RNG; points: unknown[] = [];
  constructor(private seed: string, private params: Record<string, string | number | boolean>, private w: number, private h: number) {
    this.rng = new RNG(seed);
  }
  renderStatic(ctx: CanvasRenderingContext2D) {
    const palette = PALETTES[this.params.palette as string];
    this.points = [];
    for(let i=0; i<(this.params.cells as number); i++) {
      this.points.push({
        x: this.rng.range(0, this.w),
        y: this.rng.range(0, this.h),
        color: this.rng.pick(palette)
      });
    }

    // Brute force pixel fill optimization
    // Increased scale from 4 to 6 to significantly reduce operations (4x4=16 vs 6x6=36 pixels per op)
    const scale = 6;
    const sw = Math.ceil(this.w/scale);
    const sh = Math.ceil(this.h/scale);

    // Draw colors
    for(let y=0; y<sh; y++) {
      for(let x=0; x<sw; x++) {
        let minDist = Infinity;
        let closest = 0;
        const rx = x*scale, ry = y*scale;

        // Simple closest point search
        for(let i=0; i<this.points.length; i++) {
          const p = this.points[i] as {x: number; y: number; color: string};
          const d = (rx - p.x)**2 + (ry - p.y)**2;
          if(d < minDist) { minDist = d; closest = i; }
        }
        ctx.fillStyle = (this.points[closest] as {x: number; y: number; color: string}).color;
        // Draw slightly larger rect to avoid subpixel gaps
        ctx.fillRect(rx, ry, scale, scale);
      }
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, staticCanvas: HTMLCanvasElement) {
    ctx.drawImage(staticCanvas, 0, 0);

    // Draw borders dynamically
    ctx.lineWidth = this.params.borderWidth as number;
    ctx.strokeStyle = '#000';
    if((this.params.borderWidth as number) > 0) {
      const phase = t * 0.002;
      this.points.forEach((p, i) => {
         const point = p as {x: number; y: number; color: string};
         const alpha = 0.5 + 0.5 * Math.sin(phase + i);
         ctx.fillStyle = `rgba(255,255,255,${alpha * 0.3})`;
         ctx.beginPath();
         ctx.arc(point.x, point.y, 5, 0, Math.PI*2);
         ctx.fill();
      });
    }
  }
}

// --- STYLE 4: CRT GLITCH POSTER ---
export const CRTStyle: StyleDefinition = {
  id: 'crt-glitch', name: 'CRT Glitch Poster', description: 'Scanlines, chromatic aberration, and tearing.',
  schema: {
    palette: { type: 'select' as const, label: 'Base Palette', default: 'Darkwave' as string, options: Object.keys(PALETTES) },
    glitchiness: { type: 'number' as const, label: 'Glitch Amount', default: 0.5 as number, min: 0, max: 1, step: 0.1 },
    scanlines: { type: 'boolean' as const, label: 'Scanlines', default: true as boolean },
  } as ParamsSchemaMap,
  presets: { 'Clean': {glitchiness: 0.1}, 'Fried': {glitchiness: 1.0} },
  create: (s, p, w, h) => new CRTInstance(s, p, w, h)
};

class CRTInstance implements StyleInstance {
  rng: RNG;
  constructor(private seed: string, private params: Record<string, string | number | boolean>, private w: number, private h: number) {
    this.rng = new RNG(seed);
  }
  renderStatic(ctx: CanvasRenderingContext2D) {
    const palette = PALETTES[this.params.palette as string];
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,this.w,this.h);

    // Draw a base abstract shape composition
    for(let i=0; i<20; i++) {
      ctx.fillStyle = this.rng.pick(palette);
      const x = this.rng.range(0, this.w);
      const y = this.rng.range(0, this.h);
      const w = this.rng.range(50, 400);
      const h = this.rng.range(50, 400);
      ctx.fillRect(x - w/2, y - h/2, w, h);

      ctx.strokeStyle = '#FFF';
      ctx.lineWidth = 2;
      if(this.rng.chance(0.5)) ctx.strokeRect(x - w/2, y - h/2, w, h);
    }

    // Add text
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 120px monospace';
    ctx.textAlign = 'center';
    ctx.fillText("SIGNAL", this.w/2, this.w/2);
    ctx.font = 'bold 40px monospace';
    ctx.fillText("LOST", this.w/2, this.w/2 + 60);
  }

  renderFrame(ctx: CanvasRenderingContext2D, t: number, staticCanvas: HTMLCanvasElement) {
    const g = this.params.glitchiness as number;

    // Chromatic Aberration
    const shift = 5 * g * Math.sin(t * 0.01);

    ctx.globalCompositeOperation = 'screen';

    // Red channel
    ctx.drawImage(staticCanvas, -shift, 0);
    ctx.fillStyle = 'rgba(0, 255, 255, 1)'; // Cyan filter removes red? No, need to mask.
    // Simpler: Draw image 3 times with tints

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,this.w,this.h);

    ctx.globalCompositeOperation = 'lighten';

    // R
    ctx.save();
    ctx.translate(shift, 0);
    ctx.drawImage(staticCanvas, 0, 0);
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = '#F00'; ctx.fillRect(0,0,this.w,this.h);
    ctx.restore();

    // G
    ctx.save();
    ctx.drawImage(staticCanvas, 0, 0);
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = '#0F0'; ctx.fillRect(0,0,this.w,this.h);
    ctx.restore();

    // B
    ctx.save();
    ctx.translate(-shift, 0);
    ctx.drawImage(staticCanvas, 0, 0);
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = '#00F'; ctx.fillRect(0,0,this.w,this.h);
    ctx.restore();

    ctx.globalCompositeOperation = 'source-over';

    // Scanlines
    if(this.params.scanlines as boolean) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      for(let y=0; y<this.h; y+=4) {
        ctx.fillRect(0, y, this.w, 2);
      }
    }

    // Tearing
    if(Math.random() < 0.1 * g) {
      const y = Math.random() * this.h;
      const h = Math.random() * 50;
      const x = (Math.random() - 0.5) * 100;
      ctx.drawImage(staticCanvas, 0, y, this.w, h, x, y, this.w, h);
    }
  }
}

// --- STYLE 5: NEON WIREFRAME CITY ---
export const NeonCityStyle: StyleDefinition = {
  id: 'neon-city', name: 'Neon Wireframe City', description: 'Isometric grid with glowing edges.',
  schema: {
    palette: { type: 'select' as const, label: 'Theme', default: 'Neon' as string, options: Object.keys(PALETTES) },
    density: { type: 'number' as const, label: 'Building Density', default: 0.5 as number, min: 0.1, max: 1 },
    speed: { type: 'number' as const, label: 'Scroll Speed', default: 1 as number, min: 0, max: 3 }
  } as ParamsSchemaMap,
  presets: { 'Cyber': {density: 0.8}, 'Void': {density: 0.2} },
  create: (s, p, w, h) => new NeonCityInstance(s, p, w, h)
};

class NeonCityInstance implements StyleInstance {
  rng: RNG; buildings: unknown[] = [];
  constructor(private seed: string, private params: Record<string, string | number | boolean>, private w: number, private h: number) {
    this.rng = new RNG(seed);
  }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#050011'; ctx.fillRect(0,0,this.w,this.h);
    const palette = PALETTES[this.params.palette as string];

      // Iso grid logic
      const tileW = 60;
      const tileH = 30;

      this.buildings = [];

      for(let y = 0; y < (this.h/tileH) * 2; y++) {
        for(let x = 0; x < (this.w/tileW); x++) {
          const isoX = (x - y) * tileW + this.w/2;
          const isoY = (x + y) * tileH * 0.5; // Flattened

          if (this.rng.chance(this.params.density as number)) {
          const h = this.rng.range(20, 150);
          this.buildings.push({
            x: isoX, y: isoY, h, w: tileW, d: tileH,
            color: this.rng.pick(palette)
          });
        }
      }
    }
    // Sort by Y for painter's algorithm
    this.buildings.sort((a,b) => (a as {x: number; y: number; h: number; w: number; d: number; color: string}).y - (b as {x: number; y: number; h: number; w: number; d: number; color: string}).y);
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _staticCanvas: HTMLCanvasElement) {
    // Re-draw background
    ctx.fillStyle = '#050011'; ctx.fillRect(0,0,this.w,this.h);

      // Scroll effect
      const offset = (t * 0.1 * (this.params.speed as number)) % 200;

    ctx.lineWidth = 2;
    this.buildings.forEach(b => {
      const building = b as {x: number; y: number; h: number; w: number; d: number; color: string};
      const y = building.y + offset;
      if (y > this.h + 100) return;

      // Draw Cube
      const topY = y - building.h;

      ctx.strokeStyle = building.color;
      ctx.fillStyle = building.color + '22'; // low alpha fill

      // Front Face
      ctx.beginPath();
      ctx.moveTo(building.x, y);
      ctx.lineTo(building.x + building.w, y + building.d);
      ctx.lineTo(building.x + building.w, topY + building.d);
      ctx.lineTo(building.x, topY);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      // Side Face
      ctx.beginPath();
      ctx.moveTo(building.x, y);
      ctx.lineTo(building.x - building.w, y + building.d);
      ctx.lineTo(building.x - building.w, topY + building.d);
      ctx.lineTo(building.x, topY);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      // Top Face
      ctx.fillStyle = building.color + '44';
      ctx.beginPath();
      ctx.moveTo(building.x, topY);
      ctx.lineTo(building.x + building.w, topY + building.d);
      ctx.lineTo(building.x, topY + building.d * 2);
      ctx.lineTo(building.x - building.w, topY + building.d);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    });
  }
}
