const Notes = require("../model/Notes");
const Users = require("../model/Users");

const service = async (value) => {
  const { id, person, email } = value;
  if (person == email) {
    return {
      status: 403,
      message: "The method is not allowed"
    };
  }
  try {
    const note = await Notes.findOne({ _id: id, owner: email }, { access: 1 });
    if (note) {
      const removable = note.access.find((access) => access.email == person);
      if (removable) {
        const user = await Users.findOne({ email: removable.email });

        const noteIndex = note.access.findIndex((access) => access.email == person);
        const userIndex = user.share.findIndex((share) => {
          return share.note == id && share.owner == email;
        });

        note.access.splice(noteIndex, 1);
        user.share.splice(userIndex, 1);

        await note.save();
        await user.save();

        return {
          status: 200,
          message: `Stopped sharing with "${user.email}"`
        };
      }
      return {
        status: 200,
        message: "You haven't shared the user yet"
      }
    }
    return {
      status: 403,
      message: "You have no permission"
    }
  } catch (error) {
    throw error;
  }
};

module.exports = service;