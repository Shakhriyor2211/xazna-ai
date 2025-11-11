const SERVER_URL = process.env.NEXT_PUBLIC_HTTP_SERVER_URL;

const nextConfig = {
  reactStrictMode: false,
  rewrites: () => {
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
};

module.exports = nextConfig;
