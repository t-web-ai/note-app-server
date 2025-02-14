const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const PORT = process.env.PORT ?? 3000;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const user = require("./router/user");
app.use("/user", user);

const connection = require("./middleware/connection");
app.use("/", connection);

const note = require("./router/note");
const token = require("./middleware/token");
app.use("/note", token);
app.use("/note", note);

mongoose.connect(process.env.MONGODB)
  .then(() => console.log("Connected to MongoDB..."))
  .catch(() => console.log("Failed to connect..."));