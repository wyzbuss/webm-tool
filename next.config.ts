import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // 必须要有 headers 才能让浏览器开启多线程
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
    ];
  },
  images: { unoptimized: true },
};

export default nextConfig;