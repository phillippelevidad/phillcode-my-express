const http = require("http");

const data = [1, 2, 3];

const server = http.createServer((req, res) => {
  console.log(req.url);

  if (req.url === "/api/data" && req.method === "GET") {
    res.end(JSON.stringify({ data }));
    return;
  }

  if (req.url === "/api/data" && req.method === "POST") {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      const body = Buffer.concat(chunks).toString();
      const parsedBody = JSON.parse(body);
      data.push(parsedBody);
      res.end(JSON.stringify({ data }));
    });
    return;
  }

  res.statusCode = 404;
  res.end("Not Found");
});

server.listen(3000, () => console.log("server running"));
