// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useReducedMotion } from '@gp/ui/hooks';
import styles from './dither-background.module.css';

export type DitherPatternType = 'wave' | 'ripple';
export type DitherPaletteType = 'green' | 'iridescent' | 'purple-pink';
export type DitherMaskMode = 'bottom' | 'bands' | 'top-fade';

export interface WebGLDitherSurfaceProps {
  readonly className?: string;
  readonly dotOpacity?: number;
  readonly interactiveCursor?: boolean;
  readonly interactionTarget?: HTMLElement | null;
  readonly maskMode?: DitherMaskMode;
  readonly palette?: DitherPaletteType;
  /**
   * When true, composites Bayer dithered tones over alpha=0 so host Gridline borders and backgrounds stay intact.
   */
  readonly transparentBackground?: boolean;
  readonly type?: DitherPatternType;
}

const VERTEX_SHADER_SRC = /* glsl */ `
attribute vec2 a_pos;
varying vec2 v_uv;

void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

// Ported from brand-webgl's Bayer64 + wave/ripple + pearl gradient shaders with cursor Bayer patch support.
const FRAGMENT_SHADER_SRC = /* glsl */ `
precision highp float;

varying vec2 v_uv;

uniform float u_time;
uniform float u_dpr;
uniform float u_dotOpacity;
uniform float u_mouseActive;
uniform int u_type;
uniform int u_palette;
uniform int u_maskMode;
uniform int u_transparent;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_color0;
uniform vec3 u_color1;
uniform vec3 u_dotColor;
uniform vec3 u_accentPink;
uniform vec3 u_accentYellow;
uniform vec3 u_accentGreen;
uniform vec3 u_dotPink;
uniform vec3 u_dotYellow;
uniform vec3 u_dotGreen;

float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x * 0.5 + a.y * a.y * 0.75);
}

float bayer4(vec2 a) {
  return bayer2(0.5 * a) * 0.25 + bayer2(a);
}

float bayer8(vec2 a) {
  return bayer4(0.5 * a) * 0.25 + bayer2(a);
}

float bayer16(vec2 a) {
  return bayer8(0.5 * a) * 0.25 + bayer2(a);
}

float bayer32(vec2 a) {
  return bayer16(0.5 * a) * 0.25 + bayer2(a);
}

float bayer64(vec2 a) {
  return bayer32(0.5 * a) * 0.25 + bayer2(a);
}

void main() {
  float cell = 4.0 * max(u_dpr, 1.0);
  vec2 st = floor(gl_FragCoord.xy / cell);
  vec2 uv = st / max(u_resolution / cell, vec2(1.0));
  float aspectRatio = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 aspectUv = uv - 0.5;
  aspectUv.x *= aspectRatio;
  aspectUv += 0.5;

  float field = 0.0;
  if (u_type == 1) {
    float threshold = 0.5 + 0.5 * sin(u_time * 0.45);
    field = smoothstep(threshold - 0.5, threshold + 0.5, length(aspectUv - vec2(0.5)) * 1.1);
  } else {
    float threshold = 0.5 + 0.5 * sin(u_time * 0.34 + aspectUv.x * 2.2);
    field = smoothstep(threshold - 0.52, threshold + 0.52, aspectUv.y);
  }

  float dithering = bayer64(mod(st, 64.0));
  float dotMask = step(dithering + 0.01, field);
  float verticalFade = smoothstep(0.95, 0.0, v_uv.y);

  // Micro high-color Bayer halftone cluster (~4x4 Bayer cells) tight under the cursor
  float cursorPatch = 0.0;
  vec3 cursorPatchColor = vec3(0.0);
  if (u_mouseActive > 0.002) {
    vec2 diff = (uv - u_mouse) * vec2(aspectRatio, 1.0);
    float dist = length(diff);
    float blob = exp(-dist * dist * 1800.0) * u_mouseActive;
    // Cap below 1.0 so pixels stay crisply dithered inside the 4x4 cell footprint
    cursorPatch = step(dithering + 0.02, clamp(blob * 0.94, 0.0, 0.88));

    float waveA = 0.5 + 0.5 * sin(diff.x * 75.0 + diff.y * 55.0 + uv.x * 14.0 + u_time * 1.6);
    float waveB = 0.5 + 0.5 * cos(diff.x * 55.0 - diff.y * 80.0 - uv.y * 12.0 - u_time * 1.2);

    vec3 hiMagenta = vec3(1.0, 0.14, 0.68);
    vec3 hiGold = vec3(0.98, 0.82, 0.04);
    vec3 hiEmerald = vec3(0.02, 0.82, 0.3);
    vec3 hiCyan = vec3(0.04, 0.82, 0.94);

    cursorPatchColor = mix(hiMagenta, hiGold, waveA);
    cursorPatchColor = mix(cursorPatchColor, hiEmerald, waveB * 0.72);
    cursorPatchColor = mix(cursorPatchColor, hiCyan, smoothstep(0.008, 0.026, dist) * 0.55);
  }

  float edgeMask = smoothstep(0.88, 0.04, v_uv.y);
  if (u_maskMode == 1) {
    float topBand = smoothstep(0.68, 0.97, v_uv.y);
    float botBand = smoothstep(0.24, 0.01, v_uv.y);
    edgeMask = max(topBand, botBand);
  } else if (u_maskMode == 2) {
    float topToBottom = smoothstep(0.04, 0.94, v_uv.y);
    float centerProtection = mix(0.38, 1.0, smoothstep(0.08, 0.42, abs(v_uv.x - 0.5)));
    edgeMask = topToBottom * centerProtection;
  }

  // Keep center headline readable when cursor passes over text
  float cursorTextFade = mix(0.45, 1.0, smoothstep(0.06, 0.3, abs(v_uv.x - 0.5)));

  if (u_palette == 1) {
    float drift = u_time * 0.16;
    float p1 = smoothstep(-1.0, 1.0, sin((aspectUv.x + aspectUv.y * 1.55) * 1.8 - 0.7 + drift));
    float p2 = smoothstep(-1.0, 1.0, cos(aspectUv.x * 1.55 - aspectUv.y * 0.9 - drift * 0.7));

    vec3 washCol = mix(u_accentPink, u_accentYellow, p1);
    washCol = mix(washCol, u_accentGreen, p2 * p2 * 0.85);

    vec3 cellCol = mix(u_dotPink, u_dotYellow, p1);
    cellCol = mix(cellCol, u_dotGreen, p2 * p2 * 0.85);

    float heroWave = 0.38 + 0.32 * sin(u_time * 0.34 + aspectUv.x * 2.2 - aspectUv.y * 1.4);
    float stageDither = step(dithering + 0.01, clamp(heroWave * smoothstep(0.05, 0.95, v_uv.y), 0.0, 0.84));

    if (u_transparent == 1) {
      vec3 finalCol = mix(washCol, cellCol, stageDither);
      float baseAlpha = mix(0.14, 0.92, stageDither) * edgeMask * u_dotOpacity;
      float patchAlpha = cursorPatch * u_mouseActive * 0.92 * cursorTextFade;
      finalCol = mix(finalCol, cursorPatchColor, cursorPatch * u_mouseActive * 0.96);
      float finalAlpha = max(baseAlpha, patchAlpha);
      // Output premultiplied RGBA matching WebGL default canvas compositing
      gl_FragColor = vec4(finalCol * finalAlpha, finalAlpha);
      return;
    }

    vec3 baseBg = mix(u_color1, washCol, edgeMask * 0.75);
    vec3 finalPearl = mix(baseBg, cellCol, stageDither * edgeMask * u_dotOpacity);
    finalPearl = mix(finalPearl, cursorPatchColor, cursorPatch * u_mouseActive * 0.92 * cursorTextFade);
    gl_FragColor = vec4(finalPearl, 1.0);
    return;
  }

  if (u_transparent == 1) {
    vec3 finalCol = mix(u_dotColor, cursorPatchColor, cursorPatch * u_mouseActive * 0.96);
    float alpha = max(dotMask * edgeMask * u_dotOpacity, cursorPatch * u_mouseActive * 0.9 * cursorTextFade);
    gl_FragColor = vec4(finalCol * alpha, alpha);
    return;
  }

  vec3 gradient = mix(u_color0, u_color1, smoothstep(0.0, 1.45, v_uv.y));
  vec3 finalColor = mix(gradient, u_dotColor, dotMask * verticalFade * u_dotOpacity);
  finalColor = mix(finalColor, cursorPatchColor, cursorPatch * u_mouseActive * 0.92 * cursorTextFade);
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

function compileDitherShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);

  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);

    return null;
  }

  return shader;
}

function linkDitherProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const vs = compileDitherShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
  const fs = compileDitherShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);

  if (!vs || !fs) {
    if (vs) gl.deleteShader(vs);
    if (fs) gl.deleteShader(fs);

    return null;
  }

  const program = gl.createProgram();

  if (!program) {
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    return null;
  }

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);

    return null;
  }

  return program;
}

function isDarkModeActive(): boolean {
  if (typeof document === 'undefined') return false;

  const mode = document.documentElement.getAttribute('data-color-mode');

  if (mode === 'dark') return true;
  if (mode === 'light') return false;

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}

/**
 * @brief Lightweight WebGL Bayer-dithered wave, ripple, and iridescent pearl surface with optional cursor dither patch.
 */
export const WebGLDitherSurface: React.FC<WebGLDitherSurfaceProps> = ({
  className,
  dotOpacity = 0.45,
  interactiveCursor = false,
  interactionTarget = null,
  maskMode = 'bottom',
  palette = 'green',
  transparentBackground = false,
  type = 'wave'
}) => {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !wrapper) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: 'low-power'
    });

    if (!gl) {
      wrapper.setAttribute('data-webgl-status', 'fallback');

      return;
    }

    const program = linkDitherProgram(gl);
    const quadBuffer = gl.createBuffer();

    if (!program || !quadBuffer) {
      if (program) gl.deleteProgram(program);
      if (quadBuffer) gl.deleteBuffer(quadBuffer);
      wrapper.setAttribute('data-webgl-status', 'fallback');

      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'a_pos');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const dprLoc = gl.getUniformLocation(program, 'u_dpr');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const mouseActiveLoc = gl.getUniformLocation(program, 'u_mouseActive');
    const typeLoc = gl.getUniformLocation(program, 'u_type');
    const paletteLoc = gl.getUniformLocation(program, 'u_palette');
    const maskLoc = gl.getUniformLocation(program, 'u_maskMode');
    const transparentLoc = gl.getUniformLocation(program, 'u_transparent');
    const opacityLoc = gl.getUniformLocation(program, 'u_dotOpacity');
    const color0Loc = gl.getUniformLocation(program, 'u_color0');
    const color1Loc = gl.getUniformLocation(program, 'u_color1');
    const dotColorLoc = gl.getUniformLocation(program, 'u_dotColor');
    const pinkLoc = gl.getUniformLocation(program, 'u_accentPink');
    const yellowLoc = gl.getUniformLocation(program, 'u_accentYellow');
    const greenLoc = gl.getUniformLocation(program, 'u_accentGreen');
    const dotPinkLoc = gl.getUniformLocation(program, 'u_dotPink');
    const dotYellowLoc = gl.getUniformLocation(program, 'u_dotYellow');
    const dotGreenLoc = gl.getUniformLocation(program, 'u_dotGreen');

    let isVisible = true;
    let rafId = 0;
    let simTime = 1.4;
    let lastNow = performance.now();
    let currentDpr = 1;
    let markedReady = false;

    const pointerState = {
      activeTarget: 0,
      smoothActive: 0,
      smoothX: 0.5,
      smoothY: 0.5,
      targetX: 0.5,
      targetY: 0.5
    };

    const syncSize = () => {
      const rect = canvas.getBoundingClientRect();

      currentDpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const targetWidth = Math.max(1, Math.round(rect.width * currentDpr));
      const targetHeight = Math.max(1, Math.round(rect.height * currentDpr));

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const draw = (now: number) => {
      const dt = Math.min((now - lastNow) / 1000, 0.05);

      lastNow = now;

      if (!prefersReducedMotion) {
        simTime += dt;
      }

      pointerState.smoothActive += (pointerState.activeTarget - pointerState.smoothActive) * 0.16;
      pointerState.smoothX += (pointerState.targetX - pointerState.smoothX) * 0.22;
      pointerState.smoothY += (pointerState.targetY - pointerState.smoothY) * 0.22;

      syncSize();
      // Single full-screen quad writes premultiplied RGBA directly without double-multiplying alpha
      gl.disable(gl.BLEND);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const dark = isDarkModeActive();

      gl.uniform1f(timeLoc, simTime);
      gl.uniform1f(dprLoc, currentDpr);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, pointerState.smoothX, pointerState.smoothY);
      gl.uniform1f(mouseActiveLoc, interactiveCursor && !prefersReducedMotion ? pointerState.smoothActive : 0);
      gl.uniform1i(typeLoc, type === 'ripple' ? 1 : 0);
      gl.uniform1i(paletteLoc, palette === 'iridescent' || palette === 'purple-pink' ? 1 : 0);
      gl.uniform1i(maskLoc, maskMode === 'bands' ? 1 : maskMode === 'top-fade' ? 2 : 0);
      gl.uniform1i(transparentLoc, transparentBackground ? 1 : 0);
      gl.uniform1f(opacityLoc, dotOpacity);

      if (dark) {
        gl.uniform3f(color0Loc, 0.051, 0.188, 0.141); // #0d3024
        gl.uniform3f(color1Loc, 0.024, 0.035, 0.027); // #060907
        gl.uniform3f(dotColorLoc, 0.137, 0.918, 0.341); // #23ea57

        if (palette === 'purple-pink') {
          gl.uniform3f(pinkLoc, 0.341, 0.106, 0.278); // #571b47
          gl.uniform3f(yellowLoc, 0.212, 0.125, 0.384); // #362062
          gl.uniform3f(greenLoc, 0.282, 0.114, 0.365); // #481d5d
          gl.uniform3f(dotPinkLoc, 0.961, 0.514, 0.788); // #f583c9
          gl.uniform3f(dotYellowLoc, 0.678, 0.541, 0.988); // #ad8afc
          gl.uniform3f(dotGreenLoc, 0.867, 0.533, 0.969); // #dd88f7
        } else {
          gl.uniform3f(pinkLoc, 0.396, 0.086, 0.263); // #651643
          gl.uniform3f(yellowLoc, 0.255, 0.196, 0.0); // #413200
          gl.uniform3f(greenLoc, 0.055, 0.259, 0.173); // #0e422c
          gl.uniform3f(dotPinkLoc, 1.0, 0.502, 0.824); // #ff80d2
          gl.uniform3f(dotYellowLoc, 0.925, 1.0, 0.467); // #ecff77
          gl.uniform3f(dotGreenLoc, 0.373, 0.929, 0.514); // #5fed83
        }
      } else {
        gl.uniform3f(color0Loc, 0.031, 0.529, 0.169); // #08872b
        gl.uniform3f(color1Loc, 0.949, 0.961, 0.953); // #f2f5f3
        gl.uniform3f(
          dotColorLoc,
          transparentBackground ? 0.031 : 0.549,
          transparentBackground ? 0.529 : 0.949,
          transparentBackground ? 0.169 : 0.651
        );

        if (palette === 'purple-pink') {
          gl.uniform3f(pinkLoc, 0.992, 0.847, 0.949); // #fdd8f2
          gl.uniform3f(yellowLoc, 0.925, 0.871, 1.0); // #ecdeff
          gl.uniform3f(greenLoc, 0.973, 0.859, 0.988); // #f8dbfc
          gl.uniform3f(dotPinkLoc, 0.878, 0.322, 0.663); // #e052a9
          gl.uniform3f(dotYellowLoc, 0.588, 0.408, 0.918); // #9668ea
          gl.uniform3f(dotGreenLoc, 0.773, 0.388, 0.859); // #c563db
        } else {
          gl.uniform3f(pinkLoc, 1.0, 0.788, 0.949); // #ffc9f2 pink-1
          gl.uniform3f(yellowLoc, 0.992, 0.961, 0.702); // #fdf5b3 lemon-0
          gl.uniform3f(greenLoc, 0.749, 1.0, 0.82); // #bfffd1 green-1
          gl.uniform3f(dotPinkLoc, 0.937, 0.165, 0.643); // #ef2aa4 pink-5
          gl.uniform3f(dotYellowLoc, 0.882, 0.773, 0.059); // #e1c50f lemon-3
          gl.uniform3f(dotGreenLoc, 0.059, 0.749, 0.243); // #0fbf3e green-5
        }
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!markedReady) {
        markedReady = true;
        wrapper.setAttribute('data-webgl-status', 'ready');
      }
    };

    const tick = (now: number) => {
      if (isVisible) {
        draw(now);
      }

      if (!prefersReducedMotion && isVisible) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      draw(performance.now());
    });

    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry) return;

        isVisible = entry.isIntersecting;

        if (isVisible && !prefersReducedMotion && rafId === 0) {
          lastNow = performance.now();
          rafId = requestAnimationFrame(tick);
        } else if (!isVisible && rafId !== 0) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { threshold: 0.02 }
    );

    intersectionObserver.observe(wrapper);

    const themeObserver = new MutationObserver(() => {
      draw(performance.now());
    });

    themeObserver.observe(document.documentElement, {
      attributeFilter: ['data-color-mode'],
      attributes: true
    });

    const hostNode = interactionTarget ?? wrapper.parentElement;
    const handlePointerMove = (event: PointerEvent) => {
      if (!interactiveCursor || prefersReducedMotion) return;
      const rect = canvas.getBoundingClientRect();

      if (rect.width <= 0 || rect.height <= 0) return;

      pointerState.targetX = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      // Flip Y into WebGL bottom-origin UV space
      pointerState.targetY = Math.max(0, Math.min(1, 1 - (event.clientY - rect.top) / rect.height));
      pointerState.activeTarget = 1;
    };

    const handlePointerLeave = () => {
      pointerState.activeTarget = 0;
    };

    if (interactiveCursor && hostNode) {
      hostNode.addEventListener('pointermove', handlePointerMove, { passive: true });
      hostNode.addEventListener('pointerleave', handlePointerLeave);
    }

    draw(performance.now());

    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      if (rafId !== 0) cancelAnimationFrame(rafId);
      if (interactiveCursor && hostNode) {
        hostNode.removeEventListener('pointermove', handlePointerMove);
        hostNode.removeEventListener('pointerleave', handlePointerLeave);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      gl.deleteBuffer(quadBuffer);
      gl.deleteProgram(program);
    };
  }, [
    dotOpacity,
    interactionTarget,
    interactiveCursor,
    maskMode,
    palette,
    prefersReducedMotion,
    transparentBackground,
    type
  ]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden='true'
      className={clsx(styles.ditherSurfaceLayer, className)}
      data-webgl-status='loading'
    >
      <div
        className={clsx(
          styles.ditherFallback,
          transparentBackground && styles.ditherFallbackTransparent,
          palette === 'iridescent' && styles.ditherFallbackIridescent,
          palette === 'purple-pink' && styles.ditherFallbackPurplePink
        )}
      />
      <canvas ref={canvasRef} className={styles.ditherCanvas} />
    </div>
  );
};

export interface UseDitherBackgroundOptions {
  readonly className?: string;
  readonly dotOpacity?: number;
  readonly enabled?: boolean;
  readonly interactiveCursor?: boolean;
  readonly maskMode?: DitherMaskMode;
  readonly palette?: DitherPaletteType;
  readonly transparentBackground?: boolean;
  readonly type?: DitherPatternType;
}

/**
 * @brief Portals an animated WebGL Bayer-dithered backdrop into any container captured via `containerRef`.
 */
export function useDitherBackground({
  className,
  dotOpacity = 0.24,
  enabled = true,
  interactiveCursor = false,
  maskMode = 'bottom',
  palette = 'green',
  transparentBackground = true,
  type = 'ripple'
}: UseDitherBackgroundOptions = {}) {
  const [containerEl, setContainerEl] = useState<HTMLElement | null>(null);
  const containerRef = useCallback((element: HTMLElement | null) => {
    setContainerEl(element);
  }, []);

  useEffect(() => {
    if (!containerEl) return;

    containerEl.classList.add(styles.ditherHost);

    return () => {
      containerEl.classList.remove(styles.ditherHost);
    };
  }, [containerEl]);

  const DitherBackground = useCallback(() => {
    if (!enabled || !containerEl) return null;

    return createPortal(
      <WebGLDitherSurface
        className={clsx(styles.ditherSurface, className)}
        dotOpacity={dotOpacity}
        interactionTarget={containerEl}
        interactiveCursor={interactiveCursor}
        maskMode={maskMode}
        palette={palette}
        transparentBackground={transparentBackground}
        type={type}
      />,
      containerEl
    );
  }, [className, containerEl, dotOpacity, enabled, interactiveCursor, maskMode, palette, transparentBackground, type]);

  return { containerRef, DitherBackground };
}
