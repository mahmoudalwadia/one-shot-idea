export enum StarPhase {
  STABLE = 'STABLE',
  UNSTABLE = 'UNSTABLE',
  IMPLODING = 'IMPLODING',
  SUPERNOVA = 'SUPERNOVA',
  REMNANT = 'REMNANT'
}

export interface HandData {
  x: number; // -1 to 1 (Horizontal position)
  y: number; // -1 to 1 (Vertical position)
  z: number; // 0 to 1 (Depth/Hand Size: 0=Far, 1=Close)
  pinchDistance: number; // 0 to 1 (0 = closed, 1 = open)
  isPresent: boolean;
}

export interface SimulationState {
  phase: StarPhase;
  coreTemperature: number; // In Kelvin
  mass: number; // Solar masses
  expansionVelocity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
