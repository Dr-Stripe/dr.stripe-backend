const express = require("express");
const app = express();

const port = 9000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`We are lisning ${port}`);
});
