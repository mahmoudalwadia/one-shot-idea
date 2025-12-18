import { StyleDefinition, StyleInstance } from '../types';
import { RNG } from '../utils/rng';
import { PALETTES } from '../utils/math';

const commonSchema = {
  palette: { type: 'select' as const, label: 'Palette', default: 'Cyberpunk', options: Object.keys(PALETTES) },
};

// 21. Matrix
export const MatrixStyle: StyleDefinition = {
  id: 'retro-matrix', name: 'Matrix Rain', description: 'Falling code.',
  schema: { ...commonSchema }, presets: {},
  create: (s, p, w, h) => new MatrixInstance(s, p, w, h)
};
class MatrixInstance implements StyleInstance {
  rng: RNG; drops: number[] = [];
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s);
    for(let i=0; i<w/20; i++) this.drops[i] = Math.random()*h;
  }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, _t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='rgba(0,0,0,0.1)'; ctx.fillRect(0,0,this.w,this.h);
    ctx.fillStyle='#0F0'; ctx.font='20px monospace';
    this.drops.forEach((y, i) => {
      const char = String.fromCharCode(0x30A0 + Math.random()*96);
      ctx.fillText(char, i*20, y);
      if(y > this.h && Math.random() > 0.975) this.drops[i] = 0;
      this.drops[i] += 20;
    });
  }
}

// 22. VHS
export const VHSStyle: StyleDefinition = {
  id: 'retro-vhs', name: 'VHS Tracking', description: 'Tracking distortion.',
  schema: { ...commonSchema }, presets: {},
  create: (s, p, w, h) => new VHSInstance(s, p, w, h)
};
class VHSInstance implements StyleInstance {
  rng: RNG;
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
    ctx.fillStyle='#FFF'; ctx.font='100px sans-serif'; ctx.textAlign='center';
    ctx.fillText('PLAY', this.w/2, this.h/2);
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, sc: HTMLCanvasElement) {
    ctx.drawImage(sc, 0, 0);
    const y = (t*0.1)%this.h;
    const h = 50;
    const shift = (Math.random()-0.5)*50;
    ctx.drawImage(sc, 0, y, this.w, h, shift, y, this.w, h);
    ctx.fillStyle='rgba(255,255,255,0.1)';
    for(let i=0;i<this.h;i+=4) if(Math.random()>0.5) ctx.fillRect(0,i,this.w,2);
  }
}

// 23. ASCII
export const ASCIIStyle: StyleDefinition = {
  id: 'retro-ascii', name: 'ASCII Art', description: 'Noise characters.',
  schema: { ...commonSchema }, presets: {},
  create: (s, p, w, h) => new ASCIIInstance(s, p, w, h)
};
class ASCIIInstance implements StyleInstance {
  rng: RNG; chars = " .:-=+*#%@";
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s); }
  renderStatic(_ctx: CanvasRenderingContext2D) {}
  renderFrame(ctx: CanvasRenderingContext2D, t: number, _sc: HTMLCanvasElement) {
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
    ctx.fillStyle='#FFF'; ctx.font='12px monospace';
    for(let y=0; y<this.h; y+=12) for(let x=0; x<this.w; x+=8) {
      const n = (Math.sin(x*0.01 + t*0.001) + Math.cos(y*0.01 + t*0.002) + 2)/4;
      const idx = Math.floor(n * this.chars.length);
      ctx.fillText(this.chars[idx], x, y);
    }
  }
}

// 24. Radar
export const RadarStyle: StyleDefinition = {
  id: 'retro-radar', name: 'Radar Scan', description: 'Sweeping line.',
  schema: { ...commonSchema }, presets: {},
  create: (s, p, w, h) => new RadarInstance(s, p, w, h)
};
class RadarInstance implements StyleInstance {
  rng: RNG; blips: {a: number; r: number}[] = [];
  constructor(private s: string, private p: Record<string, string | number | boolean>, private w: number, private h: number) { this.rng = new RNG(s);
    for(let i=0;i<10;i++) this.blips.push({a:Math.random()*Math.PI*2, r:Math.random()*this.w/2});
  }
  renderStatic(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle='#001'; ctx.fillRect(0,0,this.w,this.h);
    ctx.strokeStyle='#0F0'; ctx.lineWidth=1;
    for(let r=50;r<this.w/2;r+=50) { ctx.beginPath(); ctx.arc(this.w/2,this.h/2,r,0,Math.PI*2); ctx.stroke(); }
  }
  renderFrame(ctx: CanvasRenderingContext2D, t: number, sc: HTMLCanvasElement) {
    ctx.drawImage(sc, 0, 0);
    const a = t*0.002;
    ctx.strokeStyle='#0F0'; ctx.beginPath(); ctx.moveTo(this.w/2, this.h/2);
    ctx.lineTo(this.w/2 + Math.cos(a)*this.w, this.h/2 + Math.sin(a)*this.w); ctx.stroke();

    this.blips.forEach((b: {a: number; r: number}) => {
      const diff = (a - b.a + Math.PI*4)%(Math.PI*2);
      if(diff < 0.2) {
        ctx.fillStyle='#0F0'; ctx.beginPath(); ctx.arc(this.w/2 + Math.cos(b.a)*b.r, this.h/2 + Math.sin(b.a)*b.r, 5, 0, Math.PI*2); ctx.fill();
      }
    });
  }
}

// 25. Terminal
export const TerminalStyle: StyleDefinition = { id:'retro-term', name:'Terminal CLI', description:'Logs.', schema:{...commonSchema}, presets:{}, create:(s,p,w,h)=>new TermInstance(s,p,w,h) };
class TermInstance implements StyleInstance {
  rng:RNG; lines:string[]=[];
  constructor(private s:string,private p:Record<string, string | number | boolean>,private w:number,private h:number){this.rng=new RNG(s);}
  renderStatic(_ctx:CanvasRenderingContext2D){}
  renderFrame(ctx:CanvasRenderingContext2D,_t:number,_sc:HTMLCanvasElement){
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
    ctx.fillStyle='#0F0'; ctx.font='14px monospace';
    if(Math.random()>0.8) this.lines.push(`> PROCESS_ID_${Math.floor(Math.random()*9999)}`);
    if(this.lines.length>40) this.lines.shift();
    this.lines.forEach((l,i)=>ctx.fillText(l, 20, i*20+20));
  }
}

// 26. Life
export const LifeStyle: StyleDefinition = { id:'retro-life', name:'Game of Life', description:'Conway.', schema:{...commonSchema}, presets:{}, create:(s,p,w,h)=>new LifeInstance(s,p,w,h) };
class LifeInstance implements StyleInstance {
  rng:RNG; grid:boolean[]=[]; gw=90; gh=120;
  constructor(private s:string,private p:Record<string, string | number | boolean>,private w:number,private h:number){this.rng=new RNG(s); for(let i=0;i<this.gw*this.gh;i++) this.grid[i]=Math.random()>0.5;}
  renderStatic(_ctx:CanvasRenderingContext2D){}
  renderFrame(ctx:CanvasRenderingContext2D,t:number,_sc:HTMLCanvasElement){
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
    const ng = [...this.grid];
    for(let y=1;y<this.gh-1;y++) for(let x=1;x<this.gw-1;x++) {
      let n=0;
      for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++) if(dx!==0||dy!==0) if(this.grid[(y+dy)*this.gw+(x+dx)]) n++;
      const i=y*this.gw+x;
      if(this.grid[i]) ng[i] = n===2||n===3; else ng[i] = n===3;
      if(ng[i]) { ctx.fillStyle='#FFF'; ctx.fillRect(x*10,y*10,8,8); }
    }
    if(t%10===0) this.grid=ng;
  }
}

// 27. Equalizer
export const EqualizerStyle: StyleDefinition = { id:'retro-eq', name:'Equalizer', description:'Bars.', schema:{...commonSchema}, presets:{}, create:(s,p,w,h)=>new EqInstance(s,p,w,h) };
class EqInstance implements StyleInstance {
  rng:RNG;
  constructor(private s:string,private p:Record<string, string | number | boolean>,private w:number,private h:number){this.rng=new RNG(s);}
  renderStatic(_ctx:CanvasRenderingContext2D){}
  renderFrame(ctx:CanvasRenderingContext2D,t:number,_sc:HTMLCanvasElement){
    ctx.fillStyle='#000'; ctx.fillRect(0,0,this.w,this.h);
    const bars=20; const w=this.w/bars;
    for(let i=0;i<bars;i++) {
      const h = Math.abs(Math.sin(t*0.005 + i))*this.h;
      ctx.fillStyle = `hsl(${i*10}, 100%, 50%)`;
      ctx.fillRect(i*w, this.h-h, w-2, h);
    }
  }
}

// 28. BSOD
export const BSODStyle: StyleDefinition = { id:'retro-bsod', name:'BSOD', description:'Error.', schema:{...commonSchema}, presets:{}, create:(s,p,w,h)=>new BSODInstance(s,p,w,h) };
class BSODInstance implements StyleInstance {
  rng:RNG;
  constructor(private s:string,private p:Record<string, string | number | boolean>,private w:number,private h:number){this.rng=new RNG(s);}
  renderStatic(ctx:CanvasRenderingContext2D){ctx.fillStyle='#00F';ctx.fillRect(0,0,this.w,this.h); ctx.fillStyle='#FFF'; ctx.font='40px monospace'; ctx.fillText('FATAL ERROR', 50, 100);}
  renderFrame(ctx:CanvasRenderingContext2D,t:number,sc:HTMLCanvasElement){
    ctx.drawImage(sc,0,0);
    if(Math.random()>0.9) { ctx.fillStyle='#FFF'; ctx.fillRect(Math.random()*this.w, Math.random()*this.h, 100, 20); }
  }
}

// 29. Synth
export const SynthStyle: StyleDefinition = { id:'retro-synth', name:'Synthwave Sun', description:'Retro sun.', schema:{...commonSchema}, presets:{}, create:(s,p,w,h)=>new SynthInstance(s,p,w,h) };
class SynthInstance implements StyleInstance {
  rng:RNG;
  constructor(private s:string,private p:Record<string, string | number | boolean>,private w:number,private h:number){this.rng=new RNG(s);}
  renderStatic(ctx:CanvasRenderingContext2D){ctx.fillStyle='#200020'; ctx.fillRect(0,0,this.w,this.h);}
  renderFrame(ctx:CanvasRenderingContext2D,t:number,sc:HTMLCanvasElement){
    ctx.drawImage(sc,0,0);
    const sunY = this.h/2;
    const grad = ctx.createLinearGradient(0,0,0,this.h); grad.addColorStop(0,'#F0F'); grad.addColorStop(1,'#0FF');
    ctx.fillStyle=grad; ctx.beginPath(); ctx.arc(this.w/2, sunY, 150, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle='#200020';
    for(let i=0;i<10;i++) {
      const y = sunY + i*15 + (t*0.05)%15;
      if(y < sunY+150 && y > sunY-150) ctx.fillRect(this.w/2-150, y, 300, 5);
    }
    // Grid
    ctx.strokeStyle='#F0F'; ctx.beginPath();
    for(let x=0;x<this.w;x+=50) { ctx.moveTo(x, this.h/2); ctx.lineTo((x-this.w/2)*4+this.w/2, this.h); }
    for(let y=this.h/2;y<this.h;y+=20) { ctx.moveTo(0,y); ctx.lineTo(this.w,y); }
    ctx.stroke();
  }
}

// 30. RPG
export const RPGStyle: StyleDefinition = { id:'retro-rpg', name:'8-bit RPG', description:'Tiles.', schema:{...commonSchema}, presets:{}, create:(s,p,w,h)=>new RPGInstance(s,p,w,h) };
class RPGInstance implements StyleInstance {
  rng:RNG; map:number[]=[];
  constructor(private s:string,private p:Record<string, string | number | boolean>,private w:number,private h:number){this.rng=new RNG(s); for(let i=0;i<2000;i++) this.map[i]=this.rng.rangeInt(0,3);}
  renderStatic(ctx:CanvasRenderingContext2D){
    const colors=['#00F', '#FF0', '#0F0'];
    for(let y=0;y<this.h/20;y++) for(let x=0;x<this.w/20;x++) {
      ctx.fillStyle=colors[this.map[y*45+x]%3]; ctx.fillRect(x*20,y*20,20,20);
    }
  }
  renderFrame(ctx:CanvasRenderingContext2D,t:number,sc:HTMLCanvasElement){
    ctx.drawImage(sc,0,0);
    ctx.fillStyle='#F00'; ctx.fillRect(this.w/2, this.h/2, 20, 20); // Hero
  }
}
