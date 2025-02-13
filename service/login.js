const Users = require("../model/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const service = async (value) => {
  const { email, password } = value;
  try {
    const user = await Users.findOne({ email });
    if (user) {
      const authorize = await bcrypt.compare(password, user.password);
      if (authorize) {
        const token = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET_KEY, {
          expiresIn: "15d"
        });
        return {
          status: 200,
          message: "You are authorized",
          token: token,
        };
      }
      return {
        status: 401,
        error: "You are unauthorized."
      }
    }
    return {
      status: 404,
      error: "You haven't registered yet."
    };
  } catch (error) {

  }
};

module.exports = service;