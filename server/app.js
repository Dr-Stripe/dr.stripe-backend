const express = require("express");
const db = require("./knex");
const cors = require("cors");

const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post("/visits", (req, res) => {
    res.send("add information of a patient");

  });

  //try, put ? 
  app.put("/:id",async => {
    const {id} = req.params;
    const changes = req.body;

    try {
      const something = await db("visit").where({id}).update(changes);
      if ( something ){
        res.status(200).json({update: something})
      } else {
        res.status(404).json({message:"Not found"})
      }
    } catch (err) {
      res.status(500).json({message: "Error updating new post", error:err})
    }
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
