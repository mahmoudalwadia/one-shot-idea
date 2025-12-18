'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import HandController from './components/HandController';
import InfoPanel from './components/InfoPanel';
import { HandData, SimulationState, StarPhase } from './types';
import { Move3d, Maximize2, Hand, AlertTriangle, RotateCcw, ArrowLeft } from 'lucide-react';

// Dynamically import SupernovaScene with no SSR
const SupernovaScene = dynamic(() => import('./components/SupernovaScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="text-white text-xl">Loading 3D Scene...</div>
    </div>
  ),
});

const INITIAL_STATE: SimulationState = {
    phase: StarPhase.STABLE,
    coreTemperature: 15000000,
    mass: 15,
    expansionVelocity: 0
};

export default function SupernovaPage() {
  // --- State ---
  // UI State (for rendering)
  const [handData, setHandData] = useState<HandData>({ x: 0, y: 0, z: 0, pinchDistance: 1, isPresent: false });
  const [simState, setSimState] = useState<SimulationState>(INITIAL_STATE);
  const [rebirthProgress, setRebirthProgress] = useState(0);
  const [resetKey, setResetKey] = useState(0); // Used to force-remount 3D scene on reset

  // Physics State Refs (for the game loop - Single Source of Truth for Logic)
  const handDataRef = useRef<HandData>({ x: 0, y: 0, z: 0, pinchDistance: 1, isPresent: false });
  const simStateRef = useRef<SimulationState>(INITIAL_STATE);
  const rebirthProgressRef = useRef(0);
  const implosionTimerRef = useRef(0);

  // --- Hand Handler ---
  const handleHandUpdate = (data: HandData) => {
    setHandData(data);
    handDataRef.current = data;
  };

  // --- Helper: Reset ---
  const resetSimulation = () => {
    console.log("Resetting Simulation...");

    // 1. Reset Logic State Refs
    simStateRef.current = { ...INITIAL_STATE };
    rebirthProgressRef.current = 0;
    implosionTimerRef.current = 0;

    // 2. Reset UI State
    setSimState({ ...INITIAL_STATE });
    setRebirthProgress(0);

    // 3. Force Visual Reset (Respawn Particles)
    setResetKey(prev => prev + 1);
  };

  // --- Main Simulation Loop ---
  useEffect(() => {
    const interval = setInterval(() => {
        // 1. Get Current Physics State
        const currentSim = { ...simStateRef.current };
        const currentHand = handDataRef.current;
        let newTemp = currentSim.coreTemperature;
        let newPhase = currentSim.phase;

        // --- STAR PHYSICS LOGIC ---

        // 1. Stable Phase
        if (currentSim.phase === StarPhase.STABLE) {
           newTemp += 10000;
           // Natural progression to Unstable
           if (newTemp > 50000000) newPhase = StarPhase.UNSTABLE;

           // Hand: Squeezing heats it up faster
           if (currentHand.isPresent && currentHand.pinchDistance < 0.5) {
               newTemp += 2000000 * (1 - currentHand.pinchDistance);
           }
        }
        // 2. Unstable Phase
        else if (currentSim.phase === StarPhase.UNSTABLE) {
           newTemp += 50000;

           if (currentHand.isPresent) {
               // Pinching (Crushing) triggers Supernova
               if (currentHand.pinchDistance < 0.4) {
                   newTemp += 8000000 * (1 - currentHand.pinchDistance);
               }
               // Expanding cools/stabilizes
               else if (currentHand.pinchDistance > 0.7) {
                   newTemp -= 100000;
               }
           }

           if (newTemp > 300000000) { // Threshold
               newPhase = StarPhase.IMPLODING;
               implosionTimerRef.current = 0;
           }
        }
        // 3. Imploding Phase
        else if (currentSim.phase === StarPhase.IMPLODING) {
           implosionTimerRef.current += 1;
           newTemp += 5000000;

           // ~3 seconds duration
           if (implosionTimerRef.current > 60) {
               newPhase = StarPhase.SUPERNOVA;
           }
        }
        // 4. Supernova Phase
        else if (currentSim.phase === StarPhase.SUPERNOVA) {
           newTemp *= 0.99; // Slow decay for longer effect
           if (newTemp < 1000000) newPhase = StarPhase.REMNANT;
        }
        // 5. Remnant Phase
        else if (currentSim.phase === StarPhase.REMNANT) {
            newTemp = Math.max(0, newTemp - 1000);
        }

        // --- REBIRTH LOGIC ---
        // Relaxed Check: Hand present and NOT pinching (pinchDistance > 0.4)
        if (newPhase === StarPhase.REMNANT && currentHand.isPresent && currentHand.pinchDistance > 0.4) {
             // Charge up Faster (+4 per tick = ~1.25 seconds)
             rebirthProgressRef.current = Math.min(100, rebirthProgressRef.current + 4);
        } else {
             // Decay
             rebirthProgressRef.current = Math.max(0, rebirthProgressRef.current - 5);
        }

        // Trigger Reset if Charged
        if (rebirthProgressRef.current >= 100) {
             simStateRef.current = { ...INITIAL_STATE };
             rebirthProgressRef.current = 0;
             implosionTimerRef.current = 0;

             setSimState({ ...INITIAL_STATE });
             setRebirthProgress(0);
             setResetKey(prev => prev + 1); // Trigger visual respawn

             return; // Skip update this tick
        }

        // --- UPDATE STATE ---
        // Update Physics Ref
        simStateRef.current = {
            ...currentSim,
            phase: newPhase,
            coreTemperature: newTemp
        };

        // Update UI States
        setSimState(simStateRef.current);
        setRebirthProgress(rebirthProgressRef.current);

    }, 50); // 20 FPS

    return () => clearInterval(interval);
  }, []); // Empty dependency array is fine because we use Refs for all mutable logic

  return (
    <div className="w-screen h-screen relative bg-transparent font-sans text-white overflow-hidden selection:bg-pink-500 selection:text-white">
      {/* 3D Background - Passed resetKey to force regeneration of particles */}
      <SupernovaScene
        handData={handData}
        simState={simState}
        resetKey={resetKey}
      />

      {/* Exit Button (Top Right) */}
      <Link
        href="/"
        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 p-2 sm:p-3 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white/70 hover:text-white transition-all active:scale-95 group cursor-pointer"
        title="Exit to Home"
      >
        <ArrowLeft size={16} className="sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
      </Link>

      {/* Manual Reset Button (Below Exit) */}
      {(simState.phase === StarPhase.SUPERNOVA || simState.phase === StarPhase.REMNANT) && (
        <button
            onClick={resetSimulation}
            className="absolute top-12 right-2 sm:top-20 sm:right-4 z-50 p-2 sm:p-3 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white/70 hover:text-white transition-all active:scale-95 group cursor-pointer"
            title="Restart Universe"
        >
            <RotateCcw size={16} className="sm:w-5 sm:h-5 group-hover:-rotate-180 transition-transform duration-500" />
        </button>
      )}

      {/* Info Overlay */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-40">
        <InfoPanel state={simState} />
      </div>

      {/* Hand Controller (Logic) */}
      <HandController onHandUpdate={handleHandUpdate} />

      {/* State Feedback Overlays */}

      {/* 1. Implosion Warning */}
      {simState.phase === StarPhase.UNSTABLE && simState.coreTemperature > 200000000 && (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center z-30 animate-pulse px-4">
              <div className="text-red-500 font-bold text-lg sm:text-2xl flex items-center gap-1.5 sm:gap-2 justify-center shadow-black drop-shadow-lg">
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" /> <span>CRITICAL MASS</span>
              </div>
              <div className="text-red-200 text-xs sm:text-sm shadow-black drop-shadow-md mt-1">
                  Crush to Detonate
              </div>
          </div>
      )}

      {/* 2. Rebirth Progress */}
      {simState.phase === StarPhase.REMNANT && (
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 z-30 px-4 w-full max-w-xs sm:max-w-none">
              <div className="text-blue-300 text-xs sm:text-sm uppercase tracking-widest font-bold shadow-black drop-shadow-md text-center">
                  {rebirthProgress > 0 ? "Reforming Star..." : "Open Hand to Rebirth"}
              </div>
              <div className="w-full sm:w-64 h-1.5 sm:h-2 bg-slate-800 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6] transition-all duration-75"
                    style={{ width: `${rebirthProgress}%` }}
                  />
              </div>
          </div>
      )}

      {/* Instruction Overlay */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-40 transition-opacity duration-500 px-2 sm:px-4"
        style={{ opacity: handData.isPresent ? 0 : 1, maxWidth: 'max-content', width: 'calc(100vw - 16px)' }}
      >
        <div className="bg-black/60 backdrop-blur-md px-3 py-3 sm:px-10 sm:py-8 rounded-xl sm:rounded-3xl border border-white/10 shadow-2xl animate-[pulse-slow_4s_infinite]" style={{ maxWidth: 'max-content' }}>
            <h1 className="text-xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2 sm:mb-4">Nebula Hand</h1>

            <div className="grid grid-cols-4 sm:grid-cols-2 gap-x-2 sm:gap-x-8 gap-y-2 sm:gap-y-6 text-slate-300">
                <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-4">
                    <div className="w-4 h-4 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0">
                        <Move3d className="text-blue-400 w-4 h-4 sm:w-8 sm:h-8" />
                    </div>
                    <div className="text-center sm:text-left">
                        <strong className="block text-white text-[10px] sm:text-lg">Move</strong>
                        <span className="text-[8px] sm:text-sm text-slate-400 hidden sm:block">Rotate View</span>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-4">
                    <div className="w-4 h-4 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0">
                        <Maximize2 className="text-green-400 w-4 h-4 sm:w-8 sm:h-8" />
                    </div>
                    <div className="text-center sm:text-left">
                        <strong className="block text-white text-[10px] sm:text-lg">Depth</strong>
                        <span className="text-[8px] sm:text-sm text-slate-400 hidden sm:block">Zoom In/Out</span>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-4">
                    <div className="w-4 h-4 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0">
                        <span className="text-base sm:text-2xl">✊</span>
                    </div>
                    <div className="text-center sm:text-left">
                        <strong className="block text-white text-[10px] sm:text-lg">Crush</strong>
                        <span className="text-[8px] sm:text-sm text-slate-400 hidden sm:block">Trigger Supernova</span>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-4">
                    <div className="w-4 h-4 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0">
                        <Hand className="text-yellow-400 w-4 h-4 sm:w-8 sm:h-8" />
                    </div>
                    <div className="text-center sm:text-left">
                        <strong className="block text-white text-[10px] sm:text-lg">Expand</strong>
                        <span className="text-[8px] sm:text-sm text-slate-400 hidden sm:block">Rebirth Star</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
}
