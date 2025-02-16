const Notes = require("../model/Notes");
const { ObjectId } = require("mongoose").Types;

const service = async (value) => {
  const { id, text, email } = value;

  try {
    const note = await Notes
      .aggregate([
        {
          $match: {
            _id: ObjectId.createFromHexString(id),
            "access.email": email
          }
        },
        {
          $project: {
            _id: 1,
            note: 1,
            access: {
              $filter: {
                input: "$access",
                as: "item",
                cond: {
                  $eq: ["$$item.email", email]
                }
              }
            }
          }
        }
      ]);
    if (note.length) {
      if (note[0].access[0].permission == 4) {
        return {
          status: 403,
          message: "You can only read the note"
        };
      }
      const result = await Notes
        .findOneAndUpdate({
          _id: id
        }, {
          $set: { note: text }
        }, {
          new: true,
          projection: { note: 1, owner: 1 },
          returnDocument: "after"
        });

      return {
        status: 200,
        message: result
      };
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