import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Backpack } from 'lucide-react';
import { Direction } from '../types';

interface Props {
  onMove: (dir: Direction) => void;
  onToggleInventory: () => void;
}

export const MobileControls: React.FC<Props> = ({ onMove, onToggleInventory }) => {
  return (
    <div className="w-full h-48 bg-gradient-to-t from-black via-[#111] to-transparent flex items-center justify-between px-6 pb-6 md:hidden shrink-0 z-20 touch-none">
       {/* Inventory Button (Left side for thumb access) */}
       <div className="flex flex-col items-center gap-2">
           <button 
              onPointerDown={(e) => { e.preventDefault(); onToggleInventory(); }}
              className="w-16 h-16 rounded-full bg-yellow-900/90 border-2 border-yellow-500 flex flex-col items-center justify-center text-yellow-100 active:scale-90 transition-transform shadow-[0_4px_0_rgb(66,32,6)] active:shadow-none translate-y-0 active:translate-y-1"
           >
             <Backpack size={24} />
             <span className="text-[10px] font-retro-text mt-1 font-bold">INV</span>
           </button>
       </div>

       {/* D-Pad (Right side) */}
       <div className="relative w-40 h-40">
          {/* D-Pad Background */}
          <div className="absolute inset-0 m-auto w-14 h-14 bg-[#222] rounded z-0 shadow-inner"></div>
          
          <ControlBtn 
            onPress={() => onMove(Direction.UP)} 
            icon={<ArrowUp size={28} />} 
            className="top-0 left-1/2 -translate-x-1/2 rounded-t-xl h-14 w-12 border-b-0" 
          />
          <ControlBtn 
            onPress={() => onMove(Direction.DOWN)} 
            icon={<ArrowDown size={28} />} 
            className="bottom-0 left-1/2 -translate-x-1/2 rounded-b-xl h-14 w-12 border-t-0" 
          />
          <ControlBtn 
            onPress={() => onMove(Direction.LEFT)} 
            icon={<ArrowLeft size={28} />} 
            className="left-0 top-1/2 -translate-y-1/2 rounded-l-xl w-14 h-12 border-r-0" 
          />
          <ControlBtn 
            onPress={() => onMove(Direction.RIGHT)} 
            icon={<ArrowRight size={28} />} 
            className="right-0 top-1/2 -translate-y-1/2 rounded-r-xl w-14 h-12 border-l-0" 
          />
          
          {/* Center decorative circle */}
          <div className="absolute inset-0 m-auto w-4 h-4 bg-[#111] rounded-full z-30 shadow-inner opacity-50 pointer-events-none"></div>
       </div>
    </div>
  );
};

const ControlBtn: React.FC<{ onPress: () => void; icon: React.ReactNode; className: string }> = ({ onPress, icon, className }) => (
    <button 
        onPointerDown={(e) => { 
            e.preventDefault(); 
            e.stopPropagation();
            onPress(); 
        }}
        className={`absolute bg-gray-700 active:bg-gray-600 border-2 border-gray-500 flex items-center justify-center text-gray-200 shadow-lg z-20 active:border-white touch-none transition-colors ${className}`}
        style={{ touchAction: 'none' }}
    >
        {icon}
    </button>
);