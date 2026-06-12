import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const allowedDevOrigins = process.env['ALLOWED_DEV_ORIGINS']
  ? process.env['ALLOWED_DEV_ORIGINS'].split(',').map((ip) => ip.trim())
  : ['localhost'];

const nextConfig: NextConfig = {
  allowedDevOrigins,
  compress: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    optimizePackageImports: ['@gp/react']
  },
  images: {
    dangerouslyAllowLocalIP: true
  },
  reactCompiler: true,
  reactStrictMode: true,
  trailingSlash: false,
  transpilePackages: ['@gp/react', '@gp/styles'],
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: true
  }
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/
});

export default withMDX(nextConfig);
