const express = require("express");

const setupServer = () => {
  const app = express();

  app.get("/", (req, res) => {
    res.send("hello");
  });

  app.post("/visits", (req, res) => {
    res.send("add information of a patient");
  });

  app.get("/");

  return app;
};

module.exports = { setupServer };
