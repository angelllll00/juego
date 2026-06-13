import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Para Cloudflare Pages: usar NEXT_OUTPUT=export al hacer build
  // Por defecto usa "standalone" para desarrollo local
  output: (process.env.NEXT_OUTPUT as "export" | "standalone" | undefined) || "standalone",
  images: {
    // Desactivar optimización de imágenes para static export (Cloudflare)
    unoptimized: process.env.NEXT_OUTPUT === "export",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
