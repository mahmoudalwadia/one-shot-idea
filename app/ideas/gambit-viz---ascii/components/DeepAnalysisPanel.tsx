
import React, { useMemo, useState } from 'react';
import { TreeNode, MoveClassification } from '../types';
import {
    Star,
    ThumbsUp,
    HelpCircle,
    XCircle,
    BookOpen,
    AlertTriangle,
    Zap,
    Target,
    Activity,
    Check,
    Maximize2,
    Minimize2,
    TrendingUp,
    Lightbulb,
    EyeOff
} from 'lucide-react';

interface DeepAnalysisPanelProps {
  rootNode: TreeNode;
  activeNodeId: string;
  onNodeClick: (node: TreeNode) => void;
  isMobileExpanded?: boolean;
  onToggleMobileExpand?: () => void;
  principalVariation?: string[];
}

// --- Classification Helpers ---

const getClassificationConfig = (cls?: MoveClassification) => {
    switch (cls) {
        case 'Brilliant':
            return { icon: Zap, color: 'text-teal-400', fill: 'fill-teal-400/20' };
        case 'Great':
            return { icon: Star, color: 'text-blue-400', fill: 'fill-blue-400/20' };
        case 'Best':
            return { icon: Target, color: 'text-green-500', fill: 'fill-green-500/20' };
        case 'Excellent':
            return { icon: ThumbsUp, color: 'text-emerald-400', fill: 'fill-emerald-400/20' };
        case 'Good':
            return { icon: Check, color: 'text-gray-400', fill: 'fill-transparent' }; // Simple check
        case 'Inaccuracy':
            return { icon: HelpCircle, color: 'text-yellow-400', fill: 'fill-yellow-400/20' };
        case 'Mistake':
            return { icon: AlertTriangle, color: 'text-orange-500', fill: 'fill-orange-500/20' };
        case 'Blunder':
            return { icon: XCircle, color: 'text-red-500', fill: 'fill-red-500/20' };
        case 'Book':
            return { icon: BookOpen, color: 'text-amber-600', fill: 'fill-amber-600/20' };
        case 'Miss':
            return { icon: XCircle, color: 'text-rose-400', fill: 'fill-rose-400/20' };
        default:
            return null;
    }
};

// --- Stats Configuration ---
const ALL_STATS = [
    { label: 'Brill', key: 'Brilliant', icon: Zap, color: 'text-teal-400' },
    { label: 'Great', key: 'Great', icon: Star, color: 'text-blue-400' },
    { label: 'Best', key: 'Best', icon: Target, color: 'text-green-500' },
    { label: 'Excel', key: 'Excellent', icon: ThumbsUp, color: 'text-emerald-400' },
    { label: 'Good', key: 'Good', icon: Check, color: 'text-gray-400' },
    { label: 'Book', key: 'Book', icon: BookOpen, color: 'text-amber-600' },
    { label: 'Inacc', key: 'Inaccuracy', icon: HelpCircle, color: 'text-yellow-400' },
    { label: 'Mistake', key: 'Mistake', icon: AlertTriangle, color: 'text-orange-500' },
    { label: 'Miss', key: 'Miss', icon: XCircle, color: 'text-rose-400' },
    { label: 'Blunder', key: 'Blunder', icon: XCircle, color: 'text-red-500' },
];

// --- Eval Utils ---
const getWinChance = (cp: number) => {
    const k = 0.0035;
    return 1 / (1 + Math.exp(-k * cp));
};

// --- Row Component ---
interface MoveRowProps {
    moveNum: number;
    white?: TreeNode;
    black?: TreeNode;
    isActiveWhite: boolean;
    isActiveBlack: boolean;
    onNodeClick: (n: TreeNode) => void;
    showDebug: boolean;
}

const MoveCell: React.FC<{
    node?: TreeNode;
    isActive: boolean;
    onClick: (n: TreeNode) => void;
    showDebug: boolean;
    hasBorderRight?: boolean;
}> = ({ node, isActive, onClick, showDebug, hasBorderRight }) => {
    if (!node) return <div className={`h-full ${hasBorderRight ? 'border-r border-[var(--term-dim)] border-opacity-30' : ''}`} />;

    const config = getClassificationConfig(node.classification);
    const Icon = config?.icon;

    // Eval Bar Logic
    const evalScore = node.evalScore ?? 0;
    const winChance = getWinChance(evalScore);
    const barHeight = Math.max(5, Math.min(100, winChance * 100));

    // Text display for eval
    let evalText = (evalScore / 100).toFixed(1);
    if (evalScore > 10000) evalText = "+M";
    else if (evalScore < -10000) evalText = "-M";
    else if (evalScore > 0) evalText = `+${evalText}`;

    return (
        <div
            onClick={() => onClick(node)}
            className={`
                relative flex items-center justify-between px-3 py-1 cursor-pointer
                transition-colors group h-full
                ${hasBorderRight ? 'border-r border-[var(--term-dim)] border-opacity-30' : ''}
                ${isActive ? 'bg-[rgba(var(--term-main-rgb),0.2)]' : 'hover:bg-[rgba(var(--term-dim-rgb),0.1)]'}
            `}
        >
            <div className="flex items-center gap-2 relative z-10 w-full">
                <span className={`font-mono text-sm ${isActive ? 'text-[var(--term-main)] font-bold' : 'text-[var(--term-dim)]'} w-8`}>
                    {node.name}
                </span>

                {Icon && (
                    <span className={`${config?.color} drop-shadow-sm`}>
                         <Icon size={14} className={config?.fill} strokeWidth={2.5} />
                    </span>
                )}
            </div>

            {showDebug && (
                 <span className="text-[9px] opacity-50 font-mono absolute right-3 top-1/2 -translate-y-1/2">
                    {evalText}
                 </span>
            )}

            {/* Eval Bar Indicator (Right Edge) */}
            <div className="absolute right-0 top-1 bottom-1 w-[3px] bg-[rgba(255,255,255,0.05)] overflow-hidden rounded-full mr-0.5">
                 <div
                    className="absolute bottom-0 w-full transition-all duration-500 bg-[var(--term-main)] opacity-60"
                    style={{ height: `${barHeight}%` }}
                 />
            </div>
        </div>
    );
};

const MoveRow: React.FC<MoveRowProps> = ({ moveNum, white, black, isActiveWhite, isActiveBlack, onNodeClick, showDebug }) => {
    return (
        <div className="grid grid-cols-[36px_1fr_1fr] border-b border-[var(--term-dim)] border-opacity-30 h-9 items-stretch">
            {/* Move Number */}
            <div className="flex items-center justify-center bg-[rgba(0,0,0,0.2)] text-[var(--term-dim)] text-xs font-mono border-r border-[var(--term-dim)] border-opacity-30">
                {moveNum}.
            </div>

            {/* White Move */}
            <MoveCell
                node={white}
                isActive={isActiveWhite}
                onClick={onNodeClick}
                showDebug={showDebug}
                hasBorderRight={true}
            />

            {/* Black Move */}
            <MoveCell
                node={black}
                isActive={isActiveBlack}
                onClick={onNodeClick}
                showDebug={showDebug}
            />
        </div>
    );
};

// --- Main Panel ---

const DeepAnalysisPanel: React.FC<DeepAnalysisPanelProps> = ({ rootNode, activeNodeId, onNodeClick, isMobileExpanded, onToggleMobileExpand, principalVariation }) => {
    // Debug toggle removed, defaulting to false
    const showDebug = false;
    // Hint is hidden by default
    const [showHint, setShowHint] = useState(false);

    // 1. Flatten Tree to Current Line + Continuation
    const moveRows = useMemo(() => {
        // A. Find path from root to activeNode
        const path: TreeNode[] = [];
        const findPathToActive = (curr: TreeNode, target: string): boolean => {
            if (curr.id === target) {
                path.push(curr);
                return true;
            }
            for (const child of curr.children) {
                if (findPathToActive(child, target)) {
                    path.push(curr);
                    return true;
                }
            }
            return false;
        };

        const found = findPathToActive(rootNode, activeNodeId);
        // path is populated in reverse: Active -> ... -> Root
        // Reverse it to get Root -> ... -> Active
        const rootToActive = found ? path.reverse() : [];

        // B. Find continuation from Active Node (The "Future")
        // We want to show the moves that follow the active node, prioritizing the main line (most recently played).
        const continuation: TreeNode[] = [];
        let curr = rootToActive.length > 0 ? rootToActive[rootToActive.length - 1] : null;

        if (!curr && rootNode.id === activeNodeId) {
             curr = rootNode; // Handle case where we are at root
        }

        while (curr && curr.children && curr.children.length > 0) {
            // Prioritize children marked as main line
            const mainLines = curr.children.filter(c => c.isMainLine);
            let next;

            if (mainLines.length > 0) {
                 // Pick the last one (most recently added/played)
                 next = mainLines[mainLines.length - 1];
            } else {
                 // Fallback to last child if no main line
                 next = curr.children[curr.children.length - 1];
            }

            if (next) {
                continuation.push(next);
                curr = next;
            } else {
                break;
            }
        }

        // Combine: Root->Active (excluding root) + Continuation
        const fullPath = [...rootToActive, ...continuation].filter(n => n.id !== rootNode.id);

        // Group into pairs
        const rows: { num: number, w?: TreeNode, b?: TreeNode }[] = [];

        fullPath.forEach(node => {
            // Chess.js increments move number after Black moves.
            // If it is now White's turn (node.turn === 'w'), it means Black just moved.
            // That move belongs to the PREVIOUS move number.
            const moveNum = node.turn === 'w' ? node.moveNumber - 1 : node.moveNumber;

            let row = rows.find(r => r.num === moveNum);
            if (!row) {
                row = { num: moveNum };
                rows.push(row);
            }

            if (node.turn === 'b') { // If current turn is black, it means White JUST moved
                 row.w = node;
            } else { // Current turn is white, means Black JUST moved
                 row.b = node;
            }
        });

        // Sort rows by move number to ensure order
        return rows.sort((a, b) => a.num - b.num);
    }, [rootNode, activeNodeId]);

    // 2. Counts
    const counts = useMemo(() => {
        const c: Record<string, number> = {};
        // Count ONLY in the current displayed line
        moveRows.forEach(r => {
            if (r.w?.classification) c[r.w.classification] = (c[r.w.classification] || 0) + 1;
            if (r.b?.classification) c[r.b.classification] = (c[r.b.classification] || 0) + 1;
        });
        return c;
    }, [moveRows]);

    return (
        <div className="flex flex-col h-full bg-[var(--term-bg)] w-full font-sans">
             {/* Header */}
             <div className="flex justify-between items-center p-2 border-b border-[var(--term-main)] bg-[rgba(var(--term-main-rgb),0.05)]">
                 <div className="flex items-center gap-2">
                     <Activity size={16} className="text-[var(--term-main)]" />
                     <span className="text-sm font-bold text-[var(--term-main)] uppercase tracking-wider">Deep Analysis</span>
                 </div>

                 {/* Mobile Toggle Button (Replaces Debug) */}
                 {onToggleMobileExpand && (
                     <button
                        onClick={onToggleMobileExpand}
                        className="md:hidden p-1 border border-[var(--term-dim)] text-[var(--term-dim)] hover:border-[var(--term-main)] hover:text-[var(--term-main)] transition-colors cursor-pointer"
                        aria-label={isMobileExpanded ? "Collapse Analysis" : "Expand Analysis"}
                     >
                        {isMobileExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                     </button>
                 )}
             </div>

             {/* Principal Variation Display - Hidden by default, show on request */}
             {principalVariation && principalVariation.length > 0 && (
                 <div className="px-3 py-2 border-b border-[var(--term-dim)] border-opacity-50 bg-[rgba(var(--term-main-rgb),0.05)]">
                     {!showHint ? (
                         <button
                             onClick={() => setShowHint(true)}
                             className="w-full flex items-center justify-center gap-2 py-1 text-[var(--term-dim)] hover:text-[var(--term-main)] transition-colors cursor-pointer"
                         >
                             <Lightbulb size={14} />
                             <span className="text-xs uppercase tracking-wider">Show Hint</span>
                         </button>
                     ) : (
                         <>
                             <div className="flex items-center justify-between mb-1">
                                 <div className="flex items-center gap-2">
                                     <TrendingUp size={12} className="text-[var(--term-main)] opacity-70" />
                                     <span className="text-[10px] uppercase text-[var(--term-dim)] tracking-wider">Best Line</span>
                                 </div>
                                 <button
                                     onClick={() => setShowHint(false)}
                                     className="text-[var(--term-dim)] hover:text-[var(--term-main)] transition-colors cursor-pointer"
                                     title="Hide hint"
                                 >
                                     <EyeOff size={12} />
                                 </button>
                             </div>
                             <div className="font-mono text-sm text-[var(--term-main)] overflow-x-auto whitespace-nowrap custom-scrollbar">
                                 {principalVariation.map((move, idx) => (
                                     <span key={idx} className={idx % 2 === 0 ? 'opacity-100' : 'opacity-70'}>
                                         {idx > 0 && ' '}
                                         {idx % 2 === 0 && <span className="text-[var(--term-dim)] mr-1">{Math.floor(idx / 2) + 1}.</span>}
                                         {move}
                                     </span>
                                 ))}
                             </div>
                         </>
                     )}
                 </div>
             )}

             {/* Move List Header */}
             {moveRows.length > 0 && (
                 <div className="grid grid-cols-[36px_1fr_1fr] border-b border-[var(--term-dim)] border-opacity-50 text-[10px] uppercase text-[var(--term-dim)] bg-[rgba(0,0,0,0.3)]">
                     <div className="p-1 text-center border-r border-[var(--term-dim)] border-opacity-30">#</div>
                     <div className="p-1 pl-3 border-r border-[var(--term-dim)] border-opacity-30">White</div>
                     <div className="p-1 pl-3">Black</div>
                 </div>
             )}

             {/* Move List */}
             <div className="flex-1 overflow-y-auto custom-scrollbar">
                 {moveRows.length === 0 ? (
                     <div className="p-8 text-center text-sm opacity-50 text-[var(--term-dim)] flex flex-col items-center gap-2">
                         <Target size={32} strokeWidth={1} />
                         <span>Make moves to begin analysis...</span>
                     </div>
                 ) : (
                     moveRows.map(row => (
                         <MoveRow
                            key={row.num}
                            moveNum={row.num}
                            white={row.w}
                            black={row.b}
                            isActiveWhite={row.w?.id === activeNodeId}
                            isActiveBlack={row.b?.id === activeNodeId}
                            onNodeClick={onNodeClick}
                            showDebug={showDebug}
                         />
                     ))
                 )}
                 {/* Spacer */}
                 <div className="h-4" />
             </div>

             {/* Footer Stats - Expanded Grid */}
             <div className="border-t border-[var(--term-main)] p-2 bg-[var(--term-bg)]">
                <div className="grid grid-cols-5 gap-2 text-xs">
                    {ALL_STATS.map((stat) => (
                        <StatItem
                            key={stat.key}
                            label={stat.label}
                            count={counts[stat.key]}
                            icon={stat.icon}
                            color={stat.color}
                        />
                    ))}
                </div>
             </div>
        </div>
    );
};

interface StatItemProps {
  label: string;
  count: number;
  icon: React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
  color: string;
}

const StatItem = ({ label, count, icon: Icon, color }: StatItemProps) => (
    <div className="flex flex-col items-center justify-center p-1 bg-[rgba(255,255,255,0.03)] rounded border border-transparent hover:border-[var(--term-dim)] transition-colors min-h-[45px]">
        <div className={`flex items-center gap-1 ${color} mb-0.5`}>
            <Icon size={12} strokeWidth={3} />
            <span className="font-bold font-mono text-sm">{count || 0}</span>
        </div>
        <span className="text-[9px] uppercase opacity-50 text-[var(--term-dim)] tracking-wider leading-none">{label}</span>
    </div>
);

export default DeepAnalysisPanel;
