import React from 'react';
import { Entity, EntityType, GameState, PlayerClass, TileType } from '../types';
import { THEMES, VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from '../constants';

interface Props {
  state: GameState;
}

export const Viewport: React.FC<Props> = ({ state }) => {
  const { currentMapId, maps, playerPos, playerStats } = state;
  const currentMap = maps[currentMapId];

  // Safety check: if map doesn't exist, don't render
  if (!currentMap) {
    return (
      <div className="relative aspect-[4/3] w-full max-w-3xl md:max-h-[75vh] md:w-auto mx-auto lg:border-8 border-4 border-white bg-black shadow-2xl overflow-hidden flex items-center justify-center">
        <p className="text-white text-xl">Loading map...</p>
      </div>
    );
  }

  const theme = THEMES[currentMap.theme];

  // Calculate viewport offset to center player
  const startX = Math.max(0, Math.min(playerPos.x - Math.floor(VIEWPORT_WIDTH / 2), currentMap.width - VIEWPORT_WIDTH));
  const startY = Math.max(0, Math.min(playerPos.y - Math.floor(VIEWPORT_HEIGHT / 2), currentMap.height - VIEWPORT_HEIGHT));

  // Fix offset if map is smaller than viewport
  const safeStartX = currentMap.width < VIEWPORT_WIDTH ? 0 : startX;
  const safeStartY = currentMap.height < VIEWPORT_HEIGHT ? 0 : startY;

  const renderTile = (x: number, y: number, globalX: number, globalY: number) => {
    // Determine content
    const tileType = (globalY >= 0 && globalY < currentMap.height && globalX >= 0 && globalX < currentMap.width) 
      ? currentMap.tiles[globalY][globalX] 
      : TileType.WALL; // Out of bounds is wall

    // Find entity at this position
    const entity = currentMap.entities.find(e => e.x === globalX && e.y === globalY);
    const isPlayer = playerPos.x === globalX && playerPos.y === globalY;

    let bgClass = theme.floor;
    if (tileType === TileType.WALL) bgClass = theme.wall;
    if (tileType === TileType.WATER) bgClass = theme.water;

    // Visual Variations for walls/floors (simple noise based on coords)
    const noise = (globalX + globalY) % 3 === 0;

    return (
      <div 
        key={`${x}-${y}`} 
        className={`w-full h-full relative flex items-center justify-center ${bgClass} border-[0.5px] border-black/20 overflow-hidden`}
      >
        {/* Wall Detail */}
        {tileType === TileType.WALL && noise && (
          <div className="absolute inset-2 bg-black/10"></div>
        )}
        
        {/* Floor Detail */}
        {tileType === TileType.FLOOR && !noise && (
          <div className="absolute w-1 h-1 bg-white/5 rounded-full"></div>
        )}

        {/* Entities */}
        {entity && <EntityRenderer entity={entity} />}
        
        {/* Player */}
        {isPlayer && (
          <div className="relative z-20 drop-shadow-md animate-pulse">
             <PlayerRenderer playerClass={playerStats.class} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`relative aspect-[4/3] w-full max-w-3xl md:max-h-[75vh] md:w-auto mx-auto lg:border-8 border-4 ${theme.border} bg-black shadow-2xl overflow-hidden`}>
       {/* Decorative Corners */}
       <div className="absolute top-0 left-0 w-8 h-8 border-r-4 border-b-4 border-black z-30 bg-transparent opacity-50"></div>
       <div className="absolute top-0 right-0 w-8 h-8 border-l-4 border-b-4 border-black z-30 bg-transparent opacity-50"></div>
       <div className="absolute bottom-0 left-0 w-8 h-8 border-r-4 border-t-4 border-black z-30 bg-transparent opacity-50"></div>
       <div className="absolute bottom-0 right-0 w-8 h-8 border-l-4 border-t-4 border-black z-30 bg-transparent opacity-50"></div>

      <div 
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${VIEWPORT_WIDTH}, 1fr)`,
          gridTemplateRows: `repeat(${VIEWPORT_HEIGHT}, 1fr)`
        }}
      >
        {Array.from({ length: VIEWPORT_HEIGHT }).map((_, y) => (
          Array.from({ length: VIEWPORT_WIDTH }).map((_, x) => (
            renderTile(x, y, safeStartX + x, safeStartY + y)
          ))
        ))}
      </div>
    </div>
  );
};

const PlayerRenderer: React.FC<{ playerClass: PlayerClass }> = ({ playerClass }) => {
  let emoji = '😐';
  switch (playerClass) {
    case 'WARRIOR': emoji = '🛡️'; break;
    case 'ROGUE': emoji = '🥷'; break;
    case 'WIZARD': emoji = '🧙'; break;
  }
  return (
    <div className="text-xl md:text-3xl filter drop-shadow-lg leading-none transform transition-transform cursor-pointer">
      {emoji}
    </div>
  );
};

const EntityRenderer: React.FC<{ entity: Entity }> = ({ entity }) => {
    let icon = entity.icon || '❓';
    if (!entity.icon) {
        if (entity.type === EntityType.POTION) icon = '🧪';
        if (entity.type === EntityType.KEY) icon = '🔑';
        if (entity.type === EntityType.CHEST) icon = '📦';
        if (entity.type === EntityType.STAIRS_DOWN || entity.type === EntityType.STAIRS_UP) icon = '🚪';
    }

    return (
        <div className={`text-lg md:text-2xl filter drop-shadow-md leading-none ${entity.type === EntityType.ENEMY ? 'animate-bounce' : ''}`} style={{ animationDuration: '2s' }}>
            {icon}
        </div>
    );
};