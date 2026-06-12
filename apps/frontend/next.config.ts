import type { NextConfig } from 'next';

const allowedDevOrigins = process.env['ALLOWED_DEV_ORIGINS']
  ? process.env['ALLOWED_DEV_ORIGINS'].split(',').map((ip) => ip.trim())
  : ['localhost'];

const nextConfig: NextConfig = {
  allowedDevOrigins,
  compress: true,
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

export default nextConfig;
