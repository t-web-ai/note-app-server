const mongoose = require("mongoose");
const shareSchema = mongoose.Schema({
  owner: String,
  note: String
});
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  share: {
    type: [shareSchema],
    default: []
  }
});
const Users = mongoose.model("User", userSchema);
module.exports = Users;