const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const errorhandler = require("./middleware/errors");
const app = express();
//
//connecting the database
//
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connection has been completed");
  })
  .catch((err) => {
    console.log(err);
  });
//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())
//
//middleware for routes
//
app.use("/api", authRoutes);
app.use(errorhandler);

app.get("/", (req, res) => {
  res.send("fuck off from node js");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is running on port : ${port}`);
});
