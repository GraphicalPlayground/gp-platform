import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@gp/react', '@gp/styles']
};

export default nextConfig;
