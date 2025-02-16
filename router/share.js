const express = require("express");
const route = express.Router();
const Joi = require("joi");

const shareSchema = Joi.object({
  id: Joi.string().trim().required(),
  permission: Joi.number().required().valid(4, 6),
  people: Joi.array().items(Joi.string().email().lowercase().trim().required().invalid()).required()
});
const shareNote = require("../service/shareNote");
route.post("/share", async (req, res) => {
  const { id, permission, people } = req.body;
  const email = req.email;
  const { error, value } = shareSchema.validate({ id, permission, people });
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details[0].message
    });
    return;
  }
  try {
    const result = await shareNote({ ...value, ...{ email } });
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message
    });
  }
});

const getShareNote = require("../service/getShareNote");
route.get("/share", async (req, res) => {
  const email = req.email;
  const { page } = req.query;
  try {
    const result = await getShareNote({ ...{ email }, ...{ page } });
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message
    });
  }
});

module.exports = route;