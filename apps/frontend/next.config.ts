import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.31'],
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
