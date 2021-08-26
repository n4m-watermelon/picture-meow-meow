const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db/index");
require("dotenv").config();
app.use(bodyParser.json());



const corsOptions ={credentials: true, origin: true}
app.use(cors(corsOptions));
const imagesRoute = require("./routes/images");
app.use("/api/images", imagesRoute);
db.connect();
let port = process.env.PORT || 5000;

app.listen(port, () => console.log(`app listening on port ${port}`));
