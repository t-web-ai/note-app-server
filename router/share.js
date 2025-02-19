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

const updateShareNote = require("../service/updateShareNote");
const updateSchema = Joi.object({
  id: Joi.string().trim().required(),
  text: Joi.string().trim().required()
});
route.put("/share/update", async (req, res) => {
  const { id, text } = req.body;
  const email = req.email;
  const { error, value } = updateSchema.validate({ id, text });
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details[0].message
    });
  }
  try {
    const result = await updateShareNote({ ...value, ...{ email } });
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message
    });
  }
});

const removePermissionSchema = Joi.object({
  id: Joi.string().trim().required(),
  person: Joi.string().trim().lowercase().email().required()
});
const removeSharePermission = require("../service/removeSharePermission");
route.put("/share/remove-permission", async (req, res) => {
  const { id, person } = req.body;
  const email = req.email;
  const { error, value } = removePermissionSchema.validate({ id, person });
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details[0].message
    });
    return;
  }
  try {
    const result = await removeSharePermission({ ...value, ...{ email } });
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message
    });
  }
});

const updatePermissionSchema = Joi.object({
  id: Joi.string().trim().required(),
  person: Joi.string().trim().lowercase().email().required(),
  permission: Joi.number().required().valid(4, 6)
});
const updatePermission = require("../service/updatePermission");
route.put("/share/update-permission", async (req, res) => {
  const { id, person, permission } = req.body;
  const email = req.email;
  const { error, value } = updatePermissionSchema.validate({ id, person, permission });
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details[0].message
    });
    return;
  }
  try {
    const result = await updatePermission({ ...value, ...{ email } });
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message
    });
  }
});

module.exports = route;