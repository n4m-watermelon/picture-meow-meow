const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db/index");
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());

// const newsRoute = require("./routes/new")
const imagesRoute = require("./routes/images");


// app.use('/news' , newsRoute)
app.use("/api/images", cors() , imagesRoute);
db.connect();
let port = process.env.PORT || 5000;

app.listen(port, () => console.log(`app listening on port ${port}`));
