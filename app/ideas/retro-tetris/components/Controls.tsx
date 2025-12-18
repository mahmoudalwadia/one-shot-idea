import React from 'react';
import { ArrowLeft, ArrowRight, RotateCw, ArrowDown, Pause, Play, RefreshCw, ChevronsDown, Bot } from 'lucide-react';

interface ControlsProps {
  onMove: (dir: number) => void;
  onRotate: () => void;
  onDrop: () => void;
  onHardDrop: () => void;
  onPause: () => void;
  onReset: () => void;
  onAutoPlay: () => void;
  isPaused: boolean;
  isGameOver: boolean;
  isAutoPlay: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onMove, onRotate, onDrop, onHardDrop, onPause, onReset, onAutoPlay, isPaused, isAutoPlay
}) => {

  // Larger, more tactile button styles for mobile
  const btnBase = "rounded-full shadow-lg border-b-4 touch-manipulation select-none transition-transform active:scale-95 active:border-b-0 active:translate-y-1 flex items-center justify-center cursor-pointer";
  const btnAction = `${btnBase} bg-indigo-600 border-indigo-900 active:bg-indigo-700 w-16 h-16 md:w-14 md:h-14 md:bg-gray-800 md:border-gray-600`;
  const btnDpad = `${btnBase} bg-gray-700 border-gray-900 active:bg-gray-600 w-16 h-16 md:w-14 md:h-14 md:bg-gray-800 md:border-gray-600`;
  const btnSmall = `${btnBase} bg-gray-800 border-gray-950 w-10 h-10`;

  const iconClass = "w-8 h-8 text-white stroke-[2.5]";

  return (
    <div className="flex flex-col gap-2 w-full max-w-[500px] px-4 pb-4 md:p-0">

      {/* Mobile Layout: Split controls (D-Pad Left, Actions Right) */}
      <div className="flex md:hidden w-full justify-between items-end gap-4 h-[180px]">

          {/* Left Side: D-Pad (Left, Down, Right) */}
          <div className="grid grid-cols-3 gap-2 items-end">
             {/* Left */}
             <button className={btnDpad} onPointerDown={(e) => { e.preventDefault(); onMove(-1); }} aria-label="Left">
                <ArrowLeft className={iconClass} />
             </button>

             {/* Down (Soft Drop) */}
             <button className={btnDpad} onPointerDown={(e) => { e.preventDefault(); onDrop(); }} aria-label="Soft Drop">
                <ArrowDown className={iconClass} />
             </button>

             {/* Right */}
             <button className={btnDpad} onPointerDown={(e) => { e.preventDefault(); onMove(1); }} aria-label="Right">
                <ArrowRight className={iconClass} />
             </button>
          </div>

          {/* Center: Utility Buttons */}
          <div className="flex flex-col gap-4 mb-2">
             <button className={btnSmall} onClick={onPause} aria-label="Pause">
                 {isPaused ? <Play className="w-5 h-5 text-green-400" /> : <Pause className="w-5 h-5 text-white" />}
             </button>
             <button className={btnSmall} onClick={onReset} aria-label="Reset">
                 <RefreshCw className="w-5 h-5 text-red-400" />
             </button>
             <button className={`${btnSmall} ${isAutoPlay ? 'bg-cyan-900 border-cyan-950' : ''}`} onClick={onAutoPlay} aria-label="Auto Play">
                 <Bot className={`w-5 h-5 ${isAutoPlay ? 'text-cyan-400' : 'text-gray-400'}`} />
             </button>
          </div>

          {/* Right Side: Action (Rotate, Hard Drop) */}
          <div className="flex flex-col gap-4 items-end">
              {/* Hard Drop */}
             <button className={`${btnAction} bg-purple-600 border-purple-900`} onPointerDown={(e) => { e.preventDefault(); onHardDrop(); }} aria-label="Hard Drop">
                <ChevronsDown className={iconClass} />
             </button>

             {/* Rotate */}
             <button className={`${btnAction} bg-cyan-600 border-cyan-900`} onPointerDown={(e) => { e.preventDefault(); onRotate(); }} aria-label="Rotate">
                <RotateCw className={iconClass} />
             </button>
          </div>

      </div>


      {/* Desktop Controls (Classic Layout, only visible on md+) */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        <div className="flex justify-center items-center col-start-2">
             <button className={btnDpad} onPointerDown={(e) => { e.preventDefault(); onRotate(); }} aria-label="Rotate">
                <RotateCw className={iconClass} />
            </button>
        </div>

        <div className="col-span-3 flex justify-center gap-4">
            <button className={btnDpad} onPointerDown={(e) => { e.preventDefault(); onMove(-1); }} aria-label="Left">
                <ArrowLeft className={iconClass} />
            </button>

            <button className={btnDpad} onPointerDown={(e) => { e.preventDefault(); onDrop(); }} aria-label="Drop">
                <ArrowDown className={iconClass} />
            </button>

            <button className={btnDpad} onPointerDown={(e) => { e.preventDefault(); onMove(1); }} aria-label="Right">
                <ArrowRight className={iconClass} />
            </button>
        </div>

         <div className="flex justify-center items-center col-start-2">
            <button className={btnDpad} onPointerDown={(e) => { e.preventDefault(); onHardDrop(); }} aria-label="Hard Drop">
                <ChevronsDown className={iconClass} />
            </button>
        </div>

        <div className="col-span-3 flex justify-center gap-4 mt-2">
            <button className={`${btnSmall} bg-gray-700`} onClick={onPause} title="Pause">
                {isPaused ? <Play size={16}/> : <Pause size={16}/>}
            </button>
             <button className={`${btnSmall} bg-red-900 border-red-950`} onClick={onReset} title="Reset">
                <RefreshCw size={16}/>
            </button>
             <button className={`${btnSmall} ${isAutoPlay ? 'bg-cyan-900 border-cyan-950' : 'bg-gray-700'}`} onClick={onAutoPlay} title="Auto Play">
                <Bot size={16} className={isAutoPlay ? 'text-cyan-400' : 'text-gray-400'}/>
            </button>
        </div>

      </div>

      {/* Desktop Helper Text */}
      <div className="hidden md:block text-gray-500 text-xs font-pixel text-center mt-4 bg-gray-900/50 p-4 rounded-lg border border-gray-800">
        <p className="mb-2 text-base text-gray-300">KEYBOARD CONTROLS</p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-left px-2">
            <div className="flex justify-between"><span>ARROWS</span> <span>Move</span></div>
            <div className="flex justify-between"><span>UP</span> <span>Rotate</span></div>
            <div className="flex justify-between"><span>DOWN</span> <span>Soft Drop</span></div>
            <div className="flex justify-between"><span>SPACE</span> <span>Hard Drop</span></div>
            <div className="flex justify-between"><span>P</span> <span>Pause</span></div>
        </div>
      </div>

    </div>
  );
};

export default Controls;
