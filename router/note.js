const express = require("express");
const route = express.Router();
const Joi = require("joi");

const noteSchema = Joi.object({
  text: Joi.string().trim().required()
});
const addNote = require("../service/addNote");
route.post("/add", async (req, res) => {
  const { text } = req.body;
  const { error, value } = noteSchema.validate({ text });
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.message
    });
    return;
  }
  try {
    const result = await addNote({ ...value, ...{ email: req.email } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message
    });
  }
});

module.exports = route;