import { Vector2 } from '../types';

export class InputManager {
  private keys: Set<string> = new Set();
  private touchMovement: Vector2 = { x: 0, y: 0 };
  private touchInteract: boolean = false;
  private touchInteractConsumed: boolean = false;

  constructor() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    this.keys.add(e.code);
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    this.keys.delete(e.code);
  };

  // Touch control methods
  public setTouchMovement(direction: 'up' | 'down' | 'left' | 'right' | null): void {
    if (direction === null) {
      this.touchMovement = { x: 0, y: 0 };
      return;
    }

    switch (direction) {
      case 'up':
        this.touchMovement = { x: 0, y: -1 };
        break;
      case 'down':
        this.touchMovement = { x: 0, y: 1 };
        break;
      case 'left':
        this.touchMovement = { x: -1, y: 0 };
        break;
      case 'right':
        this.touchMovement = { x: 1, y: 0 };
        break;
    }
  }

  public setTouchInteract(pressed: boolean): void {
    if (pressed && !this.touchInteract) {
      this.touchInteract = true;
      this.touchInteractConsumed = false;
    } else if (!pressed) {
      this.touchInteract = false;
      this.touchInteractConsumed = false;
    }
  }

  public getMovementVector(): Vector2 {
    let x = 0;
    let y = 0;

    // Keyboard input
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) y -= 1;
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) y += 1;
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) x -= 1;
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) x += 1;

    // Touch input (takes precedence if active)
    if (this.touchMovement.x !== 0 || this.touchMovement.y !== 0) {
      x = this.touchMovement.x;
      y = this.touchMovement.y;
    }

    // Normalize diagonal movement
    if (x !== 0 && y !== 0) {
      const length = Math.sqrt(x * x + y * y);
      x /= length;
      y /= length;
    }

    return { x, y };
  }

  public isInteractPressed(): boolean {
    const keyboardInteract = this.keys.has('KeyE') || this.keys.has('Space');
    const touchInteract = this.touchInteract && !this.touchInteractConsumed;

    if (touchInteract) {
      this.touchInteractConsumed = true;
      return true;
    }

    return keyboardInteract;
  }

  public isEscapePressed(): boolean {
    return this.keys.has('Escape');
  }

  public cleanup() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
}
