const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

// Middleware
const corsOptions = {
  origin: process.env.FRONT_END,
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`App is Listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Route
app.use("/", require("./routes"));
