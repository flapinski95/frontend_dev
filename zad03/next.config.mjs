/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Włącza tryb ścisły Reacta dla lepszej diagnostyki
  swcMinify: true, // Używa SWC do minifikacji
  experimental: {
    appDir: true, // Włącza obsługę App Router (Next.js 14)
  },
};

export default nextConfig;
