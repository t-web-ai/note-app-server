const { mongo } = require("mongoose");
const Notes = require("../model/Notes");

const service = async (value) => {
  const { id, text, email } = value;
  try {
    const note = await Notes.findOne({ _id: id, owner: email });
    if (note) {
      note.set({
        note: text,
        date: Date.now()
      });
      return await note.save();
    }
    return {
      status: 405,
      message: "You have no permission to do the operation"
    }
  } catch (error) {
    throw {
      status: 500,
      error: "Internal server error"
    };
  }
};

module.exports = service;