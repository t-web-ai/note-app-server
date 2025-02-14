const Notes = require("../model/Notes");

const service = async (email, page) => {
  const notes = await Notes
    .find({
      owner: email
    })
    .sort({ date: -1 })
    .skip((page - 1) * 5)
    .limit(5);
  if (notes.length) {
    return notes;
  }
  return {
    status: 404,
    message: "No content"
  }
};

module.exports = service;