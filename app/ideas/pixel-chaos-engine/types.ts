export type PaletteName = 'Primary Chaos' | 'Cool' | 'Warm' | 'Mono+Accent' | 'Neon' | 'Earth' | 'Pastel' | 'Darkwave';

// Generic parameter types for dynamic UI generation
export type ParamType = 'number' | 'boolean' | 'select' | 'color';

export interface ParamSchema {
  type: ParamType;
  label: string;
  default: string | number | boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: string[]; // For select
}

export type ParamsSchemaMap = Record<string, ParamSchema>;

// The definition of a style (metadata + factory)
export interface StyleDefinition {
  id: string;
  name: string;
  description: string;
  schema: ParamsSchemaMap;
  create: (seed: string, params: Record<string, string | number | boolean>, width: number, height: number) => StyleInstance;
  presets: Record<string, Record<string, string | number | boolean>>;
}

// The runtime instance of a style
export interface StyleInstance {
  // Render the background/static elements once
  renderStatic(ctx: CanvasRenderingContext2D): void;
  // Render the animation frame (delta or composite)
  // t is time in ms, staticCanvas is the pre-rendered background
  renderFrame(ctx: CanvasRenderingContext2D, t: number, staticCanvas: HTMLCanvasElement): void;
  dispose?(): void;
}

export interface ArtConfig {
  styleId: string;
  seed: string;
  params: Record<string, string | number | boolean>;
}

export interface Point {
  x: number;
  y: number;
}
