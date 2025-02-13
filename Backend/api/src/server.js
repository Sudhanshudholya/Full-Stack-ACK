const app = require("./app");

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(4000, () => {
  console.log("4000 server start");
});
