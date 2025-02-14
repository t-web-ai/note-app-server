const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
  owner: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: true,
  },
  access: {
    type: [{
      email: {
        type: String,
        required: true
      },
      permission: {
        type: Number,
        default: 4
      }
    }],
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const Notes = mongoose.model("Note", noteSchema);
module.exports = Notes;