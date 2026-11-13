const Joi = require('joi');
const { ROLES } = require('./user.model');

exports.login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.create = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid(...ROLES),
  status: Joi.string().valid('Active', 'InActive'),
});

exports.update = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  role: Joi.string().valid(...ROLES),
  status: Joi.string().valid('Active', 'InActive'),
}).min(1);
