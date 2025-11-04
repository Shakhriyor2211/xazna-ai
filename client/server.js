const port = process.env.PORT || 3100;
const hostname = process.env.HOSTNAME || "0.0.0.0";

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
