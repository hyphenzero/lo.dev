import { useEffect, useRef, type RefObject } from "react";
import { buildAtlas, type GlyphAtlas } from "./glyph-atlas";
import { createRenderer, type Renderer } from "./renderer";
import { hexToRgb01 } from "./color";
import {
  composeField,
  makeBuffers,
  makeTarget,
  type FieldBuffers,
  type FieldGrid,
  type InkMode,
  type InkPaint,
  type Shock,
  type Target,
  type WavePattern,
} from "./vortex-field";
import { depositTrail, makeTrailField, stepTrail } from "./trail-field";
import { renderWord, type FontStyle } from "./block-font";

export interface StageConfig {
  rows?: string[];
  word?: string;
  style?: FontStyle;
  inkStops: string[];
  logoColor: string;
  gradient: boolean;
  gradientAngle: number;
  gradientFlow: number;
  gradientMode?: InkMode;
  bg: string;
  text: string;
  scanlines: number;
  aberration: number;
  curvature: number;
  tonemapExposure: number;
  zoom: number;
  trail: boolean;
  trailStrength?: number;
  trailFlare?: string;
  shock: boolean;
  turbulence: number;
  wavePattern: WavePattern;
}

export const DEFAULT_STAGE: Omit<StageConfig, "rows" | "word" | "style" | "bg" | "zoom" | "inkStops" | "logoColor"> = {
  gradient: false,
  gradientAngle: 0,
  gradientFlow: 0,
  text: "",
  scanlines: 0.4,
  aberration: 1,
  curvature: 1,
  tonemapExposure: 0,
  trail: false,
  shock: false,
  turbulence: 0,
  wavePattern: "wavefront",
};

const BASE_ROWS = 22;
const VEL_SMOOTH = 5.0;
const SHOCK_LIFE = 2.4;

export interface StageHandle {
  replay: () => void;
  setPointer: (p: { x: number; y: number } | null) => void;
  burst: (x: number, y: number) => void;
}

function resolveTarget(c: StageConfig): Target {
  if (c.rows && c.rows.length) return makeTarget(c.rows);
  return makeTarget(renderWord(c.word ?? " ", c.style ?? "slant"));
}

function targetKey(c: StageConfig): string {
  return c.rows ? "rows:" + c.rows.join("|") : `word:${c.word}:${c.style}`;
}

export interface StageEvents {
  onFormationStart?: () => void;
  onSettle?: () => void;
  onVisible?: (visible: boolean) => void;
  onFirstFrame?: () => void;
  onPointerMove?: (speed: number) => void;
  onPointerDown?: () => void;
}

export function useSwirlStage(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  cfgRef: RefObject<StageConfig>,
  onFail: () => void,
  eventsRef?: RefObject<StageEvents>,
): RefObject<StageHandle> {
  const handle = useRef<StageHandle>({ replay: () => {}, setPointer: () => {}, burst: () => {} });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const r: Renderer | null = createRenderer(canvas);
    if (!r) {
      onFail();
      return;
    }
    const { gl } = r;
    const { round, max, floor } = Math;

    const glyphs: string[] = [];
    const lookup: Record<string, number> = Object.create(null);
    const addGlyph = (cc: string) => {
      if (lookup[cc] !== undefined) return;
      lookup[cc] = glyphs.length;
      glyphs.push(cc);
    };
    for (let code = 32; code <= 126; code++) addGlyph(String.fromCharCode(code));
    for (const cc of "\u2588\u2593") addGlyph(cc);
    addGlyph(" ");
    const spaceSlot = lookup[" "];
    const slotOf = (cc: string, weight: number) => {
      const i = lookup[cc];
      return weight * glyphs.length + (i === undefined ? spaceSlot : i);
    };

    let source: string[] = cfgRef.current.text.split("\n").map((e) => e.replace(/\t/g, "    "));
    let lastText = cfgRef.current.text;

    let target: Target = resolveTarget(cfgRef.current);
    let lastTargetKey = targetKey(cfgRef.current);
    let lastZoom = cfgRef.current.zoom;

    let atlas: GlyphAtlas | null = null;
    let grid: FieldGrid | null = null;
    let buffers: FieldBuffers | null = null;
    let lastCw = -1;
    let lastCh = -1;

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        lastCw = -1;
        lastCh = -1;
      });
      ro.observe(canvas);
    }

    let visible = true;
    let io: IntersectionObserver | null = null;

    const pointer = { x: 0, y: 0, active: false };
    const trail = makeTrailField();
    let velX = 0;
    let velY = 0;
    let prevPx = 0;
    let prevPy = 0;
    let havePrev = false;
    const shocks: Shock[] = [];

    function rebuild(cw: number, ch: number) {
      const c = cfgRef.current;
      const rows = max(8, round(BASE_ROWS / max(0.3, c.zoom)));
      atlas = buildAtlas(gl, r!.glyphTex, r!.scratch, glyphs, max(8, round(ch / rows)));
      const gridRows = max(target.rows.length, Math.ceil(ch / atlas.inkSize) + 1);
      const contentH = gridRows * atlas.inkSize;
      const cols = floor(cw / atlas.advance);
      grid = {
        cols,
        rows: gridRows,
        inkSize: atlas.inkSize,
        vOffset: round((ch - contentH) / 2),
        targetX: max(0, round((cols - (target.rows[0]?.length ?? 0)) / 2)),
        targetY: max(0, round((gridRows - target.rows.length) / 2)),
      };
      buffers = makeBuffers(gridRows * cols);
      r!.allocCells(buffers);
      r!.resizeTargets(cw, ch);
    }

    let startTime = 0;
    let prevTime = 0;
    let raf = 0;
    let settled = false;
    let firstFramePainted = false;
    const FORMATION_SETTLE_SEC = 1.8;

    function startLoop() {
      if (raf !== 0) return;
      prevTime = 0;
      raf = requestAnimationFrame(frame);
    }
    function stopLoop() {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    handle.current = {
      replay: () => {
        startTime = 0;
      },
      setPointer: (p) => {
        if (p) {
          pointer.x = p.x;
          pointer.y = p.y;
          pointer.active = true;
        } else {
          pointer.active = false;
        }
      },
      burst: (x, y) => {
        shocks.push({ x, y, age: 0 });
        if (shocks.length > 4) shocks.shift();
      },
    };

    function frame(time: number) {
      const c = cfgRef.current;
      if (c.text !== lastText) {
        lastText = c.text;
        source = c.text.split("\n").map((e) => e.replace(/\t/g, "    "));
        lastCw = -1;
      }
      const tk = targetKey(c);
      if (tk !== lastTargetKey) {
        lastTargetKey = tk;
        target = resolveTarget(c);
        lastCw = -1;
        startTime = 0;
      }
      if (c.zoom !== lastZoom) {
        lastZoom = c.zoom;
        lastCw = -1;
      }

      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = round(rect.width * dpr);
      const ch = round(rect.height * dpr);
      if (cw > 0 && ch > 0 && (cw !== lastCw || ch !== lastCh)) {
        rebuild(cw, ch);
        lastCw = cw;
        lastCh = ch;
      }

      if (grid && atlas && buffers) {
        if (startTime === 0) {
          startTime = time;
          settled = false;
          eventsRef?.current?.onFormationStart?.();
        }
        if (prevTime === 0) prevTime = time;
        const elapsed = time - startTime;
        const dt = Math.min(0.05, Math.max(0.001, (time - prevTime) / 1000));
        prevTime = time;

        if (!settled && elapsed * 0.001 >= FORMATION_SETTLE_SEC) {
          settled = true;
          eventsRef?.current?.onSettle?.();
        }

        if (c.trail) {
          if (pointer.active) {
            const vSp = 1 - Math.exp(-VEL_SMOOTH * dt);
            if (havePrev) {
              const instVx = (pointer.x - prevPx) / dt;
              const instVy = (pointer.y - prevPy) / dt;
              velX += (instVx - velX) * vSp;
              velY += (instVy - velY) * vSp;
            }
            prevPx = pointer.x;
            prevPy = pointer.y;
            havePrev = true;
            if (Math.hypot(velX, velY) > 0.5) {
              depositTrail(trail, pointer.x, pointer.y, velX, velY, dt);
            }
          } else {
            havePrev = false;
            velX *= 1 - (1 - Math.exp(-VEL_SMOOTH * dt));
            velY *= 1 - (1 - Math.exp(-VEL_SMOOTH * dt));
          }
          stepTrail(trail, dt);
        }

        if (shocks.length) {
          for (let i = 0; i < shocks.length; i++) shocks[i].age += dt;
          for (let i = shocks.length - 1; i >= 0; i--) {
            if (shocks[i].age > SHOCK_LIFE) shocks.splice(i, 1);
          }
        }

        const stops = (c.gradient ? c.inkStops : c.inkStops.slice(0, 1)).map(hexToRgb01);
        const paint: InkPaint = {
          stops: stops.length ? (stops as [number, number, number][]) : [[1, 1, 1]],
          angle: c.gradientAngle,
          flow: c.gradient ? (elapsed * 0.001 * c.gradientFlow) : 0,
          gradient: c.gradient && stops.length > 1,
          mode: c.gradientMode ?? "rows",
        };
        const bg = hexToRgb01(c.bg);
        const count = composeField({
          grid,
          atlas,
          buffers,
          source: source.length ? source : [""],
          target,
          elapsed,
          paint,
          logo: hexToRgb01(c.logoColor),
          slotOf,
          trail: c.trail ? trail : undefined,
          trailStrength: c.trailStrength,
          trailFlare: c.trailFlare ? hexToRgb01(c.trailFlare) : undefined,
          shocks: c.shock && shocks.length ? shocks : undefined,
          turbulence: c.turbulence,
          wavePattern: c.wavePattern,
        });
        r!.drawField(count, grid, buffers, bg);
        r!.drawCrt(elapsed * 0.001, cw, ch, {
          scanline: c.scanlines,
          aberration: c.aberration,
          curvature: c.curvature,
          tonemap: c.tonemapExposure,
          bg,
        });
        if (!firstFramePainted) {
          firstFramePainted = true;
          eventsRef?.current?.onFirstFrame?.();
        }
      }
      raf = 0;
      if (visible) raf = requestAnimationFrame(frame);
    }

    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => {
          const nowVisible = entry.isIntersecting;
          if (nowVisible && !visible) {
            visible = true;
            startTime = 0;
            startLoop();
            eventsRef?.current?.onVisible?.(true);
          } else if (!nowVisible && visible) {
            visible = false;
            stopLoop();
            eventsRef?.current?.onVisible?.(false);
          }
        },
        { threshold: 0, rootMargin: "0px" },
      );
      io.observe(canvas);
      visible = false;
    } else {
      startLoop();
    }

    return () => {
      stopLoop();
      ro?.disconnect();
      io?.disconnect();
      r.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return handle;
}
