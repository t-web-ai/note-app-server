const Users = require("../model/Users");
const bcrypt = require("bcrypt");

const service = async (value) => {
  const { username, password, email } = value;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users({
      username: username,
      password: hashedPassword,
      email: email
    });
    return await user.save();
  } catch (error) {
    throw error;
  }
};
module.exports = service;