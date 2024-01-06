const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function () {
  const db = config.get("db");
  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => winston.info(`Connected to ${db}...`));
};
