const express = require("express");

//const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
//var cookieSession = require('cookie-session')
const cookieParser = require("cookie-parser");
const cors = require("cors");
//const session = require("express-session");
dotenv.config();

//connect to server
const app = express();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server started on : ${PORT}`);
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});
//app.use(cors());

app.use;

app.use("/records", require("./routers/recordsRouter"));
app.use("/release", require("./routers/releaseRouter"));
