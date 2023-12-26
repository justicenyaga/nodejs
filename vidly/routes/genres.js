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

router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

module.exports = router;
