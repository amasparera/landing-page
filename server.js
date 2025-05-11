const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Hello from raw Node.js");
}).listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
