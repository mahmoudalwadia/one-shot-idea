import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Tile, TileType, ToolType } from '../types';
import { TILE_WIDTH, TILE_HEIGHT, COLORS, MAP_SIZE } from '../constants';

interface IsometricMapProps {
  tiles: Tile[][];
  onTileClick: (x: number, y: number) => void;
  onTileDrag: (x: number, y: number) => void;
  selectedTool: ToolType;
  cameraOffset: { x: number, y: number };
  zoom: number;
  rotation: number;
  onCameraMove?: (dx: number, dy: number) => void;
  onZoomChange?: (delta: number) => void;
}

const IsometricMap: React.FC<IsometricMapProps> = ({
  tiles, onTileClick, onTileDrag, selectedTool, cameraOffset, zoom, rotation, onCameraMove, onZoomChange
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredTile, setHoveredTile] = useState<{ x: number, y: number } | null>(null);

  // Interaction State
  const [isInteractionActive, setIsInteractionActive] = useState(false);
  const lastPointerRef = useRef<{x: number, y: number} | null>(null);
  const pinchDistRef = useRef<number | null>(null);
  const isPanningRef = useRef(false); // Track if current interaction is a pan vs a paint

  // --- Helpers ---

  const getUnrotatedCoords = useCallback((rx: number, ry: number) => {
    switch (rotation) {
      case 0: return { x: rx, y: ry };
      case 1: return { x: MAP_SIZE - 1 - ry, y: rx };
      case 2: return { x: MAP_SIZE - 1 - rx, y: MAP_SIZE - 1 - ry };
      case 3: return { x: ry, y: MAP_SIZE - 1 - rx };
      default: return { x: rx, y: ry };
    }
  }, [rotation]);

  const isoToScreen = (rx: number, ry: number) => {
    const tileW = TILE_WIDTH * zoom;
    const tileH = TILE_HEIGHT * zoom;
    return {
      x: (rx - ry) * (tileW / 2) + cameraOffset.x,
      y: (rx + ry) * (tileH / 2) + cameraOffset.y
    };
  };

  const getTileHeight = (tile: Tile) => {
      if (tile.type === TileType.WATER) return -5;
      if (tile.type === TileType.BUILDING_COM) return 50 + (tile.variant % 30);
      if (tile.type === TileType.BUILDING_IND) return 30;
      if (tile.type === TileType.BUILDING_RES) return 20;
      if (tile.type === TileType.STATION) return 10;
      return 0;
  };

  const isPointInPoly = (px: number, py: number, poly: {x: number, y: number}[]) => {
      let inside = false;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
          const xi = poly[i].x, yi = poly[i].y;
          const xj = poly[j].x, yj = poly[j].y;
          const intersect = ((yi > py) !== (yj > py)) &&
              (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
      }
      return inside;
  };

  // --- Drawing Logic (Same as before) ---
  const drawShadow = (ctx: CanvasRenderingContext2D, x: number, y: number, height: number) => {
    const tileW = TILE_WIDTH * zoom;
    const tileH = TILE_HEIGHT * zoom;
    if (height <= 0) return;

    ctx.fillStyle = COLORS.SHADOW;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + tileW, y);
    ctx.lineTo(x + tileW / 2, y + tileH / 2);
    ctx.lineTo(x - tileW / 2, y + tileH / 2);
    ctx.fill();
  };

  const drawCube = (ctx: CanvasRenderingContext2D, x: number, y: number, height: number, colorTop: string, colorRight: string, colorLeft: string) => {
    const tileW = TILE_WIDTH * zoom;
    const tileH = TILE_HEIGHT * zoom;
    const h = height * zoom;

    const gradRight = ctx.createLinearGradient(x, y - h, x + tileW/2, y + tileH/2 - h);
    gradRight.addColorStop(0, colorRight);
    gradRight.addColorStop(1, '#000000');

    const gradLeft = ctx.createLinearGradient(x, y - h, x - tileW/2, y + tileH/2 - h);
    gradLeft.addColorStop(0, colorLeft);
    gradLeft.addColorStop(1, '#222222');

    ctx.fillStyle = colorTop;
    ctx.beginPath();
    ctx.moveTo(x, y - h);
    ctx.lineTo(x + tileW / 2, y + tileH / 2 - h);
    ctx.lineTo(x, y + tileH - h);
    ctx.lineTo(x - tileW / 2, y + tileH / 2 - h);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.stroke();

    if (h > 0) {
      ctx.fillStyle = colorRight;
      ctx.beginPath();
      ctx.moveTo(x, y + tileH - h);
      ctx.lineTo(x + tileW / 2, y + tileH / 2 - h);
      ctx.lineTo(x + tileW / 2, y + tileH / 2);
      ctx.lineTo(x, y + tileH);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = colorLeft;
      ctx.beginPath();
      ctx.moveTo(x, y + tileH - h);
      ctx.lineTo(x - tileW / 2, y + tileH / 2 - h);
      ctx.lineTo(x - tileW / 2, y + tileH / 2);
      ctx.lineTo(x, y + tileH);
      ctx.fill();
      ctx.stroke();
    }
  };

  const drawWindows = (ctx: CanvasRenderingContext2D, x: number, y: number, height: number, variant: number, isInd: boolean) => {
    const tileH = TILE_HEIGHT * zoom;
    const h = height * zoom;
    ctx.fillStyle = Math.random() > 0.9 ? COLORS.BUILDING_WINDOW_ON : COLORS.BUILDING_WINDOW_OFF;
    if (isInd) ctx.fillStyle = '#221111';
    const rows = Math.floor(h / (10 * zoom));
    const w = 4 * zoom;
    const hh = 6 * zoom;
    for(let r=0; r<rows; r++) {
       const yPos = y + tileH - (r * 10 * zoom) - (10 * zoom);
       if (yPos > y + tileH - h) {
         ctx.fillRect(x - (12 * zoom), yPos, w, hh);
         if (!isInd) ctx.fillRect(x - (22 * zoom), yPos - (5 * zoom), w, hh);
       }
    }
    for(let r=0; r<rows; r++) {
       const yPos = y + tileH - (r * 10 * zoom) - (10 * zoom);
       if (yPos > y + tileH - h) {
         ctx.fillRect(x + (8 * zoom), yPos, w, hh);
         if (!isInd) ctx.fillRect(x + (18 * zoom), yPos - (5 * zoom), w, hh);
       }
    }
  };

  const drawTrees = (ctx: CanvasRenderingContext2D, x: number, y: number, variant: number) => {
    const tileW = TILE_WIDTH * zoom;
    const tileH = TILE_HEIGHT * zoom;
    if (variant % 3 === 0) return;
    const count = (variant % 3) + 1;
    for (let i = 0; i < count; i++) {
        const ox = ((variant * (i+1) * 17) % tileW) - tileW/2;
        const oy = ((variant * (i+1) * 13) % tileH) - (5 * zoom);
        ctx.fillStyle = '#3e2723';
        ctx.fillRect(x + ox - (1*zoom), y + oy + tileH/2 - (5*zoom), 2*zoom, 5*zoom);
        ctx.fillStyle = (i % 2 === 0) ? COLORS.TREE_DARK : COLORS.TREE_LIGHT;
        ctx.beginPath();
        const baseY = y + oy + tileH/2 - (5*zoom);
        ctx.moveTo(x + ox, baseY - (15*zoom));
        ctx.lineTo(x + ox + (6*zoom), baseY);
        ctx.lineTo(x + ox - (6*zoom), baseY);
        ctx.fill();
    }
  };

  const drawTile = (ctx: CanvasRenderingContext2D, tile: Tile, rx: number, ry: number, isHovered: boolean) => {
    const { x, y } = isoToScreen(rx, ry);
    const tileW = TILE_WIDTH * zoom;
    const tileH = TILE_HEIGHT * zoom;
    const rawHeight = getTileHeight(tile);

    let topColor = COLORS.GRASS;
    let height = 0;

    if (tile.type === TileType.WATER) { topColor = COLORS.WATER_BASE; height = -5; }
    else if (tile.type === TileType.PARK) { topColor = COLORS.PARK_BASE; }
    if (isHovered) topColor = '#aaddaa';

    ctx.beginPath();
    ctx.moveTo(x, y - height * zoom);
    ctx.lineTo(x + tileW / 2, y + tileH / 2 - height * zoom);
    ctx.lineTo(x, y + tileH - height * zoom);
    ctx.lineTo(x - tileW / 2, y + tileH / 2 - height * zoom);
    ctx.closePath();
    ctx.fillStyle = topColor;
    ctx.fill();

    if (tile.type === TileType.WATER) { ctx.fillStyle = COLORS.WATER; ctx.fill(); }
    ctx.strokeStyle = 'rgba(0,0,0,0.1)'; ctx.stroke();

    if (tile.type === TileType.GRASS) { drawTrees(ctx, x, y, tile.variant); }
    else if (tile.type === TileType.PARK) {
        ctx.strokeStyle = COLORS.PARK_PATH; ctx.lineWidth = 4 * zoom; ctx.beginPath();
        if (tile.variant % 2 === 0) { ctx.moveTo(x - tileW/4, y+tileH/2); ctx.lineTo(x+tileW/4, y+tileH/2); }
        else { ctx.arc(x, y+tileH/2, 5*zoom, 0, Math.PI*2); }
        ctx.stroke(); drawTrees(ctx, x, y, tile.variant + 1);
    }
    else if (tile.type === TileType.RAIL || tile.type === TileType.ROAD) {
        let mask = 0;
        const check = (dx: number, dy: number, bit: number) => {
             const nx = tile.x + dx; const ny = tile.y + dy;
             if (nx >= 0 && nx < MAP_SIZE && ny >= 0 && ny < MAP_SIZE && tiles[nx][ny].type === tile.type) mask |= bit;
        };
        check(0, -1, 1); check(1, 0, 2); check(0, 1, 4); check(-1, 0, 8);
        const rotatedMask = ((mask << rotation) | (mask >> (4 - rotation))) & 0xF;
        const color = tile.type === TileType.RAIL ? COLORS.RAIL : COLORS.ROAD;
        const width = (tile.type === TileType.RAIL ? 4 : 12) * zoom;
        ctx.lineWidth = width; ctx.strokeStyle = color; ctx.lineCap = 'round'; ctx.beginPath();
        const cy = y + tileH/2;
        if (rotatedMask === 0) { ctx.moveTo(x-2*zoom, cy); ctx.lineTo(x+2*zoom, cy); }
        if (rotatedMask & 1) { ctx.moveTo(x, cy); ctx.lineTo(x + tileW / 2, y); }
        if (rotatedMask & 2) { ctx.moveTo(x, cy); ctx.lineTo(x + tileW / 2, y + tileH); }
        if (rotatedMask & 4) { ctx.moveTo(x, cy); ctx.lineTo(x - tileW / 2, y + tileH); }
        if (rotatedMask & 8) { ctx.moveTo(x, cy); ctx.lineTo(x - tileW / 2, y); }
        ctx.stroke();
        if (tile.type === TileType.ROAD && rotatedMask) {
            ctx.lineWidth = 1 * zoom; ctx.strokeStyle = '#fff'; ctx.setLineDash([3*zoom, 3*zoom]);
            ctx.stroke(); ctx.setLineDash([]);
        }
    }
    else if ([TileType.BUILDING_RES, TileType.BUILDING_COM, TileType.BUILDING_IND].includes(tile.type)) {
        const isInd = tile.type === TileType.BUILDING_IND;
        const face = isInd ? COLORS.IND_FACE : COLORS.BUILDING_FACE;
        const side = isInd ? COLORS.IND_SIDE : COLORS.BUILDING_SIDE;
        const roof = isInd ? COLORS.IND_ROOF : COLORS.BUILDING_ROOF;
        drawShadow(ctx, x, y + tileH/2, rawHeight);
        drawCube(ctx, x, y, rawHeight, roof, side, face);
        drawWindows(ctx, x, y, rawHeight, tile.variant, isInd);
        if (isInd) {
            ctx.fillStyle = '#333'; ctx.fillRect(x - 5*zoom, y - (rawHeight*zoom) - 10*zoom, 4*zoom, 10*zoom);
            ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.beginPath(); ctx.arc(x - 3*zoom, y - (rawHeight*zoom) - 15*zoom, 5*zoom, 0, Math.PI*2); ctx.fill();
        }
    }
    else if (tile.type === TileType.STATION) {
        drawShadow(ctx, x, y + tileH/2, 10);
        drawCube(ctx, x, y, 10, '#999', '#777', '#888');
        ctx.fillStyle = COLORS.STATION_ROOF; ctx.beginPath();
        ctx.moveTo(x, y - 25*zoom); ctx.lineTo(x + tileW/2 + 5*zoom, y + tileH/2 - 25*zoom);
        ctx.lineTo(x, y + tileH - 25*zoom); ctx.lineTo(x - tileW/2 - 5*zoom, y + tileH/2 - 25*zoom); ctx.fill();
        ctx.strokeStyle = '#553311'; ctx.lineWidth = 2 * zoom; ctx.beginPath(); ctx.moveTo(x, y-25*zoom); ctx.lineTo(x, y); ctx.stroke();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let rx = 0; rx < MAP_SIZE; rx++) {
      for (let ry = 0; ry < MAP_SIZE; ry++) {
          const { x: tx, y: ty } = getUnrotatedCoords(rx, ry);
          if (tx >= 0 && tx < MAP_SIZE && ty >= 0 && ty < MAP_SIZE) {
              const tile = tiles[tx][ty];
              const isHovered = hoveredTile?.x === tx && hoveredTile?.y === ty;
              drawTile(ctx, tile, rx, ry, isHovered);
          }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiles, hoveredTile, cameraOffset, zoom, rotation]);

  // --- HIT TEST & INPUT ---

  const getHitTile = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const screenX = (clientX - rect.left) * scaleX;
    const screenY = (clientY - rect.top) * scaleY;

    const tileW = TILE_WIDTH * zoom;
    const tileH = TILE_HEIGHT * zoom;
    const boundsPadding = 150 * zoom;

    for (let rx = 0; rx < MAP_SIZE; rx++) {
        for (let ry = 0; ry < MAP_SIZE; ry++) {
            const { x, y } = isoToScreen(rx, ry);
            if (screenX < x - boundsPadding || screenX > x + boundsPadding ||
                screenY < y - boundsPadding || screenY > y + boundsPadding) continue;

            const { x: tx, y: ty } = getUnrotatedCoords(rx, ry);
            if (tx < 0 || tx >= MAP_SIZE || ty < 0 || ty >= MAP_SIZE) continue;

            const tile = tiles[tx][ty];
            const h = getTileHeight(tile) * zoom;
            const p1 = { x: x, y: y - h };
            const p2 = { x: x + tileW/2, y: y + tileH/2 - h };
            const p4 = { x: x - tileW/2, y: y + tileH/2 - h };
            let poly: {x: number, y: number}[];

            if (h <= 0) {
                 poly = [ { x: x, y: y }, { x: x + tileW/2, y: y + tileH/2 }, { x: x, y: y + tileH }, { x: x - tileW/2, y: y + tileH/2 } ];
            } else {
                poly = [ p1, p2, { x: x + tileW/2, y: y + tileH/2 }, { x: x, y: y + tileH }, { x: x - tileW/2, y: y + tileH/2 }, p4 ];
            }
            if (isPointInPoly(screenX, screenY, poly)) return { x: tx, y: ty };
        }
    }
    return null;
  };

  // --- Mouse Handlers (Desktop) ---
  const handleMouseDown = (e: React.MouseEvent) => {
      setIsInteractionActive(true);
      isPanningRef.current = selectedTool === ToolType.INSPECT; // Desktop Inspect = Pan? No, usually Desktop Inspect = Hover/Click, but let's allow Pan via drag?
      // Actually desktop users expect Click to use tool. Panning is done via UI buttons or separate control.
      // Let's stick to tool logic:
      const hit = getHitTile(e.clientX, e.clientY);
      if (hit) onTileClick(hit.x, hit.y);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
      const hit = getHitTile(e.clientX, e.clientY);
      setHoveredTile(hit);
      if (isInteractionActive && hit) onTileDrag(hit.x, hit.y);
  };
  const handleMouseUp = () => setIsInteractionActive(false);

  // --- Touch Handlers (Mobile) ---
  const handleTouchStart = (e: React.TouchEvent) => {
      setIsInteractionActive(true);
      if (e.touches.length === 1) {
          lastPointerRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          // If tool is INSPECT, we default to PAN. Otherwise we default to PAINT,
          // BUT we need to support panning even in paint mode with two fingers.
          isPanningRef.current = selectedTool === ToolType.INSPECT;

          if (!isPanningRef.current) {
              const hit = getHitTile(e.touches[0].clientX, e.touches[0].clientY);
              if (hit) onTileClick(hit.x, hit.y);
          }
      } else if (e.touches.length === 2) {
          isPanningRef.current = true; // Always pan/zoom with 2 fingers
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          pinchDistRef.current = Math.hypot(dx, dy);
          // Midpoint for pan
          lastPointerRef.current = {
              x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
              y: (e.touches[0].clientY + e.touches[1].clientY) / 2
          };
      }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
      // e.preventDefault(); // Handled by CSS touch-action: none
      if (!isInteractionActive) return;

      if (isPanningRef.current && onCameraMove) {
          let cx = 0, cy = 0;
          if (e.touches.length === 1) {
              cx = e.touches[0].clientX;
              cy = e.touches[0].clientY;
          } else if (e.touches.length === 2) {
              cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
              cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;

              // Handle Zoom
              const dx = e.touches[0].clientX - e.touches[1].clientX;
              const dy = e.touches[0].clientY - e.touches[1].clientY;
              const dist = Math.hypot(dx, dy);
              if (pinchDistRef.current && onZoomChange) {
                  const delta = dist - pinchDistRef.current;
                  if (Math.abs(delta) > 10) { // Threshold
                      onZoomChange(delta * 0.005);
                      pinchDistRef.current = dist;
                  }
              }
          }

          if (lastPointerRef.current) {
              const dx = cx - lastPointerRef.current.x;
              const dy = cy - lastPointerRef.current.y;
              // Scale pan speed by zoom to make it feel natural (zoomed in = slower screen movement relative to map?)
              // Actually map moves 1:1 with finger usually.
              onCameraMove(dx, dy);
              lastPointerRef.current = { x: cx, y: cy };
          }
      } else {
          // Painting/Dragging Tile
          if (e.touches.length === 1) {
             const hit = getHitTile(e.touches[0].clientX, e.touches[0].clientY);
             if (hit) {
                 setHoveredTile(hit); // Mobile doesn't usually hover, but good for internal logic
                 onTileDrag(hit.x, hit.y);
             }
          }
      }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
      if (e.touches.length === 0) {
          setIsInteractionActive(false);
          pinchDistRef.current = null;
      }
  };

  return (
    <canvas
      ref={canvasRef}
      width={1600}
      height={900}
      className="w-full h-full cursor-crosshair bg-black block touch-none select-none"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => { setHoveredTile(null); setIsInteractionActive(false); }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  );
};

export default IsometricMap;
