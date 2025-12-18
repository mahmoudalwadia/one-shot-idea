import { useState, useCallback } from 'react';
import { GameState, Direction, EntityType, TileType, ItemType, Entity, MapData, Stats, PlayerClass } from '../types';
import { INITIAL_MAPS, ITEMS } from '../constants';

const BASE_STATS: Record<PlayerClass, Partial<Stats>> = {
    WARRIOR: { str: 8, dex: 3, int: 2, con: 7, maxHp: 35, hp: 35, attack: 10, defense: 3 },
    ROGUE:   { str: 4, dex: 8, int: 4, con: 4, maxHp: 25, hp: 25, attack: 7, defense: 2 },
    WIZARD:  { str: 2, dex: 5, int: 10, con: 3, maxHp: 20, hp: 20, attack: 5, defense: 1 }
};

const INITIAL_STATE_TEMPLATE: GameState = {
    currentMapId: 1,
    playerPos: { x: 2, y: 2 },
    playerStats: {
        hp: 0, maxHp: 0, sp: 0, maxSp: 10,
        level: 1, gold: 0, attack: 0, defense: 0,
        xp: 0, maxXp: 50,
        str: 0, dex: 0, int: 0, con: 0,
        class: 'WARRIOR'
    },
    inventory: [],
    maps: {},
    gameStatus: 'TITLE',
    log: []
};

// Helper to randomize enemies for game characteristics
const enrichMapsWithCharacteristics = (originalMaps: Record<number, MapData>): Record<number, MapData> => {
    const maps = JSON.parse(JSON.stringify(originalMaps));
    (Object.values(maps) as MapData[]).forEach((map: MapData) => {
        map.entities.forEach((entity: Entity) => {
            if (entity.type === EntityType.ENEMY) {
                // 30% chance for an affix
                if (Math.random() < 0.3) {
                    const roll = Math.random();
                    if (roll < 0.33) {
                        entity.name = `Fierce ${entity.name}`;
                        entity.attack = (entity.attack || 1) + 2;
                        entity.color = 'text-red-500';
                        entity.xpValue = (entity.xpValue || 10) + 5;
                    } else if (roll < 0.66) {
                        entity.name = `Tough ${entity.name}`;
                        entity.maxHp = (entity.maxHp || 10) + 10;
                        entity.hp = entity.maxHp;
                        entity.defense = (entity.defense || 0) + 1;
                        entity.color = 'text-green-600';
                        entity.xpValue = (entity.xpValue || 10) + 5;
                    } else {
                        entity.name = `Swift ${entity.name}`;
                        entity.agility = (entity.agility || 1) + 2;
                        entity.color = 'text-yellow-400';
                        entity.xpValue = (entity.xpValue || 10) + 5;
                    }
                }
            }
        });
    });
    return maps;
};

export const useGame = () => {
  const [state, setState] = useState<GameState>(() => ({
    ...INITIAL_STATE_TEMPLATE,
    maps: enrichMapsWithCharacteristics(INITIAL_MAPS),
    log: ['Welcome to Hero Adventure!', 'Choose your character.']
  }));

  const startGame = () => {
    setState(prev => ({ ...prev, gameStatus: 'CLASS_SELECT' }));
  };

  const selectClass = (cls: PlayerClass) => {
    const base = BASE_STATS[cls];
    const initialInventory = [ITEMS.SWORD_IRON, ITEMS.POTION_HP];

    // Bonus item for classes
    if (cls === 'ROGUE') initialInventory.push(ITEMS.KEY_GOLD);
    if (cls === 'WIZARD') initialInventory.push(ITEMS.GEM);

    setState(prev => ({
        ...prev,
        gameStatus: 'PLAYING',
        inventory: initialInventory,
        playerStats: {
            ...prev.playerStats,
            ...base,
            class: cls,
            hp: base.hp || 20,
            maxHp: base.maxHp || 20,
            // Derived stats
            attack: (base.attack || 0),
            defense: (base.defense || 0),
        },
        log: [`You are a ${cls.toLowerCase()}.`, 'Find the stairs to descend.', ...prev.log].slice(0, 5)
    }));
  };

  const toggleInventory = () => {
    if (state.gameStatus === 'TITLE' || state.gameStatus === 'CLASS_SELECT') return;
    setState(prev => ({
      ...prev,
      gameStatus: prev.gameStatus === 'INVENTORY' ? 'PLAYING' : 'INVENTORY'
    }));
  };

  const movePlayer = useCallback((dir: Direction) => {
    setState(prev => {
      if (prev.gameStatus !== 'PLAYING') return prev;

      const { x, y } = prev.playerPos;
      let newX = x;
      let newY = y;

      switch (dir) {
        case Direction.UP: newY--; break;
        case Direction.DOWN: newY++; break;
        case Direction.LEFT: newX--; break;
        case Direction.RIGHT: newX++; break;
      }

      const currentMap = prev.maps[prev.currentMapId];

      // Bounds check
      if (newY < 0 || newY >= currentMap.height || newX < 0 || newX >= currentMap.width) {
        return prev;
      }

      // Wall check
      const tile = currentMap.tiles[newY][newX];
      if (tile === TileType.WALL) return prev;
      if (tile === TileType.WATER) {
         return prev;
      }

      // Passive Regen (Constitution based)
      // Every step, small chance to heal 1 hp based on CON
      let newStats = { ...prev.playerStats };
      if (newStats.hp < newStats.maxHp && Math.random() < (newStats.con * 0.01)) {
         newStats.hp += 1;
      }

      // Entity check
      const entityIndex = currentMap.entities.findIndex(e => e.x === newX && e.y === newY);

      if (entityIndex !== -1) {
        const entity = currentMap.entities[entityIndex];

        // Handle Interactions
        if (entity.type === EntityType.ENEMY) {
            // Realistic Combat Logic

            // 1. Hit Chance
            // Base 75% + (Attacker Dex * 2.5) - (Defender Agility * 2.5)
            const playerHitChance = 75 + (prev.playerStats.dex * 2.5) - ((entity.agility || 1) * 2.5);
            const isHit = Math.random() * 100 < playerHitChance;

            let newLog = prev.log;
            const newEntities = [...currentMap.entities];

            if (!isHit) {
                newLog = [`You missed ${entity.name}!`, ...newLog];
                // Enemy retaliation logic below
            } else {
                // 2. Damage Calculation
                // Base Atk + (Str * 0.5) +/- 10% variance
                const baseDmg = prev.playerStats.attack + (prev.playerStats.str * 0.5);
                const variance = 0.9 + (Math.random() * 0.2); // 0.9 to 1.1

                // Critical Hit (Dex based)
                const critChance = prev.playerStats.dex * 1.5; // e.g. 10 dex = 15% crit
                const isCrit = Math.random() * 100 < critChance;

                let rawDamage = baseDmg * variance;
                if (isCrit) rawDamage *= 1.5;

                const damage = Math.max(1, Math.floor(rawDamage - (entity.defense || 0)));
                const remainingHp = (entity.hp || 0) - damage;

                newLog = [`${isCrit ? 'CRITICAL! ' : ''}Hit ${entity.name} for ${damage}.`, ...newLog];

                if (remainingHp <= 0) {
                    newEntities.splice(entityIndex, 1);
                    newLog = [`Defeated ${entity.name}! (+${entity.xpValue || 10} XP)`, ...newLog];

                    // Gain XP/Gold
                    const xpGain = entity.xpValue || 10;
                    newStats = {
                        ...newStats,
                        gold: newStats.gold + 5 + Math.floor(Math.random() * 5),
                        xp: newStats.xp + xpGain
                    };

                    // Level Up Logic
                    if (newStats.xp >= newStats.maxXp) {
                       newStats.level += 1;
                       newStats.xp = newStats.xp - newStats.maxXp;
                       newStats.maxXp = Math.floor(newStats.maxXp * 1.5);

                       // Increase Characteristics based on Class
                       if (newStats.class === 'WARRIOR') { newStats.str += 2; newStats.con += 1; }
                       else if (newStats.class === 'ROGUE') { newStats.dex += 2; newStats.str += 1; }
                       else if (newStats.class === 'WIZARD') { newStats.int += 2; newStats.dex += 1; }
                       else { newStats.str++; newStats.dex++; newStats.con++; }

                       // Recalculate derived
                       newStats.maxHp += 5 + Math.floor(newStats.con / 2);
                       newStats.hp = newStats.maxHp;
                       newStats.maxSp += 2 + Math.floor(newStats.int / 2);
                       newStats.sp = newStats.maxSp;

                       // Recalculate Attack/Def (simplified)
                       newStats.attack = 3 + newStats.str;
                       newStats.defense = Math.floor(newStats.dex / 2);

                       newLog = ['Level Up! Stats Increased!', ...newLog];
                    }

                    return {
                        ...prev,
                        playerStats: newStats,
                        maps: { ...prev.maps, [prev.currentMapId]: { ...currentMap, entities: newEntities } },
                        log: newLog.slice(0, 5)
                    };
                } else {
                    newEntities[entityIndex] = { ...entity, hp: remainingHp };
                }
            }

            // Enemy Turn (Retaliation)
            if (newEntities[entityIndex]) { // If enemy still alive
                const enemy = newEntities[entityIndex];

                // Enemy Hit Chance
                // Base 60% + (Enemy Agility * 2) - (Player Dex * 1.5)
                const enemyHitChance = 60 + ((enemy.agility || 1) * 2) - (newStats.dex * 1.5);

                if (Math.random() * 100 < enemyHitChance) {
                     const enemyBaseAtk = enemy.attack || 3;
                     const enemyDmg = Math.max(0, enemyBaseAtk - newStats.defense);

                     newStats.hp = Math.max(0, newStats.hp - enemyDmg);
                     if (enemyDmg > 0) newLog = [`${enemy.name} hits you for ${enemyDmg}!`, ...newLog];
                     else newLog = [`${enemy.name} attacks but glances off armor!`, ...newLog];

                     if (newStats.hp === 0) {
                         return { ...prev, playerStats: { ...newStats, hp: 0 }, gameStatus: 'GAME_OVER', log: ['You died.', ...newLog] };
                     }
                } else {
                    newLog = [`You dodged ${enemy.name}'s attack!`, ...newLog];
                }
            }

            return {
                ...prev,
                playerStats: newStats,
                maps: { ...prev.maps, [prev.currentMapId]: { ...currentMap, entities: newEntities } },
                log: newLog.slice(0, 5)
            };

        } else if (entity.type === EntityType.CHEST) {
             const newEntities = [...currentMap.entities];
             newEntities.splice(entityIndex, 1);
             const loot = Math.random() > 0.5 ? ITEMS.POTION_HP : ITEMS.GEM;
             return {
                 ...prev,
                 playerStats: newStats,
                 inventory: [...prev.inventory, loot],
                 maps: { ...prev.maps, [prev.currentMapId]: { ...currentMap, entities: newEntities } },
                 log: [`Found ${loot.name}!`, ...prev.log].slice(0, 5)
             };
        } else if (entity.type === EntityType.KEY) {
             const newEntities = [...currentMap.entities];
             newEntities.splice(entityIndex, 1);
             return {
                 ...prev,
                 playerStats: newStats,
                 inventory: [...prev.inventory, ITEMS.KEY_GOLD],
                 maps: { ...prev.maps, [prev.currentMapId]: { ...currentMap, entities: newEntities } },
                 log: [`Found a Key!`, ...prev.log].slice(0, 5)
             };
        } else if (entity.type === EntityType.POTION) {
            const newEntities = [...currentMap.entities];
            newEntities.splice(entityIndex, 1);
            return {
                ...prev,
                playerStats: newStats,
                inventory: [...prev.inventory, ITEMS.POTION_HP],
                maps: { ...prev.maps, [prev.currentMapId]: { ...currentMap, entities: newEntities } },
                log: [`Found Potion!`, ...prev.log].slice(0, 5)
            };
        } else if (entity.type === EntityType.STAIRS_DOWN) {
            if (INITIAL_MAPS[prev.currentMapId + 1]) {
                 return {
                     ...prev,
                     playerStats: newStats,
                     currentMapId: prev.currentMapId + 1,
                     playerPos: { x: 2, y: 2 },
                     log: [`Descended to floor ${prev.currentMapId + 1}`, ...prev.log].slice(0, 5)
                 }
            }
        } else if (entity.type === EntityType.STAIRS_UP) {
            if (INITIAL_MAPS[prev.currentMapId - 1]) {
                 return {
                     ...prev,
                     playerStats: newStats,
                     currentMapId: prev.currentMapId - 1,
                     playerPos: { x: 2, y: 2 },
                     log: [`Ascended to floor ${prev.currentMapId - 1}`, ...prev.log].slice(0, 5)
                 }
            }
        }
      }

      return {
        ...prev,
        playerStats: newStats,
        playerPos: { x: newX, y: newY }
      };
    });
  }, []);

  const useItem = (index: number) => {
    setState(prev => {
        const item = prev.inventory[index];
        if (!item) return prev;

        const newStats = { ...prev.playerStats };
        let newLog = prev.log;
        let consumed = false;

        if (item.type === ItemType.CONSUMABLE) {
             if (item.id === 'potion_hp') {
                 newStats.hp = Math.min(newStats.maxHp, newStats.hp + 15);
                 newLog = [`Used Potion (+15HP)`, ...newLog];
                 consumed = true;
             } else if (item.id === 'meat') {
                 newStats.hp = Math.min(newStats.maxHp, newStats.hp + 8);
                 newLog = [`Ate Meat (+8HP)`, ...newLog];
                 consumed = true;
             }
        }

        let newInventory = prev.inventory;
        if (consumed) {
             newInventory = [...prev.inventory];
             newInventory.splice(index, 1);
        }

        return {
            ...prev,
            playerStats: newStats,
            inventory: newInventory,
            log: newLog.slice(0, 5)
        };
    });
  };

  return {
    state,
    movePlayer,
    startGame,
    toggleInventory,
    useItem,
    selectClass
  };
};
