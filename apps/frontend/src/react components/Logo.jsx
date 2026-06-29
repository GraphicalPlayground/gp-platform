/**
 * Logo.jsx — Graphical Playground brand logo system
 *
 * ─── HOW TO SET YOUR LOGOS ───────────────────────────────────────
 * Drop your files in:  apps/frontend/public/logos/
 * Then fill in the LOGOS object below with the correct filenames.
 *
 * Each variant falls back to the next if a path is null:
 *   logoFull      → used by <LogoFull>      (horizontal: icon + wordmark in one image)
 *   logoMark      → used by <LogoMark>      (just the square / icon)
 *   logoMarkSm    → used by <LogoCompact>   (same icon but optimised for small sizes, e.g. 28–32px)
 *   logoWordmark  → used by <LogoWordmark>  (text-only, no icon)
 *   logoBadge     → used by <LogoBadge>     (pill / lockup for tight spaces like toasts)
 *
 * Supported formats: .svg (preferred), .png, .webp, .avif
 * ─────────────────────────────────────────────────────────────────
 */

import React from 'react';

/* ══════════════════════════════════════════════════════════════════
   LOGO PATHS  ← edit these
   Put your files in  apps/frontend/public/logos/
   and update the paths below.
   ══════════════════════════════════════════════════════════════════ */
const LOGOS = {
  /** Compact pill / badge lockup for toasts, banners, embeds.
   *  Falls back to logoMark if null. */
  logoBadge: '/logos/gp-logo-mark.svg',

  /** Horizontal lockup: icon + "Graphical Playground" text in one file.
   *  Used by <LogoFull>. Recommended size: any SVG or ≥300px wide PNG. */
  logoFull: '/logos/gp-logo-full.svg',

  /** Square icon / mark only.
   *  Used by <LogoMark>. Recommended size: any SVG or ≥128px PNG. */
  logoMark: '/logos/gp-logo-mark.svg',

  /** Same icon but for small surfaces (sidebar, mobile header, 28–32px slots).
   *  Falls back to logoMark if null.
   *  Use a version with less detail / thicker strokes if you have one. */
  logoMarkSm: '/logos/gp-logo-mark.svg',

  /** Text-only wordmark, no icon.
   *  Used by <LogoWordmark>. Falls back to showing plain text if null. */
  logoWordmark: '/logos/gp-wordmark.svg'
};

/* ── Shared wrapper (handles href, onClick, className, style) ─── */
function Wrap({ children, className, href, onClick, style }) {
  const base = {
    alignItems: 'center',
    cursor: onClick || href ? 'pointer' : 'default',
    display: 'inline-flex',
    textDecoration: 'none'
  };

  if (href)
    return (
      <a href={href} className={className} style={{ ...base, ...style }}>
        {children}
      </a>
    );

  return (
    <span onClick={onClick} className={className} style={{ ...base, ...style }}>
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   EXPORTED VARIANTS
   ───────────────────────────────────────────────────────────────── */

/**
 * <LogoFull>
 * Horizontal lockup: icon + wordmark in one image.
 * Use in: primary navbar, main headers.
 * height prop controls the rendered height (width is auto).
 * Default height: 32px
 */
export function LogoFull({ alt = 'Graphical Playground', className, height = 32, href, onClick, style }) {
  return (
    <Wrap href={href} onClick={onClick} className={className} style={style}>
      <img src={LOGOS.logoFull} alt={alt} height={height} style={{ display: 'block', height, width: 'auto' }} />
    </Wrap>
  );
}

/**
 * <LogoMark>
 * Square icon / mark only.
 * Use in: auth pages, favicons, avatar spots.
 * Default size: 36px
 */
export function LogoMark({ alt = 'Graphical Playground', className, href, onClick, size = 36, style }) {
  return (
    <Wrap href={href} onClick={onClick} className={className} style={style}>
      <img
        src={LOGOS.logoMark}
        alt={alt}
        width={size}
        height={size}
        style={{ display: 'block', height: size, width: size }}
      />
    </Wrap>
  );
}

/**
 * <LogoCompact>
 * Same icon, smaller — for sidebars, mobile headers, 28–32px slots.
 * Falls back to logoMark if logoMarkSm is null.
 * Default size: 28px
 */
export function LogoCompact({ alt = 'Graphical Playground', className, href, onClick, size = 28, style }) {
  const src = LOGOS.logoMarkSm ?? LOGOS.logoMark;

  return (
    <Wrap href={href} onClick={onClick} className={className} style={style}>
      <img src={src} alt={alt} width={size} height={size} style={{ display: 'block', height: size, width: size }} />
    </Wrap>
  );
}

/**
 * <LogoWordmark>
 * Text-only wordmark, no icon.
 * Use in: footers, breadcrumbs where the icon already appears.
 * Falls back to plain text if logoWordmark is null.
 * Default height: 20px
 */
export function LogoWordmark({
  alt = 'Graphical Playground',
  className,
  height = 20,
  href,
  muted = false,
  onClick,
  style
}) {
  if (LOGOS.logoWordmark) {
    return (
      <Wrap href={href} onClick={onClick} className={className} style={style}>
        <img
          src={LOGOS.logoWordmark}
          alt={alt}
          height={height}
          style={{ display: 'block', height, opacity: muted ? 0.6 : 1, width: 'auto' }}
        />
      </Wrap>
    );
  }

  // plain-text fallback
  return (
    <Wrap href={href} onClick={onClick} className={className} style={style}>
      <span
        style={{
          color: muted ? 'rgba(226,232,240,0.60)' : '#e2e8f0',
          fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
          fontSize: height,
          fontWeight: 600,
          letterSpacing: '0.3px',
          userSelect: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        Graphical Playground
      </span>
    </Wrap>
  );
}

/**
 * <LogoBadge>
 * Compact pill lockup — for toasts, banners, embeds.
 * Falls back to logoMark if logoBadge is null.
 * Default height: 20px
 */
export function LogoBadge({ alt = 'Graphical Playground', className, height = 20, href, onClick, style }) {
  const src = LOGOS.logoBadge ?? LOGOS.logoMark;

  return (
    <Wrap href={href} onClick={onClick} className={className} style={style}>
      <img src={src} alt={alt} height={height} style={{ display: 'block', height, width: 'auto' }} />
    </Wrap>
  );
}

/* ── Default export = LogoFull (most common use) ─────────────── */
export default LogoFull;
