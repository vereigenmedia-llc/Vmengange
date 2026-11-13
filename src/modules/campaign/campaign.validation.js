const Joi = require('joi');
const { STATUSES } = require('./campaign.model');

const objectId = Joi.string().hex().length(24);

exports.create = Joi.object({
  client: objectId.required(),
  status: Joi.string().valid(...STATUSES),
  adName: Joi.string().trim().required(),
  campaignType: Joi.string().trim().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref('startDate')).allow(null),
});

exports.update = Joi.object({
  client: objectId,
  status: Joi.string().valid(...STATUSES),
  adName: Joi.string().trim(),
  campaignType: Joi.string().trim(),
  startDate: Joi.date(),
  endDate: Joi.date().allow(null),
}).min(1);

const SECTIONS = ['adSample', 'pacing', 'clicksImpressions', 'devices', 'userByRegion', 'multipleAds', 'topSites'];
exports.SECTIONS = SECTIONS;
exports.section = Joi.object().unknown(true);
