// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { ImageResponse } from 'next/og';
import { Organization } from '@gp/constants';

/**
 * @brief Pixel dimensions every generated Open Graph image is rendered at.
 */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/**
 * @brief MIME type every generated Open Graph image is served as.
 */
export const OG_IMAGE_CONTENT_TYPE = 'image/png' as const;

/**
 * @brief Input for {@link renderOgImage}.
 */
export interface OgImageInput {
  title: string;
  subtitle?: string;
}

/**
 * @brief Renders a branded, on-theme Open Graph image for a page.
 * @details Meant to be called from an app's own `opengraph-image.tsx` route file — Next.js requires that file to
 * physically exist per route, so this only provides the shared rendering logic, not the route itself.
 * @param input - The title (and optional subtitle) to render on the image.
 * @returns An ImageResponse suitable as the default export's return value of an `opengraph-image.tsx` route.
 */
export const renderOgImage = ({ subtitle, title }: OgImageInput): ImageResponse =>
  new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        backgroundColor: '#ffffff',
        color: '#1f2328',
        fontFamily: 'sans-serif'
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 600, opacity: 0.6, marginBottom: 24 }}>{Organization.name}</div>
      <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 960 }}>{title}</div>
      {subtitle ? <div style={{ fontSize: 32, marginTop: 24, opacity: 0.7, maxWidth: 960 }}>{subtitle}</div> : null}
    </div>,
    { ...OG_IMAGE_SIZE }
  );
