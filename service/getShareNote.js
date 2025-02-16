const Users = require("../model/Users");
const Notes = require("../model/Notes");
const { ObjectId } = require("mongoose").Types;


const service = async (value) => {
  const { email, page } = value;
  try {
    const user = await Users.findOne({ email }, { _id: 0, share: 1 });
    const share = user.share.map((share) => ObjectId.createFromHexString(share.note));
    const notes = await Notes
      .aggregate([
        {
          $match: {
            _id: { $in: share }
          }
        },
        {
          $project: {
            owner: 1,
            note: 1,
            access: {
              $filter: {
                input: "$access",
                as: "item",
                cond: {
                  $eq: ["$$item.email", email]
                }
              }
            },
            date: 1
          }
        }
      ])
      .skip(((page ? page : 1) - 1) * 5)
      .limit(5);

    if (notes.length) {
      return {
        status: 200,
        notes: notes
      };
    }
    return {
      status: 404,
      message: "No content"
    }
  } catch (error) {
    throw error;
  }
};

module.exports = service;