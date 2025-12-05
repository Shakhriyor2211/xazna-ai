import { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const SERVER_URL = process.env.NEXT_PUBLIC_HTTP_SERVER_URL;

const nextConfig: NextConfig = {
  reactStrictMode: false,
  htmlLimitedBots: /.*/,
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: `${SERVER_URL}/api/:path*`,
      },
      {
        source: "/media/:path*",
        destination: `${SERVER_URL}/media/:path*`,
      },
      {
        source: "/protected/:path*",
        destination: `${SERVER_URL}/protected/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.pillar.uz",
        pathname: "/**",
      },
    ],
  },
};

export default withIntlayer(nextConfig);
