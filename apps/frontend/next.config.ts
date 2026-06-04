import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
