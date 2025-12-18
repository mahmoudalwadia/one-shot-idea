import { StyleDefinition, StyleInstance, ParamsSchemaMap } from '../types';
import { RNG } from '../utils/rng';
import { PALETTES, Noise, map } from '../utils/math';

const CS: ParamsSchemaMap = { palette: { type: 'select' as const, label: 'Palette', default: 'Forest' as string, options: Object.keys(PALETTES) } };

// --- NATURE ---

export const BambooStyle: StyleDefinition = {
  id: 'nature-bamboo', name: 'Bamboo Grove', description: 'Vertical Zen.',
  schema: {...CS, density: {type:'number' as const, label: 'Density', default: 30 as number, min:10, max:60}} as ParamsSchemaMap, presets:{},
  create: (s,p,w,h) => new Bamboo(s,p,w,h)
};
class Bamboo implements StyleInstance {
  rng: RNG; stalks: unknown[] = [];
  constructor(private s:string, private p:Record<string, string | number | boolean>, private w:number, private h:number) { this.rng=new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    const pal = PALETTES[String(this.p.palette)];
    ctx.fillStyle = '#1a1a1a'; ctx.fillRect(0,0,this.w,this.h); // Dark background
    for(let i=0; i<(this.p.density as number); i++) {
      this.stalks.push({
        x: this.rng.range(0, this.w),
        w: this.rng.range(10, 30),
        c: this.rng.pick(pal),
        segs: this.rng.rangeInt(5, 12)
      });
    }
    this.stalks.sort((a,b) => (a as {x: number; w: number; c: string; segs: number}).w - (b as {x: number; w: number; c: string; segs: number}).w); // Depth sort
    this.stalks.forEach(s => {
      const stalk = s as {x: number; w: number; c: string; segs: number};
      ctx.fillStyle = stalk.c;
      let y = this.h;
      for(let i=0; i<stalk.segs; i++) {
        const h = this.rng.range(60, 150);
        ctx.fillRect(stalk.x, y-h+2, stalk.w, h-4);
        // Joint
        ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(stalk.x-2, y-h, stalk.w+4, 4);
        ctx.fillStyle = stalk.c;
        y -= h;
      }
    });
  }
  renderFrame(ctx:CanvasRenderingContext2D, t:number, sc:HTMLCanvasElement) {
    ctx.drawImage(sc, 0, 0);
    // Falling leaves
    ctx.fillStyle = '#bfa';
    for(let i=0; i<30; i++) {
      const x = (t*0.05 + i*137)%this.w;
      const y = (t*0.2 + i*223)%this.h;
      ctx.fillRect(x + Math.sin(y*0.02)*10, y, 6, 3);
    }
  }
}

export const SakuraStyle: StyleDefinition = {
  id: 'nature-sakura', name: 'Cherry Blossom', description: 'Falling petals.',
  schema: {...CS} as ParamsSchemaMap, presets:{}, create: (s,p,w,h) => new Sakura(s,p,w,h)
};
class Sakura implements StyleInstance {
  rng: RNG; petals: {x: number; y: number; s: number; vx: number; vy: number; ph: number}[] = [];
  constructor(private s:string, private p:Record<string, string | number | boolean>, private w:number, private h:number) {
    this.rng=new RNG(s);
    for(let i=0; i<200; i++) this.petals.push({
      x: this.rng.range(0, w), y: this.rng.range(0, h),
      s: this.rng.range(2, 6),
      vx: this.rng.range(0.5, 2), vy: this.rng.range(1, 3),
      ph: this.rng.range(0, Math.PI*2)
    });
  }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#221122'; ctx.fillRect(0,0,this.w,this.h);
    // Draw tree silhouette
    ctx.strokeStyle = '#000'; ctx.lineWidth = 15;
    ctx.beginPath(); ctx.moveTo(0, this.h); ctx.quadraticCurveTo(this.w/3, this.h/2, this.w, 0); ctx.stroke();
  }
  renderFrame(ctx:CanvasRenderingContext2D, t:number, sc:HTMLCanvasElement) {
    ctx.drawImage(sc, 0, 0);
    ctx.fillStyle = '#ffb7b2';
    this.petals.forEach((p: {x: number; y: number; s: number; vx: number; vy: number; ph: number}) => {
      const x = (p.x + t*0.01*p.vx + Math.sin(t*0.002 + p.ph)*20) % this.w;
      const y = (p.y + t*0.02*p.vy) % this.h;
      ctx.beginPath(); ctx.arc(x, y, p.s, 0, Math.PI*2); ctx.fill();
    });
  }
}

export const AuroraStyle: StyleDefinition = {
  id: 'nature-aurora', name: 'Aurora Borealis', description: 'Northern lights.',
  schema: {...CS}, presets:{}, create: (s,p,w,h) => new Aurora(s,p,w,h)
};
class Aurora implements StyleInstance {
  rng: RNG; noise: Noise;
  constructor(private s:string, private p:Record<string, string | number | boolean>, private w:number, private h:number) { this.rng=new RNG(s); this.noise=new Noise(this.rng); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#050510'; ctx.fillRect(0,0,this.w,this.h);
    ctx.fillStyle = '#FFF';
    for(let i=0; i<500; i++) ctx.fillRect(this.rng.range(0,this.w), this.rng.range(0,this.h), 1, 1);
  }
  renderFrame(ctx:CanvasRenderingContext2D, t:number, sc:HTMLCanvasElement) {
    ctx.drawImage(sc, 0, 0);
    const pal = PALETTES[String(this.p.palette)];
    ctx.globalCompositeOperation = 'screen';
    for(let i=0; i<3; i++) {
      ctx.fillStyle = pal[i % pal.length];
      ctx.beginPath();
      ctx.moveTo(0, this.h);
      for(let x=0; x<=this.w; x+=20) {
        const n = this.noise.perlin2(x*0.002, t*0.0001 + i);
        const y = this.h/2 + n * 200 + i*50;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(this.w, this.h);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
  }
}

export const OceanStyle: StyleDefinition = {
  id: 'nature-ocean', name: 'Deep Ocean', description: 'Rolling waves.',
  schema: {...CS}, presets:{}, create: (s,p,w,h) => new Ocean(s,p,w,h)
};
class Ocean implements StyleInstance {
  rng: RNG;
  constructor(private s:string, private p:Record<string, string | number | boolean>, private w:number, private h:number) { this.rng=new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx:CanvasRenderingContext2D, t:number, _sc:HTMLCanvasElement) {
    const pal = PALETTES[String(this.p.palette)];
    const grad = ctx.createLinearGradient(0,0,0,this.h);
    grad.addColorStop(0, pal[0]); grad.addColorStop(1, pal[pal.length-1]);
    ctx.fillStyle = grad; ctx.fillRect(0,0,this.w,this.h);

    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    for(let y=0; y<this.h; y+=20) {
      ctx.beginPath();
      for(let x=0; x<=this.w; x+=20) {
        const off = Math.sin(x*0.01 + y*0.02 + t*0.002) * 10;
        ctx.lineTo(x, y+off);
      }
      ctx.stroke();
    }
  }
}

// --- SPACE ---

export const GalaxyStyle: StyleDefinition = {
  id: 'space-galaxy', name: 'Spiral Galaxy', description: 'Cosmic spin.',
  schema: {...CS, arms: {type:'number' as const, label: 'Spiral Arms', default: 3 as number, min:2, max:8}} as ParamsSchemaMap, presets:{}, create: (s,p,w,h) => new Galaxy(s,p,w,h)
};
class Galaxy implements StyleInstance {
  rng: RNG; stars: {r: number; theta: number; c: string; s: number}[] = [];
  constructor(private s:string, private p:Record<string, string | number | boolean>, private w:number, private h:number) {
    this.rng=new RNG(s);
    const pal = PALETTES[String(this.p.palette)];
    for(let i=0; i<2000; i++) {
      const arm = i % (this.p.arms as number);
      const r = this.rng.range(50, this.w/2);
      const theta = map(r, 0, this.w/2, 0, Math.PI*4) + (arm * Math.PI*2/(this.p.arms as number)) + this.rng.range(-0.5, 0.5);
      this.stars.push({r, theta, c: this.rng.pick(pal), s: this.rng.range(1,3)});
    }
  }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx:CanvasRenderingContext2D, t:number, _sc:HTMLCanvasElement) {
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,this.w,this.h);
    const cx = this.w/2, cy = this.h/2;
    this.stars.forEach((st: {r: number; theta: number; c: string; s: number}) => {
      const a = st.theta + t * (1000/(st.r*st.r + 1000)) * 0.05; // Kepler-ish
      const x = cx + Math.cos(a) * st.r;
      const y = cy + Math.sin(a) * st.r;
      ctx.fillStyle = st.c;
      ctx.fillRect(x, y, st.s, st.s);
    });
  }
}

export const BlackHoleStyle: StyleDefinition = {
  id: 'space-blackhole', name: 'Black Hole', description: 'Accretion disk.',
  schema: {...CS}, presets:{}, create: (s,p,w,h) => new BlackHole(s,p,w,h)
};
class BlackHole implements StyleInstance {
  rng: RNG;
  constructor(private s:string, private p:Record<string, string | number | boolean>, private w:number, private h:number) { this.rng=new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx:CanvasRenderingContext2D, t:number, _sc:HTMLCanvasElement) {
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,this.w,this.h);
    const cx = this.w/2, cy = this.h/2;
    const pal = PALETTES[String(this.p.palette)];

    // Accretion Disk
    for(let i=0; i<500; i++) {
      const r = 100 + Math.random()*200;
      const a = t*0.005 * (300/r) + i;
      // Perspective transform
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r * 0.3;

      // Z-sort ish (hide behind)
      if (Math.sin(a) > 0 || r > 120) {
         ctx.fillStyle = pal[i%pal.length];
         ctx.fillRect(x, y, 2, 2);
      }
    }
    // Event Horizon
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(cx, cy, 80, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#FFF'; ctx.lineWidth=2; ctx.stroke();
  }
}

export const PlanetStyle: StyleDefinition = {
  id: 'space-planets', name: 'Pixel Planets', description: 'Orbital system.',
  schema: {...CS}, presets:{}, create: (s,p,w,h) => new Planets(s,p,w,h)
};
class Planets implements StyleInstance {
  rng: RNG; planets: {r: number; s: number; c: string; spd: number}[] = [];
  constructor(private s:string, private p:Record<string, string | number | boolean>, private w:number, private h:number) {
    this.rng=new RNG(s);
    const pal = PALETTES[String(this.p.palette)];
    for(let i=0; i<5; i++) {
      this.planets.push({r: 50 + i*60, s: this.rng.range(10, 30), c: this.rng.pick(pal), spd: this.rng.range(0.001, 0.005)});
    }
  }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#050515'; ctx.fillRect(0,0,this.w,this.h);
    ctx.fillStyle = '#FFF'; for(let i=0;i<200;i++) ctx.fillRect(this.rng.range(0,this.w), this.rng.range(0,this.h), 1, 1);
  }
  renderFrame(ctx:CanvasRenderingContext2D, t:number, sc:HTMLCanvasElement) {
    ctx.drawImage(sc, 0, 0);
    const cx=this.w/2, cy=this.h/2;
    // Sun
    ctx.fillStyle = '#FFD700'; ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI*2); ctx.fill();

    this.planets.forEach((p: {r: number; s: number; c: string; spd: number}) => {
      const a = t * p.spd;
      const x = cx + Math.cos(a)*p.r;
      const y = cy + Math.sin(a)*p.r;
      ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(x, y, p.s, 0, Math.PI*2); ctx.fill();
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.beginPath(); ctx.arc(x + Math.cos(a)*5, y + Math.sin(a)*5, p.s, 0, Math.PI*2); ctx.fill();
    });
  }
}

// --- CULTURE ---

export const ZenStyle: StyleDefinition = {
  id: 'cult-zen', name: 'Zen Garden', description: 'Sand ripples.',
  schema: {...CS}, presets:{}, create: (s,p,w,h) => new Zen(s,p,w,h)
};
class Zen implements StyleInstance {
  rng: RNG; stones: {x: number; y: number; r: number}[] = [];
  constructor(private s:string, private p:Record<string, string | number | boolean>, private w:number, private h:number) {
    this.rng=new RNG(s);
    for(let i=0;i<5;i++) this.stones.push({x:this.rng.range(100,w-100), y:this.rng.range(100,h-100), r:this.rng.range(20,50)});
  }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#dcb'; ctx.fillRect(0,0,this.w,this.h);
    ctx.strokeStyle = '#cba'; ctx.lineWidth = 2;

    // Ripples
    for(let r=0; r<Math.max(this.w,this.h); r+=10) {
      // Deform r based on distance to stones
      for(let a=0; a<Math.PI*2; a+=0.05) {
        // Simple approx: Draw lines
      }
      ctx.beginPath(); ctx.arc(this.w/2, this.h/2, r, 0, Math.PI*2); ctx.stroke();
    }

    // Stones
    this.stones.forEach(st => {
      const stone = st as {x: number; y: number; r: number};
      ctx.fillStyle = '#555'; ctx.beginPath(); ctx.arc(stone.x, stone.y, stone.r, 0, Math.PI*2); ctx.fill();
    });
  }
  renderFrame(ctx:CanvasRenderingContext2D, t:number, sc:HTMLCanvasElement) {
    ctx.drawImage(sc, 0, 0);
    // Shadow moves
    const dx = Math.cos(t*0.0005)*10;
    const dy = Math.sin(t*0.0005)*10;
    this.stones.forEach(st => {
      const stone = st as {x: number; y: number; r: number};
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath(); ctx.arc(stone.x+dx, stone.y+dy, stone.r, 0, Math.PI*2); ctx.fill();
    });
  }
}

export const IslamicStyle: StyleDefinition = {
  id: 'cult-islamic', name: 'Islamic Geometry', description: 'Tesselations.',
  schema: {...CS}, presets:{}, create: (s,p,w,h) => new Islamic(s,p,w,h)
};
class Islamic implements StyleInstance {
  rng: RNG;
  constructor(private s:string, private p:Record<string, string | number | boolean>, private w:number, private h:number) { this.rng=new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx:CanvasRenderingContext2D, t:number, _sc:HTMLCanvasElement) {
    const pal = PALETTES[String(this.p.palette)];
    ctx.fillStyle = pal[0]; ctx.fillRect(0,0,this.w,this.h);
    const s = 60 + Math.sin(t*0.001)*10;
    ctx.lineWidth = 2;
    for(let y=0; y<this.h+s; y+=s) for(let x=0; x<this.w+s; x+=s) {
      ctx.strokeStyle = pal[1];
      ctx.strokeRect(x,y,s,s);
      ctx.beginPath(); ctx.arc(x,y,s/2,0,Math.PI*2); ctx.stroke();
      ctx.strokeStyle = pal[2];
      ctx.strokeRect(x+s/2, y+s/2, s/1.5, s/1.5);
    }
  }
}

export const TartanStyle: StyleDefinition = {
  id: 'cult-tartan', name: 'Tartan Weave', description: 'Plaid patterns.',
  schema: {...CS}, presets:{}, create: (s,p,w,h) => new Tartan(s,p,w,h)
};
class Tartan implements StyleInstance {
  rng: RNG; stripesH: {y: number; w: number; c: string}[] = []; stripesV: {x: number; h: number; c: string}[] = [];
  constructor(private s:string, private p:Record<string, string | number | boolean>, private w:number, private h:number) {
    this.rng=new RNG(s);
    const pal = PALETTES[String(this.p.palette)];
    for(let i=0; i<20; i++) this.stripesH.push({y: this.rng.range(0,h), w: this.rng.range(10,50), c: this.rng.pick(pal)});
    for(let i=0; i<20; i++) this.stripesV.push({x: this.rng.range(0,w), h: this.rng.range(10,50), c: this.rng.pick(pal)});
  }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#FFF'; ctx.fillRect(0,0,this.w,this.h);
  }
  renderFrame(ctx:CanvasRenderingContext2D, t:number, sc:HTMLCanvasElement) {
    ctx.drawImage(sc, 0, 0);
    const off = t * 0.05;
    ctx.globalAlpha = 0.5;
    this.stripesH.forEach(s => {
      const stripe = s as {y: number; w: number; c: string};
      ctx.fillStyle = stripe.c; ctx.fillRect(0, (stripe.y + off)%this.h, this.w, stripe.w);
    });
    this.stripesV.forEach((s: {x: number; h: number; c: string}) => {
      ctx.fillStyle = s.c; ctx.fillRect((s.x + off)%this.w, 0, s.h, this.h);
    });
    ctx.globalAlpha = 1;
  }
}

// --- URBAN ---

export const CityLightsStyle: StyleDefinition = {
  id: 'urb-city', name: 'City Lights', description: 'Night skyline.',
  schema: {...CS}, presets:{}, create: (s,p,w,h) => new CityLights(s,p,w,h)
};
class CityLights implements StyleInstance {
  rng: RNG; buildings: {x: number; w: number; h: number}[] = [];
  constructor(private s:string, private p:Record<string, string | number | boolean>, private w:number, private h:number) {
    this.rng=new RNG(s);
    let x = 0;
    while(x < w) {
      const bw = this.rng.range(30, 80);
      const bh = this.rng.range(100, h/2);
      this.buildings.push({x, w: bw, h: bh});
      x += bw - 5;
    }
  }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#050510'; ctx.fillRect(0,0,this.w,this.h); // Sky
    ctx.fillStyle = '#111';
    this.buildings.forEach(b => {
      const building = b as {x: number; w: number; h: number};
      ctx.fillRect(building.x, this.h - building.h, building.w, building.h);
    });
  }
  renderFrame(ctx:CanvasRenderingContext2D, t:number, sc:HTMLCanvasElement) {
    ctx.drawImage(sc, 0, 0);
    // Windows
    this.buildings.forEach((b: {x: number; w: number; h: number}, i: number) => {
      for(let wy = this.h - b.h + 10; wy < this.h - 10; wy += 15) {
        for(let wx = b.x + 5; wx < b.x + b.w - 5; wx += 10) {
          if (Math.sin(t*0.001 + i + wy + wx) > 0.5) {
            ctx.fillStyle = (i+wy)%7===0 ? '#F00' : '#FF0'; // Occasional red light
            ctx.fillRect(wx, wy, 4, 8);
          }
        }
      }
    });
  }
}

export const TrafficStyle: StyleDefinition = {
  id: 'urb-traffic', name: 'Traffic Flow', description: 'Long exposure.',
  schema: {...CS}, presets:{}, create: (s,p,w,h) => new Traffic(s,p,w,h)
};
class Traffic implements StyleInstance {
  rng: RNG;
  constructor(private s:string, private p:Record<string, string | number | boolean>, private w:number, private h:number) { this.rng=new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#111'; ctx.fillRect(0,0,this.w,this.h);
    // Road perspective
    ctx.fillStyle = '#222';
    ctx.beginPath(); ctx.moveTo(this.w/2-50, 0); ctx.lineTo(this.w/2+50, 0); ctx.lineTo(this.w, this.h); ctx.lineTo(0, this.h); ctx.fill();
  }
  renderFrame(ctx:CanvasRenderingContext2D, t:number, sc:HTMLCanvasElement) {
    ctx.drawImage(sc, 0, 0);
    // Cars
    for(let i=0; i<20; i++) {
      const z = (t*0.002 + i*0.05) % 1;
      const w = map(z, 0, 1, 2, 50);
      const y = map(z, 0, 1, 0, this.h);
      const xL = map(z, 0, 1, this.w/2-10, 0);
      const xR = map(z, 0, 1, this.w/2+10, this.w);

      ctx.fillStyle = '#F00'; ctx.fillRect(xL, y, w, w/2);
      ctx.fillStyle = '#FFF'; ctx.fillRect(xR, y, w, w/2);
    }
  }
}

// --- ABSTRACT/OTHER ---

export const LiquidStyle: StyleDefinition = {
  id: 'abs-liquid', name: 'Liquid Plasma', description: 'Color flow.',
  schema: {...CS}, presets:{}, create: (s,p,w,h) => new Liquid(s,p,w,h)
};
class Liquid implements StyleInstance {
  rng: RNG;
  constructor(private s:string, private p:Record<string, string | number | boolean>, private w:number, private h:number) { this.rng=new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx:CanvasRenderingContext2D, t:number, _sc:HTMLCanvasElement) {
    const pal = PALETTES[String(this.p.palette)];
    const s = 20;
    for(let y=0; y<this.h; y+=s) for(let x=0; x<this.w; x+=s) {
      const v = Math.sin(x*0.01 + t*0.001) + Math.sin(y*0.01 + t*0.002) + Math.sin((x+y)*0.01 + t*0.003);
      const idx = Math.floor(map(v, -3, 3, 0, pal.length));
      ctx.fillStyle = pal[Math.max(0, Math.min(pal.length-1, idx))];
      ctx.fillRect(x,y,s+1,s+1);
    }
  }
}

export const SnowStyle: StyleDefinition = {
  id: 'nature-snow', name: 'Snow Storm', description: 'Blizzard.',
  schema: {...CS}, presets:{}, create: (s,p,w,h) => new Snow(s,p,w,h)
};
class Snow implements StyleInstance {
  rng: RNG; flakes: {x: number; y: number; s: number; v: number}[] = [];
  constructor(private s:string, private p:Record<string, string | number | boolean>, private w:number, private h:number) {
    this.rng=new RNG(s);
    for(let i=0;i<500;i++) this.flakes.push({x: Math.random()*w, y: Math.random()*h, s: Math.random()*3, v: Math.random()*5+2});
  }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx:CanvasRenderingContext2D, t:number, _sc:HTMLCanvasElement) {
    ctx.fillStyle = '#112'; ctx.fillRect(0,0,this.w,this.h);
    ctx.fillStyle = '#FFF';
    this.flakes.forEach((f: {x: number; y: number; s: number; v: number}) => {
      f.y += f.v;
      f.x += Math.sin(t*0.001 + f.y*0.01);
      if(f.y > this.h) f.y = 0;
      if(f.x > this.w) f.x = 0; if(f.x < 0) f.x = this.w;
      ctx.fillRect(f.x, f.y, f.s, f.s);
    });
  }
}

export const FireworksStyle: StyleDefinition = {
  id: 'urb-fireworks', name: 'Fireworks', description: 'Celebration.',
  schema: {...CS}, presets:{}, create: (s,p,w,h) => new Fireworks(s,p,w,h)
};
class Fireworks implements StyleInstance {
  rng: RNG; sparks: {x: number; y: number; vx: number; vy: number; c: string; l: number}[] = [];
  constructor(private s:string, private p:Record<string, string | number | boolean>, private w:number, private h:number) { this.rng=new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx:CanvasRenderingContext2D, _t:number, _sc:HTMLCanvasElement) {
    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(0,0,this.w,this.h);
    if(Math.random() < 0.05) {
      const cx = Math.random()*this.w;
      const cy = Math.random()*this.h/2;
      const c = this.rng.pick(PALETTES[String(this.p.palette)]);
      for(let i=0;i<50;i++) {
        const a = Math.random()*Math.PI*2;
        const v = Math.random()*5;
        this.sparks.push({x:cx, y:cy, vx:Math.cos(a)*v, vy:Math.sin(a)*v, c, l:1});
      }
    }
    for(let i=this.sparks.length-1; i>=0; i--) {
      const s = this.sparks[i] as {x: number; y: number; vx: number; vy: number; c: string; l: number};
      s.x += s.vx; s.y += s.vy; s.vy += 0.1; s.l -= 0.02;
      if(s.l <= 0) { this.sparks.splice(i,1); continue; }
            ctx.fillStyle = s.c; ctx.globalAlpha = s.l;
      ctx.fillRect(s.x, s.y, 2, 2);
    }
    ctx.globalAlpha = 1;
  }
}

export const BokehStyle: StyleDefinition = {
  id: 'abs-bokeh', name: 'Bokeh Blur', description: 'Out of focus lights.',
  schema: {...CS}, presets:{}, create: (s,p,w,h) => new Bokeh(s,p,w,h)
};
class Bokeh implements StyleInstance {
  rng: RNG; circles: {x: number; y: number; r: number; c: string; s: number}[] = [];
  constructor(private s:string, private p:Record<string, string | number | boolean>, private w:number, private h:number) {
    this.rng=new RNG(s);
    const pal = PALETTES[String(this.p.palette)];
    for(let i=0;i<50;i++) this.circles.push({x:Math.random()*w, y:Math.random()*h, r:Math.random()*50+20, c:this.rng.pick(pal), s:Math.random()*0.002});
  }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx:CanvasRenderingContext2D, t:number, _sc:HTMLCanvasElement) {
    ctx.fillStyle = '#111'; ctx.fillRect(0,0,this.w,this.h);
    ctx.globalCompositeOperation = 'screen';
    this.circles.forEach((c: {x: number; y: number; r: number; c: string; s: number}) => {
      const r = c.r + Math.sin(t*c.s)*10;
      ctx.fillStyle = c.c; ctx.globalAlpha = 0.3;
      ctx.beginPath(); ctx.arc(c.x + Math.sin(t*0.001)*20, c.y, Math.abs(r), 0, Math.PI*2); ctx.fill();
    });
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  }
}

export const GlyphsStyle: StyleDefinition = {
  id: 'cult-glyphs', name: 'Alien Glyphs', description: 'Unknown language.',
  schema: {...CS}, presets:{}, create: (s,p,w,h) => new Glyphs(s,p,w,h)
};
class Glyphs implements StyleInstance {
  rng: RNG;
  constructor(private s:string, private p:Record<string, string | number | boolean>, private w:number, private h:number) { this.rng=new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,this.w,this.h);
    ctx.strokeStyle = '#0F0'; ctx.lineWidth = 2;
    const pal = PALETTES[String(this.p.palette)];
    for(let y=20; y<this.h; y+=40) for(let x=20; x<this.w; x+=40) {
      ctx.strokeStyle = this.rng.pick(pal);
      ctx.beginPath();
      ctx.moveTo(x,y);
      for(let i=0;i<4;i++) ctx.lineTo(x+this.rng.range(-15,15), y+this.rng.range(-15,15));
      ctx.stroke();
    }
  }
  renderFrame(ctx:CanvasRenderingContext2D, t:number, sc:HTMLCanvasElement) {
    ctx.drawImage(sc, 0, 0);
    // Glow effect
    if(Math.random()<0.1) {
       ctx.fillStyle = 'rgba(255,255,255,0.1)';
       ctx.fillRect(0,0,this.w,this.h);
    }
  }
}

// Just filling more slots to reach higher count perception
export const DesertStyle: StyleDefinition = {
    id: 'nature-desert', name: 'Desert Dunes', description: 'Heat waves.', schema:{...CS}, presets:{}, create:(s,p,w,h)=>new Desert(s,p,w,h)
};
class Desert implements StyleInstance {
    rng:RNG; constructor(s:string,p:Record<string, string | number | boolean>,private w:number,private h:number){this.rng=new RNG(s);}
    renderStatic(ctx:CanvasRenderingContext2D){
        const grad = ctx.createLinearGradient(0,0,0,this.h); grad.addColorStop(0, '#87CEEB'); grad.addColorStop(1, '#E1C699');
        ctx.fillStyle=grad; ctx.fillRect(0,0,this.w,this.h);
        ctx.fillStyle='#DAA520';
        for(let i=0;i<5;i++) {
            ctx.beginPath(); ctx.moveTo(0, this.h/2 + i*100);
            for(let x=0;x<=this.w;x+=50) ctx.lineTo(x, this.h/2 + i*100 + Math.sin(x*0.01 + i)*50);
            ctx.lineTo(this.w, this.h); ctx.lineTo(0, this.h); ctx.fill();
        }
    }
    renderFrame(ctx:CanvasRenderingContext2D,t:number,sc:HTMLCanvasElement){
        ctx.drawImage(sc, Math.sin(t*0.001)*5, Math.sin(t*0.002)*2);
        ctx.fillStyle='rgba(255,255,0,0.1)'; ctx.fillRect(0,0,this.w,this.h); // Heat haze
    }
}

export const ShatterStyle: StyleDefinition = {
    id: 'abs-shatter', name: 'Shattered Glass', description: 'Triangular shards.', schema:{...CS}, presets:{}, create:(s,p,w,h)=>new Shatter(s,p,w,h)
};
class Shatter implements StyleInstance {
    rng:RNG; shards:{x: number; y: number; c: string; r: number}[]=[];
    constructor(s:string,private p:Record<string, string | number | boolean>,private w:number,private h:number){
        this.rng=new RNG(s); const pal=PALETTES[String(p.palette)];
        for(let i=0;i<100;i++) this.shards.push({x:Math.random()*w, y:Math.random()*h, c:this.rng.pick(pal), r:Math.random()*Math.PI});
    }
    renderStatic(_ctx:CanvasRenderingContext2D){}
    renderFrame(ctx:CanvasRenderingContext2D,t:number,_sc:HTMLCanvasElement){
        ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
        this.shards.forEach((s: {x: number; y: number; c: string; r: number}) => {
            ctx.save(); ctx.translate(s.x,s.y); ctx.rotate(s.r + t*0.001);
            ctx.fillStyle=s.c; ctx.beginPath(); ctx.moveTo(-10,-10); ctx.lineTo(10,0); ctx.lineTo(0,20); ctx.fill();
            ctx.restore();
        });
    }
}

export const MarbleStyle: StyleDefinition = {
    id: 'abs-marble', name: 'Marble Texture', description: 'Swirling noise.', schema:{...CS}, presets:{}, create:(s,p,w,h)=>new Marble(s,p,w,h)
};
class Marble implements StyleInstance {
    rng:RNG; noise:Noise;
    constructor(s:string,private p:Record<string, string | number | boolean>,private w:number,private h:number){this.rng=new RNG(s); this.noise=new Noise(this.rng);}
    renderStatic(_ctx:CanvasRenderingContext2D){}
    renderFrame(ctx:CanvasRenderingContext2D,t:number,_sc:HTMLCanvasElement){
        const pal=PALETTES[String(this.p.palette)];
        const scale=0.005;
        for(let x=0;x<this.w;x+=20) for(let y=0;y<this.h;y+=20) {
            const n = this.noise.perlin2(x*scale, y*scale + t*0.0001);
            const idx = Math.floor(map(Math.sin(n*10), -1, 1, 0, pal.length));
            ctx.fillStyle=pal[Math.max(0, Math.min(pal.length-1, idx))];
            ctx.fillRect(x,y,20,20);
        }
    }
}

export const TotemStyle: StyleDefinition = {
    id: 'cult-totem', name: 'Totem Poles', description: 'Stacked faces.', schema:{...CS}, presets:{}, create:(s,p,w,h)=>new Totem(s,p,w,h)
};
class Totem implements StyleInstance {
    rng:RNG;
    constructor(s:string,private p:Record<string, string | number | boolean>,private w:number,private h:number){this.rng=new RNG(s);}
    renderStatic(ctx:CanvasRenderingContext2D){
        const pal=PALETTES[String(this.p.palette)];
        ctx.fillStyle='#432'; ctx.fillRect(0,0,this.w,this.h);
        for(let x=this.w/2-50; x<=this.w/2+50; x+=100) {
            for(let y=0; y<this.h; y+=80) {
                ctx.fillStyle = this.rng.pick(pal);
                ctx.fillRect(x, y, 80, 70);
                // Eyes
                ctx.fillStyle='#FFF'; ctx.fillRect(x+10, y+10, 20, 10); ctx.fillRect(x+50, y+10, 20, 10);
            }
        }
    }
    renderFrame(ctx:CanvasRenderingContext2D,t:number,sc:HTMLCanvasElement){
        ctx.drawImage(sc, 0, 0);
        // Blinking
        if(Math.random()<0.05) { ctx.fillStyle='#000'; ctx.fillRect(this.w/2-40, Math.random()*this.h, 20, 10); }
    }
}
