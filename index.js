const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cors());
dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server started on : ${PORT}`);
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/records", require("./routers/recordsRouter"));
app.use("/release", require("./routers/releaseRouter"));
