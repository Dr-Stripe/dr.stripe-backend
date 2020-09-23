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

  // try, post ?
  // app.post("/:patient_id",async => {
  //   const {patient_id} = req.params;
  //   const changes = req.body;
  //   console.log("I'm in post1")

  //   try {
  //     const something = await db("visits").where({patient_id}).update(changes);
  //     console.log("I'm in post1")

  //     if ( something ){
  //       res.status(200).json({update: something})
  //     } else {
  //       res.status(404).json({message:"Not found"})
  //     }
  //   } catch (err) {
  //     res.status(500).json({message: "Error updating new post", error:err})
  //   }
  // });

  app.get("/payments/2", async (req, res) => {
    const ptData = await db
      .select(
        "price",
        "hospital_name",
        "treatment",
        "visit_date",
        "doctor",
        "medicine"
      )
      .from("visits")
      .where("patient_id", 1);
    console.log("this is data", ptData);
    res.json(ptData);
    // res.send("hello");
  });

  return app;
};

module.exports = { setupServer };
