// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useReducedMotion } from '@gp/ui/hooks';
import styles from './hero-floating-shapes.module.css';

interface RepelState {
  anchorX: number;
  anchorY: number;
  currentX: number;
  currentY: number;
  radius: number;
  strength: number;
  targetX: number;
  targetY: number;
}

/**
 * @brief Lightweight floating geometric wireframes and shaded spheres flanking centered Hero text that gently repel away from the pointer.
 */
export const HeroFloatingShapes: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const fieldRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const host = field?.parentElement;

    if (!field || !host || prefersReducedMotion) return;

    const slots = [...field.children].filter((child): child is HTMLElement => child instanceof HTMLElement);
    const states: RepelState[] = slots.map((_, idx) => ({
      anchorX: 0,
      anchorY: 0,
      currentX: 0,
      currentY: 0,
      radius: 250 + (idx % 3) * 20,
      strength: 16 + (idx % 2) * 5,
      targetX: 0,
      targetY: 0
    }));

    const measureAnchors = () => {
      const hostRect = host.getBoundingClientRect();

      for (let i = 0; i < slots.length; i++) {
        const el = slots[i];
        const st = states[i];

        if (!el || !st) continue;

        const rect = el.getBoundingClientRect();

        // Exclude current translation offset so rest anchors stay stable
        st.anchorX = rect.left - hostRect.left + rect.width * 0.5 - st.currentX;
        st.anchorY = rect.top - hostRect.top + rect.height * 0.5 - st.currentY;
      }
    };

    measureAnchors();

    let rafId = 0;

    const step = () => {
      let moving = false;

      for (let i = 0; i < slots.length; i++) {
        const el = slots[i];
        const st = states[i];

        if (!el || !st) continue;

        const dx = st.targetX - st.currentX;
        const dy = st.targetY - st.currentY;

        if (Math.abs(dx) > 0.08 || Math.abs(dy) > 0.08) {
          st.currentX += dx * 0.14;
          st.currentY += dy * 0.14;
          el.style.setProperty('--repel-x', `${st.currentX.toFixed(2)}px`);
          el.style.setProperty('--repel-y', `${st.currentY.toFixed(2)}px`);
          moving = true;
        } else if (st.currentX !== st.targetX || st.currentY !== st.targetY) {
          st.currentX = st.targetX;
          st.currentY = st.targetY;
          el.style.setProperty('--repel-x', `${st.currentX.toFixed(2)}px`);
          el.style.setProperty('--repel-y', `${st.currentY.toFixed(2)}px`);
        }
      }

      if (moving) {
        rafId = requestAnimationFrame(step);
      } else {
        rafId = 0;
      }
    };

    const ensureTick = () => {
      if (rafId === 0) {
        rafId = requestAnimationFrame(step);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const hostRect = host.getBoundingClientRect();
      const px = event.clientX - hostRect.left;
      const py = event.clientY - hostRect.top;

      for (let i = 0; i < states.length; i++) {
        const st = states[i];

        if (!st) continue;

        const vx = st.anchorX - px;
        const vy = st.anchorY - py;
        const dist = Math.hypot(vx, vy);

        if (dist > 0.5 && dist < st.radius) {
          const factor = Math.pow(1 - dist / st.radius, 1.45);

          st.targetX = (vx / dist) * factor * st.strength;
          st.targetY = (vy / dist) * factor * st.strength;
        } else {
          st.targetX = 0;
          st.targetY = 0;
        }
      }

      ensureTick();
    };

    const handlePointerLeave = () => {
      for (const st of states) {
        st.targetX = 0;
        st.targetY = 0;
      }

      ensureTick();
    };

    const resizeObserver = new ResizeObserver(() => {
      measureAnchors();
    });

    resizeObserver.observe(host);
    host.addEventListener('pointermove', handlePointerMove, { passive: true });
    host.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      if (rafId !== 0) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      host.removeEventListener('pointermove', handlePointerMove);
      host.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={fieldRef} aria-hidden='true' className={styles.shapesField}>
      {/* 0: Left Top Emerald/Obsidian Sphere */}
      <div className={clsx(styles.shapeSlot, styles.leftSphereLarge)}>
        <svg className={styles.shapeSvg} fill='none' viewBox='0 0 128 128'>
          <defs>
            <radialGradient cx='34%' cy='28%' id='gpLeftSphere' r='70%'>
              <stop offset='0%' stopColor='#ecff77' />
              <stop offset='26%' stopColor='#5fed83' />
              <stop offset='64%' stopColor='#0d6731' />
              <stop offset='100%' stopColor='#060907' />
            </radialGradient>
          </defs>
          <circle cx='64' cy='64' fill='url(#gpLeftSphere)' r='52' />
          <circle cx='64' cy='64' r='52' stroke='#5fed83' strokeOpacity='0.45' strokeWidth='1' />
          <ellipse
            cx='64'
            cy='64'
            rx='52'
            ry='18'
            stroke='#ecff77'
            strokeDasharray='3 3'
            strokeOpacity='0.55'
            transform='rotate(-16 64 64)'
          />
        </svg>
      </div>

      {/* 1: Left Small Accent Sphere */}
      <div className={clsx(styles.shapeSlot, styles.leftSphereSmall)}>
        <svg className={styles.shapeSvg} fill='none' viewBox='0 0 48 48'>
          <defs>
            <radialGradient cx='32%' cy='30%' id='gpLeftSmall' r='72%'>
              <stop offset='0%' stopColor='#fff8c5' />
              <stop offset='38%' stopColor='#ecff77' />
              <stop offset='100%' stopColor='#0e4a2e' />
            </radialGradient>
          </defs>
          <circle cx='24' cy='24' fill='url(#gpLeftSmall)' r='18' />
        </svg>
      </div>

      {/* 2: Left Bottom Wireframe Octahedron */}
      <div className={clsx(styles.shapeSlot, styles.leftWirePoly)}>
        <svg className={styles.shapeSvg} fill='none' viewBox='0 0 120 120'>
          <polygon points='60,12 104,54 60,108 16,54' stroke='#08872b' strokeWidth='1.4' />
          <polygon points='60,12 80,62 60,108 40,62' stroke='#5fed83' strokeOpacity='0.85' strokeWidth='1.1' />
          <line stroke='#0fbf3e' strokeDasharray='3 3' x1='16' x2='104' y1='54' y2='54' />
          <circle cx='60' cy='12' fill='#ecff77' r='2.5' />
          <circle cx='104' cy='54' fill='#5fed83' r='2.5' />
          <circle cx='16' cy='54' fill='#5fed83' r='2.5' />
          <circle cx='60' cy='108' fill='#0fbf3e' r='2.5' />
        </svg>
      </div>

      {/* 3: Right Top Wireframe Perspective Cube */}
      <div className={clsx(styles.shapeSlot, styles.rightWireCube)}>
        <svg className={styles.shapeSvg} fill='none' viewBox='0 0 120 120'>
          <polygon points='24,36 74,36 74,86 24,86' stroke='#08872b' strokeDasharray='3 3' strokeWidth='1.3' />
          <polygon points='46,20 96,20 96,70 46,70' stroke='#0fbf3e' strokeWidth='1.5' />
          <line stroke='#0fbf3e' x1='24' x2='46' y1='36' y2='20' />
          <line stroke='#0fbf3e' x1='74' x2='96' y1='36' y2='20' />
          <line stroke='#0fbf3e' x1='74' x2='96' y1='86' y2='70' />
          <line stroke='#0fbf3e' x1='24' x2='46' y1='86' y2='70' />
          <circle cx='46' cy='20' fill='#ef2aa4' r='2.5' />
          <circle cx='96' cy='70' fill='#5fed83' r='2.5' />
        </svg>
      </div>

      {/* 4: Right Mid Iridescent Pink/Mint Sphere */}
      <div className={clsx(styles.shapeSlot, styles.rightSphereLarge)}>
        <svg className={styles.shapeSvg} fill='none' viewBox='0 0 136 136'>
          <defs>
            <radialGradient cx='36%' cy='28%' id='gpRightSphere' r='70%'>
              <stop offset='0%' stopColor='#fff0fc' />
              <stop offset='32%' stopColor='#f67ed2' />
              <stop offset='72%' stopColor='#197b7b' />
              <stop offset='100%' stopColor='#060907' />
            </radialGradient>
          </defs>
          <circle cx='68' cy='68' fill='url(#gpRightSphere)' r='54' />
          <circle cx='68' cy='68' r='54' stroke='#f67ed2' strokeOpacity='0.5' strokeWidth='1' />
          <ellipse
            cx='68'
            cy='68'
            rx='54'
            ry='22'
            stroke='#8cf2a6'
            strokeOpacity='0.6'
            strokeWidth='1.1'
            transform='rotate(20 68 68)'
          />
        </svg>
      </div>

      {/* 5: Right Bottom Small Mint Contour Sphere */}
      <div className={clsx(styles.shapeSlot, styles.rightSphereSmall)}>
        <svg className={styles.shapeSvg} fill='none' viewBox='0 0 56 56'>
          <defs>
            <radialGradient cx='34%' cy='30%' id='gpRightSmall' r='70%'>
              <stop offset='0%' stopColor='#bfffd1' />
              <stop offset='48%' stopColor='#0fbf3e' />
              <stop offset='100%' stopColor='#0a241b' />
            </radialGradient>
          </defs>
          <circle cx='28' cy='28' fill='url(#gpRightSmall)' r='20' />
          <ellipse cx='28' cy='28' rx='20' ry='8' stroke='#ecff77' strokeOpacity='0.65' strokeWidth='1' />
        </svg>
      </div>
    </div>
  );
};
