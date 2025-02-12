const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  access: {
    type: [String],
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const Notes = mongoose.model(noteSchema);
module.exports = Notes;