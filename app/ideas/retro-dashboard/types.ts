export enum VisualMode {
  NEON_RETRO = 'NEON_RETRO',
  WIREFRAME_MAP = 'WIREFRAME_MAP',
  RADAR_SWEEP = 'RADAR_SWEEP',
  WARP_SPEED = 'WARP_SPEED',
  HEATMAP = 'HEATMAP',
  MATRIX_RAIN = 'MATRIX_RAIN',
  STORM_WATCH = 'STORM_WATCH',
  ZEN_MINIMAL = 'ZEN_MINIMAL',
}

export interface ModeConfig {
  id: VisualMode;
  label: string;
  description: string;
  color: string; // Tailwind color class stub (e.g., 'cyan-500')
  hexColor: string; // For Canvas/Three.js
  iconName: string;
}

export interface ControlPanelProps {
  currentMode: VisualMode;
  onModeSelect: (mode: VisualMode) => void;
  backButton?: React.ReactNode;
}
