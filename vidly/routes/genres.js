const Joi = require("joi");
const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Romance" },
  { id: 3, name: "Action" },
];

router.get("/", (req, res) => {
  res.send(genres);
});

module.exports = router;
