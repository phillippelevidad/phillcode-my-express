function json(req, res, next) {
  if (req.headers["content-type"] !== "application/json") {
    next();
    return;
  }

  const chunks = [];
  req.on("data", (chunk) => {
    chunks.push(chunk);
  });
  req.on("end", () => {
    const body = Buffer.concat(chunks).toString();
    req.body = JSON.parse(body);
    next();
  });
}

module.exports = json;
