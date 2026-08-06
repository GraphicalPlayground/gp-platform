// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ImageResponse } from 'next/og';
import { Organization } from '@gp/constants';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @brief Loads a font file bundled alongside this module.
 * @details Deliberately a plain runtime path join, not `new URL(literal, import.meta.url)` — Next.js's bundler
 * (webpack/Turbopack) statically rewrites that exact form into a public `/_next/static/...` asset URL, which the
 * Node.js runtime this route renders under can't fetch (there's no browser origin to resolve it against).
 */
const loadFont = (fileName: string): Buffer => readFileSync(join(__dirname, 'assets', fileName));

const fontMonaSansBold = loadFont('MonaSans-Bold.ttf');
const fontMonaSansRegular = loadFont('MonaSans-Regular.ttf');
const fontHubotSansBold = loadFont('HubotSans-Bold.ttf');
const fontMonaSansMonoMedium = loadFont('MonaSansMono-Medium.ttf');

/**
 * @brief Pixel dimensions every generated Open Graph image is rendered at.
 */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/**
 * @brief MIME type every generated Open Graph image is served as.
 */
export const OG_IMAGE_CONTENT_TYPE = 'image/png' as const;

/**
 * @brief Light-theme brand colors pulled from `@gp/ui`'s default color tokens.
 * @details `next/og` renders through Satori, which has no CSS engine, so the tokens can't be read from
 * `packages/ui`'s CSS variables at render time — the light-mode hex values are inlined here instead.
 */
const colors = {
  canvas: '#ffffff',
  text: '#000000',
  textMuted: '#58635b',
  accent: '#0d6731',
  borderMuted: '#e4ebe6',
  brandMarkBackground: '#ecff77'
} as const;

/**
 * @brief Input for {@link renderOgImage}.
 */
export interface OgImageInput {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}

/**
 * @brief Renders a branded, on-theme Open Graph image for a page.
 * @details Meant to be called from an app's own `opengraph-image.tsx` route file — Next.js requires that file to
 * physically exist per route, so this only provides the shared rendering logic, not the route itself.
 * @param input - The title (and optional subtitle/eyebrow) to render on the image.
 * @returns An ImageResponse suitable as the default export's return value of an `opengraph-image.tsx` route.
 */
export const renderOgImage = ({ eyebrow = Organization.name, subtitle, title }: OgImageInput): ImageResponse =>
  new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.canvas,
        color: colors.text,
        fontFamily: 'Mona Sans'
      }}
    >
      <div style={{ display: 'flex', height: 8, backgroundColor: colors.accent }} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          padding: '64px 80px 48px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
            <svg width={48} height={48} viewBox='0 0 512 512' fill='none'>
              <rect width={512} height={512} fill={colors.brandMarkBackground} rx={51} />
              <path
                fill={colors.text}
                d='M239.898 321.056v56.185c0 3.733 3.036 6.759 6.78 6.759h21.186c3.745 0 6.78-3.026 6.78-6.759v-77.729c0-13.999 11.383-25.347 25.424-25.347H449.22c3.745 0 6.78-3.026 6.78-6.759v-21.122c0-3.733-3.035-6.759-6.78-6.759H323.373c-5.383 0-9.746-4.35-9.746-9.716 0-2.248.765-4.317 2.05-5.963l63.459-62.172c2.671-2.616 2.708-6.895.084-9.558l-15.444-15.668c-2.624-2.662-6.917-2.7-9.587-.083l-65.449 64.121c-1.309.652-2.787 1.019-4.35 1.019-5.383 0-9.746-4.35-9.746-9.716v-57.03c0-3.733-3.035-6.759-6.78-6.759h-21.186c-3.744 0-6.78 3.026-6.78 6.759v79.419c0 13.999-11.382 25.347-25.423 25.347H62.7797c-3.7443 0-6.7797 3.026-6.7797 6.759v21.122c0 3.733 3.0353 6.759 6.7796 6.759H190.322c5.382 0 9.746 4.35 9.746 9.716 0 1.317-.263 2.573-.739 3.718-.257.619-.68 1.15-1.159 1.619l-62.221 60.96c-2.671 2.616-2.708 6.895-.084 9.558l15.444 15.668c2.624 2.662 6.917 2.7 9.587.083l61.331-60.086 2.393-2.345c1.572-1.082 3.478-1.716 5.533-1.716 5.382 0 9.745 4.35 9.745 9.716'
              />
            </svg>
            <div
              style={{
                fontFamily: 'Hubot Sans',
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: colors.accent
              }}
            >
              {eyebrow}
            </div>
          </div>
          <div
            style={{
              fontFamily: 'Mona Sans',
              fontWeight: 700,
              fontSize: title.length > 42 ? 56 : 66,
              lineHeight: 1.1,
              maxWidth: 980,
              color: colors.text
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontFamily: 'Mona Sans',
                fontWeight: 400,
                fontSize: 30,
                lineHeight: 1.4,
                marginTop: 24,
                maxWidth: 900,
                color: colors.textMuted
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            borderTop: `1px solid ${colors.borderMuted}`,
            paddingTop: 24
          }}
        >
          <div style={{ display: 'flex', width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent }} />
          <div style={{ fontFamily: 'Mona Sans Mono', fontWeight: 500, fontSize: 20, color: colors.textMuted }}>
            {Organization.domain}
          </div>
        </div>
      </div>
    </div>,
    {
      ...OG_IMAGE_SIZE,
      fonts: [
        { name: 'Mona Sans', data: fontMonaSansBold, weight: 700, style: 'normal' },
        { name: 'Mona Sans', data: fontMonaSansRegular, weight: 400, style: 'normal' },
        { name: 'Hubot Sans', data: fontHubotSansBold, weight: 700, style: 'normal' },
        { name: 'Mona Sans Mono', data: fontMonaSansMonoMedium, weight: 500, style: 'normal' }
      ]
    }
  );
