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

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// app.use('/news' , newsRoute)
app.use("/api/images", imagesRoute);
db.connect();
let port = process.env.PORT || 5000;

app.listen(port, () => console.log(`app listening on port ${port}`));
