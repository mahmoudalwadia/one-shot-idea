import { StyleDefinition, StyleInstance } from '../types';
import { RNG } from '../utils/rng';
import { PALETTES } from '../utils/math';

const commonSchema = {
  palette: { type: 'select' as const, label: 'Palette', default: 'Cool', options: Object.keys(PALETTES) },
};

// 41. Data
export const DataStyle: StyleDefinition = { id: 'exp-data', name: 'Data Stream', description: 'Binary flow.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new DataInstance(s,p,w,h)};
class DataInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, _t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='rgba(0,0,0,0.1)'; ctx.fillRect(0,0,this.w,this.h);
    ctx.fillStyle='#0F0'; ctx.font='10px monospace';
    for(let i=0;i<50;i++) ctx.fillText(Math.random()>0.5?'1':'0', Math.random()*this.w, Math.random()*this.h);
  }
}

// 42. Fiber
export const FiberStyle: StyleDefinition = { id: 'exp-fiber', name: 'Optical Fiber', description: 'Glowing ends.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new FiberInstance(s,p,w,h)};
class FiberInstance implements StyleInstance {
  rng: RNG; pts: {x: number; y: number}[] = [];
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s);
     for(let i=0;i<50;i++) this.pts.push({x:this.rng.range(0,this.w), y:this.rng.range(0,this.h)});
  }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, _t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
    this.pts.forEach((p: {x: number; y: number}) => {
      ctx.strokeStyle='#333'; ctx.beginPath(); ctx.moveTo(this.w/2, this.h); ctx.lineTo(p.x, p.y); ctx.stroke();
      ctx.fillStyle='#FFF'; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI*2); ctx.fill();
    });
  }
}

// 43. Shards
export const ShardStyle: StyleDefinition = { id: 'exp-shard', name: 'Glass Shards', description: 'Sharp gradients.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new ShardInstance(s,p,w,h)};
class ShardInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    const pal = PALETTES[String(this.p.palette)];
    for(let i=0;i<50;i++) {
      ctx.fillStyle = this.rng.pick(pal);
      ctx.beginPath(); ctx.moveTo(this.rng.range(0,this.w), this.rng.range(0,this.h));
      ctx.lineTo(this.rng.range(0,this.w), this.rng.range(0,this.h));
      ctx.lineTo(this.rng.range(0,this.w), this.rng.range(0,this.h));
      ctx.fill();
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, sc: HTMLCanvasElement) { ctx.drawImage(sc,0,0); }
}

// 44. Smoke
export const SmokeStyle: StyleDefinition = { id: 'exp-smoke', name: 'Smoke Trails', description: 'Fading ribbons.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new SmokeInstance(s,p,w,h)};
class SmokeInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='rgba(0,0,0,0.1)'; ctx.fillRect(0,0,this.w,this.h);
    ctx.strokeStyle='#AAA';
    ctx.beginPath(); ctx.moveTo(this.w/2, this.h);
    ctx.quadraticCurveTo(this.w/2 + Math.sin(t*0.001)*100, this.h/2, this.w/2 + Math.cos(t*0.002)*100, 0);
    ctx.stroke();
  }
}

// 45. Lasers
export const LaserStyle: StyleDefinition = { id: 'exp-laser', name: 'Laser Show', description: 'Beams.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new LaserInstance(s,p,w,h)};
class LaserInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='rgba(0,0,0,0.1)'; ctx.fillRect(0,0,this.w,this.h);
    ctx.strokeStyle='#F00'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(this.w, Math.abs(Math.sin(t*0.001)*this.h)); ctx.stroke();
    ctx.strokeStyle='#0F0';
    ctx.beginPath(); ctx.moveTo(this.w,0); ctx.lineTo(0, Math.abs(Math.cos(t*0.001)*this.h)); ctx.stroke();
  }
}

// 46. Bubbles
export const BubbleStyle: StyleDefinition = { id: 'exp-bub', name: 'Bubble Wrap', description: 'Grid spheres.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new BubInstance(s,p,w,h)};
class BubInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle='#EEE'; ctx.fillRect(0,0,this.w,this.h);
    for(let y=0;y<this.h;y+=50) for(let x=0;x<this.w;x+=50) {
      const g = ctx.createRadialGradient(x+25,y+25,0,x+25,y+25,25);
      g.addColorStop(0,'#FFF'); g.addColorStop(1,'#AAA');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x+25,y+25,20,0,Math.PI*2); ctx.fill();
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, sc: HTMLCanvasElement) { ctx.drawImage(sc,0,0); }
}

// 47. Confetti
export const ConfettiStyle: StyleDefinition = { id: 'exp-conf', name: 'Confetti', description: 'Falling rects.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new ConfInstance(s,p,w,h)};
class ConfInstance implements StyleInstance {
  rng: RNG;
  particles: {x: number; y: number; c: string}[] = [];
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s);
    const pal = PALETTES[String(this.p.palette)];
    for(let i=0;i<100;i++) this.particles.push({x:this.rng.range(0,this.w), y:this.rng.range(0,this.h), c:this.rng.pick(pal)});
  }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, _t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='#FFF'; ctx.fillRect(0,0,this.w,this.h);
    this.particles.forEach((p: {x: number; y: number; c: string}) => {
      p.y+=5; if(p.y>this.h) p.y=0;
      ctx.fillStyle=p.c; ctx.fillRect(p.x, p.y, 10, 5);
    });
  }
}

// 48. Spiral
export const SpiralStyle: StyleDefinition = { id: 'exp-spir', name: 'Hypno Spiral', description: 'Tunnel.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new SpirInstance(s,p,w,h)};
class SpirInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
    ctx.strokeStyle='#FFF'; ctx.lineWidth=2;
    const cx=this.w/2, cy=this.h/2;
    ctx.beginPath();
    for(let i=0;i<1000;i++) {
      const a = i*0.1 + t*0.005;
      const r = i*0.5;
      ctx.lineTo(cx+Math.cos(a)*r, cy+Math.sin(a)*r);
    }
    ctx.stroke();
  }
}

// 49. Barcode
export const BarcodeStyle: StyleDefinition = { id: 'exp-bar', name: 'Barcode', description: 'Lines.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new BarInstance(s,p,w,h)};
class BarInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle='#FFF'; ctx.fillRect(0,0,this.w,this.h);
    ctx.fillStyle='#000';
    for(let x=0;x<this.w;x+=this.rng.range(2,10)) ctx.fillRect(x, 0, this.rng.range(1,5), this.h);
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, sc: HTMLCanvasElement) { ctx.drawImage(sc,0,0); }
}

// 50. QR
export const QRStyle: StyleDefinition = { id: 'exp-qr', name: 'QR Glitch', description: 'Blocks.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new QRInstance(s,p,w,h)};
class QRInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle='#FFF'; ctx.fillRect(0,0,this.w,this.h);
    ctx.fillStyle='#000';
    for(let y=0;y<this.h;y+=20) for(let x=0;x<this.w;x+=20) if(this.rng.chance(0.5)) ctx.fillRect(x,y,20,20);
    // Eyes
    ctx.fillRect(40,40,100,100); ctx.clearRect(60,60,60,60); ctx.fillRect(80,80,20,20);
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, sc: HTMLCanvasElement) { ctx.drawImage(sc,0,0); }
}
