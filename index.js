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

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use;

app.use("/records", require("./routers/recordsRouter"));
app.use("/release", require("./routers/releaseRouter"));
