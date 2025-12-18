import { ArtConfig, StyleInstance } from '../types';
import { STYLES, DEFAULT_STYLE_ID } from '../styles/registry';

const WIDTH = 900;
const HEIGHT = 1200;

export class ArtEngine {
  private staticCanvas: HTMLCanvasElement;
  private staticCtx: CanvasRenderingContext2D;
  private currentStyle: StyleInstance | null = null;
  private config: ArtConfig;
  private hasError = false;

  constructor(config: ArtConfig) {
    this.config = config;

    // Offscreen buffer for static layers
    this.staticCanvas = document.createElement('canvas');
    this.staticCanvas.width = WIDTH;
    this.staticCanvas.height = HEIGHT;
    const ctx = this.staticCanvas.getContext('2d', { alpha: false });
    if (!ctx) throw new Error("Context failure");
    this.staticCtx = ctx;

    this.loadStyle();
  }

  public updateConfig(newConfig: ArtConfig) {
    const styleChanged = newConfig.styleId !== this.config.styleId;
    const seedChanged = newConfig.seed !== this.config.seed;
    const paramsChanged = JSON.stringify(newConfig.params) !== JSON.stringify(this.config.params);

    this.config = newConfig;

    if (styleChanged || seedChanged || paramsChanged || this.hasError) {
      this.loadStyle();
    }
  }

  private drawError(message: string, detail: string = "") {
    this.hasError = true;
    this.staticCtx.fillStyle = '#100';
    this.staticCtx.fillRect(0, 0, WIDTH, HEIGHT);

    this.staticCtx.fillStyle = '#F00';
    this.staticCtx.font = 'bold 30px monospace';
    this.staticCtx.textAlign = 'left';
    this.staticCtx.fillText("RENDER ERROR", 40, 60);

    this.staticCtx.fillStyle = '#FAA';
    this.staticCtx.font = '20px monospace';
    this.staticCtx.fillText(message, 40, 100);
    if (detail) {
        this.staticCtx.font = '14px monospace';
        this.staticCtx.fillText(detail.substring(0, 60), 40, 130);
    }

    // Fallback: Ensure currentStyle is null so we don't try to render it again
    this.currentStyle = null;
  }

  private loadStyle() {
    this.hasError = false;

    // Cleanup old style
    try {
      if (this.currentStyle && this.currentStyle.dispose) {
        this.currentStyle.dispose();
      }
    } catch (e) {
      console.warn("Failed to dispose style", e);
    }

    let def = STYLES[this.config.styleId];
    if (!def) {
      console.error(`Style ${this.config.styleId} not found, falling back`);
      def = STYLES[DEFAULT_STYLE_ID];
    }

    try {
      // Initialize new style
      this.currentStyle = def.create(this.config.seed, this.config.params, WIDTH, HEIGHT);

      // Clear static canvas before rendering new static
      this.staticCtx.fillStyle = '#000';
      this.staticCtx.fillRect(0, 0, WIDTH, HEIGHT);

      // Render static layer immediately
      this.currentStyle.renderStatic(this.staticCtx);
    } catch (e: unknown) {
      console.error("CRITICAL: Failed to load style", e);
      this.drawError("Style Initialization Failed", e instanceof Error ? e.message : String(e));
    }
  }

  public getResolution() {
    return { width: WIDTH, height: HEIGHT };
  }

  public render(ctx: CanvasRenderingContext2D, time: number) {
    // If error, draw the static canvas (which contains the error message)
    if (this.hasError) {
        ctx.drawImage(this.staticCanvas, 0, 0);
        return;
    }

    if (!this.currentStyle) return;

    // Critical: Isolate frame state to prevent pollution (e.g. globalCompositeOperation leaking)
    ctx.save();

    // Reset common state to defaults just to be safe
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;
    ctx.filter = 'none';

    try {
      this.currentStyle.renderFrame(ctx, time, this.staticCanvas);
    } catch (e: unknown) {
      console.error("Runtime render error", e);
      // Draw error to static canvas immediately
      this.drawError("Runtime Render Failed", e instanceof Error ? e.message : String(e));
      // Force draw to screen immediately so we don't wait for next frame
      ctx.drawImage(this.staticCanvas, 0, 0);
    } finally {
      ctx.restore();
    }
  }
}
