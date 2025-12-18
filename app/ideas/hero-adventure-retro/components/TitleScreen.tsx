import React from 'react';

interface Props {
  onStart: () => void;
}

export const TitleScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white relative z-10">
      <div className="border-4 border-white p-8 bg-gray-900 shadow-lg max-w-2xl w-full text-center">
        
        <div className="mb-8 flex justify-center space-x-2">
           <div className="w-4 h-4 bg-gray-400"></div>
           <div className="w-4 h-4 bg-green-500"></div>
           <div className="w-4 h-4 bg-blue-500"></div>
           <div className="w-4 h-4 bg-orange-500"></div>
           <div className="w-4 h-4 bg-purple-500"></div>
           <div className="w-4 h-4 bg-black border border-white"></div>
        </div>

        <h1 className="text-4xl md:text-6xl text-red-500 mb-2 font-retro-title tracking-tighter" style={{ textShadow: '4px 4px 0px #8b0000' }}>
          Hero
        </h1>
        <h2 className="text-2xl md:text-4xl text-white mb-8 font-retro-text tracking-widest">
          Adventure
        </h2>

        <div className="space-y-6 font-retro-text text-xl">
          <button 
            onClick={onStart}
            className="block w-full py-4 px-8 border-2 border-white hover:bg-white hover:text-black hover:border-transparent transition-colors duration-200 uppercase blinking-cursor"
          >
            Start Game
          </button>

          {/* Controls Info */}
          <div className="text-sm text-gray-400 border-t border-gray-700 pt-4 mt-4 grid grid-cols-2 gap-4">
              <div>
                  <h3 className="text-yellow-500 mb-1">DESKTOP</h3>
                  <p>WASD / Arrows to Move</p>
                  <p>I for Inventory</p>
              </div>
              <div>
                  <h3 className="text-yellow-500 mb-1">MOBILE</h3>
                  <p>On-screen D-Pad</p>
                  <p>Touch Controls</p>
              </div>
          </div>
          
          <div className="text-gray-600 text-xs mt-8">
            Copr @ 2024 AI Dev
          </div>
        </div>
      </div>
      
      {/* Decorative Pixel Art Elements */}
      <div className="absolute bottom-10 left-10 w-16 h-16 border-4 border-green-700 bg-green-900 opacity-50 hidden md:block"></div>
      <div className="absolute top-10 right-10 w-16 h-16 border-4 border-blue-700 bg-blue-900 opacity-50 hidden md:block"></div>
    </div>
  );
};