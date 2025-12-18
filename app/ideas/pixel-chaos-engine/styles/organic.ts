import { StyleDefinition, StyleInstance } from '../types';
import { RNG } from '../utils/rng';
import { PALETTES, Noise } from '../utils/math';

interface Drop { x: number; y: number; r?: number; a?: number; }
interface FireParticle { x: number; y: number; l: number; }
interface Seed { x: number; y: number; vx: number; vy: number; age: number; }
interface Ball { x: number; y: number; vx: number; vy: number; }

const commonSchema = {
  palette: { type: 'select' as const, label: 'Palette', default: 'Forest', options: Object.keys(PALETTES) },
};

// 11. L-System
export const LSystemStyle: StyleDefinition = {
  id: 'org-lsys', name: 'L-System Trees', description: 'Fractal branching.',
  // Added step: 1 to ensure integer depths during randomization
  schema: { ...commonSchema, depth: {type:'number', label: 'Depth', default:4, min:2, max:6, step: 1} },
  presets: {},
  create: (s, p, w, h) => new LSysInstance(s, p, w, h)
};
class LSysInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
    ctx.strokeStyle='#FFF';

    // Sanitize depth to ensure it's a safe integer
    let safeDepth = Math.floor(this.p.depth as number);
    if (isNaN(safeDepth)) safeDepth = 4;
    // Hard clamp to prevent explosion even if params are wild
    safeDepth = Math.min(Math.max(safeDepth, 1), 7);

    const drawBranch = (x:number, y:number, len:number, ang:number, d:number) => {
      // Fix: Use <= 0 instead of === 0 to catch floats/negatives
      if(d <= 0) return;

      const ex = x + Math.cos(ang)*len;
      const ey = y + Math.sin(ang)*len;
      ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(ex,ey); ctx.stroke();

      const sway = Math.sin(t*0.001 + d)*0.1;

      // Optimization: Stop if lines are too small
      if (len < 2) return;

      drawBranch(ex, ey, len*0.7, ang - 0.5 + sway, d-1);
      drawBranch(ex, ey, len*0.7, ang + 0.5 + sway, d-1);
    };
    drawBranch(this.w/2, this.h, 150, -Math.PI/2, safeDepth);
  }
}

// 12. Coral
export const CoralStyle: StyleDefinition = {
  id: 'org-coral', name: 'Coral Reef', description: 'Growing structures.',
  schema: { ...commonSchema }, presets: {},
  create: (s, p, w, h) => new CoralInstance(s, p, w, h)
};
class CoralInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle='#001'; ctx.fillRect(0,0,this.w,this.h);
    const pal = PALETTES[String(this.p.palette)];
    for(let i=0;i<500;i++) {
      ctx.fillStyle = this.rng.pick(pal);
      ctx.beginPath(); ctx.arc(this.rng.range(0,this.w), this.rng.range(0,this.h), this.rng.range(5,20), 0, Math.PI*2); ctx.fill();
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, sc: HTMLCanvasElement) {
    ctx.drawImage(sc, 0, 0);
  }
}

// 13. Rain
export const RainStyle: StyleDefinition = {
  id: 'org-rain', name: 'Rain Drops', description: 'Ripples on water.',
  schema: { ...commonSchema }, presets: {},
  create: (s, p, w, h) => new RainInstance(s, p, w, h)
};
class RainInstance implements StyleInstance {
  rng: RNG; drops: Drop[] = [];
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, _t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
    if(Math.random()<0.1) this.drops.push({x:Math.random()*this.w, y:Math.random()*this.h, r:0, a:1});
    ctx.strokeStyle='#FFF';

    // Reverse loop to safely splice
    for(let i = this.drops.length - 1; i >= 0; i--) {
      const d = this.drops[i] as Drop;
      if (!d.r) d.r = 0;
      if (!d.a) d.a = 1;
      d.r += 2;
      d.a -= 0.02;

      if(d.a <= 0) {
        this.drops.splice(i, 1);
        continue;
      }

      ctx.globalAlpha = d.a;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
}

// 14. Starry
export const StarryStyle: StyleDefinition = {
  id: 'org-starry', name: 'Starry Night', description: 'Swirling strokes.',
  schema: { ...commonSchema }, presets: {},
  create: (s, p, w, h) => new StarryInstance(s, p, w, h)
};
class StarryInstance implements StyleInstance {
  rng: RNG; noise: Noise;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); this.noise = new Noise(this.rng); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
    const pal = PALETTES[String(this.p.palette)];
    for(let i=0;i<1000;i++) {
      const x = this.rng.range(0,this.w);
      const y = this.rng.range(0,this.h);
      const ang = this.noise.perlin2(x*0.005, y*0.005 + t*0.0001) * Math.PI*4;
      ctx.strokeStyle = this.rng.pick(pal);
      ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+Math.cos(ang)*20, y+Math.sin(ang)*20); ctx.stroke();
    }
  }
}

// 15. Lightning
export const LightningStyle: StyleDefinition = {
  id: 'org-bolt', name: 'Lightning Storm', description: 'Electric bolts.',
  schema: { ...commonSchema }, presets: {},
  create: (s, p, w, h) => new LightningInstance(s, p, w, h)
};
class LightningInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, _t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
    if(Math.random()>0.2) return;
    const drawBolt = (x:number, y:number) => {
      ctx.strokeStyle = '#FFF'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x,y);
      let safety = 0;
      while(y < this.h && safety++ < 1000) {
        x += (Math.random()-0.5)*40;
        y += Math.random()*40 + 5; // Fix: Ensure minimum forward progress to avoid infinite loops
        ctx.lineTo(x,y);
      }
      ctx.stroke();
    };
    drawBolt(Math.random()*this.w, 0);
  }
}

// 16. Web
export const WebStyle: StyleDefinition = {
  id: 'org-web', name: 'Spider Web', description: 'Radial threads.',
  schema: { ...commonSchema }, presets: {},
  create: (s, p, w, h) => new WebInstance(s, p, w, h)
};
class WebInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
    ctx.strokeStyle='#FFF'; ctx.globalAlpha=0.2;
    const cx=this.w/2, cy=this.h/2;
    for(let i=0;i<20;i++) {
      const a = i/20 * Math.PI*2;
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(a)*500, cy+Math.sin(a)*500); ctx.stroke();
    }
    for(let r=0;r<500;r+=20) {
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.stroke();
    }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, sc: HTMLCanvasElement) {
    ctx.drawImage(sc, 0, 0);
  }
}

// 17. Fire
export const FireStyle: StyleDefinition = {
  id: 'org-fire', name: 'Fire Flames', description: 'Rising heat.',
  schema: { ...commonSchema }, presets: {},
  create: (s, p, w, h) => new FireInstance(s, p, w, h)
};
class FireInstance implements StyleInstance {
  rng: RNG; particles: FireParticle[] = [];
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, _t: number, _sc: HTMLCanvasElement) {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);

    // NOTE: We change composite operation here.
    // The ArtEngine handles restoring this safely now, preventing bleed to next style.
    ctx.globalCompositeOperation = 'lighter';

    for(let i=0;i<20;i++) this.particles.push({x:this.w/2+(Math.random()-0.5)*100, y:this.h, l:1});

    // Use reverse loop to allow splicing
    for(let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.y -= 5;
      p.l -= 0.02;
      p.x += (Math.random()-0.5)*4;

      if(p.l <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      // Safety: Ensure color components are valid integers
      const intensity = Math.max(0, Math.min(255, Math.floor(p.l * 255)));
      ctx.fillStyle = `rgba(255, ${intensity}, 0, ${p.l})`;

      // Safety: Prevent negative radius
      const r = Math.max(0, 20 * p.l);
      ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI*2); ctx.fill();
    }
  }
}

// 18. Clouds
export const CloudStyle: StyleDefinition = {
  id: 'org-cloud', name: 'Nebula Clouds', description: 'Soft noise.',
  schema: { ...commonSchema }, presets: {},
  create: (s,p,w,h) => new CloudInstance(s,p,w,h)
};
class CloudInstance implements StyleInstance {
  rng: RNG; noise: Noise;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); this.noise = new Noise(this.rng); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _sc: HTMLCanvasElement) {
    const pal = PALETTES[String(this.p.palette)];
    for(let x=0; x<this.w; x+=20) for(let y=0; y<this.h; y+=20) {
      const n = this.noise.perlin2(x*0.005, y*0.005 + t*0.0002);
      ctx.fillStyle = n > 0 ? pal[0] : pal[1];
      ctx.globalAlpha = Math.abs(n);
      ctx.fillRect(x,y,20,20);
    }
  }
}

// 19. Seeds
export const SeedStyle: StyleDefinition = {
  id: 'org-seed', name: 'Dandelion Seeds', description: 'Floating particles.',
  schema: { ...commonSchema }, presets: {},
  create: (s,p,w,h) => new SeedInstance(s,p,w,h)
};
class SeedInstance implements StyleInstance {
  rng: RNG; seeds: Seed[] = [];
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {
    for(let i=0;i<100;i++) this.seeds.push({x:this.rng.range(0,this.w), y:this.rng.range(0,this.h), vx: 0, vy: 0, age: 0});
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
    this.seeds.forEach((s: {x: number; y: number}) => {
      s.x += Math.sin(t*0.001 + s.y)*0.5; s.y -= 0.5;
      if(s.y<0) s.y = this.h;
      ctx.fillStyle='#FFF'; ctx.fillRect(s.x, s.y, 2, 2);
    });
  }
}

// 20. Metal
export const MetalStyle: StyleDefinition = {
  id: 'org-metal', name: 'Liquid Metal', description: 'Metaballs.',
  schema: { ...commonSchema }, presets: {},
  create: (s,p,w,h) => new MetalInstance(s,p,w,h)
};
class MetalInstance implements StyleInstance {
  rng: RNG; balls: Ball[] = [];
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s);
    for(let i=0;i<10;i++) this.balls.push({x:0, y:0, vx:this.rng.range(-2,2), vy:this.rng.range(-2,2)});
  }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, _t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
    ctx.fillStyle='#FFF'; ctx.filter='blur(20px) contrast(20)';
    this.balls.forEach(b => {
      b.x += b.vx; b.y += b.vy;
      if(b.x<0||b.x>this.w) b.vx*=-1; if(b.y<0||b.y>this.h) b.vy*=-1;
      ctx.beginPath(); ctx.arc(b.x, b.y, 50, 0, Math.PI*2); ctx.fill();
    });
    ctx.filter='none';
  }
}
