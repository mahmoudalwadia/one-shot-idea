import { Grid, TetrominoType, TetrominoShape } from '../types';
import { TETROMINOS } from './tetrominos';
import { STAGE_WIDTH, STAGE_HEIGHT } from './gameHelpers';

// Tuned weights to prioritize low, flat stacking
const WEIGHTS = {
    LINES: 50,          // High reward for clearing lines
    HOLES: -10,         // Penalty for creating holes (buried empty spaces)
    HEIGHT: -2,         // Penalty for aggregate height
    BUMPINESS: -5,      // Penalty for uneven surface (prevents towers)
    MAX_HEIGHT: -5      // Penalty for the highest point (prevents topping out)
};

const cloneGrid = (grid: Grid): Grid => {
    return grid.map(row => row.map(cell => [...cell])) as Grid;
};

// Robust collision check
const hasCollision = (stage: Grid, shape: (string|number)[][], posX: number, posY: number) => {
    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x] !== 0) {
                const targetY = y + posY;
                const targetX = x + posX;

                // 1. Bounds check
                if (targetX < 0 || targetX >= STAGE_WIDTH || targetY >= STAGE_HEIGHT) {
                    return true;
                }

                // 2. Board collision check (ignore above board)
                // IMPORTANT: We only collide with 'merged' blocks. 'clear' blocks are the moving piece itself (ghost).
                if (targetY >= 0) {
                     if (stage[targetY][targetX][1] === 'merged') {
                         return true;
                     }
                }
            }
        }
    }
    return false;
};

const rotate = (matrix: (string | number)[][]) => {
    return matrix[0].map((_, index) => matrix.map(row => row[index]).reverse());
};

const calculateScore = (stage: Grid, linesCleared: number) => {
    let aggregateHeight = 0;
    let holes = 0;
    let bumpiness = 0;
    let maxHeight = 0;

    const colHeights = new Array(STAGE_WIDTH).fill(0);

    // 1. Column Heights (Ignore 'clear' blocks - they are moving pieces)
    for (let x = 0; x < STAGE_WIDTH; x++) {
        for (let y = 0; y < STAGE_HEIGHT; y++) {
            // Only count 'merged' blocks as part of the stack
            if (stage[y][x][0] !== 0 && stage[y][x][1] === 'merged') {
                const height = STAGE_HEIGHT - y;
                colHeights[x] = height;
                aggregateHeight += height;
                if (height > maxHeight) maxHeight = height;
                break;
            }
        }
    }

    // 2. Holes
    for (let x = 0; x < STAGE_WIDTH; x++) {
        let blockFound = false;
        for (let y = 0; y < STAGE_HEIGHT; y++) {
            // Check merged only
            if (stage[y][x][0] !== 0 && stage[y][x][1] === 'merged') {
                blockFound = true;
            } else if (blockFound && (stage[y][x][0] === 0 || stage[y][x][1] === 'clear')) {
                // If we found a block above, and this is empty (or 'clear' which is essentially empty for structure), it's a hole
                holes++;
            }
        }
    }

    // 3. Bumpiness
    for (let x = 0; x < STAGE_WIDTH - 1; x++) {
        bumpiness += Math.abs(colHeights[x] - colHeights[x + 1]);
    }

    return (
        (WEIGHTS.LINES * linesCleared) +
        (WEIGHTS.HOLES * holes) +
        (WEIGHTS.BUMPINESS * bumpiness) +
        (WEIGHTS.HEIGHT * aggregateHeight) +
        (WEIGHTS.MAX_HEIGHT * maxHeight)
    );
};

export const getBestMove = (stage: Grid, type: TetrominoType) => {
    let bestScore = -Infinity;
    let bestMove = null;
    let fallbackMove = null;

    if (!type || !TETROMINOS[type]) return null;

    let currentShape = TETROMINOS[type].shape;

    // Iterate all 4 rotations
    for (let r = 0; r < 4; r++) {
        // Iterate all X positions
        // Scan wide to catch all edge cases
        for (let x = -4; x < STAGE_WIDTH; x++) {

            // 1. Check valid spawn (can the piece exist here?)
            // We check y=-2 to allow spawning above board
            const spawnY = -2;
            if (hasCollision(stage, currentShape, x, spawnY)) {
                continue;
            }

            // 2. Hard Drop simulation
            let currentY = spawnY;
            while (!hasCollision(stage, currentShape, x, currentY + 1)) {
                currentY++;
            }

            // 3. Validate ALL blocks are within bounds (strict check)
            let allBlocksValid = true;
            for(let py=0; py<currentShape.length; py++) {
                for(let px=0; px<currentShape[py].length; px++) {
                    if(currentShape[py][px] !== 0) {
                        const boardY = currentY + py;
                        const boardX = x + px;

                        // STRICT: Every block must be within bounds
                        if (boardX < 0 || boardX >= STAGE_WIDTH || boardY < 0 || boardY >= STAGE_HEIGHT) {
                            allBlocksValid = false;
                            break;
                        }
                    }
                }
                if (!allBlocksValid) break;
            }

            if (!allBlocksValid) continue;

            // 4. Clone and Place
            const tempStage = cloneGrid(stage);

            for(let py=0; py<currentShape.length; py++) {
                for(let px=0; px<currentShape[py].length; px++) {
                    if(currentShape[py][px] !== 0) {
                        const boardY = currentY + py;
                        const boardX = x + px;
                        // Mark as MERGED so it counts for score
                        tempStage[boardY][boardX] = [type, 'merged'];
                    }
                }
            }

            // Capture first valid move as fallback
            if (!fallbackMove) {
                fallbackMove = { rotation: r, x, y: currentY };
            }

            // 5. Calculate Score

            // Scrub 'clear' blocks (ghosts) from tempStage before line check/scoring
            // This ensures the scoring algorithm doesn't see the previous position of the falling piece
            for(let y=0; y<STAGE_HEIGHT; y++){
                for(let lx=0; lx<STAGE_WIDTH; lx++){
                    if(tempStage[y][lx][1] === 'clear') {
                        tempStage[y][lx] = [0, 'clear'];
                    }
                }
            }

            let linesCleared = 0;
            const nextStage = tempStage.reduce((ack, row) => {
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    linesCleared++;
                    ack.unshift(new Array(STAGE_WIDTH).fill(0).map(() => [0, 'clear']));
                    return ack;
                }
                ack.push(row);
                return ack;
            }, [] as Grid);

            const score = calculateScore(nextStage, linesCleared);

            if (score > bestScore) {
                bestScore = score;
                bestMove = { rotation: r, x, y: currentY };
            }
        }
        currentShape = rotate(currentShape.map(row => row.map(cell => cell))) as TetrominoShape;
    }

    return bestMove || fallbackMove;
};
