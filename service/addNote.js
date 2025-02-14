const Notes = require("../model/Notes");

const service = async (value) => {
  const { text, email } = value;
  try {
    const note = new Notes({
      owner: email,
      note: text
    });
    return await note.save();
  } catch (error) {
    return error;
  }
};

module.exports = service;