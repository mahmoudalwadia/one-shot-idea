
export interface Interaction {
  x: number;
  y: number;
  active: boolean;
}

export interface PatternConfig {
  id: string;
  name: string;
  description: string;
  category: 'Geometric' | 'Organic' | 'Structure' | 'Algorithmic';
}

export type DrawFunction = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  speed: number,
  mouse: Interaction
) => void;

export interface PatternDefinition extends PatternConfig {
  draw: DrawFunction;
}
