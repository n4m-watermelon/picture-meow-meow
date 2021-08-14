const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cors = require("cors");
const db = require("./config/db/index")
require("dotenv").config();


db.connect()
app.use(bodyParser.json())
app.use(cors())
const newsRoute = require("./routes/new")


app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.use('/news' , newsRoute)



app.listen(process.env.PORT || 5000 , ()=> console.log(`app listening on port ${process.env.PORT || 5000}`));
