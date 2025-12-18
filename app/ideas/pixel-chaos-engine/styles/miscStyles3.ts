import { StyleDefinition, StyleInstance } from '../types';
import { RNG } from '../utils/rng';
import { PALETTES } from '../utils/math';

// --- STYLE 10: MOSAIC TILES ---
export const MosaicStyle: StyleDefinition = {
  id: 'mosaic', name: 'Mosaic Tiles', description: 'Grid-based patterns with dynamic swapping.',
  schema: {
    palette: { type: 'select', label: 'Palette', default: 'Warm', options: Object.keys(PALETTES) },
    tileSize: { type: 'number', label: 'Size', default: 40, min: 20, max: 100, step: 10 },
  },
  presets: { 'Small': {tileSize: 20}, 'Big': {tileSize: 80} },
  create: (s, p, w, h) => new MosaicInstance(s, p, w, h)
};

class MosaicInstance implements StyleInstance {
  rng: RNG; tiles: {x: number; y: number; w: number; h: number; color: string; type: number}[] = []; cols: number = 0; rows: number = 0;
  constructor(private seed: string, private params: Record<string, string | number | boolean>, private w: number, private h: number) {
    this.rng = new RNG(seed);
  }
  renderStatic(_ctx: CanvasRenderingContext2D) {
    const palette = PALETTES[String(this.params.palette)];
    const ts = this.params.tileSize as number;
    this.cols = Math.ceil(this.w / ts);
    this.rows = Math.ceil(this.h / ts);
    this.tiles = [];

    for(let y=0; y<this.rows; y++) {
      for(let x=0; x<this.cols; x++) {
        this.tiles.push({
          x: x * ts, y: y * ts, w: ts, h: ts,
          color: this.rng.pick(palette),
          type: this.rng.rangeInt(0, 3) // 0: solid, 1: circle, 2: tri
        });
      }
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, _t: number, _staticCanvas: HTMLCanvasElement) {
     // Redraw all (cheap enough for grid)
     ctx.fillStyle = '#000'; ctx.fillRect(0,0,this.w,this.h);

     // Random swap occasionally
     if (Math.random() < 0.1) {
       const i = Math.floor(Math.random() * this.tiles.length);
       this.tiles[i].type = Math.floor(Math.random() * 3);
     }

     this.tiles.forEach((tile: {x: number; y: number; w: number; h: number; color: string; type: number}) => {
       ctx.fillStyle = tile.color;
       if (tile.type === 0) {
         ctx.fillRect(tile.x + 2, tile.y + 2, tile.w - 4, tile.h - 4);
       } else if (tile.type === 1) {
         ctx.beginPath();
         ctx.arc(tile.x + tile.w/2, tile.y + tile.h/2, tile.w/2 - 4, 0, Math.PI*2);
         ctx.fill();
       } else {
         ctx.beginPath();
         ctx.moveTo(tile.x + tile.w/2, tile.y + 2);
         ctx.lineTo(tile.x + tile.w - 2, tile.y + tile.h - 2);
         ctx.lineTo(tile.x + 2, tile.y + tile.h - 2);
         ctx.fill();
       }
     });
  }
}

// --- STYLE 11: PAPER CUT COLLAGE ---
export const PaperCutStyle: StyleDefinition = {
  id: 'paper-cut', name: 'Paper Cut Collage', description: 'Layered irregular shapes with drop shadows.',
  schema: {
    palette: { type: 'select', label: 'Palette', default: 'Pastel', options: Object.keys(PALETTES) },
    layers: { type: 'number', label: 'Layers', default: 5, min: 3, max: 10 },
  },
  presets: { 'Default': {} },
  create: (s, p, w, h) => new PaperCutInstance(s, p, w, h)
};

class PaperCutInstance implements StyleInstance {
  rng: RNG; shapes: {points: {x: number; y: number}[]; color: string}[] = [];
  constructor(private seed: string, private params: Record<string, string | number | boolean>, private w: number, private h: number) {
    this.rng = new RNG(seed);
  }
  renderStatic(ctx: CanvasRenderingContext2D) {
    const palette = PALETTES[String(this.params.palette)];
    ctx.fillStyle = '#FFF'; ctx.fillRect(0,0,this.w,this.h);

    this.shapes = [];
    const layers = this.params.layers as number;
    for(let i=0; i<layers; i++) {
      const points = [];
      const cx = this.w/2;
      const cy = this.h/2;
      const r = this.rng.range(100, 500);

      for(let a=0; a<Math.PI*2; a+=0.5) {
        const rOff = r + this.rng.range(-50, 50);
        points.push({
          x: cx + Math.cos(a) * rOff + this.rng.range(-100, 100),
          y: cy + Math.sin(a) * rOff + this.rng.range(-100, 100)
        });
      }
      this.shapes.push({ points, color: this.rng.pick(palette) });
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _staticCanvas: HTMLCanvasElement) {
    ctx.fillStyle = '#FFF'; ctx.fillRect(0,0,this.w,this.h);

    const sway = Math.sin(t * 0.001) * 10;

    this.shapes.forEach((shape: {points: {x: number; y: number}[]; color: string}, i: number) => {
      ctx.save();
      ctx.translate(sway * (i+1), 0);

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      shape.points.forEach((p: {x: number; y: number}, idx:number) => {
        if(idx===0) ctx.moveTo(p.x+10, p.y+10); else ctx.lineTo(p.x+10, p.y+10);
      });
      ctx.closePath();
      ctx.fill();

      // Shape
      ctx.fillStyle = shape.color;
      ctx.beginPath();
      shape.points.forEach((p: {x: number; y: number}, idx:number) => {
        if(idx===0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    });
  }
}

// --- STYLE 12: MINIMAL MONOLITH ---
export const MinimalStyle: StyleDefinition = {
  id: 'minimal', name: 'Minimal Monolith', description: 'Bold singular forms and negative space.',
  schema: {
    palette: { type: 'select', label: 'Palette', default: 'Mono+Accent', options: Object.keys(PALETTES) },
  },
  presets: { 'Default': {} },
  create: (s, p, w, h) => new MinimalInstance(s, p, w, h)
};

class MinimalInstance implements StyleInstance {
  rng: RNG;
  constructor(private seed: string, private params: Record<string, string | number | boolean>, private w: number, private h: number) {
    this.rng = new RNG(seed);
  }
  renderStatic(ctx: CanvasRenderingContext2D) {
    const palette = PALETTES[String(this.params.palette)];
    ctx.fillStyle = palette[0]; // BG
    ctx.fillRect(0,0,this.w,this.h);

    // Draw Monolith
    ctx.fillStyle = palette[palette.length-1]; // Accent
    const w = this.rng.range(100, 300);
    const h = this.rng.range(400, 800);
    ctx.fillRect(this.w/2 - w/2, this.h/2 - h/2, w, h);
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, staticCanvas: HTMLCanvasElement) {
     ctx.drawImage(staticCanvas, 0, 0);

     // Grain/Noise overlay
     for(let i=0; i<1000; i++) {
       const x = Math.random() * this.w;
       const y = Math.random() * this.h;
       ctx.fillStyle = Math.random() > 0.5 ? '#000' : '#FFF';
       ctx.fillRect(x, y, 1, 1);
     }

     // Slow breathing scale
     const scale = 1 + Math.sin(t * 0.001) * 0.02;
     ctx.save();
     ctx.translate(this.w/2, this.h/2);
     ctx.scale(scale, scale);
     ctx.translate(-this.w/2, -this.h/2);
     // Note: To do this properly we'd need to redraw the shape,
     // but scaling the whole static canvas is a cool effect too.
     // Let's just draw a circle in center.
     ctx.beginPath();
     ctx.strokeStyle = '#FFF';
     ctx.lineWidth = 1;
     ctx.arc(this.w/2, this.h/2, 200, 0, Math.PI*2);
     ctx.stroke();
     ctx.restore();
  }
}
