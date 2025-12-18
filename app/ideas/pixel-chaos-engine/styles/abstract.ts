import { StyleDefinition, StyleInstance } from '../types';
import { RNG } from '../utils/rng';
import { PALETTES } from '../utils/math';

const commonSchema = {
  palette: { type: 'select' as const, label: 'Palette', default: 'Pastel', options: Object.keys(PALETTES) },
};

// 31. Pollock
export const PollockStyle: StyleDefinition = { id: 'abs-pollock', name: 'Pollock Drips', description: 'Paint splatter.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new PollockInstance(s,p,w,h)};
class PollockInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle='#FFF'; ctx.fillRect(0,0,this.w,this.h);
    const pal = PALETTES[String(this.p.palette)];
    for(let i=0;i<200;i++) {
      ctx.strokeStyle = this.rng.pick(pal);
      ctx.lineWidth = this.rng.range(1,5);
      ctx.beginPath();
      let x = this.rng.range(0,this.w), y = this.rng.range(0,this.h);
      ctx.moveTo(x,y);
      for(let j=0;j<20;j++) { x+=this.rng.range(-50,50); y+=this.rng.range(-50,50); ctx.lineTo(x,y); }
      ctx.stroke();
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, sc: HTMLCanvasElement) { ctx.drawImage(sc,0,0); }
}

// 32. Kandinsky
export const KandinskyStyle: StyleDefinition = { id: 'abs-kand', name: 'Kandinsky Shapes', description: 'Geometric composition.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new KandInstance(s,p,w,h)};
class KandInstance implements StyleInstance {
  rng: RNG; shapes: {x: number; y: number; r: number}[] = [];
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s);
    for(let i=0;i<10;i++) this.shapes.push({x:this.rng.range(0,this.w), y:this.rng.range(0,this.h), r:this.rng.range(0,Math.PI*2)});
  }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle='#EEE'; ctx.fillRect(0,0,this.w,this.h);
    const pal = PALETTES[String(this.p.palette)];
    this.shapes.forEach((s) => {
      ctx.save(); ctx.translate(s.x,s.y); ctx.rotate(s.r);
      ctx.fillStyle = this.rng.pick(pal);
      if(this.rng.chance(0.5)) ctx.fillRect(-50,-50,100,100); else { ctx.beginPath(); ctx.arc(0,0,50,0,Math.PI*2); ctx.fill(); }
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(200,200); ctx.stroke();
      ctx.restore();
    });
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, sc: HTMLCanvasElement) { ctx.drawImage(sc,0,0); }
}

// 33. Cubism
export const CubismStyle: StyleDefinition = { id: 'abs-cube', name: 'Cubism Faces', description: 'Fragmented shapes.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new CubeInstance(s,p,w,h)};
class CubeInstance implements StyleInstance {
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

// 34. Pointillism
export const PointStyle: StyleDefinition = { id: 'abs-point', name: 'Pointillism', description: 'Dots.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new PointInstance(s,p,w,h)};
class PointInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle='#FFF'; ctx.fillRect(0,0,this.w,this.h);
    const pal = PALETTES[String(this.p.palette)];
    for(let i=0;i<10000;i++) {
      ctx.fillStyle = this.rng.pick(pal);
      ctx.fillRect(this.rng.range(0,this.w), this.rng.range(0,this.h), 4, 4);
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, sc: HTMLCanvasElement) { ctx.drawImage(sc,0,0); }
}

// 35. StringArt
export const StringStyle: StyleDefinition = { id: 'abs-string', name: 'String Art', description: 'Radial lines.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new StringInstance(s,p,w,h)};
class StringInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
    ctx.strokeStyle='#FFF'; ctx.lineWidth=0.5;
    const cx=this.w/2, cy=this.h/2, r=300;
    for(let i=0;i<360;i+=5) {
      const a1 = i*Math.PI/180;
      const a2 = (i*2)*Math.PI/180;
      ctx.beginPath(); ctx.moveTo(cx+Math.cos(a1)*r, cy+Math.sin(a1)*r);
      ctx.lineTo(cx+Math.cos(a2)*r, cy+Math.sin(a2)*r); ctx.stroke();
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, sc: HTMLCanvasElement) { ctx.drawImage(sc,0,0); }
}

// 36. Spirograph
export const SpiroStyle: StyleDefinition = { id: 'abs-spiro', name: 'Spirograph', description: 'Geometric curves.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new SpiroInstance(s,p,w,h)};
class SpiroInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='rgba(0,0,0,0.1)'; ctx.fillRect(0,0,this.w,this.h);
    const R=150, r=52, O=50;
    ctx.beginPath(); ctx.strokeStyle='#F0F';
    for(let i=0;i<100;i++) {
      const a = t*0.01 + i*0.1;
      const x = (R-r)*Math.cos(a) + O*Math.cos((R-r)/r*a) + this.w/2;
      const y = (R-r)*Math.sin(a) - O*Math.sin((R-r)/r*a) + this.h/2;
      if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
    ctx.stroke();
  }
}

// 37. Kaleidoscope
export const KaleidoStyle: StyleDefinition = { id: 'abs-kaleido', name: 'Kaleidoscope', description: 'Mirrors.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new KaleidoInstance(s,p,w,h)};
class KaleidoInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
    const cx=this.w/2, cy=this.h/2;
    for(let i=0;i<6;i++) {
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(i*Math.PI/3);
      ctx.fillStyle='#F00'; ctx.fillRect(50+Math.sin(t*0.001)*20, 50, 50, 50);
      ctx.restore();
    }
  }
}

// 38. Brutalism
export const BrutalStyle: StyleDefinition = { id: 'abs-brut', name: 'Brutalism', description: 'Concrete blocks.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new BrutalInstance(s,p,w,h)};
class BrutalInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle='#888'; ctx.fillRect(0,0,this.w,this.h);
    for(let i=0;i<10;i++) {
      ctx.fillStyle='#666'; ctx.fillRect(this.rng.range(0,this.w), this.rng.range(0,this.h), 200, 300);
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, sc: HTMLCanvasElement) { ctx.drawImage(sc,0,0); }
}

// 39. Halftone
export const HalftoneStyle: StyleDefinition = { id: 'abs-half', name: 'Pop Art Dots', description: 'Halftone.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new HalftoneInstance(s,p,w,h)};
class HalftoneInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle='#FFF'; ctx.fillRect(0,0,this.w,this.h);
    ctx.fillStyle='#000';
    for(let x=0;x<this.w;x+=20) for(let y=0;y<this.h;y+=20) {
      // Clamp calculation to max(0) to prevent tiny negative floating point numbers causing IndexSizeError
      const r = Math.max(0, (Math.sin(x*0.01)+Math.cos(y*0.01)+2)*3);
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, sc: HTMLCanvasElement) { ctx.drawImage(sc,0,0); }
}

// 40. Graffiti
export const GraffitiStyle: StyleDefinition = { id: 'abs-tag', name: 'Graffiti Tag', description: 'Wild style.', schema: commonSchema, presets: {}, create: (s,p,w,h)=>new GraffitiInstance(s,p,w,h)};
class GraffitiInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle='#333'; ctx.fillRect(0,0,this.w,this.h);
    const pal = PALETTES[String(this.p.palette)];
    ctx.lineWidth=20; ctx.lineCap='round';
    for(let i=0;i<5;i++) {
      ctx.strokeStyle = this.rng.pick(pal);
      ctx.beginPath(); ctx.moveTo(this.rng.range(0,this.w), this.rng.range(0,this.h));
      for(let j=0;j<5;j++) ctx.lineTo(this.rng.range(0,this.w), this.rng.range(0,this.h));
      ctx.stroke();
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, sc: HTMLCanvasElement) { ctx.drawImage(sc,0,0); }
}
