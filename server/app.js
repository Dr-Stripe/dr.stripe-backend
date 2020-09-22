const express = require("express");
const db = require("./knex");

const setupServer = () => {
  const app = express();

  app.post("/visits", (req, res) => {
    res.send("add information of a patient");
  });

  app.get("/payments/1", async (req, res) => {
    const ptData = await db
      .select(
        "price",
        "hospital_name",
        "treatment",
        "visit_date",
        "doctor",
        "medicine"
      )
      .from("visits");
    console.log("this is data", ptData);
    // res.send("here is your patient information");
  });

  return app;
};

module.exports = { setupServer };
