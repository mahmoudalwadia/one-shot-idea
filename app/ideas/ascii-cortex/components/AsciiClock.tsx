import React, { useEffect, useState } from 'react';

const AsciiClock: React.FC = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTime(new Date());
      const interval = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(interval);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  // Show placeholder during SSR to prevent hydration mismatch
  if (!time) {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono relative">
          <div className="absolute top-2 left-2 text-red-900 text-[10px]">T-MINUS</div>
          <div className="text-3xl md:text-4xl font-retro text-red-600 tracking-widest drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]">
              00:00
          </div>
          <div className="text-red-800 text-sm font-bold">
              :00
          </div>
          <div className="absolute bottom-2 text-xs text-red-900 animate-pulse">SYNCED</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono relative">
        <div className="absolute top-2 left-2 text-red-900 text-[10px]">T-MINUS</div>
        <div className="text-3xl md:text-4xl font-retro text-red-600 tracking-widest drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]">
            {format(time.getHours())}:{format(time.getMinutes())}
        </div>
        <div className="text-red-800 text-sm font-bold">
            :{format(time.getSeconds())}
        </div>
        <div className="absolute bottom-2 text-xs text-red-900 animate-pulse">SYNCED</div>
    </div>
  );
};

export default AsciiClock;
