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

const getOwnNote = require("../service/getOwnNote");
route.get("/own", async (req, res) => {
  const email = req.email;
  const { page } = req.query;
  try {
    const result = await getOwnNote(email, page);
    res.send(result)
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message
    });
  }
});

const deleteSchema = Joi.object({
  id: Joi.string().trim().required()
});
const deleteOwnNote = require("../service/deleteOwnNote");
route.delete("/own/delete", async (req, res) => {
  const { id } = req.body;
  const { error, value } = deleteSchema.validate({ id });
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details[0].message
    });
    return;
  }
  try {
    const result = await deleteOwnNote({ ...value, ...{ email: req.email } });
    if (result.status == 405) {
      res.status(405).json(result);
      return;
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json(error);
  }
});

const updateSchema = Joi.object({
  id: Joi.string().trim().required(),
  text: Joi.string().trim().required()
});
const updateOwnNote = require("../service/updateOwnNote");
route.put("/own/update", async (req, res) => {
  const { id, text } = req.body;
  const email = req.email;
  const { error, value } = updateSchema.validate({ id, text });
  if (error) {
    res.status(400).json({
      status: 404,
      error: error.details[0].message
    });
    return;
  }
  try {
    const result = await updateOwnNote({ ...value, ...{ email } });
    if (result.status == 405) {
      res.status(405).json(result);
      return;
    }
    res.status(200).json({
      status: 200,
      updated: result
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = route;