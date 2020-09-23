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


  // try, post ?
  app.post("/visits/:patient_id",async(req, res) => {
    const {patient_id} = req.params;
    const changes = req.body;
    changes["date_visit"]=moment().format('L')
    console.log(changes)
    // 
    //   "symptoms": "Azuma",
    //   "doctor": "Yamada",
    //   "paid": false,
    //   "hospital_name": "Tokyo clinic"
    // }]
    //res.json(changes)
    //console.log(changes)
    try {
      db.select().table("visits").insert(
        {
          patient_id: changes.patient_id
        }
      );
      // if ( something ){
      //   res.status(200).json({update: something})
      // } else {
      //   res.status(404).json({message:"Not found"})
      // }
      console.log(changes)
      res.json(changes)
    } catch (err) {
    //   res.status(500).json({message: "Error updating new post", error:err})
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
