const Joi = require('joi');

exports.create = Joi.object({
  name: Joi.string().trim().required(),
  status: Joi.string().valid('Active', 'InActive'),
  details: Joi.string().allow(''),
});

exports.update = Joi.object({
  name: Joi.string().trim(),
  status: Joi.string().valid('Active', 'InActive'),
  details: Joi.string().allow(''),
}).min(1);
