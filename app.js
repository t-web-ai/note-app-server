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

const share = require("./router/share");
app.use("/note", share);

app.all("*", async (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Not found!"
  });
});

mongoose.connect(process.env.MONGODB)
  .then(() => console.log("Connected to MongoDB..."))
  .catch(() => console.log("Failed to connect..."));