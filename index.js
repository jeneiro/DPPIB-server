const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server started on : ${PORT}`);
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/records", require("./routers/recordsRouter"));
app.use("/release", require("./routers/releaseRouter"));
