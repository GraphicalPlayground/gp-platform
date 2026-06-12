// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { siteConfig } from '../../../config/site';
import { NextResponse } from 'next/server';

/**
 * @brief Serves the security.txt file per RFC 9116, with a rolling
 * expiry date set one year from the time of the request.
 * @returns A plain-text response containing the security.txt content.
 */
export async function GET(): Promise<NextResponse> {
  const baseUrl = siteConfig.links.website;
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  const body = [
    `Contact: mailto:${siteConfig.emails.security}`,
    `Contact: ${baseUrl}/security`,
    `Expires: ${expires.toISOString()}`,
    `Canonical: ${baseUrl}/.well-known/security.txt`,
    `Preferred-Languages: en, fr`,
    `Policy: ${baseUrl}/security`,
    `Acknowledgments: ${baseUrl}/security#hall-of-fame`
  ].join('\n');

  return new NextResponse(body, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
