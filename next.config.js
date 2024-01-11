/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
},
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "en",
    localeDetection: false,
  },
  // hideSourceMaps: true,
  // experimental: { appDir: true },
  productionBrowserSourceMaps: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_STRAPI_URL],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.tutotalk.com",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "strapi-sl1y.onrender.com",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.freepik.com",
        port: "",
        pathname: "/",
      },
    ],
  },
  env: {
    TALK_TO_AI: process.env.TALK_TO_AI,
  },

  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        path: false,
        os: false,
      },
    };
    return config;
  },
});

module.exports = nextConfig;
