const { genreSchema } = require("./genres");
const mongoose = require("mongoose");
const Joi = require("joi");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
  })
);

function validateMovie(movie) {
  const schema = {
    title: Joi.string().required().min(5).max(50),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required().min(0),
    dailyRentalRate: Joi.number().required().min(0),
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
