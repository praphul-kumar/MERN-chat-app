const Joi = require("joi");

exports.signInSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required()
});

exports.signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required()
});

exports.updateUserSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
});

exports.statucSchema = Joi.object({
  status: Joi.number().required(),
});