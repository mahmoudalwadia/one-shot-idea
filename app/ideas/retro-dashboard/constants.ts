import { VisualMode, ModeConfig } from './types';

export const MODES: ModeConfig[] = [
  {
    id: VisualMode.NEON_RETRO,
    label: "NEON GRID",
    description: "Synthwave aesthetic with volumetric atmosphere.",
    color: "fuchsia-500",
    hexColor: "#d946ef",
    iconName: "Grid"
  },
  {
    id: VisualMode.WIREFRAME_MAP,
    label: "WORLD DATA",
    description: "Geospatial wireframe projection.",
    color: "emerald-500",
    hexColor: "#10b981",
    iconName: "Globe"
  },
  {
    id: VisualMode.RADAR_SWEEP,
    label: "LIDAR SCAN",
    description: "Active sonar/lidar environment scanning.",
    color: "green-500",
    hexColor: "#22c55e",
    iconName: "Radar"
  },
  {
    id: VisualMode.WARP_SPEED,
    label: "HYPERDRIVE",
    description: "High velocity starfield traversal.",
    color: "blue-400",
    hexColor: "#60a5fa",
    iconName: "Zap"
  },
  {
    id: VisualMode.HEATMAP,
    label: "THERMAL",
    description: "Thermal gradient analysis of terrain.",
    color: "orange-500",
    hexColor: "#f97316",
    iconName: "Activity"
  },
  {
    id: VisualMode.MATRIX_RAIN,
    label: "SYSTEM",
    description: "Raw data stream visualization.",
    color: "lime-400",
    hexColor: "#a3e635",
    iconName: "Code"
  },
  {
    id: VisualMode.STORM_WATCH,
    label: "ATMOSPHERE",
    description: "Heavy weather monitoring system.",
    color: "slate-300",
    hexColor: "#cbd5e1",
    iconName: "CloudLightning"
  },
  {
    id: VisualMode.ZEN_MINIMAL,
    label: "STANDBY",
    description: "Low power minimal geometric state.",
    color: "white",
    hexColor: "#ffffff",
    iconName: "Circle"
  }
];

export const INITIAL_MODE = VisualMode.NEON_RETRO;
