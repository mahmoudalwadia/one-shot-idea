import { WorldGenerator } from './worldGenerator';
import { InputManager } from './inputManager';
import { GameState, BiomeType, Difficulty, PlayerTheme } from '../types';
import { PLAYER_SPEED, PREVIEW_DURATION } from '../constants';

export interface GameEngineState {
  gameState: GameState;
  world: WorldGenerator | null;
}

const MAP_MODE_DURATION = 3; // seconds

export class GameEngine {
  private world: WorldGenerator;
  private input: InputManager;
  private animationFrameId: number = 0;
  private lastTime: number = 0;
  private isPaused: boolean = false;

  private gameState: GameState;
  private onStateChange: (state: GameEngineState) => void;

  constructor(onStateChange: (state: GameEngineState) => void) {
    this.onStateChange = onStateChange;

    this.input = new InputManager(this.toggleFullMapMode.bind(this));
    this.gameState = this.getInitialState();
    this.world = new WorldGenerator(this.gameState.level, this.gameState.difficulty);

    this.gameState.playerPos = { ...this.world.spawnPoint };

    // Initial state update
    this.onStateChange({ gameState: { ...this.gameState }, world: this.world });
  }

  private getInitialState(): GameState {
    const difficulty = Difficulty.NORMAL;
    return {
      playerPos: { x: 1.5, y: 1.5 },
      playerFacing: { x: 0, y: 1 },
      playerTheme: PlayerTheme.EXPLORER,
      isMoving: false,
      score: 0,
      currentBiome: BiomeType.FOREST,
      level: 1,
      elapsedTime: 0,
      isLevelComplete: false,
      bestTimes: {},
      difficulty,
      isFullMapMode: false,
      mapModeTimeRemaining: 0,
      isPreviewPhase: true,
      previewTimeRemaining: PREVIEW_DURATION[difficulty]
    };
  }

  public start() {
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  public stop() {
    cancelAnimationFrame(this.animationFrameId);
    this.input.cleanup();
  }

  private loop = (time: number) => {
    const deltaTime = time - this.lastTime;
    this.lastTime = time;

    this.update(deltaTime);

    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  private update(deltaTime: number) {
    if (this.isPaused || this.gameState.isLevelComplete) return;

    // Handle preview phase countdown
    if (this.gameState.isPreviewPhase) {
      // Guard against NaN - if countdown is invalid, skip to gameplay
      if (isNaN(this.gameState.previewTimeRemaining) || this.gameState.previewTimeRemaining <= 0) {
        this.gameState.isPreviewPhase = false;
        this.gameState.previewTimeRemaining = 0;
      } else {
        this.gameState.previewTimeRemaining -= deltaTime / 1000;
      }
      this.onStateChange({ gameState: { ...this.gameState }, world: this.world });
      return; // Block all game logic during preview
    }

    // Timer
    this.gameState.elapsedTime += deltaTime;

    // 1. Movement (time-based, normalized to 60fps)
    const moveVector = this.input.getMovementVector();
    if (moveVector.x !== 0 || moveVector.y !== 0) {
        this.gameState.isMoving = true;
        this.gameState.playerFacing = { ...moveVector };

        const timeScale = deltaTime / 16.67; // Normalize to 60fps
        const nextX = this.gameState.playerPos.x + moveVector.x * PLAYER_SPEED * timeScale;
        const nextY = this.gameState.playerPos.y + moveVector.y * PLAYER_SPEED * timeScale;

        if (!this.checkCollision(nextX, nextY)) {
            this.gameState.playerPos.x = nextX;
            this.gameState.playerPos.y = nextY;
        } else if (!this.checkCollision(nextX, this.gameState.playerPos.y)) {
            this.gameState.playerPos.x = nextX;
        } else if (!this.checkCollision(this.gameState.playerPos.x, nextY)) {
            this.gameState.playerPos.y = nextY;
        }
    } else {
        this.gameState.isMoving = false;
    }

    // 2. Goal Detection
    const dx = this.gameState.playerPos.x - (this.world.goalPoint?.x || 0);
    const dy = this.gameState.playerPos.y - (this.world.goalPoint?.y || 0);
    if (Math.sqrt(dx*dx + dy*dy) < 0.6) {
        this.completeLevel();
    }

    // 3. Map mode countdown
    if (this.gameState.isFullMapMode && this.gameState.mapModeTimeRemaining > 0) {
      this.gameState.mapModeTimeRemaining -= deltaTime / 1000;
      if (this.gameState.mapModeTimeRemaining <= 0) {
        this.gameState.isFullMapMode = false;
        this.gameState.mapModeTimeRemaining = 0;
      }
    }

    this.onStateChange({ gameState: { ...this.gameState }, world: this.world });
  }

  private checkCollision(x: number, y: number): boolean {
    const radius = 0.25;
    const points = [[x-radius, y-radius], [x+radius, y-radius], [x-radius, y+radius], [x+radius, y+radius]];
    for (const p of points) {
        const tile = this.world.getTile(Math.floor(p[0]), Math.floor(p[1]));
        if (!tile || tile.isSolid) return true;
    }
    return false;
  }

  private completeLevel() {
    this.gameState.isLevelComplete = true;
    const currentBest = this.gameState.bestTimes[this.gameState.level];
    if (!currentBest || this.gameState.elapsedTime < currentBest) {
        this.gameState.bestTimes[this.gameState.level] = this.gameState.elapsedTime;
    }
    this.gameState.score += Math.max(0, 1000 - Math.floor(this.gameState.elapsedTime / 1000) * 10);
    this.onStateChange({ gameState: { ...this.gameState }, world: this.world });
  }

  public nextLevel() {
    this.gameState.level++;
    this.resetLevel();
  }

  public regenerateCurrentLevel() {
    this.resetLevel();
  }

  public setDifficulty(difficulty: Difficulty) {
    this.gameState.difficulty = difficulty;
    this.resetLevel();
  }

  public setPlayerTheme(theme: PlayerTheme) {
    this.gameState.playerTheme = theme;
    this.onStateChange({ gameState: { ...this.gameState }, world: this.world });
  }

  public setBiome(biome: BiomeType) {
    this.gameState.currentBiome = biome;
    this.resetLevel(true);
  }

  public resetLevel(keepBiome: boolean = false) {
    this.gameState.elapsedTime = 0;
    this.gameState.isLevelComplete = false;
    this.gameState.isPreviewPhase = true;
    // Defensive fallback to NORMAL difficulty duration (6 seconds) if lookup fails
    this.gameState.previewTimeRemaining = PREVIEW_DURATION[this.gameState.difficulty] ?? 6;
    if (!keepBiome) {
      this.gameState.currentBiome = Object.values(BiomeType)[(this.gameState.level - 1) % 16];
    }

    this.world = new WorldGenerator(
      this.gameState.level,
      this.gameState.difficulty,
      keepBiome ? this.gameState.currentBiome : undefined
    );

    this.gameState.playerPos = { ...this.world.spawnPoint };
    this.onStateChange({ gameState: { ...this.gameState }, world: this.world });
  }

  public toggleFullMapMode() {
    this.gameState.isFullMapMode = !this.gameState.isFullMapMode;

    // Set countdown when entering map mode
    if (this.gameState.isFullMapMode) {
      this.gameState.mapModeTimeRemaining = MAP_MODE_DURATION;
    } else {
      this.gameState.mapModeTimeRemaining = 0;
    }

    this.onStateChange({ gameState: { ...this.gameState }, world: this.world });
  }

  public getWorld(): WorldGenerator {
    return this.world;
  }

  public startGame() {
    this.isPaused = false;
    this.resetLevel();
  }

  public setPaused(paused: boolean) {
    this.isPaused = paused;
  }

  public setTouchVector(vector: { x: number; y: number }) {
    this.input.setTouchVector(vector);
  }
}
