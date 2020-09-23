const express = require("express");
const db = require("./knex");
const cors = require("cors");
const bodyParser = require("body-parser");
const knexfile = require("../knexfile");
const moment = require("moment")
const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json());
  app.post("/visits/:patient_id",async(req, res) => {
    const {patient_id} = req.params;
    // {
    //   "patient_id": req.body.patient_id,
    //    "visit_date": moment().format('L'),
    //   "treatment": req.body.treatment,
    //   "symptoms": req.body.symptoms,
    //   "doctor": req.body.doctor,
    //   "paid": req.body.paid,
    //   "hospital_name": req.body.hospital_name
    // }]
    //res.json(changes)
    try {
      await db.select().table('visits').where('patient_id', req.params.patient_id).insert({
        "patient_id": req.body.patient_id,
         "visit_date": moment().format('L'),
        "treatment": req.body.treatment,
        "symptoms": req.body.symptoms,
        "doctor": req.body.doctor,
        "price": req.body.price,
        "paid": req.body.paid,
        "hospital_name": req.body.hospital_name,
        "medicine": req.body.medicine
      }).then(function(result){
        res.json({success: true, message: 'ok'})
      })
      // if ( something ){
      //   res.status(200).json({update: something})
      // } else {
      //   res.status(404).json({message:"Not found"})
      // }
    } catch (err) {
      res.status(500).json({message: "Error updating new post", error:err})
  
   }
  // });

  // try, post ?
  // app.post("/visits/:patient_id",async(req, res) => {
  //   const {patient_id} = req.params;
  //   const changes = req.body;
  //   changes["visit_date"]=moment().format('L')
  //   console.log(changes)
    
    //   "symptoms": "Azuma",
    //   "doctor": "Yamada",
    //   "paid": false,
    //   "hospital_name": "Tokyo clinic"
    // }]
  //   res.json(changes)
  //   console.log(changes)
  //   try {
  //     console.log(changes)
  //     db.table("visits").insert(
  //       changes
  //     )//.into("visits")
      
  //     res.json(changes)
  //   } catch (err) {
  //   //   res.status(500).json({message: "Error updating new post", error:err})
    
  //  }
  });

 

  app.get("/payments", async (req, res) => {
    const ptData = await db
      .select(
        "price",
        "hospital_name",
        "treatment",
        "visit_date",
        "doctor",
        "paid",
        "medicine"
      )
      .from("visits")
      .where("patient_id", 1);
    res.json(ptData);
  });

  return app;
};

module.exports = { setupServer };
