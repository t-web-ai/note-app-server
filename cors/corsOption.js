require("dotenv").config();

const corsOption = {
  origin: process.env.CORS_OPTION ? process.env.CORS_OPTION.split(",").map(url => url.trim()) : ["http://localhost:5173"]
};

module.exports = corsOption;