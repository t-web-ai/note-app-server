const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT ?? 3000;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

mongoose.connect(process.env.MONGODB)
  .then(() => console.log("Connected to MongoDB..."))
  .catch(() => console.log("Failed to connect..."));