import { RNG } from './rng';

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
export const map = (v: number, iMin: number, iMax: number, oMin: number, oMax: number) => 
  oMin + (v - iMin) * (oMax - oMin) / (iMax - iMin);

export class Noise {
  private perm: number[] = [];
  constructor(rng: RNG) {
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const r = Math.floor(rng.next() * (i + 1));
      [p[i], p[r]] = [p[r], p[i]];
    }
    this.perm = new Array(512);
    for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255];
  }

  private fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
  private grad(hash: number, x: number, y: number) {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  public perlin2(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = this.fade(x);
    const v = this.fade(y);
    const A = this.perm[X] + Y, B = this.perm[X + 1] + Y;
    return lerp(
      lerp(this.grad(this.perm[A], x, y), this.grad(this.perm[B], x - 1, y), u),
      lerp(this.grad(this.perm[A + 1], x, y - 1), this.grad(this.perm[B + 1], x - 1, y - 1), u),
      v
    );
  }
}

export const PALETTES: Record<string, string[]> = {
  'Primary Chaos': ['#FF0033', '#0066FF', '#00CC44', '#FFCC00', '#FFFFFF', '#000000'],
  'Cool': ['#00FFFF', '#0066FF', '#6600FF', '#CC00FF', '#FFFFFF', '#111122'],
  'Warm': ['#FF3300', '#FF9900', '#FFCC00', '#CC3333', '#FFFFEE', '#220000'],
  'Mono+Accent': ['#FFFFFF', '#CCCCCC', '#888888', '#FF0000', '#111111'],
  'Neon': ['#FF00FF', '#00FFFF', '#FFFF00', '#FF0000', '#0000FF'],
  'Earth': ['#A0522D', '#CD853F', '#DEB887', '#556B2F', '#8B4513'],
  'Pastel': ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'],
  'Darkwave': ['#1a1a2e', '#16213e', '#0f3460', '#e94560', '#533483'],
  'Cyberpunk': ['#fcee0a', '#00f0ff', '#ff003c', '#05001a', '#711c91'],
  'Forest': ['#2d4c1e', '#4a7c59', '#8ba88e', '#c0d6c0', '#3e2723'],
  'Ocean': ['#006994', '#00bcd4', '#e0f7fa', '#004d40', '#1a237e'],
  'Retro': ['#e4c1f9', '#a9def9', '#d0f4de', '#fcf6bd', '#ff99c8']
};

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function rgbToHex(r: number, g: number, b: number) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}