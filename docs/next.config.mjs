import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === "production" ? "/docs/" : "/",
};

export default withMDX(config);
