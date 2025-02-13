const express = require("express");
const route = express.Router();
const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().min(8).required(),
  email: Joi.string().trim().lowercase().email().required()
});
const register = require("../service/register");
route.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const { error, value } = registerSchema.validate({ username, password, email });
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details[0].message
    });
    return;
  }
  try {
    const result = await register(value);
    res.status(201).send(result);
  } catch (error) {
    if (error.code == 11000) {
      res.status(409).json({
        status: 409,
        error: "Email has been alreday used."
      });
      return;
    }
    res.status(500).json({
      status: 500,
      error: error.message
    })
  }
});

module.exports = route;