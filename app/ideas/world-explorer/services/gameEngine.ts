import { WorldGenerator } from './worldGenerator';
import { Renderer } from './renderer';
import { InputManager } from './inputManager';
import { GameState, Vector2, BiomeType, NPC } from '../types';
import { PLAYER_SPEED, INTERACTION_RADIUS, WORLD_SIZE } from '../constants';

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private renderer: Renderer;
  private world: WorldGenerator;
  private input: InputManager;
  private animationFrameId: number = 0;
  private lastTime: number = 0;

  // State
  private gameState: GameState;
  private camera: Vector2;
  private onStateChange: (state: GameState) => void;

  constructor(canvas: HTMLCanvasElement, onStateChange: (state: GameState) => void) {
    this.canvas = canvas;
    this.onStateChange = onStateChange;
    this.ctx = canvas.getContext('2d', { alpha: false })!;

    // Initialize Systems
    this.world = new WorldGenerator();
    this.input = new InputManager();
    this.renderer = new Renderer(this.ctx, canvas.width, canvas.height);

    // Initial State - spawn in center
    const spawnX = WORLD_SIZE / 2;
    const spawnY = WORLD_SIZE / 2;

    this.gameState = {
      playerPos: { x: spawnX, y: spawnY },
      playerFacing: { x: 0, y: 1 },
      isMoving: false,
      score: 0,
      discoveries: 0,
      currentBiome: BiomeType.FOREST,
      isDialogueOpen: false,
      activeNPC: null,
      currentDialogueNode: null
    };

    this.camera = { ...this.gameState.playerPos };

    this.resize();
    window.addEventListener('resize', this.resize);
  }

  private resize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.renderer.resize(this.canvas.width, this.canvas.height);
  };

  public start() {
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  public stop() {
    cancelAnimationFrame(this.animationFrameId);
    this.input.cleanup();
    window.removeEventListener('resize', this.resize);
  }

  private loop = (time: number) => {
    this.lastTime = time;

    this.update();
    this.draw();

    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  private update() {
    if (this.gameState.isDialogueOpen) {
        this.gameState.isMoving = false;
        if (this.input.isEscapePressed()) {
            this.closeDialogue();
        }
    } else {
        // 1. Movement
        const moveVector = this.input.getMovementVector();

        if (moveVector.x !== 0 || moveVector.y !== 0) {
            this.gameState.isMoving = true;
            this.gameState.playerFacing = { ...moveVector };

            const nextX = this.gameState.playerPos.x + moveVector.x * PLAYER_SPEED;
            const nextY = this.gameState.playerPos.y + moveVector.y * PLAYER_SPEED;

            // Collision Check
            const tileX = Math.floor(nextX);
            const tileY = Math.floor(nextY);
            const tile = this.world.getTile(tileX, tileY);

            // Keep in bounds
            if (nextX >= 0 && nextX < WORLD_SIZE && nextY >= 0 && nextY < WORLD_SIZE) {
                // Only move if not solid
                if (tile && !tile.isSolid) {
                    this.gameState.playerPos.x = nextX;
                    this.gameState.playerPos.y = nextY;
                }
            }
        } else {
            this.gameState.isMoving = false;
        }

        // 2. Biome Detection
        const currentTile = this.world.getTile(Math.floor(this.gameState.playerPos.x), Math.floor(this.gameState.playerPos.y));
        if (currentTile && currentTile.biome !== this.gameState.currentBiome) {
            const isNew = !this.hasVisitedBiome(currentTile.biome);
            this.gameState.currentBiome = currentTile.biome;
            if (isNew) this.gameState.score += 50;
        }

        // 3. Collectibles
        this.world.collectibles.forEach(c => {
            if (!c.collected) {
                const dist = Math.sqrt(
                    Math.pow(this.gameState.playerPos.x - c.position.x, 2) +
                    Math.pow(this.gameState.playerPos.y - c.position.y, 2)
                );
                if (dist < 0.5) {
                    c.collected = true;
                    this.gameState.score += 10;
                    this.gameState.discoveries += 1;
                }
            }
        });

        // 4. Interaction
        if (this.input.isInteractPressed()) {
            const npc = this.findNearbyNPC();
            if (npc) {
                this.openDialogue(npc);
            }
        }
    }

    // Camera Lerp
    this.camera.x += (this.gameState.playerPos.x - this.camera.x) * 0.08;
    this.camera.y += (this.gameState.playerPos.y - this.camera.y) * 0.08;

    // Update Particles
    this.renderer.updateParticles();

    // Sync State to React
    this.onStateChange({ ...this.gameState });
  }

  private draw() {
    this.renderer.draw(this.gameState, this.world, this.camera);
  }

  // Helper Methods
  // biome parameter is required by the logic but currently unused
  private hasVisitedBiome(_biome: BiomeType): boolean {
      // Simplified - always award points
      return false;
  }

  private findNearbyNPC() {
      return this.world.npcs.find(npc => {
          const dist = Math.sqrt(
            Math.pow(this.gameState.playerPos.x - npc.position.x, 2) +
            Math.pow(this.gameState.playerPos.y - npc.position.y, 2)
          );
          return dist < INTERACTION_RADIUS;
      });
  }

  public openDialogue(npc: NPC) {
      if (this.gameState.isDialogueOpen) return;

      this.gameState.isDialogueOpen = true;
      this.gameState.activeNPC = npc;
      this.gameState.currentDialogueNode = npc.dialogueNodes[npc.dialogueRoot];

      // Award points for first talk
      this.gameState.score += 25;

      this.input.cleanup();
  }

  public advanceDialogue(nextId?: string) {
      if (!nextId || !this.gameState.activeNPC) {
          this.closeDialogue();
          return;
      }
      this.gameState.currentDialogueNode = this.gameState.activeNPC.dialogueNodes[nextId];
  }

  public closeDialogue() {
      this.gameState.isDialogueOpen = false;
      this.gameState.activeNPC = null;
      this.gameState.currentDialogueNode = null;
      // Re-bind input
      this.input = new InputManager();
  }

  public getInputManager(): InputManager {
      return this.input;
  }
}
