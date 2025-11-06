import "dotenv/config"; 
import next from "next";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const wsProxy = createProxyMiddleware({
  target: process.env.NEXT_PUBLIC_WS_SERVER_URL + "/ws",
  changeOrigin: false,
  ws: true,
  logLevel: "debug",
  pathRewrite: (path) => (path.endsWith("/") ? path : path + "/")
});


const mediaProxy = createProxyMiddleware({
  target: process.env.NEXT_PUBLIC_HTTP_SERVER_URL + "/media",
  changeOrigin: false,
  logLevel: "debug",
  pathRewrite: (path) => (path.endsWith("/") ? path : path + "/"),
});

const protectedProxy = createProxyMiddleware({
  target: process.env.NEXT_PUBLIC_HTTP_SERVER_URL + "/protected",
  changeOrigin: false,
  logLevel: "debug",
  pathRewrite: (path) => (path.endsWith("/") ? path : path + "/"),
});

const apiProxy = createProxyMiddleware({
  target: process.env.NEXT_PUBLIC_HTTP_SERVER_URL + "/api",
  changeOrigin: false,
  logLevel: "debug",
  pathRewrite: (path) => (path.endsWith("/") ? path : path + "/"),
});

app.prepare().then(() => {
  const server = express();

  server.use("/ws", wsProxy);
  server.use("/api", apiProxy);
  server.use("/media", mediaProxy);
  server.use("/protected", protectedProxy);

  server.all(/.*/, (req, res) => handle(req, res));

  const listener = server.listen(process.env.PORT || 3000, () => {
    console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
  });

  listener.on("upgrade", (req, socket, head) => {
    if (req.url && req.url.startsWith("/ws")) {
      wsProxy.upgrade(req, socket, head);
    }
  });
});
