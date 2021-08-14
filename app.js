const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cors = require("cors");


require("dotenv").config();
app.use(bodyParser.json())
app.use(cors())
const newsRoute = require("./routes/new")


app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.use('/news' , newsRoute)

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB !");
  }
);

app.listen(process.env.PORT || 5000 , ()=> console.log(`app listening on port ${port}`));
