const Users = require("../model/Users");
const Notes = require("../model/Notes");

const service = async (value) => {
  const { id, person, permission, email } = value;
  if (email == person) {
    return {
      status: 403,
      message: "The method is not allowed"
    };
  }
  try {
    const note = await Notes.findOne({ _id: id, "access.email": person });
    if (note) {
      await Notes.updateOne({ _id: id, "access.email": person }, {
        $set: {
          "access.$.permission": permission
        }
      });
      return {
        status: 200,
        message: `Change permission of "${person}" to ${permission}`
      };
    }
    return {
      status: 403,
      message: "You have no permission"
    };
  } catch (error) {
    throw error;
  }
};

module.exports = service;