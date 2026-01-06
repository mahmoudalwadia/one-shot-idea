import { PatternDefinition } from '../types';

const hash = (x: number, y: number, z: number = 0) => {
  const h = Math.sin(x * 12.9898 + y * 78.233 + z * 43.545) * 43758.5453;
  return h - Math.floor(h);
};

// Smooth interpolation for noise
const interpolate = (a: number, b: number, t: number) => a + (b - a) * (t * t * (3 - 2 * t));

const noise = (x: number, y: number) => {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;

  const n00 = hash(ix, iy);
  const n10 = hash(ix + 1, iy);
  const n01 = hash(ix, iy + 1);
  const n11 = hash(ix + 1, iy + 1);

  return interpolate(
    interpolate(n00, n10, fx),
    interpolate(n01, n11, fx),
    fy
  );
};

const fbm = (x: number, y: number, octaves = 3) => {
  let val = 0;
  let amp = 1;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    val += noise(x * freq, y * freq) * amp;
    amp *= 0.5;
    freq *= 2.1;
  }
  return val;
};

export const patterns: PatternDefinition[] = [
  {
    id: 'digital-mosaic',
    name: 'Digital Mosaic',
    description: 'A dense, glitchy grid of varying square forms. Interactive: Interaction creates ripples of activity.',
    category: 'Geometric',
    draw: (ctx, w, h, t, s, m) => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);
      const baseSize = 6, cols = Math.ceil(w / baseSize), rows = Math.ceil(h / baseSize);
      const timeFactor = Math.floor(t * 0.003 * s), skipped = new Set<string>();
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (skipped.has(`${x},${y}`)) continue;

          const px = x * baseSize;
          const py = y * baseSize;
          const dist = Math.sqrt((px - m.x) ** 2 + (py - m.y) ** 2);
          const mouseEffect = Math.max(0, 1 - dist / 150);

          const n = hash(x, y, timeFactor);
          if (n > 0.4 - (mouseEffect * 0.3)) {
            let size = 1;
            if (n > 0.97 - (mouseEffect * 0.05)) size = 4;
            else if (n > 0.9 - (mouseEffect * 0.1)) size = 2;

            if (size > 1) {
              for (let sy = 0; sy < size; sy++) {
                for (let sx = 0; sx < size; sx++) {
                  if (sx !== 0 || sy !== 0) skipped.add(`${x + sx},${y + sy}`);
                }
              }
            }
            const brightness = Math.floor(hash(x, y, timeFactor + 500) * 255);
            const alpha = (0.4 + hash(x, y, timeFactor + 600) * 0.6) * (m.active ? 1.5 : 1.0);
            ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${alpha})`;
            ctx.fillRect(px, py, size * baseSize - 1.2, size * baseSize - 1.2);

            if (mouseEffect > 0.5) {
              ctx.fillStyle = `rgba(255, 255, 255, ${mouseEffect * 0.2})`;
              ctx.fillRect(px, py, size * baseSize - 1.2, size * baseSize - 1.2);
            }
          }
        }
      }
    }
  },
  {
    id: 'lattice-rings',
    name: 'Lattice Rings',
    description: 'A precise array of monochromatic rings. Interactive: Rings pulse and expand near the pointer.',
    category: 'Geometric',
    draw: (ctx, w, h, t, s, m) => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);
      const cellSize = 16;
      const radius = 5.5;
      const cols = Math.ceil(w / cellSize);
      const rows = Math.ceil(h / cellSize);
      const timeFactor = Math.floor(t * 0.005 * s);
      ctx.lineWidth = 1.2;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * cellSize + cellSize / 2;
          const py = y * cellSize + cellSize / 2;
          const dist = Math.sqrt((px - m.x) ** 2 + (py - m.y) ** 2);
          const influence = Math.max(0, 1 - dist / 120);

          const flicker = hash(x, y, timeFactor);
          const baseVariation = hash(x, y);
          const alpha = Math.pow(baseVariation, 2.5) * 0.4 + (flicker * 0.5) + (influence * 0.4);

          if (alpha > 0.05) {
            const currentRadius = radius + (influence * 8 * (m.active ? 1.5 : 1));
            ctx.beginPath();
            ctx.arc(px, py, currentRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(0.9, alpha)})`;
            ctx.stroke();
          }
        }
      }
    }
  },
  {
    id: 'cobalt-matrix',
    name: 'Cobalt Matrix',
    description: 'Vibrant procedural grid of dot clusters. Interactive: Pointer reveals and shifts the hidden motifs.',
    category: 'Structure',
    draw: (ctx, w, h, t, s, m) => {
      ctx.fillStyle = '#2431f7';
      ctx.fillRect(0, 0, w, h);
      const timeFactor = Math.floor(t * 0.0005 * s);
      const cols = 5;
      const rows = 4;
      const cellW = w / cols;
      const cellH = h / rows;
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const x0 = cx * cellW;
          const y0 = cy * cellH;
          const dist = Math.sqrt((x0 + cellW / 2 - m.x) ** 2 + (y0 + cellH / 2 - m.y) ** 2);
          const mousePush = Math.max(0, 1 - dist / 200);

          const seed = hash(cx, cy, timeFactor + (mousePush > 0.5 && m.active ? 10 : 0));
          const type = Math.floor(seed * 7);
          const rectW = cellW * (0.8 + hash(cx, cy, 1) * 0.4);
          const rectH = cellH * (0.8 + hash(cx, cy, 2) * 0.4);

          ctx.save();
          ctx.beginPath();
          ctx.rect(x0, y0, rectW, rectH);
          ctx.clip();
          ctx.fillStyle = `rgba(255, 255, 255, ${0.95 + mousePush * 0.05})`;

          const shift = mousePush * 10;
          if (type === 1) {
            const step = 14; const r = 5.5 + shift;
            for (let y = y0; y < y0 + rectH + step; y += step) {
              for (let x = x0; x < x0 + rectW + step; x += step) {
                ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
              }
            }
          } else if (type === 2) {
            const step = 4.5; const r = 1 + mousePush;
            for (let y = y0; y < y0 + rectH + step; y += step) {
              for (let x = x0; x < x0 + rectW + step; x += step) {
                ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
              }
            }
          } else if (type === 3) {
            const step = 12; ctx.lineWidth = 1.5; ctx.strokeStyle = 'white';
            for (let y = y0; y < y0 + rectH + step; y += step) {
              for (let x = x0; x < x0 + rectW + step; x += step) {
                ctx.beginPath(); ctx.moveTo(x - 3 - shift, y - 3 - shift); ctx.lineTo(x + 3 + shift, y + 3 + shift); ctx.moveTo(x + 3 + shift, y - 3 - shift); ctx.lineTo(x - 3 - shift, y + 3 + shift); ctx.stroke();
              }
            }
          } else {
            const step = 9; const r = 2.5 + shift * 0.5;
            for (let y = y0; y < y0 + rectH + step; y += step) {
              for (let x = x0; x < x0 + rectW + step; x += step) {
                ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
              }
            }
          }
          ctx.restore();
        }
      }
    }
  },
  {
    id: 'perspective-void',
    name: 'Perspective Void',
    description: 'A structural tunnel. Interactive: The vanishing point follows the pointer.',
    category: 'Geometric',
    draw: (ctx, w, h, t, s, m) => {
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, w, h);

      const centerX = m.x === -1000 ? w / 2 : m.x;
      const centerY = m.y === -1000 ? h / 2 : m.y;

      const cols = 5;
      const rows = 9;
      const cellW = w / cols;
      const cellH = h / rows;
      const layers = 15;
      const timeOffset = (t * 0.001 * s) % 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 0.8;
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const tx = cx * cellW + cellW / 2;
          const ty = cy * cellH + cellH / 2;
          for (let i = 0; i < layers; i++) {
            const rawProgress = (i / layers + timeOffset) % 1;
            const progress = Math.pow(rawProgress, 2);
            const rectW = cellW * 0.8 * progress;
            const rectH = cellH * 0.8 * progress;
            const drawX = centerX + (tx - centerX) * progress;
            const drawY = centerY + (ty - centerY) * progress;
            ctx.globalAlpha = progress * 0.8;
            ctx.beginPath();
            ctx.rect(drawX - rectW / 2, drawY - rectH / 2, rectW, rectH);
            ctx.stroke();
            if (i === layers - 1) {
                ctx.beginPath();
                ctx.moveTo(drawX - rectW/2, drawY - rectH/2);
                ctx.lineTo(centerX + (tx - centerX) * (progress * 0.9), centerY + (ty - centerY) * (progress * 0.9));
                ctx.stroke();
            }
          }
        }
      }
      ctx.globalAlpha = 1.0;
    }
  },
  {
    id: 'infinite-corridor',
    name: 'Infinite Corridor',
    description: 'A retro wireframe tunnel. Interactive: Shift the corridor focus with your movement.',
    category: 'Geometric',
    draw: (ctx, w, h, t, s, m) => {
      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, w, h);
      const centerX = m.x === -1000 ? w / 2 : w / 2 + (m.x - w / 2) * 0.3;
      const centerY = m.y === -1000 ? h / 2 : h / 2 + (m.y - h / 2) * 0.3;
      const timeFactor = (t * 0.0005 * s) % 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      const lines = 24;
      for (let i = 0; i < lines; i++) {
        const xPos = (i / lines) * w * 2 - w/2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(xPos, -h);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(xPos, h * 2);
        ctx.stroke();
      }
      const layers = 20;
      for (let i = 0; i < layers; i++) {
        const progress = (i / layers + timeFactor) % 1;
        const scale = Math.pow(progress, 3);
        const rectW = w * scale * 2;
        const rectH = h * scale * 2;
        ctx.strokeStyle = `rgba(255, 255, 255, ${progress * 0.6})`;
        ctx.lineWidth = 1 + progress * 2;
        ctx.beginPath();
        ctx.rect(centerX - rectW / 2, centerY - rectH / 2, rectW, rectH);
        ctx.stroke();
      }
    }
  },
  {
    id: 'event-horizon',
    name: 'Event Horizon',
    description: 'A celestial singularity warping spacetime. Interactive: Drag the singularity across the stars.',
    category: 'Geometric',
    draw: (ctx, w, h, t, s, m) => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);
      const focalX = m.x === -1000 ? w * 0.8 : m.x;
      const focalY = m.y === -1000 ? h * 0.75 : m.y;
      const timeFactor = t * 0.0002 * s;
      const starCount = 300;
      for (let i = 0; i < starCount; i++) {
        const sx = hash(i, 1) * w;
        const sy = hash(i, 2) * h;
        const size = hash(i, 3) * 1.5;
        const twinkle = (Math.sin(timeFactor * 10 + i * 5) * 0.5 + 0.5) * 0.6 + 0.4;
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 0.8;
      const ribs = 16;
      for (let i = 0; i < ribs; i++) {
        const angle = (i / ribs) * Math.PI * 2;
        const dist = Math.max(w, h) * 2;
        const endX = focalX + Math.cos(angle) * dist;
        const endY = focalY + Math.sin(angle) * dist;
        ctx.beginPath();
        ctx.moveTo(focalX, focalY);
        const cpX = (focalX + endX) / 2 + Math.cos(angle + 0.2) * 200;
        const cpY = (focalY + endY) / 2 + Math.sin(angle + 0.2) * 200;
        ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        ctx.stroke();
      }
      const rings = 20;
      for (let i = 1; i <= rings; i++) {
        const progress = Math.pow(i / rings, 1.8);
        const radiusX = w * 2.5 * progress;
        const radiusY = h * 2.5 * progress;
        ctx.save();
        ctx.translate(focalX, focalY);
        ctx.rotate(0.2 + (m.active ? t * 0.001 : 0));
        ctx.beginPath();
        ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }
  },
  {
    id: 'scribble-chaos',
    name: 'Scribble Chaos',
    description: 'Hand-drawn energetic field. Interactive: Pointer attracts the chaos and intensifies energy.',
    category: 'Organic',
    draw: (ctx, w, h, t, s, m) => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);
      const timeFactor = t * 0.0003 * s;
      const gridSize = 120;
      const cols = Math.ceil(w / gridSize);
      const rows = Math.ceil(h / gridSize);
      const strokesPerCell = 140;
      ctx.lineWidth = 0.5;
      for (let gy = -1; gy <= rows; gy++) {
        for (let gx = -1; gx <= cols; gx++) {
          for (let i = 0; i < strokesPerCell; i++) {
            const strokeSeed = hash(gx, gy, i);
            let x = gx * gridSize + hash(strokeSeed, 1) * gridSize;
            let y = gy * gridSize + hash(strokeSeed, 2) * gridSize;

            const dist = Math.sqrt((x - m.x) ** 2 + (y - m.y) ** 2);
            const attract = Math.max(0, 1 - dist / 300);

            const drift = Math.sin(timeFactor + strokeSeed * 10) * 2;
            x += drift + (m.x - x) * attract * (m.active ? 0.2 : 0.05);
            y += drift + (m.y - y) * attract * (m.active ? 0.2 : 0.05);

            const brightness = 180 + hash(strokeSeed, 3) * 75;
            const alpha = (0.1 + hash(strokeSeed, 4) * 0.3) * (1 + attract * 2);
            ctx.strokeStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(x, y);
            let curX = x;
            let curY = y;
            const segments = 2 + Math.floor(hash(strokeSeed, 5) * 4);
            for (let j = 0; j < segments; j++) {
              const length = 10 + hash(strokeSeed, 6, j) * 50;
              const angle = hash(strokeSeed, 7, j) * Math.PI * 2 + (attract * Math.PI);
              curX += Math.cos(angle) * length;
              curY += Math.sin(angle) * length;
              ctx.lineTo(curX, curY);
            }
            ctx.stroke();
          }
        }
      }
    }
  },
  {
    id: 'terrain-contours',
    name: 'Terrain Contours',
    description: 'Topographic map. Interactive: Deform the landscape with your touch.',
    category: 'Organic',
    draw: (ctx, w, h, t, s, m) => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);

      const timeFactor = t * 0.00005 * s;
      const res = 12;
      const cols = Math.ceil(w / res);
      const rows = Math.ceil(h / res);
      const zoom = 0.0015;

      const getVal = (x: number, y: number) => {
        const v = fbm(x * zoom, y * zoom + timeFactor, 4);
        const dist = Math.sqrt((x - m.x) ** 2 + (y - m.y) ** 2);
        const influence = Math.max(0, 1 - dist / 150);
        return v + influence * (m.active ? -0.3 : 0.2);
      };

      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          const x = ix * res;
          const y = iy * res;

          const v00 = getVal(x, y);
          const v10 = getVal(x + res, y);
          const v01 = getVal(x, y + res);
          const v11 = getVal(x + res, y + res);

          const levels = 22;
          for (let l = 1; l < levels; l++) {
            const threshold = l / levels;
            let mask = 0;
            if (v00 > threshold) mask |= 8;
            if (v10 > threshold) mask |= 4;
            if (v11 > threshold) mask |= 2;
            if (v01 > threshold) mask |= 1;

            if (mask > 0 && mask < 15) {
              const isIndex = l % 5 === 0;
              ctx.lineWidth = isIndex ? 1.2 : 0.6;
              ctx.strokeStyle = isIndex ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.35)';
              ctx.beginPath();
              if (mask === 8 || mask === 7) { ctx.moveTo(x, y + res/2); ctx.lineTo(x + res/2, y); }
              else if (mask === 4 || mask === 11) { ctx.moveTo(x + res/2, y); ctx.lineTo(x + res, y + res/2); }
              else if (mask === 2 || mask === 13) { ctx.moveTo(x + res, y + res/2); ctx.lineTo(x + res/2, y + 10); }
              else if (mask === 1 || mask === 14) { ctx.moveTo(x + res/2, y + res); ctx.lineTo(x, y + res/2); }
              else if (mask === 12 || mask === 3) { ctx.moveTo(x, y + res/2); ctx.lineTo(x + res, y + res/2); }
              else if (mask === 6 || mask === 9) { ctx.moveTo(x + res/2, y); ctx.lineTo(x + res/2, y + res); }
              ctx.stroke();
            }
          }
        }
      }
    }
  },
  {
    id: 'violet-vortices',
    name: 'Violet Vortices',
    description: 'Swirling fluid patterns. Interactive: Pointer creates local turbulence and rotation.',
    category: 'Organic',
    draw: (ctx, w, h, t, s, m) => {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#0a0a0c');
      bgGrad.addColorStop(1, '#1a1226');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);
      const timeFactor = t * 0.00012 * s;
      const cellSize = 110;
      const cols = Math.ceil(w / (cellSize * 0.75)) + 2;
      const rows = Math.ceil(h / (cellSize * 0.6)) + 2;
      ctx.lineCap = 'round';
      for (let iy = -1; iy < rows; iy++) {
        for (let ix = -1; ix < cols; ix++) {
          const xOffset = (iy % 2) * (cellSize * 0.4);
          const cx = ix * (cellSize * 0.8) + xOffset;
          const cy = iy * (cellSize * 0.6);
          const dist = Math.sqrt((cx - m.x) ** 2 + (cy - m.y) ** 2);
          const influence = Math.max(0, 1 - dist / 250);

          const seed = hash(ix, iy);
          ctx.save();
          ctx.translate(cx, cy);
          const driftX = Math.cos(timeFactor + seed * 8) * 12 + (m.x - cx) * influence * 0.2;
          const driftY = Math.sin(timeFactor + seed * 5) * 8 + (m.y - cy) * influence * 0.2;
          ctx.translate(driftX, driftY);
          const rot = hash(seed, 3) * Math.PI * 2 + Math.sin(timeFactor * 0.2) * 0.1 + influence * (m.active ? Math.PI : 1);
          ctx.rotate(rot);
          const lineCount = 10 + Math.floor(hash(seed, 4) * 8);
          const spacing = 4.2;
          for (let i = 0; i < lineCount; i++) {
            const r = 12 + i * spacing;
            const progress = i / lineCount;
            const yNormalized = (cy + driftY) / h;
            const alpha = (0.12 + (1 - progress) * 0.58) * (1 + influence);
            const hue = 262 + (yNormalized * 30);
            const lightness = 32 + (yNormalized * 22) - (progress * 18);
            ctx.strokeStyle = `hsla(${hue}, 68%, ${lightness}%, ${Math.min(1, alpha)})`;
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            const startAngle = -Math.PI * 0.25 + Math.sin(timeFactor * 0.3 + seed * 10) * 0.4;
            const length = Math.PI * (1.2 + hash(seed, 5) * 0.6);
            ctx.arc(0, 0, r, startAngle, startAngle + length);
            ctx.stroke();
          }
          ctx.restore();
        }
      }
    }
  },
  {
    id: 'warped-topography',
    name: 'Warped Topography',
    description: '3D wireframe terrain. Interactive: Manipulate the terrain height with your movement.',
    category: 'Structure',
    draw: (ctx, w, h, t, s, m) => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, w, h);
      const timeFactor = t * 0.00015 * s;
      const gridCols = 45;
      const gridRows = 85;
      const cellW = w / (gridCols - 1);
      const cellH = h / (gridRows - 1);
      const points: {x: number, y: number}[][] = [];
      const elevationScale = 140;
      const noiseZoom = 0.003;
      for (let iy = 0; iy < gridRows; iy++) {
        points[iy] = [];
        for (let ix = 0; ix < gridCols; ix++) {
          const baseX = ix * cellW;
          const baseY = iy * cellH;
          const e = fbm(baseX * noiseZoom, baseY * noiseZoom + timeFactor, 3);
          const distToCenter = Math.abs(baseX - w/2) / (w/2);
          const edgeBias = Math.pow(distToCenter, 1.5) * 1.5;

          const mDist = Math.sqrt((baseX - m.x) ** 2 + (baseY - m.y) ** 2);
          const mInfluence = Math.max(0, 1 - mDist / 200);

          const elevation = (e * elevationScale * edgeBias) + (mInfluence * elevationScale * (m.active ? -0.8 : 0.4));
          const px = baseX + (e - 0.5) * 35;
          const py = baseY - elevation;
          points[iy][ix] = { x: px, y: py };
        }
      }
      ctx.lineWidth = 0.55;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      for (let iy = 0; iy < gridRows; iy++) {
        ctx.beginPath(); ctx.moveTo(points[iy][0].x, points[iy][0].y);
        for (let ix = 1; ix < gridCols; ix++) ctx.lineTo(points[iy][ix].x, points[iy][ix].y);
        ctx.stroke();
      }
      for (let ix = 0; ix < gridCols; ix++) {
        ctx.beginPath(); ctx.moveTo(points[0][ix].x, points[0][ix].y);
        for (let iy = 1; iy < gridRows; iy++) ctx.lineTo(points[iy][ix].x, points[iy][ix].y);
        ctx.stroke();
      }
    }
  },
  {
    id: 'chromatic-halftone',
    name: 'Chromatic Halftone',
    description: 'Pixel-precise fluid simulation. Interactive: Swirl colors and disrupt the grid.',
    category: 'Algorithmic',
    draw: (ctx, w, h, t, s, m) => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      const cellSize = 5.5;
      const cols = Math.ceil(w / cellSize);
      const rows = Math.ceil(h / cellSize);
      const timeFactor = t * 0.0001 * s;
      ctx.fillStyle = '#e5e5e5';
      const bgStep = 3;
      for (let iy = 0; iy < h; iy += bgStep * 2) {
        for (let ix = 0; ix < w; ix += bgStep * 2) {
          ctx.fillRect(ix, iy, bgStep, bgStep);
          ctx.fillRect(ix + bgStep, iy + bgStep, bgStep, bgStep);
        }
      }
      const noiseZoom = 0.0025;
      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          const cx = ix * cellSize;
          const cy = iy * cellSize;
          const dist = Math.sqrt((cx - m.x) ** 2 + (cy - m.y) ** 2);
          const influence = Math.max(0, 1 - dist / 150);

          const n1 = fbm(cx * noiseZoom, cy * noiseZoom + timeFactor + influence, 3);
          const n2 = fbm(cx * noiseZoom + 50, cy * noiseZoom + timeFactor + 10 - influence, 3);
          const val = n1;
          const val2 = n2;
          let color = '';
          if (val > 0.85 - influence * 0.2) color = '#ff3333'; else if (val > 0.78 - influence * 0.2) color = '#ffff00'; else if (val > 0.72 - influence * 0.2) color = '#00ff00'; else if (val > 0.65 - influence * 0.2) color = '#00bbff'; else if (val > 0.60 - influence * 0.2) color = '#4444ff';
          if (!color && val2 > 0.8 - influence * 0.1) color = '#ff00ff'; else if (!color && val2 > 0.75 - influence * 0.1) color = '#aaaaaa';
          if (color) {
            ctx.fillStyle = color;
            const dotSize = cellSize * (0.8 + hash(ix, iy, 1) * 0.2) + influence * 2;
            ctx.fillRect(cx + (cellSize - dotSize)/2, cy + (cellSize - dotSize)/2, dotSize - 0.5, dotSize - 0.5);
          }
        }
      }
    }
  },
  {
    id: 'ivory-topography',
    name: 'Ivory Topography',
    description: 'Minimalist topographic map. Interactive: Subtle elevation changes near the pointer.',
    category: 'Organic',
    draw: (ctx, w, h, t, s, m) => {
      ctx.fillStyle = '#fdfcf8';
      ctx.fillRect(0, 0, w, h);
      const timeFactor = t * 0.000035 * s;
      const res = 10;
      const cols = Math.ceil(w / res);
      const rows = Math.ceil(h / res);
      const zoom = 0.0012;
      const getVal = (x: number, y: number) => {
        const v = fbm(x * zoom, y * zoom + timeFactor, 5);
        const dist = Math.sqrt((x - m.x) ** 2 + (y - m.y) ** 2);
        const influence = Math.max(0, 1 - dist / 120);
        return v + influence * 0.15;
      };
      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          const x = ix * res;
          const y = iy * res;
          const v00 = getVal(x, y);
          const v10 = getVal(x + res, y);
          const v01 = getVal(x, y + res);
          const v11 = getVal(x + res, y + res);
          const levels = 28;
          for (let l = 1; l < levels; l++) {
            const threshold = l / levels;
            let mask = 0;
            if (v00 > threshold) mask |= 8;
            if (v10 > threshold) mask |= 4;
            if (v11 > threshold) mask |= 2;
            if (v01 > threshold) mask |= 1;
            if (mask > 0 && mask < 15) {
              const isIndex = l % 5 === 0;
              ctx.lineWidth = isIndex ? 0.9 : 0.45;
              ctx.strokeStyle = isIndex ? 'rgba(30, 30, 30, 0.65)' : 'rgba(50, 50, 50, 0.22)';
              ctx.beginPath();
              if (mask === 8 || mask === 7) { ctx.moveTo(x, y + res/2); ctx.lineTo(x + res/2, y); }
              else if (mask === 4 || mask === 11) { ctx.moveTo(x + res/2, y); ctx.lineTo(x + res, y + res/2); }
              else if (mask === 2 || mask === 13) { ctx.moveTo(x + res, y + res/2); ctx.lineTo(x + res/2, y + res); }
              else if (mask === 1 || mask === 14) { ctx.moveTo(x + res/2, y + res); ctx.lineTo(x, y + res/2); }
              else if (mask === 12 || mask === 3) { ctx.moveTo(x, y + res/2); ctx.lineTo(x + res, y + res/2); }
              else if (mask === 6 || mask === 9) { ctx.moveTo(x + res/2, y); ctx.lineTo(x + res/2, y + res); }
              ctx.stroke();
            }
          }
        }
      }
    }
  },
  {
    id: 'structural-void',
    name: 'Structural Void',
    description: 'Hyper-detailed 3D coordinate system. Interactive: Warp the grid structure around your movement.',
    category: 'Structure',
    draw: (ctx, w, h, t, s, m) => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);
      const centerX = w / 2;
      const centerY = h / 2;
      const timeFactor = (t * 0.00015 * s) % 1;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 0.5;
      const layers = 15;
      const gridRes = 8;

      for (let i = 0; i <= gridRes; i++) {
        const ratio = i / gridRes - 0.5;
        const tx = centerX + ratio * w * 8;
        const ty = centerY + ratio * h * 8;

        ctx.beginPath(); ctx.moveTo(centerX, centerY); ctx.lineTo(tx, -h); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(centerX, centerY); ctx.lineTo(tx, h * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(centerX, centerY); ctx.lineTo(-w, ty); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(centerX, centerY); ctx.lineTo(w * 2, ty); ctx.stroke();
      }
      for (let i = 0; i < layers; i++) {
        const progress = (i / layers + timeFactor) % 1;
        const scale = Math.pow(progress, 3) * 14;
        if (scale < 0.01) continue;
        const rw = w * scale;
        const rh = h * scale;
        const lx = centerX - rw / 2;
        const ly = centerY - rh / 2;

        const alpha = Math.min(progress * 1.3, 0.75);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
        ctx.lineWidth = 0.5 + progress;

        for (let gy = 0; gy <= gridRes; gy++) {
          for (let gx = 0; gx <= gridRes; gx++) {
            let nx = lx + rw * (gx / gridRes);
            let ny = ly + rh * (gy / gridRes);

            const dist = Math.sqrt((nx - m.x) ** 2 + (ny - m.y) ** 2);
            const warp = Math.max(0, 1 - dist / 150);
            nx += (nx - m.x) * warp * 0.5;
            ny += (ny - m.y) * warp * 0.5;

            if (gx === 0) ctx.beginPath();
            if (gx === 0) ctx.moveTo(nx, ny); else ctx.lineTo(nx, ny);
            if (gx === gridRes) ctx.stroke();
          }
        }

        for (let gx = 0; gx <= gridRes; gx++) {
          for (let gy = 0; gy <= gridRes; gy++) {
            let nx = lx + rw * (gx / gridRes);
            let ny = ly + rh * (gy / gridRes);

            const dist = Math.sqrt((nx - m.x) ** 2 + (ny - m.y) ** 2);
            const warp = Math.max(0, 1 - dist / 150);
            nx += (nx - m.x) * warp * 0.5;
            ny += (ny - m.y) * warp * 0.5;

            if (gy === 0) ctx.beginPath();
            if (gy === 0) ctx.moveTo(nx, ny); else ctx.lineTo(nx, ny);
            if (gy === gridRes) ctx.stroke();

            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * (1 + warp)})`;
            ctx.beginPath();
            ctx.arc(nx, ny, 0.8 + progress * 1.6 + warp * 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }
  },
  {
    id: 'luminous-caustics',
    name: 'Luminous Caustics',
    description: 'Light refracting through water. Interactive: Pointer creates new waves and disruptions.',
    category: 'Organic',
    draw: (ctx, w, h, t, s, m) => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);

      const time = t * 0.0006 * s;
      const step = 6;

      for (let y = 0; y < h + step; y += step) {
        for (let x = 0; x < w + step; x += step) {
           let nx = x * 0.0055;
           let ny = y * 0.0055;

           const dist = Math.sqrt((x - m.x) ** 2 + (y - m.y) ** 2);
           const ripple = Math.sin(dist * 0.05 - time * 5) * Math.max(0, 1 - dist / 300);

           for(let i = 1; i < 4; i++) {
             nx += (0.4 / i * Math.sin(i * 1.5 * ny + time)) + ripple * 0.1;
             ny += (0.4 / i * Math.sin(i * 1.5 * nx + time)) + ripple * 0.1;
           }

           let val = Math.sin(nx * 8 + ny * 8);
           val = Math.pow(Math.max(0, val), 14.0);

           if (val > 0.01) {
             const alpha = Math.min(val * 1.1 + ripple * 0.5, 1.0);
             ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
             ctx.fillRect(x, y, step, step);
           }
        }
      }
    }
  }
];
