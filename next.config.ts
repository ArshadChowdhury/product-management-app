import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "acmartbd.com",
        port: "",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "mcprod.aarong.com",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "images.othoba.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "scontent.fdac5-2.fna.fbcdn.net",
        port: "",
        pathname: "/v/**",
      },
    ],
  },
};

export default nextConfig;
