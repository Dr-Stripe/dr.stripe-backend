const express = require("express");

const setupServer = () => {
  const app = express();

  app.get("/", (req, res) => {
    res.send("hello");
  });

  return app;
};

module.exports = { setupServer };
