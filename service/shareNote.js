const Notes = require("../model/Notes");
const Users = require("../model/Users");

const service = async (value) => {
  const { id, permission, people: p, email } = value;

  const note = await Notes.findOne({ _id: id, owner: email });
  if (!note) {
    return {
      status: 403,
      error: "You have no permission"
    }
  }

  const people = [...new Set(p)].filter((person) => !(person == email));

  const users = await Users.find({ email: { $in: people } }, { _id: 0, email: 1 });

  const real_users = people.filter((person) => users.map((user) => user.email).includes(person));

  const already_shared = real_users.filter((person) => note.access.map(access => access.email).includes(person));

  const final_users = real_users.filter((person) => !note.access.map(access => access.email).includes(person));

  try {
    if (final_users.length) {
      final_users.forEach(async (user) => {
        note.access.push({ email: user, permission: permission });
        await Users.updateOne({ email: user }, { $push: { share: { owner: email, note: note._id } } });
      });
      await note.save();
      return {
        status: 200,
        shared: final_users
      }
    }
    return {
      status: 200,
      message: "No one is shared"
    }
  } catch (error) {
    throw error;
  }

};

module.exports = service;