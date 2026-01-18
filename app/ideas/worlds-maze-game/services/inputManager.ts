import { Vector2 } from '../types';

export class InputManager {
  private keys: Set<string> = new Set();
  private onMapToggle?: () => void;
  private touchVector: Vector2 = { x: 0, y: 0 };

  constructor(onMapToggle?: () => void) {
    this.onMapToggle = onMapToggle;
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    // Ignore keyboard events when typing in form inputs
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    this.keys.add(e.code);
    if (e.code === 'KeyM') {
      this.onMapToggle?.();
    }
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    this.keys.delete(e.code);
  };

  // Called from the virtual joystick component
  public setTouchVector(vector: Vector2) {
    this.touchVector = vector;
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
    if (this.touchVector.x !== 0 || this.touchVector.y !== 0) {
      x = this.touchVector.x;
      y = this.touchVector.y;
    }

    // Normalize diagonal movement (only for keyboard)
    if (this.touchVector.x === 0 && this.touchVector.y === 0 && x !== 0 && y !== 0) {
      const length = Math.sqrt(x * x + y * y);
      x /= length;
      y /= length;
    }

    return { x, y };
  }

  public isInteractPressed(): boolean {
    return this.keys.has('KeyE') || this.keys.has('Space');
  }

  public isEscapePressed(): boolean {
    return this.keys.has('Escape');
  }

  public cleanup() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
}
