const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db/index");
require("dotenv").config();
app.use(bodyParser.json());
app.options("*", (req, res) => {
  res.status(200).send("Preflight request allowed");
});
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,           
  optionSuccessStatus:200
  } 

  // app.use(function(req,res,next){
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  //   res.header("Access-Control-Allow-Headers", "Accept, Content-Type, Authorization, X-Requested-With");
  //   next();
  // });


app.use(cors(corsOptions));
const imagesRoute = require("./routes/images");
app.use("/api/images" , imagesRoute);
db.connect();
let port = process.env.PORT || 5000;

app.listen(port, () => console.log(`app listening on port ${port}`));
