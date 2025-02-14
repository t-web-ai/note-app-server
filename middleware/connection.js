const mongoose = require("mongoose");

const connection = (req, res, next) => {
  if (mongoose.connection.readyState == 1) {
    next();
    return;
  }
  res.status(500).json({
    status: 500,
    error: "MongoDB server is not working..."
  })
};

module.exports = connection;