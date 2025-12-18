export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'CRIT';
  message: string;
  code?: string;
}

export interface PlanetaryData {
  name: string;
  distance: string;
  composition: string;
  habitability: number;
}

export interface SensorReading {
  label: string;
  value: number;
  max: number;
  unit: string;
  status: 'optimal' | 'nominal' | 'warning' | 'critical';
}

export enum ViewMode {
  ORBITAL = 'ORBITAL',
  TERRAIN = 'TERRAIN',
  THERMAL = 'THERMAL',
  SPECTRAL = 'SPECTRAL'
}
