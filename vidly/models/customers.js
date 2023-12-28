const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
  })
);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().required().min(5).max(50).label("Name"),
    phone: Joi.string().required().min(5).max(50).label("Phone Number"),
    isGold: Joi.boolean().label("Is Gold"),
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
