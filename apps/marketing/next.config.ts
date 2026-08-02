// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { NextConfig } from 'next';

const allowedDevOrigins = process.env['ALLOWED_DEV_ORIGINS']
  ? process.env['ALLOWED_DEV_ORIGINS'].split(',').map((ip) => ip.trim())
  : ['localhost'];

const nextConfig: NextConfig = {
  allowedDevOrigins,
  compress: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    dangerouslyAllowLocalIP: true
  },
  reactCompiler: true,
  reactStrictMode: true,
  trailingSlash: false,
  typedRoutes: true,
  experimental: {
    optimizePackageImports: ['@gp/ui']
  },
  transpilePackages: ['@gp/ui', '@gp/fonts', '@gp/seo'],
  typescript: {
    ignoreBuildErrors: true
  },
  async redirects() {
    return [
      {
        source: '/humans.txt',
        destination: '/about',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
