export interface CountryProperties {
  name: string;
  iso_a3?: string;
  pop_est?: number;
  [key: string]: string | number | undefined;
}

export interface GeoJsonGeometry {
  type: string;
  coordinates: unknown;
}

export interface GeoJsonFeature {
  type: "Feature";
  properties: CountryProperties;
  geometry: GeoJsonGeometry;
  id?: string | number;
}

export interface GeoJsonCollection {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}

export interface GlobeTheme {
  id: string;
  name: string;
  type: 'dark' | 'light';
  background: string; // CSS background for the container
  oceanColor: string | [string, string]; // Solid color or [start, end] for radial gradient
  landColor: string; // Base color if not political
  strokeColor: string;
  strokeWidth?: number; // Optional custom stroke width (default 0.5)
  graticuleColor: string;
  atmosphereColor: string; // For the outer glow
  atmosphereOpacity: number;
  showStars: boolean;
  nebula: boolean;
  enableShadow: boolean; // Day/Night terminator
  colorMode: 'default' | 'political'; // 'political' assigns different colors to countries
}
