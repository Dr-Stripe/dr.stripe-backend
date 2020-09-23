const express = require("express");
const db = require("./knex");
const cors = require("cors");
const knexfile = require("../knexfile");
const moment = require("moment")
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_API_KEY)

const setupServer = () => {
  const app = express()
  app.use(cors());
  app.use(express.json());
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
    } catch (err) {
      res.status(500).json({message: "Error updating new post", error:err})
  
   }

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


  //Test endpoint for stripe checkout, probably will change
  app.post('/create-session', async(req, res)=>{
    console.log(req.body)
    console.log(req.body.price)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: 'doctor_visit'
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://dr-stripe-frontend.vercel.app/`,
      cancel_url: `https://dr-stripe-frontend.vercel.app/`,
    });
    res.json({ id: session.id });
  });


  return app;
};

module.exports = { setupServer };
