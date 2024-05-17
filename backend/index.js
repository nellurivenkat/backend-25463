const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Middleware
const corsOptions = {
  origin: process.env.FRONT_END, // Frontend URI
};
app.use(express.json());
app.use(cors(corsOptions));

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
