import { StyleDefinition } from '../types';
import { PixelChaosStyle } from './pixelChaos';
import { FlowFieldStyle, VoronoiStyle, CRTStyle, NeonCityStyle } from './miscStyles1';
import { InkWashStyle, BauhausStyle, TopoStyle, ConstellationStyle } from './miscStyles2';
import { MosaicStyle, PaperCutStyle, MinimalStyle } from './miscStyles3';
import { IsometricStyle, TruchetStyle, HexGridStyle, CircuitStyle, MondrianStyle, CirclesStyle, StripeStyle, SortingStyle, TriangleStyle, CrossStyle } from './geometric';
import { LSystemStyle, CoralStyle, RainStyle, StarryStyle, LightningStyle, WebStyle, SeedStyle, MetalStyle, FireStyle, CloudStyle } from './organic';
import { MatrixStyle, VHSStyle, ASCIIStyle, RadarStyle, TerminalStyle, LifeStyle, EqualizerStyle, BSODStyle, SynthStyle, RPGStyle } from './retro';
import { PollockStyle, KandinskyStyle, CubismStyle, PointStyle, StringStyle, SpiroStyle, KaleidoStyle, BrutalStyle, HalftoneStyle, GraffitiStyle } from './abstract';
import { DataStyle, FiberStyle, ShardStyle, SmokeStyle, LaserStyle, BubbleStyle, ConfettiStyle, SpiralStyle, BarcodeStyle, QRStyle } from './experimental';
import { BambooStyle, SakuraStyle, AuroraStyle, OceanStyle, GalaxyStyle, BlackHoleStyle, PlanetStyle, ZenStyle, IslamicStyle, TartanStyle, CityLightsStyle, TrafficStyle, LiquidStyle, SnowStyle, FireworksStyle, BokehStyle, GlyphsStyle, DesertStyle, ShatterStyle, MarbleStyle, TotemStyle } from './expansion';

export const STYLES: Record<string, StyleDefinition> = {
  // Originals
  [PixelChaosStyle.id]: PixelChaosStyle,
  [FlowFieldStyle.id]: FlowFieldStyle,
  [VoronoiStyle.id]: VoronoiStyle,
  [CRTStyle.id]: CRTStyle,
  [NeonCityStyle.id]: NeonCityStyle,
  [InkWashStyle.id]: InkWashStyle,
  [BauhausStyle.id]: BauhausStyle,
  [TopoStyle.id]: TopoStyle,
  [ConstellationStyle.id]: ConstellationStyle,
  [MosaicStyle.id]: MosaicStyle,
  [PaperCutStyle.id]: PaperCutStyle,
  [MinimalStyle.id]: MinimalStyle,

  // Geometric
  [IsometricStyle.id]: IsometricStyle,
  [TruchetStyle.id]: TruchetStyle,
  [HexGridStyle.id]: HexGridStyle,
  [CircuitStyle.id]: CircuitStyle,
  [MondrianStyle.id]: MondrianStyle,
  [CirclesStyle.id]: CirclesStyle,
  [StripeStyle.id]: StripeStyle,
  [SortingStyle.id]: SortingStyle,
  [TriangleStyle.id]: TriangleStyle,
  [CrossStyle.id]: CrossStyle,

  // Organic
  [LSystemStyle.id]: LSystemStyle,
  [CoralStyle.id]: CoralStyle,
  [RainStyle.id]: RainStyle,
  [StarryStyle.id]: StarryStyle,
  [LightningStyle.id]: LightningStyle,
  [WebStyle.id]: WebStyle,
  [SeedStyle.id]: SeedStyle,
  [MetalStyle.id]: MetalStyle,
  [FireStyle.id]: FireStyle,
  [CloudStyle.id]: CloudStyle,

  // Retro
  [MatrixStyle.id]: MatrixStyle,
  [VHSStyle.id]: VHSStyle,
  [ASCIIStyle.id]: ASCIIStyle,
  [RadarStyle.id]: RadarStyle,
  [TerminalStyle.id]: TerminalStyle,
  [LifeStyle.id]: LifeStyle,
  [EqualizerStyle.id]: EqualizerStyle,
  [BSODStyle.id]: BSODStyle,
  [SynthStyle.id]: SynthStyle,
  [RPGStyle.id]: RPGStyle,

  // Abstract
  [PollockStyle.id]: PollockStyle,
  [KandinskyStyle.id]: KandinskyStyle,
  [CubismStyle.id]: CubismStyle,
  [PointStyle.id]: PointStyle,
  [StringStyle.id]: StringStyle,
  [SpiroStyle.id]: SpiroStyle,
  [KaleidoStyle.id]: KaleidoStyle,
  [BrutalStyle.id]: BrutalStyle,
  [HalftoneStyle.id]: HalftoneStyle,
  [GraffitiStyle.id]: GraffitiStyle,

  // Experimental
  [DataStyle.id]: DataStyle,
  [FiberStyle.id]: FiberStyle,
  [ShardStyle.id]: ShardStyle,
  [SmokeStyle.id]: SmokeStyle,
  [LaserStyle.id]: LaserStyle,
  [BubbleStyle.id]: BubbleStyle,
  [ConfettiStyle.id]: ConfettiStyle,
  [SpiralStyle.id]: SpiralStyle,
  [BarcodeStyle.id]: BarcodeStyle,
  [QRStyle.id]: QRStyle,

  // Massive Expansion Pack (Nature, Space, Culture, Urban)
  [BambooStyle.id]: BambooStyle,
  [SakuraStyle.id]: SakuraStyle,
  [AuroraStyle.id]: AuroraStyle,
  [OceanStyle.id]: OceanStyle,
  [GalaxyStyle.id]: GalaxyStyle,
  [BlackHoleStyle.id]: BlackHoleStyle,
  [PlanetStyle.id]: PlanetStyle,
  [ZenStyle.id]: ZenStyle,
  [IslamicStyle.id]: IslamicStyle,
  [TartanStyle.id]: TartanStyle,
  [CityLightsStyle.id]: CityLightsStyle,
  [TrafficStyle.id]: TrafficStyle,
  [LiquidStyle.id]: LiquidStyle,
  [SnowStyle.id]: SnowStyle,
  [FireworksStyle.id]: FireworksStyle,
  [BokehStyle.id]: BokehStyle,
  [GlyphsStyle.id]: GlyphsStyle,
  [DesertStyle.id]: DesertStyle,
  [ShatterStyle.id]: ShatterStyle,
  [MarbleStyle.id]: MarbleStyle,
  [TotemStyle.id]: TotemStyle,
};

export const DEFAULT_STYLE_ID = PixelChaosStyle.id;
