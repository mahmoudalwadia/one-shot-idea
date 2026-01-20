
import React, { useState } from 'react';
import { Rocket, Zap, Clock, Play, Infinity as InfinityIcon } from 'lucide-react';

export interface TimeControl {
    id: string;
    name: string;
    initialMs: number;
    incrementMs: number;
    category: 'Bullet' | 'Blitz' | 'Rapid' | 'Unlimited';
}

interface TimeSelectorProps {
    onStartGame: (tc: TimeControl) => void;
}

const TIME_CONTROLS: TimeControl[] = [
    // Bullet
    { id: '1min', name: '1 min', initialMs: 60 * 1000, incrementMs: 0, category: 'Bullet' },
    { id: '1|1', name: '1 | 1', initialMs: 60 * 1000, incrementMs: 1000, category: 'Bullet' },
    { id: '2|1', name: '2 | 1', initialMs: 120 * 1000, incrementMs: 1000, category: 'Bullet' },
    // Blitz
    { id: '3min', name: '3 min', initialMs: 180 * 1000, incrementMs: 0, category: 'Blitz' },
    { id: '3|2', name: '3 | 2', initialMs: 180 * 1000, incrementMs: 2000, category: 'Blitz' },
    { id: '5min', name: '5 min', initialMs: 300 * 1000, incrementMs: 0, category: 'Blitz' },
    // Rapid
    { id: '10min', name: '10 min', initialMs: 600 * 1000, incrementMs: 0, category: 'Rapid' },
    { id: '15|10', name: '15 | 10', initialMs: 900 * 1000, incrementMs: 10000, category: 'Rapid' },
    { id: '30min', name: '30 min', initialMs: 1800 * 1000, incrementMs: 0, category: 'Rapid' },
    // Unlimited
    { id: 'unlimited', name: 'No Limit', initialMs: Infinity, incrementMs: 0, category: 'Unlimited' },
];

const TimeSelector: React.FC<TimeSelectorProps> = ({ onStartGame }) => {
    const [selectedId, setSelectedId] = useState<string>('10min');

    const renderCategory = (cat: 'Bullet' | 'Blitz' | 'Rapid' | 'Unlimited', icon: React.ReactNode) => {
        const options = TIME_CONTROLS.filter(tc => tc.category === cat);
        if (options.length === 0) return null;
        
        return (
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 text-[var(--term-dim)] uppercase text-xs font-bold tracking-wider border-b border-[var(--term-dim)] pb-1">
                    {icon} {cat}
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {options.map(tc => {
                        const isSelected = selectedId === tc.id;
                        return (
                            <button
                                key={tc.id}
                                onClick={() => setSelectedId(tc.id)}
                                className={`
                                    py-3 px-2 text-center border transition-all duration-200 font-mono font-bold text-sm
                                    ${isSelected 
                                        ? 'bg-[var(--term-main)] text-[var(--term-bg)] border-[var(--term-main)] shadow-[0_0_8px_rgba(var(--term-main-rgb),0.5)] scale-[1.02]' 
                                        : 'bg-[var(--term-bg)] text-[var(--term-dim)] border-[var(--term-dim)] hover:border-[var(--term-main)] hover:text-[var(--term-main)]'
                                    }
                                `}
                            >
                                {tc.name}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    const handleStart = () => {
        const tc = TIME_CONTROLS.find(t => t.id === selectedId);
        if (tc) onStartGame(tc);
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-[var(--term-bg)] border-2 border-[var(--term-main)] shadow-[0_0_20px_rgba(var(--term-main-rgb),0.3)] p-6 flex flex-col max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl text-[var(--term-main)] mb-6 text-center uppercase tracking-widest terminal-text-shadow border-b-2 border-[var(--term-main)] pb-2">
                    Select Time Control
                </h2>
                
                {renderCategory('Bullet', <Rocket size={14} />)}
                {renderCategory('Blitz', <Zap size={14} />)}
                {renderCategory('Rapid', <Clock size={14} />)}
                {renderCategory('Unlimited', <InfinityIcon size={14} />)}

                <button 
                    onClick={handleStart}
                    className="mt-6 w-full py-4 bg-[var(--term-main)] text-[var(--term-bg)] font-bold text-xl uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(var(--term-main-rgb),0.4)]"
                >
                    <Play size={24} fill="currentColor" /> Start Game
                </button>
            </div>
        </div>
    );
};

export default TimeSelector;
