// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * @brief Payload carried by a preview token.
 */
export interface PreviewTokenPayload {
  slug: string;
  collection: 'articles' | 'legal';
  /**
   * @brief Unix milliseconds after which the token is no longer valid.
   */
  exp: number;
}

function base64UrlEncode(input: string): string {
  return Buffer.from(input, 'utf-8').toString('base64url');
}

function base64UrlDecode(input: string): string {
  return Buffer.from(input, 'base64url').toString('utf-8');
}

function sign(payloadBase64: string, secret: string): string {
  return createHmac('sha256', secret).update(payloadBase64).digest('base64url');
}

/**
 * @brief Creates a signed preview token for an unpublished (draft/in-review/scheduled) document.
 * @details `getBySlug`/`getCompiledBySlug` on {@link MdxCollection} ignore publish status by
 * design, so this token's only job is authorizing *who* may request an unpublished slug - actual
 * lookup still goes through the normal repository methods once the token is verified.
 */
export function createPreviewToken(payload: PreviewTokenPayload, secret: string): string {
  const payloadBase64 = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(payloadBase64, secret);

  return `${payloadBase64}.${signature}`;
}

/**
 * @brief Verifies a preview token, returning its payload if valid and unexpired, or `null` otherwise.
 */
export function verifyPreviewToken(token: string, secret: string): PreviewTokenPayload | null {
  const [payloadBase64, signature] = token.split('.');

  if (!payloadBase64 || !signature) return null;

  const expectedSignature = sign(payloadBase64, secret);
  const provided = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(payloadBase64)) as PreviewTokenPayload;

    if (typeof payload.exp !== 'number' || payload.exp <= Date.now()) return null;
    if (payload.collection !== 'articles' && payload.collection !== 'legal') return null;
    if (typeof payload.slug !== 'string' || !payload.slug) return null;

    return payload;
  } catch {
    return null;
  }
}
