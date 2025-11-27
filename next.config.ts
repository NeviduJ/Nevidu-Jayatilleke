import type { NextConfig } from "next";

const repoBasePath = "/Nevidu-Jayatilleke";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  ...(isProd
    ? {
        basePath: repoBasePath,
        assetPrefix: repoBasePath,
      }
    : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
