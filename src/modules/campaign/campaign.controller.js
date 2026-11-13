const service = require('./campaign.service');
const asyncHandler = require('../../utils/asyncHandler');
const { success } = require('../../utils/apiResponse');

exports.create = asyncHandler(async (req, res) =>
  success(res, await service.create(req.body, req.user._id), 'Campaign created', 201));
exports.list = asyncHandler(async (req, res) => {
  const { items, meta } = await service.list(req.query);
  success(res, items, 'Campaigns fetched', 200, meta);
});
exports.getById = asyncHandler(async (req, res) => success(res, await service.getById(req.params.id)));
exports.update = asyncHandler(async (req, res) =>
  success(res, await service.update(req.params.id, req.body), 'Campaign updated'));
exports.updateSection = asyncHandler(async (req, res) =>
  success(res, await service.updateSection(req.params.id, req.params.section, req.body), 'Section saved'));
exports.remove = asyncHandler(async (req, res) => {
  await service.remove(req.params.id);
  success(res, null, 'Campaign deleted');
});
