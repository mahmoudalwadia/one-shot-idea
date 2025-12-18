import { useState, useEffect, useCallback, useRef } from 'react';
import { createStage, checkCollision, STAGE_WIDTH, STAGE_HEIGHT } from '../utils/gameHelpers';
import { TETROMINOS, randomTetromino } from '../utils/tetrominos';
import { Player, Grid, TetrominoType, GridCell, TetrominoShape } from '../types';
import { getBestMove } from '../utils/aiHelpers';

export const useTetris = () => {
  const [stage, setStage] = useState<Grid>(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);
  const [gameStats, setGameStats] = useState({
    score: 0,
    rows: 0,
    level: 0,
    gameOver: true,
    paused: false,
  });
  const [autoPlay, setAutoPlay] = useState(false);

  // Player State
  const [player, setPlayer] = useState<Player>({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
    type: '0' as TetrominoType,
  });

  // Next Piece State - initialize as null to prevent hydration mismatch
  const [nextPiece, setNextPiece] = useState<ReturnType<typeof randomTetromino> | null>(null);

  // Initialize nextPiece on client only
  useEffect(() => {
    if (nextPiece === null) {
      setNextPiece(randomTetromino());
    }
  }, [nextPiece]);

  const resetGame = useCallback(() => {
    setStage(createStage());
    setGameStats({ score: 0, rows: 0, level: 0, gameOver: false, paused: false });
    const firstPiece = randomTetromino();
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: firstPiece.shape,
      collided: false,
      type: Object.keys(TETROMINOS).find(key => TETROMINOS[key] === firstPiece) as TetrominoType || 'I',
    });
    const newNextPiece = randomTetromino();
    setNextPiece(newNextPiece);
    setRowsCleared(0);
  }, []);

  const movePlayer = (dir: number) => {
    // First check standard collision
    if (checkCollision(player, stage, { x: dir, y: 0 })) {
      return;
    }

    // Then verify all blocks stay in bounds
    let allBlocksValid = true;
    for (let py = 0; py < player.tetromino.length; py++) {
      for (let px = 0; px < player.tetromino[py].length; px++) {
        if (player.tetromino[py][px] !== 0) {
          const finalX = player.pos.x + px + dir;

          if (finalX < 0 || finalX >= STAGE_WIDTH) {
            allBlocksValid = false;
            break;
          }
        }
      }
      if (!allBlocksValid) break;
    }

    if (allBlocksValid) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const updatePlayerPos = useCallback(({
    x,
    y,
    collided,
    absolute = false
  }: {
    x: number;
    y: number;
    collided: boolean;
    absolute?: boolean;
  }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: absolute
        ? { x, y }
        : { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }));
  }, []);

  const rotate = (matrix: (string | number)[][], dir: number) => {
    const rotated = matrix.map((_, index) => matrix.map((col) => col[index]));
    if (dir > 0) return rotated.map((row) => row.reverse());
    return rotated.reverse();
  };

  const playerRotate = (stage: Grid, dir: number) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    // ADDED: Verify all blocks are in bounds after wall-kick
    let allBlocksValid = true;
    for (let py = 0; py < clonedPlayer.tetromino.length; py++) {
      for (let px = 0; px < clonedPlayer.tetromino[py].length; px++) {
        if (clonedPlayer.tetromino[py][px] !== 0) {
          const finalX = clonedPlayer.pos.x + px;
          const finalY = clonedPlayer.pos.y + py;

          if (finalX < 0 || finalX >= STAGE_WIDTH || finalY >= STAGE_HEIGHT) {
            allBlocksValid = false;
            break;
          }
        }
      }
      if (!allBlocksValid) break;
    }

    if (allBlocksValid) {
      setPlayer(clonedPlayer);
    }
    // If invalid, just don't rotate (existing behavior preserved)
  };

  const drop = useCallback(() => {
    // Increase level every 10 rows
    if (gameStats.rows > (gameStats.level + 1) * 10) {
      setGameStats((prev) => ({ ...prev, level: prev.level + 1 }));
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // If we are at the top (y < 1) and colliding, it's a Game Over (stacking to top)
      if (player.pos.y < 1) {
        setGameStats((prev) => ({ ...prev, gameOver: true }));
        setAutoPlay(false);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  }, [gameStats.rows, gameStats.level, player, stage, updatePlayerPos]);

  const dropPlayer = useCallback(() => {
    if (gameStats.paused) return;
    drop();
  }, [gameStats.paused, drop]);

  const hardDrop = () => {
      if (gameStats.paused) return;

      // Find the landing Y position (absolute)
      let landingY = player.pos.y;
      while(!checkCollision(player, stage, {x: 0, y: landingY - player.pos.y + 1})) {
          landingY++;
      }

      // Validate ALL blocks will be in bounds at landing position
      let allBlocksValid = true;
      for (let py = 0; py < player.tetromino.length; py++) {
          for (let px = 0; px < player.tetromino[py].length; px++) {
              if (player.tetromino[py][px] !== 0) {
                  const finalX = player.pos.x + px;
                  const finalY = landingY + py;

                  if (finalX < 0 || finalX >= STAGE_WIDTH || finalY < 0 || finalY >= STAGE_HEIGHT) {
                      allBlocksValid = false;
                      break;
                  }
              }
          }
          if (!allBlocksValid) break;
      }

      if (allBlocksValid) {
          updatePlayerPos({ x: player.pos.x, y: landingY, collided: true, absolute: true });
      } else {
          // Fallback: mark as collided at current position
          updatePlayerPos({ x: 0, y: 0, collided: true });
      }
  }

  const performAutoMove = useCallback(() => {
      if (gameStats.paused || gameStats.gameOver || player.collided) return;

      const bestMove = getBestMove(stage, player.type);

      if (bestMove) {
          let shape = TETROMINOS[player.type].shape;
          for(let i=0; i<bestMove.rotation; i++) {
              shape = rotate(shape.map(row => [...row]), 1) as TetrominoShape;
          }

          // RE-VALIDATE: Check ALL blocks are in bounds with current stage
          let allBlocksValid = true;
          for (let py = 0; py < shape.length; py++) {
              for (let px = 0; px < shape[py].length; px++) {
                  if (shape[py][px] !== 0) {
                      const finalX = bestMove.x + px;
                      const finalY = bestMove.y + py;

                      // Strict bounds check
                      if (finalX < 0 || finalX >= STAGE_WIDTH || finalY < 0 || finalY >= STAGE_HEIGHT) {
                          allBlocksValid = false;
                          break;
                      }

                      // Check not overlapping merged blocks
                      if (finalY >= 0 && stage[finalY][finalX][1] === 'merged') {
                          allBlocksValid = false;
                          break;
                      }
                  }
              }
              if (!allBlocksValid) break;
          }

          if (allBlocksValid) {
              // Use absolute positioning
              setPlayer({
                  pos: { x: bestMove.x, y: bestMove.y },
                  tetromino: shape,
                  collided: true,
                  type: player.type
              });
          } else {
              // Fallback to natural drop if AI move is invalid
              if (!checkCollision(player, stage, { x: 0, y: 1 })) {
                  updatePlayerPos({ x: 0, y: 1, collided: false });
              } else {
                  updatePlayerPos({ x: 0, y: 0, collided: true });
              }
          }
      } else {
          // No move found - natural drop
          if (!checkCollision(player, stage, { x: 0, y: 1 })) {
              updatePlayerPos({ x: 0, y: 1, collided: false });
          } else {
              updatePlayerPos({ x: 0, y: 0, collided: true });
          }
      }
  }, [gameStats.paused, gameStats.gameOver, player, stage, updatePlayerPos]);

  // Game Loop
  const savedCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    savedCallback.current = autoPlay ? performAutoMove : dropPlayer;
  }, [autoPlay, dropPlayer, performAutoMove]);

  useEffect(() => {
    if (!gameStats.gameOver && !gameStats.paused) {
      // Auto Play speed: 300ms. Normal speed: Variable based on level.
      const tickRate = autoPlay ? 300 : Math.max(100, 1000 - (gameStats.level * 50));
      const id = setInterval(() => {
        if (savedCallback.current) savedCallback.current();
      }, tickRate);
      return () => clearInterval(id);
    }
  }, [gameStats.gameOver, gameStats.paused, gameStats.level, autoPlay]);


  // Stage update logic
  useEffect(() => {

    const sweepRows = (newStage: Grid): { stage: Grid; cleared: number } => {
      let cleared = 0;
      const swept = newStage.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          cleared++;
          ack.unshift(new Array(newStage[0].length).fill(0).map(() => [0 as TetrominoType, 'clear'] as GridCell));
          return ack;
        }
        ack.push(row);
        return ack;
      }, [] as Grid);
      return { stage: swept, cleared };
    };

    setStage(prevStage => {
      const updateStage = (currentStage: Grid): { stage: Grid; cleared: number } => {
        // 1. Flush the previous render's active piece into the grid
        const newStage: Grid = currentStage.map(
          (row): GridCell[] =>
            row.map((cell): GridCell => (cell[1] === 'clear' ? [0 as TetrominoType, 'clear'] : cell))
        ) as Grid;

        player.tetromino.forEach((row, y) => {
          row.forEach((value, x) => {
            const cellValue = typeof value === 'string' ? value : value;
            if (cellValue !== 0) {
              const targetY = y + player.pos.y;
              const targetX = x + player.pos.x;

              // Explicit bounds checking
              if (
                targetY >= 0 &&
                targetY < STAGE_HEIGHT &&
                targetX >= 0 &&
                targetX < STAGE_WIDTH
              ) {
                newStage[targetY][targetX] = [
                  cellValue as TetrominoType,
                  player.collided ? 'merged' : 'clear',
                ] as GridCell;
              }
            }
          });
        });

        // 2. If collided, check lines and spawn next piece
        if (player.collided && nextPiece) {
          const nextType = Object.keys(TETROMINOS).find(key => TETROMINOS[key] === nextPiece) as TetrominoType;
          const initialPos = { x: STAGE_WIDTH / 2 - 2, y: 0 };

          const { stage: sweptStage, cleared } = sweepRows(newStage);

          const newPlayer = {
            pos: initialPos,
            tetromino: nextPiece.shape,
            collided: false,
            type: nextType || 'I',
          };

          // Strict Game Over Rule: Check if the new piece overlaps immediately upon spawn
          if (checkCollision(newPlayer, sweptStage, { x: 0, y: 0 })) {
               setGameStats(prev => ({ ...prev, gameOver: true }));
               setAutoPlay(false);
               return { stage: sweptStage, cleared };
          }

          setPlayer(newPlayer);
          setNextPiece(randomTetromino());

          return { stage: sweptStage, cleared };
        }

        return { stage: newStage, cleared: 0 };
      };

      const { stage: newStage, cleared } = updateStage(prevStage);
      if (cleared > 0) {
        setRowsCleared(cleared);
      } else {
        setRowsCleared(0);
      }
      return newStage;
    });
  }, [player.collided, player.pos.x, player.pos.y, player.tetromino, nextPiece]);

  // Score calculation - use ref to track previous value to avoid setState in effect
  const prevRowsClearedRef = useRef(0);
  useEffect(() => {
    if (rowsCleared > 0 && rowsCleared !== prevRowsClearedRef.current) {
      // Classic Scoring: 100, 300, 500, 800
      const linePoints = [100, 300, 500, 800];
      setGameStats((prev) => ({
        ...prev,
        score: prev.score + linePoints[rowsCleared - 1] * (prev.level + 1),
        rows: prev.rows + rowsCleared,
      }));
      prevRowsClearedRef.current = rowsCleared;
    } else if (rowsCleared === 0) {
      // Reset the reference when no lines are cleared so we can detect the next clear
      prevRowsClearedRef.current = 0;
    }
  }, [rowsCleared]);

  return {
    stage,
    player,
    movePlayer,
    dropPlayer,
    hardDrop,
    playerRotate,
    gameStats,
    setGameStats,
    resetGame,
    rowsCleared,
    nextPiece,
    autoPlay,
    setAutoPlay
  };
};
