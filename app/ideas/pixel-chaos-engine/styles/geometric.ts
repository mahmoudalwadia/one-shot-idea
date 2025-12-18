import { StyleDefinition, StyleInstance } from '../types';
import { RNG } from '../utils/rng';
import { PALETTES, hslToHex } from '../utils/math';

const commonSchema = {
  palette: { type: 'select' as const, label: 'Palette', default: 'Neon', options: Object.keys(PALETTES) },
  scale: { type: 'number' as const, label: 'Scale', default: 50, min: 10, max: 100 },
};

// 1. Isometric
export const IsometricStyle: StyleDefinition = {
  id: 'geo-iso', name: 'Isometric Blox', description: 'Stacked cubes.',
  schema: { ...commonSchema }, presets: { 'Big': {scale: 80}, 'Tiny': {scale: 20} },
  create: (s, p, w, h) => new IsoInstance(s, p, w, h)
};
class IsoInstance implements StyleInstance {
  rng: RNG; blocks: {x: number; y: number; c: string; h: number}[] = [];
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#111'; ctx.fillRect(0,0,this.w,this.h);
    const pal = PALETTES[String(this.p.palette)];
    const s = this.p.scale as number;
    for(let y=0;y<this.h/s*2;y++) for(let x=0;x<this.w/s;x++) {
      if(this.rng.chance(0.7)) {
        this.blocks.push({ x: (x-y)*s + this.w/2, y: (x+y)*s*0.5, c: this.rng.pick(pal), h: this.rng.range(10, s*3) });
      }
    }
    this.blocks.sort((a, b) => a.y - b.y);
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _staticCanvas: HTMLCanvasElement) {
    ctx.fillStyle = '#111'; ctx.fillRect(0,0,this.w,this.h);
    const off = Math.sin(t*0.001)*20;
    this.blocks.forEach((b) => {
      const scale = this.p.scale as number;
      ctx.fillStyle = b.c;
      ctx.beginPath(); ctx.moveTo(b.x, b.y+off); ctx.lineTo(b.x+scale, b.y-scale*0.5+off);
      ctx.lineTo(b.x, b.y-scale+off); ctx.lineTo(b.x-scale, b.y-scale*0.5+off); ctx.fill();
      ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(b.x-scale, b.y-scale*0.5+off, scale, b.h);
      ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.fillRect(b.x, b.y-scale*0.5+off, scale, b.h);
    });
  }
}

// 2. Truchet
export const TruchetStyle: StyleDefinition = {
  id: 'geo-truchet', name: 'Truchet Maze', description: 'Curving grid connections.',
  schema: { ...commonSchema, width: { type: 'number' as const, label: 'Width', default: 5, min: 1, max: 20 } }, presets: {'Thick':{width:15}},
  create: (s, p, w, h) => new TruchetInstance(s, p, w, h)
};
class TruchetInstance implements StyleInstance {
  rng: RNG; grid: {x: number; y: number; type: boolean; c: string}[] = [];
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,this.w,this.h);
    const pal = PALETTES[String(this.p.palette)];
    const s = this.p.scale as number;
    for(let y=0;y<this.h/s;y++) for(let x=0;x<this.w/s;x++) {
      this.grid.push({x:x*s, y:y*s, type:this.rng.chance(0.5), c:this.rng.pick(pal)});
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, _t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,this.w,this.h);
    const s = this.p.scale as number;
    const width = this.p.width as number;
    ctx.lineWidth = width;
    this.grid.forEach((g) => {
      ctx.strokeStyle = g.c;
      ctx.beginPath();
      if(g.type) {
        ctx.arc(g.x, g.y, s/2, 0, Math.PI/2); ctx.stroke();
        ctx.beginPath(); ctx.arc(g.x+s, g.y+s, s/2, Math.PI, 1.5*Math.PI);
      } else {
        ctx.arc(g.x+s, g.y, s/2, Math.PI/2, Math.PI); ctx.stroke();
        ctx.beginPath(); ctx.arc(g.x, g.y+s, s/2, 1.5*Math.PI, 0);
      }
      ctx.stroke();
    });
  }
}

// 3. HexGrid
export const HexGridStyle: StyleDefinition = {
  id: 'geo-hex', name: 'Hexagon Hive', description: 'Pulsing hex grid.',
  schema: { ...commonSchema }, presets: {},
  create: (s, p, w, h) => new HexInstance(s, p, w, h)
};
class HexInstance implements StyleInstance {
  rng: RNG; hexes: {x: number; y: number; c: string; phase: number}[] = [];
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#111'; ctx.fillRect(0,0,this.w,this.h);
    const pal = PALETTES[String(this.p.palette)];
    const r = this.p.scale as number;
    const h = r * Math.sqrt(3);
    for(let y=0; y<this.h/h; y++) for(let x=0; x<this.w/(r*1.5); x++) {
      const cx = x * r * 1.5;
      const cy = y * h + (x%2===0 ? 0 : h/2);
      this.hexes.push({x:cx, y:cy, c:this.rng.pick(pal), phase:this.rng.next()*10});
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle = '#111'; ctx.fillRect(0,0,this.w,this.h);
    const r = this.p.scale as number;
    this.hexes.forEach((hex) => {
      const s = r * (0.8 + 0.2*Math.sin(t*0.002 + hex.phase));
      ctx.fillStyle = hex.c;
      ctx.beginPath();
      for(let i=0;i<6;i++) ctx.lineTo(hex.x + s*Math.cos(i*Math.PI/3), hex.y + s*Math.sin(i*Math.PI/3));
      ctx.fill();
    });
  }
}

// 4. Circuit
export const CircuitStyle: StyleDefinition = {
  id: 'geo-circuit', name: 'Circuit Board', description: 'Tech lines and nodes.',
  schema: { ...commonSchema }, presets: {},
  create: (s, p, w, h) => new CircuitInstance(s, p, w, h)
};
class CircuitInstance implements StyleInstance {
  rng: RNG; paths: {x: number; y: number}[][] = [];
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#002200'; ctx.fillRect(0,0,this.w,this.h);
    for(let i=0;i<100;i++) {
      let x = this.rng.rangeInt(0,this.w/20)*20;
      let y = this.rng.rangeInt(0,this.h/20)*20;
      const pts = [{x,y}];
      for(let j=0;j<10;j++) {
        if(this.rng.chance(0.5)) x+=20; else y+=20;
        pts.push({x,y});
      }
      this.paths.push(pts);
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, sc: HTMLCanvasElement) {
    ctx.drawImage(sc, 0, 0);
    ctx.strokeStyle = '#00FF00'; ctx.lineWidth = 2;
    this.paths.forEach((p, i) => {
      ctx.beginPath();
      p.forEach((pt: {x: number; y: number}, idx:number) => idx===0?ctx.moveTo(pt.x,pt.y):ctx.lineTo(pt.x,pt.y));
      ctx.stroke();
      const node = p[Math.floor((t*0.01+i)%p.length)];
      ctx.fillStyle = '#FFF'; ctx.fillRect(node.x-2, node.y-2, 4, 4);
    });
  }
}

// 5. Mondrian
export const MondrianStyle: StyleDefinition = {
  id: 'geo-mondrian', name: 'Mondrian Grid', description: 'Primary colors and black lines.',
  schema: { complexity: { type: 'number' as const, label: 'Complexity', default: 10, min: 5, max: 20 } }, presets: {},
  create: (s, p, w, h) => new MondrianInstance(s, p, w, h)
};
class MondrianInstance implements StyleInstance {
  rng: RNG; rects: {x: number; y: number; w: number; h: number; c: string}[] = [];
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {
    const rs = [{x:0, y:0, w:this.w, h:this.h}];
    const complexity = this.p.complexity as number;
    for(let i=0;i<complexity;i++) {
      const idx = this.rng.rangeInt(0, rs.length);
      const r = rs[idx];
      rs.splice(idx,1);
      if(r.w > r.h) { // split vert
        const split = r.w * this.rng.range(0.3, 0.7);
        rs.push({x:r.x, y:r.y, w:split, h:r.h}, {x:r.x+split, y:r.y, w:r.w-split, h:r.h});
      } else {
        const split = r.h * this.rng.range(0.3, 0.7);
        rs.push({x:r.x, y:r.y, w:r.w, h:split}, {x:r.x, y:r.y+split, w:r.w, h:r.h-split});
      }
    }
    this.rects = rs.map(r => ({...r, c: this.rng.pick(['#F00', '#FF0', '#00F', '#FFF', '#FFF', '#FFF'])}));
  }
  renderFrame(ctx: CanvasRenderingContext2D, _t: number, _sc: HTMLCanvasElement) {
    ctx.lineWidth = 8; ctx.strokeStyle = '#000';
    this.rects.forEach((r) => {
      ctx.fillStyle = r.c; ctx.fillRect(r.x,r.y,r.w,r.h); ctx.strokeRect(r.x,r.y,r.w,r.h);
    });
  }
}

// 6. Circles
export const CirclesStyle: StyleDefinition = {
  id: 'geo-circles', name: 'Circle Packing', description: 'Growing circles.',
  schema: { count: {type:'number' as const, label:'Count', default:100, min:50, max:500} }, presets: {},
  create: (s, p, w, h) => new CircleInstance(s, p, w, h)
};
class CircleInstance implements StyleInstance {
  rng: RNG; circles: {x: number; y: number; r: number; c: string}[] = [];
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,this.w,this.h);
    const count = this.p.count as number;
    for(let i=0;i<count;i++) {
      this.circles.push({x:this.rng.range(0,this.w), y:this.rng.range(0,this.h), r:this.rng.range(5, 50), c:hslToHex(this.rng.range(0,360), 70, 50)});
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
    this.circles.forEach((c, i) => {
      const r = c.r * (1 + 0.2*Math.sin(t*0.003 + i));
      ctx.fillStyle = c.c; ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, Math.PI*2); ctx.fill();
    });
  }
}

// 7. Stripes
export const StripeStyle: StyleDefinition = {
  id: 'geo-stripes', name: 'Op Art Stripes', description: 'Hypnotic wavy lines.',
  schema: { freq: {type:'number' as const, label: 'Frequency', default:0.02, min:0.005, max:0.05} }, presets: {},
  create: (s, p, w, h) => new StripeInstance(s, p, w, h)
};
class StripeInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle = '#FFF'; ctx.fillRect(0,0,this.w,this.h);
    ctx.fillStyle = '#000';
    for(let y=0; y<this.h; y+=10) {
      ctx.beginPath();
      for(let x=0; x<this.w; x+=10) {
        const freq = this.p.freq as number;
        const off = Math.sin(x*freq + t*0.002) * 20;
        ctx.lineTo(x, y+off);
      }
      ctx.lineTo(this.w, y+20); ctx.lineTo(0, y+20); ctx.fill();
    }
  }
}

// 8. Sorting
export const SortingStyle: StyleDefinition = {
  id: 'geo-sort', name: 'Pixel Sorting', description: 'Glitchy sorted rows.',
  schema: { ...commonSchema }, presets: {},
  create: (s,p,w,h) => new SortingInstance(s,p,w,h)
};
class SortingInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    const pal = PALETTES[String(this.p.palette)];
    for(let x=0; x<this.w; x+=10) for(let y=0; y<this.h; y+=10) {
      ctx.fillStyle = this.rng.pick(pal); ctx.fillRect(x,y,10,10);
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, sc: HTMLCanvasElement) {
    ctx.drawImage(sc, 0, 0);
    const line = Math.floor(t*0.2) % this.h;
    ctx.fillStyle = '#FFF'; ctx.fillRect(0, line, this.w, 5);
  }
}

// 9. Triangle
export const TriangleStyle: StyleDefinition = {
  id: 'geo-tri', name: 'Triangle Tessel', description: 'Rotating triangles.',
  schema: { ...commonSchema }, presets: {},
  create: (s,p,w,h) => new TriInstance(s,p,w,h)
};
class TriInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,this.w,this.h);
    const s = this.p.scale as number;
    for(let y=0; y<this.h/s; y++) for(let x=0; x<this.w/s; x++) {
      ctx.save(); ctx.translate(x*s + s/2, y*s + s/2); ctx.rotate(t*0.001 + x+y);
      ctx.fillStyle = `hsl(${(x+y)*10}, 70%, 50%)`;
      ctx.beginPath(); ctx.moveTo(0, -s/2); ctx.lineTo(s/2, s/2); ctx.lineTo(-s/2, s/2); ctx.fill();
      ctx.restore();
    }
  }
}

// 10. Cross
export const CrossStyle: StyleDefinition = {
  id: 'geo-cross', name: 'Cross Stitch', description: 'X patterns.',
  schema: { ...commonSchema }, presets: {},
  create: (s,p,w,h) => new CrossInstance(s,p,w,h)
};
class CrossInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, _t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='#FFF'; ctx.fillRect(0,0,this.w,this.h);
    const s = 10;
    const pal = PALETTES[String(this.p.palette)];
    for(let y=0; y<this.h/s; y++) for(let x=0; x<this.w/s; x++) {
      ctx.strokeStyle = pal[(x+y)%pal.length];
      if((x+y)%2===0) {
        ctx.beginPath(); ctx.moveTo(x*s, y*s); ctx.lineTo(x*s+s, y*s+s); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x*s+s, y*s); ctx.lineTo(x*s, y*s+s); ctx.stroke();
      }
    }
  }
}
