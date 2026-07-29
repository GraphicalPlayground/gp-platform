// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { NextResponse } from 'next/server';
import { Urls } from '@gp/seo';
import { languages } from '@gp/seo/jsonld';

/**
 * @brief Serves the security.txt file per RFC 9116, with a rolling
 * expiry date set one year from the time of the request.
 * @returns A plain-text response containing the security.txt content.
 */
export async function GET(): Promise<NextResponse> {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  const body = [
    `Contact: mailto:${Urls.Mail('security')}`,
    `Contact: ${Urls.BaseUrl}/security`,
    `Expires: ${expires.toISOString()}`,
    `Canonical: ${Urls.BaseUrl}/.well-known/security.txt`,
    `Preferred-Languages: ${Object.keys(languages).join(', ')}`,
    `Policy: ${Urls.BaseUrl}/security`,
    `Acknowledgments: ${Urls.BaseUrl}/security#hall-of-fame`
  ].join('\n');

  return new NextResponse(body, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
