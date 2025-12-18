'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { GameState, Tile, TileType, ToolType, AdvisorResponse } from './types';
import { MAP_SIZE, INITIAL_MONEY, INITIAL_POPULATION, COSTS, TAX_RATE_PER_PERSON, RAIL_MAINTENANCE } from './constants';
import IsometricMap from './components/IsometricMap';
import RetroButton from './components/RetroButton';
import Modal from './components/Modal';
import {
  Train, Home, Hammer, Activity, ArrowLeft,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Landmark, Truck,
  Factory, Trees, ZoomIn, ZoomOut, RotateCw, RotateCcw, Bot, MousePointer
} from 'lucide-react';

const generateInitialMap = (): Tile[][] => {
  const tiles: Tile[][] = [];
  for (let x = 0; x < MAP_SIZE; x++) {
    tiles[x] = [];
    for (let y = 0; y < MAP_SIZE; y++) {
      const isWater = Math.random() > 0.94;
      tiles[x][y] = {
        x,
        y,
        type: isWater ? TileType.WATER : TileType.GRASS,
        height: 0,
        variant: Math.floor(Math.random() * 100),
        population: 0
      };
    }
  }
  return tiles;
};

export default function ATrainRetroSimPage() {
  // State
  const [gameState, setGameState] = useState<GameState>({
    money: INITIAL_MONEY,
    population: INITIAL_POPULATION,
    date: new Date(1994, 3, 1, 9, 0),
    tiles: generateInitialMap(),
    selectedTool: ToolType.INSPECT,
    gameSpeed: 1,
    lastIncome: 0,
  });

  const [cameraOffset, setCameraOffset] = useState({ x: 800, y: 150 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0); // 0, 1, 2, 3
  const [isAutoMode, setIsAutoMode] = useState(false);

  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);
  const [advisorData, setAdvisorData] = useState<AdvisorResponse | null>(null);
  const [isLoadingAdvisor, setIsLoadingAdvisor] = useState(false);

  // --- Autopilot Logic ---
  const runAutopilot = useCallback((currentTiles: Tile[][], currentMoney: number, currentPop: number): { tiles: Tile[][], cost: number, addedPop: number } | null => {
    if (currentMoney < 2000) return null; // Too poor to build

    let attempts = 0;
    const maxAttempts = 50; // More aggressive

    while (attempts < maxAttempts) {
        attempts++;
        const x = Math.floor(Math.random() * MAP_SIZE);
        const y = Math.floor(Math.random() * MAP_SIZE);
        const tile = currentTiles[x][y];

        if (tile.type !== TileType.GRASS) continue;

        // Check Neighbors
        const neighbors = [
            y > 0 ? currentTiles[x][y-1] : null,
            x < MAP_SIZE - 1 ? currentTiles[x+1][y] : null,
            y < MAP_SIZE - 1 ? currentTiles[x][y+1] : null,
            x > 0 ? currentTiles[x-1][y] : null
        ].filter(Boolean) as Tile[];

        const roadNeighbors = neighbors.filter(n => n.type === TileType.ROAD);
        const railNeighbors = neighbors.filter(n => n.type === TileType.RAIL);
        const stationNeighbors = neighbors.filter(n => n.type === TileType.STATION);

        let buildType: TileType | null = null;
        let buildCost = 0;
        let buildPop = 0;

        // Decision Tree
        if (roadNeighbors.length > 0) {
            const roll = Math.random();
            if (roll < 0.4) { buildType = TileType.BUILDING_RES; buildCost = COSTS[TileType.BUILDING_RES]; buildPop = 60; }
            else if (roll < 0.55) { buildType = TileType.BUILDING_COM; buildCost = COSTS[TileType.BUILDING_COM]; buildPop = 250; }
            else if (roll < 0.65) { buildType = TileType.BUILDING_IND; buildCost = COSTS[TileType.BUILDING_IND]; }
            else if (roll < 0.75) { buildType = TileType.PARK; buildCost = COSTS[TileType.PARK]; }
            else { buildType = TileType.ROAD; buildCost = COSTS[TileType.ROAD]; }
        }
        else if (railNeighbors.length > 0) {
            const roll = Math.random();
            if (roll < 0.2 && stationNeighbors.length === 0) {
                buildType = TileType.STATION; buildCost = COSTS[TileType.STATION];
            } else if (roll < 0.8) {
                buildType = TileType.RAIL; buildCost = COSTS[TileType.RAIL];
            }
        }
        else if (stationNeighbors.length > 0) {
            buildType = TileType.ROAD; buildCost = COSTS[TileType.ROAD];
        }
        else if (currentPop > 0 && Math.random() < 0.05) {
             buildType = TileType.ROAD; buildCost = COSTS[TileType.ROAD];
        }

        if (buildType && currentMoney >= buildCost) {
            const newTiles = currentTiles.map(row => [...row]);
            newTiles[x][y] = {
                ...tile,
                type: buildType,
                population: buildPop,
                variant: Math.floor(Math.random() * 100)
            };
            return { tiles: newTiles, cost: buildCost, addedPop: buildPop };
        }
    }
    return null;
  }, []);

  // Game Loop
  useEffect(() => {
    if (gameState.gameSpeed === 0) return;

    const interval = setInterval(() => {
      setGameState(prev => {
        const nextDate = new Date(prev.date.getTime() + 60000 * 60); // +1 hour
        let nextMoney = prev.money;
        let nextPop = prev.population;
        let nextTiles = prev.tiles;
        let lastIncome = prev.lastIncome;

        if (isAutoMode) {
            for(let i=0; i<3; i++) {
               const autoResult = runAutopilot(nextTiles, nextMoney, nextPop);
               if (autoResult) {
                  nextTiles = autoResult.tiles;
                  nextMoney -= autoResult.cost;
                  nextPop += autoResult.addedPop;
               }
            }
        }

        if (nextDate.getDate() !== prev.date.getDate()) {
            const tax = Math.floor(nextPop * TAX_RATE_PER_PERSON);
            let railTiles = 0;
            nextTiles.flat().forEach(t => { if (t.type === TileType.RAIL) railTiles++; });
            const maintenance = railTiles * RAIL_MAINTENANCE;
            lastIncome = tax - maintenance;
            nextMoney += lastIncome;
        }

        return { ...prev, date: nextDate, money: nextMoney, population: nextPop, tiles: nextTiles, lastIncome };
      });
    }, gameState.gameSpeed === 1 ? 1000 : 250);

    return () => clearInterval(interval);
  }, [gameState.gameSpeed, isAutoMode, runAutopilot]);

  // Handlers
  const handleAction = (x: number, y: number) => {
    const currentTile = gameState.tiles[x][y];
    let newType = currentTile.type;
    let cost = 0;
    let addedPop = 0;

    switch (gameState.selectedTool) {
        case ToolType.RAIL:
            if ([TileType.GRASS, TileType.ROAD, TileType.PARK].includes(currentTile.type)) { newType = TileType.RAIL; cost = COSTS[TileType.RAIL]; }
            break;
        case ToolType.ROAD:
             if ([TileType.GRASS, TileType.RAIL, TileType.PARK].includes(currentTile.type)) { newType = TileType.ROAD; cost = COSTS[TileType.ROAD]; }
            break;
        case ToolType.STATION:
             if (currentTile.type === TileType.GRASS) { newType = TileType.STATION; cost = COSTS[TileType.STATION]; }
            break;
        case ToolType.BUILDING_RES:
            if (currentTile.type === TileType.GRASS) { newType = TileType.BUILDING_RES; cost = COSTS[TileType.BUILDING_RES]; addedPop = 50 + Math.floor(Math.random() * 50); }
            break;
        case ToolType.BUILDING_COM:
            if (currentTile.type === TileType.GRASS) { newType = TileType.BUILDING_COM; cost = COSTS[TileType.BUILDING_COM]; addedPop = 200 + Math.floor(Math.random() * 300); }
            break;
        case ToolType.BUILDING_IND:
            if (currentTile.type === TileType.GRASS) { newType = TileType.BUILDING_IND; cost = COSTS[TileType.BUILDING_IND]; }
            break;
        case ToolType.PARK:
            if (currentTile.type === TileType.GRASS) { newType = TileType.PARK; cost = COSTS[TileType.PARK]; }
            break;
        case ToolType.BULLDOZE:
            if (currentTile.type !== TileType.WATER && currentTile.type !== TileType.GRASS) { newType = TileType.GRASS; cost = COSTS[0]; addedPop = -currentTile.population; }
            break;
        case ToolType.INSPECT:
            console.log("Inspect:", currentTile);
            return;
    }

    if (newType !== currentTile.type) {
        if (gameState.money >= cost) {
            setGameState(prev => {
                const newTiles = [...prev.tiles];
                newTiles[x] = [...newTiles[x]];
                newTiles[x][y] = { ...currentTile, type: newType, population: Math.max(0, currentTile.population + addedPop) };
                return { ...prev, tiles: newTiles, money: prev.money - cost, population: Math.max(0, prev.population + addedPop) };
            });
        }
    }
  };

  const consultAdvisor = async () => {
    setAdvisorModalOpen(true);
    setIsLoadingAdvisor(true);
    setAdvisorData(null);

    // Simulate advisor delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generic advisor messages based on game state
    const messages = [
      "Focus on expanding your rail network to connect key stations.",
      "Consider building more residential zones near transport hubs.",
      "Your industrial sector needs attention. Build factories near rail lines.",
      "Parks improve city appeal. Add green spaces between buildings.",
      "Commercial zones thrive near stations with high foot traffic."
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const moods = ['optimistic', 'concerned', 'neutral', 'pleased'];

    setAdvisorData({
      message: randomMessage,
      mood: moods[Math.floor(Math.random() * moods.length)] as 'optimistic' | 'concerned' | 'neutral' | 'pleased'
    });
    setIsLoadingAdvisor(false);
  };

  const moveCamera = (dx: number, dy: number) => {
    setCameraOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const handleRotate = (dir: 1 | -1) => {
      setRotation(prev => {
          let next = prev + dir;
          if (next < 0) next = 3; if (next > 3) next = 0;
          return next;
      });
  };

  // Direct handlers passed to map for gestures
  const handleGesturePan = useCallback((dx: number, dy: number) => {
      setCameraOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
  }, []);

  const handleGestureZoom = useCallback((delta: number) => {
      setZoom(prev => Math.max(0.25, Math.min(4, prev + delta)));
  }, []);

  return (
    // Fixed layout container for mobile viewport stability
    <div className="fixed inset-0 w-screen h-[100dvh] flex flex-col bg-gray-900 font-mono select-none overflow-hidden text-sm sm:text-base">

      {/* --- TOP BAR --- */}
      <div className={`h-10 border-b-2 border-white flex items-center justify-between px-2 text-black z-30 shadow-md transition-colors duration-500 shrink-0 ${isAutoMode ? 'bg-indigo-100' : 'bg-[#EFEFDE]'}`}>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="font-bold text-sm sm:text-lg tracking-wider text-[#000080] italic whitespace-nowrap">
            <span className="md:hidden">A-TRAIN</span>
            <span className="hidden md:inline">A-TRAIN SIMULATION</span>
          </span>
          <RetroButton size="sm" onClick={() => setGameState(p => ({...p, gameSpeed: p.gameSpeed === 0 ? 1 : 0}))} className="text-[10px] sm:text-xs">
            {gameState.gameSpeed === 0 ? "RESUME" : "PAUSE"}
          </RetroButton>
          <RetroButton
            size="sm"
            active={isAutoMode}
            onClick={() => {
                setIsAutoMode(!isAutoMode);
                if (!isAutoMode && gameState.gameSpeed === 0) setGameState(p => ({...p, gameSpeed: 1}));
            }}
            className={`flex items-center gap-1 text-[10px] sm:text-xs ${isAutoMode ? 'border-indigo-500 text-indigo-900' : ''}`}
          >
            <Bot size={12} className="sm:hidden" />
            <Bot size={14} className="hidden sm:inline" />
            <span className="hidden sm:inline">{isAutoMode ? "AUTOPILOT ON" : "AUTOPILOT OFF"}</span>
            <span className="sm:hidden">{isAutoMode ? "AUTO" : "MANUAL"}</span>
          </RetroButton>
          <Link href="/" className="cursor-pointer hover:opacity-70 transition-opacity">
            <RetroButton className="!px-1 sm:!px-2 !py-1">
              <ArrowLeft size={16} />
            </RetroButton>
          </Link>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
            <div className={`hidden sm:block px-2 font-bold ${gameState.lastIncome >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                {gameState.lastIncome >= 0 ? '+' : ''}¥{gameState.lastIncome.toLocaleString()}/day
            </div>
            <div className="bg-black text-green-400 px-2 sm:px-3 py-1 font-mono border-2 border-gray-600 inset-shadow w-24 sm:w-48 text-center text-[10px] sm:text-sm">
             <span className="hidden sm:inline">{gameState.date.getFullYear()}/</span>{gameState.date.getMonth() + 1}/{gameState.date.getDate()} <span className="sm:inline">{gameState.date.getHours().toString().padStart(2, '0')}:00</span>
            </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative flex-col md:flex-row">

        {/* --- DESKTOP LEFT SIDEBAR --- */}
        <div className="hidden md:flex w-44 bg-[#EFEFDE] border-r-2 border-white flex-col p-2 space-y-2 z-10 shadow-lg overflow-y-auto shrink-0">
          <div className="bg-black text-yellow-400 p-2 text-right font-mono mb-2 border-2 border-gray-600 text-sm">
             ¥ {gameState.money.toLocaleString()}
          </div>
          {/* Transport */}
          <div className="text-[10px] font-bold text-gray-500 mb-0.5 border-b border-gray-400">TRANSPORT</div>
          <div className="grid grid-cols-2 gap-1">
            <RetroButton active={gameState.selectedTool === ToolType.RAIL} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.RAIL}))} className="flex flex-col items-center justify-center p-1">
                <Train size={16} /> <span className="text-[9px]">RAIL</span>
            </RetroButton>
            <RetroButton active={gameState.selectedTool === ToolType.STATION} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.STATION}))} className="flex flex-col items-center justify-center p-1">
                <Landmark size={16} /> <span className="text-[9px]">STN</span>
            </RetroButton>
            <RetroButton active={gameState.selectedTool === ToolType.ROAD} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.ROAD}))} className="flex flex-col items-center justify-center p-1 col-span-2">
                <Truck size={16} /> <span className="text-[9px]">ROAD</span>
            </RetroButton>
          </div>
          {/* Buildings */}
          <div className="text-[10px] font-bold text-gray-500 mb-0.5 border-b border-gray-400 mt-2">CITY</div>
          <div className="grid grid-cols-2 gap-1">
            <RetroButton active={gameState.selectedTool === ToolType.BUILDING_RES} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.BUILDING_RES}))} className="flex flex-col items-center justify-center p-1">
                <Home size={16} /> <span className="text-[9px]">RES</span>
            </RetroButton>
            <RetroButton active={gameState.selectedTool === ToolType.BUILDING_COM} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.BUILDING_COM}))} className="flex flex-col items-center justify-center p-1">
                <Home size={16} className="text-blue-800" /> <span className="text-[9px]">COM</span>
            </RetroButton>
            <RetroButton active={gameState.selectedTool === ToolType.BUILDING_IND} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.BUILDING_IND}))} className="flex flex-col items-center justify-center p-1">
                <Factory size={16} className="text-gray-700" /> <span className="text-[9px]">IND</span>
            </RetroButton>
            <RetroButton active={gameState.selectedTool === ToolType.PARK} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.PARK}))} className="flex flex-col items-center justify-center p-1">
                <Trees size={16} className="text-green-700" /> <span className="text-[9px]">PARK</span>
            </RetroButton>
          </div>
          {/* Utils */}
          <div className="text-[10px] font-bold text-gray-500 mb-0.5 border-b border-gray-400 mt-2">TOOLS</div>
          <RetroButton fullWidth active={gameState.selectedTool === ToolType.BULLDOZE} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.BULLDOZE}))} className="flex items-center gap-2 text-xs text-red-900">
            <Hammer size={14} /> Clear
          </RetroButton>
           <RetroButton fullWidth active={gameState.selectedTool === ToolType.INSPECT} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.INSPECT}))} className="flex items-center gap-2 text-xs">
            <MousePointer size={14} /> Inspect
          </RetroButton>
           <div className="mt-auto pt-4">
             <RetroButton fullWidth onClick={consultAdvisor} className="bg-blue-100 border-blue-300">
               <span className="flex items-center justify-center gap-2"><Activity size={14}/> Advisor</span>
             </RetroButton>
           </div>
        </div>

        {/* --- MAIN VIEWPORT --- */}
        <div className="flex-1 relative bg-[#222] overflow-hidden w-full h-full">
          <IsometricMap
            tiles={gameState.tiles}
            onTileClick={handleAction}
            onTileDrag={handleAction}
            selectedTool={gameState.selectedTool}
            cameraOffset={cameraOffset}
            zoom={zoom}
            rotation={rotation}
            onCameraMove={handleGesturePan}
            onZoomChange={handleGestureZoom}
          />

          {/* HUD Overlay */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 items-end pointer-events-none z-10">
             <div className="bg-[#EFEFDE] border-2 border-white px-2 py-1 text-xs shadow-md font-bold text-[#000080]">
                MODE: {gameState.gameSpeed === 0 ? "PAUSED" : gameState.gameSpeed === 1 ? "PLAY" : "FAST FWD"}
             </div>
             <div className="bg-[#EFEFDE] border-2 border-white px-2 py-1 text-xs shadow-md whitespace-nowrap text-black font-bold">
                POPULATION: {gameState.population.toLocaleString()}
             </div>
             {isAutoMode && (
                 <div className="bg-indigo-600 text-white border-2 border-white px-2 py-1 text-xs shadow-md animate-pulse">
                    AUTOPILOT
                 </div>
             )}
          </div>

          {/* --- MOBILE: Floating View Controls (Bottom Right, above toolbar) --- */}
          <div className="md:hidden absolute bottom-4 right-2 flex flex-col gap-2 z-20">
             <div className="flex bg-[#EFEFDE] p-1 border-2 border-white rounded shadow-lg gap-2 opacity-90">
                 <div className="flex flex-col gap-1">
                     <RetroButton onClick={() => handleRotate(1)} className="p-1 h-8 w-8 flex items-center justify-center"><RotateCw size={16}/></RetroButton>
                     <RetroButton onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="p-1 h-8 w-8 flex items-center justify-center"><ZoomOut size={16}/></RetroButton>
                     <RetroButton onClick={() => setZoom(z => Math.min(3, z + 0.25))} className="p-1 h-8 w-8 flex items-center justify-center"><ZoomIn size={16}/></RetroButton>
                 </div>
             </div>
          </div>
        </div>

        {/* --- DESKTOP RIGHT SIDEBAR (Nav) --- */}
        <div className="hidden md:flex w-16 bg-[#EFEFDE] border-l-2 border-white flex-col items-center py-2 z-10 gap-2 shrink-0">
          <div className="text-[9px] font-bold">VIEW</div>
          <div className="flex gap-1">
            <RetroButton onClick={() => handleRotate(-1)} className="p-0.5" title="Rotate Left"><RotateCcw size={14}/></RetroButton>
            <RetroButton onClick={() => handleRotate(1)} className="p-0.5" title="Rotate Right"><RotateCw size={14}/></RetroButton>
          </div>
          <div className="flex gap-1">
             <RetroButton onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="p-0.5"><ZoomOut size={14}/></RetroButton>
             <RetroButton onClick={() => setZoom(z => Math.min(3, z + 0.25))} className="p-0.5"><ZoomIn size={14}/></RetroButton>
          </div>
          <div className="border-t border-gray-400 w-full my-1"></div>
          <div className="grid grid-cols-3 gap-1 mb-4">
            <div></div>
            <RetroButton onClick={() => moveCamera(0, 50)} className="p-0 w-6 h-6 flex items-center justify-center bg-gray-300"><ChevronUp size={12}/></RetroButton>
            <div></div>
            <RetroButton onClick={() => moveCamera(50, 0)} className="p-0 w-6 h-6 flex items-center justify-center bg-gray-300"><ChevronLeft size={12}/></RetroButton>
            <div className="w-6 h-6 bg-gray-700 rounded-full border border-gray-500 shadow-inner flex items-center justify-center text-[8px] text-white">
                {rotation*90}°
            </div>
            <RetroButton onClick={() => moveCamera(-50, 0)} className="p-0 w-6 h-6 flex items-center justify-center bg-gray-300"><ChevronRight size={12}/></RetroButton>
            <div></div>
            <RetroButton onClick={() => moveCamera(0, -50)} className="p-0 w-6 h-6 flex items-center justify-center bg-gray-300"><ChevronDown size={12}/></RetroButton>
          </div>
        </div>

      </div>

      {/* --- MOBILE BOTTOM TOOLBAR --- */}
      <div className="md:hidden h-auto shrink-0 bg-[#EFEFDE] border-t-2 border-white flex flex-col z-30 pb-safe">
          <div className="flex justify-between items-center px-2 py-1 bg-[#dcdccb] border-b border-white text-xs">
              <span className="font-mono text-black font-bold">¥{gameState.money.toLocaleString()}</span>
              <button onClick={consultAdvisor} className="flex items-center gap-1 text-blue-900 font-bold bg-white px-2 border border-gray-400 shadow-sm cursor-pointer">
                  <Activity size={12} /> ADVISOR
              </button>
          </div>
          {/* Scrolling Toolbar */}
          <div className="overflow-x-auto whitespace-nowrap p-2 flex items-center gap-2 no-scrollbar">
            <RetroButton active={gameState.selectedTool === ToolType.INSPECT} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.INSPECT}))} className="flex-shrink-0 flex flex-col items-center p-2 h-16 w-16 justify-center">
                <MousePointer size={20} /> <span className="text-[10px] mt-1">PAN/INS</span>
            </RetroButton>
            <div className="w-px h-10 bg-gray-400 mx-1"></div>
            <RetroButton active={gameState.selectedTool === ToolType.RAIL} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.RAIL}))} className="flex-shrink-0 flex flex-col items-center p-2 h-16 w-16 justify-center">
                <Train size={20} /> <span className="text-[10px] mt-1">RAIL</span>
            </RetroButton>
            <RetroButton active={gameState.selectedTool === ToolType.STATION} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.STATION}))} className="flex-shrink-0 flex flex-col items-center p-2 h-16 w-16 justify-center">
                <Landmark size={20} /> <span className="text-[10px] mt-1">STATION</span>
            </RetroButton>
            <RetroButton active={gameState.selectedTool === ToolType.ROAD} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.ROAD}))} className="flex-shrink-0 flex flex-col items-center p-2 h-16 w-16 justify-center">
                <Truck size={20} /> <span className="text-[10px] mt-1">ROAD</span>
            </RetroButton>
            <div className="w-px h-10 bg-gray-400 mx-1"></div>
            <RetroButton active={gameState.selectedTool === ToolType.BUILDING_RES} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.BUILDING_RES}))} className="flex-shrink-0 flex flex-col items-center p-2 h-16 w-16 justify-center">
                <Home size={20} /> <span className="text-[10px] mt-1">RES</span>
            </RetroButton>
            <RetroButton active={gameState.selectedTool === ToolType.BUILDING_COM} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.BUILDING_COM}))} className="flex-shrink-0 flex flex-col items-center p-2 h-16 w-16 justify-center">
                <Home size={20} className="text-blue-800" /> <span className="text-[10px] mt-1">COM</span>
            </RetroButton>
            <RetroButton active={gameState.selectedTool === ToolType.BUILDING_IND} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.BUILDING_IND}))} className="flex-shrink-0 flex flex-col items-center p-2 h-16 w-16 justify-center">
                <Factory size={20} className="text-gray-700" /> <span className="text-[10px] mt-1">IND</span>
            </RetroButton>
            <RetroButton active={gameState.selectedTool === ToolType.PARK} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.PARK}))} className="flex-shrink-0 flex flex-col items-center p-2 h-16 w-16 justify-center">
                <Trees size={20} className="text-green-700" /> <span className="text-[10px] mt-1">PARK</span>
            </RetroButton>
            <div className="w-px h-10 bg-gray-400 mx-1"></div>
            <RetroButton active={gameState.selectedTool === ToolType.BULLDOZE} onClick={() => setGameState(p => ({...p, selectedTool: ToolType.BULLDOZE}))} className="flex-shrink-0 flex flex-col items-center p-2 h-16 w-16 justify-center text-red-900">
                <Hammer size={20} /> <span className="text-[10px] mt-1">CLEAR</span>
            </RetroButton>
          </div>
      </div>

      {/* --- MODALS --- */}
      <Modal
        title="City Advisor"
        isOpen={advisorModalOpen}
        onClose={() => setAdvisorModalOpen(false)}
      >
        {isLoadingAdvisor ? (
          <div className="flex flex-col items-center p-4">
             <div className="animate-spin h-8 w-8 border-4 border-b-0 border-blue-900 rounded-full mb-4"></div>
             <p className="text-blue-800 animate-pulse">ESTABLISHING UPLINK...</p>
          </div>
        ) : (
          <div>
            <div className="mb-2 font-bold text-blue-900 border-b border-gray-400 pb-1">
              MEMO FROM: SECRETARY
            </div>
            <p className="mb-4 text-base leading-snug font-medium">
              &ldquo;{advisorData?.message || "Transmission interrupted."}&rdquo;
            </p>
            <div className="text-right text-xs text-gray-500 mt-2">
                MOOD: {advisorData?.mood.toUpperCase()}
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
