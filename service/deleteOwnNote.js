const Notes = require("../model/Notes");

const service = async (value) => {
  const { id, email } = value;
  try {
    const result = await Notes.findOne({ _id: id, owner: email });
    if (result) {
      await Notes.deleteOne({ _id: id });
      return {
        status: 204,
        message: "Documet has been deleted"
      };
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