const myExpress = require("./myExpress");
const json = require("./json");

const data = [1, 2, 3];

const app = myExpress();
app.use(json);

app.get("/api/data", (req, res) => {
  res.end(JSON.stringify({ data }));
});

app.post("/api/data", (req, res) => {
  const num = req.body;
  data.push(num);
  res.end(JSON.stringify({ data }));
});

app.listen(3000, () => console.log("server running"));
